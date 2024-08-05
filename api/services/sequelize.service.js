const { Sequelize } = require('sequelize');
const fs = require('fs');
const logger = require('../config/logger');
const config = require('../config');

const modelFiles = fs
  .readdirSync(`${__dirname}/../models/`)
  .filter((file) => file.endsWith('.js'));

const sequelizeService = {
  init: async () => {
    try {
      const sequelize = new Sequelize(config.postgres);

      // eslint-disable-next-line no-restricted-syntax
      for (const file of modelFiles) {
        // eslint-disable-next-line
        const model = await require(`../models/${file}`);
        model.init(sequelize);
      }

      modelFiles.map(async (file) => {
        // eslint-disable-next-line
        const model = await require(`../models/${file}`);
        // eslint-disable-next-line no-unused-expressions
        model.associate && model.associate(sequelize.models);
      });

      logger.info('[SEQUELIZE] Database service initialized');
    } catch (error) {
      logger.info('[SEQUELIZE] Error during database service initialization');
      throw error;
    }
  },
};

module.exports = sequelizeService;
