import * as authService from '../../services/auth.service'
import logger from '../../helpers/logger'
import { Request, Response } from 'express'

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await authService.register({ email, password })
        res.status(201).json(user)
    } catch (error) {
        logger.error(error)
        res.status(500).json(error)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await authService.login({ email, password })
        res.status(200).json(user)
    } catch (error) {
        logger.error(error)
        res.status(500).json(error)
    }
}
