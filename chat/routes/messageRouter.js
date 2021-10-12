const router = require("express").Router();
const messageCtrl = require("../controllers/messageCtrl");

router.post("/", messageCtrl.new);
router.get("/:chatID", messageCtrl.getChatMessages);
router.put("/:id", messageCtrl.updateMessage);
router.delete("/:id", messageCtrl.deleteMessage);
router.post("/id", messageCtrl.readMessage);
router.get("/get_unread_messages/:id", messageCtrl.getUnreadMessages)

module.exports = router;