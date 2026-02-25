import react from "react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
export default function AdminStudent() {
 // STATE
const [currentPage, setCurrentPage] = useState(1);
const [levelFilter, setLevelFilter] = useState("all");
const [statusFilter, setStatusFilter] = useState("all");
const [showAdvanced, setShowAdvanced] = useState(false);

const pageSize = 2; // mỗi trang 2 học viên

// DATA
const [studentList, setStudentList] = useState([
  {
    id: 1,
    name: "Trần Minh Quân",
    avatar: "...",
    email: "quan@gmail.com",
    phone: "0988123456",
    course: "HSK 3",
    progress: 75,
    status: "Active",
  },
  {
    id: 2,
    name: "Lê Thu Hà",
    avatar: "...",
    email: "ha@gmail.com",
    phone: "0978123456",
    course: "HSK 2",
    progress: 60,
    status: "Active",
  },
  {
    id: 3,
    name: "Phạm Hoàng Nam",
    avatar: "...",
    email: "nam@gmail.com",
    phone: "0968123456",
    course: "HSK 4",
    progress: 40,
    status: "Inactive",
  },
  {
    id: 4,
    name: "Nguyễn Thảo Nguyên",
    avatar: "...",
    email: "nguyen@gmail.com",
    phone: "0958123456",
    course: "HSK 1",
    progress: 85,
    status: "Active",
  },
]);

// FILTER
const filteredStudents = studentList.filter((student) => {
  const matchLevel =
    levelFilter === "all" || student.course === levelFilter;

  const matchStatus =
    statusFilter === "all" || student.status === statusFilter;

  return matchLevel && matchStatus;
});

// PAGINATION
const indexOfLastStudent = currentPage * pageSize;
const indexOfFirstStudent = indexOfLastStudent - pageSize;

const paginatedStudents = filteredStudents.slice(
  indexOfFirstStudent,
  indexOfLastStudent
);

// TOTAL PAGES (phải đặt sau filteredStudents)
const totalPages = Math.ceil(filteredStudents.length / pageSize);
const handleDelete = (id) => {
  const confirmDelete = window.confirm(
    "Bạn có chắc muốn xóa học viên này?"
  );

  if (!confirmDelete) return;

  const updatedList = studentList.filter(
    (student) => student.id !== id
  );

  setStudentList(updatedList);

  // Nếu xóa hết trang cuối thì tự lùi page
  if ((currentPage - 1) * pageSize >= updatedList.length) {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }
};
    return (
        <>
          <div className="flex h-screen overflow-hidden">
             <AdminSidebar />
   <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      {/* Header */}
      <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">
            Quản lý học viên
          </h2>
        </div>

        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm học viên..."
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-6">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
              <span className="material-symbols-outlined">
                notifications
              </span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <span className="material-symbols-outlined">
                settings
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">groups</span>
              </div>

              <span className="text-emerald-500 text-sm font-semibold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                <span className="material-symbols-outlined text-xs">
                  trending_up
                </span>
                +5%
              </span>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Tổng số học viên
            </p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">
              12,450
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Tính từ đầu tháng này
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 bg-accent-yellow/10 rounded-lg flex items-center justify-center text-accent-yellow">
                <span className="material-symbols-outlined">
                  person_add
                </span>
              </div>

              <span className="text-emerald-500 text-sm font-semibold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                <span className="material-symbols-outlined text-xs">
                  trending_up
                </span>
                +12%
              </span>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Học viên mới
            </p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">
              450
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Trong 30 ngày qua
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                <span className="material-symbols-outlined">
                  sensors
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-emerald-500 text-xs font-bold">
                  Trực tuyến
                </span>
              </div>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Đang học tập
            </p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">
              1,200
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Học viên đang online
            </p>
          </div>

        </div>
          {/* Filters & Action Bar */}
      <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">

  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

    <div className="flex items-center gap-3 flex-wrap">

      {/* Level Filter */}
      <select
        value={levelFilter}
        onChange={(e) => {
          setLevelFilter(e.target.value);
          setCurrentPage(1);
        }}
        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm"
      >
        <option value="all">Tất cả trình độ</option>
        <option value="HSK 1">HSK 1</option>
        <option value="HSK 2">HSK 2</option>
        <option value="HSK 3">HSK 3</option>
        <option value="HSK 4">HSK 4</option>
      </select>

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => {
          setStatusFilter(e.target.value);
          setCurrentPage(1);
        }}
        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm"
      >
        <option value="all">Trạng thái: Tất cả</option>
        <option value="Active">Đang hoạt động</option>
        <option value="Inactive">Tạm khóa</option>
      </select>

      {/* Advanced Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors px-2 py-2"
      >
        <span className="material-symbols-outlined text-xl">
          filter_list
        </span>
        <span className="text-sm font-medium">
          Bộ lọc nâng cao
        </span>
      </button>

    </div>

   <Link
  to="/adminAddNewStudent"
  className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold shadow-lg shadow-primary/20 transition-all w-full md:w-auto justify-center"
>
  <span className="material-symbols-outlined">add</span>
  Thêm học viên
</Link>
  </div>

  {/* Advanced Panel */}
  {showAdvanced && (
    <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">

      <input
        type="text"
        placeholder="Tìm theo tên..."
        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm"
      />

      <input
        type="date"
        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm"
      />

      <button
        onClick={() => {
          setLevelFilter("all");
          setStatusFilter("all");
        }}
        className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-lg text-sm font-medium"
      >
        Reset bộ lọc
      </button>

    </div>
  )}
</div>

      {/* Student Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Học viên
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Email/SĐT
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Khóa học tham gia
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Tiến độ học
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                  Hành động
                </th>
              </tr>
            </thead>

           <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
  {paginatedStudents.map((student) => (
    <tr
      key={student.id}
      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
    >
      {/* Student Info */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={student.avatar}
            alt={student.name}
            className="size-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {student.name}
            </p>
            <p className="text-xs text-slate-400">
              ID: TX-{student.id}
            </p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-4">
        <p className="text-sm font-medium">{student.email}</p>
        <p className="text-xs text-slate-400">
          {student.phone}
        </p>
      </td>

      {/* Course */}
      <td className="px-6 py-4">
        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
          {student.course}
        </span>
      </td>

      {/* Progress */}
      <td className="px-6 py-4">
        <div className="w-40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-primary uppercase">
              {student.course}
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              {student.progress}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                student.progress === 100
                  ? "bg-emerald-500"
                  : "bg-primary"
              }`}
              style={{ width: `${student.progress}%` }}
            ></div>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4 text-center">
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full ${
            student.status === "Active"
              ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-slate-100 dark:bg-slate-800 text-slate-500"
          }`}
        >
          {student.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
  <div className="flex items-center justify-end gap-2">

    {/* EDIT */}
    <Link
      to={`/adminEditStudent/${student.id}`}
      className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
    >
      <span className="material-symbols-outlined text-lg">
        edit
      </span>
    </Link>

    {/* DELETE */}
    <button
      onClick={() => handleDelete(student.id)}
      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
    >
      <span className="material-symbols-outlined text-lg">
        delete
      </span>
    </button>

  </div>
</td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      {/* Pagination */}
<div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
  <p className="text-sm text-slate-500">
    Trang{" "}
    <span className="font-bold text-slate-900 dark:text-white">
      {currentPage}
    </span>{" "}
    /{" "}
    <span className="font-bold text-slate-900 dark:text-white">
      {totalPages}
    </span>
  </p>

  <div className="flex items-center gap-2">
    {/* Prev */}
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50"
    >
      <span className="material-symbols-outlined">
        chevron_left
      </span>
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }).map((_, index) => {
      const page = index + 1;
      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`size-9 flex items-center justify-center rounded-lg font-bold text-sm ${
            currentPage === page
              ? "bg-primary text-white"
              : "border border-slate-200 dark:border-slate-700"
          }`}
        >
          {page}
        </button>
      );
    })}

    {/* Next */}
    <button
      onClick={() =>
        setCurrentPage((prev) =>
          Math.min(prev + 1, totalPages)
        )
      }
      disabled={currentPage === totalPages}
      className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50"
    >
      <span className="material-symbols-outlined">
        chevron_right
      </span>
    </button>
  </div>
</div>
      </div>
      </div>
    </main>
        </div>
        </>
    )
};