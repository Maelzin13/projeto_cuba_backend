// import 'reflect-metadata';
import mongoose, { ConnectOptions } from 'mongoose';
import app from './app';
import path from 'path';

require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

const port = process.env.PORT || 4500;
const mongoUrl =
  process.env.MONGO_URL || 'mongodb://cuba:OzVPKo@mongo:27017/cuba?authSource=admin';

mongoose.connect(mongoUrl, {} as ConnectOptions).then(() => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port})`);
  });
});
