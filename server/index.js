'use strict';

// const Promise = require('bluebird');
const express = require('express');
const http = require('http');
const request = require('request-promise');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    return res.json({ random: parseInt(Math.random() * 10) + 1 });
});

io.on('connection', socket => {
    console.log('Client connected');

    const timer = setInterval(() => {
        request.get('http://127.0.0.1:3001').then(JSON.parse).then(data => {
            socket.emit('data', data);
            console.log('Random number: %d', data.random);
        }).catch(console.error);
    }, 1000);

    socket.on('disconnect', () => {
        clearInterval(timer);
        console.log('Client disconnected');
    });
});

server.listen(3001, () => console.log('Listening on port 3001'));
