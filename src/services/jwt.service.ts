import * as jwt from 'jsonwebtoken'
import { env } from '../helpers/utils'
import { User } from '@prisma/client'

export const sign = (payload: User): string => {
    return jwt.sign(payload, env('JWT_SECRET', 'secret'))
}

export const verify = (token: string): { user: User } => {
    try {
        return jwt.verify(token, env('JWT_SECRET', 'secret')) as { user: User }
    } catch (err) {
        return null
    }
}
