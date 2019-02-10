import express from 'express';
import MealController from './controllers/meals';
import MenuController from './controllers/menu';
import OrderController from './controllers/orders';

const router = express.Router();

router.get('/meals/', MealController.getMealOptions);

router.post('/meals/', MealController.addMealOption);

router.put('/meals/:id', MealController.updateMealOption);

router.delete('/meals/:id', MealController.deleteMealOption);

router.post('/menu/:mealId', MenuController.addMealToMenu);

router.get('/menu/', MenuController.getMenus);

router.get('/orders', OrderController.getOrders);

router.post('/orders', OrderController.orderMeal);

module.exports = router;
