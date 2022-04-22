import homeRouter from './home'
import authRouter from './auth'
import usersRoute from './users'
import productsRoute from './products'
import ordersRoute from './orders'
import categoryRoute from './categories'

/**
 * Routes register
 *
 * @param {object} app - The express main app
 * @returns {void}
 */
const routes = (app) => {
    const apiPrefix = '/api/v1'

    app.use(homeRouter)
    app.use(authRouter)
    app.use(apiPrefix, usersRoute)
    app.use(apiPrefix, productsRoute)
    app.use(apiPrefix, ordersRoute)
    app.use(apiPrefix, categoryRoute)

    return app
}

export default routes
