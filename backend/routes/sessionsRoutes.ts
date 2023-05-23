import express, { NextFunction, Request, Response } from 'express';
import { handleErrors } from './handleErrors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();
const router = express.Router();


router.post(
    '/',
    handleErrors(async (req: Request, res: Response) => {
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: {email: req.body.email},

        });

        if (!user) {
            return res.status(401).send({error: 'Invalid email or password'});
        }
        console.log("req.body.id: ", req.body.id);
        console.log("req.body.email: ", req.body.email);
        console.log("user.id : ", user.id);

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(
            req.body.password,
            user?.password || ''
        );

        if (!passwordMatch) {
            return res.status(401).send({error: 'Invalid email or password'});
        }
        const session = await prisma.session.create({
            data: {
                userid: user.id,
                expires: new Date(),
            }
        });

        // Return session
        res.status(201).json({
            sessionToken: session.sessionToken
        })
    })
);
router.post(
    '/logout',
    handleErrors(async (req: Request, res: Response) => {
        const sessionToken = req.body.sessionToken;

        if (!sessionToken) {
            return res.status(401).send({ error: 'Invalid sessionID' });
        }

        // Delete the session from the database
        await prisma.session.delete({ where: { sessionToken: sessionToken } });

        return res.status(200).send({ message: 'You have been logged out' });
    })
);


export default router;
