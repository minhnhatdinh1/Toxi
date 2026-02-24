import react from "react";
import AdminSidebar from "./AdminSidebar";
export default function AdminPage() {
    return (
    <>
        <div class="flex h-screen overflow-hidden">
          <AdminSidebar />
<main className="flex-1 flex flex-col overflow-y-auto bg-slate-50 dark:bg-background-dark">
  
  {/* Header */}
  <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-10">
    
    <div className="flex items-center gap-4 flex-1">
      <div className="relative w-full max-w-md group">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
          search
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm học viên, đơn hàng, khóa học..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/20 text-sm transition-all"
        />
      </div>
    </div>

    <div className="flex items-center gap-6">

      {/* Language Switch */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
        <span className="material-symbols-outlined text-primary text-xl">
          language
        </span>
        <span className="text-xs font-semibold">VI / 中</span>
      </div>

      {/* Notifications */}
      <div className="relative cursor-pointer group">
        <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
          notifications
        </span>
        <span className="absolute -top-1 -right-1 size-4 bg-red-500 text-[10px] text-white flex items-center justify-center rounded-full font-bold border-2 border-white dark:border-slate-900">
          4
        </span>
      </div>

      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>

      {/* User */}
      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="text-right">
          <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
            Minh TOXI
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Super Admin
          </p>
        </div>
        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
          expand_more
        </span>
      </div>

    </div>
  </header>

  {/* Dashboard Content */}
  <div className="flex-1 overflow-y-auto p-8">

    {/* Title */}
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Tổng quan hệ thống
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Chào mừng trở lại! Hôm nay hệ thống có 152 lượt truy cập mới.
        </p>
      </div>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
          <span className="material-symbols-outlined text-sm">
            calendar_month
          </span>
          7 ngày qua
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
          <span className="material-symbols-outlined text-sm">
            download
          </span>
          Xuất báo cáo
        </button>
      </div>
    </div>

    {/* KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      {/* Revenue */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-9xl text-primary">
            cloud
          </span>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <span className="material-symbols-outlined">
              monetization_on
            </span>
          </div>

          <span className="text-green-500 text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">
              trending_up
            </span>
            +12.5%
          </span>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
          Tổng doanh thu
        </p>

        <h3 className="text-3xl font-bold text-accent-yellow drop-shadow-sm">
          $125,400
        </h3>
      </div>

      {/* New Students */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <span className="material-symbols-outlined">
              person_add
            </span>
          </div>

          <span className="text-red-500 text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">
              trending_down
            </span>
            -2.1%
          </span>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
          Học viên mới
        </p>

        <h3 className="text-3xl font-bold text-accent-yellow">
          1,240
        </h3>
      </div>

      {/* Courses Sold */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
            <span className="material-symbols-outlined">
              auto_stories
            </span>
          </div>

          <span className="text-green-500 text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">
              trending_up
            </span>
            +5.4%
          </span>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
          Khóa học đã bán
        </p>

        <h3 className="text-3xl font-bold text-accent-yellow">
          856
        </h3>
      </div>

      {/* Completion Rate */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            <span className="material-symbols-outlined">
              checklist
            </span>
          </div>

          <span className="text-green-500 text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">
              trending_up
            </span>
            +0.8%
          </span>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
          Hoàn thành bài học
        </p>

        <h3 className="text-3xl font-bold text-accent-yellow">
          78.2%
        </h3>
      </div>

    </div>
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
  
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        Tăng trưởng học viên & Doanh thu
      </h3>
      <p className="text-slate-500 text-xs">
        Dữ liệu thống kê trong 6 tháng gần nhất
      </p>
    </div>

    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-primary"></div>
        <span className="text-xs text-slate-600 dark:text-slate-400">
          Doanh thu
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-accent-yellow"></div>
        <span className="text-xs text-slate-600 dark:text-slate-400">
          Học viên
        </span>
      </div>
    </div>
  </div>

  {/* Fake Chart */}
  <div className="h-72 w-full flex items-end gap-1 px-4">

    {/* Month 1 */}
    <div className="flex-1 flex flex-col items-center group">
      <div className="w-full flex justify-center gap-1">
        <div
          className="w-4 bg-primary rounded-t group-hover:brightness-110 transition-all"
          style={{ height: "120px" }}
        ></div>
        <div
          className="w-4 bg-accent-yellow rounded-t group-hover:brightness-110 transition-all"
          style={{ height: "80px" }}
        ></div>
      </div>
      <span className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        Tháng 1
      </span>
    </div>

    {/* Month 2 */}
    <div className="flex-1 flex flex-col items-center group">
      <div className="w-full flex justify-center gap-1">
        <div
          className="w-4 bg-primary rounded-t group-hover:brightness-110 transition-all"
          style={{ height: "140px" }}
        ></div>
        <div
          className="w-4 bg-accent-yellow rounded-t group-hover:brightness-110 transition-all"
          style={{ height: "110px" }}
        ></div>
      </div>
      <span className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        Tháng 2
      </span>
    </div>

    {/* Month 3 */}
    <div className="flex-1 flex flex-col items-center group">
      <div className="w-full flex justify-center gap-1">
        <div
          className="w-4 bg-primary rounded-t group-hover:brightness-110 transition-all"
          style={{ height: "180px" }}
        ></div>
        <div
          className="w-4 bg-accent-yellow rounded-t group-hover:brightness-110 transition-all"
          style={{ height: "150px" }}
        ></div>
      </div>
      <span className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        Tháng 3
      </span>
    </div>

    {/* Month 4 */}
    <div className="flex-1 flex flex-col items-center group">
      <div className="w-full flex justify-center gap-1">
        <div
          className="w-4 bg-primary rounded-t group-hover:brightness-110 transition-all"
          style={{ height: "220px" }}
        ></div>
        <div
          className="w-4 bg-accent-yellow rounded-t group-hover:brightness-110 transition-all"
          style={{ height: "190px" }}
        ></div>
      </div>
      <span className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        Tháng 4
      </span>
    </div>

    {/* Month 5 */}
    <div className="flex-1 flex flex-col items-center group">
      <div className="w-full flex justify-center gap-1">
        <div
          className="w-4 bg-primary rounded-t group-hover:brightness-110 transition-all"
          style={{ height: "190px" }}
        ></div>
        <div
          className="w-4 bg-accent-yellow rounded-t group-hover:brightness-110 transition-all"
          style={{ height: "160px" }}
        ></div>
      </div>
      <span className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        Tháng 5
      </span>
    </div>

    {/* Month 6 */}
    <div className="flex-1 flex flex-col items-center group">
      <div className="w-full flex justify-center gap-1">
        <div
          className="w-4 bg-primary rounded-t group-hover:brightness-110 transition-all"
          style={{ height: "240px" }}
        ></div>
        <div
          className="w-4 bg-accent-yellow rounded-t group-hover:brightness-110 transition-all"
          style={{ height: "210px" }}
        ></div>
      </div>
      <span className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        Tháng 6
      </span>
    </div>

  </div>
</div>
{/* Tables Grid */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

  {/* Latest Orders */}
  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
    
    <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
      <h3 className="font-bold text-slate-900 dark:text-white">
        Đơn hàng mới nhất
      </h3>
      <button className="text-primary text-xs font-bold hover:underline">
        Xem tất cả
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        
        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4">Mã đơn</th>
            <th className="px-6 py-4">Học viên</th>
            <th className="px-6 py-4">Sản phẩm</th>
            <th className="px-6 py-4">Số tiền</th>
            <th className="px-6 py-4">Trạng thái</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
            <td className="px-6 py-4 font-mono text-xs">#TX9823</td>
            <td className="px-6 py-4 font-medium">Nguyễn An</td>
            <td className="px-6 py-4 text-slate-500">HSK 4 Online</td>
            <td className="px-6 py-4 font-bold text-primary">$45.00</td>
            <td className="px-6 py-4">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">
                Đã xử lý
              </span>
            </td>
          </tr>

          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
            <td className="px-6 py-4 font-mono text-xs">#TX9824</td>
            <td className="px-6 py-4 font-medium">Trần Bích</td>
            <td className="px-6 py-4 text-slate-500">Sách Từ vựng HSK</td>
            <td className="px-6 py-4 font-bold text-primary">$12.50</td>
            <td className="px-6 py-4">
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold uppercase">
                Đang chờ
              </span>
            </td>
          </tr>

          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
            <td className="px-6 py-4 font-mono text-xs">#TX9825</td>
            <td className="px-6 py-4 font-medium">Lê Nam</td>
            <td className="px-6 py-4 text-slate-500">Combo Tiếng Trung</td>
            <td className="px-6 py-4 font-bold text-primary">$89.00</td>
            <td className="px-6 py-4">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">
                Đã xử lý
              </span>
            </td>
          </tr>

          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
            <td className="px-6 py-4 font-mono text-xs">#TX9826</td>
            <td className="px-6 py-4 font-medium">Vũ Hà</td>
            <td className="px-6 py-4 text-slate-500">HSK 5 Nâng cao</td>
            <td className="px-6 py-4 font-bold text-primary">$55.00</td>
            <td className="px-6 py-4">
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-[10px] font-bold uppercase">
                Đã hủy
              </span>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
   <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-slate-900 dark:text-white">
          Học viên vừa đăng ký
        </h3>
        <button className="text-primary text-xs font-bold hover:underline">
          Xem tất cả
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">

        {/* Item 1 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full overflow-hidden bg-slate-100">
              <img
                className="w-full h-full object-cover"
                alt="Thùy Dương"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3iLrO6FaIO-QSnYx8RIfEFe6SZA55lg8H8aC1n45gekPu9oTCD9mqGTbdPVX5vZZoNZ_BAg72vHiqETG5RXD-JoRkvNcOrMpsJVGpELt3u8W9rN2jA-H8yFpWc0UagU8DHX5oFInr4c0Nh16F8EHCY_3zfkcD7F_pQSmYw-qvpuK_K-2hUjUJZnrLiVMUB4LxK4sr46FLgQtEMhy8-LXtAH4qFFXEd2KgTApu2mhZ3gT-SBniMgfJc6c8rT3W-lJprmFA73pTK7o"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Thùy Dương
              </p>
              <p className="text-[10px] text-slate-500">
                Khóa học HSK 1 - 2 giờ trước
              </p>
            </div>
          </div>
          <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">
              more_vert
            </span>
          </button>
        </div>

        {/* Item 2 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full overflow-hidden bg-slate-100">
              <img
                className="w-full h-full object-cover"
                alt="Hoàng Minh"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8J3zL1tgAu7v7KeMIRzdSEx3Wsv1vlxSMDkjIoFUFVv0vgqe4irfBBnPcFnXmVQ9LYJFDza-4aL4coe7lRKb16suuzwwyzqQE1kEtwetG3GLCUKuAFNSUeWutA6Gub5rSntI_GTIkL3DB3HgvDjqjrRowK9DvMX1z3mnKaC4PeeliDWAVEXn5r1FbJoHnz1AwWKwCeylbrwQqpzc2cO8RSk4rNIWCmyvNbbJ83C-PAQMT8knZk5o_1TtpzG3eln_sv3T5_YcLqXo"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Hoàng Minh
              </p>
              <p className="text-[10px] text-slate-500">
                Khóa học HSK 3 - 5 giờ trước
              </p>
            </div>
          </div>
          <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">
              more_vert
            </span>
          </button>
        </div>

        {/* Item 3 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full overflow-hidden bg-slate-100">
              <img
                className="w-full h-full object-cover"
                alt="Lan Khuê"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2EDScMJLu96h43fCSGQAabwf-GGG6vGwq0KiS8uu3iftWpa9V6MgfIPf01tRYhIexQfiEL9vONdVV8UFUFED7wTNH5cjieMK92wKwzB6sM2MEWnA094bahhnNjGfc-zFRVGVyLEa3WNkp0WYQjTnit-w4MxCsvXBbunIQr0prqBGPnWR6WcTfOyrhtAefapEyOf1tJKMgGolkkUbcsqhWvBId3g2C8mCdKFUJ-Y2V4wSfG_jH7estpx1ZaXBSX65dmEm9fQ-WNvc"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Lan Khuê
              </p>
              <p className="text-[10px] text-slate-500">
                Khóa học Giao tiếp - 8 giờ trước
              </p>
            </div>
          </div>
          <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">
              more_vert
            </span>
          </button>
        </div>

        {/* Item 4 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full overflow-hidden bg-slate-100">
              <img
                className="w-full h-full object-cover"
                alt="Thành Vinh"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASHc530IcU5o4s3hb7TaWQVHj_eFbJJ1qN2-2M9NjmQ4euwInhkq7z8EccLZI7GPB1b6v_Gm7Z9XJ07ZQsOXGFiv8EWd_A8hAgdhi11xCc56xKwUV8Zl9_tU39WfIMSokrclwn31JPx2UcIVL0HjU1ZLc0bCYMsKbsBY0PvW5Zi-ZLPF2rdKpAQLSg2Vw6OXb72jY9au4ZeXKdZztTwwycMJ5SI-SXUliI8tOPPbR8X03ocBQsPbGWR77O5H70hsomRFTI0LurP8Q"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Thành Vinh
              </p>
              <p className="text-[10px] text-slate-500">
                HSK 6 Cấp tốc - 12 giờ trước
              </p>
            </div>
          </div>
          <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">
              more_vert
            </span>
          </button>
        </div>

      </div>
    </div>

</div>
  </div>
</main>
<aside className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 hidden xl:flex flex-col">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-slate-900 dark:text-white">
          Hoạt động hệ thống
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 overflow-y-auto">

        <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-slate-200 dark:before:bg-slate-800">

          {/* Activity 1 */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-1.5 size-[22px] bg-primary rounded-full border-4 border-white dark:border-slate-900 z-10"></div>
            <p className="text-xs text-slate-500 mb-1">10:45 AM - Hôm nay</p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Khóa học{" "}
              <span className="text-primary font-bold">
                HSK 4 Online
              </span>{" "}
              đã được cập nhật nội dung bài tập mới.
            </p>
          </div>

          {/* Activity 2 */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-1.5 size-[22px] bg-accent-yellow rounded-full border-4 border-white dark:border-slate-900 z-10"></div>
            <p className="text-xs text-slate-500 mb-1">
              09:12 AM - Hôm nay
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Học viên <span className="font-bold">Hữu Nghĩa</span> đã hoàn
              thành bài thi thử HSK 3 đạt 280/300.
            </p>
          </div>

          {/* Activity 3 */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-1.5 size-[22px] bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 z-10"></div>
            <p className="text-xs text-slate-500 mb-1">Hôm qua</p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Hệ thống đã tự động gửi báo cáo doanh thu tuần cho Admin.
            </p>
          </div>

          {/* Activity 4 */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-1.5 size-[22px] bg-primary rounded-full border-4 border-white dark:border-slate-900 z-10"></div>
            <p className="text-xs text-slate-500 mb-1">Hôm qua</p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Thêm mới 12 bài viết Blog về chủ đề "Văn hóa Trung Hoa".
            </p>
          </div>

        </div>

        {/* AI Suggestion */}
        <div className="mt-12 bg-primary/5 rounded-xl p-6 border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
            <span className="material-symbols-outlined text-6xl text-primary">
              auto_graph
            </span>
          </div>
          <h4 className="font-bold text-primary text-sm mb-2">
            Lời khuyên AI
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Dựa trên dữ liệu 7 ngày qua, lượng người dùng quan tâm đến{" "}
            <b>Khóa học Giao tiếp</b> đang tăng 15%. Bạn nên xem xét chạy
            chiến dịch khuyến mãi cho khóa học này.
          </p>
        </div>

      </div>
    </aside>
        </div>
    </>
    )
};
