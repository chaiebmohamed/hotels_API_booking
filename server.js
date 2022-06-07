const http = require('http');
const app = require('./app')
const server = http.createServer(app)
const io = require('socket.io')(server);
const ConnectedUsers = [];



const port=process.env.PORT || 5000
server.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
});

/***********************************REAL TIME************************************* */

let users = [];

//add new user connection to users array 
const addUser = (userId, socketId) => { !users.some((user) => user.userId === userId) && users.push({ userId, socketId }) };

//remove user by socketId
const removeUser = (socketId) => { users = users.filter((user) => user.socketId !== socketId) };

//get user with userId
const getUser = (userId) => { return users.find((user) => user.userId === userId) };


io.on("connection", (socket) => {
  
  //listening when frontend emit an event addUser (when a new user connect to plateform)
  socket.on("addUser", (userId) => {
    
    addUser(userId, socket.id);
    console.log("connected users",users)
    io.emit("getUsers", users);
  });

  //listening when frontend emit an event 
  socket.on("sendMessage", ({ senderId, receiverId, text,conversationId }) => {
    
    const user = getUser(receiverId);
    if(user)
    {
      // send the message to receiver using his socketId
      io.to(user.socketId).emit("getMessage", {senderId,text,conversationId});
    }
   
  });


  socket.on("disconnect", () => {
    
    removeUser(socket.id);
    console.log("connected users",users)
    io.emit("getUsers", users);
  });
});
