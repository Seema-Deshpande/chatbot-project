import { useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage.jsx'
import './ChatMessages.css'

function useAutoScroll(dependencies) {
    const chatMessageRef = useRef(null)
    useEffect(() => {
        const containerElem = chatMessageRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [dependencies]); // dependency array to known when to run this function
    return chatMessageRef;
}
export default function ChatMessages({ chatMessages }) {
    // React will use this or call after component is created or updated we pass 2nd param empty array which will run once 
    // const chatMessageRef = React.useRef(null)
    // React.useEffect(() => {
    //   const containerElem = chatMessageRef.current;
    //   if (containerElem) {
    //     containerElem.scrollTop = containerElem.scrollHeight;
    //   }
    // }, [chatMessages]); // dependency array to known when to run this function
    const chatMessageRef = useAutoScroll(chatMessages)
    return (
        <div className="chat-messages-container" ref={chatMessageRef}>
            {chatMessages.map((chatMessage, id) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        timestamp={chatMessage.timestamp}
                        key={id}
                    />
                )
            })}
        </div>
    )
}
