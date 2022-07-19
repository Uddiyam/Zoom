/*
const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message');
const nickForm = document.querySelector('#nick');

function makeMessage(type, payload){
    const msg = { type, payload };
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connected to Server");
})

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
})

socket.addEventListener("close", () => {
    console.log("Disconnected from Server");
})

function handleSubmit(event) {
    event.preventDefault();     // 이벤트를 취소하는 메서드, 이벤트가 제공하는 원래 기능을 사용하지 않고자 할 때 주로 사용
    const input = messageForm.querySelector('input');
    socket.send(makeMessage('new_message', input.value));
    input.value="";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector('input');
    socket.send(makeMessage('nickname', input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
*/

const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("input");
  const value = input.value;
  socket.emit("new_message", value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
socket.on("welcome", () => {
  addMessage("someone joined!");
});

socket.on("bye", () => {
  addMessage("someone left ㅠㅠ");
});

socket.on("send_message", (msg) => {
  addMessage(msg);
});
