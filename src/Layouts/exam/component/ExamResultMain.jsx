import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/image/LOGO (1).png';
export default function ExamResultMain({ selectedExamResult }) {
    const navigate = useNavigate();
    return(
        <>
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
       <main className="flex-grow">
      {/* Header / Summary Section */}
      <div className="relative bg-primary bg-chinese-pattern text-white pt-8 pb-20">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/95"></div>

        <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-xs mb-6 font-medium">
            <a className="hover:text-white transition-colors" href="#">
              Trang chủ
            </a>
            <span className="material-symbols-outlined text-[10px]">
              arrow_forward_ios
            </span>
            <a className="hover:text-white transition-colors" href="#">
              Thi thử HSK 4
            </a>
            <span className="material-symbols-outlined text-[10px]">
              arrow_forward_ios
            </span>
            <span className="text-white">Kết quả</span>
          </div>

          {/* Header Content */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 bg-accent text-primary font-bold text-xs rounded uppercase tracking-wider">
                  Đề số 15
                </span>

                <span className="text-white/80 text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    schedule
                  </span>
                  24/05/2024
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
                Kết quả thi thử HSK 4
              </h1>

              <p className="text-white/80 max-w-2xl">
                Chúc mừng bạn đã hoàn thành bài thi! Hãy xem lại chi tiết lỗi sai
                và lời giải thích để cải thiện kỹ năng.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all">
                <span className="material-symbols-outlined text-[20px]">
                  download
                </span>
                Tải PDF
              </button>

              <button className="bg-accent hover:bg-yellow-400 text-primary-dark px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-accent/20 flex items-center gap-2 transition-all">
                <span className="material-symbols-outlined text-[20px]">
                  replay
                </span>
                Làm lại bài
              </button>
            </div>
          </div>
        </div>
      </div>
       {/* Dashboard Content Container (Overlapping Header) */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-12">
        {/* Overall Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          
          {/* Total Score */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">
                emoji_events
              </span>
            </div>

            <p className="text-slate-500 font-medium text-sm mb-1 uppercase tracking-wider">
              Tổng điểm
            </p>

            <div className="text-5xl font-black text-primary mb-2 tracking-tight">
              245
              <span className="text-2xl text-slate-400 font-normal">
                /300
              </span>
            </div>

            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
              ĐẠT (PASS)
            </span>
          </div>

          {/* Listening */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 p-1.5 rounded-md material-symbols-outlined text-[20px]">
                  headphones
                </span>
                <span className="font-bold text-slate-700">
                  Nghe hiểu
                </span>
              </div>

              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                +5% so với TB
              </span>
            </div>

            <div className="mt-auto">
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-slate-800">
                  85
                  <span className="text-sm text-slate-400 font-normal">
                    /100
                  </span>
                </span>
                <span className="text-sm font-bold text-blue-600">
                  85%
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "85%" }}
                />
              </div>
            </div>
          </div>

          {/* Reading */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-purple-100 text-purple-600 p-1.5 rounded-md material-symbols-outlined text-[20px]">
                  menu_book
                </span>
                <span className="font-bold text-slate-700">
                  Đọc hiểu
                </span>
              </div>

              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                +10% so với TB
              </span>
            </div>

            <div className="mt-auto">
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-slate-800">
                  90
                  <span className="text-sm text-slate-400 font-normal">
                    /100
                  </span>
                </span>
                <span className="text-sm font-bold text-purple-600">
                  90%
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: "90%" }}
                />
              </div>
            </div>
          </div>
        {/* Writing */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-orange-100 text-orange-600 p-1.5 rounded-md material-symbols-outlined text-[20px]">
              edit
            </span>
            <span className="font-bold text-slate-700">Viết</span>
          </div>
          <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded">
            -2% so với TB
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-bold text-slate-800">
              70
              <span className="text-sm text-slate-400 font-normal">/100</span>
            </span>
            <span className="text-sm font-bold text-orange-500">70%</span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: "70%" }}
            />
          </div>
        </div>
      </div>
   </div>
      {/* Main Layout: Review & Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        {/* Left: Question Review List */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Filter Toolbar */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-wrap items-center justify-between gap-4 sticky top-[70px] z-30">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <h3 className="font-bold text-slate-700 mr-2 whitespace-nowrap">
                Xem lại bài thi:
              </h3>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium whitespace-nowrap shadow-sm shadow-primary/30">
                Tất cả (40)
              </button>
              <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 text-sm font-medium whitespace-nowrap transition-colors">
                Sai (5)
              </button>
              <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 text-sm font-medium whitespace-nowrap transition-colors">
                Đúng (35)
              </button>
              <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 text-sm font-medium whitespace-nowrap transition-colors">
                Chưa làm (0)
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 ml-auto">
              <span className="w-3 h-3 rounded-full bg-green-500" /> Đúng
              <span className="w-3 h-3 rounded-full bg-red-500 ml-2" /> Sai
            </div>
          </div>

          {/* Question 1 */}
          <div
            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
            id="q1"
          >
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="bg-primary/10 text-primary font-bold px-2.5 py-1 rounded text-sm">
                  Câu 1
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Nghe hiểu - Phần 1
                </span>
              </div>
              <span className="material-symbols-outlined text-green-500">
                check_circle
              </span>
            </div>

            <div className="p-6">
              {/* Audio Player */}
              <div className="flex items-center gap-4 bg-slate-50 rounded-lg p-3 border border-slate-200 mb-6 w-full max-w-md">
                <button className="size-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors shadow-sm">
                  <span className="material-symbols-outlined">
                    play_arrow
                  </span>
                </button>

                <div className="flex-1">
                  <div className="h-1 bg-slate-200 rounded-full w-full mb-1">
                    <div className="h-1 bg-primary w-1/3 rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 size-3 bg-primary rounded-full shadow cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>00:12</span>
                    <span>00:35</span>
                  </div>
                </div>

                <span className="material-symbols-outlined text-slate-400">
                  volume_up
                </span>
              </div>

              <p className="mb-4 text-slate-800 font-medium">
                Nghe đoạn hội thoại và chọn bức tranh đúng:
              </p>

              {/* Answers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer opacity-50">
                  <div className="size-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    A
                  </div>
                  <div className="text-sm font-chinese">图片 A</div>
                </label>

                <label className="relative flex items-center gap-3 p-3 rounded-lg border-2 border-green-500 bg-green-50 cursor-pointer">
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-0.5 shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">
                      check
                    </span>
                  </div>
                  <div className="size-5 rounded-full bg-green-500 border border-green-500 flex items-center justify-center text-[10px] font-bold text-white">
                    B
                  </div>
                  <div className="text-sm font-chinese text-slate-800">
                    图片 B
                  </div>
                  <span className="ml-auto text-xs font-bold text-green-600">
                    Bạn đã chọn
                  </span>
                </label>

                <label className="relative flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer opacity-50">
                  <div className="size-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    C
                  </div>
                  <div className="text-sm font-chinese">图片 C</div>
                </label>
              </div>

              {/* Explanation */}
              <div className="mt-6 bg-yellow-50/50 rounded-lg border border-accent/20 overflow-hidden">
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-accent/5 transition-colors group/exp">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent">
                      lightbulb
                    </span>
                    <span className="text-sm font-bold text-primary-dark">
                      Giải thích chi tiết
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 group-hover/exp:text-slate-600">
                    expand_more
                  </span>
                </button>

                <div className="px-4 pb-4 pt-0 text-sm text-slate-600">
                  <p className="mb-2">
                    <strong>Đáp án đúng: B</strong>
                  </p>
                  <p>
                    Trong đoạn hội thoại, nhân vật nam nói:{" "}
                    <span className="font-chinese text-primary">
                      今天天气真好，我们去公园散步吧。
                    </span>{" "}
                    (Hôm nay thời tiết thật tốt, chúng ta đi công viên đi dạo
                    nhé).
                  </p>
                  <p className="mt-2 text-xs text-slate-500 italic">
                    Từ khóa: <span className="font-chinese">天气</span>,{" "}
                    <span className="font-chinese">公园</span>,{" "}
                    <span className="font-chinese">散步</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Question 2: Reading (Incorrect) */}
      <div
        className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
        id="q2"
      >
        {/* Header */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary font-bold px-2.5 py-1 rounded text-sm">
              Câu 2
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Đọc hiểu - Phần 1
            </span>
          </div>
          <span className="material-symbols-outlined text-red-500">
            cancel
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Question Text */}
          <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="font-chinese text-lg leading-loose text-slate-800">
              经理，我这几天的身体不太舒服，想请两天假，去医院看一看。
            </p>
            <p className="text-sm text-slate-500 mt-2 italic font-serif">
              "Giám đốc, mấy hôm nay sức khỏe tôi không tốt lắm, muốn xin nghỉ hai
              ngày để đi bệnh viện khám."
            </p>
          </div>

          <p className="mb-4 text-slate-800 font-medium">
            Chọn từ điền vào chỗ trống tương ứng với nội dung trên:
          </p>

          {/* Answers */}
          <div className="grid grid-cols-1 gap-3">
            {/* Wrong Selected */}
            <label className="relative flex items-center gap-3 p-3 rounded-lg border-2 border-red-500 bg-red-50 cursor-pointer">
              <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-0.5 shadow-sm">
                <span className="material-symbols-outlined text-[16px]">
                  close
                </span>
              </div>

              <div className="size-5 rounded-full bg-red-500 border border-red-500 flex items-center justify-center text-[10px] font-bold text-white">
                A
              </div>

              <div className="flex-1">
                <div className="text-base font-chinese font-bold text-slate-800">
                  生病
                </div>
                <div className="text-xs text-slate-500">
                  shēng bìng (bị ốm)
                </div>
              </div>

              <span className="text-xs font-bold text-red-600">
                Bạn đã chọn
              </span>
            </label>

            {/* Correct Answer */}
            <label className="relative flex items-center gap-3 p-3 rounded-lg border-2 border-green-500 bg-green-50 cursor-pointer">
              <div className="size-5 rounded-full bg-green-500 border border-green-500 flex items-center justify-center text-[10px] font-bold text-white">
                B
              </div>

              <div className="flex-1">
                <div className="text-base font-chinese font-bold text-slate-800">
                  请假
                </div>
                <div className="text-xs text-slate-500">
                  qǐng jià (xin nghỉ phép)
                </div>
              </div>

              <span className="text-xs font-bold text-green-600">
                Đáp án đúng
              </span>
            </label>

            {/* Normal */}
            <label className="relative flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
              <div className="size-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-400">
                C
              </div>

              <div className="flex-1">
                <div className="text-base font-chinese font-bold text-slate-800">
                  医院
                </div>
                <div className="text-xs text-slate-500">
                  yī yuàn (bệnh viện)
                </div>
              </div>
            </label>
          </div>

          {/* Explanation (Auto Expanded) */}
          <div className="mt-6 bg-yellow-50/50 rounded-lg border border-accent/20 overflow-hidden">
            <div className="p-4 text-sm text-slate-600">
              <div className="flex items-center gap-2 mb-3 text-primary-dark">
                <span className="material-symbols-outlined text-accent">
                  lightbulb
                </span>
                <span className="font-bold">Tại sao bạn sai?</span>
              </div>

              <p className="mb-2">
                <strong>Đáp án đúng: B (请假)</strong>
              </p>

              <p className="mb-2">
                Mặc dù câu có nhắc đến việc cơ thể không thoải mái (giống ý nghĩa
                "Sinh bệnh" - A) và đi bệnh viện (C), nhưng hành động chính mà
                người nói đang thực hiện với "Giám đốc" là{" "}
                <strong>xin nghỉ phép</strong>.
              </p>

              <p>
                Câu{" "}
                <span className="font-chinese">
                  想请两天假
                </span>{" "}
                chứa trực tiếp từ khóa{" "}
                <span className="font-chinese font-bold text-primary">
                  请假
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
        </div>
         {/* Right: Navigator & Sticky Sidebar */}
      <div className="lg:col-span-4 flex flex-col gap-6 sticky top-[70px]">
        {/* Performance Summary Mini-Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              bar_chart
            </span>
            Biểu đồ năng lực
          </h3>

          <div className="grid grid-cols-3 gap-4 items-end h-32 px-2">
            {/* Listening */}
            <div className="flex flex-col items-center gap-2 h-full justify-end group cursor-help relative">
              <div className="text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-6">
                85
              </div>
              <div className="w-full bg-blue-100 rounded-t-md relative h-full flex items-end overflow-hidden">
                <div className="w-full bg-primary transition-all duration-1000 ease-out h-[85%] rounded-t-md" />
              </div>
              <span className="text-xs font-medium text-slate-500">Nghe</span>
            </div>

            {/* Reading */}
            <div className="flex flex-col items-center gap-2 h-full justify-end group cursor-help relative">
              <div className="text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-6">
                90
              </div>
              <div className="w-full bg-purple-100 rounded-t-md relative h-full flex items-end overflow-hidden">
                <div className="w-full bg-purple-500 transition-all duration-1000 ease-out h-[90%] rounded-t-md" />
              </div>
              <span className="text-xs font-medium text-slate-500">Đọc</span>
            </div>

            {/* Writing */}
            <div className="flex flex-col items-center gap-2 h-full justify-end group cursor-help relative">
              <div className="text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-6">
                70
              </div>
              <div className="w-full bg-orange-100 rounded-t-md relative h-full flex items-end overflow-hidden">
                <div className="w-full bg-orange-500 transition-all duration-1000 ease-out h-[70%] rounded-t-md" />
              </div>
              <span className="text-xs font-medium text-slate-500">Viết</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Đánh giá chung:{" "}
              <span className="font-bold text-primary">Khá Tốt</span>
            </p>
          </div>
        </div>

        {/* Question Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
            <span>Danh sách câu hỏi</span>
            <span className="text-xs font-normal bg-slate-100 px-2 py-1 rounded text-slate-500">
              40 câu
            </span>
          </h3>

          <div className="mb-4 text-xs flex gap-3 text-slate-500">
            <div className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-green-500" /> Đúng
            </div>
            <div className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-red-500" /> Sai
            </div>
            <div className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-slate-200" /> Chưa làm
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-5 gap-2">
            {/* Example items */}
            <a
              href="#q1"
              className="aspect-square flex items-center justify-center rounded bg-green-100 text-green-700 hover:bg-green-200 text-xs font-medium transition-colors border border-green-200"
            >
              1
            </a>

            <a
              href="#q2"
              className="aspect-square flex items-center justify-center rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs font-medium transition-colors border border-red-200 ring-2 ring-red-500 ring-offset-1"
            >
              2
            </a>

            <a className="aspect-square flex items-center justify-center rounded bg-green-100 text-green-700 hover:bg-green-200 text-xs font-medium transition-colors border border-green-200">
              3
            </a>
            <a className="aspect-square flex items-center justify-center rounded bg-green-100 text-green-700 hover:bg-green-200 text-xs font-medium transition-colors border border-green-200">
              4
            </a>
            <a className="aspect-square flex items-center justify-center rounded bg-green-100 text-green-700 hover:bg-green-200 text-xs font-medium transition-colors border border-green-200">
              5
            </a>

            <div className="col-span-full mt-2 pt-2 border-t border-slate-100 text-center text-xs text-slate-400">
              ...
            </div>
          </div>
        </div>

        {/* Promo Card */}
        <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-white/10 group-hover:text-white/20 transition-colors">
            <span className="material-symbols-outlined text-[120px]">
              school
            </span>
          </div>

          <h4 className="font-bold text-lg mb-2 relative z-10">
            Luyện thi HSK 5?
          </h4>
          <p className="text-sm text-white/80 mb-4 relative z-10">
            Nâng cao trình độ với khóa học HSK 5 chuyên sâu của TOXI.
          </p>

          <button className="w-full py-2 bg-accent hover:bg-yellow-400 text-primary-dark font-bold text-sm rounded shadow-lg transition-colors relative z-10">
            Xem khóa học
          </button>
        </div>
      </div>
      </div>
        </div>
    </main>
        </>
    )
};