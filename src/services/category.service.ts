import { prisma } from '../prisma'
import { Category, Prisma } from '@prisma/client'

// Get all products
export const getAllCategories = async (): Promise<Category[]> => {
    return prisma.category.findMany()
}

// Get product from database by id
export const getCategoryById = async (id: number): Promise<Category> => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    })
    return product
}

// Create product
export const createCategory = async (
    data: Prisma.ProductCreateInput
): Promise<Category> => {
    const product = await prisma.product.create({
        data,
    })
    return product
}

// Update product
export const updateCategory = async (
    id: number,
    data: Prisma.ProductUpdateInput
): Promise<Category> => {
    const product = await prisma.product.update({
        where: {
            id,
        },
        data,
    })
    return product
}

// Delete product
export const deleteCategory = async (id: number): Promise<Category> => {
    const product = await prisma.product.delete({
        where: {
            id,
        },
    })
    return product
}
