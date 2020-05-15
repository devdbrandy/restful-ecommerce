/**
 * Module dependencies.
 */
import { createServer } from 'http';

import { env, normalizePort } from '@helpers/utils';
import app from '@src/app';
import logger from '@helpers/logger';

/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(env('PORT', 3000));
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = createServer(app);

/**
 * Event listener for HTTP server "error" event.
 *
 * @param {object} error - Error object
 * @returns {void}
 */
const onError = error => {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      port += 1;
      logger.error(`${bind} is already in use, trying ${port}`);
      server.listen(port);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const address = server.address();
  const bind =
    typeof address === 'string' ? `pipe ${address}` : `port: ${address.port}`;

  logger.info(`🚀 We are live on ${bind}`);
};

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
