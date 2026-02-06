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
          <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

              <Link
                to="/MyVocabulary"
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-xl transition-colors group"
              >
                <span className="material-symbols-outlined text-[22px] text-slate-400 group-hover:text-primary transition-colors">
                  bookmarks
                </span>
                Từ vựng đã lưu
              </Link>

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
{/* Breadcrumbs */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-[#4c669a]">
        <a className="hover:text-primary" href="#">Trang chủ</a>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <a className="hover:text-primary" href="#">Tài khoản</a>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="font-medium text-[#0d121b]">Lịch sử đơn hàng</span>
      </div>

      {/* Page Heading & Search */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-[#0d121b]">
            Lịch sử đơn hàng
            <span
              className="font-serif text-2xl font-normal text-gray-400"
              lang="zh"
            >
              订单历史
            </span>
          </h1>
          <p className="mt-1 text-[#4c669a]">
            Quản lý và theo dõi quá trình vận chuyển các đơn hàng của bạn.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm theo mã đơn hàng..."
              className="h-10 w-64 rounded-lg border border-border-light bg-white pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-gray-400">
              search
            </span>
          </div>

          <button className="flex h-10 items-center gap-2 rounded-lg border border-border-light bg-white px-3 text-sm font-medium text-[#0d121b] hover:bg-gray-50">
            <span className="material-symbols-outlined text-[20px]">
              filter_list
            </span>
            Lọc
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 rounded-xl border border-border-light bg-surface-light shadow-sm">
        <div className="border-b border-border-light px-6">
          <div className="flex gap-8 overflow-x-auto">
            <button className="relative border-b-[3px] border-primary py-4 text-sm font-bold text-primary">
              Tất cả
              <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                12
              </span>
            </button>

            {[
              "Chờ thanh toán",
              "Đang xử lý",
              "Đang giao",
              "Hoàn thành",
              "Đã hủy",
            ].map((tab) => (
              <button
                key={tab}
                className="border-b-[3px] border-transparent py-4 text-sm font-medium text-[#4c669a] transition-colors hover:text-primary"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Order List */}
        <div className="flex flex-col gap-6 p-6">
          {/* Order Item */}
          <div className="group flex flex-col gap-4 rounded-xl border border-border-light bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
            {/* Order Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-gray-200 pb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-blue-50 px-2 py-1 text-xs font-bold text-primary">
                    ĐƠN HÀNG
                  </span>
                  <span className="font-bold text-[#0d121b]">#TOXI-8821</span>
                </div>

                <div className="text-sm text-[#4c669a]">|</div>
                <div className="text-sm text-[#4c669a]">
                  Đặt ngày: 15/10/2023 14:30
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  local_shipping
                </span>
                <span className="text-sm font-bold text-secondary">
                  Đang giao hàng
                </span>
              </div>
            </div>
            {/* Order Content – Item 1 */}
      <div className="flex flex-col gap-4 justify-between sm:flex-row sm:items-center">
        <div className="flex flex-1 items-start gap-4">
          <div
            className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50"
            data-alt="Chinese Textbook Cover"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGSexIIv16VoZZz76l0HLTnAp6h8NYs9raaftw3XWmhVsmEx_cNAwVf27Uqt3GvzBxiemeGMwGKcNRTZQ9WQqlVjkpL-PsfCY3PiDMW51vrTycMRXDAUeZEPp0O96z8eYUfuu2cvgTj9VFzSDi__cv2qJBm8JYhC7Z4kfpHzbmvT_xBKFTJ60I50jLKyAxPX09S_FzcHf-An8jkUy3r-9dZF8Jm8Sh1UH8Xe2M7BtsWQ7ocDZUf0CwtLcrSPBchRhPHMCP3ywNMkc"
              alt="Chinese Textbook"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="line-clamp-1 font-bold text-[#0d121b]">
              Giáo trình Hán Ngữ Quyển 1 - Phiên bản mới
            </h4>
            <p className="text-sm text-[#4c669a]">
              Phân loại: Sách + Audio
            </p>
            <p className="text-sm text-[#4c669a]">Số lượng: x1</p>
          </div>
        </div>

        <div className="min-w-[140px] flex flex-col items-end gap-1 sm:border-l sm:border-gray-100 sm:pl-6">
          <span className="text-sm text-[#4c669a]">Tổng tiền</span>
          <span className="text-xl font-bold text-primary">150.000đ</span>
        </div>
      </div>

      {/* Order Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button className="rounded-lg px-4 py-2 text-sm font-medium text-[#4c669a] hover:bg-gray-50 hover:text-[#0d121b]">
          Liên hệ hỗ trợ
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-dark">
          Xem chi tiết
        </button>
      </div>

      {/* Order Item 2 – Completed */}
      <div className="group mt-6 flex flex-col gap-4 rounded-xl border border-border-light bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
        {/* Order Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-gray-200 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="rounded bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600">
                ĐƠN HÀNG
              </span>
              <span className="font-bold text-[#0d121b]">#TOXI-8755</span>
            </div>
            <div className="text-sm text-[#4c669a]">|</div>
            <div className="text-sm text-[#4c669a]">
              Đặt ngày: 01/10/2023 09:15
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-green-600">
              check_circle
            </span>
            <span className="text-sm font-bold text-green-600">
              Hoàn thành
            </span>
          </div>
        </div>

        {/* Order Content */}
        <div className="flex flex-col gap-4 justify-between sm:flex-row sm:items-center">
          <div className="flex flex-1 items-start gap-4">
            <div className="flex -space-x-4">
              <div
                className="relative z-10 size-20 shrink-0 overflow-hidden rounded-lg border-2 border-white bg-gray-50 shadow-sm"
                data-alt="Calligraphy Brush Set"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQooAEWQfLsR3e8fO5ZV6B03zCrIEls51CN1PCf2RKZv12sm9bpNGLAwh_2QU1XnAyLDt4X62IixAWA2feWF775Yh6iA4B9MI2F_4FO7Pkot8Ng0NBJyl2XBHqn3IdQaDRL51TSQ2jpfpfZzeHf80kfySSWegsKlybf8IFuB90rxG7-H94nTt8Wzy3vOx5xI9r8z1TKOcxqgsnr6oPr3XqCySVw5O2QgSTqLiBx96NQ_ZLn_4qvUpaQ-EvgvEJ7dZ3EenU0z_7fTg"
                  alt="Calligraphy Brush"
                  className="h-full w-full object-cover"
                />
              </div>

              <div
                className="relative z-0 size-20 shrink-0 overflow-hidden rounded-lg border-2 border-white bg-gray-50 shadow-sm"
                data-alt="Notebook"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeFIip6nrYkktPyDI7Mz8EnVLOgjbe5cmmkcdzoc-gWYaT9zw7dKR88-MHq-WnQyXURfYDbj41q53kiM6LWf4TS8rmICgUDUEMbLjdOSHrY9gu3X8lr33NqayJSSb5y5zzkGqDTuDLeNoF2Q1C46BUMFQ_MMFZbZMlBZHwyAJV9TljQ_7tgX4BlcEFexFO6rBQ4-lRh5TjO2YtB7A032FeWrAV4dotpYcL3RYIcN4rxZZOJ4iLTHTLpQpFcngPgBj8ZF-6-TtvBwo"
                  alt="Notebook"
                  className="h-full w-full object-cover opacity-70"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 pl-2">
              <h4 className="line-clamp-1 font-bold text-[#0d121b]">
                Bộ bút lông viết thư pháp nhập khẩu
              </h4>
              <p className="text-sm text-[#4c669a]">
                Phân loại: Size Trung + 2 sản phẩm khác
              </p>
              <p className="text-sm text-[#4c669a]">Số lượng: x3</p>
            </div>
          </div>

          <div className="min-w-[140px] flex flex-col items-end gap-1 sm:border-l sm:border-gray-100 sm:pl-6">
            <span className="text-sm text-[#4c669a]">Tổng tiền</span>
            <span className="text-xl font-bold text-primary">320.000đ</span>
          </div>
        </div>
      </div>
       {/* Order Actions – Completed */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button className="text-sm font-medium text-primary hover:underline">
          Mua lại
        </button>

        <div className="h-4 w-[1px] bg-gray-300" />

        <button className="rounded-lg border border-border-light bg-white px-4 py-2 text-sm font-medium text-[#0d121b] transition-colors hover:bg-gray-50">
          Xem chi tiết
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-secondary/10 px-4 py-2 text-sm font-bold text-yellow-700 transition-colors hover:bg-secondary/20">
          <span className="material-symbols-outlined text-[18px]">
            star
          </span>
          Đánh giá
        </button>
      </div>

      {/* Order Item 3 – Cancelled */}
      <div className="group mt-6 flex flex-col gap-4 rounded-xl border border-border-light bg-white p-5 shadow-sm opacity-75 transition-all hover:border-primary/30 hover:opacity-100">
        {/* Order Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-gray-200 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="rounded bg-gray-100 px-2 py-1 text-xs font-bold text-gray-500">
                ĐƠN HÀNG
              </span>
              <span className="font-bold text-gray-500">#TOXI-8601</span>
            </div>

            <div className="text-sm text-[#4c669a]">|</div>

            <div className="text-sm text-[#4c669a]">
              Đặt ngày: 28/09/2023 18:45
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-red-500">
              cancel
            </span>
            <span className="text-sm font-bold text-red-500">
              Đã hủy
            </span>
          </div>
        </div>

        {/* Order Content */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-start gap-4">
            <div
              className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 grayscale"
              data-alt="Flashcard set"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxPg7fho4vmQZUaVFhdMpuw7IlTTx6tOEKI5rhIDYDbu_aKiM93ZXTR0HK11Y2JVbOqDKFsLcHKzb4aYLnSmYxvNbhFrtcr-ZCFIzbCqc-_t47qWbnF0YNHYl2uo1DtHEItsGmO7G7V7LvlF6QufXEk3dRICdLuOTEIZVzjDFfe0w5963B2fHgzou49UeAWEr83yrOtKFA2zg7uid1-04LWPApHHpPtzU0nf-7sotyj9xGIxZicaMYxC_e_PdJD3zgfUx4dhw0_q8"
                alt="Flashcards"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="line-clamp-1 font-bold text-gray-600">
                Bộ thẻ Flashcard HSK 1-3
              </h4>
              <p className="text-sm text-[#4c669a]">
                Lý do hủy: Thay đổi địa chỉ
              </p>
            </div>
          </div>

          <div className="min-w-[140px] flex flex-col items-end gap-1 sm:border-l sm:border-gray-100 sm:pl-6">
            <span className="text-sm text-[#4c669a]">Tổng tiền</span>
            <span className="text-xl font-bold text-gray-500 line-through">
              99.000đ
            </span>
          </div>
        </div>

        {/* Order Actions – Cancelled */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button className="rounded-lg border border-border-light bg-white px-4 py-2 text-sm font-medium text-[#0d121b] transition-colors hover:bg-gray-50">
            Mua lại
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="border-t border-border-light p-4">
        <div className="flex items-center justify-center gap-2">
          <button className="flex size-9 items-center justify-center rounded-lg border border-border-light bg-white text-[#4c669a] hover:bg-gray-50 disabled:opacity-50">
            <span className="material-symbols-outlined text-[18px]">
              chevron_left
            </span>
          </button>

          <button className="flex size-9 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
            1
          </button>

          <button className="flex size-9 items-center justify-center rounded-lg border border-border-light bg-white text-[#4c669a] hover:bg-gray-50">
            2
          </button>

          <button className="flex size-9 items-center justify-center rounded-lg border border-border-light bg-white text-[#4c669a] hover:bg-gray-50">
            3
          </button>

          <span className="text-[#4c669a]">...</span>

          <button className="flex size-9 items-center justify-center rounded-lg border border-border-light bg-white text-[#4c669a] hover:bg-gray-50">
            <span className="material-symbols-outlined text-[18px]">
              chevron_right
            </span>
          </button>
        </div>
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