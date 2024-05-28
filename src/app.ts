import cors from 'cors';
import express, { type Express } from 'express';
import { ErrorHandling } from './app/middlewares/error-handling.middleware';
import DefaultRoutes from './app/routes/default.routes';
import DocRoutes from './app/routes/doc.routes';
import OAuthRoutes from './app/routes/oauth.routes';
import CookieParser from 'cookie-parser';
const app: Express = express();

const allowedOrigins = ['http://localhost:3000', 'https://github.com'];

app
  .use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  )
  .use(express.json())
  .use(CookieParser())
  .use(ErrorHandling)
  .use(DefaultRoutes)
  .use(DocRoutes)
  .use(OAuthRoutes);

export default app;
