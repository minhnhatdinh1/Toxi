import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toxiLogo from "../../../assets/image/LOGO (1).png";

// ── Mock exam data ──
const EXAM_INFO = {
  title: "Đề thi HSK 4 — Mã đề 101",
  hsk: "HSK 4",
  totalTime: 105 * 60, // giây
  sections: [
    { id: "nghe",  label: "Nghe (听)", icon: "hearing",   color: "blue",   range: [1, 4] },
    { id: "doc",   label: "Đọc (读)",  icon: "menu_book", color: "violet", range: [5, 8] },
    { id: "viet",  label: "Viết (写)", icon: "edit_note", color: "orange", range: [9, 10] },
  ],
};

const QUESTIONS = [
  // ── NGHE ──
  {
    id: 1, section: "nghe", type: "dung-sai",
    sectionLabel: "Nghe hiểu — Phần 1",
    audio: null,
    content: "他想去北京旅游。",
    pinyin: "Tā xiǎng qù Běijīng lǚyóu.",
    answers: ["ĐÚNG (对)", "SAI (错)"],
  },
  {
    id: 2, section: "nghe", type: "abc-anh",
    sectionLabel: "Nghe hiểu — Phần 2",
    audio: null,
    content: "请选择与录音内容一致的图片。",
    images: [
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    ],
    answers: ["A", "B", "C"],
  },
  {
    id: 3, section: "nghe", type: "abcd",
    sectionLabel: "Nghe hiểu — Phần 3",
    audio: null,
    content: '"经理，这份材料我已经翻译好了。" 问：说话人做了什么？',
    answers: ["A. 他们正在开会", "B. 材料已经写完了", "C. 翻译工作完成了", "D. 经理还没回来"],
    correct: 2,
  },
  {
    id: 4, section: "nghe", type: "abcd",
    sectionLabel: "Nghe hiểu — Phần 3",
    audio: null,
    content: "女的觉得这次旅行怎么样？",
    answers: ["A. 很开心", "B. 很累", "C. 一般般", "D. 不想去"],
    correct: 0,
  },
  // ── ĐỌC ──
  {
    id: 5, section: "doc", type: "dung-sai-anh",
    sectionLabel: "Đọc hiểu — Phần 1",
    image: "https://images.unsplash.com/photo-1524055988636-436cfa46e59e?w=400&h=250&fit=crop",
    content: "图片中的人正在跑步。",
    pinyin: "Túpiàn zhōng de rén zhèngzài pǎobù.",
    answers: ["ĐÚNG (对)", "SAI (错)"],
  },
  {
    id: 6, section: "doc", type: "sap-xep",
    sectionLabel: "Đọc hiểu — Phần 2",
    content: "Sắp xếp các từ sau thành câu hoàn chỉnh:",
    words: ["我", "把", "书", "放在", "桌子", "上"],
    correctOrder: "我把书放在桌子上",
    pinyin: "Wǒ bǎ shū fàng zài zhuōzi shàng.",
    answers: ["A. 我把桌子放在书上", "B. 我把书放在桌子上", "C. 书把我放在桌子上", "D. 桌子把书放在我上"],
    correct: 1,
  },
  {
    id: 7, section: "doc", type: "abcd-doan",
    sectionLabel: "Đọc hiểu — Phần 3",
    passage: "王明是一位非常勤奋的学生，他每天早上六点就起床，先去操场跑步，然后回来吃早饭，再去上课。他的成绩一直很好，老师和同学都很喜欢他。",
    content: "根据短文，下面哪个说法是正确的？",
    answers: [
      "A. 王明每天七点起床",
      "B. 王明先吃早饭再去跑步",
      "C. 王明的成绩非常好",
      "D. 老师不喜欢王明",
    ],
    correct: 2,
  },
  {
    id: 8, section: "doc", type: "dien-tu",
    sectionLabel: "Đọc hiểu — Phần 4",
    content: "他___去过北京，所以对那里的景点非常熟悉。",
    hints: ["从来没有", "已经", "还没", "正在"],
    answers: ["A. 从来没有", "B. 已经", "C. 还没", "D. 正在"],
    correct: 1,
  },
  // ── VIẾT ──
  {
    id: 9, section: "viet", type: "sap-xep-viet",
    sectionLabel: "Viết — Phần 1",
    content: "Sắp xếp các từ sau để tạo thành câu đúng:",
    words: ["她", "非常", "喜欢", "唱歌", "和", "跳舞"],
    answers: [
      "A. 她非常喜欢唱歌和跳舞",
      "B. 唱歌她非常喜欢和跳舞",
      "C. 她喜欢非常唱歌和跳舞",
      "D. 非常她喜欢唱歌和跳舞",
    ],
    correct: 0,
  },
  {
    id: 10, section: "viet", type: "viet-doan",
    sectionLabel: "Viết — Phần 2",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=250&fit=crop",
    content: "根据图片，写一篇80字左右的短文描述图片内容。",
    isTextInput: true,
  },
];

const SECTION_STYLES = {
  nghe:  { bg: "bg-blue-50",   border: "border-blue-200",  badge: "bg-blue-100 text-blue-800",   dot: "bg-blue-500",   header: "bg-blue-600" },
  doc:   { bg: "bg-violet-50", border: "border-violet-200",badge: "bg-violet-100 text-violet-800",dot: "bg-violet-500", header: "bg-violet-600" },
  viet:  { bg: "bg-orange-50", border: "border-orange-200",badge: "bg-orange-100 text-orange-800",dot: "bg-orange-500", header: "bg-orange-600" },
};

// ── Audio player mock ──
function AudioBar() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-4">
      <button onClick={() => setPlaying(!playing)}
        className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition flex-shrink-0 shadow-sm">
        <span className="material-symbols-outlined text-lg">{playing ? "pause" : "play_arrow"}</span>
      </button>
      <div className="flex-1">
        <div className="flex items-center gap-1.5 mb-1">
          {Array.from({length:20},(_,i)=>(
            <div key={i} className={`rounded-full transition-all ${i<(playing?8:5)?"bg-primary":"bg-slate-200"}`}
              style={{width:3,height:`${[4,6,8,5,9,7,4,8,6,9,5,7,8,4,6,9,5,7,4,6][i]}px`}}/>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>0:12</span><span>0:45</span>
        </div>
      </div>
      <span className="material-symbols-outlined text-slate-400 text-base cursor-pointer hover:text-slate-600">volume_up</span>
    </div>
  );
}

// ── Answer option ──
function AnswerOpt({ label, text, selected, onClick, isImage, imageSrc }) {
  return (
    <button onClick={onClick}
      className={`w-full text-left flex items-center gap-3 p-3 rounded-xl border-2 transition group ${
        selected ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/40 hover:bg-slate-50"
      }`}>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition ${
        selected ? "bg-primary text-white" : "bg-slate-100 text-slate-600 group-hover:bg-primary/10"
      }`}>{label}</div>
      {isImage ? (
        <div className={`flex-1 overflow-hidden rounded-lg border ${selected?"border-primary/30":"border-slate-200"}`}>
          <img src={imageSrc} alt={label} className="w-full h-24 object-cover"/>
        </div>
      ) : (
        <span className={`text-sm ${selected?"text-primary font-semibold":"text-slate-700"}`}>{text}</span>
      )}
      {selected && <span className="material-symbols-outlined text-primary text-base ml-auto flex-shrink-0">check_circle</span>}
    </button>
  );
}

// ── True/False ──
function TrueFalse({ selected, onSelect }) {
  return (
    <div className="flex gap-3">
      {[{v:"true",l:"ĐÚNG (对)",ico:"check_circle",active:"border-emerald-400 bg-emerald-50 text-emerald-700"},
        {v:"false",l:"SAI (错)",ico:"cancel",active:"border-red-400 bg-red-50 text-red-700"}].map(o=>(
        <button key={o.v} onClick={()=>onSelect(o.v)}
          className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition ${
            selected===o.v ? o.active : "border-slate-200 text-slate-500 hover:bg-slate-50"
          }`}>
          <span className="material-symbols-outlined">{o.ico}</span>{o.l}
        </button>
      ))}
    </div>
  );
}

export default function ExamMain() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [textAnswers, setTextAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_INFO.totalTime);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeSection, setActiveSection] = useState("nghe");
  const questionRefs = useRef({});

  // Timer
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);

  const fmtTime = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const timeColor = timeLeft < 300 ? "text-red-500" : timeLeft < 600 ? "text-amber-500" : "text-primary";

  function setAnswer(qid, val) { setAnswers(a => ({...a,[qid]:val})); }
  function scrollTo(qid) {
    questionRefs.current[qid]?.scrollIntoView({behavior:"smooth", block:"center"});
  }

  const answered = Object.keys(answers).length + Object.keys(textAnswers).filter(k=>textAnswers[k]?.trim()).length;
  const total    = QUESTIONS.length;

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if(e.isIntersecting) { const q = QUESTIONS.find(q=>q.id===+e.target.dataset.qid); if(q) setActiveSection(q.section); } }),
      { threshold: 0.5 }
    );
    Object.values(questionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* ── STICKY HEADER ── */}
      <header className="sticky top-0 z-50 bg-primary text-white shadow-xl flex-shrink-0">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 h-14 flex items-center gap-4">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2.5 flex-shrink-0">
            <img src={toxiLogo} alt="TOXI" className="h-9 w-9 rounded-xl"/>
            <div>
              <p className="text-sm font-black tracking-tight leading-none">TOXI</p>
              <p className="text-[8px] text-secondary uppercase tracking-widest leading-none">学以致用</p>
            </div>
          </Link>

          <div className="h-5 w-px bg-white/20"/>

          {/* Exam title */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white/80 truncate">{EXAM_INFO.title}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-secondary/30 text-secondary rounded-md">{EXAM_INFO.hsk}</span>
              <span className="text-[10px] text-white/60">{total} câu hỏi</span>
            </div>
          </div>

          {/* Progress */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-[10px] text-white/60">Tiến độ</p>
              <p className="text-xs font-bold">{answered}/{total} câu</p>
            </div>
            <div className="w-28 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full transition-all" style={{width:`${Math.round(answered/total*100)}%`}}/>
            </div>
            <span className="text-xs font-bold text-secondary">{Math.round(answered/total*100)}%</span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-1.5 flex-shrink-0">
            <span className="material-symbols-outlined text-base text-secondary">timer</span>
            <span className={`font-mono font-black text-lg ${timeLeft<300?"text-red-300":timeLeft<600?"text-amber-300":"text-white"}`}>{fmtTime(timeLeft)}</span>
          </div>

          {/* Submit */}
          <button onClick={()=>setShowConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary font-black text-sm rounded-xl hover:bg-secondary/90 transition shadow-lg flex-shrink-0">
            <span className="material-symbols-outlined text-base">send</span>Nộp bài
          </button>

          {/* Exit */}
          <button onClick={()=>navigate("/Practice")}
            className="p-2 rounded-xl hover:bg-white/10 transition text-white/70 hover:text-white flex-shrink-0">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </header>

      {/* ── SECTION NAV ── */}
      <div className="sticky top-14 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-0">
            {EXAM_INFO.sections.map(sec=>{
              const cnt = QUESTIONS.filter(q=>q.section===sec.id).length;
              const ans = QUESTIONS.filter(q=>q.section===sec.id && (answers[q.id]!==undefined || textAnswers[q.id]?.trim())).length;
              const isActive = activeSection===sec.id;
              const s = SECTION_STYLES[sec.id];
              return (
                <button key={sec.id}
                  onClick={()=>{ setActiveSection(sec.id); scrollTo(QUESTIONS.find(q=>q.section===sec.id)?.id); }}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition ${isActive?`border-primary text-primary`:"border-transparent text-slate-500 hover:text-slate-700"}`}>
                  <span className={`material-symbols-outlined text-base ${isActive?"text-primary":`text-${sec.color}-500`}`}>{sec.icon}</span>
                  {sec.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-md font-bold ${isActive?"bg-primary/10 text-primary":"bg-slate-100 text-slate-500"}`}>{ans}/{cnt}</span>
                </button>
              );
            })}
            <div className="flex-1"/>
            <span className="text-xs text-slate-400 px-4">Cuộn xuống để xem tất cả câu hỏi</span>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="flex-1 max-w-screen-2xl mx-auto w-full px-4 md:px-6 py-5 grid grid-cols-12 gap-5 items-start">

        {/* LEFT: All questions scrollable */}
        <div className="col-span-12 lg:col-span-8 space-y-4">

          {EXAM_INFO.sections.map(sec => {
            const sqs = QUESTIONS.filter(q => q.section===sec.id);
            const s = SECTION_STYLES[sec.id];
            return (
              <div key={sec.id}>
                {/* Section header */}
                <div className={`flex items-center gap-3 px-5 py-3 ${s.bg} border ${s.border} rounded-2xl mb-3`}>
                  <div className={`w-8 h-8 ${s.header} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <span className="material-symbols-outlined text-white text-base">{sec.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{sec.label}</p>
                    <p className="text-xs text-slate-500">{sqs.length} câu hỏi</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs text-slate-500">{QUESTIONS.filter(q=>q.section===sec.id&&answers[q.id]!==undefined).length}/{sqs.length} đã làm</span>
                    <div className="w-20 h-1.5 bg-white/60 rounded-full overflow-hidden">
                      <div className={`h-full ${s.dot} rounded-full transition-all`}
                        style={{width:`${Math.round(QUESTIONS.filter(q=>q.section===sec.id&&answers[q.id]!==undefined).length/sqs.length*100)}%`}}/>
                    </div>
                  </div>
                </div>

                {/* Questions in this section */}
                <div className="space-y-4">
                  {sqs.map(q => {
                    const ans = answers[q.id];
                    const isDone = ans !== undefined || textAnswers[q.id]?.trim();
                    return (
                      <div key={q.id} data-qid={q.id} ref={el=>questionRefs.current[q.id]=el}
                        className={`bg-white rounded-2xl border-2 overflow-hidden transition ${isDone?`${s.border}`:"border-slate-200"}`}>

                        {/* Question header */}
                        <div className={`flex items-center justify-between px-5 py-3 ${isDone?s.bg:"bg-slate-50"} border-b ${isDone?s.border:"border-slate-200"}`}>
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${isDone?`${s.header} text-white`:"bg-slate-200 text-slate-600"}`}>
                              {q.id}
                            </div>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${s.badge}`}>{q.sectionLabel}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {isDone && <span className={`material-symbols-outlined text-base ${s.dot.replace("bg-","text-")}`}>check_circle</span>}
                            {!isDone && <span className="text-xs text-slate-400">Chưa làm</span>}
                          </div>
                        </div>

                        {/* Question body */}
                        <div className="p-5">

                          {/* Audio (nghe) */}
                          {q.section==="nghe" && <AudioBar/>}

                          {/* Passage (đoạn văn) */}
                          {q.passage && (
                            <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                              <p className="text-sm font-medium text-slate-800 leading-relaxed">{q.passage}</p>
                            </div>
                          )}

                          {/* Image */}
                          {q.image && (
                            <div className="mb-4 flex justify-center">
                              <img src={q.image} alt="question" className="rounded-xl max-h-52 object-cover border border-slate-200"/>
                            </div>
                          )}

                          {/* Words to arrange */}
                          {q.words && (
                            <div className="mb-4 flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                              {q.words.map((w,i)=>(
                                <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm">{w}</span>
                              ))}
                            </div>
                          )}

                          {/* Hints (điền từ) */}
                          {q.hints && (
                            <div className="mb-4 flex gap-2 flex-wrap">
                              <span className="text-xs text-slate-500 font-semibold self-center">Gợi ý:</span>
                              {q.hints.map((h,i)=>(
                                <span key={i} className="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs font-medium text-amber-800">{h}</span>
                              ))}
                            </div>
                          )}

                          {/* Question text */}
                          <p className="text-sm font-semibold text-slate-800 mb-4 leading-relaxed">
                            {q.content}
                            {q.pinyin && <span className="block text-xs text-slate-400 font-normal italic mt-0.5">{q.pinyin}</span>}
                          </p>

                          {/* ── ANSWER TYPES ── */}

                          {/* Đúng / Sai */}
                          {(q.type==="dung-sai"||q.type==="dung-sai-anh") && (
                            <TrueFalse selected={ans} onSelect={v=>setAnswer(q.id,v)}/>
                          )}

                          {/* A B C ảnh */}
                          {q.type==="abc-anh" && (
                            <div className="grid grid-cols-3 gap-3">
                              {q.images.map((img,i)=>(
                                <button key={i} onClick={()=>setAnswer(q.id,String(i))}
                                  className={`rounded-xl overflow-hidden border-2 transition ${ans===String(i)?"border-primary":"border-slate-200 hover:border-primary/40"}`}>
                                  <img src={img} alt={String.fromCharCode(65+i)} className="w-full h-28 object-cover"/>
                                  <div className={`py-1.5 text-center text-xs font-bold transition ${ans===String(i)?"bg-primary text-white":"bg-slate-50 text-slate-600"}`}>
                                    {String.fromCharCode(65+i)}
                                    {ans===String(i) && " ✓"}
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}

                          {/* A B C D (text) */}
                          {(q.type==="abcd"||q.type==="abcd-doan"||q.type==="sap-xep"||q.type==="sap-xep-viet"||q.type==="dien-tu") && (
                            <div className="space-y-2">
                              {q.answers.map((a,i)=>(
                                <AnswerOpt key={i}
                                  label={String.fromCharCode(65+i)}
                                  text={a}
                                  selected={ans===String(i)}
                                  onClick={()=>setAnswer(q.id,String(i))}/>
                              ))}
                            </div>
                          )}

                          {/* Viết đoạn văn */}
                          {q.type==="viet-doan" && (
                            <div>
                              <textarea
                                value={textAnswers[q.id]||""}
                                onChange={e=>setTextAnswers(t=>({...t,[q.id]:e.target.value}))}
                                placeholder="Viết đoạn văn của bạn tại đây... (tối thiểu 80 từ)"
                                rows={5}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
                              />
                              <div className="flex justify-between mt-1.5">
                                <span className="text-xs text-slate-400">Tối thiểu 80 từ</span>
                                <span className={`text-xs font-semibold ${(textAnswers[q.id]||"").split(/\s+/).filter(Boolean).length>=80?"text-emerald-600":"text-slate-400"}`}>
                                  {(textAnswers[q.id]||"").split(/\s+/).filter(Boolean).length} từ
                                </span>
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Submit button bottom */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
            <p className="text-sm text-slate-600 mb-1">Đã làm <strong className="text-primary">{answered}/{total}</strong> câu hỏi</p>
            {answered < total && (
              <p className="text-xs text-amber-600 mb-3">⚠ Còn {total - answered} câu chưa trả lời</p>
            )}
            <button onClick={()=>setShowConfirm(true)}
              className="px-8 py-3 bg-secondary text-primary font-black text-base rounded-2xl hover:bg-secondary/90 transition shadow-lg shadow-secondary/20">
              NỘP BÀI / 提交
            </button>
          </div>
        </div>

        {/* RIGHT: Sticky sidebar */}
        <aside className="col-span-12 lg:col-span-4 sticky top-28 space-y-4">

          {/* Timer card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Thời gian còn lại</p>
            <p className={`font-mono font-black text-4xl ${timeColor}`}>{fmtTime(timeLeft)}</p>
            <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${timeLeft<300?"bg-red-500":timeLeft<600?"bg-amber-500":"bg-emerald-500"}`}
                style={{width:`${Math.round(timeLeft/EXAM_INFO.totalTime*100)}%`}}/>
            </div>
          </div>

          {/* Question palette */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Danh sách câu hỏi</p>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg font-semibold">{answered}/{total}</span>
            </div>

            {/* Legend */}
            <div className="flex gap-3 mb-3 text-[10px] text-slate-500 font-semibold">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary inline-block"/>Đang xem</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500 inline-block"/>Đã làm</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full border border-slate-300 inline-block"/>Chưa làm</span>
            </div>

            {/* Sections + grid */}
            {EXAM_INFO.sections.map(sec=>{
              const sqs = QUESTIONS.filter(q=>q.section===sec.id);
              const s = SECTION_STYLES[sec.id];
              return (
                <div key={sec.id} className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${s.dot}`}/>
                    <p className="text-[11px] font-bold text-slate-600">{sec.label}</p>
                    <span className="text-[10px] text-slate-400 ml-auto">
                      {sqs.filter(q=>answers[q.id]!==undefined||textAnswers[q.id]?.trim()).length}/{sqs.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {sqs.map(q=>{
                      const isDone = answers[q.id]!==undefined || textAnswers[q.id]?.trim();
                      return (
                        <button key={q.id} onClick={()=>scrollTo(q.id)}
                          className={`h-9 rounded-lg text-xs font-bold transition border ${
                            isDone ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
                                   : "border-slate-200 text-slate-500 hover:border-primary hover:text-primary"
                          }`}>
                          {q.id}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tip */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex gap-2">
              <span className="material-symbols-outlined text-blue-500 flex-shrink-0 text-base">lightbulb</span>
              <p className="text-xs text-blue-700 leading-relaxed">
                <strong>Mẹo:</strong> Cuộn xuống để xem tất cả câu hỏi. Bấm số câu ở bảng bên phải để nhảy đến câu muốn làm.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* ── CONFIRM SUBMIT MODAL ── */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-[pop_.18s_ease]">
            <div className="text-center mb-5">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-amber-600 text-2xl">send</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Xác nhận nộp bài</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Bạn đã hoàn thành <strong className="text-primary">{answered}/{total}</strong> câu hỏi.
                {answered < total && (
                  <><br/><span className="text-amber-600 font-semibold">⚠ Còn {total-answered} câu chưa trả lời!</span></>
                )}
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 mb-5 text-center">
              <p className="text-xs text-slate-500">Thời gian còn lại</p>
              <p className="font-mono font-black text-xl text-primary">{fmtTime(timeLeft)}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>setShowConfirm(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                Làm tiếp
              </button>
              <button onClick={()=>navigate("/ExamResult")}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition">
                Nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
