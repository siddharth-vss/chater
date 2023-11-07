// const createError = require('http-errors');
const express = require('express');
const colors = require('colors');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const dotenv = require('dotenv');
 
const cors = require('cors')

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const chatsRouter = require('./routes/chats');
const messagesRouter = require('./routes/messages');

const app = express();
const PORT = process.env.PORT;
// view engine setup



dotenv.config();

// app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chats', chatsRouter);
app.use('/messages', messagesRouter);


/**
|--------------------------------------------------|
|                   Deployment                     |
|--------------------------------------------------|
*/

// const __dirname= path.resolve();

 
  app.use(express.static(path.join(__dirname,'/client/build')));
   
  app.get('*',(req,res)=>{
     res.sendFile(path.resolve(__dirname,"client","build","index.html"));
  })


//|------------------------------------------------|
const server = app.listen(PORT,()=>{
  console.log(`server running on http://localhost:${PORT}`.rainbow.bold);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData);
    console.log(userData)
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
     console.log("ids",chat._id);
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      console.log(user)
      if (user == newMessageRecieved.sender._id) return;
      socket.in(user).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData);
  });
});