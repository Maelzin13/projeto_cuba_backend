export const swaggerSpecs = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EditalNET Backend',
      version: '1.0.0',
      description: 'TBA',
      contact: {
        name: 'Pedro Avidos',
        email: 'avidospedro@gmail.com',
      },
    },
    servers: [
      {
        description: 'Maquina de desenvolvimento local',
        url: `http://localhost:${process.env.PORT ?? 5000}/api/v1`,
      },
    ],
    components: {
      securitySchemes: {
        APP_JWT: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      parameters: {
        idProcesso: {
          name: 'idProcesso',
          in: 'path',
          description: 'ObjectId de um processo',
          required: true,
          schema: { type: 'string' },
        },
        idCertame: {
          name: 'idCertame',
          in: 'path',
          description: 'ObjectId de um certame',
          required: true,
          schema: { type: 'string' },
        },
      },
      responses: {
        '404': {
          description: 'Não encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/404NotFoundResponse',
              },
            },
          },
        },
        '422': {
          description: 'Erro de validação',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/422UnprocessableEntry',
              },
            },
          },
        },
      },
      schemas: {
        '404NotFoundResponse': {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              enum: [404],
            },
            message: {
              type: 'string',
            },
            errors: {
              type: 'array',
              default: [],
              items: {
                type: 'string',
              },
            },
          },
        },
        '422UnprocessableEntry': {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              enum: [422],
            },
            message: {
              type: 'string',
            },
            errors: {
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        APP_JWT: [],
      },
    ],
    tags: [
      {
        name: 'Autenticação',
        description: 'Rotas relacionadas a Autenticação',
      },
      {
        name: 'Processos',
        description: 'Rotas do CRUD de Processos',
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};
