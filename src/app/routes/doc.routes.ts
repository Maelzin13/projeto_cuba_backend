import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from '../../docs/swagger/swagger-specs';
import { Request, Response, Router } from 'express';

const DocRoutes = Router();
const specs = swaggerJSDoc(swaggerSpecs);

DocRoutes
  .get('/swagger.json', (req:Request, res:Response) => {
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


router.use(`${BASE_URL}`, DocRoutes)

export default router;
