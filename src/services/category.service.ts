import { prisma } from '../prisma'
import { Category, Prisma } from '@prisma/client'

// Get all products
export const getAllCategories = async (): Promise<Category[]> => {
    return prisma.category.findMany()
}

// Get product from database by id
export const getCategoryById = async (id: number): Promise<Category> => {
    const category = await prisma.category.findUnique({
        where: {
            id,
        },
    })
    return category
}

export const getCategoryByName = async (name: string): Promise<Category> => {
    const category = await prisma.category.findFirst({
        where: {
            name,
        },
    })
    return category
}

// Create product
export const createCategory = async (
    data: Prisma.CategoryCreateInput
): Promise<Category> => {
    const category = await prisma.category.create({
        data,
    })
    return category
}

// Update product
export const updateCategory = async (
    id: number,
    data: Prisma.CategoryUpdateInput
): Promise<Category> => {
    const category = await prisma.category.update({
        where: {
            id,
        },
        data,
    })
    return category
}

// Delete product
export const deleteCategory = async (id: number): Promise<Category> => {
    const category = await prisma.category.delete({
        where: {
            id,
        },
    })
    return category
}
