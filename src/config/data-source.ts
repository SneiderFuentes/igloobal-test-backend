import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from '../models/product.entity';
import dotenv from 'dotenv';

dotenv.config();
const isCompiled = __filename.endsWith('.js');

export const AppDataSource = new DataSource({
  type: 'postgres', 
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [isCompiled ? 'dist/models/*.js' : 'src/models/*.ts'],
  migrations: [isCompiled ? 'dist/migrations/*.js' : 'src/migrations/*.ts'],
  synchronize: false, 
  logging: false
});