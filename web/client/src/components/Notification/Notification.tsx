import React  from "preact/hooks";
import "./notification.scss";
import { FunctionalComponent } from "preact";

interface NotificationProps {
  message: string;
  type: string;
}

const Notification: FunctionalComponent<NotificationProps> = ({ message, type }) => {
  return <div class={`notification ${type}`}>{message}</div>;
};

export default Notification;
