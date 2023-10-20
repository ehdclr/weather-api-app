import express from 'express';
import cookieParser from 'cookie-parser';
import logger from './config/logger.js';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import './config/config.js';
import errorHandler from './middleware/errorHandler.middleware.js';
import forecast from './routes/forecast.router.js';
import { connectToDb } from './config/database.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
}));

connectToDb();


app.get('/status', (req, res) => {
  logger.info('Health Check Url!');
  res.sendStatus(200);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//여기에 기상예보 관련 라우터 추가
app.use('/api', forecast);
app.use(errorHandler);


export default app;
