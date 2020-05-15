import morgan from 'morgan';
import logger from '../helpers/logger';

logger.stream = {
  write: message => logger.info(message.substring(0, message.lastIndexOf('\n')))
};

export default morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  { stream: logger.stream }
);
