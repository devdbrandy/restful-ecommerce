import { Order } from '@prisma/client'
import { prisma } from '../prisma'

export const getOrders = async (userId: number): Promise<Order> => {
    return await prisma.order.findFirst({
        where: {
            userId,
        },
    })
}

export const getOrder = async (id: number): Promise<Order> => {
    return await prisma.order.findFirst({
        where: {
            id,
        },
    })
}

export const placeOrder = async (userId: number, productId: number) => {
    console.log('TODO')
}

export const cancelOrder = async (id: number) => {
    console.log('TODO')
}

export const updateOrder = async (id: number, status: string) => {
    console.log('TODO')
}
