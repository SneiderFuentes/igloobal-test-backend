import { Response } from 'express';

export const successResponse = (res: Response, data: any, statusCode = 200) => {
  return res.status(statusCode).json({
    status: 'success',
    data,
  });
};

export const errorResponse = (res: Response, message: string, statusCode = 400) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
  });
};
