import AuthService from '@services/auth.service'
import BaseController from '../base-controller'
import createError from 'http-errors'
import logger from '@helpers/logger'

class AuthController extends BaseController {
    register() {
        return this.asyncWrapper(async (req, res) => {
            const user = {
                email: req.body.email,
                password: req.body.password,
            }

            try {
                const payload = await AuthService.register(user)
                this.sendResponse(res, payload, undefined, 201)
            } catch (err) {
                console.log(err)
                this.sendError(res, createError(500, 'Failed to create user'))
            }
        })
    }

    login() {
        return this.asyncWrapper(async (req, res) => {
            const { email, password } = req.body
            try {
                const payload = await AuthService.login(email, password)
                this.sendResponse(res, payload)
            } catch (err) {
                logger.error(err)
                this.sendError(res, err)
            }
        })
    }
}

const controller = new AuthController(AuthService)
export default controller
