const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);



// Handle socket.io connections
io.on('connection', (socket) => {
    console.log("Connection is up ..." + socket.id);

    socket.on("send_msg", (data)=>{
        console.log("data", data);    
        io.emit("receive_msg" , data); // broadcast the msg to all connected clients
        // socket.emit("receive_msg" , data); // send the msg to the client only that initiated the event
        // socket.broadcast.emit("receive_msg" , data); // Broadcast the msg to all client except the sender
    })

});
// client means connected device like chrome  , firefox

app.use('/', express.static(__dirname + '/public')); // Serve static files

// Start server
server.listen(3000, () => {
    console.log("Server is up on port 3000...");
});

