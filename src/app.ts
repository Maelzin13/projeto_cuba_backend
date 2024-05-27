import cors from 'cors';
import express, { type Express } from 'express';
import { ErrorHandling } from './app/middlewares/error-handling';
import DefaultRoutes from './app/routes/default-routes';
import DocRoutes from './app/routes/doc-routes';
const app: Express = express();

app
  .use(cors())
  .use(express.json())
  .use(ErrorHandling)
  .use(DefaultRoutes)
  .use(DocRoutes);

export default app;
