let socket = io.connect("http://192.168.10.142:3000");

const message = document.querySelector("#message");
const username = document.querySelector("#username");
const send_message = document.querySelector("#send_message");
const send_username = document.querySelector("#send_username");
const chatroom = document.querySelector("#chatroom");

send_message.addEventListener("click", () => {
  socket.emit("new_message", { message: message.value });
  message.value = "";
});
message.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
    socket.emit("new_message", { message: message.value });
    message.value = "";
    }
});
socket.on("new_message", (data) => {
  console.log(data);
  const paragr = document.createElement("p");
  paragr.textContent = `${data.username}:${data.message}`;
  chatroom.append(paragr);
});

send_username.addEventListener("click", () => {
  console.log(username.value);
  socket.emit("change_username", { username: username.value });
  username.value = "";
});
