import express from "express";
import http from "http";
// import WebSocket from 'ws';
import SocktIO from "socket.io";
// import { Server } from "socket.io";
// import { instrument } from "@socket.io/admin-ui";

const app = express(); // expres는 HTTP 기반으로 동작

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); //__dirname은 Node.js의 기본 전역 변수, 현재 실행하는 폴더의 경로

app.use("/public", express.static(__dirname + "/public"));

// app.get 메서드 -> 서버에 HTTP 요청이 왔을 때 지정된 콜백을 이용하여 라우팅 처리 해줌
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocktIO(httpServer);

/*
const wsServer = SocktIO(httpServer);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"], //socket.io에서 제공하는 데모 서버 주소
    credentials: true,
  },
});

instrument(wsServer, {
  auth: false, // 서버가 비밀번호 사용 가능
});

function publicRooms() {
  // 구조 분해 할당
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;

  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

const wss = new WebSocket.Server({ server });   // 서버에 웹소켓 프로토콜 추가 => HTTP 서버는 사용자에게 뷰 엔진을 이용해 만든 뷰, 정적 파일, 리다이렉션 등 제공, 웹소켓 서버는 실시간 채팅 기능 제공

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


wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anon";
  // onAny : 소켓에서 발생하는 모든 이벤트에 대응하는 이벤트 핸들러 등록 메서드
  socket.onAny((e) => {
    console.log(wsServer.sockets.adapter);
    console.log(`Socket Event: ${e}`);
  });
  socket.on("enter_room", (roomName, done) => {
    done();

    socket.join(roomName);
    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
    wsServer.sockets.emit("room_change", publicRooms());
  });
  // 소켓과 연결이 완전히 해제되기 직전에 발생
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1)
    ); // rooms는 접속중인 채팅룸 목록을 뜻하는 set객체(반복 가능객체)
  });
  // 소켓과 연결이 완전히 해제되었을 때 발생
  socket.on("disconnect", () => {
    wsServer.sockets.emit("room_change", publicRooms());
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("send_message", `${socket.nickname}: ${msg}`);
    done();
  });
  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});
*/
const handleListen = () => console.log("Listening on http://localhost:3000");
httpServer.listen(3000, handleListen);
