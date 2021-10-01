const Chats = require("../models/chatModel");
const Messages = require("../models/messageModel");
const { v4: uuidv4 } = require('uuid');

const chatCtrl = {
    new: async (req, res) => {
        try {
            const {senderAccesstoken, receiverAccessToken} = req.body;

            const newChat = new Chats({
                users: [{user: senderAccesstoken.toString(), unique: uuidv4()}, {user: receiverAccessToken.toString(), unique: uuidv4()}]
            });

            await newChat.save();

            res.json({msg: "Created a new chat"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getUserChats: async (req, res) => {
        try {
            let userChats = [];

            const allChats = await Chats.find();
            allChats.forEach((chat) => {
                chat.users.forEach((user) => {
                    if(user.user === req.params.accessToken){
                        const pushData = {
                            users: [
                                chat.users[0].user,
                                chat.users[1].user,
                            ],
                            _id: chat._id,
                            createdAt: chat.createdAt,
                            updatedAt: chat.updatedAt
                        }
                        userChats.push(pushData);
                    }
                });
            });

            res.json(userChats);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getChatByID: async (req, res) => {
        try {
            const id = req.params.id;

            const chat = await Chats.findById({_id: id});

            res.json(chat);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    deleteChat: async (req, res) => {
        try {
            const id = req.params.id;

            const chatMessages = await Messages.find({chatID: id});

            if(chatMessages){
                chatMessages.forEach(async (message) => {
                    await Messages.findByIdAndDelete({_id: message._id});
                });
            }

            await Chats.findByIdAndDelete({_id: id});

            res.json({msg: "delete success"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
};

module.exports = chatCtrl;