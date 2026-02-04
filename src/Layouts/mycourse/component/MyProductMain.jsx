import react from 'react';
import { Link } from "react-router-dom";
import logo from '../../../assets/image/LOGO (1).png'
export default function MyProductMain () {
    return (
        <>
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-chinese-pattern overflow-x-hidden">
      {/* Header */}
       <div className="w-full bg-white dark:bg-surface-dark shadow-sm z-50 sticky top-0">
       <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">
        {/* LOGO */}
        <Link to="/Home" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none">
              TOXI
            </h1>
            <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">
              学以致用
            </p>
          </div>
        </Link>

        {/* SEARCH */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative group">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, giáo trình, dụng cụ..."
              className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm focus:ring-2 focus:ring-secondary focus:bg-white focus:text-primary transition-all placeholder-white/60"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">
              search
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <button className="text-slate-500 hover:text-primary p-2">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">Minh Anh</p>
              <p className="text-xs text-slate-500">Học viên</p>
            </div>
          </div>

          {/* MOBILE MENU */}
          <button className="md:hidden text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
         </div>
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

            {/* USER INFO */}
            <div className="p-6 flex flex-col items-center border-b border-slate-100 bg-slate-50/50">
              <div
                className="size-20 rounded-full bg-cover bg-center border-4 border-white shadow-sm mb-3"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBS4KmE-KnFDiuv5uEZR4LtOQuLhDjl-W3CTFLaG8se8TWt4sdw5n5Xc07v-B7sCeq1ERCYThWqnT-Uf4qyqFNd-3P0EYAjVAS0C5x1FNaYc2h-gE4Kk6qj57s4kEXwXFRXsfYextZMgekB2o-BhP2eaLEzyK8EQEsmQ7vJwtWbWULRLkmoANB7UDOf7D5B44pvVwQkjhfj4N3ids9Dbu0ckeeApIzVUTdocFne3sJwj9dwRxqsDqnQEYjGsR5q989IvRW3hwdnRtc")',
                }}
              />
              <h3 className="font-bold text-slate-900 text-lg">Minh Anh</h3>
              <p className="text-slate-500 text-sm">Học viên VIP</p>
            </div>

            {/* NAV */}
            <nav className="p-3 space-y-1">
              <Link
                to="/MyCourse"
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-xl transition-colors group"
              >
                <span className="material-symbols-outlined text-[22px] text-slate-400 group-hover:text-primary transition-colors">
                  school
                </span>
                Khóa học của tôi
              </Link>

              <Link
                to="/Profile"
                className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary font-bold rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">
                  person
                </span>
                Thông tin cá nhân
              </Link>

              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-xl transition-colors group"
              >
                <span className="material-symbols-outlined text-[22px] text-slate-400 group-hover:text-primary transition-colors">
                  bookmarks
                </span>
                Từ vựng đã lưu
              </a>

              <Link
                to="/MyProduct"
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-xl transition-colors group"
              >
                <span className="material-symbols-outlined text-[22px] text-slate-400 group-hover:text-primary transition-colors">
                  receipt_long
                </span>
                Lịch sử đơn hàng
              </Link>
            </nav>

            {/* LOGOUT */}
            <div className="p-3 border-t border-slate-100 mt-2">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 font-medium rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">
                  logout
                </span>
                Đăng xuất
              </a>
            </div>
          </div>

          {/* VIP CARD */}
          <div className="mt-6 bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
            <div className="absolute -right-4 -top-4 text-white/10">
              <span className="material-symbols-outlined text-9xl">
                temple_buddhist
              </span>
            </div>

            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-1">Nâng cấp VIP</h4>
              <p className="text-white/80 text-sm mb-4">
                Mở khóa toàn bộ tài liệu và video bài giảng độc quyền.
              </p>
              <button className="bg-accent hover:bg-amber-500 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-sm transition-colors w-full">
                Xem chi tiết
              </button>
            </div>
          </div>
        </aside>
         <div className="lg:col-span-9 flex flex-col gap-6">

      {/* HEADER */}
      <div>
        <span className="text-primary font-bold tracking-wider text-xs uppercase mb-1 block">
          Học để ứng dụng - 学以致用
        </span>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Lịch sử đơn hàng
        </h2>
        <p className="text-slate-500 mt-1 text-sm md:text-base">
          Theo dõi và quản lý các giao dịch khóa học và tài liệu của bạn.
        </p>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="absolute inset-0 bg-cloud-pattern pointer-events-none opacity-50"></div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary">
                <th className="table-header-cell rounded-tl-2xl">Mã đơn hàng</th>
                <th className="table-header-cell">Ngày đặt</th>
                <th className="table-header-cell">Sản phẩm</th>
                <th className="table-header-cell">Tổng tiền</th>
                <th className="table-header-cell">Trạng thái</th>
                <th className="table-header-cell rounded-tr-2xl">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {/* ROW */}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="table-body-cell font-bold text-primary">#ORD-99281</td>
                <td className="table-body-cell text-slate-500">24/05/2024</td>
                <td className="table-body-cell">
                  <div className="flex flex-col">
                    <span className="font-bold">Hán ngữ Sơ cấp 1 (HSK 1)</span>
                    <span className="text-xs text-slate-400 italic">Khóa học trực tuyến</span>
                  </div>
                </td>
                <td className="table-body-cell font-bold text-slate-900">850.000đ</td>
                <td className="table-body-cell">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                    <span className="size-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                    Đã thanh toán
                  </span>
                </td>
                <td className="table-body-cell">
                  <button className="text-primary hover:text-primary-dark font-bold text-xs flex items-center gap-1">
                    Xem chi tiết
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </button>
                </td>
              </tr>

              {/* ROW */}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="table-body-cell font-bold text-primary">#ORD-99150</td>
                <td className="table-body-cell text-slate-500">18/05/2024</td>
                <td className="table-body-cell">
                  <div className="flex flex-col">
                    <span className="font-bold">Tiếng Trung Thương mại: Đàm phán</span>
                    <span className="text-xs text-slate-400 italic">Khóa học trực tuyến</span>
                  </div>
                </td>
                <td className="table-body-cell font-bold text-slate-900">1.200.000đ</td>
                <td className="table-body-cell">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent/20 text-accent">
                    <span className="size-1.5 rounded-full bg-accent mr-1.5"></span>
                    Chờ xác nhận
                  </span>
                </td>
                <td className="table-body-cell">
                  <button className="text-primary hover:text-primary-dark font-bold text-xs flex items-center gap-1">
                    Xem chi tiết
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </button>
                </td>
              </tr>

              {/* ROW */}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="table-body-cell font-bold text-primary">#ORD-98922</td>
                <td className="table-body-cell text-slate-500">10/05/2024</td>
                <td className="table-body-cell">
                  <div className="flex flex-col">
                    <span className="font-bold">Combo Sách Tự học Hán Ngữ</span>
                    <span className="text-xs text-slate-400 italic">Sách vật lý</span>
                  </div>
                </td>
                <td className="table-body-cell font-bold text-slate-900">450.000đ</td>
                <td className="table-body-cell">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500">
                    <span className="size-1.5 rounded-full bg-slate-400 mr-1.5"></span>
                    Đã hủy
                  </span>
                </td>
                <td className="table-body-cell">
                  <button className="text-primary hover:text-primary-dark font-bold text-xs flex items-center gap-1">
                    Xem chi tiết
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">
            Hiển thị 1 - 5 của 24 đơn hàng
          </p>

          <div className="flex gap-1">
            <button
              disabled
              className="size-8 flex items-center justify-center rounded bg-white border border-slate-200 text-slate-400 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>

            <button className="size-8 flex items-center justify-center rounded bg-primary text-white font-bold text-xs">
              1
            </button>

            <button className="size-8 flex items-center justify-center rounded bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary font-bold text-xs transition-colors">
              2
            </button>

            <button className="size-8 flex items-center justify-center rounded bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary font-bold text-xs transition-colors">
              3
            </button>

            <button className="size-8 flex items-center justify-center rounded bg-white border border-slate-200 text-slate-600 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
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