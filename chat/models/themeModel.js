const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Themes", themeSchema);