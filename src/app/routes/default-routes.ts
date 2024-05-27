import { Request, Response, Router } from 'express';

const defaultRoutes = Router();

defaultRoutes.get('/', (req: Request, res: Response) => {
  res.send('Welcome Dev Cube API');
});

const router = Router();
let BASE_URL = process.env.NODE_BASE_URL || '/api/v1';

router.use(`${BASE_URL}`, defaultRoutes);

export default router;
