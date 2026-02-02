import React, { useState }  from "preact/hooks";
import ChatBot from "react-simple-chatbot";
import { dbChatBoxSteps } from "../../types"; // Ensure that dbChatBoxSteps is properly typed
import "./chatBotBtn.scss";
import imgChatBot from "../../assets/frontend_assets/robot.png"; // Ensure correct path
import { FunctionalComponent } from "preact";

const ChatBotBtn: FunctionalComponent = () => {
  const [showChatBot, setShowChatBot] = useState<boolean>(false);

  return (
    <div class='chatbot-container'>
      <button
        onClick={() => setShowChatBot((prev) => !prev)}
        class='toggle-btn'
      >
        <img
          class='img-chatbot'
          src={imgChatBot}
          alt='Chatbot Toggle Button'
        />
      </button>
      {showChatBot && (
        <div class='chatbot-widget'>
          <ChatBot class='chatbot' steps={dbChatBoxSteps} />
        </div>
      )}
    </div>
  );
};

export default ChatBotBtn;
