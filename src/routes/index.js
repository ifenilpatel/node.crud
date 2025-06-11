import { Router } from 'express';
const router = Router();

import departmentRoute from './department.route.js';

router.use('/department', departmentRoute);

export default router;
