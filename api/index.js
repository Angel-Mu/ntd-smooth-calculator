const AppService = require('./services/app.service');
const sequelizeService = require('./services/sequelize.service');
const logger = require('./config/logger');
const config = require('./config');

let server;

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('[API] Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('[SIGTERM] received');
  if (server) {
    server.close();
  }
});

(async () => {
  await sequelizeService.init();
  const app = await AppService.init();
  server = app.listen(config.port, () => {
    logger.info(`[API] Listening to port ${config.port}`);
  });
})();
