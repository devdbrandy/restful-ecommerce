import { productFactory } from '@factories/product';

export const up = async queryInterface => {
  const demoProducts = [];

  for (let i = 0; i < 5; i += 1) {
    const product = productFactory();
    demoProducts.push(product);
  }

  await queryInterface.bulkInsert('Products', [...demoProducts], {});
};

export const down = queryInterface =>
  queryInterface.bulkDelete('Products', null, {});
