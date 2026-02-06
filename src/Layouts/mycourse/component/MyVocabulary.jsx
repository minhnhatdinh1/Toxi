import react from 'react';
import { Link } from "react-router-dom";
import logo from '../../../assets/image/LOGO (1).png';
export default function MyVocabulary() {
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
          <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-cloud-pattern pointer-events-none opacity-50 z-0" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
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
              <a
                href="/MyCourse"
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-xl transition-colors group"
              >
                <span className="material-symbols-outlined text-[22px] text-slate-400 group-hover:text-primary transition-colors">
                  school
                </span>
                Khóa học của tôi
              </a>

              <a
                href="/Profile"
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-xl transition-colors group"
              >
                <span className="material-symbols-outlined text-[22px] text-slate-400 group-hover:text-primary transition-colors">
                  person
                </span>
                Thông tin cá nhân
              </a>

              <a
                href="/MyVocabulary"
                className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary font-bold rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">
                  bookmarks
                </span>
                Từ vựng đã lưu
              </a>

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
          <div className="mt-6 bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-6 text-white relative overflow-hidden shadow-lg border border-accent/20">
            <div className="absolute -right-4 -top-4 text-white/10">
              <span className="material-symbols-outlined text-9xl">
                temple_buddhist
              </span>
            </div>

            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-accent">
                  workspace_premium
                </span>
                Nâng cấp VIP
              </h4>
              <p className="text-white/80 text-sm mb-4">
                Mở khóa toàn bộ kho từ vựng và bài giảng đặc biệt.
              </p>
              <button className="bg-accent hover:bg-amber-500 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-sm transition-colors w-full">
                Xem chi tiết
              </button>
            </div>
          </div>
        </aside>
        <div className="lg:col-span-9 flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-primary font-bold tracking-wider text-xs uppercase mb-1 block">
            Tủ sách từ vựng - 词汇库
          </span>
          <h2 className="text-3xl font-black text-primary-dark tracking-tight">
            Từ vựng đã lưu
          </h2>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Nơi lưu trữ và ôn tập những từ vựng quan trọng của bạn.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-accent hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-accent/20 text-sm">
            <span className="material-symbols-outlined text-lg">quiz</span>
            Luyện tập Flashcard
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-20 z-40">
        <nav className="flex p-1 space-x-1 w-full md:w-auto overflow-x-auto no-scrollbar">
          <button className="px-5 py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm whitespace-nowrap">
            Tất cả (24)
          </button>
          <button className="px-5 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-sm whitespace-nowrap transition-colors">
            Danh từ
          </button>
          <button className="px-5 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-sm whitespace-nowrap transition-colors">
            Động từ
          </button>
          <button className="px-5 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-sm whitespace-nowrap transition-colors">
            Tính từ
          </button>
        </nav>

        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
          </div>
          <input
            type="text"
            placeholder="Tìm từ vựng, Pinyin..."
            className="block w-full pl-10 pr-3 py-2 border-none bg-slate-100 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Từ vựng
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Pinyin / Nghĩa
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Loại từ
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                  Ví dụ
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              <tr className="group hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-chinese font-bold text-primary-dark">
                      学习
                    </span>
                    <button className="size-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        volume_up
                      </span>
                    </button>
                  </div>
                </td>

                <td className="px-6 py-6">
                  <div className="flex flex-col">
                    <span className="text-accent font-bold text-sm">
                      xué xí
                    </span>
                    <span className="text-slate-900 font-semibold">
                      Học tập
                    </span>
                  </div>
                </td>

                <td className="px-6 py-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                    Động từ
                  </span>
                </td>

                <td className="px-6 py-6 hidden md:table-cell max-w-xs">
                  <div className="text-xs text-slate-500 italic">
                    <p className="font-chinese text-sm text-slate-700 not-italic">
                      我每天都学习汉语。
                    </p>
                    <p>(Tôi học tiếng Trung mỗi ngày.)</p>
                  </div>
                </td>

                <td className="px-6 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      title="Xóa"
                    >
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                    <button className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                      Luyện tập
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="group hover:bg-slate-50/80 transition-colors">
        <td className="px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-chinese font-bold text-primary-dark">
              漂亮
            </span>
            <button className="size-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">
                volume_up
              </span>
            </button>
          </div>
        </td>

        <td className="px-6 py-6">
          <div className="flex flex-col">
            <span className="text-accent font-bold text-sm">piào liang</span>
            <span className="text-slate-900 font-semibold">
              Đẹp, xinh đẹp
            </span>
          </div>
        </td>

        <td className="px-6 py-6">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
            Tính từ
          </span>
        </td>

        <td className="px-6 py-6 hidden md:table-cell max-w-xs">
          <div className="text-xs text-slate-500 italic">
            <p className="font-chinese text-sm text-slate-700 not-italic">
              这件衣服很漂亮。
            </p>
            <p>(Bộ quần áo này rất đẹp.)</p>
          </div>
        </td>

        <td className="px-6 py-6 text-right">
          <div className="flex justify-end gap-2">
            <button
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              title="Xóa"
            >
              <span className="material-symbols-outlined text-xl">
                delete
              </span>
            </button>
            <button className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
              Luyện tập
            </button>
          </div>
        </td>
      </tr>

      <tr className="group hover:bg-slate-50/80 transition-colors">
        <td className="px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-chinese font-bold text-primary-dark">
              北京
            </span>
            <button className="size-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">
                volume_up
              </span>
            </button>
          </div>
        </td>

        <td className="px-6 py-6">
          <div className="flex flex-col">
            <span className="text-accent font-bold text-sm">běi jīng</span>
            <span className="text-slate-900 font-semibold">Bắc Kinh</span>
          </div>
        </td>

        <td className="px-6 py-6">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
            Danh từ
          </span>
        </td>

        <td className="px-6 py-6 hidden md:table-cell max-w-xs">
          <div className="text-xs text-slate-500 italic">
            <p className="font-chinese text-sm text-slate-700 not-italic">
              北京是中国的首都。
            </p>
            <p>(Bắc Kinh là thủ đô của Trung Quốc.)</p>
          </div>
        </td>

        <td className="px-6 py-6 text-right">
          <div className="flex justify-end gap-2">
            <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
              <span className="material-symbols-outlined text-xl">
                delete
              </span>
            </button>
            <button className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
              Luyện tập
            </button>
          </div>
        </td>
      </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
      </div>
    </main>
         </div>
        </>
    )
};