import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

const NotificationToast = () => {
  const { socket } = useSocket();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      console.log('Received socket message:', data);
      setNotification(data);
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket]);

  if (!notification) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      background: 'var(--white)',
      padding: '15px 25px',
      borderRadius: '12px',
      boxShadow: 'var(--shadow)',
      borderLeft: '5px solid var(--orange)',
      zIndex: 10000,
      animation: 'fadeUp 0.6s ease forwards',
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    }}>
      <div style={{ fontWeight: '700', color: 'var(--orange)', fontSize: '0.9rem' }}>
        New Notification
      </div>
      <div style={{ color: 'var(--raisin)', fontSize: '1rem' }}>
        {notification.message}
      </div>
      <div style={{ color: 'var(--cadet)', fontSize: '0.75rem' }}>
        {new Date(notification.timestamp).toLocaleTimeString()}
      </div>
      <button 
        onClick={() => setNotification(null)}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          padding: '5px',
          color: 'var(--cadet)',
          fontSize: '0.8rem'
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default NotificationToast;
