import { prisma } from '../prisma'
import { Product, Prisma } from '@prisma/client'

// Get all products
export const getAllProducts = async (
    categoryId?: number,
    search?: string,
    offset?: number,
    size?: number
): Promise<Product[]> => {
    const filters = {
        ...(categoryId && { categoryId }),
        ...(search && { title: { contains: search } }),
    }
    console.log(filters, !!filters)
    return prisma.product.findMany({
        ...(Object.keys(filters).length && { where: filters }),
        ...(offset && size && { skip: offset, take: size }),
    })
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
    try {
        const product = await prisma.product.create({
            data,
        })
        return product
    } catch (error) {
        console.log(error)
        throw error
    }
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
