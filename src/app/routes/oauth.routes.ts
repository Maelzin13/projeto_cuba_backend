import { Router } from 'express';
import { AuthHandling } from '../middlewares/auth-handling.middleware';

const OAuthRoutes = Router();

OAuthRoutes.get('/login/oauth', AuthHandling);

const router = Router();
let BASE_URL = process.env.NODE_BASE_URL || '/api/v1';

router.use(`${BASE_URL}`, OAuthRoutes);

export default router;
