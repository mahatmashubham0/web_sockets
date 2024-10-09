var socket = io();

let btn = document.getElementById('send-button');
btn.onclick = function exec() {
    socket.emit("from_client");
}

socket.on("from_server", () => {
    console.log("Accept Request from server");
    const div = document.createElement("div");
    div.innerText = "New Event trigger from server";
    document.body.appendChild(div);
})                  