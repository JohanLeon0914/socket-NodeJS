import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import htttp from 'http'
import { Http2ServerRequest } from "http2";
import cors from 'cors'
import {PORT} from "./config.js";

const app = express()
const server = htttp.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
})

app.use(cors())
app.use(morgan('dev'))

io.on('connection', (socket) => {
    console.log(socket.id); //id del clinte conectado

    socket.on('message', (message) => {
        socket.broadcast.emit('message', {
            body: message,
            from: socket.id    
        })
    })//escuchando el evento enviado del frontend
})

server.listen(PORT)
console.log('server startes on port ' + PORT);