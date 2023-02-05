const asyncHandler = require('express-async-handler');
const Chat = require('../Models/chatModel');
const User = require('../Models/userModel');

// access a chat one to one
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log('User id not sent via this request');
    return res.sendStatus(400);
  }
  let isChat = await Chat.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: req.user._id } } }
    ]
  }).populate('users').populate('latestMessage');

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  /*
  The result of this code is that the "sender" field of the "latestMessage" field in the isChat 
  document will be replaced with a new document containing the specified fields ("name", "pic", and "email").
  */
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

// fetch all chats
const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate('users').populate('groupAdmin')
      .populate('latestMessage')
      .sort({ updateAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: 'latestMessage.sender',
          select: 'name pic email'
        });
        res.status(200).send(results);
      })
  } catch (error) {
    console.log('Error while fetching chats');
  }
})

const createGroup = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    res.status(400).json({
      status: 'fail',
      message: 'Must include members'
    })
  }
  const members = JSON.parse(req.body.users);
  // req.body.users is a string like "['wiu84823493', 'w9er92343']" that must be parse into an array
  if (members.length < 2) {
    res.status(400).json({
      status: 'fail',
      message: 'Must include members'
    })
  }
  members.push(req.user._id);
  const chatbox = await Chat.create({
    isGroup: true,
    users: members,
    groupAdmin: req.user._id
  });
  const box = await Chat.findOne({ _id: chatbox._id })
    .populate('users')
    .populate('groupAdmin')

  res.status(201).json({
    status: 'success',
    box
  });
});

const renameGroup = asyncHandler(async (req, res) => {
  const chatBox = await Chat.findOneAndUpdate({ _id: req.body.chatId },
    { chatName: req.body.chatName },
    { new: true }
  );
  res.status(200).json({
    status: 'success',
    chatBox
  });
});

const addMember = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
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
});

const removeMember = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
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
})
module.exports = { accessChat, fetchChats, createGroup, renameGroup, addMember, removeMember }   