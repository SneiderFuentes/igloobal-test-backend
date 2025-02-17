import { HttpException } from './HttpException';

export class NotFoundException extends HttpException {
  constructor(message = 'Not Found') {
    super(message, 404);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}
