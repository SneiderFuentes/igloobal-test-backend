import { HttpException } from './HttpException';

export class BadRequestException extends HttpException {
  constructor(message = 'Bad Request') {
    super(message, 400);
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
