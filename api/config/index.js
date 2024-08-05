const Joi = require('joi');
const sequelizeConfig = require('./sequelize');

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    API_PORT: Joi.number().default(3000),
    DEFAULT_PAGE_SIZE: Joi.number().default(50),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.API_PORT,
  defaultPageSize: envVars.DEFAULT_PAGE_SIZE,
  postgres: {
    ...sequelizeConfig,
  },
};

module.exports = config;
