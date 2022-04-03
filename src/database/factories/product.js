import faker from 'faker'
import models from '@models'

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * @typedef {import('sequelize').Model} Model
 */

/**
 * @typedef {Object} Product
 * @property {string} title - The product title
 * @property {string} description - The product description
 * @property {string} price - The product price
 * @property {string} imageUrl - The product imageUrl
 */

/**
 * Generates a roduct object with default attributes
 *
 * @param {Product} [props={}] - The product properties
 */
export const productFactory = (props = {}) => {
    const defaultProps = {
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: +faker.commerce.price(),
        imageUrl: 'https://picsum.photos/600/800',
        stock: getRandomInt(2, 10),
    }

    return { ...defaultProps, ...props }
}

/**
 * Instantiate product class with default attributes
 * @param {Product} [props={}] - The product properties
 * @returns {Model} A product model
 */
export const build = (props) => new models.Product(productFactory(props))

/**
 * Generates a product model instance with default attributes
 * @param {Product} [props={}] - The product properties
 * @returns {Model|Product}
 */
export default async (props, plain = true) => {
    let product = await models.Product.create(productFactory(props))

    if (plain) {
        product = product.get()
        delete product.deletedAt
    }

    return product
}
