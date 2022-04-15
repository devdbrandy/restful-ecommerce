import { prisma } from '../prisma'
import { User, Prisma } from '@prisma/client'

export const getAll = async (): Promise<User[]> => {
    return await prisma.user.findMany({
        orderBy: { id: 'asc' },
    })
}

export const getById = async (id: number): Promise<User> => {
    return await prisma.user.findUnique({ where: { id } })
}

export const create = async (data: Prisma.UserCreateInput): Promise<User> => {
    return await prisma.user.create({ data })
}

export const update = async (
    id: number,
    data: Prisma.UserUpdateInput
): Promise<User> => {
    return await prisma.user.update({ where: { id }, data })
}

export const getByEmail = async (email: string): Promise<User> => {
    return await prisma.user.findUnique({
        where: { email },
    })
}
