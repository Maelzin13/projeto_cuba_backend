import { Router } from 'express';
import { Authenticate } from '../middlewares/authenticate.middleware';

const OAuthRoutes = Router();

OAuthRoutes.get('/login/oauth', Authenticate);

const router = Router();
let BASE_URL = process.env.NODE_BASE_URL || '/api/v1';

router.use(`${BASE_URL}`, OAuthRoutes);

export default router;
