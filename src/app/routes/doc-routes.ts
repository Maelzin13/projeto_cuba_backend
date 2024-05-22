
import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from '../../docs/swagger/swagger-specs';

const router = Router();
const specs = swaggerJSDoc(swaggerSpecs);

router.use('/swagger.json', (req, res) => {
    res.json(specs);
})
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(undefined,{explorer: true, swaggerUrl: '/docs/swagger.json'}));

export default router;
