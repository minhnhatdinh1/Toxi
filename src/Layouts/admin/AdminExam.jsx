import react from "react";
import AdminSidebar from "./AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
export default function AdminExam() {
// STATE
const [editingExam, setEditingExam] = useState(null);
const navigate = useNavigate();
const [filterStatus, setFilterStatus] = useState("all");
const [stats, setStats] = useState([
  {
    id: 1,
    title: "Tổng số phiếu",
    value: 1280,
    percent: 12.5,
    icon: "description",
    color: "primary",
  },
  {
    id: 2,
    title: "Đang hoạt động",
    value: 856,
    percent: 5.2,
    icon: "task_alt",
    color: "accent-yellow",
  },
  {
    id: 3,
    title: "Lượt nộp bài",
    value: 4520,
    percent: 18.0,
    icon: "send",
    color: "primary",
  },
]);

const [assignments, setAssignments] = useState([]);
const [activities] = useState([
  {
    id: 1,
    name: "Lê Nam",
    initials: "LN",
    task: "Bài tập Hán ngữ 1",
    time: "2 phút trước",
    color: "primary",
  },
  {
    id: 2,
    name: "Hoàng Thảo",
    initials: "HT",
    task: "Luyện viết bộ thủ",
    time: "15 phút trước",
    color: "accent-yellow",
  },
]);

const [currentPage, setCurrentPage] = useState(1);

// LOAD DATA
useEffect(() => {
  const data = JSON.parse(localStorage.getItem("exams")) || [];

  if (data.length === 0) {
    const defaultData = [
      {
        id: "#PBT-102",
        title: "Bài tập Hán ngữ cơ bản 1",
        file: "hangu-1-ex.pdf",
        course: "Sơ cấp A1",
        deadline: "20/10/2023",
        status: "Published",
      },
      {
        id: "#PBT-103",
        title: "Luyện viết chữ Hán bộ thủ",
        file: "bothu-writing.pdf",
        course: "Nhập môn",
        deadline: "22/10/2023",
        status: "Published",
      },
      {
        id: "#PBT-104",
        title: "Ngữ pháp HSK 3 nâng cao",
        file: "hsk3-grammar.docx",
        course: "Trung cấp B1",
        deadline: "25/10/2023",
        status: "Draft",
      },
      {
        id: "#PBT-105",
        title: "Giao tiếp công sở chủ đề 1",
        file: "office-talk-01.pdf",
        course: "Giao tiếp",
        deadline: "28/10/2023",
        status: "Published",
      },
    ];

    setAssignments(defaultData);
  } else {
    setAssignments(data);
  }
}, []);
// FILTER
const filteredAssignments =
  filterStatus === "all"
    ? assignments
    : assignments.filter((item) => item.status === filterStatus);
// PAGINATION
const itemsPerPage = 10;
const totalItems = filteredAssignments.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;

const currentAssignments = filteredAssignments.slice(
  startIndex,
  startIndex + itemsPerPage
);

const startItem = startIndex + 1;
const endItem = Math.min(startIndex + itemsPerPage, totalItems);

// PAGINATION BUTTON
const handlePrev = () => {
  if (currentPage > 1) setCurrentPage(currentPage - 1);
};

const handleNext = () => {
  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
};
// EXPORT CSV
const handleExport = () => {
  const csv = [
    ["ID", "Title", "Course", "Deadline", "Status"],
    ...assignments.map((item) => [
      item.id,
      item.title,
      item.course,
      item.deadline,
      item.status,
    ]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "exam-list.csv";
  link.click();
};

// DELETE
const handleDelete = (id) => {
  const updated = assignments.filter((item) => item.id !== id);
  setAssignments(updated);
  localStorage.setItem("exams", JSON.stringify(updated));
};

    return (
        <>
         <div className="flex h-screen overflow-hidden ">
                            <AdminSidebar />
                            <main className="flex-1 overflow-y-auto">
      {/* Header */}
       <div className="sticky top-0 z-10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between">   
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Quản lý Phiếu bài tập
          </h2>
        </div>

        <div className="flex items-center gap-4">
          
          {/* Search */}
          <div className="relative hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm phiếu..."
              className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary w-64 text-sm"
            />
          </div>

        <Link
  to="/adminNewExam"
  className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
>
  <span className="material-symbols-outlined">
    add_circle
  </span>
  Thêm phiếu mới
</Link>

          {/* Avatar */}
          <div className="size-10 rounded-full border-2 border-primary p-0.5">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTNO_NKbskL6QkV--6zzJ5sUHu9-rmZvLLvBPsPqwwzC_cNKHGvogic4Llhp2o4XMTP2M7K__x6VoQLgCNC6Fi4yqvvuEEg1LKGNmQicmH6QNpK8WjOK1gyT9OyMwn80M40UA7cvfpASR1bZ-8dAiBIH-A2K8nqWFqjssmWtTQOZDxop-tJK952Bk8ogNtpupJ8O2Zasc29Ovd1MJnNLo371YBxv0Wc4EwWq2NOcICW9SGIPP-obLEQQq1uXWocacTk03IuVImkms"
              alt="Admin Profile"
              className="size-full rounded-full object-cover"
            />
          </div>

        </div>
      </div>
       <div className="p-8 space-y-8">
      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4 relative overflow-hidden"
          >
            {/* Background Icon */}
            <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12">
              <span
                className={`material-symbols-outlined text-9xl text-${item.color}`}
              >
                {item.icon}
              </span>
            </div>

            {/* Icon */}
            <div
              className={`size-14 rounded-full bg-${item.color}/10 flex items-center justify-center text-${item.color}`}
            >
              <span className="material-symbols-outlined text-3xl">
                {item.icon}
              </span>
            </div>

            {/* Content */}
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                {item.title}
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {item.value.toLocaleString()}
              </h3>

              <p className="text-emerald-500 text-xs font-bold flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">
                  trending_up
                </span>
                +{item.percent}%
              </p>
            </div>
          </div>
        ))}
      </div>
 <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="space-y-6 xl:col-span-3">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <h3 className="font-bold text-lg">Danh sách phiếu đã tạo</h3>

            <div className="flex gap-2">
              <select
  value={filterStatus}
  onChange={(e) => setFilterStatus(e.target.value)}
  className="text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-1.5 rounded-lg"
>
  <option value="all">Tất cả</option>
  <option value="Published">Published</option>
  <option value="Draft">Draft</option>
</select>

             <button
  onClick={handleExport}
  className="flex items-center gap-1 text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-1.5 rounded-lg"
>
  <span className="material-symbols-outlined text-sm">
    file_download
  </span>
  Xuất file
</button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Tiêu đề phiếu</th>
                  <th className="px-6 py-4">Khóa học</th>
                  <th className="px-6 py-4">Hạn nộp</th>
                  <th className="px-6 py-4 text-center">Trạng thái</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {assignments.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-primary">
                      {item.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs">
                          attach_file
                        </span>
                        {item.file}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[11px] font-bold uppercase">
                        {item.course}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {item.deadline}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === "Published"
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
  <button
  onClick={() => navigate(`/adminEditExam/${item.id}`)}
  className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 transition-colors"
>
  <span className="material-symbols-outlined text-lg">
    edit
  </span>
</button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500 transition-colors"
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
      <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Hiển thị {startItem}-{endItem} trong tổng số {totalItems} phiếu
        </p>

        <div className="flex gap-1">
          {/* Prev */}
          <button
            onClick={handlePrev}
            className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_left
            </span>
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`size-8 flex items-center justify-center rounded-lg text-xs font-bold ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={handleNext}
            className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      {/* Activity Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 mt-8">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-accent-yellow">
            notifications_active
          </span>
          Hoạt động nộp bài mới nhất
        </h3>

        <div className="space-y-4">
          {activities.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`size-10 rounded-full flex items-center justify-center font-bold ${
                    item.color === "primary"
                      ? "bg-primary/20 text-primary"
                      : "bg-accent-yellow/20 text-accent-yellow"
                  }`}
                >
                  {item.initials}
                </div>

                <div>
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-[10px] text-slate-500">
                    Vừa nộp: {item.task}
                  </p>
                </div>
              </div>

              <span className="text-[10px] text-slate-400">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
        </div>
      </div>
    </div>
      
    </div>
    </main>
                            </div>
        </>
    )
};