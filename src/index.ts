import "reflect-metadata";
import dotenv from 'dotenv';
import app from './app';
import * as mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT ?? 4500;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server;
const mongooseURL =
  process.env.MONGOOSE_URL ??
  'mongodb://root:example@localhost:27017/mongoose?authSource=admin';

void mongoose.connect(mongooseURL).then(() => {
  console.log(`⚡️MongooseConnected`);
  server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}).catch(error => { console.log(error); });
