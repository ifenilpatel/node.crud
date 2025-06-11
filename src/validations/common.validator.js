import { query } from 'express-validator';

export const pageIndex = query('pageIndex')
  .isInt({ min: 0 })
  .withMessage('pageIndex must be a non-negative integer')
  .toInt();

export const pageSize = query('pageSize')
  .isInt({ min: 0 })
  .withMessage('pageSize must be a non-negative integer')
  .toInt();
