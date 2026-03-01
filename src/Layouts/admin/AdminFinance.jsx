import React from "react";
import AdminSidebar from "./AdminSidebar";
export default function AdminFinance() {
    return (
        <>
        <div className="flex h-screen overflow-hidden">
    <AdminSidebar />
                   <main className="flex-1 flex flex-col overflow-y-auto relative bg-background-light dark:bg-background-dark motif-cloud">
      
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
        
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            analytics
          </span>
          <h2 className="text-lg font-bold">
            Báo cáo tài chính
          </h2>
        </div>

        <div className="flex items-center gap-4">
          
          {/* Search */}
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm giao dịch..."
              className="pl-10 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64"
            />
          </div>

          {/* Notification */}
          <button className="size-9 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">
              notifications
            </span>
          </button>

          {/* Export */}
          <button className="px-4 py-1.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">
              download
            </span>
            Xuất báo cáo
          </button>

        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-8 space-y-8">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-8xl text-primary">
                cloud
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Tổng doanh thu
            </p>
            <h3 className="text-2xl font-bold mt-2">
              1.250.000.000 ₫
            </h3>

            <div className="flex items-center gap-1 mt-3 text-emerald-600 text-sm font-bold">
              <span className="material-symbols-outlined text-base">
                trending_up
              </span>
              <span>+12.5%</span>
              <span className="text-slate-400 font-normal ml-1">
                tháng này
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-8xl text-accent-yellow">
                verified
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Tổng lợi nhuận
            </p>
            <h3 className="text-2xl font-bold mt-2">
              450.000.000 ₫
            </h3>

            <div className="flex items-center gap-1 mt-3 text-emerald-600 text-sm font-bold">
              <span className="material-symbols-outlined text-base">
                trending_up
              </span>
              <span>+8.2%</span>
              <span className="text-slate-400 font-normal ml-1">
                tháng này
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-8xl text-red-500">
                receipt_long
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Chi phí
            </p>
            <h3 className="text-2xl font-bold mt-2">
              180.000.000 ₫
            </h3>

            <div className="flex items-center gap-1 mt-3 text-red-500 text-sm font-bold">
              <span className="material-symbols-outlined text-base">
                trending_down
              </span>
              <span>-2.4%</span>
              <span className="text-slate-400 font-normal ml-1">
                tháng này
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-8xl text-primary">
                pending_actions
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Thanh toán chờ
            </p>
            <h3 className="text-2xl font-bold mt-2">
              45.000.000 ₫
            </h3>

            <div className="flex items-center gap-1 mt-3 text-emerald-600 text-sm font-bold">
              <span className="material-symbols-outlined text-base">
                trending_up
              </span>
              <span>+5.0%</span>
              <span className="text-slate-400 font-normal ml-1">
                tháng này
              </span>
            </div>
          </div>

        </div>
        {/* Charts Section */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  
  {/* Revenue Chart */}
  <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
    
    <div className="flex items-center justify-between mb-8">
      <div>
        <h4 className="font-bold text-lg">Biểu đồ doanh thu</h4>
        <p className="text-sm text-slate-500">
          Thống kê doanh thu 30 ngày qua
        </p>
      </div>

      <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs font-bold py-1 px-3">
        <option>Tháng này</option>
        <option>Quý này</option>
        <option>Năm nay</option>
      </select>
    </div>

    <div className="h-64 flex flex-col justify-end gap-2 px-2">
      <div className="flex flex-1 items-end gap-4 relative">
        
        {[
          { height: "40%", value: "250M ₫" },
          { height: "65%", value: "380M ₫" },
          { height: "85%", value: "520M ₫", active: true },
          { height: "60%", value: "340M ₫" },
          { height: "45%", value: "280M ₫" },
          { height: "95%", value: "580M ₫" },
          { height: "70%", value: "410M ₫" },
        ].map((bar, index) => (
          <div
            key={index}
            className={`flex-1 rounded-t-lg group relative transition-all
              ${bar.active
                ? "bg-primary hover:shadow-lg shadow-primary/20"
                : "bg-primary/10 hover:bg-primary/30"}`}
            style={{ height: bar.height }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              {bar.value}
            </div>
          </div>
        ))}

      </div>

      <div className="flex justify-around pt-4 border-t border-slate-100 dark:border-slate-800">
        {["Tuần 1","Tuần 2","Tuần 3","Tuần 4","Tuần 5","Tuần 6","Tuần 7"].map((week, i) => (
          <span key={i} className="text-[10px] font-bold text-slate-400 uppercase">
            {week}
          </span>
        ))}
      </div>
    </div>
  </div>

  {/* Category Breakdown */}
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
    
    <h4 className="font-bold text-lg mb-6">Cơ cấu doanh thu</h4>

    <div className="flex flex-col items-center justify-center space-y-8">
      
      <div className="relative size-48">
        <svg className="size-full" viewBox="0 0 36 36">
          
          <path
            className="stroke-slate-100 dark:stroke-slate-800"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="3"
          />

          <path
            className="stroke-primary"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeDasharray="75, 100"
            strokeLinecap="round"
            strokeWidth="3"
          />

          <path
            className="stroke-accent-yellow"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeDasharray="25, 100"
            strokeDashoffset="-75"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">75%</span>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
            Khóa học
          </span>
        </div>
      </div>

      <div className="w-full space-y-4">
        
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-primary"></div>
            <span className="text-sm font-medium">Khóa học Online</span>
          </div>
          <span className="font-bold text-sm">937.5M ₫</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-accent-yellow"></div>
            <span className="text-sm font-medium">Sản phẩm Cửa hàng</span>
          </div>
          <span className="font-bold text-sm">312.5M ₫</span>
        </div>

      </div>
    </div>
  </div>

</div>
{/* Transactions Table */}
<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
  
  {/* Header */}
  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
    <h4 className="font-bold text-lg">Giao dịch gần đây</h4>

    <div className="flex items-center gap-2">
      <button className="text-xs font-bold text-slate-500 hover:text-primary flex items-center gap-1">
        <span className="material-symbols-outlined text-sm">
          filter_list
        </span>
        Lọc
      </button>

      <button className="text-xs font-bold text-primary ml-4">
        Xem tất cả
      </button>
    </div>
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      
      <thead>
        <tr className="bg-slate-50/50 dark:bg-slate-800/50">
          {["Ngày","Mã giao dịch","Sản phẩm/Khóa học","Số tiền","Phương thức","Trạng thái"].map((head, i) => (
            <th
              key={i}
              className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest"
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
        {[
          {
            date: "15/10/2023",
            code: "#TX-10492",
            product: "Khóa học Tiếng Trung Sơ cấp 1",
            amount: "1.250.000 ₫",
            method: "Momo",
            status: "Hoàn thành",
          },
          {
            date: "15/10/2023",
            code: "#TX-10491",
            product: "Bộ Thẻ Học Từ Vựng HSK 3",
            amount: "350.000 ₫",
            method: "Chuyển khoản",
            status: "Đang chờ",
          },
          {
            date: "14/10/2023",
            code: "#TX-10490",
            product: "Khóa học Giao tiếp Văn phòng",
            amount: "2.500.000 ₫",
            method: "Thẻ VISA",
            status: "Hoàn thành",
          },
          {
            date: "14/10/2023",
            code: "#TX-10489",
            product: "Bút lông viết thư pháp Cao cấp",
            amount: "120.000 ₫",
            method: "Momo",
            status: "Đã hủy",
          },
          {
            date: "13/10/2023",
            code: "#TX-10488",
            product: "Combo Luyện thi HSK 4-5",
            amount: "4.500.000 ₫",
            method: "ZaloPay",
            status: "Hoàn thành",
          },
        ].map((tx, index) => {
          
          const statusStyle = {
            "Hoàn thành":
              "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
            "Đang chờ":
              "bg-accent-yellow/20 text-yellow-700 dark:bg-accent-yellow/10 dark:text-accent-yellow",
            "Đã hủy":
              "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
          };

          return (
            <tr
              key={index}
              className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
            >
              <td className="px-6 py-4 text-sm whitespace-nowrap">
                {tx.date}
              </td>

              <td className="px-6 py-4 text-sm font-bold text-primary whitespace-nowrap">
                {tx.code}
              </td>

              <td className="px-6 py-4 text-sm">
                {tx.product}
              </td>

              <td className="px-6 py-4 text-sm font-bold">
                {tx.amount}
              </td>

              <td className="px-6 py-4 text-sm">
                {tx.method}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusStyle[tx.status]}`}
                >
                  {tx.status}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>

    </table>
  </div>
</div>
      </div>
      {/* Footer Decorative */}
<div className="mt-auto py-6 px-8 flex items-center justify-between text-slate-400 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
  
  <p className="text-xs">
    © 2023 TOXI Admin Panel. All rights reserved.
  </p>

  <div className="flex gap-4">
    <span className="material-symbols-outlined text-lg opacity-20">
      cloud
    </span>
    <span className="material-symbols-outlined text-lg opacity-20">
      landscape
    </span>
  </div>

</div>
    </main>
                </div>
        </>
    )
};