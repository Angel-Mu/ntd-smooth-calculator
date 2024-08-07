const Joi = require('joi');
const sequelizeConfig = require('./sequelize');

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    DEFAULT_PAGE_SIZE: Joi.number().default(50),
    SERVER_JWT_SECRET: Joi.string().required(),
    DEFAULT_JWT_EXPIRATION: Joi.number().default(3600),
    RANDOM_STRING_URL: Joi.string().default('https://www.random.org/strings/?num=1&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new&len='),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  defaultPageSize: envVars.DEFAULT_PAGE_SIZE,
  jwtSecret: envVars.SERVER_JWT_SECRET,
  jwtExpiration: envVars.DEFAULT_JWT_EXPIRATION,
  randomStringUrl: envVars.RANDOM_STRING_URL,
  postgres: {
    ...sequelizeConfig,
  },
};

module.exports = config;
