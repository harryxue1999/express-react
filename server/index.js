'use strict';

// const Promise = require('bluebird');
const express = require('express');
const http = require('http');
// const request = require('request-promise');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../client/build')));

io.on('connection', socket => {
    console.log('Client connected');

    const timer = setInterval(() => {
        const data = { random: parseInt(Math.random() * 10) + 1 };
        socket.emit('data', data);
        console.log('Random number: %d', data.random);
    }, 1000);

    socket.on('disconnect', () => {
        clearInterval(timer);
        console.log('Client disconnected');
    });
});

server.listen(3001, () => console.log('Listening on port 3001'));
