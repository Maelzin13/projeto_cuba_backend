import cors from 'cors';
import express, { type Express } from 'express';
import { ErrorHandling } from './app/middlewares/error-handling';
import DocSwagger from './app/routes/doc-routes';
const app: Express = express();

app
  .use(cors())
  .use(express.json())
  .use(ErrorHandling)
  .use(DocSwagger);

export default app;
