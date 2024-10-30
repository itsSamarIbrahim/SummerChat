// /src/Components/Message.jsx

import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import PropTypes from 'prop-types';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  const [timeLabel, setTimeLabel] = useState('just now');

  // Function to calculate time label
  const calculateTimeLabel = useCallback(() => {
    const messageDate = new Date(message.date.seconds * 1000); // Convert Firestore seconds to milliseconds
    const now = new Date();
    const diffInSeconds = Math.floor((now - messageDate) / 1000); // Calculate difference in seconds
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInSeconds / 3600);
    const diffInDays = Math.floor(diffInSeconds / 86400);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    let label;
    if (diffInSeconds < 60) {
      label = 'just now';
    } else if (diffInSeconds < 3600) {
      label = `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      label = `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 30) {
      label = `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInMonths < 12) {
      label = `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else {
      label = `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    }

    setTimeLabel(label);
  }, [message.date.seconds]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    calculateTimeLabel(); // Initial calculation

    // Update time label every minute
    const interval = setInterval(calculateTimeLabel, 60000);
    
    return () => clearInterval(interval); // Cleanup on unmount
  }, [calculateTimeLabel]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid ? "owner" : "receiver"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
      </div>
      <div className="messageContentContainer">
        <div className="messageContent">
          <p>{message.text}</p>
          {message.img && <img src={message.img} alt="" />}
        </div>
        <div className="messageTimeLabel">
          <span>{timeLabel}</span>
        </div>
      </div>
    </div>
  );
};

// Define the PropTypes for the component
Message.propTypes = {
  message: PropTypes.shape({
    senderId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    img: PropTypes.string,
    date: PropTypes.shape({
      seconds: PropTypes.number.isRequired,
      nanoseconds: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Message;
