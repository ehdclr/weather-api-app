import http from 'http';
import app from './app.js';
import { startCronJobs } from './cron/cronManager.js';


const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

startCronJobs();


server.listen(PORT, () => {
  console.log('############################################');
  console.log(`####🔥 Server listening on port: ${PORT} 🔥####`);
  console.log('############################################');
});

