import * as createError from 'http-errors'
import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import * as path from 'path'
import * as cors from 'cors'

import httpLogger from './middlewares/http-logger'
import Exception from './helpers/exception'
import { messages } from './helpers/constants'

import routeModules from './routes'

const app = express()
const port = process.env.PORT || 4000
const { NOT_FOUND } = messages

app.use(httpLogger)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/../public')))
app.use(cors({ origin: true, credentials: true }))

// register modules
routeModules(app)

// catch 404 and forward to exception handler
app.use((req, res, next) => next(createError(404, NOT_FOUND)))

// exception handlers
app.use(Exception.handleDatabaseError())
app.use(Exception.handleDatabaseUniqueError())

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})

export default app
