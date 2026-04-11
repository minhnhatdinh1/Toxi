import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import {
  getAdminCourses,
  getCourseReviews,
  getCourseReviewStats,
  replyCourseReview,
  updateCourseReviewStatus,
} from "./api/apiCourseReview";
import { getAllLessonDiscussion, replyLessonDiscussion } from "../video/api/apiLessonDiscussion";
import { pushNotification } from "../../utils/notificationCenter";

const normalizeList = (payload) =>
  Array.isArray(payload) ? payload : payload?.data || payload?.content || [];

const normalizeStatus = (value) => {
  const raw = String(value || "").toUpperCase();
  if (raw === "REPLIED") return "replied";
  if (raw === "HIDDEN") return "hidden";
  return "pending";
};

const formatDate = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const starArray = [1, 2, 3, 4, 5];

const mapReviewItem = (item) => ({
  id: item.id,
  kind: "review",
  courseId: item.courseId,
  courseTitle: item.courseTitle,
  lessonId: null,
  lessonTitle: null,
  userName: item.userName,
  email: item.email,
  rating: Number(item.rating || 0),
  content: item.content,
  status: normalizeStatus(item.status),
  createdAt: item.createdAt,
  adminReply: item.adminReply || "",
  repliedAt: item.repliedAt,
});

const mapDiscussionItem = (item) => ({
  id: item.id,
  kind: "discussion",
  courseId: item.courseId,
  courseTitle: item.courseTitle,
  lessonId: item.lessonId,
  lessonTitle: item.lessonTitle,
  userName: item.author,
  email: "",
  rating: 0,
  content: item.content,
  status: item.adminReply ? "replied" : "pending",
  createdAt: item.createdAt,
  adminReply: item.adminReply || "",
  repliedAt: item.repliedAt || null,
});

export default function AdminCourseComment() {
  const [courses, setCourses] = useState([]);
  const [comments, setComments] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, replied: 0, average: "0.0" });
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [keyword, setKeyword] = useState("");
  const [draftReplies, setDraftReplies] = useState({});

  const reviewParams = useMemo(() => {
    const params = {};
    if (keyword.trim()) params.keyword = keyword.trim();
    if (selectedCourseId !== "ALL") params.courseId = Number(selectedCourseId);
    if (selectedStatus !== "ALL") params.status = selectedStatus.toUpperCase();
    return params;
  }, [keyword, selectedCourseId, selectedStatus]);

  const loadStats = async () => {
    const response = await getCourseReviewStats();
    const payload = response?.data || response || {};
    const discussions = getAllLessonDiscussion().map(mapDiscussionItem);
    const discussionPending = discussions.filter((item) => item.status === "pending").length;
    const discussionReplied = discussions.filter((item) => item.status === "replied").length;

    setStats({
      total: Number(payload.total || 0) + discussions.length,
      pending: Number(payload.pending || 0) + discussionPending,
      replied: Number(payload.replied || 0) + discussionReplied,
      average: Number(payload.average || 0).toFixed(1),
    });
  };

  const loadReviews = async () => {
    const response = await getCourseReviews(reviewParams);
    const reviewItems = normalizeList(response).map(mapReviewItem);
    const discussionItems = getAllLessonDiscussion()
      .map(mapDiscussionItem)
      .filter((item) => {
        const matchesKeyword =
          !reviewParams.keyword ||
          [item.userName, item.courseTitle, item.lessonTitle, item.content]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(String(reviewParams.keyword).toLowerCase());

        const matchesCourse =
          !reviewParams.courseId || Number(item.courseId) === Number(reviewParams.courseId);

        const matchesStatus =
          !reviewParams.status || String(item.status).toUpperCase() === String(reviewParams.status).toUpperCase();

        return matchesKeyword && matchesCourse && matchesStatus;
      });

    const nextComments = [...reviewItems, ...discussionItems].sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
    setComments(nextComments);
    setDraftReplies((prev) => {
      const next = { ...prev };
      nextComments.forEach((comment) => {
        if (next[comment.id] === undefined) {
          next[comment.id] = comment.adminReply || "";
        }
      });
      return next;
    });
  };

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [courseResponse] = await Promise.all([getAdminCourses(), loadStats()]);
        setCourses(normalizeList(courseResponse));
      } catch (error) {
        console.error("Error loading course review screen:", error);
        setCourses([]);
        setStats({ total: 0, pending: 0, replied: 0, average: "0.0" });
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  useEffect(() => {
    let active = true;

    async function fetchReviews() {
      try {
        setLoading(true);
        const response = await getCourseReviews(reviewParams);
        if (!active) return;
        const reviewItems = normalizeList(response).map(mapReviewItem);
        const discussionItems = getAllLessonDiscussion()
          .map(mapDiscussionItem)
          .filter((item) => {
            const matchesKeyword =
              !reviewParams.keyword ||
              [item.userName, item.courseTitle, item.lessonTitle, item.content]
                .filter(Boolean)
                .join(" ")
                .toLowerCase()
                .includes(String(reviewParams.keyword).toLowerCase());

            const matchesCourse =
              !reviewParams.courseId || Number(item.courseId) === Number(reviewParams.courseId);

            const matchesStatus =
              !reviewParams.status || String(item.status).toUpperCase() === String(reviewParams.status).toUpperCase();

            return matchesKeyword && matchesCourse && matchesStatus;
          });

        const nextComments = [...reviewItems, ...discussionItems].sort(
          (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
        setComments(nextComments);
        setDraftReplies((prev) => {
          const next = { ...prev };
          nextComments.forEach((comment) => {
            if (next[comment.id] === undefined || submittingId === null) {
              next[comment.id] = comment.adminReply || "";
            }
          });
          return next;
        });
      } catch (error) {
        if (active) {
          console.error("Error loading reviews:", error);
          setComments([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchReviews();
    return () => {
      active = false;
    };
  }, [reviewParams, submittingId]);

  const handleReplySubmit = async (comment) => {
    const nextReply = String(draftReplies[comment.id] || "").trim();
    if (!nextReply) return;

    try {
      setSubmittingId(comment.id);
      if (comment.kind === "discussion") {
        await replyLessonDiscussion(comment.lessonId, comment.id, nextReply);
      } else {
        await replyCourseReview(comment.id, { adminReply: nextReply });
        pushNotification({
          audience: "user",
          type: "review-reply",
          title: "Admin da phan hoi danh gia",
          message: `Danh gia cua ban cho ${comment.courseTitle || "khoa hoc"} da co phan hoi moi.`,
          entityId: comment.courseId,
          entityType: "course-review-reply",
          contextId: comment.id,
          actor: "Admin",
          path: `/courses/${comment.courseId}?focusReview=${encodeURIComponent(comment.id)}`,
        });
      }
      await Promise.all([loadReviews(), loadStats()]);
      setDraftReplies((prev) => ({ ...prev, [comment.id]: "" }));
    } catch (error) {
      console.error("Error replying review:", error);
      alert("Khong the luu phan hoi luc nay.");
    } finally {
      setSubmittingId(null);
    }
  };

  const handleToggleStatus = async (commentId, currentStatus) => {
    const nextStatus = currentStatus === "hidden" ? "PENDING" : "HIDDEN";

    try {
      setSubmittingId(commentId);
      await updateCourseReviewStatus(commentId, { status: nextStatus });
      await Promise.all([loadReviews(), loadStats()]);
    } catch (error) {
      console.error("Error updating review status:", error);
      alert("Khong the cap nhat trang thai danh gia.");
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
              Course Review Center
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">
              Quan ly danh gia va thao luan
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-500">
              Man hinh nay dang gom ca review khoa hoc va thao luan bai hoc de admin theo doi va phan hoi trong cung mot noi.
            </p>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Tong danh gia", value: stats.total, icon: "reviews", tone: "bg-blue-50 text-blue-700" },
              { label: "Cho phan hoi", value: stats.pending, icon: "schedule", tone: "bg-amber-50 text-amber-700" },
              { label: "Da phan hoi", value: stats.replied, icon: "mark_chat_read", tone: "bg-emerald-50 text-emerald-700" },
              { label: "Diem trung binh", value: stats.average, icon: "star", tone: "bg-violet-50 text-violet-700" },
            ].map((card) => (
              <div key={card.label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className={`flex size-11 items-center justify-center rounded-2xl ${card.tone}`}>
                    <span className="material-symbols-outlined text-[22px]">{card.icon}</span>
                  </div>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{card.label}</p>
                <p className="mt-3 text-4xl font-black text-slate-900">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="mb-6 grid gap-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[1.5fr,1fr,1fr]">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Tim kiem</span>
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Tim theo hoc vien, email, khoa hoc, noi dung..."
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Khoa hoc</span>
              <select
                value={selectedCourseId}
                onChange={(event) => setSelectedCourseId(event.target.value)}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary"
              >
                <option value="ALL">Tat ca khoa hoc</option>
                {courses.map((course) => (
                  <option key={course.courseId} value={course.courseId}>
                    {course.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Trang thai</span>
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary"
              >
                <option value="ALL">Tat ca</option>
                <option value="pending">Cho phan hoi</option>
                <option value="replied">Da phan hoi</option>
                <option value="hidden">Da an</option>
              </select>
            </label>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-xl font-black text-slate-900">
                Danh sach danh gia ({comments.length})
              </h2>
            </div>

            {loading ? (
              <div className="px-6 py-10 text-sm text-slate-500">Dang tai du lieu comment...</div>
            ) : comments.length === 0 ? (
              <div className="px-6 py-10 text-sm text-slate-500">
                Chua co danh gia nao phu hop voi bo loc hien tai.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {comments.map((comment) => {
                  const badgeClass =
                    comment.status === "replied"
                      ? "bg-emerald-50 text-emerald-700"
                      : comment.status === "hidden"
                        ? "bg-slate-100 text-slate-600"
                        : "bg-amber-50 text-amber-700";

                  return (
                    <div key={comment.id} className="px-6 py-6">
                      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="mb-3 flex flex-wrap items-center gap-3">
                            <h3 className="text-lg font-black text-slate-900">{comment.courseTitle}</h3>
                            {comment.kind === "discussion" ? (
                              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                                Thao luan bai hoc
                              </span>
                            ) : null}
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${badgeClass}`}>
                              {comment.status === "replied" ? "Da phan hoi" : comment.status === "hidden" ? "Da an" : "Cho phan hoi"}
                            </span>
                          </div>

                          {comment.lessonTitle ? (
                            <p className="mb-3 text-sm font-semibold text-primary">Bai hoc: {comment.lessonTitle}</p>
                          ) : null}

                          <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                            <span className="font-semibold text-slate-700">{comment.userName}</span>
                            <span>{comment.email || "Chua co email"}</span>
                            <span>{formatDate(comment.createdAt)}</span>
                          </div>

                          <div className="mb-4 flex items-center gap-1 text-amber-400">
                            {starArray.map((star) => (
                              <span key={star} className={`material-symbols-outlined ${star <= comment.rating ? "fill-1" : "text-slate-300"}`}>
                                star
                              </span>
                            ))}
                          </div>

                          <p className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                            {comment.content}
                          </p>

                          {comment.adminReply ? (
                            <div className="mt-4 rounded-2xl border border-primary/10 bg-primary/5 px-4 py-4">
                              <div className="mb-2 flex flex-wrap items-center gap-3">
                                <span className="text-sm font-black text-primary">Phan hoi tu admin</span>
                                <span className="text-xs text-slate-400">{formatDate(comment.repliedAt)}</span>
                              </div>
                              <p className="text-sm leading-7 text-slate-700">{comment.adminReply}</p>
                            </div>
                          ) : null}
                        </div>

                        <div className="w-full xl:w-[360px]">
                          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                              Tra loi danh gia
                            </p>
                            <textarea
                              rows={5}
                              value={draftReplies[comment.id] ?? comment.adminReply ?? ""}
                              onChange={(event) =>
                                setDraftReplies((prev) => ({ ...prev, [comment.id]: event.target.value }))
                              }
                              placeholder="Nhap phan hoi cua admin..."
                              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary"
                            />

                            <div className="mt-4 flex flex-wrap gap-3">
                              <button
                                type="button"
                                disabled={submittingId === comment.id}
                                onClick={() => handleReplySubmit(comment)}
                                className="rounded-2xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90 disabled:opacity-60"
                              >
                                Luu phan hoi
                              </button>
                              <button
                                type="button"
                                disabled={submittingId === comment.id || comment.kind === "discussion"}
                                onClick={() => handleToggleStatus(comment.id, comment.status)}
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:opacity-60"
                              >
                                {comment.kind === "discussion"
                                  ? "Chi doc"
                                  : comment.status === "hidden"
                                    ? "Hien lai"
                                    : "An danh gia"}
                              </button>
                            </div>

                            <p className="mt-3 text-xs leading-6 text-slate-400">
                              Review duoc dong bo truc tiep voi backend qua API admin course reviews.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
