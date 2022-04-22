import { prisma } from '../prisma'
import { Product, Prisma } from '@prisma/client'

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
    return prisma.product.findMany()
}

// Get product from database by slug
export const getProductBySlug = async (slug: string): Promise<Product> => {
    const product = await prisma.product.findFirst({
        where: {
            slug,
        },
    })
    return product
}

// Get product from database by id
export const getProductById = async (id: number): Promise<Product> => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    })
    return product
}

// Create product
export const createProduct = async (
    data: Prisma.ProductCreateInput
): Promise<Product> => {
    const product = await prisma.product.create({
        data,
    })
    return product
}

// Update product
export const updateProduct = async (
    id: number,
    data: Prisma.ProductUpdateInput
): Promise<Product> => {
    const product = await prisma.product.update({
        where: {
            id,
        },
        data,
    })
    return product
}

// Delete product
export const deleteProduct = async (id: number): Promise<Product> => {
    const product = await prisma.product.delete({
        where: {
            id,
        },
    })
    return product
}
