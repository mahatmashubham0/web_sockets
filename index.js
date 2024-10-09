const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);



// Handle socket.io connections
io.on('connection', (socket) => {
    console.log("Connection is up ..." + socket.id);

    socket.on('from_client', () => {
        console.log("Event Done from client");
    })

    // it executes
    setInterval(() => {
        socket.emit("from_server");
    } , 2000);

});


app.use('/', express.static(__dirname + '/public')); // Serve static files

// Start server
server.listen(3000, () => {
    console.log("Server is up on port 3000...");
});

