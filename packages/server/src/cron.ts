import { Sequelize } from 'sequelize';
import { initUser, User } from './models/user';
import { initItem, Item } from './models/item';
import { initRequest, ItemRequest } from './models/request';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

const envFilePath = path.join(process.cwd(), '.env');

if (fs.existsSync(envFilePath)) {
  dotenv.config();
}

// initialize the postgress connection
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  dialect: 'postgres'
});

const today = new Date();

console.log('time to kill every table 🔪');
// run only on moday
if(today.getDay() !== 0) {
  console.log('not today 💃');

  process.exit(0);
}

// authenticate and test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      `connected to the postgress at ${process.env.DB_HOST} as ${process.env.DB_USER} 💃`
    );

    // initialize all the models
    initUser(sequelize);
    initItem(sequelize);
    initRequest(sequelize);

    console.log('purging all the tables 💣');
    // truncate all the tables in the right order
    Item.truncate({ cascade: true })
    .then(() => ItemRequest.truncate({ cascade: true })) 
    .then(() => User.truncate({ cascade: true }))
    .then(() => {
      console.log('CABOOM, purged all the tables 💥');
    })
    .catch(err => {
      console.log(`😟 unable to purge all the tables ${err}`);
    })
    .finally(() => {
      process.exit(0);
    })
  })
  .catch((err) => {
    console.log(
      `😟 unable to connect to postgress at ${process.env.DB_HOST} as ${process.env.DB_USER}: ${err}`
    );
  });
