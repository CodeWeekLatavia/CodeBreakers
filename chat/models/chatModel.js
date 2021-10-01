const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    users: {
        type: Array,
        unique: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Chats", chatSchema);