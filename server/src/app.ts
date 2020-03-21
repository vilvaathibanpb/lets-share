import express, { Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

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
