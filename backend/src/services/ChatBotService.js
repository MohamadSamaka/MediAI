const ChatBotAPI = require("../api/ChatBotAPI");
const chatlogRepository = require("../repositories/chatlogRepository");
const {
  systemPromptGenerator,
} = require("../utils/DataOrganizer");


class ChatBotService {
  async updateChatLog(userId, chatbotResponse, userMessage){
    const sessionData  = { user_message: userMessage, ai_response: chatbotResponse }
    await chatlogRepository.addChatSession(userId, sessionData)
  }
  async sendMessageToChatGPT(reqUser, userMessageData) {
    try {
      const chatLogs = await chatlogRepository.getChatSessionByUserId(reqUser.id);
      const formattedChatLogs = chatLogs
        .map((log) =>
          log.chat_session.map((session) => ({
            user_message: session.user_message,
            ai_response: session.ai_response,
          }))
        )
        .flat();

      const systempPrompt = systemPromptGenerator(
        formattedChatLogs
      );
      const fullMessage = `${reqUser.Fname} ${reqUser.Lname}: ${userMessageData.message}\n\nSystem Prompt:\n${systempPrompt}`;
      const chatReponse = await ChatBotAPI.sendMessageToChatGPT([
        { role: "user", content: fullMessage },
      ]);

      const messageContent = chatReponse.choices[0].message.content;

      this.updateChatLog(reqUser.id, messageContent, userMessageData.message)
      
      return {response: messageContent};
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // Add other API methods here
}

module.exports = new ChatBotService();

