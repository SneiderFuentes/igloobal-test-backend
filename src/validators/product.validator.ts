import { body } from 'express-validator';

export const createProductValidator = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser un texto'),
  body('description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isString().withMessage('La descripción debe ser un texto'),
  body('price')
    .notEmpty().withMessage('El precio es obligatorio')
    .isNumeric().withMessage('El precio debe ser numérico'),
];
