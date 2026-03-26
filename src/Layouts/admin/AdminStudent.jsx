import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import {
  deleteAdminStudent,
  fetchAdminStudents,
  fetchAdminStudentStatistics,
  updateAdminStudentStatus,
} from "./api/apiStudent";

export default function AdminStudent() {
  const [students, setStudents] = useState([]);
  const [statistics, setStatistics] = useState({
    totalStudents: 0,
    activeStudents: 0,
    inactiveStudents: 0,
    newStudents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 8;

  const loadStudents = async () => {
    try {
      setLoading(true);
      const [studentList, stats] = await Promise.all([
        fetchAdminStudents(),
        fetchAdminStudentStatistics(),
      ]);

      setStudents(studentList);
      setStatistics({
        totalStudents: Number(stats?.totalStudents || 0),
        activeStudents: Number(stats?.activeStudents || 0),
        inactiveStudents: Number(stats?.inactiveStudents || 0),
        newStudents: Number(stats?.newStudents || 0),
      });
    } catch (error) {
      console.error("Error loading admin students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const filteredStudents = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchSearch =
        !keyword ||
        student.name.toLowerCase().includes(keyword) ||
        student.username.toLowerCase().includes(keyword) ||
        student.email.toLowerCase().includes(keyword) ||
        student.phone.toLowerCase().includes(keyword);

      const matchStatus =
        statusFilter === "all" || student.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [students, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa học viên này?");
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteAdminStudent(id);

      setStudents((prev) => prev.filter((student) => student.id !== id));
      setStatistics((prev) => ({
        ...prev,
        totalStudents: Math.max(0, prev.totalStudents - 1),
      }));
    } catch (error) {
      console.error("Error deleting student:", error);
      window.alert("Không thể xóa học viên lúc này.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (student) => {
    const nextActive = student.status !== "Active";
    const message = nextActive
      ? "Bạn muốn mở khóa tài khoản học viên này?"
      : "Bạn muốn khóa tài khoản học viên này?";

    if (!window.confirm(message)) return;

    try {
      setTogglingId(student.id);
      const updated = await updateAdminStudentStatus(student.id, nextActive);

      setStudents((prev) =>
        prev.map((item) => (item.id === student.id ? updated : item))
      );

      setStatistics((prev) => {
        const wasActive = student.status === "Active";
        const isActive = updated.status === "Active";
        if (wasActive === isActive) return prev;

        return {
          ...prev,
          activeStudents: prev.activeStudents + (isActive ? 1 : -1),
          inactiveStudents: prev.inactiveStudents + (isActive ? -1 : 1),
        };
      });
    } catch (error) {
      console.error("Error toggling student status:", error);
      window.alert("Không thể cập nhật trạng thái học viên lúc này.");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 min-w-0 overflow-y-auto bg-slate-50">
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-slate-800">
              Quản lý học viên
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Dữ liệu học viên được lấy trực tiếp từ hệ thống backend.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-80 max-w-[42vw]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo tên, email, số điện thoại..."
                className="w-full rounded-xl border border-slate-200 bg-slate-100 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary/30 focus:bg-white"
              />
            </div>

            <Link
              to="/adminAddNewStudent"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Thêm học viên
            </Link>
          </div>
        </header>

        <div className="space-y-6 p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  Toàn hệ thống
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500">Tổng số học viên</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">{statistics.totalStudents}</h3>
              <p className="mt-2 text-xs text-slate-400">Tổng tài khoản học viên hiện có</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  Đang hoạt động
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500">Tài khoản mở</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">{statistics.activeStudents}</h3>
              <p className="mt-2 text-xs text-slate-400">Học viên đang được phép truy cập</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <span className="material-symbols-outlined">person_add</span>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                  30 ngày
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500">Học viên mới</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">{statistics.newStudents}</h3>
              <p className="mt-2 text-xs text-slate-400">Tạo mới trong 30 ngày gần nhất</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <span className="material-symbols-outlined">lock_person</span>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  Tạm khóa
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500">Không hoạt động</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">{statistics.inactiveStudents}</h3>
              <p className="mt-2 text-xs text-slate-400">Tài khoản đang bị khóa</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-primary/30"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="Active">Đang hoạt động</option>
                  <option value="Inactive">Tạm khóa</option>
                </select>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-primary/30 hover:text-primary"
                >
                  Đặt lại bộ lọc
                </button>
              </div>

              <p className="text-sm text-slate-500">
                Hiển thị <span className="font-semibold text-slate-900">{filteredStudents.length}</span> học viên
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Học viên</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Liên hệ</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Khóa đã ghi danh</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Đơn hàng</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Ngày tạo</th>
                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Trạng thái</th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Hành động</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-16 text-center text-sm text-slate-500">
                        Đang tải dữ liệu học viên...
                      </td>
                    </tr>
                  ) : paginatedStudents.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-16 text-center text-sm text-slate-500">
                        Không tìm thấy học viên phù hợp.
                      </td>
                    </tr>
                  ) : (
                    paginatedStudents.map((student) => (
                      <tr key={student.id} className="transition hover:bg-slate-50/80">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="size-11 rounded-full object-cover ring-1 ring-slate-200"
                            />
                            <div>
                              <p className="font-semibold text-slate-900">{student.name}</p>
                              <p className="text-xs text-slate-400">@{student.username || `tx-${student.id}`}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-800">{student.email || "Chưa có email"}</p>
                          <p className="text-xs text-slate-400">{student.phone || "Chưa có số điện thoại"}</p>
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                            {student.courseCount} khóa học
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                          {student.orderCount} đơn
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {student.createdAt || "Chưa rõ"}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                              student.status === "Active"
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {student.status === "Active" ? "Đang hoạt động" : "Tạm khóa"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              disabled={togglingId === student.id}
                              onClick={() => handleToggleStatus(student)}
                              className={`rounded-lg px-3 py-2 text-xs font-semibold transition disabled:opacity-50 ${
                                student.status === "Active"
                                  ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              }`}
                            >
                              {student.status === "Active" ? "Khóa" : "Mở khóa"}
                            </button>

                            <Link
                              to={`/adminEditStudent/${student.id}`}
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-primary/10 hover:text-primary"
                            >
                              <span className="material-symbols-outlined text-lg">edit</span>
                            </Link>

                            <button
                              type="button"
                              disabled={deletingId === student.id}
                              onClick={() => handleDelete(student.id)}
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
              <p className="text-sm text-slate-500">
                Trang <span className="font-bold text-slate-900">{currentPage}</span> /{" "}
                <span className="font-bold text-slate-900">{totalPages}</span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex size-9 items-center justify-center rounded-lg border border-slate-200 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`flex size-9 items-center justify-center rounded-lg text-sm font-bold ${
                        page === currentPage
                          ? "bg-primary text-white"
                          : "border border-slate-200 text-slate-700"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex size-9 items-center justify-center rounded-lg border border-slate-200 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
