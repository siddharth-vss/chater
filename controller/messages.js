const Message = require('../models/messageModel');
const USER = require('../models/user');
const Chat = require('../models/chatModel');


const getMessages = async(req,res)=>{
    try {
        const messages = await Message.find({ chat: req.params.chatId })
          .populate("sender", "name pic email")
          .populate("chat");
        res.json(messages);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
}
const sendMessages = async(req,res)=>{
     const {chatId , content } = req.body;
     if(!chatId || !content){
        res.status(400).json("Invalid data passed into request");
     }
     let newMessage = {
        sender: req.user,
        content: content,
        chat: chatId,
    };
    try {
        let message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic")
    message = await message.populate("chat")
    message = await USER.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
        
    } catch (error) {
        res.status(400).json("Internal server Error");
        console.log(error);
    }
}


module.exports = {
    getMessages,
    sendMessages
}