// src/store/notification.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Notification = {
  id: number;
  message: string;
  type: "success" | "error";
};

const slice = createSlice({
  name: "notification",
  initialState: [] as Notification[],
  reducers: {
    pushNotification(
      state,
      action: PayloadAction<Omit<Notification, "id">>
    ) {
      state.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification(state, action: PayloadAction<number>) {
      return state.filter((n) => n.id !== action.payload);
    },
  },
});

export const { pushNotification, removeNotification } =
  slice.actions;
export default slice.reducer;

export const selectNotifications = (state: { notification: Notification[] }) =>
    state.notification;
export const selectNotificationById = (id: number) => (
  state: { notification: Notification[] }
) => state.notification.find((n) => n.id === id);
export const selectAllNotifications = () => (
    state: { notification: Notification[] }
) => state.notification;
export const selectNotificationsByType = (type: "success" | "error") => (
  state: { notification: Notification[] }
) => state.notification.filter((n) => n.type === type);
export const selectNotificationCount = (state: { notification: Notification[] }) =>
    state.notification.length;
export const selectLatestNotification = () => (
  state: { notification: Notification[] }
) => {
    const notifications = state.notification;
    return notifications.length > 0
      ? notifications[notifications.length - 1]
      : null;
}
export const selectOldestNotification = () => (
  state: { notification: Notification[] }
) => {
    const notifications = state.notification;
    return notifications.length > 0 ? notifications[0] : null;
}
export const selectNotificationsContaining = (keyword: string) => (
  state: { notification: Notification[] }
) =>
  state.notification.filter((n) =>
    n.message.toLowerCase().includes(keyword.toLowerCase())
  );
export const selectNotificationsByTypeCount = (type: "success" | "error") => (
  state: { notification: Notification[] }
) =>
  state.notification.filter((n) => n.type === type).length;
export const selectHasNotifications = (state: { notification: Notification[] }) =>
    state.notification.length > 0;
export const selectClearAllNotifications = () => (
  state: { notification: Notification[] }
) => {
    state.notification = [];
}
export const selectRecentNotifications = (count: number) => (
  state: { notification: Notification[] }
) => {
    const notifications = state.notification;
    return notifications.slice(-count);
}
export const selectOldNotifications = (count: number) => (
  state: { notification: Notification[] }
) => {
    const notifications = state.notification;
    return notifications.slice(0, count);
}
export const selectNotificationsExcludingType = (type: "success" | "error") => (
  state: { notification: Notification[] }
) => state.notification.filter((n) => n.type !== type);
export const selectFirstNotification = () => (
  state: { notification: Notification[] }
) => {
    const notifications = state.notification;
    return notifications.length > 0 ? notifications[0] : null;
}

export const selectLastNotification = () => (
  state: { notification: Notification[] }
) => {
    const notifications = state.notification;
    return notifications.length > 0
      ? notifications[notifications.length - 1]
      : null;
}
export const selectNotificationsByMessageLength = (minLength: number) => (
  state: { notification: Notification[] }
) =>
  state.notification.filter((n) => n.message.length >= minLength);
export const selectNotificationsByRecentTime = (since: number) => (
  state: { notification: Notification[] }
) => {
    const now = Date.now();
    return state.notification.filter((n) => now - n.id <= since);
}
export const selectNotificationsByOlderTime = (before: number) => (
  state: { notification: Notification[] }
) => {
    const now = Date.now();
    return state.notification.filter((n) => now - n.id >= before);
}
export const selectNotificationsSummary = (state: { notification: Notification[] }) => {
    const notifications = state.notification;
    return {
        total: notifications.length,
        success: notifications.filter((n) => n.type === "success").length,
        error: notifications.filter((n) => n.type === "error").length,
    };
}   
export const selectNotificationsByKeywordCount = (keyword: string) => (
  state: { notification: Notification[] }
) =>
  state.notification.filter((n) =>
    n.message.toLowerCase().includes(keyword.toLowerCase())
  ).length;
export const selectNotificationsByTypeAndKeyword = (
  type: "success" | "error",
  keyword: string
) => (
  state: { notification: Notification[] }
) =>
    state.notification.filter((n) =>
      n.type === type &&
      n.message.toLowerCase().includes(keyword.toLowerCase())
    );
export const selectNotificationsByTypeAndKeywordCount = (
  type: "success" | "error",
  keyword: string
) => (
  state: { notification: Notification[] }
) =>
    state.notification.filter((n) =>
      n.type === type &&
      n.message.toLowerCase().includes(keyword.toLowerCase())
    ).length;
export const selectNotificationsPaginated = (
  page: number,
  pageSize: number
) => (
  state: { notification: Notification[] }
) => {
    const start = (page - 1) * pageSize;
    return state.notification.slice(start, start + pageSize);
}
export const selectTotalPages = (pageSize: number) => (
  state: { notification: Notification[] }
) => {
    const totalNotifications = state.notification.length;
    return Math.ceil(totalNotifications / pageSize);
}
export const selectIsNotificationExist = (message: string) => (
  state: { notification: Notification[] }
) =>
    state.notification.some((n) => n.message === message);
export const selectIsNotificationTypeExist = (type: "success" | "error") => (
  state: { notification: Notification[] }
) =>
    state.notification.some((n) => n.type === type);
export const selectLatestNotificationsByType = (type: "success" | "error", count: number) => (
  state: { notification: Notification[] }
) => {
    const filtered = state.notification.filter((n) => n.type === type);
    return filtered.slice(-count);
}
export const selectOldestNotificationsByType = (type: "success" | "error", count: number) => (
  state: { notification: Notification[] }
) => {
    const filtered = state.notification.filter((n) => n.type === type);
    return filtered.slice(0, count);
}

export const selectNotificationsByTypePaginated = (
  type: "success" | "error",
  page: number,
    pageSize: number
) => (
  state: { notification: Notification[] }
) => {  
    const filtered = state.notification.filter((n) => n.type === type);
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
}
export const selectTotalPagesByType = (type: "success" | "error", pageSize: number) => (
  state: { notification: Notification[] }
) => {
    const filtered = state.notification.filter((n) => n.type === type);
    return Math.ceil(filtered.length / pageSize);
}
export const selectNotificationsByTypeAndKeywordPaginated = (
  type: "success" | "error",
  keyword: string,
    page: number,
    pageSize: number
) => (
  state: { notification: Notification[] }
) => {  
    const filtered = state.notification.filter((n) =>
      n.type === type &&
        n.message.toLowerCase().includes(keyword.toLowerCase())
    );
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
}
export const selectTotalPagesByTypeAndKeyword = (
  type: "success" | "error",
  keyword: string,
    pageSize: number
) => (
  state: { notification: Notification[] }
) => {
    const filtered = state.notification.filter((n) =>
      n.type === type &&
        n.message.toLowerCase().includes(keyword.toLowerCase())
    );
    return Math.ceil(filtered.length / pageSize);
}
export const selectNotificationsByMessageLengthPaginated = (
  minLength: number,
    page: number,
    pageSize: number
) => (
  state: { notification: Notification[] }
) => {  
    const filtered = state.notification.filter((n) => n.message.length >= minLength);
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
}
export const selectTotalPagesByMessageLength = (
  minLength: number,
    pageSize: number
) => (
  state: { notification: Notification[] }
) => {
    const filtered = state.notification.filter((n) => n.message.length >= minLength);
    return Math.ceil(filtered.length / pageSize);
}
export const selectNotificationsByRecentTimePaginated = (
  since: number,
    page: number,
    pageSize: number
) => (
  state: { notification: Notification[] }
) => {  
    const now = Date.now();
    const filtered = state.notification.filter((n) => now - n.id <= since);
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
}
export const selectTotalPagesByRecentTime = (
  since: number,
    pageSize: number
) => (
  state: { notification: Notification[] }
) => {

    const now = Date.now();
    const filtered = state.notification.filter((n) => now - n.id <= since);
    return Math.ceil(filtered.length / pageSize);
}