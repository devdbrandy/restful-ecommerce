import ResponseHandler from '../helpers/response'

const asyncWrapper = (fn) => (req, res, next) =>
    fn(req, res, next).catch((err) => {
        console.log(JSON.stringify(err))
        next()
    })

class BaseController {
    constructor(service) {
        this.service = service
        this.asyncWrapper = asyncWrapper
        this.sendResponse = ResponseHandler.send
        this.sendError = ResponseHandler.sendError
    }
}

export default BaseController
