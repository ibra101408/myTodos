//const http: = require('http:');
//const fs = require('fs');

import express, {Express, NextFunction, Request, Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import {Error} from './types';
import * as dotenv from 'dotenv';
import usersRoutes from "./routes/usersRoutes";
import sessionsRoutes from "./routes/sessionsRoutes";
import tasksRoutes from "./routes/tasksRoutes";
import cors from 'cors';
//import expressWs from 'express-ws';

dotenv.config();
const port: Number = Number(process.env.PORT) || 3000;
const app: Express = express();
const swaggerDocument: Object = YAML.load('./swagger.yaml');
//const { app: appWithWs, getWss } = expressWs(app);

/*
const options = {
    key: fs.readFileSync('../../todos/certs/myCA.pem'),
    cert: fs.readFileSync('../../todos/certs/myCA.pem')
};*/

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    return res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
});

// Routes

app.use('/users', usersRoutes);
app.use('/sessions', sessionsRoutes);
app.use('/tasks', tasksRoutes);

// Health check
app.get('/health-check', (req, res) => {
    res.status(200).send('OK');
});


// Start the server
app.listen(port, () => console.log(`Running at http://localhost:${port} and docs at http://localhost:${port}/docs`));

//const http:Server = http:.createServer(options, app);

// Start the server
//http:Server.listen(port, () => console.log(`Running at https://localhost:${port} and docs at https://localhost:${port}/docs`));
