import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather-api-app',
      version: '1.0.0',
      description: '과제 제출용(weather-api-app) API 입니다.',
    },
    basePath: '/',
  },
  apis: ['./docs/*.swagger.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
