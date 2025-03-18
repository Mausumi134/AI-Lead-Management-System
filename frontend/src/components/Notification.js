// components/Notification.js

export const showToast = (message, type = 'success') => {
    const bgColor = type === 'error' ? '#FF4D4D' : '#4CAF50';
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.backgroundColor = bgColor;
    notification.style.color = '#fff';
    notification.style.padding = '15px';
    notification.style.margin = '10px';
    notification.style.borderRadius = '5px';
    document.body.appendChild(notification);
  
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };
  