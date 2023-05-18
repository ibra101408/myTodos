import express, { Request,  NextFunction, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { IRequestWithSession } from '../custom.d'


const prisma = new PrismaClient();
const router = express.Router();


// Get all tasks
router.get('/', async (req: Request, res: Response) => {
    try {

        const userId = req.session.userid; // Access the user ID from the session
        console.log("userId: ", userId);
        /* const user = await prisma.user.findUnique({
             where: { email: req.body.email },

         });
         if (!user) {
             return res.status(401).send({ error: 'Invalid email or password' });
         }
         console.log("user id is -- ", user.id);*/
        const tasks = await prisma.task.findMany();
        //const users = await prisma.user.findMany();
        const users = await prisma.user.findUnique({
            where: {
                id: 1
            }
        });
        console.log(users);
        res.json(tasks);

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create a new task
    router.post('/', async (req: Request, res: Response) => {
        try {

            const {title, userId} = req.body;
            console.log(req.body);
          /*  const users = await prisma.user.findUnique({
                where: {
                    userId: user_id
                },
            });
            if (users) {
                res.send("userss: " + users.id);
                console.log("undefined?", users);
                // Rest of the code that depends on the user's id
            }
            //res.send("userss: " + users.id);
          /*  console.log("undefined?", users); // print the user's id*/
            const task = await prisma.task.create({
                data: {
                    title,
                    completed: false,
                    userId
                },
                //  include: { user: true },
            });
            res.json(task);
            console.log(task);
        } catch (e) {
            console.error(e);
            res.status(500).json({message: 'Internal server error'});
        }
    });

// Update an existing task
    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const taskId = parseInt(req.params.id);
            const {title, completed} = req.body;
            const task = await prisma.task.update({
                where: {id: taskId},
                data: {
                    title,
                    completed,
                },
//            include: { user: true },
            });
            res.json(task);
        } catch (e) {
            console.error(e);
            res.status(500).json({message: 'Internal server error'});
        }
    });

// Delete a task
    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            const taskId = parseInt(req.params.id);
            await prisma.task.delete({
                where: {id: taskId},
            });
            res.json({message: 'Task deleted successfully'});
        } catch (e) {
            console.error(e);
            res.status(500).json({message: 'Internal server error'});
        }
    });
//}
export default router;
