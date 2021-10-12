require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//setup
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
}));

//routes
app.use("/chat", require("./routes/chatRouter"));
app.use("/message", require("./routes/messageRouter"));
app.use("/themes", require("./routes/themeRouter"));
app.use("/proffessions", require("./routes/proffessionRouter"));

//mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => {
    if (err) throw err;
    console.log("Connected to DB")
});

//run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});