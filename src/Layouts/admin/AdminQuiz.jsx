import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
export default function AdminQuiz() {
const [currentPage, setCurrentPage] = useState(1);

const handlePageChange = (page) => {
  setCurrentPage(page);
};

const [filterLevel, setFilterLevel] = useState("all");
const [sortType, setSortType] = useState("none");

const [hskStats, setHskStats] = useState([
  {
    level: "HSK Cấp độ 1",
    total: 12,
    icon: "trending_up",
    text: "2 đã thêm trong tháng này",
    color: "text-green-500"
  },
  {
    level: "HSK Cấp độ 2",
    total: 18,
    icon: "horizontal_rule",
    text: "Số lượng ổn định",
    color: "text-text-muted"
  },
  {
    level: "HSK Cấp độ 3",
    total: 24,
    icon: "trending_up",
    text: "5 đã thêm trong tháng này",
    color: "text-green-500"
  },
  {
    level: "HSK Cấp độ 4",
    total: 15,
    icon: "trending_down",
    text: "Cần xem xét",
    color: "text-accent-red"
  },
  {
    level: "HSK Cấp độ 5",
    total: 10,
    icon: "trending_up",
    text: "Tương tác cao",
    color: "text-green-500"
  },
  {
    level: "HSK Cấp độ 6",
    total: "08",
    icon: "new_releases",
    text: "Cấp độ nâng cao",
    color: "text-secondary"
  }
]);

const quizzes = [
  { title: "Bài luyện tập từ vựng hàng ngày bộ 1", level: "HSK 1", duration: "15 phút", questions: 20 },
  { title: "Luyện nghe hiểu trung cấp", level: "HSK 3", duration: "45 phút", questions: 35 },
  { title: "Đề thi thử HSK 6 cuối khóa", level: "HSK 6", duration: "120 phút", questions: 100 },
  { title: "Trọng tâm ngữ pháp Le", level: "HSK 2", duration: "20 phút", questions: 15 },
  { title: "Đề luyện tập HSK 4", level: "HSK 4", duration: "30 phút", questions: 40 },
  { title: "Đề luyện tập HSK 5", level: "HSK 5", duration: "40 phút", questions: 50 }
];

const itemsPerPage = 4;

//
// FILTER
//
const filteredQuizzes =
  filterLevel === "all"
    ? quizzes
    : quizzes.filter((quiz) => quiz.level === filterLevel);

//
// SORT
//
const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
  if (sortType === "asc") return a.questions - b.questions;
  if (sortType === "desc") return b.questions - a.questions;
  return 0;
});

//
// PAGINATION
//
const totalPages = Math.ceil(sortedQuizzes.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;

const currentQuizzes = sortedQuizzes.slice(
  startIndex,
  startIndex + itemsPerPage
);


    return (
        <>
   <div class="flex h-screen overflow-hidden">
            <AdminSidebar />
                {/* Main Content */}

<main className=" flex-1 flex flex-col min-h-screen overflow-y-auto bg-slate-100 dark:bg-slate-900">

  {/* Header */}

  <header className="h-20 bg-white dark:bg-brand-blue/50 border-b border-slate-200 dark:border-brand-gold/20 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md">

    {/* Search */}

    <div className="flex items-center gap-4 flex-1 max-w-xl">

      <div className="relative w-full">

        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>

        <input
          className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-brand-gold text-sm"
          placeholder="Tìm kiếm đề thi, cấp độ HSK hoặc từ khóa..."
          type="text"
        />

      </div>

    </div>


    {/* Right Actions */}

    <div className="flex items-center gap-4">

      <Link
  to="/adminaddnewquiz"
  className="flex items-center gap-2 bg-primary hover:bg-accent-yellow text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md"
>
  <span className="material-symbols-outlined text-lg">
    add_circle
  </span>

  Thêm đề thi mới
</Link>


      <div className="h-8 w-px bg-slate-200 dark:bg-brand-gold/20 mx-2"></div>


      {/* Notification */}

      <button className="size-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">

        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
          notifications
        </span>

      </button>


    </div>

  </header>
{/* Content Area */}

<div className="p-8 space-y-8">

  {/* Hero Stats Section */}

  <section>

    <div className="flex flex-col gap-2 mb-6">

      <h2 className="text-3xl font-extrabold tracking-tight text-text-main">
        Tổng quan ngân hàng đề thi
      </h2>

      <p className="text-text-muted">
        Quản lý và giám sát các bộ đề đánh giá năng lực HSK ở mọi cấp độ.
      </p>

    </div>


   <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">

  {hskStats.map((item, index) => (

    <div
      key={index}
      className="bg-white p-5 rounded-2xl border-b-4 border-secondary shadow-sm hover:shadow-md transition-shadow"
    >

      <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">
        {item.level}
      </p>

      <h3 className="text-2xl font-black text-text-main">
        {item.total}
      </h3>

      <p className="text-[10px] text-text-muted mt-2 flex items-center gap-1">

        <span className={`material-symbols-outlined text-[12px] ${item.color}`}>
          {item.icon}
        </span>

        {item.text}

      </p>

    </div>

  ))}

</div>
  </section>
{/* Quiz List Table */}
<section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-brand-gold/10 overflow-hidden">

  {/* Table Header */}
  <div className="px-6 py-5 border-b border-slate-200 dark:border-brand-gold/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">

    <h3 className="text-lg font-bold">
      Danh sách đề thi đã tạo
    </h3>

    <div className="flex gap-2">

      <button  onClick={() =>
    setFilterLevel(filterLevel === "HSK 1" ? "all" : "HSK 1")
  }
  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
>
        <span className="material-symbols-outlined text-slate-500">
          filter_list
        </span>
      </button>

      <button  onClick={() =>
    setSortType(sortType === "asc" ? "desc" : "asc")
  }
  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
>
        <span className="material-symbols-outlined text-slate-500">
          sort
        </span>
      </button>

    </div>
  </div>


  {/* Table */}
  <div className="overflow-x-auto">

    <table className="w-full text-left">

      {/* Table Head */}
      <thead>
        <tr className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-transparent">

          <th className="px-6 py-4 font-semibold">Tiêu đề</th>
          <th className="px-6 py-4 font-semibold">Cấp độ</th>
          <th className="px-6 py-4 font-semibold text-center">Thời lượng</th>
          <th className="px-6 py-4 font-semibold text-center">Số câu hỏi</th>
          <th className="px-6 py-4 font-semibold">Trạng thái</th>
          <th className="px-6 py-4 font-semibold text-right">Thao tác</th>

        </tr>
      </thead>


      {/* Table Body */}
     <tbody className="divide-y divide-slate-100">

{currentQuizzes.map((quiz, index) => (

<tr key={index} className="hover:bg-slate-50 transition-colors">

<td className="px-6 py-4 font-bold">
  {quiz.title}
</td>

<td className="px-6 py-4">
  <span className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs font-bold rounded-full">
    {quiz.level}
  </span>
</td>

<td className="px-6 py-4 text-center">
  {quiz.duration}
</td>

<td className="px-6 py-4 text-center">
  {quiz.questions}
</td>

<td className="px-6 py-4">
  Đang hoạt động
</td>

<td className="px-6 py-4 text-right">
  <div className="flex justify-end gap-2">
     <Link
    to="/adminviewquiz"
    className="p-1.5 text-slate-400 hover:text-brand-gold transition-colors"
  >
    <span className="material-symbols-outlined">
      edit
    </span>
  </Link>

  <Link
    to="/adminviewquiz"
    className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors"
  >
    <span className="material-symbols-outlined">
      visibility
    </span>
  </Link>
    <div className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors">
    <span className="material-symbols-outlined">delete</span>
    </div>
  </div>
</td>

</tr>

))}

</tbody>

    </table>

  </div>
  {/*pagination*/}
<div className="px-6 py-4 border-t border-slate-100 dark:border-brand-gold/5 flex items-center justify-between">

  <p className="text-xs text-slate-400 font-medium">
    Trang {currentPage} / {totalPages}
  </p>

  <div className="flex gap-2">

    {/* Previous */}
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-3 py-1 border border-slate-200 dark:border-brand-gold/20 rounded text-xs font-bold hover:bg-slate-50 transition-colors disabled:opacity-40"
    >
      Prev
    </button>

    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, index) => {
      const page = index + 1;

      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 border rounded text-xs font-bold transition-colors
            ${currentPage === page
              ? "bg-primary text-white border-primary"
              : "border-slate-200 dark:border-brand-gold/20 hover:bg-slate-50"}
          `}
        >
          {page}
        </button>
      );
    })}

    {/* Next */}
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-3 py-1 border border-slate-200 dark:border-brand-gold/20 rounded text-xs font-bold hover:bg-slate-50 transition-colors disabled:opacity-40"
    >
      Next
    </button>

  </div>

</div>
</section>
</div>
</main>
                </div>
        </>
    )
};