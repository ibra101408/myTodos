// types.ts
import { Request } from 'express';

export interface IRequestWithSession extends Request {
    sessionToken?: string;
    userId?: number;
}
import { Session } from 'express-session';

declare module 'express' {
    interface Request {
        session?: Session;
    }
}