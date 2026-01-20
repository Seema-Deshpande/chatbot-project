import { useState } from 'react'
import dayjs from 'dayjs';  
import { Chatbot } from 'supersimpledev';
import LoadingSpinner from '../assets/loading-spinner.gif'
import './ChatInput.css'

export default function ChatInput({ chatMessages, setChatMessages }) {
      const [inputText, setInputText] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      function saveInputText(event) {
        setInputText(event.target.value)
      }

      function handleKeyDown(event) {
        if (event.key == 'Enter') {
          sendMessage()
        }
        if (event.key === 'Escape')
          setInputText('')
      }

      async function sendMessage() {
        if (isLoading || inputText == '') {
          return;
        }
        const newChatMessages = [
          ...chatMessages,
          {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID(),
            timestamp: dayjs().valueOf()
          }
        ]
        setChatMessages([...newChatMessages, {
          message: <img className="imgLoader" src={LoadingSpinner}></img>,
          sender: 'robot',
          id: crypto.randomUUID(),
          timestamp: dayjs().valueOf()
        }]);
        setIsLoading(true)
        setInputText('');
        const response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
          ...newChatMessages,
          {
            message: response,
            sender: 'robot',
            id: crypto.randomUUID(),
            timestamp: dayjs().valueOf()
          }
        ]);
        setIsLoading(false);
      }
      return (
        <div className="chat-input-container">
          <input
            placeholder='Send a message to Chatbot'
            size="30"
            onChange={saveInputText}
            value={inputText}
            onKeyDown={handleKeyDown}
            className="chat-input"
          />
          <button
            className="send-button"
            onClick={sendMessage}
            disable={isLoading.toString()}
          >Send</button>
          <button
            className='clear-button'
            onClick={() => setChatMessages([])}
          >Clear</button>
        </div>
      )
    }