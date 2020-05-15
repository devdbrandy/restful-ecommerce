import models from '@models';
import BaseService from './base.service';

class ProductService extends BaseService {}

const { Product } = models;
export default new ProductService(Product);
