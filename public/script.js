var socket = io();

let btn = document.getElementById('send-button');
let textBar = document.getElementById('msgOne');
let msgList = document.getElementById('msgList');

btn.onclick = function exec() {

    socket.emit("send_msg", {
        msg: textBar.value
    })
}

socket.on("receive_msg", (data) => {
    console.log("msg_receive", data);
    let liMsg = document.createElement('li');
    liMsg.innerText = data.msg;
    msgList.appendChild(liMsg);
})

/**
 * here we first create the emit on client side
 * and then first server receive the emit from client and again emit that particular msg 
 * this emit is receive from server on client
 */