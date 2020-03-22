import express, { Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { initUser } from './models/user';

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

// initialize the postgress connection
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  host: `${process.env.DB_HOST}`,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  dialect: 'postgres'
});

// initialize all the models
initUser(sequelize);

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

// initialize models

if (process.env.NODE_ENV === 'development') {
  console.log('express server is running in devlopment mode 🔨');
} else {
  console.log('express server is running in production mode 🔨');
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`express server is running at port ${PORT} 🔥`);
});
