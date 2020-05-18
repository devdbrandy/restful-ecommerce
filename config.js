import { resolve } from 'path';
import { load } from 'dotenv-extended';
import { env } from '@helpers/utils';

const dotenvFile = env('NODE_ENV') === 'test' ? '.env.test' : '.env';

load({
  silent: true,
  path: resolve(__dirname, dotenvFile),
  defaults: resolve(__dirname, '.env'),
  schema: resolve(__dirname, '.env.example'),
  errorOnMissing: env('NODE_ENV') === 'development',
  errorOnExtra: false,
  errorOnRegex: false,
  overrideProcessEnv: false
});
