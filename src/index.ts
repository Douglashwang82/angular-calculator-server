import app from './app';
import http from 'http';
import Logger from '../utils/logger';
import config from '../utils/config';

const PORT = config.PORT;
const server = http.createServer(app);

server.listen(PORT, () => {
  Logger.info(`Server is running on port ${PORT}.`);
});