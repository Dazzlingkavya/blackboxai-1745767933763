import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

const config = {
  botName: 'RecipeBot',
  initialMessages: [
    { type: 'text', id: '1', message: 'Hi! I am RecipeBot. How can I help you find recipes today?' },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#6b46c1',
    },
    chatButton: {
      backgroundColor: '#6b46c1',
    },
  },
};

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const lower = message.toLowerCase();
    if (lower.includes('cuisine')) {
      actions.handleResponse('You can search recipes by specifying cuisine, dish type, and allergens.');
    } else if (lower.includes('allergen')) {
      actions.handleResponse('You can exclude recipes containing specific allergens.');
    } else if (lower.includes('surprise')) {
      actions.handleResponse('Try the Surprise Me button to get a random recipe!');
    } else {
      actions.handleResponse('I am here to help you find recipes. Please tell me your preferences.');
    }
  };

  return React.cloneElement(children, { parse });
};

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleResponse = (message) => {
    const botMessage = createChatBotMessage(message);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return React.cloneElement(children, { actions: { handleResponse } });
};

function ChatbotComponent() {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Chatbot</h2>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default ChatbotComponent;
