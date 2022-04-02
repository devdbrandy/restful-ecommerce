import bcrypt from 'bcryptjs'
import createError from 'http-errors'

import UserService from '@services/user.service'
import JWTService from '@services/jwt.service'

import { messages } from '@helpers/constants'
import logger from '@helpers/logger'

/**
 * Auth Service Module
 *
 * @export
 * @class AuthService
 */
class AuthService {
    static async register(user) {
        // create and persist user
        let newUser
        try {
            newUser = await UserService.create(user, { plain: true })
        } catch (err) {
            console.log(err)
        }

        if (!newUser) {
            throw createError(500, 'Failed to create user')
        }

        // generate jwt token from user payload
        const token = JWTService.sign(newUser)
        return { ...newUser, token }
    }

    static async login(email, password) {
        // fetch user data
        try {
            const user = await UserService.getByEmail(email, { plain: true })

            if (!(await bcrypt.compare(password, user.password))) {
                const { INVALID_CREDENTIALS } = messages
                throw createError(403, INVALID_CREDENTIALS)
            }

            const { password: pass, ...userWithoutPassword } = user
            const token = JWTService.sign(userWithoutPassword)
            return { ...userWithoutPassword, token }
        } catch (err) {
            if (err?.statusCode === 403) {
                throw err
            }
            logger.error(err)
            throw createError(500, 'Failed to log in')
        }
    }
}

export default AuthService
