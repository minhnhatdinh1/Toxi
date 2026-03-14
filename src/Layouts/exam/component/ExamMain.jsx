import react, { useState, useEffect } from "react";
import logo from '../../../assets/image/LOGO (1).png'
import { Link, useNavigate } from "react-router-dom";

export default function ExamMain({ selectedExam }) {
    const navigate = useNavigate();
    
    // State Management
    const [activeTab, setActiveTab] = useState('listening'); // listening, speaking, reading, writing
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userAnswers, setUserAnswers] = useState({}); // { questionId: answer }
    const [timeRemaining, setTimeRemaining] = useState(2100); // 35 minutes in seconds
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [examProgress, setExamProgress] = useState({
        correct: 1,
        answered: 1,
        skipped: 0
    });

    // Auto-save answer when selected
    useEffect(() => {
        if (selectedAnswer !== null) {
            setUserAnswers(prev => ({
                ...prev,
                [currentQuestion]: selectedAnswer
            }));
        }
    }, [selectedAnswer, currentQuestion]);

    // Timer countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, []);

    // Format time display
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle tab switch
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentQuestion(1);
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
    };

    // Handle next question
    const handleNextQuestion = () => {
        if (currentQuestion < 40) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(userAnswers[currentQuestion + 1] || null);
            setIsAnswerSubmitted(false);
        }
    };

    // Handle previous question
    const handlePreviousQuestion = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(userAnswers[currentQuestion - 1] || null);
            setIsAnswerSubmitted(false);
        }
    };

    // Handle submit answer (show feedback)
    const handleSubmitAnswer = () => {
        if (selectedAnswer !== null) {
            setIsAnswerSubmitted(true);
            // Update progress
            setExamProgress(prev => ({
                ...prev,
                correct: selectedAnswer === 'B' ? prev.correct + 1 : prev.correct
            }));
        }
    };

    // Handle submit exam
    const handleSubmitExam = () => {
        navigate('/ExamResult', { state: { selectedExam: examData, userAnswers, timeRemaining } });
    };

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
      
           <main className="layout-container flex flex-col flex-1 w-full px-4 md:px-6 lg:px-10 py-6 md:py-8 gap-6">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-text-secondary dark:text-gray-400 overflow-x-auto">
        <a className="hover:text-primary dark:hover:text-primary-light transition-colors whitespace-nowrap" href="/Home">
          Trang chủ
        </a>
        <span className="material-symbols-outlined text-sm sm:text-[16px] flex-shrink-0">chevron_right</span>
        <a className="hover:text-primary dark:hover:text-primary-light transition-colors whitespace-nowrap" href="/Practice">
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
          <button 
            onClick={() => handleTabChange('listening')}
            className={`group flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 border-b-2 rounded-t-lg transition-all text-xs sm:text-base ${
              activeTab === 'listening'
                ? 'border-primary text-primary bg-white/50 dark:bg-surface-dark/50'
                : 'border-transparent text-text-secondary hover:text-text-main hover:bg-white/30 dark:hover:bg-surface-dark/30'
            }`}
          >
            <span className="material-symbols-outlined filled text-base sm:text-lg">headphones</span>
            <span className="font-bold whitespace-nowrap hidden sm:inline">Nghe (听)</span>
            <span className="font-bold whitespace-nowrap sm:hidden">Nghe</span>
          </button>

          <button 
            onClick={() => handleTabChange('speaking')}
            className={`group flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 border-b-2 rounded-t-lg transition-all text-xs sm:text-base ${
              activeTab === 'speaking'
                ? 'border-primary text-primary bg-white/50 dark:bg-surface-dark/50'
                : 'border-transparent text-text-secondary hover:text-text-main hover:bg-white/30 dark:hover:bg-surface-dark/30'
            }`}
          >
            <span className="material-symbols-outlined text-base sm:text-lg">mic</span>
            <span className="font-medium whitespace-nowrap hidden sm:inline">Nói (说)</span>
            <span className="font-medium whitespace-nowrap sm:hidden">Nói</span>
          </button>

          <button 
            onClick={() => handleTabChange('reading')}
            className={`group flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 border-b-2 rounded-t-lg transition-all text-xs sm:text-base ${
              activeTab === 'reading'
                ? 'border-primary text-primary bg-white/50 dark:bg-surface-dark/50'
                : 'border-transparent text-text-secondary hover:text-text-main hover:bg-white/30 dark:hover:bg-surface-dark/30'
            }`}
          >
            <span className="material-symbols-outlined text-base sm:text-lg">menu_book</span>
            <span className="font-medium whitespace-nowrap hidden sm:inline">Đọc (读)</span>
            <span className="font-medium whitespace-nowrap sm:hidden">Đọc</span>
          </button>

          <button 
            onClick={() => handleTabChange('writing')}
            className={`group flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 border-b-2 rounded-t-lg transition-all text-xs sm:text-base ${
              activeTab === 'writing'
                ? 'border-primary text-primary bg-white/50 dark:bg-surface-dark/50'
                : 'border-transparent text-text-secondary hover:text-text-main hover:bg-white/30 dark:hover:bg-surface-dark/30'
            }`}
          >
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
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setCurrentQuestion(num);
                    setSelectedAnswer(userAnswers[num] || null);
                    setIsAnswerSubmitted(false);
                  }}
                  className={`aspect-square rounded-lg font-bold flex items-center justify-center shadow-sm transition-all ${
                    currentQuestion === num
                      ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105'
                      : userAnswers[num]
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200'
                      : 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {userAnswers[num] && !userAnswers[num] ? (
                    <span className="material-symbols-outlined text-lg">check</span>
                  ) : (
                    num
                  )}
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
            <span className={`font-bold ${timeRemaining < 300 ? 'text-red-500' : 'text-primary'}`}>
              {formatTime(timeRemaining)}
            </span>
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
              <input 
                type="radio" 
                name="answer" 
                value="A"
                checked={selectedAnswer === 'A'}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="peer sr-only" 
              />
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
              <input 
                type="radio" 
                name="answer" 
                value="B"
                checked={selectedAnswer === 'B'}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="peer sr-only" 
              />
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
          <button 
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 1}
            className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-text-secondary font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-lg sm:text-xl">arrow_back</span>
            <span className="hidden sm:inline">Trước</span>
          </button>

          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-white border border-gray-300 text-text-main font-bold hover:bg-gray-50 dark:bg-transparent dark:border-gray-600 dark:text-white dark:hover:bg-gray-800 transition-colors text-xs sm:text-base">
              <span className="hidden sm:inline">Xem đáp án</span>
              <span className="sm:hidden">Đáp án</span>
            </button>

            <button 
              onClick={handleSubmitExam}
              type="button" 
              className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-8 py-2 sm:py-2.5 rounded-lg bg-primary text-white font-bold shadow-md shadow-primary/30 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/40 transition-all active:scale-95 text-xs sm:text-base"
            >
              <span className="hidden sm:inline">Nộp bài</span>
              <span className="sm:hidden">Nộp</span>
              <span className="material-symbols-outlined text-sm sm:text-lg">send</span>
            </button>
          </div>
        </div>

        {/* Feedback Overlay */}
        <div className={`absolute bottom-3 sm:bottom-6 right-3 sm:right-6 max-w-xs sm:max-w-sm bg-white dark:bg-surface-dark rounded-lg sm:rounded-xl shadow-2xl shadow-green-900/10 border-2 border-green-500 overflow-hidden z-10 transition-all duration-300 ${
          isAnswerSubmitted
            ? 'translate-y-0 opacity-100'
            : 'translate-y-2 opacity-0 pointer-events-none'
        }`}>
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

    
        </>
    )
};