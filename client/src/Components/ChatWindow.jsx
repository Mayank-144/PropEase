import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { getStoredUser } from '@/utils/storage.js';

const ChatWindow = () => {
  const { socket, isConnected } = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user] = useState(getStoredUser());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveChat = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on('receive_chat_message', handleReceiveChat);

    return () => {
      socket.off('receive_chat_message', handleReceiveChat);
    };
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !socket) return;

    const chatData = {
      message,
      senderName: user ? (user.name || user.email) : 'Guest',
      timestamp: new Date().toISOString()
    };

    socket.emit('send_chat_message', chatData);
    setMessage('');
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', left: '30px', zIndex: 9999 }}>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--orange)',
            color: 'white',
            border: 'none',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            transition: 'var(--transition)',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          width: '350px',
          height: '450px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeUp 0.3s ease-out'
        }}>
          {/* Header */}
          <div style={{
            padding: '15px 20px',
            background: 'var(--orange)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isConnected ? '#4CAF50' : '#FF5252' }}></div>
              <span style={{ fontWeight: '600' }}>PropEase Chat</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: 'white', fontSize: '1.2rem' }}>×</button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            background: '#f8f9fa',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--cadet)', marginTop: '20px', fontSize: '0.9rem' }}>
                No messages yet. Say hi!
              </div>
            )}
            {messages.map((msg, index) => {
              const isOwn = msg.senderId === socket.id;
              return (
                <div key={index} style={{
                  maxWidth: '80%',
                  alignSelf: isOwn ? 'flex-end' : 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isOwn ? 'flex-end' : 'flex-start'
                }}>
                  {!isOwn && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--cadet)', marginBottom: '2px', marginLeft: '5px' }}>
                      {msg.senderName}
                    </span>
                  )}
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: isOwn ? '12px 12px 0 12px' : '12px 12px 12px 0',
                    background: isOwn ? 'var(--orange)' : 'white',
                    color: isOwn ? 'white' : 'var(--raisin)',
                    fontSize: '0.9rem',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                    wordBreak: 'break-word'
                  }}>
                    {msg.message}
                  </div>
                  <span style={{ fontSize: '0.6rem', color: 'var(--cadet)', marginTop: '2px' }}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} style={{
            padding: '15px',
            background: 'white',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '10px'
          }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '8px 15px',
                borderRadius: '20px',
                border: '1px solid #ddd',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
            <button
              type="submit"
              disabled={!message.trim()}
              style={{
                background: 'var(--orange)',
                color: 'white',
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: message.trim() ? 1 : 0.5,
                cursor: message.trim() ? 'pointer' : 'default'
              }}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
