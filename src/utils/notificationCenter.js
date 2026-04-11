const STORAGE_KEY = "toxi_notifications";

const readNotifications = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeNotifications = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("toxi-notifications-updated", { detail: items }));
};

export const getNotifications = (audience = "all") => {
  const items = readNotifications();
  if (audience === "all") return items;
  return items.filter((item) => item.audience === audience || item.audience === "all");
};

export const getUnreadNotificationCount = (audience = "all") =>
  getNotifications(audience).filter((item) => !item.read).length;

export const pushNotification = ({
  audience = "all",
  type = "info",
  title,
  message,
  entityId = null,
  entityType = null,
  contextId = null,
  actor = null,
  path = null,
}) => {
  const items = readNotifications();
  const nextItem = {
    id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    audience,
    type,
    title,
    message,
    entityId,
    entityType,
    contextId,
    actor,
    path,
    read: false,
    createdAt: new Date().toISOString(),
  };
  writeNotifications([nextItem, ...items].slice(0, 100));
  return nextItem;
};

export const markNotificationsAsRead = (audience = "all") => {
  const items = readNotifications().map((item) =>
    audience === "all" || item.audience === audience || item.audience === "all"
      ? { ...item, read: true }
      : item
  );
  writeNotifications(items);
  return items;
};

export const formatNotificationTime = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";

  const diffMinutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
  if (diffMinutes < 1) return "Vua xong";
  if (diffMinutes < 60) return `${diffMinutes} phut truoc`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} gio truoc`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} ngay truoc`;

  return date.toLocaleString("vi-VN");
};
