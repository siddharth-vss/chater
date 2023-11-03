const CHAT = require('../models/chatModel');
const USERS = require('../models/user');
// const jwt = require('jsonwebtoken');

// let bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
// const { body, validationResult } = require('express-validator');
dotenv.config();




const accessChat = async (req, res) => {


    const { userId } = req.body;
    console.log(userId , req.body);
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    let isChat = await CHAT.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");
    isChat = await USERS.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user, userId],
        };

        try {
            const createdChat = await CHAT.create(chatData);
            const FullChat = await CHAT.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
}
const fetchChat = async (req, res) => {
    try {
        CHAT.find({ users: { $elemMatch: { $eq: req.user } } })
          .populate("users", "-password")
          .populate("groupAdmin", "-password")
          .populate("latestMessage")
          .sort({ updatedAt: -1 })
          .then(async (results) => {
            results = await USERS.populate(results, {
              path: "latestMessage.sender",
              select: "name pic email",
            });
            res.status(200).send(results);
          });
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
}
const createGroupChat = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
      }
    
      var users = JSON.parse(req.body.users);
    
      if (users.length < 2) {
        return res
          .status(400)
          .send("More than 2 users are required to form a group chat");
      }
    
      users.push(req.user);
    
      try {
        const groupChat = await CHAT.create({
          chatName: req.body.name,
          users: users,
          isGroupChat: true,
          groupAdmin: req.user,
        });
    
        const fullGroupChat = await CHAT.findOne({ _id: groupChat._id })
          .populate("users", "-password")
          .populate("groupAdmin", "-password");
    
        res.status(200).json(fullGroupChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
}
const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await CHAT.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
}
const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin
  
    const removed = await CHAT.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
}
const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin
  
    const added = await CHAT.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
}

module.exports = { accessChat, fetchChat, createGroupChat, renameGroup, removeFromGroup, addToGroup, };
