import express, { Router } from 'express';
const router = express.Router();
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controller/todo.controller.ts'

router.post('/create',createTodo);
router.get('/fetch', getTodos);
router.put('/update/:id',updateTodo);
router.delete('/delete/:id', deleteTodo)


export default router;