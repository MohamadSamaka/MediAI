const { Router } = require("express");
const ChatbotController = require("../../controllers/chatBotcontroller");
const ProtectedChatbotRouter = Router();


ProtectedChatbotRouter.post("/", (req, res, next) => ChatbotController.sendMessageToChatGPT(req, res, next));

module.exports = ProtectedChatbotRouter;
