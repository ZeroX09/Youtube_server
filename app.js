
const express = require("express");
const path = require("path");
const socketServer = require("socket.io").Server

const server = express();
const httpserver= require("http").createServer(server);
const io = new socketServer(httpserver,{
    cors:{
       origin:"*"
    }
});
let sockets = []
io.on("connection",(socket)=>{
    //on get video id
    sockets.push(socket.id)
    socket.on("video-id",(videoId)=>{
        if(typeof videoId === "string" && videoId?.trim()?.length>0){
            socket.broadcast.emit("video-id",videoId);
        }
    })
})



server.get("/",(req,res)=>{
    
    res.sendFile(path.join(__dirname,"html","admin.html"));

})

server.use("/assets",express.static(path.join(__dirname,"html","assets")));

httpserver.listen(process.env.PORT,()=>{
    console.log("RUN")
})