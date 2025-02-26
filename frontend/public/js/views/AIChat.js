import { loadStyles } from "/js/helpers/stylesManager.js";
import { sendMessage } from "/js/api/chatbotAPI.js";

export function render() {
  return `
     <button class="toggle-sidebar-btn" id="toggleSidebarBtn">
      <i class="fa-solid fa-bars"></i>
    </button>
    <div class="container">
      <!-- Sidebar with Chat History -->
      <div class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <!-- Toggle Sidebar Button -->
          <a href="/"
            ><button class="home-btn" id="home-icon">
              <i class="fa-solid fa-house"></i></button
          ></a>

          <button class="new-chat-btn" id="newChatBtn">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div class="search-box">
          <input type="text" id="sidebarSearch" placeholder="Search chats..." />
          <button id="searchBtn">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div class="chat-history-section" id="todaySection">
          <h2 id="title-history">Chat History</h2>
          <h3>Today</h3>
          <!-- History items will be added here dynamically -->
        </div>
        <div class="chat-history-section">
          <h3>Yesterday</h3>
        </div>
        <div class="chat-history-section">
          <h3>Previous 7 Days</h3>
        </div>
        <div class="chat-history-section beyond">
          <h3>Beyond a Week</h3>
        </div>
      </div>
      <!-- Main Chat Area -->
      <div class="chat-container" id="chatContainer">
        <div class="chat-header">MedicalGPT</div>
        <div class="chat-messages" id="chatMessages">
          <!-- Chat messages will be appended here -->
        </div>
        <div class="chat-input">
          <input
            type="text"
            id="chatInput"
            placeholder="Type your message here..."
          />
          <button id="sendButton">
            <i class="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </div>
    `;
}

export function init(styles, params) {
  loadStyles(styles);
  // Global object to store conversations by ID.
    // Global object to store conversations by ID.
    const conversationHistory = {};
    let activeConversationId = null;

    // Chat elements.
    const chatInput = document.getElementById("chatInput");
    const sendButton = document.getElementById("sendButton");
    const chatMessages = document.getElementById("chatMessages");

    // Append a chat message.
    function appendMessage(content, sender = "bot") {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("chat-message", sender);
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("message-content");
      contentDiv.textContent = content;
      messageDiv.appendChild(contentDiv);
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // New function that sends the user's message to the server.
    async function sendToServer(message) {
      try {
        const data =  await sendMessage(message)
        console.log(data)
        if (data.error) {
          appendMessage("Error: " + data.error, "bot");
        } else {
          appendMessage(data.response, "bot");
        }
      } catch (error) {
        appendMessage("Error: " + error.message, "bot");
      }
    }

    // Event listener for sending messages.
    sendButton.addEventListener("click", () => {
      const message = chatInput.value.trim();
      if (message !== "") {
        // Append the user's message.
        appendMessage(message, "user");
        chatInput.value = "";
        // Send the user's message to the OpenAI-powered server.
        sendToServer(message);
      }
    });

    chatInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        sendButton.click();
      }
    });

    // Sidebar toggle functionality.
    const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
    const sidebar = document.getElementById("sidebar");
    const chatContainer = document.getElementById("chatContainer");

    toggleSidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
      if (sidebar.classList.contains("hidden")) {
        chatContainer.classList.add("full-width");
      } else {
        chatContainer.classList.remove("full-width");
      }
    });

    // New chat functionality.
    const newChatBtn = document.getElementById("newChatBtn");
    newChatBtn.addEventListener("click", () => {
      if (chatMessages.innerHTML.trim() !== "") {
        if (!activeConversationId) {
          activeConversationId = "chat_" + Date.now();
        }
        conversationHistory[activeConversationId] = chatMessages.innerHTML;
        let exists = false;
        const historyItems = document.querySelectorAll(".chat-history-item");
        historyItems.forEach((item) => {
          if (item.getAttribute("data-convo-id") === activeConversationId) {
            exists = true;
          }
        });
        if (!exists) {
          const timestamp = new Date().toLocaleTimeString();
          const historyItem = document.createElement("div");
          historyItem.classList.add("chat-history-item");
          historyItem.textContent = "Chat " + timestamp;
          historyItem.setAttribute("data-convo-id", activeConversationId);
          historyItem.addEventListener("click", () => {
            conversationHistory[activeConversationId] =
              chatMessages.innerHTML;
            const convoId = historyItem.getAttribute("data-convo-id");
            chatMessages.innerHTML = conversationHistory[convoId] || "";
            activeConversationId = convoId;
          });
          const todaySection = document.getElementById("todaySection");
          todaySection.appendChild(historyItem);
        }
      }
      // Clear the chat area and start a new conversation.
      chatMessages.innerHTML = "";
      activeConversationId = "chat_" + Date.now();
      // Display the starting message.
      appendMessage("Hi there, how can I help you?", "bot");
    });

    // Sidebar search functionality.
    const sidebarSearch = document.getElementById("sidebarSearch");
    const searchBtn = document.getElementById("searchBtn");

    function filterChats() {
      const filter = sidebarSearch.value.toLowerCase();
      const items = document.querySelectorAll(".chat-history-item");
      items.forEach((item) => {
        item.style.display = item.textContent.toLowerCase().includes(filter)
          ? "block"
          : "none";
      });
    }

    sidebarSearch.addEventListener("input", filterChats);
    searchBtn.addEventListener("click", filterChats);

    // On initial load, if no conversation exists, display the starting message.
    window.addEventListener("DOMContentLoaded", () => {
      if (chatMessages.innerHTML.trim() === "") {
        // Array of possible greeting messages
        const greetings = [
          "Hi there, how can I help you?",
          "Hello! What can I assist you with today?",
          "Hey! How may I help you today?",
          "Hi! What can I do for you?",
          "Hello there! How can I be of assistance?",
          "Hey there! How can I assist you today?",
          "Hi! How can I make your day easier?",
          "Hello! Need help with anything?",
          "Hey! What can I help you with right now?",
          "Hi there! How can I support you today?",
          "Greetings! How may I assist you?",
        ];

        // Select a random greeting
        const randomGreeting =
          greetings[Math.floor(Math.random() * greetings.length)];

        // Append the randomly selected greeting message
        appendMessage(randomGreeting, "bot");
      }
    });
}
