import React, { useState } from "react";
export default function FlashcardMain() {
    const [openLeft, setOpenLeft] = useState(false);
    const [openRight, setOpenRight] = useState(false);
    const [view, setView] = useState("video");
    return(
        <>
            <header className="h-14 shrink-0 bg-primary dark:bg-surface-dark border-b border-primary-dark dark:border-slate-800 flex items-center justify-between px-4 md:px-6 z-20 shadow-md">
  
  {/* LEFT */}
  <div className="flex items-center gap-3">

    {/* HAMBURGER – MOBILE ONLY */}
   <button
  onClick={() => setOpenLeft(true)}
  className="md:hidden text-white"
>
      <span className="material-symbols-outlined text-[28px]">
        menu
      </span>
    </button>

    {/* LOGO */}
    <div className="flex items-center gap-3">
      <div className="size-8 bg-white/20 rounded-lg flex items-center justify-center text-white">
        <span className="material-symbols-outlined text-[20px]">
          school
        </span>
      </div>

      <div className="flex flex-col">
        <h2 className="text-white text-lg font-bold leading-none tracking-tight">
          TOXI
        </h2>
        <span className="text-[9px] text-primary-100 font-medium tracking-wider uppercase">
          学以致用
        </span>
      </div>
    </div>
  </div>

  {/* RIGHT */}
  <div className="flex items-center gap-4">
    <button
  onClick={() => setOpenRight(true)}
  className="md:hidden flex items-center justify-center size-8 rounded-lg bg-white/10 text-white hover:bg-white/20"
>
  <span className="material-symbols-outlined text-[20px]">
    forum
  </span>
</button>
    <button className="flex items-center justify-center h-8 px-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold gap-1 transition-colors border border-white/10">
      <span className="material-symbols-outlined text-[16px]">
        translate
      </span>
      <span>VI/CN</span>
    </button>

    <div className="size-8 rounded-full bg-white/20 overflow-hidden border border-white/40 cursor-pointer">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIDl5UhO3nPRg1P8zw2_tF3oA19tTQUjywB45B3W6DR1lctL2G9TldR0bSzFmBicGNkYvHp5JbtzlEu8J2YAXOJMIJlpSINaVlT_vgiZpeF99TNDeNuUk7Z5lleTR5HiJad72meZnEcARo8aXOXPmx-GyWJ2Bfeo-Yy8Wjw__FxsswCG8tMxEUWx6N7ZCEqAw6fLzDv_21KFQrGLH-cTfKuFxwrZhnKawTONeKOHrGA7Zg71V7ZUu26kbm3K-uNl7sjY0RqyxJRF4"
        alt="User Profile"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</header>
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
                  Hán ngữ Cơ bản 1
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
    setView("flashcards");
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
      <div className="max-w-3xl mx-auto flex flex-col h-full">

        {/* Header + Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
                Học từ vựng
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Flashcards: Chào hỏi
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500">
                Tiến độ: <span className="text-primary">5/20</span>
              </span>
            </div>
          </div>

          <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: "25%" }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="flex-1 flex flex-col items-center justify-center gap-12 py-8">
          <div className="flashcard-container w-full max-w-lg aspect-[4/3] perspective-1000">
            <div className="flashcard-inner group relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:scale-105">

              {/* Front */}
              <div className="flashcard-front absolute inset-0 w-full h-full bg-gradient-to-br from-surface-light to-slate-50 dark:from-surface-dark dark:to-slate-900 rounded-3xl border-2 border-primary/20 dark:border-primary/30 shadow-2xl overflow-hidden bg-cloud-pattern bg-repeat flex flex-col items-center justify-center backface-hidden">
                <div className="absolute top-6 left-6 size-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary/60">school</span>
                </div>

                <div className="absolute bottom-6 right-6 size-12 bg-secondary/10 rounded-full flex items-center justify-center rotate-180">
                  <span className="material-symbols-outlined text-secondary/60">filter_vintage</span>
                </div>

                <div className="text-center">
                  <h3 className="text-8xl font-black text-primary dark:text-accent tracking-tighter mb-4 drop-shadow-lg">
                    你好
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-base font-medium animate-pulse">
                    Nhấp để lật thẻ
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-primary/30 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                    <span className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="flashcard-back absolute inset-0 w-full h-full bg-gradient-to-br from-primary to-primary-dark rounded-3xl border-2 border-primary-dark shadow-2xl overflow-hidden p-8 text-center backface-hidden rotate-y-180 flex flex-col justify-center">
                <div className="absolute top-6 left-6 text-white/20">
                  <span className="material-symbols-outlined text-2xl">format_quote</span>
                </div>

                <div className="flex flex-col items-center space-y-6">
                  <div>
                    <span className="text-3xl font-bold text-accent mb-2 block">
                      Nǐ hǎo
                    </span>
                    <h3 className="text-4xl font-black text-white mb-2">
                      Chào bạn
                    </h3>
                    <div className="w-16 h-1 bg-accent/50 rounded-full mx-auto"></div>
                  </div>

                  <div className="w-full bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <p className="text-[10px] uppercase font-bold text-white/70 tracking-widest mb-3">
                      Ví dụ sử dụng
                    </p>
                    <p className="text-white text-lg leading-relaxed italic font-medium mb-2">
                      "你好，很高兴认识你。"
                    </p>
                    <p className="text-white/80 text-sm">
                      (Chào bạn, rất vui được làm quen với bạn.)
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-6 w-full max-w-lg">
            <button className="flex-1 h-16 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-2 border-red-200 dark:border-red-700/50 rounded-2xl flex items-center justify-center gap-3 text-red-600 dark:text-red-400 hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/30 dark:hover:to-red-800/30 transition-all font-bold group shadow-lg hover:shadow-xl">
              <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                close
              </span>
              <span className="text-base">Chưa thuộc</span>
            </button>

            <button className="size-20 bg-gradient-to-r from-accent to-yellow-400 text-primary-dark rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-[36px]">
                sync
              </span>
            </button>

            <button className="flex-1 h-16 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-200 dark:border-green-700/50 rounded-2xl flex items-center justify-center gap-3 text-green-600 dark:text-green-400 hover:from-green-100 hover:to-green-200 dark:hover:from-green-900/30 dark:hover:to-green-800/30 transition-all font-bold group shadow-lg hover:shadow-xl">
              <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                check
              </span>
              <span className="text-base">Đã thuộc</span>
            </button>
          </div>
        </div>

        {/* Footer navigation */}
        <div className="mt-auto py-6 flex items-center justify-center gap-6">
          <button className="size-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <span className="text-xs font-bold text-slate-400">
            Thẻ 05 / 20
          </span>

          <button className="size-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
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