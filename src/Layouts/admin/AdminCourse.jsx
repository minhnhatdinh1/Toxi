import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const normalizeList = (payload) =>
  Array.isArray(payload) ? payload : payload?.data || payload?.content || [];

const normalizeCourseStatus = (status) => {
  const normalized = String(status || "").trim().toUpperCase();
  if (["ACTIVE", "PUBLISHED", "PUBLIC"].includes(normalized)) return "PUBLISHED";
  if (["DRAFT", "DRAFTING"].includes(normalized)) return "DRAFT";
  if (["INACTIVE", "ARCHIVED", "HIDDEN"].includes(normalized)) return "INACTIVE";
  return normalized || "DRAFT";
};

const getStatusMeta = (status) => {
  const normalized = normalizeCourseStatus(status);
  if (normalized === "PUBLISHED") {
    return {
      label: "Đang hoạt động",
      pillClass:
        "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
      dotClass: "bg-green-500",
      isActive: true,
    };
  }
  if (normalized === "INACTIVE") {
    return {
      label: "Tạm ẩn",
      pillClass:
        "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
      dotClass: "bg-amber-500",
      isActive: false,
    };
  }
  return {
    label: "Bản nháp",
    pillClass:
      "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
    dotClass: "bg-slate-400",
    isActive: false,
  };
};

const normalizeText = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const isSuccessfulOrderStatus = (status) => {
  const normalized = String(status || "").trim().toUpperCase();
  return normalized && !["PENDING", "FAILED", "EXPIRED", "CANCELLED", "REJECTED"].includes(normalized);
};

const isCourseItem = (item = {}) => {
  const normalizedType = String(item.itemType || item.type || "")
    .trim()
    .toUpperCase();
  return (
    normalizedType === "COURSE" ||
    !!item.course ||
    !!item.courseId ||
    !!item.courseName
  );
};

const buildEnrollmentMap = (orders = [], courses = []) => {
  const courseStudentMap = {};
  const courseNameMap = Object.fromEntries(
    courses.map((course) => [
      normalizeText(course.title || course.name),
      String(course.courseId),
    ])
  );

  orders
    .filter((order) => isSuccessfulOrderStatus(order.status))
    .forEach((order) => {
      const studentKey = String(
        order.userId ||
          order.studentId ||
          order.username ||
          order.email ||
          order.fullName ||
          order.orderCode ||
          order.id
      );

      (order.orderItems || order.items || []).forEach((item) => {
        if (!isCourseItem(item)) return;

        const courseId = String(
          item.course?.courseId ||
            item.courseId ||
            item.itemId ||
            item.course?.id ||
            courseNameMap[
              normalizeText(
                item.course?.title ||
                  item.courseName ||
                  item.name
              )
            ] ||
            ""
        );

        if (!courseId) return;
        if (!courseStudentMap[courseId]) {
          courseStudentMap[courseId] = new Set();
        }
        courseStudentMap[courseId].add(studentKey);
      });
    });

  return Object.fromEntries(
    Object.entries(courseStudentMap).map(([courseId, students]) => [
      courseId,
      students.size,
    ])
  );
};

export default function AdminCourse() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrollmentMap, setEnrollmentMap] = useState({});
  const [activeTab, setActiveTab] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const coursesPerPage = 5;

  const fetchCourses = async () => {
    try {
      const [courseRes, orderRes] = await Promise.all([
        fetch("http://localhost:8080/api/admin/courses", { headers }),
        fetch("http://localhost:8080/api/admin/orders", { headers }),
      ]);

      const coursePayload = courseRes.ok ? await courseRes.json() : [];
      const orderPayload = orderRes.ok ? await orderRes.json() : [];
      const courseList = normalizeList(coursePayload);
      const orderList = normalizeList(orderPayload);

      setCourses(courseList || []);
      setEnrollmentMap(buildEnrollmentMap(orderList, courseList));
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa khóa học này?")) return;

    await fetch(`http://localhost:8080/api/admin/courses/${id}`, {
      method: "DELETE",
      headers,
    });

    fetchCourses();
  };

  const handleToggleStatus = async (course) => {
    const nextStatus =
      normalizeCourseStatus(course.status) === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

    setUpdatingStatusId(course.courseId);
    try {
      const payload = new FormData();
      payload.append(
        "course",
        new Blob(
          [
            JSON.stringify({
              courseId: course.courseId,
              title: course.title || "",
              courseType: course.courseType || course.type || "",
              type: course.courseType || course.type || "",
              price: Number(course.price || 0),
              discountPrice: Number(course.discountPrice || 0),
              description: course.description || "",
              introVideoUrl:
                course.introVideoUrl || course.videoUrl || course.introUrl || "",
              thumbnailUrl:
                course.thumbnailUrl ||
                course.thumbnail ||
                course.imageUrl ||
                course.image ||
                "",
              status: nextStatus,
            }),
          ],
          { type: "application/json" }
        )
      );

      const response = await fetch(
        `http://localhost:8080/api/admin/courses/${course.courseId}`,
        {
          method: "PUT",
          headers,
          body: payload,
        }
      );

      if (!response.ok) {
        throw new Error("Không thể cập nhật trạng thái khóa học");
      }

      setCourses((prev) =>
        prev.map((item) =>
          String(item.courseId) === String(course.courseId)
            ? { ...item, status: nextStatus }
            : item
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.message || "Cập nhật trạng thái thất bại");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const normalized = normalizeCourseStatus(course.status);
    if (activeTab === "ACTIVE") return normalized === "PUBLISHED";
    if (activeTab === "DRAFT") return normalized !== "PUBLISHED";
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / coursesPerPage));
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const paginated = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <header className="h-20 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-8 shrink-0">
            <div className="flex flex-col">
              <h2 className="text-2xl font-black text-primary dark:text-accent tracking-tight uppercase">
                Course Management
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your active and draft curriculum
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/addnewCourse"
                className="bg-accent hover:bg-yellow-400 text-primary px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-accent/20 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined font-bold">add</span>
                Add New Course
              </Link>
            </div>
          </header>

          <div className="flex-1 overflow-auto p-8">
            <div className="flex gap-8 mb-6 border-b border-gray-200 dark:border-white/10">
              {[
                { key: "ALL", label: "All Courses", count: courses.length },
                {
                  key: "ACTIVE",
                  label: "Active",
                  count: courses.filter(
                    (course) => normalizeCourseStatus(course.status) === "PUBLISHED"
                  ).length,
                },
                {
                  key: "DRAFT",
                  label: "Draft",
                  count: courses.filter(
                    (course) => normalizeCourseStatus(course.status) !== "PUBLISHED"
                  ).length,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-4 font-medium transition-colors flex items-center gap-2 border-b-2 ${
                    activeTab === tab.key
                      ? "text-primary dark:text-accent font-bold border-primary dark:border-accent"
                      : "text-gray-400 border-transparent hover:text-primary dark:hover:text-accent"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      activeTab === tab.key
                        ? "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-white/5">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="text-left">Course Type</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Students Enrolled
                    </th>
                    <th className="text-left">Price</th>
                    <th className="text-left">Discount Price</th>
                    <th className="text-left">Thumbnail</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {paginated.map((course) => {
                    const statusMeta = getStatusMeta(course.status);
                    const isUpdatingStatus =
                      String(updatingStatusId) === String(course.courseId);

                    return (
                    <tr
                      key={course.courseId}
                      className="hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary">
                              menu_book
                            </span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {course.title}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {course.courseType}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-gray-400 text-sm">
                            person
                          </span>
                          {Number(
                            enrollmentMap[String(course.courseId)] ??
                              course.enrolled ??
                              0
                          ).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-900 dark:text-white font-semibold">
                        ${(course.price || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-5 text-gray-900 dark:text-white font-semibold">
                        ${(course.discountPrice || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-5">
                        {(
                          course.thumbnailUrl ||
                          course.thumbnail ||
                          course.imageUrl ||
                          course.image
                        ) ? (
                          <img
                            src={
                              course.thumbnailUrl ||
                              course.thumbnail ||
                              course.imageUrl ||
                              course.image
                            }
                            width="80"
                            alt={course.title}
                            className="h-12 w-20 object-cover rounded-md border border-slate-200"
                          />
                        ) : (
                          <span className="text-xs text-slate-400">No image</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(course)}
                            disabled={isUpdatingStatus}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              statusMeta.isActive ? "bg-primary" : "bg-slate-200"
                            } ${isUpdatingStatus ? "opacity-60 cursor-wait" : ""}`}
                            aria-label="Toggle course status"
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                statusMeta.isActive ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${statusMeta.pillClass}`}
                          >
                            <span className={`size-1.5 rounded-full ${statusMeta.dotClass}`}></span>
                            {isUpdatingStatus ? "Đang cập nhật..." : statusMeta.label}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/editCourse/${course.courseId}`}
                            className="p-2 text-gray-400 hover:text-primary"
                          >
                            <span className="material-symbols-outlined">edit</span>
                          </Link>
                          <button
                            onClick={() =>
                              navigate(`/adminAddNewVideo/${course.courseId}`, {
                                state: { course },
                              })
                            }
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <span className="material-symbols-outlined text-xl">add</span>
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/admincoursecontent/${course.courseId}`, {
                                state: { course },
                              })
                            }
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <span className="material-symbols-outlined text-xl">
                              menu_book
                            </span>
                          </button>

                          <button
                            onClick={() => handleDelete(course.courseId)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <span className="material-symbols-outlined text-xl">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-gray-50 border-t border-[#e7ebf3] flex items-center justify-between">
              <p className="text-sm text-[#4c669a]">
                Page <span className="font-bold text-[#0d121b]">{currentPage}</span>{" "}
                of <span className="font-bold text-[#0d121b]">{totalPages}</span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-primary text-white"
                        : "bg-white border"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
