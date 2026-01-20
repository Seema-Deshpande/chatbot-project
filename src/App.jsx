import { useEffect, useState } from 'react'
import { Chatbot } from 'supersimpledev';
import ChatInput  from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
  useEffect(() => {
    Chatbot.addResponses({
        'Hi': 'Hello! How can I assist you today?',
        'How are you?': 'I am just a program, but thanks for asking!',
        'What is your name?': 'I am Chatbot, your virtual assistant.',
        'Tell me a joke.': 'Why did the computer go to the doctor? Because it had a virus!',
        'What can you do?': 'I can chat with you and answer your questions to the best of my ability.',
        'Help me with coding.': 'Sure! What programming language are you interested in?',
        'What is React?': 'React is a JavaScript library for building user interfaces, maintained by Facebook.',
        'What is Supersimpledev?': 'Supersimpledev is a platform that provides simple and effective development tools and libraries.',
        'Thank you!': 'You\'re welcome! If you have any more questions, feel free to ask.',
        'Give me a fun fact.': 'Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!',
        'What is the capital of France?': 'The capital of France is Paris.',
        'What is 2 + 2?': '2 + 2 equals 4.',
        'Give me a motivational quote.': 'Believe you can and you\'re halfway there. - Theodore Roosevelt',
        'Give me 5 principles of art of living':'1.Opposite values are complmentary to each other 2. Accept people as they are 3. Do not be football of other people\'s opinions 4.Do not find mistake in other people\'s intention  5. Live in the present moment',
      });
  }, []);
  useEffect(() => {
    // You can perform any side effects here when chatMessages change
    console.log('Chat messages updated:', chatMessages);
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

      return (
        <div className="app-container">
          {chatMessages.length === 0 && (
            <p>
              Welcome to chatbot project ! Send a meesage using textbox below.
            </p>
          )
          }
          <ChatMessages
            chatMessages={chatMessages}
          />
          <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
          />
        </div>
      )
}

export default App
