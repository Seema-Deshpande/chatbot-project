import { useEffect, useState } from 'react'
import { Chatbot } from 'supersimpledev';
import ChatInput from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('chatMesaages')) || []);
  const predefinedResponse = {
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
    'Give me 5 principles of art of living': '1.Opposite values are complmentary to each other 2. Accept people as they are 3. Do not be football of other people\'s opinions 4.Do not find mistake in other people\'s intention  5. Live in the present moment',
  };
  useEffect(() => {
    Chatbot.addResponses(predefinedResponse);
  }, []);
  useEffect(() => {
    console.log('Chat messages updated:', chatMessages);
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const getResponse = async (userMessage) => {
    const matchKey = Object.keys(predefinedResponse).find(
      key => key.toLowerCase() === userMessage.toLowerCase()
    );
    if(matchKey){
      return predefinedResponse[matchKey]
    }
    return 'API response unavailable – add billing to OpenAI';
  }

  // const fetchAIResponse = async(userMessage)=> {
  //   try{
  //     const response =  await fetch('https://api.openai.com/v1/chat/completions', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
  //       },
  //       body: JSON.stringify({
  //         model: 'gpt-3.5-turbo',
  //         messages: [{role: 'user', content: userMessage}],
  //         temperature:0.7,
  //         max_tokens:150
  //       })
  //   })
  //   const data = await response.json();
  //   return data.choices[0].message.content;
  // }
  // catch (error) {
  //    console.error('API error', error);
  // if (error?.message?.includes('quota')) {
  //   return 'API quota exceeded – please check your OpenAI billing.';
  // }
  // return 'Sorry, I encountered an error. Please try again.';
  //   }
  // };
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
        getResponse={getResponse}
      />
    </div>
  )
}

export default App
