import * as categoryService from '../../services/category.service'
import { Request } from '../../helpers/constants'
import { Response } from 'express'

export const getAllCategories = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const products = await categoryService.getAllCategories()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
}

// export const getProductById = async (req: Request, res: Response) => {
//     const { id } = req.params
//     try {
//         const product = await categoryService.getProductById(+id)
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

export const createCategory = async (req: Request, res: Response) => {
    const { title, description, price, slug, image } = req.body
    try {
        const product = await categoryService.createCategory({
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

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, description, price, slug, image } = req.body
    try {
        const product = await categoryService.updateCategory(+id, {
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
export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await categoryService.deleteCategory(+id)
        res.status(200).json({ message: 'Product deleted' })
    } catch (error) {
        res.status(500).json(error)
    }
}
