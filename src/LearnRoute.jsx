import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


const API_BASE = `${BASE_URL}/api`;

function getToken() {
  return localStorage.getItem("token") || localStorage.getItem("accessToken");
}

function getAuthConfig() {
  const token = getToken();
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

function findLessonContent(course, targetLessonId) {
  for (const chapter of course?.chapters || []) {
    for (const content of chapter?.contents || []) {
      if (
        content?.contentType === "LESSON" &&
        String(content?.lesson?.lessonId) === String(targetLessonId)
      ) {
        return content;
      }
    }
  }

  return null;
}

export default function LearnRoute({ children }) {
  const { courseId, lessonId } = useParams();
  const location = useLocation();
  const [status, setStatus] = useState("checking");
  const [redirectCourseId, setRedirectCourseId] = useState(courseId);

  const fromPath = useMemo(
    () => `${location.pathname}${location.search}${location.hash}`,
    [location.pathname, location.search, location.hash]
  );

  useEffect(() => {
    let cancelled = false;

    const checkAccess = async () => {
      const token = getToken();

      if (!token) {
        sessionStorage.setItem("learnRedirectAfterLogin", fromPath);
        if (!cancelled) setStatus("unauthenticated");
        return;
      }

      try {
        const courseRes = await axios.get(`${API_BASE}/courses/${courseId}`);
        const course = courseRes.data;
        const lessonContent = findLessonContent(course, lessonId);

        if (!cancelled) {
          setRedirectCourseId(String(course?.courseId || courseId));
        }

        if (!lessonContent) {
          if (!cancelled) setStatus("forbidden");
          return;
        }

        if (lessonContent.isPreview) {
          if (!cancelled) setStatus("allowed");
          return;
        }

        const accessRes = await axios.get(
          `${API_BASE}/course/${courseId}/access`,
          getAuthConfig()
        );

        if (!cancelled) {
          setStatus(accessRes.data ? "allowed" : "forbidden");
        }
      } catch (error) {
        const responseStatus = error?.response?.status;

        if (responseStatus === 401) {
          sessionStorage.setItem("learnRedirectAfterLogin", fromPath);
          if (!cancelled) setStatus("unauthenticated");
          return;
        }

        if (!cancelled) setStatus("forbidden");
      }
    };

    checkAccess();

    return () => {
      cancelled = true;
    };
  }, [courseId, fromPath, lessonId]);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="flex flex-col items-center gap-3">
          <svg className="size-8 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm font-medium text-slate-500">
            Dang kiem tra quyen truy cap bai hoc...
          </span>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: fromPath, reason: "learn-auth-required" }}
      />
    );
  }

  if (status === "forbidden") {
    return (
      <Navigate
        to={`/courses/${redirectCourseId}`}
        replace
        state={{ accessDenied: true }}
      />
    );
  }

  return children;
}
