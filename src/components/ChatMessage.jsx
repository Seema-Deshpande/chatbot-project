 import dayjs from 'dayjs';
 import RobotProfileImage from '../assets/robot.png'
 import UserProfileImage from '../assets/user.png'
 import './ChatMessage.css'

 
 export default function ChatMessage({ message, sender, timestamp}) {

      return (
        <div className={
          sender === 'user'
            ? 'chat-msg-user'
            : 'chat-msg-robot'
        }>
          {sender === 'robot' && (
            <img
              src={RobotProfileImage}
              className='chat-msg-profile' />
          )}
          <div className="chat-msg-txt">
            {message} 
            {timestamp && (<div className='chat-time-txt'> {dayjs(timestamp).format('h:mm A')} </div>)}
           </div>
          {sender === 'user' && (
            <img
              src={UserProfileImage}
              className='chat-msg-profile'
            />
          )}
        </div>
      );
    }