const swaggerJSDoc = require('swagger-jsdoc');
const { config } = require('../env');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Node.js API',
    version: '1.0.0',
    description: 'Node.js Microservice API with Swagger',
  },
  servers: [
    {
      url: 'http://localhost:' + config.port,
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['../routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
