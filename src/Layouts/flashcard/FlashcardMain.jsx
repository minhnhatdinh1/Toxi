import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import MyHeader from '../mycourse/component/MyHeader.jsx';

const initialFlashcards = [
  {
    id: 1, title: 'Chào hỏi', hanzi: '你好', pinyin: 'Nǐ hǎo', meaning: 'Xin chào',
    exampleZh: '你好，很高兴认识你。', exampleVi: 'Xin chào, rất vui được làm quen.',
    stroke: '5 nét', radical: '你 (nǐ)', level: 'HSK 1',
    tips: 'Dùng khi gặp người lần đầu hoặc chào hỏi thông thường.',
    related: ['你好吗', '大家好'],
  },
  {
    id: 2, title: 'Vận mẫu & Thanh mẫu', hanzi: '妈', pinyin: 'mā', meaning: 'Mẹ',
    exampleZh: '妈，我回来了。', exampleVi: 'Mẹ ơi, con về rồi.',
    stroke: '6 nét', radical: '女 (nǚ)', level: 'HSK 1',
    tips: 'Thanh 1 (mā) = mẹ. Đổi thanh thành mǎ = ngựa, mà = mắng.',
    related: ['爸爸', '妈妈'],
  },
  {
    id: 3, title: 'Biến điệu', hanzi: '好', pinyin: 'hǎo', meaning: 'Tốt / Được',
    exampleZh: '这个很好吃。', exampleVi: 'Cái này rất ngon.',
    stroke: '6 nét', radical: '女 (nǚ)', level: 'HSK 1',
    tips: 'Kết hợp 女 (nữ) và 子 (con) → nghĩa gốc: bình an, tốt đẹp.',
    related: ['很好', '好吃', '好看'],
  },
  {
    id: 4, title: 'Chào hỏi', hanzi: '谢谢', pinyin: 'Xièxiè', meaning: 'Cảm ơn',
    exampleZh: '谢谢你的帮助。', exampleVi: 'Cảm ơn bạn đã giúp đỡ.',
    stroke: '12 nét', radical: '言 (yán)', level: 'HSK 1',
    tips: 'Lặp hai lần để nhấn mạnh sự cảm ơn chân thành hơn.',
    related: ['不谢', '多谢'],
  },
  {
    id: 5, title: 'Biến điệu', hanzi: '再见', pinyin: 'Zàijiàn', meaning: 'Tạm biệt',
    exampleZh: '明天见，再见！', exampleVi: 'Hẹn gặp lại ngày mai, tạm biệt!',
    stroke: '9 nét', radical: '见 (jiàn)', level: 'HSK 1',
    tips: '再 (zài) = lại/nữa + 见 (jiàn) = gặp → hẹn gặp lại.',
    related: ['明天见', '回见'],
  },
];

function speak(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang; utt.rate = 0.85;
  window.speechSynthesis.speak(utt);
}

function SpeakerButton({ text, lang, variant = 'light', label, size = 'sm' }) {
  const [playing, setPlaying] = useState(false);
  const handleSpeak = (e) => {
    e.stopPropagation(); setPlaying(true);
    speak(text, lang);
    setTimeout(() => setPlaying(false), 1500);
  };
  const base = `flex items-center gap-1.5 rounded-full font-semibold border transition-all duration-150 cursor-pointer ${size === 'xs' ? 'px-2 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'}`;
  const styles = variant === 'dark'
    ? playing ? 'bg-white/30 border-white/60 text-white' : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/20'
    : playing ? 'bg-primary/20 border-primary text-primary' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary';
  return (
    <button onClick={handleSpeak} className={`${base} ${styles}`}>
      <span className={`material-symbols-outlined ${size === 'xs' ? 'text-[13px]' : 'text-[15px]'} ${playing ? 'animate-pulse' : ''}`}>
        {playing ? 'graphic_eq' : 'volume_up'}
      </span>
      {label}
    </button>
  );
}

function ProgressRing({ pct, size = 48, stroke = 4, color = '#1D9E75' }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
    </svg>
  );
}

function AppHeader({ navigate }) {
  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-xl relative">
      <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none" />
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">
        <Link to="/Home" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none">TOXI</h1>
            <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">学以致用</p>
          </div>
        </Link>
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative group">
            <input type="text" placeholder="Tìm kiếm sản phẩm, giáo trình, dụng cụ..."
              className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm focus:ring-2 focus:ring-secondary focus:bg-white focus:text-primary transition-all placeholder-white/60" />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">search</span>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <button onClick={() => navigate('/cart')} className="flex items-center justify-center size-10 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 border-2 border-white shadow-sm cursor-pointer hidden sm:block"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANadJSyOfDTclENxTAo2sw3Zjh7pnp9KKg6h2O4DPIjBYyTW71cyBejL6epjf4bncopuLtFsS_S28mcoEHv7h1zzA9eQlltIXtwDZfsYjCeMxjDdAPnQkvKLCnuYjrECMphza2dJScBgPHRGqoIUccTQUhZWLevuqN5gbt-Gdi0v_35rRW79Z__1-tjeWPfsTpAYBzqjrPwvrzKlKTY8K7uLo1-SOwA3-7T7eW-upJSD1KOVr7iIff5utR8-CjWJTlAFJYfsztm9s")' }} />
        </div>
      </div>
    </header>
  );
}

// ─── LEFT SIDEBAR ───────────────────────────────────────────────────────────
function LeftSidebar({ flashcards, currentIdx, setCurrentIdx, setIsFlipped, knownIds, unknownIds }) {
  const progress = Math.round((knownIds.size / flashcards.length) * 100);

  return (
    <aside className="w-[280px] shrink-0 hidden lg:flex flex-col gap-4 py-6 pl-6 pr-2">
      {/* Progress card */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Tiến độ học</span>
          <span className="text-xs font-black text-primary">{progress}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: 'Tổng', val: flashcards.length, color: 'text-slate-700 dark:text-slate-300', bg: 'bg-slate-50 dark:bg-slate-800' },
            { label: 'Đã thuộc', val: knownIds.size, color: 'text-green-700', bg: 'bg-green-50 dark:bg-green-900/20' },
            { label: 'Chưa thuộc', val: unknownIds.size, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
          ].map(({ label, val, color, bg }) => (
            <div key={label} className={`${bg} rounded-xl p-2`}>
              <p className={`text-xl font-black ${color}`}>{val}</p>
              <p className="text-[9px] font-semibold text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Card list */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[16px]">style</span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Danh sách thẻ</span>
        </div>
        <div className="flex flex-col overflow-y-auto max-h-[360px] custom-scrollbar">
          {flashcards.map((card, i) => {
            const isActive = i === currentIdx;
            const isKnown = knownIds.has(card.id);
            const isUnknown = unknownIds.has(card.id);
            return (
              <button
                key={card.id}
                onClick={() => { setCurrentIdx(i); setIsFlipped(false); }}
                className={`flex items-center gap-3 px-4 py-3 text-left border-b border-slate-50 dark:border-slate-800/60 last:border-0 transition-all ${isActive ? 'bg-primary/8 dark:bg-primary/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <div className={`size-8 rounded-xl flex items-center justify-center text-lg font-black shrink-0 ${isActive ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                  {card.hanzi[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate ${isActive ? 'text-primary' : 'text-slate-700 dark:text-slate-300'}`}>{card.hanzi}</p>
                  <p className="text-[11px] text-slate-400 truncate">{card.pinyin} · {card.meaning}</p>
                </div>
                {isKnown && <span className="material-symbols-outlined text-green-500 text-[16px] shrink-0">check_circle</span>}
                {isUnknown && <span className="material-symbols-outlined text-red-400 text-[16px] shrink-0">cancel</span>}
                {!isKnown && !isUnknown && <span className="size-2 rounded-full bg-slate-200 dark:bg-slate-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Study tip box */}
      <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/15 p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[16px]">lightbulb</span>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Mẹo học</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Hãy đọc to chữ Hán khi lật thẻ — não bộ ghi nhớ tốt hơn khi kết hợp thị giác và thính giác.
        </p>
      </div>
    </aside>
  );
}

// ─── RIGHT SIDEBAR ──────────────────────────────────────────────────────────
function RightSidebar({ card, flashcards, knownIds }) {
  if (!card) return null;
  const masteryPct = Math.round((knownIds.size / flashcards.length) * 100);

  return (
    <aside className="w-[280px] shrink-0 hidden lg:flex flex-col gap-4 py-6 pr-6 pl-2">

      {/* Google-translate panel */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50">
          <span className="material-symbols-outlined text-primary text-[16px]">g_translate</span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Bản dịch</span>
        </div>
        <div className="p-4 flex flex-col gap-4">
          {/* ZH */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Tiếng Trung</span>
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-4xl font-black text-slate-900 dark:text-white leading-none">{card.hanzi}</p>
                <p className="text-sm text-primary font-semibold mt-1 tracking-wide">{card.pinyin}</p>
              </div>
              <SpeakerButton text={card.hanzi} lang="zh-CN" label="Nghe" size="xs" />
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800" />

          {/* VI */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Tiếng Việt</span>
            <div className="flex items-end justify-between gap-2">
              <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{card.meaning}</p>
              <SpeakerButton text={card.meaning} lang="vi-VN" label="Nghe" size="xs" />
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800" />

          {/* Ví dụ */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Ví dụ</span>
              <SpeakerButton text={card.exampleZh} lang="zh-CN" label="Đọc" size="xs" />
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 italic font-medium leading-relaxed">"{card.exampleZh}"</p>
            <p className="text-xs text-slate-400 leading-relaxed">{card.exampleVi}</p>
          </div>
        </div>
      </div>

      {/* Card info */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[16px]">info</span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Thông tin từ</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: 'gesture', label: 'Số nét', val: card.stroke },
            { icon: 'category', label: 'Bộ thủ', val: card.radical },
            { icon: 'school', label: 'Cấp độ', val: card.level },
            { icon: 'auto_stories', label: 'Chủ đề', val: card.title },
          ].map(({ icon, label, val }) => (
            <div key={label} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2.5">
              <div className="flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-slate-400 text-[12px]">{icon}</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">{label}</span>
              </div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mẹo ghi nhớ */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-500 text-[16px]">lightbulb</span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Mẹo ghi nhớ</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{card.tips}</p>
      </div>

      {/* Từ liên quan */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[16px]">hub</span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Từ liên quan</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {card.related.map((w) => (
            <div key={w} className="flex items-center gap-1.5 bg-primary/8 dark:bg-primary/15 border border-primary/20 rounded-xl px-2.5 py-1.5">
              <span className="text-sm font-black text-primary">{w}</span>
              <SpeakerButton text={w} lang="zh-CN" size="xs" />
            </div>
          ))}
        </div>
      </div>

      {/* Mastery ring */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 p-4 flex items-center gap-4">
        <div className="relative flex items-center justify-center shrink-0">
          <ProgressRing pct={masteryPct} size={60} stroke={6} color="#1D9E75" />
          <span className="absolute text-[11px] font-black text-primary">{masteryPct}%</span>
        </div>
        <div>
          <p className="text-sm font-black text-slate-800 dark:text-white">Mức thành thạo</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Đã thuộc <span className="font-bold text-green-600">{knownIds.size}/{flashcards.length}</span> thẻ
          </p>
        </div>
      </div>
    </aside>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function FlashcardMain() {
  const location = useLocation();

  const [flashcards] = useState(initialFlashcards);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownIds, setKnownIds] = useState(new Set());
  const [unknownIds, setUnknownIds] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState('all');
  const [showResult, setShowResult] = useState(false);

  const filtered = flashcards.filter((c) => {
    if (activeFilter === 'known') return knownIds.has(c.id);
    if (activeFilter === 'unknown') return unknownIds.has(c.id);
    return true;
  });

  const card = filtered[currentIdx] ?? filtered[0];
  const progress = Math.round((knownIds.size / flashcards.length) * 100);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const p = params.get('card');
    if (p !== null) {
      const i = parseInt(p, 10);
      if (!isNaN(i) && i >= 0 && i < flashcards.length) setCurrentIdx(i);
    }
  }, [location.search, flashcards.length]);

  const goNext = useCallback(() => { setCurrentIdx((p) => (p + 1) % filtered.length); setIsFlipped(false); }, [filtered.length]);
  const goPrev = useCallback(() => { setCurrentIdx((p) => (p - 1 + filtered.length) % filtered.length); setIsFlipped(false); }, [filtered.length]);

  const markKnown = () => {
    if (!card) return;
    setKnownIds((prev) => new Set([...prev, card.id]));
    setUnknownIds((prev) => { const s = new Set(prev); s.delete(card.id); return s; });
    if (currentIdx < filtered.length - 1) goNext(); else setShowResult(true);
  };

  const markUnknown = () => {
    if (!card) return;
    setUnknownIds((prev) => new Set([...prev, card.id]));
    setKnownIds((prev) => { const s = new Set(prev); s.delete(card.id); return s; });
    goNext();
  };

  const resetAll = () => {
    setKnownIds(new Set()); setUnknownIds(new Set());
    setCurrentIdx(0); setIsFlipped(false);
    setShowResult(false); setActiveFilter('all');
  };

  // ── RESULT SCREEN ──────────────────────────────────────────────────
  if (showResult) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
        <MyHeader />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-2xl p-10 max-w-md w-full text-center flex flex-col items-center gap-6">
            <div className="relative flex items-center justify-center">
              <ProgressRing pct={progress} size={100} stroke={7} color="#1D9E75" />
              <span className="absolute text-2xl font-black text-primary">{progress}%</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Hoàn thành!</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Bạn đã thuộc <span className="font-bold text-green-600">{knownIds.size}</span> / {flashcards.length} thẻ
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4">
                <p className="text-green-700 dark:text-green-400 font-black text-2xl">{knownIds.size}</p>
                <p className="text-green-600 dark:text-green-500 text-xs font-semibold mt-1">Đã thuộc ✓</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4">
                <p className="text-red-700 dark:text-red-400 font-black text-2xl">{unknownIds.size}</p>
                <p className="text-red-600 dark:text-red-500 text-xs font-semibold mt-1">Chưa thuộc ✗</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              {unknownIds.size > 0 && (
                <button onClick={() => { setActiveFilter('unknown'); setCurrentIdx(0); setIsFlipped(false); setShowResult(false); }}
                  className="w-full py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-colors">
                  Ôn lại thẻ chưa thuộc ({unknownIds.size})
                </button>
              )}
              <button onClick={resetAll}
                className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Học lại từ đầu
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── MAIN LAYOUT ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <MyHeader />

      <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
        {/* LEFT SIDEBAR */}
        <LeftSidebar
          flashcards={flashcards} currentIdx={currentIdx}
          setCurrentIdx={setCurrentIdx} setIsFlipped={setIsFlipped}
          knownIds={knownIds} unknownIds={unknownIds}
        />

        {/* CENTER CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-xl mx-auto flex flex-col gap-5">

            {/* Top bar */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-0.5">Học từ vựng</p>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">{card?.title ?? 'Flashcard'}</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Tiến độ</p>
                  <p className="text-sm font-black text-primary">{knownIds.size}/{flashcards.length}</p>
                </div>
                <div className="relative flex items-center justify-center">
                  <ProgressRing pct={progress} size={44} stroke={4} />
                  <span className="absolute text-[10px] font-black text-primary">{progress}%</span>
                </div>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap">
              {[
                { key: 'all', label: `Tất cả (${flashcards.length})` },
                { key: 'unknown', label: `Chưa thuộc (${unknownIds.size})` },
                { key: 'known', label: `Đã thuộc (${knownIds.size})` },
              ].map(({ key, label }) => (
                <button key={key}
                  onClick={() => { setActiveFilter(key); setCurrentIdx(0); setIsFlipped(false); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${activeFilter === key
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary'}`}>
                  {label}
                </button>
              ))}
            </div>

            {card ? (
              <>
                {/* ── FLASHCARD ── */}
                <div className="w-full cursor-pointer" style={{ perspective: '1200px' }}
                  onClick={() => setIsFlipped((f) => !f)}>
                  <div className="relative w-full transition-transform duration-700"
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', minHeight: '300px' }}>

                    {/* FRONT */}
                    <div className="absolute inset-0 bg-white dark:bg-surface-dark rounded-3xl border border-primary/20 dark:border-primary/30 shadow-xl flex flex-col items-center justify-center gap-4 overflow-hidden"
                      style={{ backfaceVisibility: 'hidden', minHeight: '300px' }}>
                      <span className="absolute top-4 left-4 text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{card.level}</span>
                      <div className="absolute top-3 right-4" onClick={(e) => e.stopPropagation()}>
                        <SpeakerButton text={card.hanzi} lang="zh-CN" label="Tiếng Trung" />
                      </div>
                      <h3 className="text-9xl font-black text-primary dark:text-accent tracking-tighter leading-none">{card.hanzi}</h3>
                      <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">gesture</span>{card.stroke}</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">category</span>{card.radical}</span>
                      </div>
                      <p className="text-slate-400 dark:text-slate-500 text-sm animate-pulse">Nhấp để xem nghĩa</p>
                      <div className="flex items-center justify-center gap-1.5">
                        {filtered.map((_, i) => (
                          <div key={i} className={`rounded-full transition-all duration-300 ${i === currentIdx ? 'w-5 h-2 bg-primary' : 'w-2 h-2 bg-slate-200 dark:bg-slate-700'}`} />
                        ))}
                      </div>
                    </div>

                    {/* BACK */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#085041] rounded-3xl shadow-xl flex flex-col items-center justify-center gap-5 p-8 text-center overflow-hidden"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', minHeight: '300px' }}>
                      <span className="absolute text-[200px] font-black text-white/5 select-none leading-none -top-6">{card.hanzi}</span>
                      <div className="relative flex flex-col items-center gap-2">
                        <span className="text-3xl font-bold text-[#9FE1CB] tracking-widest">{card.pinyin}</span>
                        <h3 className="text-5xl font-black text-white leading-tight">{card.meaning}</h3>
                        <div className="w-12 h-0.5 bg-white/20 rounded-full mt-1" />
                      </div>
                      <div className="w-full bg-white/10 rounded-2xl p-5 flex flex-col gap-3">
                        <div className="text-left">
                          <p className="text-white font-semibold text-base italic leading-relaxed">"{card.exampleZh}"</p>
                          <p className="text-white/70 text-sm mt-1 leading-relaxed">{card.exampleVi}</p>
                        </div>
                        <div className="flex gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
                          <SpeakerButton text={card.hanzi} lang="zh-CN" variant="dark" label="Phát âm (TQ)" />
                          <SpeakerButton text={card.meaning} lang="vi-VN" variant="dark" label="Phát âm (VN)" />
                          <SpeakerButton text={card.exampleZh} lang="zh-CN" variant="dark" label="Đọc ví dụ" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── ACTION BUTTONS ── */}
                <div className="flex items-center gap-4">
                  <button onClick={markUnknown}
                    className="flex-1 h-14 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 rounded-2xl flex items-center justify-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-all">
                    <span className="material-symbols-outlined text-[20px]">close</span>Chưa thuộc
                  </button>
                  <button onClick={() => setIsFlipped((f) => !f)}
                    className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all flex-shrink-0">
                    <span className="material-symbols-outlined text-[26px]">sync</span>
                  </button>
                  <button onClick={markKnown}
                    className="flex-1 h-14 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/40 rounded-2xl flex items-center justify-center gap-2 text-green-700 dark:text-green-400 font-bold text-sm hover:bg-green-100 dark:hover:bg-green-900/30 transition-all">
                    <span className="material-symbols-outlined text-[20px]">check</span>Đã thuộc
                  </button>
                </div>

                {/* ── NAVIGATION ── */}
                <div className="flex items-center justify-center gap-4 pb-2">
                  <button onClick={goPrev}
                    className="size-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <span className="text-sm font-bold text-slate-400">Thẻ {currentIdx + 1} / {filtered.length}</span>
                  <button onClick={goNext}
                    className="size-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
                <span className="material-symbols-outlined text-5xl">style</span>
                <p className="font-semibold">Không có thẻ nào trong bộ lọc này</p>
                <button onClick={() => setActiveFilter('all')} className="text-primary text-sm font-bold underline">Xem tất cả</button>
              </div>
            )}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <RightSidebar card={card} flashcards={flashcards} knownIds={knownIds} />
      </div>
    </div>
  );
}
