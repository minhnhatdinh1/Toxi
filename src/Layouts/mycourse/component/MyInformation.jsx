import react from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/image/LOGO (1).png'
export default function MyInformation () {
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
         <main className="flex-grow w-full max-w-[1920px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

              <a
                href="/MyProduct"
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-xl transition-colors group"
              >
                <span className="material-symbols-outlined text-[22px] text-slate-400 group-hover:text-primary transition-colors">
                  receipt_long
                </span>
                Lịch sử đơn hàng
              </a>
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
         <div className="lg:col-span-9 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <span className="text-primary font-bold tracking-wider text-xs uppercase block">
          Học để ứng dụng - 学以致用
        </span>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Thông tin cá nhân
        </h2>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        {/* AVATAR */}
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row items-center gap-8 bg-slate-50/30">
          <div className="relative group">
            <div
              className="size-32 rounded-full bg-cover bg-center border-4 border-white shadow-md"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBS4KmE-KnFDiuv5uEZR4LtOQuLhDjl-W3CTFLaG8se8TWt4sdw5n5Xc07v-B7sCeq1ERCYThWqnT-Uf4qyqFNd-3P0EYAjVAS0C5x1FNaYc2h-gE4Kk6qj57s4kEXwXFRXsfYextZMgekB2o-BhP2eaLEzyK8EQEsmQ7vJwtWbWULRLkmoANB7UDOf7D5B44pvVwQkjhfj4N3ids9Dbu0ckeeApIzVUTdocFne3sJwj9dwRxqsDqnQEYjGsR5q989IvRW3hwdnRtc")',
              }}
            />
            <button className="absolute bottom-1 right-1 size-9 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-primary-dark transition-all shadow-sm">
              <span className="material-symbols-outlined text-lg">
                photo_camera
              </span>
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-slate-900 mb-1">
              Minh Anh
            </h4>
            <p className="text-slate-500 text-sm mb-4">
              Ảnh đại diện của bạn sẽ hiển thị công khai trên hệ thống và các chứng chỉ học tập.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors">
                Thay đổi ảnh
              </button>
              <button className="px-4 py-2 text-red-500 text-sm font-semibold hover:text-red-600 transition-colors">
                Xóa ảnh hiện tại
              </button>
            </div>
          </div>
        </div>

        {/* BASIC INFO */}
        <div className="p-8">
          <h5 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              badge
            </span>
            Thông tin cơ bản
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="full_name">Họ và tên</label>
              <input
                id="full_name"
                type="text"
                placeholder="Nhập họ và tên của bạn"
                defaultValue="Minh Anh"
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="email@domain.com"
                defaultValue="minhanh@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone">Số điện thoại</label>
              <input
                id="phone"
                type="tel"
                placeholder="Nhập số điện thoại"
                defaultValue="0987654321"
              />
            </div>

            <div>
              <label htmlFor="birthday">Ngày sinh</label>
              <input
                id="birthday"
                type="date"
                defaultValue="1998-05-15"
              />
            </div>

            <div>
              <label htmlFor="gender">Giới tính</label>
              <select id="gender" defaultValue="male">
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
          </div>
        </div>


        {/* ACTIONS */}
        <div className="p-8 border-t border-slate-100 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 italic">
            Cập nhật lần cuối: 12/05/2024
          </p>

          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors">
              Hủy bỏ
            </button>

            <button className="flex-1 md:flex-none px-8 py-3 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl shadow-lg shadow-secondary/20 transition-all flex items-center justify-center gap-2">
              <span>Lưu thay đổi</span>
              <span className="material-symbols-outlined text-lg">
                save
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* SECURITY INFO */}
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-3xl">
            verified_user
          </span>
        </div>

        <div className="flex-1">
          <h5 className="font-bold text-slate-900 mb-1">
            Bảo mật tài khoản
          </h5>
          <p className="text-sm text-slate-600 leading-relaxed">
            Tài khoản của bạn đã được xác minh. Hãy đảm bảo mật khẩu có cả chữ hoa,
            chữ thường, số và ký tự đặc biệt để bảo vệ thông tin học tập của bạn.
          </p>
        </div>

        <button className="text-primary font-bold text-sm underline hover:text-primary-dark">
          Tìm hiểu thêm
        </button>
      </div>
    </div>

      </div>
    </main>
         </div>
        </>
    )
};