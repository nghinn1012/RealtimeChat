import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import routes from "./routes/routes.js";
import http from "http";
import { Server } from "socket.io";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected database");
  })
  .catch((err) => {
    console.log(err);
  });
const server = http.createServer(app); // Create server using http.createServer
const io = new Server(server, {
  // Pass server to Server class from socket.io
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
server.listen(process.env.PORT, () => {
  // Use server.listen instead of app.listen
  console.log(`Server started on port ${process.env.PORT}`);
});

routes(app);

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
