import express, { Router } from 'express';
const router = express.Router();
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controller/todo.controller.ts'
import { authenticate } from '../middleware/user.middleware.ts';

router.post('/create',authenticate,createTodo);
router.get('/fetch', getTodos);
router.put('/update/:id',updateTodo);
router.delete('/delete/:id', deleteTodo)


export default router;