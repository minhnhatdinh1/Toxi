import react from "react";
import logo from '../../../assets/image/LOGO (1).png'
import { Link, useNavigate } from "react-router-dom";

export default function ExamMain({ selectedExam }) {
    const navigate = useNavigate();
    // Nếu không có selectedExam, sử dụng dữ liệu mặc định
    const examData = selectedExam || {
        id: 1,
        title: 'Đề thi HSK 1 - Mã đề 101',
        level: 'HSK 1 • Sơ cấp',
        description: 'Khởi đầu hành trình với 150 từ vựng căn bản',
        duration: '35 Phút',
        questions: '40 Câu'
    };

    return(
        <>
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-chinese-pattern overflow-x-hidden">
      {/* Header */}
       <div className="max-w-5xl mx-auto bg-white dark:bg-surface-dark shadow-sm z-50 sticky top-0">
       <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">
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
          {/* CART */}
          <div className="relative group cursor-pointer">
          <button className="flex-[1.5] px-8 py-5 bg-primary text-secondary font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 group">
      
      <span
        className="material-symbols-outlined group-hover:scale-110 transition-transform cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // không trigger click của button
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
          <button className="md:hidden text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
      </div>
           <main className="layout-container flex flex-col flex-1 w-full px-4 md:px-6 lg:px-10 py-6 md:py-8 gap-6">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-text-secondary dark:text-gray-400 overflow-x-auto">
        <a className="hover:text-primary dark:hover:text-primary-light transition-colors whitespace-nowrap" href="#">
          Trang chủ
        </a>
        <span className="material-symbols-outlined text-sm sm:text-[16px] flex-shrink-0">chevron_right</span>
        <a className="hover:text-primary dark:hover:text-primary-light transition-colors whitespace-nowrap" href="#">
          Học tập
        </a>
        <span className="material-symbols-outlined text-sm sm:text-[16px] flex-shrink-0">chevron_right</span>
        <span className="font-medium text-text-main dark:text-white whitespace-nowrap">
          Bài tập Kỹ năng
        </span>
      </div>

      {/* Page Heading & Stats */}
      <div className="flex flex-col sm:gap-4 md:flex-row md:items-end md:justify-between gap-3">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-main dark:text-white tracking-tight">
            {examData.title}
            <span className="font-normal font-serif text-primary text-xl sm:text-2xl ml-1 sm:ml-2 block sm:inline">
              {examData.level}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary dark:text-gray-400 flex items-center gap-1 sm:gap-2">
            <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent flex-shrink-0"></span>
            <span className="line-clamp-2">{examData.description}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 bg-white dark:bg-surface-dark px-3 sm:px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="flex flex-col items-center px-1.5 sm:px-2 border-r border-gray-100 dark:border-gray-700">
            <span className="text-[10px] sm:text-xs text-text-secondary uppercase font-bold tracking-wider">
              Thời gian
            </span>
            <span className="text-primary font-bold text-base sm:text-lg">{examData.duration}</span>
          </div>

          <div className="flex flex-col items-center px-1.5 sm:px-2">
            <span className="text-[10px] sm:text-xs text-text-secondary uppercase font-bold tracking-wider">
              Số câu
            </span>
            <span className="text-accent font-bold text-base sm:text-lg flex items-center gap-0.5 sm:gap-1">
              <span className="material-symbols-outlined text-xs sm:text-sm">list_alt</span>
              <span>{examData.questions}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-[64px] sm:top-[72px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm pt-1 sm:pt-2 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex overflow-x-auto pb-2 gap-1 sm:gap-2 hide-scrollbar md:gap-4 border-b border-gray-200 dark:border-gray-800">
          <button className="group flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 border-b-2 border-primary text-primary bg-white/50 dark:bg-surface-dark/50 rounded-t-lg transition-all text-xs sm:text-base">
            <span className="material-symbols-outlined filled text-base sm:text-lg">headphones</span>
            <span className="font-bold whitespace-nowrap hidden sm:inline">Nghe (听)</span>
            <span className="font-bold whitespace-nowrap sm:hidden">Nghe</span>
          </button>

          <button className="group flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 border-b-2 border-transparent text-text-secondary hover:text-text-main hover:bg-white/30 dark:hover:bg-surface-dark/30 rounded-t-lg transition-all text-xs sm:text-base">
            <span className="material-symbols-outlined text-base sm:text-lg">mic</span>
            <span className="font-medium whitespace-nowrap hidden sm:inline">Nói (说)</span>
            <span className="font-medium whitespace-nowrap sm:hidden">Nói</span>
          </button>

          <button className="group flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 border-b-2 border-transparent text-text-secondary hover:text-text-main hover:bg-white/30 dark:hover:bg-surface-dark/30 rounded-t-lg transition-all text-xs sm:text-base">
            <span className="material-symbols-outlined text-base sm:text-lg">menu_book</span>
            <span className="font-medium whitespace-nowrap hidden sm:inline">Đọc (读)</span>
            <span className="font-medium whitespace-nowrap sm:hidden">Đọc</span>
          </button>

          <button className="group flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 border-b-2 border-transparent text-text-secondary hover:text-text-main hover:bg-white/30 dark:hover:bg-surface-dark/30 rounded-t-lg transition-all text-xs sm:text-base">
            <span className="material-symbols-outlined text-base sm:text-lg">edit_square</span>
            <span className="font-medium whitespace-nowrap hidden sm:inline">Viết (写)</span>
            <span className="font-medium whitespace-nowrap sm:hidden">Viết</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 min-h-[600px]">
        
        {/* Left Column */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-3 sm:gap-4">
          <div className="bg-white dark:bg-surface-dark rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-800 h-full">
            <h3 className="font-bold text-sm sm:text-base text-text-main dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">list_alt</span>
              <span className="truncate">Danh sách câu hỏi</span>
            </h3>

            <div className="grid grid-cols-6 sm:grid-cols-4 gap-1 sm:gap-2">
              <button className="aspect-square rounded-lg bg-primary text-white font-bold flex items-center justify-center shadow-md shadow-primary/30 transition-transform hover:scale-105">
                1
              </button>

              <button className="aspect-square rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold flex items-center justify-center border border-green-200 dark:border-green-800">
                <span className="material-symbols-outlined text-lg">check</span>
              </button>

              {[3, 4, 5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  className="aspect-square rounded-lg bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 font-medium flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Tip */}
            <div className="mt-8 p-4 bg-accent-light dark:bg-yellow-900/20 rounded-xl border border-accent/20">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400 mt-1">
                  lightbulb
                </span>
                <div>
                  <p className="text-xs font-bold text-yellow-800 dark:text-yellow-300 uppercase mb-1">
                    Mẹo nhỏ
                  </p>
                  <p className="text-sm text-yellow-900 dark:text-yellow-200 leading-relaxed">
                    Chú ý đến thanh điệu (tone) khi nghe. Từ "mā" (mẹ) khác hoàn toàn
                    với "mǎ" (ngựa).
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
           <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-3 sm:gap-6">

      {/* Question Card */}
      <div className="bg-white dark:bg-surface-dark rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col flex-1 relative group/card">

        {/* Header */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 bg-gray-50/50 dark:bg-gray-800/30">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 w-fit">
            <span className="material-symbols-outlined text-sm">headphones</span>
            <span className="hidden sm:inline">Nghe hiểu</span>
            <span className="sm:hidden">Nghe</span>
          </span>

          <div className="flex items-center gap-1 sm:gap-2 text-text-secondary text-xs sm:text-sm font-medium">
            <span className="material-symbols-outlined text-base sm:text-lg">timer</span>
            <span>04:12</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 md:gap-8">

          {/* Question */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-text-main dark:text-white leading-snug mb-1 sm:mb-2">
              Nghe đoạn hội thoại và chọn bức tranh tương ứng với nội dung.
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-text-secondary dark:text-gray-400">
              (Listen to the dialogue and choose the picture that corresponds to the content)
            </p>
          </div>

          {/* Audio Player */}
          <div className="flex items-center gap-2 sm:gap-4 bg-primary/5 dark:bg-primary/10 p-2 sm:p-4 rounded-lg sm:rounded-xl border border-primary/10">
            <button className="size-9 sm:size-12 rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex-shrink-0">
              <span className="material-symbols-outlined text-xl sm:text-3xl">play_arrow</span>
            </button>

            <div className="flex-1 flex flex-col gap-0.5 sm:gap-1 min-w-0">
              <div className="flex justify-between text-xs font-bold text-primary dark:text-blue-300 gap-2">
                <span className="hidden sm:inline">Playing</span>
                <span className="text-[10px] sm:text-xs">00:14 / 00:45</span>
              </div>

              <div className="h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden w-full cursor-pointer relative group/track">
                <div className="absolute h-full w-1/3 bg-primary rounded-full">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 size-2 sm:size-3 bg-white border-2 border-primary rounded-full shadow opacity-0 group-hover/track:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>

            <button className="text-text-secondary hover:text-primary transition-colors flex-shrink-0">
              <span className="material-symbols-outlined text-xl sm:text-2xl">volume_up</span>
            </button>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">

            {/* Option A */}
            <label className="cursor-pointer group relative">
              <input type="radio" name="answer" className="peer sr-only" />
              <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 transition-all peer-checked:border-primary peer-checked:shadow-lg peer-checked:shadow-primary/20 hover:border-primary/50">
                <div
                  className="w-full rounded-lg bg-cover bg-center h-40 sm:h-48 md:h-56"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBpXsT4FqR19SBR4lwyNEolGnNhLY-YW7Z44KuAf5xILVKQqDhBqXGUPs_15OPaZb9_0teJx0zjUiyJj40Acg43F57IOKxfFVZG5ywkNBo_aEum_lJD9owZPZhzWZYhlt6wTYDf8Rx3jJk4DEbArlT4MVDmprgrBuVdLtDKpFspKx4_JwCKDSzxEfgfuVAFN5hq5zqoRo1e8zPogyhvj2xRewxuEC7K-rmKvToFv8q3TNI8PCLtQ2g4Wo3LTlfjKpHEI90ItnoP4qM")',
                  }}
                />
                <div className="absolute top-3 left-3 size-8 rounded-full bg-white/90 backdrop-blur text-text-main font-bold flex items-center justify-center border border-gray-200 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary">
                  A
                </div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </label>

            {/* Option B */}
            <label className="cursor-pointer group relative">
              <input type="radio" name="answer" className="peer sr-only" />
              <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 transition-all peer-checked:border-primary peer-checked:shadow-lg peer-checked:shadow-primary/20 hover:border-primary/50">
                <div
                  className="w-full rounded-lg bg-cover bg-center h-40 sm:h-48 md:h-56"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYOIjKYsqFlrLsygoyfNwfbD4elzsF9oTHsBLXzjTu1xdPdIafnPibr7mVcdY4-ymQvQJz9ahBK70bphg8T6HsADZXyrwXQJO1MdGcifreu8fJTcaH5cq4gUAbYJXQhFaWtCcVz3imtppXHXMILwxA03xUQrmrBfBwpwKmt_wWWVOAYOcg5MOVR42c-7gDPCGBqtMHRH-aX7QvSeKUXVlotGL1ms6_t8YSSugkYKTYRBwZxLvffwO9DZF0J6VRdiUyG_q8UHcymFY")',
                  }}
                />
                <div className="absolute top-3 left-3 size-8 rounded-full bg-white/90 backdrop-blur text-text-main font-bold flex items-center justify-center border border-gray-200 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary">
                  B
                </div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </label>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
          <button className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-text-secondary font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base">
            <span className="material-symbols-outlined text-lg sm:text-xl">arrow_back</span>
            <span className="hidden sm:inline">Trước</span>
          </button>

          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-white border border-gray-300 text-text-main font-bold hover:bg-gray-50 dark:bg-transparent dark:border-gray-600 dark:text-white dark:hover:bg-gray-800 transition-colors text-xs sm:text-base">
              <span className="hidden sm:inline">Xem đáp án</span>
              <span className="sm:hidden">Đáp án</span>
            </button>

            <button type="button" onClick={() => navigate('/ExamResult', { state: { selectedExam: examData } })} className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-8 py-2 sm:py-2.5 rounded-lg bg-primary text-white font-bold shadow-md shadow-primary/30 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/40 transition-all active:scale-95 text-xs sm:text-base">
              <span className="hidden sm:inline">Nộp bài</span>
              <span className="sm:hidden">Nộp</span>
              <span className="material-symbols-outlined text-sm sm:text-lg">send</span>
            </button>
          </div>
        </div>

        {/* Feedback Overlay */}
        <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 max-w-xs sm:max-w-sm bg-white dark:bg-surface-dark rounded-lg sm:rounded-xl shadow-2xl shadow-green-900/10 border-2 border-green-500 overflow-hidden transform translate-y-2 opacity-0 pointer-events-none group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 z-10">
          <div className="bg-green-500 px-3 sm:px-4 py-1.5 sm:py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
            <span className="text-white font-bold flex items-center gap-1 sm:gap-2 text-xs sm:text-base">
              <span className="material-symbols-outlined text-lg sm:text-xl">check_circle</span>
              Chính xác!
            </span>
            <span className="text-white/80 text-[10px] sm:text-xs font-medium">Earned +15xp</span>
          </div>

          <div className="p-2.5 sm:p-4">
            <p className="text-text-main dark:text-white text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">
              Đáp án: B (Thư viện)
            </p>
            <p className="text-text-secondary text-[10px] sm:text-xs leading-relaxed">
              Trong đoạn hội thoại, nhân vật nhắc đến "tushuguan" (图书馆) nghĩa là thư viện.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6 pb-6">
      {/* Speaking Card Mini */}
      <div className="group bg-white dark:bg-surface-dark rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-2 sm:mb-4">
          <div className="size-8 sm:size-10 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-lg sm:text-xl">mic</span>
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase whitespace-nowrap ml-1">
            Nói (Speaking)
          </span>
        </div>

        <h4 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2 text-text-main dark:text-white">
          Luyện phát âm từ vựng
        </h4>
        <p className="text-xs sm:text-sm text-text-secondary mb-2 sm:mb-4 line-clamp-2">
          Ghi âm và nhận phản hồi AI về độ chính xác của thanh điệu.
        </p>

        <div className="flex items-center gap-1 sm:gap-2 text-primary font-bold text-xs sm:text-sm group-hover:underline">
          Bắt đầu ngay
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </div>
      </div>

      {/* Writing Card Mini */}
      <div className="group bg-white dark:bg-surface-dark rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-2 sm:mb-4">
          <div className="size-8 sm:size-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-lg sm:text-xl">edit_square</span>
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase whitespace-nowrap ml-1">
            Viết (Writing)
          </span>
        </div>

        <h4 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2 text-text-main dark:text-white">
          Sắp xếp câu hoàn chỉnh
        </h4>
        <p className="text-xs sm:text-sm text-text-secondary mb-2 sm:mb-4 line-clamp-2">
          Kéo thả các từ để tạo thành câu đúng ngữ pháp HSK 3.
        </p>

        <div className="flex items-center gap-1 sm:gap-2 text-primary font-bold text-xs sm:text-sm group-hover:underline">
          Bắt đầu ngay
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </div>
      </div>

      {/* Reading Card Mini */}
      <div className="group bg-white dark:bg-surface-dark rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-2 sm:mb-4">
          <div className="size-8 sm:size-10 rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-lg sm:text-xl">menu_book</span>
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase whitespace-nowrap ml-1">
            Đọc (Reading)
          </span>
        </div>

        <h4 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2 text-text-main dark:text-white">
          Đọc hiểu đoạn văn ngắn
        </h4>
        <p className="text-xs sm:text-sm text-text-secondary mb-2 sm:mb-4 line-clamp-2">
          Trả lời câu hỏi trắc nghiệm dựa trên nội dung bài đọc về văn hóa.
        </p>

        <div className="flex items-center gap-1 sm:gap-2 text-primary font-bold text-xs sm:text-sm group-hover:underline">
          Bắt đầu ngay
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </div>
      </div>
    </div>
      </main>
    </div>
    
        </>
    )
};