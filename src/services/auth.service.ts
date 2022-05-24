import * as bcrypt from 'bcrypt'
import * as createError from 'http-errors'

import { getByEmail, create } from './user.service'
import * as JWTService from './jwt.service'

import { messages } from '../helpers/constants'
import logger from '../helpers/logger'
import { NextFunction, Request, Response } from 'express'

export const register = async (args: { email: string; password: string }) => {
    const { email, password } = args
    try {
        const user = await getByEmail(email)

        if (user) {
            throw createError(409, messages.USER_ALREADY_EXISTS)
        }

        const { password: _, ...newUser } = await create({
            email,
            password: await bcrypt.hash(password, 'saltysalty'),
        })

        const token = JWTService.sign(newUser)

        return {
            token,
            user: newUser,
        }
    } catch (error) {
        logger.error(error)
    }
}

export const login = async (args: { email: string; password: string }) => {
    const { email, password } = args
    const { password: storedPassword, ...user } = await getByEmail(email)

    if (!user) {
        throw createError(404, messages.USER_NOT_FOUND)
    }

    const isPasswordValid = await bcrypt.compare(password, storedPassword)

    if (!isPasswordValid) {
        throw createError(401, messages.INVALID_PASSWORD)
    }

    const token = JWTService.sign(user)

    return {
        token,
        user,
    }
}
