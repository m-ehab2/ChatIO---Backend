const Message = require("../models/messageModel");
//createMessage
const createMessage = async (req, res) => {
    const { content } = req.body

    const message = new Message({
        sender: req.user._id,
        content: content,

    })
    try {
        const response = await message.save()
        res.status(200).json(response)
    } catch (error) {
        console.error("Failed to create message:", error);
        res.status(400).json({
            status: "error",
            message: "Failed to create message",
            error: error.message
        })
    }
}
//get message
const getMessage = async (req, res) => {
    const { chatId } = req.params;

    try {
        const message = await messageModel.find({ chatId })
        res.status(200).json(message)
    } catch (error) {
        console.error("Failed to get messages:", error);
        res.status(400).json
            (
                {
                    status: "error",
                    message: "Failed to get messages",
                    error: error.message
                });
    }
}

module.exports = { createMessage, getMessage }