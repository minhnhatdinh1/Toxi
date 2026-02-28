import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyUser from './MyUser';
import MyHeader from './MyHeader';
export default function MyCourseMain() {
  const [courseFilter, setCourseFilter] = useState('all');

  return (
        <>
        
          <MyHeader />

          {/* Mobile profile (show full MyUser on small screens like FB profile) */}
          <div className="block lg:hidden mb-6 px-4">
            <MyUser mobile />
          </div>

         <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR */}
       <MyUser />

        {/* MAIN CONTENT */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-primary font-bold tracking-wider text-xs uppercase mb-1 block">
                Học để ứng dụng - 学以致用
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Khóa học của tôi
              </h2>
              <p className="text-slate-500 mt-1 text-sm md:text-base">
                Quản lý và theo dõi tiến độ học tập của bạn.
              </p>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1 md:pb-0">
              {/* HOURS */}
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm min-w-max">
                <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">
                    schedule
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">
                    Giờ học
                  </p>
                  <p className="text-lg font-bold text-slate-900 leading-none">
                    120h
                  </p>
                </div>
              </div>

              {/* COMPLETED */}
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm min-w-max">
                <div className="size-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined text-lg">
                    check_circle
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">
                    Hoàn thành
                  </p>
                  <p className="text-lg font-bold text-slate-900 leading-none">
                    1
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* FILTER + SEARCH BAR */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-20 z-40">
        <nav className="flex p-1 space-x-1 w-full md:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setCourseFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${courseFilter === 'all' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-50 text-slate-600 font-medium'}`}
          >
            Tất cả (5)
          </button>
          <button
            onClick={() => setCourseFilter('learning')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${courseFilter === 'learning' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-50 text-slate-600 font-medium'}`}
          >
            Đang học (3)
          </button>
          <button
            onClick={() => setCourseFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${courseFilter === 'completed' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-50 text-slate-600 font-medium'}`}
          >
            Đã hoàn thành (1)
          </button>
          <button
            onClick={() => setCourseFilter('fav')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${courseFilter === 'fav' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-50 text-slate-600 font-medium'}`}
          >
            Yêu thích (1)
          </button>
        </nav>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            className="block w-full pl-10 pr-3 py-2 border-none bg-slate-100 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* COURSE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        {/* COURSE CARD 1 */}
        <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
          <div className="relative h-44 overflow-hidden">
            <div className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              Phổ biến
            </div>

            <div className="absolute top-3 right-3 z-10 bg-black/50 text-white p-1 rounded-full hover:bg-accent transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm block">
                favorite
              </span>
            </div>

            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDni5mzVgoV46-QTSNIhS2EiKz3h0rHSODOEzgW1P8yhZgaRRO2d4HspokhYn97DAM7Uud7NckiZxP5dUFwII_8k9q3Gd_m0tyQTGUddkBdFgKLU2BJASrGNmTWSY0Dsw2PDEM8cb2CYm8bl0v1b-SdqwZyY-2YD_r76xq8QqUbkxxawt86hDfK4hWPEoJG67xqfObbsAwRIfkCJH-BYkWLDcmtnLadWd3fLxHm5qKNqWhd2lRWnYYQqXKPF_ezfgEkiAm3s0hdZjQ')",
              }}
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="p-5 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                Sơ cấp
              </span>
              <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                <span className="material-symbols-outlined text-sm">
                  star
                </span>
                4.9
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              Hán ngữ Sơ cấp 1 (HSK 1) - Nền tảng vững chắc
            </h3>

            <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
              Làm quen với phát âm, bộ thủ và 150 từ vựng cơ bản nhất.
            </p>

            <div className="mt-auto space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Đã học 80%</span>
                  <span>24/30 bài</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-1000"
                    style={{ width: "80%" }}
                  />
                </div>
              </div>

              <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-xl shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 text-sm">
                <span>Tiếp tục học</span>
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </article>

        {/* COURSE CARD 2 */}
        <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
          <div className="relative h-44 overflow-hidden">
            <div className="absolute top-3 right-3 z-10 bg-black/50 text-white p-1 rounded-full hover:bg-accent transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm block">
                favorite
              </span>
            </div>

            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnKNbnSGm5HZxbhxrgU3MqDjM1gyYOtiR6cHGuuXwZ-16lnan4EEp8pxWfePkImkYT8Xx8ePTcUyWFtDHMGbFAvSme-rWZTKYPwK_zwPvra9nBnM_e0REjYnZIqTFcosph-qJ-HcJtfU9373eNMi2ljWMqWFK10sNaPDLY0Cbh_auyayh25y0i9z272Fowvwrv05tCI2kQgV4xVrcvs29wrZyR61huY88fv5hu6LvamTa5vmxq7H3QxWA8hSqcCO_0LMlKGrbZfdA')",
              }}
            />
          </div>

          <div className="p-5 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                Văn hóa
              </span>
              <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                <span className="material-symbols-outlined text-sm">
                  star
                </span>
                4.8
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              Nghệ thuật Thư pháp Trung Hoa
            </h3>

            <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
              Khám phá vẻ đẹp của chữ Hán qua nghệ thuật viết thư pháp truyền
              thống.
            </p>

            <div className="mt-auto space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Đã học 15%</span>
                  <span>3/20 bài</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-1000"
                    style={{ width: "15%" }}
                  />
                </div>
              </div>

              <button className="w-full bg-white border border-slate-300 hover:border-primary hover:text-primary text-slate-700 font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                <span>Tiếp tục học</span>
              </button>
            </div>
          </div>
        </article>
          {/* CARD: ĐÃ HOÀN THÀNH */}
      <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col h-full opacity-90 hover:opacity-100">
        <div className="relative h-44 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
          <div className="absolute inset-0 bg-primary/10 z-10 flex items-center justify-center backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all">
            <div className="bg-white/90 text-primary font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs">
              <span className="material-symbols-outlined text-accent text-sm">
                check_circle
              </span>
              Đã hoàn thành
            </div>
          </div>

          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvgv1rV1H1uheeFqBBc8KOa1qCe6aMb8rLydmTkBg7yWxwvQBSAjZFJXcIy5lPrnqYHRVmRAmY0Qdg9EMcAzcN5xqs6tw0sdGBWAPHVSa9Lv53XLSkf8VCU1SLuEQi_smRn3x1YGyFYI6Ny1UGBUdUWBOH6OSm6ljtGm_u6LkXxQ5efb_EXnU_b8hV6c2lfd2XRnKnvOOFHluRn1m0C2feT5YZ5is1jiLcrSprwoYGpiw4bFpJbZ5uljR3M9XY2NKOfaC_Kc_CST0')",
            }}
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
              Giao tiếp
            </span>
            <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
              <span className="material-symbols-outlined text-sm">star</span>
              5.0
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
            Tiếng Trung giao tiếp cơ bản cho người đi làm
          </h3>

          <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
            Các mẫu câu thông dụng trong môi trường công sở và kinh doanh.
          </p>

          <div className="mt-auto space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-emerald-600 mb-1">
                <span>Hoàn thành 100%</span>
                <span className="material-symbols-outlined text-sm">
                  verified
                </span>
              </div>
              <div className="w-full bg-emerald-100 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-xl transition-all text-xs">
                Xem lại
              </button>
              <button className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary font-bold py-2.5 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  download
                </span>
                Chứng chỉ
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* CARD: MỚI ĐĂNG KÝ */}
      <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
        <div className="relative h-44 overflow-hidden">
          <div className="absolute top-3 left-3 z-10 bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            Mới đăng ký
          </div>

          <div className="absolute top-3 right-3 z-10 bg-black/50 text-white p-1 rounded-full hover:bg-accent transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm block">
              favorite_border
            </span>
          </div>

          <div
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBBwWkOzSrNA3H1mrmrTqPHhY8O1jISxvKEvN5mm1uJVUzRF2Cps68946kx03ufE-Gg83j3v8mlMa_Jk5IJSbEV9QY_vLztnJWYpxKfV-VhtHoWSv5RCuK4OvhXvOp92EErrk0CfE6omusCfV4rCUv-ovrigSL6N0OUR1a7O9uvJ9-4HyPH9-vKswt4LEOpAs9eHnvF_Fh0o7G0HO71aJcqsW7IJp8bezlPdDUGgjwJZglqrhOgue783Y6GxLsVcXK41GnjQhXxpiU')",
            }}
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
              HSK 2
            </span>
            <div className="flex items-center text-slate-300 text-xs font-bold gap-1">
              <span className="material-symbols-outlined text-sm">star</span>
              --
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            Hán ngữ Sơ cấp 2 (HSK 2)
          </h3>

          <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
            Nâng cao vốn từ vựng lên 300 từ và các cấu trúc ngữ pháp phức tạp hơn.
          </p>

          <div className="mt-auto space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-500 mb-1">
                <span>Chưa bắt đầu</span>
                <span>0/25 bài</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-slate-300 h-2 rounded-full"
                  style={{ width: "0%" }}
                />
              </div>
            </div>

            <button className="w-full bg-accent hover:bg-amber-600 text-white font-bold py-2.5 px-4 rounded-xl shadow-md shadow-accent/20 transition-all flex items-center justify-center gap-2 text-sm">
              <span>Bắt đầu ngay</span>
              <span className="material-symbols-outlined text-lg">
                play_circle
              </span>
            </button>
          </div>
        </div>
      </article>

      {/* CARD: ĐANG HỌC */}
      <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
        <div className="relative h-44 overflow-hidden">
          <div className="absolute top-3 right-3 z-10 bg-accent text-white p-1 rounded-full cursor-pointer">
            <span className="material-symbols-outlined text-sm block">
              favorite
            </span>
          </div>

          <div
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdWbABE3H4BPVcAC4AKITPUZRdUa-NQg-JTzXc-BbxobKk_Z1Qv7lT-k8UBD1gCGywx0cemJ_gerHkcTekpo-MgsXQ9WW70qlinc-b4AXhzuTTcyWueVpa1Tfj7nHfdQd96zkrFBqwn-Zfrk-pH92_5w-WV0o_zLTPLqLQEHoaiUeewVMqIkJxiateUAwhgk69z10_7L5vntW77TpfEg4tH7imZVUfp7m64Cy9QbOgW1PB-nt35ufJYPsEElZUOwYYgSLsvakLTmA')",
            }}
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
              Thương mại
            </span>
            <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
              <span className="material-symbols-outlined text-sm">star</span>
              4.7
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            Tiếng Trung Thương Mại: Nhập hàng Trung Quốc
          </h3>

          <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
            Kỹ năng đàm phán, tìm nguồn hàng và giao dịch trên các sàn TMĐT.
          </p>

          <div className="mt-auto space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                <span>Đã học 45%</span>
                <span>9/20 bài</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-1000"
                  style={{ width: "45%" }}
                />
              </div>
            </div>

            <button className="w-full bg-white border border-slate-300 hover:border-primary hover:text-primary text-slate-700 font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
              <span>Tiếp tục học</span>
            </button>
          </div>
        </div>
      </article>
      </div>
      <div className="pt-6 flex justify-center">
      <button className="text-slate-500 hover:text-primary font-medium flex items-center gap-2 px-6 py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm">
        Xem thêm khóa học
        <span className="material-symbols-outlined">expand_more</span>
      </button>
    </div>
        </div>
      </div>
    </main>
        
        </>
    )
}