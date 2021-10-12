const router = require("express").Router();
const proffessionCtrl = require("../controllers/proffessionCtrl");

router.post("/", proffessionCtrl.new);
router.get("/", proffessionCtrl.get);
router.put("/:id", proffessionCtrl.update);
router.delete("/:id", proffessionCtrl.delete);

module.exports = router;