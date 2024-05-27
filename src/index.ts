// import 'reflect-metadata';
import app from './app';
import path from 'path';

require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port})`);
});
