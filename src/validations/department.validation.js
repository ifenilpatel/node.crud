import { param, body } from 'express-validator';

export const department_id = param('department_id')
  .isInt({ gt: 0 })
  .withMessage('Department ID must be a positive integer.');

export const title = body('title')
  .notEmpty()
  .withMessage('Department title is required.')
  .isString()
  .withMessage('Department title must be a string.');
