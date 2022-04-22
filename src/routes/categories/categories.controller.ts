import * as categoryService from '../../services/category.service'
import { Request } from '../../helpers/constants'
import { Response } from 'express'

export const getAllCategories = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const categories = await categoryService.getAllCategories()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const category = await categoryService.getCategoryById(+id)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body
    try {
        const category = await categoryService.createCategory({
            name
        })
        res.status(201).json(category)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    try {
        const category = await categoryService.updateCategory(+id, {
            name,
        })
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Delete product by id
export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await categoryService.deleteCategory(+id)
        res.status(200).json({ message: 'Category deleted' })
    } catch (error) {
        res.status(500).json(error)
    }
}
