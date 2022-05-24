import * as jwt from 'jsonwebtoken'
import { env } from '../helpers/utils'
import { User } from '@prisma/client'
import { UserWithoutPassword } from './types'

export const sign = (payload: UserWithoutPassword): string => {
    return jwt.sign(payload, env('JWT_SECRET', 'secret'))
}

export const verify = (token: string): { user: UserWithoutPassword } => {
    try {
        return jwt.verify(token, env('JWT_SECRET', 'secret')) as {
            user: UserWithoutPassword
        }
    } catch (err) {
        return null
    }
}
