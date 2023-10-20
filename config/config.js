import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config();
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({path: './.env.development'});
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({path: './.env.test'});
}
