import { Router } from 'express';
import { controllers } from './controllers/controllers';

export const router = Router();

router.post('/authenticate', controllers.authenticate)
router.post('/record/listall', controllers.listAllRecordsByUserId)
router.post('/record/create', controllers.createRecord)
router.post('/record/delete', controllers.deleteRecordById)