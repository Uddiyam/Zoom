import express from "express";
import http from "http";
// import WebSocket from 'ws';
import SocktIO from "socket.io";

const app = express(); // expres는 HTTP 기반으로 동작

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); //__dirname은 Node.js의 기본 전역 변수, 현재 실행하는 폴더의 경로

app.use("/public", express.static(__dirname + "/public"));

// app.get 메서드 -> 서버에 HTTP 요청이 왔을 때 지정된 콜백을 이용하여 라우팅 처리 해줌
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocktIO(httpServer);

/*const wss = new WebSocket.Server({ server });   // 서버에 웹소켓 프로토콜 추가 => HTTP 서버는 사용자에게 뷰 엔진을 이용해 만든 뷰, 정적 파일, 리다이렉션 등 제공, 웹소켓 서버는 실시간 채팅 기능 제공

const sockets = [];

wss.on("connection",(socket) => {
    sockets.push(socket);
    socket['nickname'] = 'Anonymous';
    console.log("Connected to Browser");
    socket.on("close", () => console.log("Disconnected from Browser"));
    socket.on("message",(msg) => {
        const message = JSON.parse(msg);
        switch(message.type){
            case "new_message":
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname}:${message.payload}`));
                break;
            case "nickname":
                socket['nickname'] = message.payload;
                break;
        }
    });
})
*/

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomName, done) => {
    done();

    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => socket.to(room).emit("bye")); // rooms는 접속중인 채팅룸 목록을 뜻하는 set객체(반복 가능객체)
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("send_message", msg);
    done();
  });
});

const handleListen = () => console.log("Listening on http://localhost:3000");
httpServer.listen(3000, handleListen);
