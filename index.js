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

app.use('/', express.static(__dirname + '/public')); // Serve static files

// Start server
server.listen(3000, () => {
    console.log("Server is up on port 3000...");
});







// client means connected device like chrome  , firefox
/**
 * Like in my local machine on 3000 run the chat application 
 * on my local machine we have chrome , firefox and mozila okay
 * if this browser hit the 3000 so it connect with my server and all this is client of this server
 * io.on("connection", socket => {
 *  console.log("connect new user");
 * });
 * when the new user is hit the 3000 , this is.on function is execute
 * 
 */