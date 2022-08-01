import express from "express";
import morgan from "morgan";
import { Server as SockertServer } from "socket.io";
import http from "http";
import cors from "cors";
import { PORT } from "./config.js";


const app = express();
const server = http.createServer(app);
const io = new SockertServer(server, {
    cors:{
        origins: "http://localhost:3000/"
    }
    });

app.use(cors());
app.use(morgan("dev"));
io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
        console.log(message);
    
    })
})

server.listen(PORT)
    console.log('Server running on port🚀', PORT); 