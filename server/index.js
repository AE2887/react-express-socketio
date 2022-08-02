import express from "express";
import morgan from "morgan";
import { Server as SockertServer } from "socket.io";
import http from "http";
import cors from "cors";
import { PORT } from "./config.js";


const app = express();
//for typscript code only, use require for js

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
    
    socket.on('message', (message) => {
        socket.broadcast.emit('message', {
            body: message,
            from: socket.id,
        });
    });
});

server.listen(PORT)
    console.log('Server running on port🚀', PORT); 