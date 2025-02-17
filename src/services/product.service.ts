import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../models/product.entity';
import { NotFoundException } from '../errors/NotFoundException';

export const getAllProducts = async (): Promise<Product[]> => {
  return await ProductRepository.findAll();
};

export const createProduct = async (data: Partial<Product>): Promise<Product> => {
  return await ProductRepository.create(data);
};

export const deleteProduct = async (id: number): Promise<void> => {
  const existing = await ProductRepository.findById(id);
  if (!existing) {
    throw new NotFoundException(`Producto con ID ${id} no encontrado`);
  }
  await ProductRepository.delete(id);
};

