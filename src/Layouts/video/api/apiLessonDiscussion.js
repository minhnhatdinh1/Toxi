import API from "../../service/ApiService";
import { pushNotification } from "../../../utils/notificationCenter";

const getStorageKey = (lessonId) => `toxi_lesson_discussion_${lessonId}`;

const readLocalComments = (lessonId) => {
  try {
    const raw = localStorage.getItem(getStorageKey(lessonId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeLocalComments = (lessonId, comments) => {
  localStorage.setItem(getStorageKey(lessonId), JSON.stringify(comments));
};

const getDiscussionIndexKey = () => "toxi_lesson_discussion_index";

const readDiscussionIndex = () => {
  try {
    const raw = localStorage.getItem(getDiscussionIndexKey());
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const updateDiscussionIndex = (lessonId, meta = {}) => {
  const next = { ...readDiscussionIndex(), [lessonId]: meta };
  localStorage.setItem(getDiscussionIndexKey(), JSON.stringify(next));
  return next;
};

const getInitials = (name) => {
  const text = String(name || "B").trim();
  return text
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const formatRelativeTime = (value) => {
  if (!value) return "Vua xong";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Vua xong";

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) return "Vua xong";
  if (diffMinutes < 60) return `${diffMinutes} phut truoc`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} gio truoc`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} ngay truoc`;

  return date.toLocaleDateString("vi-VN");
};

const normalizeComment = (item, fallbackAuthor = "Hoc vien") => {
  const author =
    item?.author ||
    item?.userName ||
    item?.fullName ||
    item?.name ||
    item?.user?.fullName ||
    item?.user?.userName ||
    fallbackAuthor;

  const createdAt =
    item?.createdAt ||
    item?.created_at ||
    item?.time ||
    new Date().toISOString();

  return {
    id: item?.id ?? item?.commentId ?? `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    author,
    avatar: item?.avatar || getInitials(author),
    time: formatRelativeTime(createdAt),
    createdAt,
    content: item?.content || item?.message || "",
    likes: Number(item?.likes || item?.likeCount || 0),
    replies: Array.isArray(item?.replies) ? item.replies : [],
  };
};

export const getLessonDiscussion = async (lessonId) => {
  try {
    const response = await API.get(`/lessons/${lessonId}/comments`);
    const payload = Array.isArray(response.data)
      ? response.data
      : response.data?.data || response.data?.content || [];

    const normalized = payload.map((item) => normalizeComment(item));
    writeLocalComments(lessonId, normalized);
    return normalized;
  } catch (error) {
    return readLocalComments(lessonId);
  }
};

export const createLessonComment = async (lessonId, content) => {
  const fallbackAuthor =
    localStorage.getItem("userName") ||
    localStorage.getItem("email") ||
    "Ban";

  try {
    const response = await API.post(`/lessons/${lessonId}/comments`, { content });
    const nextComment = normalizeComment(response.data?.data || response.data || { content }, fallbackAuthor);
    pushNotification({
      audience: "admin",
      type: "discussion",
      title: "Thao luan moi trong bai hoc",
      message: `${fallbackAuthor} vua gui thao luan moi.`,
      entityId: lessonId,
      entityType: "lesson-discussion",
      contextId: nextComment.id,
      actor: fallbackAuthor,
      path: "/adminCourseComment",
    });
    return nextComment;
  } catch (error) {
    const nextComment = normalizeComment(
      {
        id: `local-${Date.now()}`,
        content,
        createdAt: new Date().toISOString(),
        likes: 0,
      },
      fallbackAuthor
    );

    const current = readLocalComments(lessonId);
    const next = [...current, nextComment];
    writeLocalComments(lessonId, next);
    pushNotification({
      audience: "admin",
      type: "discussion",
      title: "Thao luan moi trong bai hoc",
      message: `${fallbackAuthor} vua gui thao luan moi.`,
      entityId: lessonId,
      entityType: "lesson-discussion",
      contextId: nextComment.id,
      actor: fallbackAuthor,
      path: "/adminCourseComment",
    });
    return nextComment;
  }
};

export const likeLessonComment = async (lessonId, commentId) => {
  try {
    const response = await API.post(`/lessons/${lessonId}/comments/${commentId}/like`);
    return response.data?.data || response.data;
  } catch (error) {
    const current = readLocalComments(lessonId);
    const next = current.map((comment) =>
      String(comment.id) === String(commentId)
        ? { ...comment, likes: Number(comment.likes || 0) + 1 }
        : comment
    );
    writeLocalComments(lessonId, next);
    return next.find((comment) => String(comment.id) === String(commentId));
  }
};

export const seedLessonDiscussionMeta = (lessonId, meta = {}) => {
  updateDiscussionIndex(lessonId, meta);
};

export const getAllLessonDiscussion = () => {
  const discussionIndex = readDiscussionIndex();
  return Object.entries(discussionIndex).flatMap(([lessonId, meta]) =>
    readLocalComments(lessonId).map((comment) => ({
      ...comment,
      lessonId: Number(lessonId),
      lessonTitle: meta.lessonTitle || `Bai hoc ${lessonId}`,
      courseId: meta.courseId || null,
      courseTitle: meta.courseTitle || "Khoa hoc video",
      status: comment.adminReply ? "replied" : "pending",
      kind: "discussion",
    }))
  );
};

export const replyLessonDiscussion = async (lessonId, commentId, adminReply) => {
  const discussionMeta = readDiscussionIndex()[lessonId] || {};
  const targetPath =
    discussionMeta.courseId && lessonId
      ? `/learn/${discussionMeta.courseId}/${lessonId}?focusComment=${encodeURIComponent(commentId)}`
      : null;
  try {
    const response = await API.put(`/lessons/${lessonId}/comments/${commentId}/reply`, { adminReply });
    pushNotification({
      audience: "user",
      type: "discussion-reply",
      title: "Admin da phan hoi thao luan",
      message: "Ban co mot phan hoi moi trong khu vuc thao luan bai hoc.",
      entityId: lessonId,
      entityType: "lesson-discussion-reply",
      contextId: commentId,
      actor: "Admin",
      path: targetPath,
    });
    return response.data?.data || response.data;
  } catch (error) {
    const current = readLocalComments(lessonId);
    const next = current.map((comment) =>
      String(comment.id) === String(commentId)
        ? {
            ...comment,
            adminReply,
            repliedAt: new Date().toISOString(),
            status: "replied",
          }
        : comment
    );
    writeLocalComments(lessonId, next);

    const target = next.find((comment) => String(comment.id) === String(commentId));
    pushNotification({
      audience: "user",
      type: "discussion-reply",
      title: "Admin da phan hoi thao luan",
      message: "Ban co mot phan hoi moi trong khu vuc thao luan bai hoc.",
      entityId: lessonId,
      entityType: "lesson-discussion-reply",
      contextId: commentId,
      actor: "Admin",
      path: targetPath,
    });
    return target;
  }
};
