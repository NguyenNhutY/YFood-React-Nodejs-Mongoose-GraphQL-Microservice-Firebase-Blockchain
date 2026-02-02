import { createContext, useState, useContext }  from "preact/hooks";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type) => {
    setNotifications((prev) => [...prev, { id: Date.now(), message, type }]);
    setTimeout(() => setNotifications((prev) => prev.slice(1)), 5000); // Ẩn thông báo sau 5 giây
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div class='notification-container'>
        {notifications.map((notif) => (
          <Notification
            key={notif.id}
            message={notif.message}
            type={notif.type}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
