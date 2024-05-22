import cors from 'cors';
import ApiRoutes from './app/routes/api-v1-routes';
import DocRoutes from './app/routes/doc-routes';
import express, { type Express } from 'express';
import {ErrorHandling} from "./app/middlewares/error-handling";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', ApiRoutes);
app.use('/docs', DocRoutes);
app.use(ErrorHandling);

export default app;