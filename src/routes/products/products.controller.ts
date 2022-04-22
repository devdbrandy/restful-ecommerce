import * as productService from '../../services/product.service'
import { Request } from '../../helpers/constants'
import { Response } from 'express'

export const getAllProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const products = await productService.getAllProducts()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getProductBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params
    try {
        const product = await productService.getProductBySlug(slug)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const product = await productService.getProductById(+id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const createProduct = async (req: Request, res: Response) => {
    const { title, description, price, slug, image } = req.body
    try {
        const product = await productService.createProduct({
            title,
            description,
            price,
            slug,
        })
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, description, price, slug, image } = req.body
    try {
        const product = await productService.updateProduct(+id, {
            title,
            description,
            price,
            slug,
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Delete product by id
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await productService.deleteProduct(+id)
        res.status(200).json({ message: 'Product deleted' })
    } catch (error) {
        res.status(500).json(error)
    }
}
