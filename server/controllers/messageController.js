const asyncHandler = require('express-async-handler');
const Message = require('../Models/messageModel');
const Chat = require('../Models/chatModel');
const User = require('../Models/userModel');

const sendMessage = asyncHandler(async (req, res) => {
    const { chatId, content } = req.body;
    if (!chatId || !content) {
        res.status(400).json({
            status: 'fail',
            message: 'invalid input'
        });
    }
    let newMessage = {
        content,
        sender: req.user._id,
        chat: chatId
    };
    try {
        let message = await Message.create(newMessage);
        message = await message.populate('sender', 'name pic');
        message = await message.populate('chat');
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name pic'
        });
    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = { sendMessage }