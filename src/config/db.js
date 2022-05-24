import { env } from '../helpers/utils'

const environment = env('NODE_ENV', 'development')
const databaseURL = env('DATABASE_URL')

const dbOptions = (dbURL) => {
    const options = {
        use_env_variable: 'DATABASE_URL',
        dialectOptions: {
            ssl: env('DB_SSL', false),
        },
    }
    return dbURL ? options : {}
}

module.exports = {
    [environment]: {
        username: env('DB_USERNAME', 'postgres'),
        password: env('DB_PASSWORD', 'postgres'),
        database: env('DB_DATABASE', 'mydb'),
        host: env('DB_HOST', '172.17.0.2'),
        dialect: env('DB_CONNECTION', 'postgres'),
        logging: env('DB_LOGGING', false),
        ...dbOptions(databaseURL),
    },

    dbOptions,
}
