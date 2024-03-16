const router = require("express").Router()

const { createMessage, getMessage } = require("../controller/messageController")


router.get("/:chatId", getMessage);
router.post("/", createMessage);

module.exports = router
