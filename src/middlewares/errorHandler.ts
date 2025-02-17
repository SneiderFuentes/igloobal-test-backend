import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../errors/HttpException';
import { errorResponse } from '../utils/responseHandler';
import { ErrorRequestHandler } from 'express'; // 🔥 Usa el tipo nativo

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    errorResponse(res, err.message, err.status);
    return;
  }

  console.error(err);
  errorResponse(res, 'Internal Server Error', 500);
  return;
};
