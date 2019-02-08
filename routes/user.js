import express from 'express';
import userController from '../controllers/user';

const router = express.Router();

router.get('/menu/', userController.getMenus);

module.exports = router;
