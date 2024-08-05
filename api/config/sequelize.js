const Joi = require('joi');
const dotenv = require('dotenv');

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    POSTGRES_DB_USER: Joi.string().required().description('Postgres DB User'),
    POSTGRES_DB_HOST: Joi.string().required().description('Postgres DB Host').default('localhost'),
    POSTGRES_DB_PASS: Joi.string().required().description('Postgres DB Password'),
    POSTGRES_DB_NAME: Joi.string().required().description('Postgres DB Name'),
  });

const { value: envVars } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

const postgresConfigs = {
  dialect: 'postgres',
  host: envVars.POSTGRES_DB_HOST,
  username: envVars.POSTGRES_DB_USER,
  password: envVars.POSTGRES_DB_PASS,
  database: envVars.POSTGRES_DB_NAME + (envVars.NODE_ENV === 'test' ? '_test' : ''),
  define: {
    timestamps: true,
  },
};

module.exports = postgresConfigs;
