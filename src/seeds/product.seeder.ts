import { AppDataSource } from '../config/data-source';
import { Product } from '../models/product.entity';

async function seedProducts() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source initialized for seeding');

    const productRepo = AppDataSource.getRepository(Product);

    const productsSeedData: Partial<Product>[] = [
      {
        name: 'Amoxicilina 500mg',
        description: 'Antibiótico para el tratamiento de infecciones bacterianas',
        price: 14.99
      },
      {
        name: 'Paracetamol 500mg',
        description: 'Analgésico y antipirético para aliviar el dolor y la fiebre',
        price: 8.49
      },
      {
        name: 'Ibuprofeno 400mg',
        description: 'Antiinflamatorio no esteroideo para tratar dolor, fiebre e inflamación',
        price: 9.99
      }
    ];

    const insertedProducts = productRepo.create(productsSeedData);
    await productRepo.save(insertedProducts);

    console.log('Seed completed: Products have been inserted.');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await AppDataSource.destroy();
    console.log('Data Source connection closed.');
  }
}

seedProducts().catch((err) => console.error(err));
