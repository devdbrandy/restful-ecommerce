import { Response } from 'express'
import { Request } from '../../helpers/constants'
import * as orderService from '../../services/order.service'

export const getOrders = async (req: Request, res: Response) => {
    const { id: userId } = req.user
    const orders = await orderService.getOrders(userId)
    return orders
}

export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params
    const order = await orderService.getOrder(+id)
    return order
}

export const placeOrder = async (req: Request, res: Response) => {
    const { id: userId } = req.user
    const { id: productId } = req.params
    const order = await orderService.placeOrder(userId, +productId)
    return order
}

export const cancelOrder = async (req: Request, res: Response) => {
    const { id } = req.params
    const order = await orderService.cancelOrder(+id)
    return order
}

export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params
    const order = await orderService.updateOrder(+id, req.body)
    return order
}
