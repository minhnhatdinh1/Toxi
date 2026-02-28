import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from '../../../assets/image/LOGO (1).png'

export default function VideoMain() {
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [view, setView] = useState("video");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef(null);
  const [comments, setComments] = useState([
    { id: 1, author: 'Trần Hạnh', avatar: 'TH', time: '10 phút trước', content: 'Video giảng rất dễ hiểu ạ! Thầy có thể hướng dẫn kỹ hơn về thanh điệu không ạ?', likes: 0, replies: [] },
    { id: 2, author: 'Lý Minh', avatar: 'LM', time: '2 giờ trước', content: 'Từ 你好 dùng cho bạn bè, còn 您好 dùng cho người lớn tuổi đúng không thầy?', likes: 1, replies: [] }
  ]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // simple lessons data (replace with real data source)
  const lessons = [
    { title: 'Giới thiệu Pinyin và Thanh điệu', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd46J0OVTkKv4pxaYeYGXAe34QpMGVoQPWHsDxJFLQVkR7zc2njDlGNkYGFBBDI9MRbbXNKwWxmeYsQNJ2iZVP0W-dfqJYmkpWGmJiALxPsVcQ8fG-L9ZnHatbsL4CZXH-21SwOhn3DwBxWY6nVF77fZOSmFnMFHVAxhmXUw_Q3-DyzIbIk6tupeA54nLDKP5xrIGQTagDGbQBXHAEj9U6FsLtwDOEiTaFJlIpBxkcf4g0zajB9Gd0KYHbbjIetDHLAuYSAOhpBWs', duration: '12:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { title: 'Vận mẫu đơn và Thanh mẫu cơ bản', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLTF0QxG3IlFetbR6V5O0ZDc0-Di0pvuxkE3SJodstivVx85jqDou3nat_t7Qtrp0tbMwW1V5t30DafACpeOVgKLfbbOVomANBajmKPN9ctV7IbaFPPkEjm5r3KuRGgx1nr5XaGN29Wi_IU8RNGfNBX7W3O6ZsJ2C2nY5RH2lemVzRU65Kq9kEE5W51Kevj6T0EFpTIyxfQlr4t3fvzBuAvgDZkgonzonrnWrGscEpyqRmSLRuEKIp6TeGWj0tDeEIL3y3TD0GS5s', duration: '10:34', videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
    { title: 'Quy tắc biến điệu', bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpXsT4FqR19SBR4lwyNEolGnNhLY-YW7Z44KuAf5xILVKQqDhBqXGUPs_15OPaZb9_0teJx0zjUiyJj40Acg43F57IOKxfFVZG5ywkNBo_aEum_lJD9owZPZhzWZYhlt6wTYDf8Rx3jJk4DEbArlT4MVDmprgrBuVdLtDKpFspKx4_JwCKDSzxEfgfuVAFN5hq5zqoRo1e8zPogyhvj2xRewxuEC7K-rmKvToFv8q3TNI8PCLtQ2g4Wo3LTlfjKpHEI90ItnoP4qM', duration: '08:20', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
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

  // Video controls handlers
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / duration) * 100);
    }
  };

  const handleProgressChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = percent * videoRef.current.duration;
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
    }
  };

  const handlePlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current?.parentElement) {
      if (!document.fullscreenElement) {
        videoRef.current.parentElement.requestFullscreen().catch(err => {
          console.log('Fullscreen error:', err);
        });
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'Bạn',
        avatar: 'BA',
        time: 'Vừa xong',
        content: newComment,
        likes: 0,
        replies: []
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  return (
    <>

      {/* Header */}
        <div className="w-full bg-white dark:bg-surface-dark shadow-sm z-50 sticky top-0">
        <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>

            <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">
            {/* MOBILE MENU (hamburger) */}
            <button
              onClick={() => setOpenLeft(true)}
              className="md:hidden text-white mr-4"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

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
              {/* CHAT (hidden on large screens) */}
              <button
                onClick={() => setOpenRight(true)}
                className="flex lg:hidden items-center justify-center size-10 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
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

              {/* removed mobile menu button from right side since moved left */}
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
  fixed inset-y-0 left-0 z-50 w-[320px] lg:w-[360px]
  bg-surface-light dark:bg-surface-dark
  transform transition-transform duration-300
  ${openLeft ? "translate-x-0" : "-translate-x-full"}
  md:static md:translate-x-0 md:flex flex-col shrink-0
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
                  {`Hán ngữ Cơ bản ${parseInt((selectedLessonIdx || 0), 10) + 1}`}
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
                <span>Module {parseInt((selectedLessonIdx || 0), 10) + 1}</span>
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
  <video 
    ref={videoRef}
    onTimeUpdate={handleTimeUpdate}
    onPlay={() => setIsPlaying(true)}
    onPause={() => setIsPlaying(false)}
    className="w-full h-full object-cover"
    poster={lessons[selectedLessonIdx]?.bg}
  >
    <source src={lessons[selectedLessonIdx]?.videoUrl} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
    <button 
      onClick={handlePlayPause}
      className="size-20 bg-primary/90 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
    >
      <span className="material-symbols-outlined text-[48px] ml-1">
        {isPlaying ? 'pause' : 'play_arrow'}
      </span>
    </button>
  </div>

  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
    <div className="flex flex-col gap-3">
      <div 
        className="h-1 bg-white/30 rounded-full w-full cursor-pointer hover:h-1.5"
        onClick={handleProgressChange}
      >
        <div
          className="h-full bg-accent rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-white text-[10px]">
        <div className="flex items-center gap-4">
          <button onClick={handlePlayPause} className="hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[16px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <span>
            {formatTime(currentTime)} / {lessons[selectedLessonIdx]?.duration || "00:00"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">volume_up</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs">{playbackSpeed}x</span>
            <select 
              value={playbackSpeed}
              onChange={(e) => handlePlaybackSpeed(parseFloat(e.target.value))}
              className="bg-black/50 text-white text-xs p-1 rounded cursor-pointer"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>

          <button onClick={handleFullscreen} className="hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[16px]">fullscreen</span>
          </button>
        </div>
      </div>
    </div>
  </div>

              {/* Content */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                <Link
  to={`/flashcard?lesson=${selectedLessonIdx}`}
  className="flex items-center gap-2 text-xs font-bold hover:text-primary"
>
  <span className="material-symbols-outlined text-[16px]">
    overview
  </span>
  TỔNG QUAN BÀI HỌC
</Link>
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
                Thảo luận ({comments.length})
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
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="size-8 rounded-full bg-primary/20 shrink-0 flex items-center justify-center text-primary font-bold text-[10px]">
                  {comment.avatar}
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {comment.author}
                    </span>
                    <span className="text-[9px] text-slate-400">
                      {comment.time}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-2xl rounded-tl-none bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {comment.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-1">
                    <button 
                      onClick={() => handleLikeComment(comment.id)}
                      className="text-xs font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                      {comment.likes > 0 ? `${comment.likes} Thích` : 'Thích'}
                    </button>
                    <button className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">
                      Trả lời
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-surface-light dark:bg-surface-dark">
            <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 pr-10 text-[11px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-primary focus:border-primary resize-none placeholder-slate-400 custom-scrollbar"
                placeholder="Viết bình luận của bạn..."
                rows={2}
              />

              <button 
                onClick={handleAddComment}
                className="absolute right-2 bottom-2 size-8 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-50"
                disabled={!newComment.trim()}
              >
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