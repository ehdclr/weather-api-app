import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

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
  apis: ['./docs/*.swagger.js'], // 절대 경로 사용
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
