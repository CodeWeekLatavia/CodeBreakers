const router = require("express").Router();
const chatCtrl = require("../controllers/chatCtrl");

router.post("/new_chat", chatCtrl.new);
router.get("/user_chats/:accessToken", chatCtrl.getUserChats);
router.get("/:id", chatCtrl.getChatByID);
router.delete("/:id", chatCtrl.deleteChat);


module.exports = router;