import express, { Request, Response } from 'express';
import { PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();



// Get all tasks
router.get('/', async (req: Request, res: Response) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create a new task
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const task = await prisma.task.create({
            data: {
                title,
                completed: false,
            },
        });
        res.json(task);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update an existing task
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.params.id);
        const { title, completed } = req.body;
        const task = await prisma.task.update({
            where: { id: taskId },
            data: {
                title,
                completed,
            },
        });
        res.json(task);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a task
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.params.id);
        await prisma.task.delete({
            where: { id: taskId },
        });
        res.json({ message: 'Task deleted successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;