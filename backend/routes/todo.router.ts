import express, { Router } from 'express';
const router = express.Router();
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controller/todo.controller.ts'

router.post('/todo',createTodo);
router.get('/todo', getTodos);
router.put('/todo/:id',updateTodo);
router.delete('/todo/:id', deleteTodo)


export default router;