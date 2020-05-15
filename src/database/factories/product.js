import faker from 'faker';
import models from '@models';

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
    imageUrl: faker.image.imageUrl()
  };

  return { ...defaultProps, ...props };
};

/**
 * Instantiate product class with default attributes
 * @param {Product} [props={}] - The product properties
 * @returns {Model} A product model
 */
export const build = props => new models.Product(productFactory(props));

/**
 * Generates a product model instance with default attributes
 * @param {Product} [props={}] - The product properties
 * @returns {Model|Product}
 */
export default async (props, plain = true) => {
  let product = await models.Product.create(productFactory(props));

  if (plain) {
    product = product.get();
    delete product.deletedAt;
  }

  return product;
};
