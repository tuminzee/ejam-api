import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(8080),
  CAN_SEED_SUPERHEROES: Joi.boolean().default(false),
});

export const sharedConfig = () => ({
  pagination: {
    defaultPage: 1,
    defaultPageSize: 10,
  },
});
