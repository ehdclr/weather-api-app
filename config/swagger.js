import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Weather-api-app",
      version: "1.0.0",
      description: "과제 제출용(weather-api-app) API 입니다.",
    },
    basePath: "/",
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "connect.sid", // 쿠키 이름 (세션 ID를 포함한 쿠키)
        },
      },
    },
  },
  apis: ["./docs/**/*.swagger.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
