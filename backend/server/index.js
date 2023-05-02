const WebSocket = require('ws');

// create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

let count = 0;

// handle WebSocket connection
wss.on('connection', ws => {
    // send current count to client
    ws.send(count.toString());

    // handle message received from client
    ws.on('message', message => {
        count = parseInt(message);
        // broadcast new count to all connected clients
        wss.clients.forEach(client => {
            client.send(count.toString());
        });
    });
});


/*const WebSocket = require('ws');
const express = require('express');
const app = express();

const port = 3000;
const wss = new WebSocket.Server({ port: 8081 });

let tasks = [];
let completedTaskCount = 0;

wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    // Send initial task list and completed task count to the new client
    ws.send(JSON.stringify({ type: 'INITIAL_TASK_LIST', data: tasks, completedTaskCount }));

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        console.log("we a here");
        if (parsedMessage.type === 'TASK_ADDED') {
            console.log(" TASK_ADDED!");
            tasks.push(parsedMessage.data);
            console.log(tasks);
            ws.send(JSON.stringify({ type: 'TASK_ADDED', data: parsedMessage.data }));
        } else if (parsedMessage.type === 'TASK_UPDATED') {
            console.log("TASK_upd");
            console.log(parsedMessage.data);
            const task = tasks.find(t => t.id === parsedMessage.data.id);
            task.title = parsedMessage.data.title;
            task.completed = parsedMessage.data.completed;

            // Update completed task count
            completedTaskCount = tasks.filter(t => t.completed).length;

            ws.send(JSON.stringify({ type: 'TASK_UPDATED', data: parsedMessage.data }));
        } else if (parsedMessage.type === 'TASK_DELETED') {
            tasks = tasks.filter(t => t.id !== parsedMessage.data.id);

            // Update completed task count
            completedTaskCount = tasks.filter(t => t.completed).length;

            ws.send(JSON.stringify({ type: 'TASK_DELETED', data: parsedMessage.data }));
        }
    });
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = { id: tasks.length + 1, title: req.body.title, completed: false };
    tasks.push(newTask);
    res.json(newTask);

    // Update completed task count
    completedTaskCount = tasks.filter(t => t.completed).length;

    // Broadcast to all clients
    wss.clients.forEach(client => {
        client.send(JSON.stringify({ type: 'TASK_ADDED', data: newTask }));
    });
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    task.title = req.body.title || task.title;
    task.completed = req.body.completed || task.completed;
    res.json(task);

    // Update completed task count
    completedTaskCount = tasks.filter(t => t.completed).length;

    // Broadcast to all clients
    wss.clients.forEach(client => {
        client.send(JSON.stringify({ type: 'TASK_UPDATED', data: task }));
    });
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const deletedTask = tasks.find(t => t.id === taskId);
    tasks = tasks.filter(t => t.id !== taskId);
    res.json(deletedTask);

    // Update completed task count
    completedTaskCount = tasks.filter(t => t.completed).length;

    // Broadcast to all clients
    wss.clients.forEach(client => {
        client.send(JSON.stringify({ type: 'TASK_DELETED', data: deletedTask }));
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


*/
/*
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

let completedTaskCount = 0;
let tasks = [];

wss.on('connection', ws => {
    console.log('new client connected');

    ws.send(JSON.stringify({ type: 'INITIAL_TASK_LIST', data: tasks, completedTaskCount}));

    ws.on('message', function incoming(message) {
      //  console.log('Received message!!:', message);

        const data = JSON.parse(message);

        console.log("VIEW", data);
       // console.log("completed?", data.completed);

        if (data.type === 'TASK_ADDED') {
            // ...
            console.log("data title is - "+ data.data.title);
            const newTask = {
                id: tasks.length + 1,  // generate a new unique id for the task
                title: data.data.title,
                completed: false
            };
            tasks.push(newTask);  // add the new task to the tasks array
            //....


            console.log("ADDED");
        } else if (data.type === 'TASK_UPDATED') {
            const task = tasks.find(t => t.id === data.data.id);
            console.log("Found task with title");
            console.log(task.title);

            /*  console.log("tasks title now is - ");
              console.log(task[0].title);

            const wasCompleted = data.data.completed;
           // console.log("task is - " + task.title);
            //task.title = data.data.title;
            //task.completed = data.data.completed;
            console.log("UPDATE");

            if (wasCompleted && !task.completed) {
                console.log("MINUS");
                completedTaskCount--;
            } else if (!wasCompleted && task.completed) {
                console.log("PLUS");
                completedTaskCount++;
                console.log()
            }

            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {

                    client.send(JSON.stringify({ type: 'TASK_UPDATED', data: task, completedTaskCount }));
                }
            });
        } else if (data.type === 'TASK_DELETED') {
            console.log("DELETE");

            // ...
        }

        // ...
    });

    // ...
});













/*



const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

let completedTaskCount = 0;
let tasks = [];

wss.on('connection', ws => {
    console.log('new client connected');

   // ws.send(JSON.stringify({ completedTaskCount }));
    ws.send(JSON.stringify({ type: 'INITIAL_TASK_LIST', data: tasks }));

    ws.on('message', function incoming(message) {
        console.log('Received message:', message);

        // parse the message from the client
        const data = JSON.parse(message);

        if (data.type === 'ADD_TASK') {
            // generate a unique id for the new task
            const id = tasks.length + 1;

            // create the new task object
            const task = { id: id, title: data.title, completed: false };

            // add the task to the array
            tasks.push(task);

            // send a message to the client with the new task
            ws.send(JSON.stringify({ type: 'TASK_ADDED', data: task }));
        } else if (data.type === 'UPDATE_TASK') {
            // find the task by id
            const task = tasks.find(t => t.id === data.id);

            // update the task properties
            task.title = data.title;
            task.completed = data.completed;

            // send a message to the client with the updated task
            ws.send(JSON.stringify({ type: 'TASK_UPDATED', data: task }));
        } else if (data.type === 'DELETE_TASK') {
            // remove the task from the array
            tasks = tasks.filter(t => t.id !== data.id);

            // send a message to the client with the id of the deleted task
            ws.send(JSON.stringify({ type: 'TASK_DELETED', data: data.id }));
        }

        ws.on('close', () => {
            console.log('client disconnected');
        });
    });

});

    wss.on('message', data => {
        console.log(`received: ${data}`);

        const message = JSON.parse(data);
        if (message.type === 'TASK_COMPLETED') {
            completedTaskCount++;
            broadcastCount();
        }
    });


function broadcastCount() {
    const message = { completedTaskCount };
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}*/