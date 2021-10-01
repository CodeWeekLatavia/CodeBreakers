const router = require("express").Router();
const messageCtrl = require("../controllers/messageCtrl");

router.post("/", messageCtrl.new);
router.get("/:chatID", messageCtrl.getChatMessages);
router.put("/:id", messageCtrl.updateMessage);
router.delete("/:id", messageCtrl.deleteMessage);

module.exports = router;