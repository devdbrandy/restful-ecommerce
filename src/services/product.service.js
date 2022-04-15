import models from '@models'
import BaseService from './base.service'

class ProductService extends BaseService {
    async getBySlug(slug) {
        return models.Product.findOne({
            where: {
                slug,
            },
        })
    }
}

const { Product } = models
export default new ProductService(Product)
