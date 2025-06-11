import { Router } from 'express';
const router = Router();

import validationHandler from '../middleware/validation.middleware.js';
import { pageIndex, pageSize } from '../validations/common.validator.js';
import { department_id, title } from '../validations/department.validation.js';

import {
  onDeleteById,
  onInsert,
  onSelectAll,
  onSelectById,
  onSelection,
  onUpdate,
} from '../controllers/department.controller.js';

router.get('/v1/api_selection', onSelection);

router.get('/v1/api_selectbyid/:department_id', [department_id, validationHandler], onSelectById);

router.get('/v1/api_selectall', [pageIndex, pageSize, validationHandler], onSelectAll);

router.post('/v1/api_insert', [title, validationHandler], onInsert);

router.put('/v1/api_update/:department_id', [department_id, title, validationHandler], onUpdate);

router.delete('/v1/api_deletebyid/:department_id', [department_id, validationHandler], onDeleteById);

export default router;
