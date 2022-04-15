import * as productService from '../../services/product.service'
import ExceptionHandler from '../../helpers/exception'
import Response from '../../helpers/response'
import BaseController from '../base-controller'

class ProductsController extends BaseController {
    getAllProducts() {
        return this.asyncWrapper(async (req, res) => {
            const products = await productService.getAllProducts()

            this.sendResponse(res, products)
        })
    }

    getProduct() {
        return this.asyncWrapper(async (req, res) => {
            const { slug } = req.params
            const product = await productService.getProductBySlug(slug)

            ExceptionHandler.throwErrorIfNull(product)

            this.sendResponse(res, product)
        })
    }

    createProduct() {
        return this.asyncWrapper(async (req, res) => {
            const { body } = req
            const product = await productService.createProduct(body)

            this.sendResponse(res, product, undefined, 201)
        })
    }

    updateProduct() {
        return this.asyncWrapper(async (req, res) => {
            const {
                body,
                params: { id: productId },
            } = req
            const product = await productService.updateProduct(productId, body)

            this.sendResponse(res, product)
        })
    }

    deleteProduct() {
        return this.asyncWrapper(async (req, res) => {
            const { id: productId } = req.params

            await productService.deleteProduct(productId)
            this.sendResponse(res, null, null, 204)
        })
    }
}

const controller = new ProductsController()
export default controller
