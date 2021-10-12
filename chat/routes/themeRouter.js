const router = require("express").Router();
const themeCtrl = require("../controllers/themeCtrl");

router.post("/", themeCtrl.new);
router.get("/", themeCtrl.get);
router.put("/:id", themeCtrl.update);
router.delete("/:id", themeCtrl.delete);

module.exports = router;