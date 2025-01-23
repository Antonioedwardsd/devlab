import { Router } from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from '../controllers/todosController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createTodo);
router.get('/', authMiddleware, getTodos);
router.get('/:id', authMiddleware, getTodoById);
router.put('/:id', authMiddleware, updateTodo);
router.delete('/:id', authMiddleware, deleteTodo);

export default router;
