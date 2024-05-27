import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from '../../docs/swagger/swagger-specs';
import { Router } from 'express';

const topicsRoutes = Router();
const specs = swaggerJSDoc(swaggerSpecs);

topicsRoutes
  .get('/swagger.json', (req, res) => {
    res.json(specs);
  })
  .get(
    '/swagger',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      explorer: true,
      swaggerUrl: '/docs/swagger.json',
    })
  );

const router = Router();
let BASE_URL = process.env.NODE_BASE_URL || '/api/v1';


router.use(`${BASE_URL}`, topicsRoutes)

export default router;
