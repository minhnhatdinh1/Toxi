import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  formatNotificationTime,
  getNotifications,
  getUnreadNotificationCount,
  markNotificationsAsRead,
} from "../utils/notificationCenter";

export default function NotificationBell({ audience = "all", className = "", panelClassName = "" }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(() => getNotifications(audience));
  const [unreadCount, setUnreadCount] = useState(() => getUnreadNotificationCount(audience));
  const wrapperRef = useRef(null);

  useEffect(() => {
    const sync = () => {
      setItems(getNotifications(audience));
      setUnreadCount(getUnreadNotificationCount(audience));
    };

    sync();
    window.addEventListener("toxi-notifications-updated", sync);
    return () => window.removeEventListener("toxi-notifications-updated", sync);
  }, [audience]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      markNotificationsAsRead(audience);
      setItems(getNotifications(audience));
      setUnreadCount(0);
    }
  };

  const resolveNotificationPath = (item) => {
    if (item?.path) return item.path;

    if (item?.entityType === "course-review-reply" && item?.entityId) {
      const focusQuery = item.contextId ? `?focusReview=${encodeURIComponent(item.contextId)}` : "";
      return `/courses/${item.entityId}${focusQuery}`;
    }

    if (item?.entityType === "course-review") {
      return "/adminCourseComment";
    }

    if (item?.entityType === "lesson-discussion" || item?.entityType === "lesson-discussion-reply") {
      return audience === "admin" ? "/adminCourseComment" : null;
    }

    return null;
  };

  const handleItemClick = (item) => {
    const targetPath = resolveNotificationPath(item);
    if (!targetPath) return;
    markNotificationsAsRead(audience);
    setItems(getNotifications(audience));
    setUnreadCount(0);
    setOpen(false);
    navigate(targetPath);
  };

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
        aria-label="Thông báo"
      >
        <span className="material-symbols-outlined text-[20px]">notifications</span>
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className={`absolute right-0 top-full z-[120] mt-2 w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl ${panelClassName}`}>
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-black text-slate-900">Thông báo</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {items.length > 0 ? (
              items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className="block w-full cursor-pointer border-b border-slate-100 px-4 py-3 text-left last:border-b-0 hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{item.message}</p>
                    </div>
                    <span className="mt-0.5 text-[11px] text-slate-400">
                      {formatNotificationTime(item.createdAt)}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-sm text-slate-500">Chưa có thông báo nào.</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
