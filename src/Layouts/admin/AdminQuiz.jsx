
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
export default function AdminQuiz() {
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
    return (
        <>
   <div class="flex h-screen overflow-hidden">
            <AdminSidebar />
                {/* Main Content */}

<main className=" flex-1 flex flex-col min-h-screen overflow-y-auto bg-slate-100 dark:bg-slate-900">


        <div className="flex items-center gap-3">
          {/* Add Exam Button */}

          <Link to="/adminAddNewQuiz">

            <button className="size-8 flex items-center justify-center rounded-lg bg-accent-yellow text-primary text-xs font-bold shadow-lg shadow-yellow-500/20">
              <span className="material-symbols-outlined text-xl">add</span>
            </button>
          </Link>
</div>

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

      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
        <span className="material-symbols-outlined text-slate-500">
          filter_list
        </span>
      </button>

      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
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
      <tbody className="divide-y divide-slate-100 dark:divide-brand-gold/5">

        {/* Row 1 */}
        <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">

          <td className="px-6 py-4">

            <div className="flex flex-col">

              <span className="font-bold text-slate-900 dark:text-slate-100">
                Bài luyện tập từ vựng hàng ngày bộ 1
              </span>

              <span className="text-xs text-slate-400">
                Ngày tạo: 12/10/2023
              </span>

            </div>

          </td>


          <td className="px-6 py-4">

            <span className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs font-bold rounded-full">
              HSK 1
            </span>

          </td>


          <td className="px-6 py-4 text-center text-sm font-medium">
            15 phút
          </td>


          <td className="px-6 py-4 text-center text-sm font-medium">
            20
          </td>


          <td className="px-6 py-4">

            <span className="flex items-center gap-1.5 text-green-500 text-xs font-bold">

              <span className="size-2 rounded-full bg-green-500"></span>

              Đang hoạt động

            </span>

          </td>


          <td className="px-6 py-4 text-right">

            <div className="flex items-center justify-end gap-2">

            {/* Edit */}
  <Link
    to="/adminviewquiz"
    className="p-1.5 text-slate-400 hover:text-brand-gold transition-colors"
    title="Chỉnh sửa"
  >
    <span className="material-symbols-outlined text-[20px]">
      edit
    </span>
  </Link>

  {/* Preview */}
  <Link
    to="/adminviewquiz"
    className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors"
    title="Xem trước"
  >
    <span className="material-symbols-outlined text-[20px]">
      visibility
    </span>
  </Link>

  {/* Delete */}
  <Link
    to="/admindeletequiz"
    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
    title="Xóa"
  >
    <span className="material-symbols-outlined text-[20px]">
      delete
    </span>
  </Link>


            </div>

          </td>

        </tr>
{/* Row 2 */}
<tr className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
  <td className="px-6 py-4">
    <div className="flex flex-col">
      <span className="font-bold text-slate-900 dark:text-slate-100">
        Luyện nghe hiểu trung cấp
      </span>
      <span className="text-xs text-slate-400">
        Ngày tạo: 08/10/2023
      </span>
    </div>
  </td>

  <td className="px-6 py-4">
    <span className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs font-bold rounded-full">
      HSK 3
    </span>
  </td>

  <td className="px-6 py-4 text-center text-sm font-medium">
    45 phút
  </td>

  <td className="px-6 py-4 text-center text-sm font-medium">
    35
  </td>

  <td className="px-6 py-4">
    <span className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
      <span className="size-2 rounded-full bg-slate-300"></span>
      Bản nháp
    </span>
  </td>

  <td className="px-6 py-4 text-right">
    <div className="flex items-center justify-end gap-2">
      <button className="p-1.5 text-slate-400 hover:text-brand-gold transition-colors">
        <span className="material-symbols-outlined text-[20px]">edit</span>
      </button>

      <button className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors">
        <span className="material-symbols-outlined text-[20px]">visibility</span>
      </button>

      <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
        <span className="material-symbols-outlined text-[20px]">delete</span>
      </button>
    </div>
  </td>
</tr>

{/* Row 3 */}
<tr className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
  <td className="px-6 py-4">
    <div className="flex flex-col">
      <span className="font-bold text-slate-900 dark:text-slate-100">
        Đề thi thử HSK 6 cuối khóa
      </span>
      <span className="text-xs text-slate-400">
        Ngày tạo: 29/09/2023
      </span>
    </div>
  </td>

  <td className="px-6 py-4">
    <span className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs font-bold rounded-full">
      HSK 6
    </span>
  </td>

  <td className="px-6 py-4 text-center text-sm font-medium">
    120 phút
  </td>

  <td className="px-6 py-4 text-center text-sm font-medium">
    100
  </td>

  <td className="px-6 py-4">
    <span className="flex items-center gap-1.5 text-green-500 text-xs font-bold">
      <span className="size-2 rounded-full bg-green-500"></span>
      Đang hoạt động
    </span>
  </td>

  <td className="px-6 py-4 text-right">
    <div className="flex items-center justify-end gap-2">
      <button className="p-1.5 text-slate-400 hover:text-brand-gold transition-colors">
        <span className="material-symbols-outlined text-[20px]">edit</span>
      </button>

      <button className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors">
        <span className="material-symbols-outlined text-[20px]">visibility</span>
      </button>

      <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
        <span className="material-symbols-outlined text-[20px]">delete</span>
      </button>
    </div>
  </td>
</tr>

{/* Row 4 */}
<tr className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
  <td className="px-6 py-4">
    <div className="flex flex-col">
      <span className="font-bold text-slate-900 dark:text-slate-100">
        Trọng tâm ngữ pháp: Trợ từ "Le"
      </span>
      <span className="text-xs text-slate-400">
        Ngày tạo: 15/09/2023
      </span>
    </div>
  </td>

  <td className="px-6 py-4">
    <span className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs font-bold rounded-full">
      HSK 2
    </span>
  </td>

  <td className="px-6 py-4 text-center text-sm font-medium">
    20 phút
  </td>

  <td className="px-6 py-4 text-center text-sm font-medium">
    15
  </td>

  <td className="px-6 py-4">
    <span className="flex items-center gap-1.5 text-green-500 text-xs font-bold">
      <span className="size-2 rounded-full bg-green-500"></span>
      Đang hoạt động
    </span>
  </td>

  <td className="px-6 py-4 text-right">
    <div className="flex items-center justify-end gap-2">
      <button className="p-1.5 text-slate-400 hover:text-brand-gold transition-colors">
        <span className="material-symbols-outlined text-[20px]">edit</span>
      </button>

      <button className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors">
        <span className="material-symbols-outlined text-[20px]">visibility</span>
      </button>

      <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
        <span className="material-symbols-outlined text-[20px]">delete</span>
      </button>
    </div>
  </td>
</tr>
      </tbody>

    </table>

  </div>
<div className="px-6 py-4 border-t border-slate-100 dark:border-brand-gold/5 flex items-center justify-between">

  <p className="text-xs text-slate-400 font-medium">
    Hiển thị 4 trong tổng số 67 đề thi
  </p>

  <div className="flex gap-2">

    <button className="px-3 py-1 border border-slate-200 dark:border-brand-gold/20 rounded text-xs font-bold hover:bg-slate-50 transition-colors">
      1
    </button>

    <button className="px-3 py-1 border border-slate-200 dark:border-brand-gold/20 rounded text-xs font-bold hover:bg-slate-50 transition-colors">
      2
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