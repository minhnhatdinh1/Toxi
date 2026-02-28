import react from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/image/LOGO (1).png'
export default function MyUser({ mobile = false }) {
    return (
        <>
        
        {/* SIDEBAR */}
        <aside className={`${mobile ? 'block' : 'hidden lg:block'} lg:col-span-3 sticky top-24`}>
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

            {/* MENU */}
            <nav className="p-3 space-y-1">
              <Link
                to="/MyCourse"
                className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary font-bold rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">
                  school
                </span>
                Khóa học của tôi
              </Link>

              <Link
                to="/Profile"
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-xl transition-colors group"
              >
                <span className="material-symbols-outlined text-[22px] text-slate-400 group-hover:text-primary transition-colors">
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
                href="/logout"
                className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 font-medium rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">
                  logout
                </span>
                Đăng xuất
              </a>
            </div>
          </div>

          {/* VIP BOX */}
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
        
        </>
    )
}