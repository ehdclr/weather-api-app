import express from 'express';
import cookieParser from 'cookie-parser';
import logger from './config/logger.js';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import './config/config.js';
import errorHandler from './middleware/errorHandler.middleware.js';
import forecast from './routes/forecast.router.js';
import region from './routes/region.router.js';
import admin from './routes/admin.router.js';
import { connectToDb } from './config/database.js';
import session from 'express-session';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use((session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { //https 여부 
    secure: false,
    maxAge: 36000000,
  },
})));

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
app.use('/api',region);
app.use('/api', forecast);
app.use('/api',admin);
app.use(errorHandler);


export default app;
