import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column('text')
  description!: string;

  @Column({
    type: 'decimal',
    transformer: {
      to: (value: number) => value, // Guardar como número
      from: (value: string) => parseFloat(value), // Convertir de string a number
    },
  })
  price!: number;
}
