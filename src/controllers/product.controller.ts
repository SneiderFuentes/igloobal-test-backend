import { Request, Response, NextFunction } from 'express';
import * as ProductService from '../services/product.service';
import { successResponse } from '../utils/responseHandler';

export const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await ProductService.getAllProducts();
    successResponse(res, products, 200);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newProduct = await ProductService.createProduct(req.body);
    successResponse(res, newProduct, 201);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await ProductService.deleteProduct(Number(id));
    successResponse(res, { message: 'Producto eliminado con éxito' }, 200);
  } catch (error) {
    next(error);
  }
};
