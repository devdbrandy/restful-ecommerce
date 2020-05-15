import ResponseHandler from '@helpers/response';

const asyncWrapper = fn => (req, res, next) => fn(req, res, next).catch(next);

class BaseController {
  constructor(service) {
    this.service = service;
    this.asyncWrapper = asyncWrapper;
    this.sendResponse = ResponseHandler.send;
  }
}

export default BaseController;
