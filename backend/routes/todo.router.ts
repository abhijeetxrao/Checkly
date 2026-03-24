import express, { Router } from 'express';
const router = express.Router();
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controller/todo.controller.ts'
import { authenticate } from '../middleware/user.middleware.ts';

router.post('/create',authenticate,createTodo);
router.get('/fetch', authenticate, getTodos);
router.put('/update/:id',authenticate,updateTodo);
router.delete('/delete/:id',authenticate, deleteTodo)


export default router;