import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';
import { createProductValidator } from '../validators/product.validator';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();

router.get('/products', ProductController.getAllProducts);

router.post('/products', createProductValidator, validateRequest, ProductController.createProduct);

router.delete('/products/:id', ProductController.deleteProduct);

export default router;
