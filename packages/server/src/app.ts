import express, { Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { initUser, User } from './models/user';
import { initItem, Item } from './models/item';
import { ItemRequest, initRequest } from './models/request';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
const envFilePath = path.join(process.cwd(), '.env');

if (fs.existsSync(envFilePath)) {
  dotenv.config();
}

// request logging middleware
app.use(morgan('short'));
// json handling middleware
app.use(express.json());
// setup cors middleware
// TODO: allow only trusted domains here
app.use(
  cors({
    allowedHeaders: '*',
    origin: '*'
  })
);

// initialize the postgress connection
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  dialect: 'postgres'
});

// authenticate and test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      `connected to the postgress at ${process.env.DB_HOST} as ${process.env.DB_USER} 💃`
    );
  })
  .catch((err) => {
    console.log(
      `😟 unable to connect to postgress at ${process.env.DB_HOST} as ${process.env.DB_USER}: ${err}`
    );
  });

// initialize all the models
initUser(sequelize);
initItem(sequelize);
initRequest(sequelize);

sequelize.sync();

if (process.env.NODE_ENV === 'development') {
  console.log('express server is running in devlopment mode 🔨');
} else {
  console.log('express server is running in production mode 🔨');
}

app.post('/users/create', async (req: Request, res: Response) => {
  let { userId, name, pincode, address, contact, items } = req.body;

  try {
    const userItems = [];

    if (!userId) {
      const { id } = await User.create({
        name,
        pincode,
        address,
        contact
      });

      userId = id;
    } else {
      // updated the existing user
      await User.update(
        { name, pincode, address, contact },
        {
          where: { id: userId }
        }
      );
    }

    for (const item of items) {
      userItems.push({
        text: item.text,
        userId: userId
      });
    }

    Item.bulkCreate(userItems);

    res.json({
      error: false,
      userId
    });
  } catch (error) {
    res.json({
      error
    });
  }
});

app.post('/requests/create', async (req: Request, res: Response) => {
  let { userId, text, pincode } = req.body;

  try {
    await ItemRequest.create({
      userId,
      text,
      pincode
    });

    res.json({
      error: false
    });
  } catch (error) {
    res.json({
      error
    });
  }
});

app.get('/users/:pincode', async (req: Request, res: Response) => {
  const pincode = req.params.pincode;

  try {
    const users = await User.findAll({
      where: { pincode }
    });

    res.json({
      error: false,
      users
    });
  } catch (error) {
    res.json({
      error
    });
  }
});

app.get('/shared/:pincode', async (req: Request, res: Response) => {
  const pincode = req.params.pincode;
  const shared: { user: User; items: Item[] }[] = [];

  try {
    const users = await User.findAll({
      where: {
        pincode
      }
    });

    for (const user of users) {
      const items = await Item.findAll({
        where: {
          userId: user.id
        }
      });

      shared.push({
        user,
        items
      });
    }

    res.json({
      error: false,
      shared
    });
  } catch (error) {
    res.json({ error });
  }
});

app.get('/requests/:pincode', async (req: Request, res: Response) => {
  const pincode = req.params.pincode;
  const userWithRequests: {
    [key: number]: {
      user: User | null;
      items: Item[];
    };
  } = {};

  try {
    const items = await ItemRequest.findAll({
      where: {
        pincode
      }
    });

    for (const item of items) {
      if (!userWithRequests[item.userId]) {
        userWithRequests[item.userId] = {
          user: await User.findOne({
            where: {
              id: item.userId
            }
          }),
          items: []
        };
      }

      if (userWithRequests[item.userId] !== null) {
        userWithRequests[item.userId].items.push(item);
      }
    }

    // this returns as an array of user with requests array
    const requests = Object.values(userWithRequests);

    res.json({
      error: false,
      requests
    });
  } catch (error) {
    res.json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`express server is running at port ${PORT} 🔥`);
});
