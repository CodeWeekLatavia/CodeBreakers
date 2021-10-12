const mongoose = require("mongoose");

const proffessionSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Proffesions", proffessionSchema);