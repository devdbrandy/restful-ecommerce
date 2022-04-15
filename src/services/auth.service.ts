import bcrypt from 'bcryptjs'
import createError from 'http-errors'

import { getByEmail, create } from './user.service'
import JWTService from './jwt.service'

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

        const newUser = await create({
            email,
            password,
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

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body
        const user = await getByEmail(email)

        if (!user) {
            throw createError(404, messages.USER_NOT_FOUND)
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw createError(401, messages.INVALID_PASSWORD)
        }

        const token = JWTService.sign(user)

        res.status(200).json({
            token,
            user,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
