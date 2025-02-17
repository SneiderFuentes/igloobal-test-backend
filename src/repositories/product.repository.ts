import { AppDataSource } from '../config/data-source';
import { Product } from '../models/product.entity';

export const productRepository = AppDataSource.getRepository(Product);

export const ProductRepository = {
  findAll: async (): Promise<Product[]> => {
    return await productRepository.find();
  },

  findById: async (id: number): Promise<Product | null> => {
    return await productRepository.findOneBy({ id });
  },

  create: async (productData: Partial<Product>): Promise<Product> => {
    const newProduct = productRepository.create(productData);
    return await productRepository.save(newProduct);
  },

  delete: async (id: number): Promise<void> => {
    await productRepository.delete(id);
  },
};
