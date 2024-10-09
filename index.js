const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const connect = require('./config/database');
const Chat = require('./models');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


// Handle socket.io connections
io.on('connection', (socket) => {
    console.log("Connection is up ..." + socket.id);

    socket.on("join_room", (data) => {
        console.log("joinning a room", data.roomid);
        socket.join(data.roomid);
    })

    socket.on("send_msg", async (data)=>{
        console.log("data", data);    
        const chat = await Chat.create({
            roomId: data.roomid,
            user: data.userName,
            content: data.msg
        })
        io.to(data.roomid).emit("receive_msg", data)
    })
});

app.set("view engine", "ejs");
app.use('/', express.static(__dirname + '/public')); // Serve static files

app.get('/chat/:roomid', async (req,res) => {
    const chatData = await Chat.find({
        roomId: req.params.roomid 
    })
    console.log("chatData",chatData)
    res.render('index', {
        name: "Ankit",
        id: req.params.roomid,
        chats: chatData
    });
})

// Start server
server.listen(3000, async () => {
    console.log("Server is up on port 3000...");
    await connect();
    console.log("Database connection is done ...")
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

  //io.emit("receive_msg" , data); // broadcast the msg to all connected clients
  // socket.emit("receive_msg" , data); // send the msg to the client only that initiated the event
  // socket.broadcast.emit("receive_msg" , data); // Broadcast the msg to all client except the sender
        