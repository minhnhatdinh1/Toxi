import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from '../../../assets/image/LOGO (1).png'

export default function VideoMain() {
const [openLeft, setOpenLeft] = useState(false);
const [openRight, setOpenRight] = useState(false);
const [view, setView] = useState("video");
const navigate = useNavigate();
const location = useLocation();

// simple lessons data (replace with real data source)
const lessons = [
  { title: 'Giới thiệu Pinyin và Thanh điệu', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd46J0OVTkKv4pxaYeYGXAe34QpMGVoQPWHsDxJFLQVkR7zc2njDlGNkYGFBBDI9MRbbXNKwWxmeYsQNJ2iZVP0W-dfqJYmkpWGmJiALxPsVcQ8fG-L9ZnHatbsL4CZXH-21SwOhn3DwBxWY6nVF77fZOSmFnMFHVAxhmXUw_Q3-DyzIbIk6tupeA54nLDKP5xrIGQTagDGbQBXHAEj9U6FsLtwDOEiTaFJlIpBxkcf4g0zajB9Gd0KYHbbjIetDHLAuYSAOhpBWs', duration: '12:00' },
  { title: 'Vận mẫu đơn và Thanh mẫu cơ bản', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLTF0QxG3IlFetbR6V5O0ZDc0-Di0pvuxkE3SJodstivVx85jqDou3nat_t7Qtrp0tbMwW1V5t30DafACpeOVgKLfbbOVomANBajmKPN9ctV7IbaFPPkEjm5r3KuRGgx1nr5XaGN29Wi_IU8RNGfNBX7W3O6ZsJ2C2nY5RH2lemVzRU65Kq9kEE5W51Kevj6T0EFpTIyxfQlr4t3fvzBuAvgDZkgonzonrnWrGscEpyqRmSLRuEKIp6TeGWj0tDeEIL3y3TD0GS5s', duration: '10:34' },
  { title: 'Quy tắc biến điệu', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpXsT4FqR19SBR4lwyNEolGnNhLY-YW7Z44KuAf5xILVKQqDhBqXGUPs_15OPaZb9_0teJx0zjUiyJj40Acg43F57IOKxfFVZG5ywkNBo_aEum_lJD9owZPZhzWZYhlt6wTYDf8Rx3jJk4DEbArlT4MVDmprgrBuVdLtDKpFspKx4_JwCKDSzxEfgfuVAFN5hq5zqoRo1e8zPogyhvj2xRewxuEC7K-rmKvToFv8q3TNI8PCLtQ2g4Wo3LTlfjKpHEI90ItnoP4qM', duration: '08:20' }
];

const [selectedLessonIdx, setSelectedLessonIdx] = useState(0);

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const lessonParam = params.get('lesson');
  if (lessonParam !== null) {
    const idx = parseInt(lessonParam, 10);
    if (!isNaN(idx) && idx >= 0 && idx < lessons.length) {
      setSelectedLessonIdx(idx);
      setView('video');
    }
  }
}, [location.search]);
  return (
    <>
     
      {/* Header */}
       <div className="w-full bg-white dark:bg-surface-dark shadow-sm z-50 sticky top-0">
       <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">
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
        <div className="flex items-center gap-6 shrink-0">
          {/* CHAT */}
          <button 
            onClick={() => setOpenRight(true)}
            className="hidden md:flex items-center justify-center size-10 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined">
              forum
            </span>
          </button>

          {/* CART */}
          <div className="relative group cursor-pointer">
          <button className="flex-[1.5] px-8 py-5 bg-primary text-secondary font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 group">
      
      <span
        className="material-symbols-outlined group-hover:scale-110 transition-transform cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          navigate("/cart");
        }}
      >
        shopping_cart
      </span>
      </button>
          </div>

        {/* Avatar */}
<div className="hidden sm:flex items-center">
  <div
    className="bg-center bg-no-repeat bg-cover rounded-full size-9 border-2 border-white shadow-sm cursor-pointer"
    style={{
      backgroundImage:
        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANadJSyOfDTclENxTAo2sw3Zjh7pnp9KKg6h2O4DPIjBYyTW71cyBejL6epjf4bncopuLtFsS_S28mcoEHv7h1zzA9eQlltIXtwDZfsYjCeMxjDdAPnQkvKLCnuYjrECMphza2dJScBgPHRGqoIUccTQUhZWLevuqN5gbt-Gdi0v_35rRW79Z__1-tjeWPfsTpAYBzqjrPwvrzKlKTY8K7uLo1-SOwA3-7T7eW-upJSD1KOVr7iIff5utR8-CjWJTlAFJYfsztm9s")',
    }}
  />
</div>

          {/* MOBILE MENU */}
          <button 
            onClick={() => setOpenLeft(true)}
            className="md:hidden text-white"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
      </div>
      <div className="flex flex-1 relative">
        {openLeft && (
  <div
    onClick={() => setOpenLeft(false)}
    className="fixed inset-0 bg-black/20 z-40 md:hidden"
  />
)}
  <aside
  className={`
    fixed inset-y-0 left-0 z-50
    w-[320px] lg:w-[360px]
    bg-surface-light dark:bg-surface-dark
    transform transition-transform duration-300
    ${openLeft ? "translate-x-0" : "-translate-x-full"}
    md:static md:translate-x-0 md:flex
    flex-col shrink-0
  `}
>
  <button
    onClick={() => setOpenLeft(false)}
    className="absolute top-3 right-3 md:hidden"
  >
    <span className="material-symbols-outlined">close</span>
  </button>
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-primary text-[18px]">
                              menu_book
                            </span>
                            <h1 className="text-slate-900 dark:text-white text-base font-bold">
                              {`Hán ngữ Cơ bản ${parseInt((selectedLessonIdx||0),10) + 1}`}
                            </h1>
                          </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Tiến độ khóa học</span>
                <span className="font-bold text-primary">45%</span>
              </div>

              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: "45%" }}
                />
              </div>
            </div>
          </div>

          {/* Modules */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-3">
            {/* Module 1 */}
            <div>
              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-green-500">
                    check_circle
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase">
                    Module 1: Mở đầu
                  </span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-slate-400">
                  expand_more
                </span>
              </button>
            </div>

            {/* Active Module */}
            <div className="bg-primary/5 rounded-xl border border-primary/10 overflow-hidden">
              <button className="w-full flex items-center justify-between p-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    play_circle
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Basic Greetings
                  </span>
                </div>
                <span className="material-symbols-outlined text-[20px] text-primary">
                  expand_less
                </span>
              </button>

              <div className="pb-2 px-2 space-y-1">
               <button
  onClick={() => {
    setView("video");
    setOpenLeft(false); // đóng sidebar trên mobile
  }}
  className="w-full flex items-center gap-3 p-3 pl-8 rounded-lg bg-primary text-white shadow-sm transition-all group"
>
                  <span className="material-symbols-outlined text-[20px]">
                    video_library
                  </span>
                  <div className="flex flex-col">
                   <span className="text-sm font-bold">Video Bài giảng</span>
                   <span className="text-xs opacity-80">12:00 phút</span>
                  </div>
                </button>

               <button
  onClick={() => {
    navigate('/flashcard');
    setOpenLeft(false);
  }}
  className="w-full flex items-center gap-3 p-3 pl-8 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all group"
>
                  <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-primary">
                    style
                  </span>
                  <span className="text-xs font-medium">Flashcards</span>
                </button>

              
              </div>
            </div>

            {/* Locked Module */}
            <div className="opacity-50">
              <button className="w-full flex items-center justify-between p-2 rounded-lg text-left cursor-not-allowed">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-slate-400">
                    lock
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    Module 3: Số đếm
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <button className="w-full py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-500 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                arrow_back
              </span>
              TRANG CHỦ KHÓA HỌC
            </button>
          </div>
        </aside>
        <main className="flex-1 h-full bg-background-light dark:bg-background-dark overflow-y-auto custom-scrollbar bg-chinese-pattern p-6">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>Module {parseInt((selectedLessonIdx||0),10) + 1}</span>
                <span className="material-symbols-outlined text-[10px]">
                  chevron_right
                </span>
                <span className="text-primary">{lessons[selectedLessonIdx]?.title}</span>
              </div>

              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {lessons[selectedLessonIdx]?.title}
              </h1>
            </div>

            {/* Video */}
            <div className="relative group aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{
                  backgroundImage: `url("${lessons[selectedLessonIdx]?.bg}")`,
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                <button className="size-20 bg-primary/90 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
                  <span className="material-symbols-outlined text-[48px] ml-1">
                    play_arrow
                  </span>
                </button>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex flex-col gap-2">
                  <div className="h-1 bg-white/30 rounded-full w-full">
                    <div className="h-full bg-accent" style={{ width: `${35 + selectedLessonIdx * 10}%` }} />
                  </div>

                  <div className="flex items-center justify-between text-white text-[10px]">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-[16px]">
                        play_arrow
                      </span>
                      <span>{`00:00 / ${lessons[selectedLessonIdx]?.duration || '00:00'}`}</span>
                    </div>
                    <div
  onClick={() => {
    setView("video");
    setOpenLeft(false); // đóng sidebar trên mobile
  }}
  className="w-full flex items-center gap-3 p-3 pl-8 rounded-lg bg-primary text-white shadow-sm transition-all group"
>
                    
                    </div>
                  </div>
                </div>
              </div>
                   <span className="text-xs opacity-80">{lessons[selectedLessonIdx]?.duration} phút</span>

            {/* Content */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
    // pass current lesson to flashcard page
    navigate(`/flashcard?lesson=${selectedLessonIdx}`);
                    <span className="material-symbols-outlined text-[16px]">
                      overview
                    </span>
                    TỔNG QUAN BÀI HỌC
                </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-primary text-xs font-medium transition-colors">
                    <span className="material-symbols-outlined text-[16px]">
                      description
                    </span>
                    TÀI LIỆU (PDF)
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-primary text-xs font-medium transition-colors">
                    <span className="material-symbols-outlined text-[16px]">
                      dictionary
                    </span>
                    TỪ VỰNG CHI TIẾT
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-2">
                    Mục tiêu bài học:
                  </h3>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4">
                    <li>Nhận diện và phát âm chuẩn từ "你好" (Nǐ hǎo).</li>
                    <li>Hiểu cách sử dụng kính ngữ "您好" (Nín hǎo).</li>
                    <li>Phát triển kỹ năng phản xạ khi chào hỏi.</li>
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="size-6 rounded-full border border-white bg-slate-200" />
                    <div className="size-6 rounded-full border border-white bg-slate-300" />
                    <div className="size-6 rounded-full border border-white bg-slate-400" />
                    <span className="ml-4 text-[10px] text-slate-400">
                      +120 học viên đã học xong
                    </span>
                  </div>

                  <button className="px-4 py-2 bg-accent text-primary-dark font-bold text-[11px] rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    HOÀN THÀNH BÀI HỌC
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
        {openRight && (
  <div
    onClick={() => setOpenRight(false)}
    className="fixed inset-0 bg-black/20 z-40 md:hidden"
  />
)}
    <aside
        className={`
         fixed inset-y-0 right-0 z-50
    w-[360px] lg:w-[420px]
    bg-surface-light dark:bg-surface-dark
    border-l border-slate-200 dark:border-slate-800
    transform transition-transform duration-300
    ${openRight ? "translate-x-0" : "translate-x-full"}
    md:static md:translate-x-0
    flex flex-col h-full shrink-0
        `}
      >
<button
  onClick={() => setOpenRight(false)}
  className="md:hidden text-white"
>
  <span className="material-symbols-outlined text-[24px]">
    forum
  </span>
</button>
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                forum
              </span>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Thảo luận (24)
              </h3>
            </div>

            <button className="text-slate-400 hover:text-slate-600">
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
            </button>
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-5">

            {/* Comment 1 */}
            <div className="flex gap-3">
              <div className="size-8 rounded-full bg-blue-100 shrink-0 flex items-center justify-center text-primary font-bold text-[10px]">
                TH
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Trần Hạnh
                  </span>
                  <span className="text-[9px] text-slate-400">
                    10 phút trước
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl rounded-tl-none bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Video giảng rất dễ hiểu ạ! Thầy có thể hướng dẫn kỹ hơn về thanh điệu không ạ?
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <button className="text-xs font-bold text-slate-400 hover:text-primary">
                    Thích
                  </button>
                  <button className="text-xs font-bold text-slate-400 hover:text-primary">
                    Trả lời
                  </button>
                </div>
              </div>
            </div>

            {/* Comment 2 */}
            <div className="flex gap-3">
              <div className="size-8 rounded-full bg-accent/20 shrink-0 flex items-center justify-center text-accent font-bold text-[10px]">
                LM
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Lý Minh
                  </span>
                  <span className="text-[9px] text-slate-400">
                    2 giờ trước
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl rounded-tl-none bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Từ 你好 dùng cho bạn bè, còn 您好 dùng cho người lớn tuổi đúng không thầy?
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <button className="text-[9px] font-bold text-primary">
                    1 Thích
                  </button>
                  <button className="text-[9px] font-bold text-slate-400 hover:text-primary">
                    Trả lời
                  </button>
                </div>
              </div>
            </div>

            {/* Admin Reply */}
            <div className="flex gap-3">
              <div className="size-8 rounded-full bg-primary shrink-0 flex items-center justify-center text-white font-bold text-[10px]">
                TX
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">
                    TOXI Team
                  </span>
                  <span className="bg-primary/10 text-primary text-[8px] px-1 rounded font-bold">
                    ADMIN
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl rounded-tl-none bg-primary/5 border border-primary/10">
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    Đúng rồi bạn nhé, 您好 là cách gọi trang trọng và tôn kính hơn.
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[9px] font-bold text-slate-400">
                    12 phút trước
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-surface-light dark:bg-surface-dark">
            <div className="relative">
              <textarea
                className="w-full p-3 pr-10 text-[11px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-primary focus:border-primary resize-none placeholder-slate-400 custom-scrollbar"
                placeholder="Viết bình luận của bạn..."
                rows={2}
              />

              <button className="absolute right-2 bottom-2 size-8 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  send
                </span>
              </button>
            </div>

            <div className="flex items-center justify-between mt-2">
              <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[14px]">
                  image
                </span>
                Đính kèm ảnh
              </button>

              <span className="text-xs text-slate-400">
                Gõ @ để nhắc tên
              </span>
            </div>
          </div>

        </aside>
      </div>
    </>
  )
};