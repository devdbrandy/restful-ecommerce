import url from 'url';
import { env } from '@helpers/utils';
import db from '@config/db';

describe('Database Configuration Options', () => {
  it('should return database options if DATABASE_URL is set', () => {
    const databaseURL = url.format({
      protocol: env('DB_CONNECTION'),
      hostname: env('DB_HOST'),
      port: env('DB_PORT', 5432),
      pathname: env('DB_DATABASE'),
      auth: `${env('DB_USERNAME')}:${env('DB_PASSWORD')}`,
      slashes: true
    });
    const options = db.dbOptions(databaseURL);

    expect(options).toHaveProperty('use_env_variable');
  });
});
