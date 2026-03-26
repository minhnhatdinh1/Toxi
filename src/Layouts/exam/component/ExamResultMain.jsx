import {useEffect, useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import logo from "../../../assets/image/LOGO (1).png";

const MOCK_RESULT = {
  title: "Đề thi HSK 4 — Mã đề 101",
  hsk: "HSK 4", date: "15/03/2025",
  total: 300, score: 245, pass: true,
  sections: [
    { id:"nghe",  label:"Nghe hiểu", icon:"hearing",   color:"blue",   score:85,  max:100, change:+5 },
    { id:"doc",   label:"Đọc hiểu",  icon:"menu_book", color:"violet", score:90,  max:100, change:+10 },
    { id:"viet",  label:"Viết",      icon:"edit_note", color:"orange", score:70,  max:100, change:-2 },
  ],
  questions: [
    { id:1, section:"nghe", correct:true,  userAnswer:"A", correctAnswer:"A", content:"他想去北京旅游。",                          explanation:"Trong đoạn hội thoại, người nam nói muốn đi du lịch Bắc Kinh nên câu trần thuật là ĐÚNG.", audio:true },
    { id:2, section:"nghe", correct:false, userAnswer:"A", correctAnswer:"B", content:"请选择与录音内容一致的图片。",               explanation:'Đoạn audio nhắc đến "图书馆" (thư viện) nên đáp án đúng là ảnh B — thư viện.', audio:true },
    { id:3, section:"nghe", correct:true,  userAnswer:"C", correctAnswer:"C", content:'"经理，这份材料我已经翻译好了。"',          explanation:'Câu "翻译好了" có nghĩa là đã dịch xong, tương ứng với đáp án C.', audio:true },
    { id:4, section:"nghe", correct:true,  userAnswer:"A", correctAnswer:"A", content:"女的觉得这次旅行怎么样？",                   explanation:"Phụ nữ nói '很开心' — rất vui, đáp án A đúng.", audio:true },
    { id:5, section:"doc",  correct:true,  userAnswer:"true", correctAnswer:"true", content:"图片中的人正在跑步。",                explanation:"Ảnh cho thấy người đang chạy bộ, câu trần thuật ĐÚNG." },
    { id:6, section:"doc",  correct:false, userAnswer:"A", correctAnswer:"B", content:"Sắp xếp: 我 / 把 / 书 / 放在 / 桌子 / 上", explanation:'Cấu trúc 把: Chủ ngữ + 把 + Tân ngữ + Động từ. Câu đúng là "我把书放在桌子上".' },
    { id:7, section:"doc",  correct:true,  userAnswer:"C", correctAnswer:"C", content:"根据短文，下面哪个说法是正确的？",          explanation:"Đoạn văn nêu rõ thành tích học tập của Vương Minh rất tốt." },
    { id:8, section:"doc",  correct:true,  userAnswer:"B", correctAnswer:"B", content:"他___去过北京，所以对那里的景点非常熟悉。",  explanation:'"已经" phù hợp vì anh ta quen thuộc với các điểm du lịch, chứng tỏ đã từng đến.' },
    { id:9, section:"viet", correct:true,  userAnswer:"A", correctAnswer:"A", content:"Sắp xếp: 她 / 非常 / 喜欢 / 唱歌 / 和 / 跳舞", explanation:'Câu đúng: "她非常喜欢唱歌和跳舞" — trạng từ đứng trước động từ.' },
    { id:10,section:"viet", correct:null,  userAnswer:"(Bài viết)", correctAnswer:"Chấm tay",content:"根据图片，写一篇80字左右的短文。",explanation:"Bài viết sẽ được giáo viên chấm và phản hồi trong vòng 24h." },
  ],
};

const SECTION_COLORS = {
  nghe:  { bar:"bg-blue-500",   badge:"bg-blue-100 text-blue-800",   icon:"text-blue-500" },
  doc:   { bar:"bg-violet-500", badge:"bg-violet-100 text-violet-800",icon:"text-violet-500" },
  viet:  { bar:"bg-orange-500", badge:"bg-orange-100 text-orange-800",icon:"text-orange-500" },
};

function AudioMini() {
  const [p,setP]=useState(false);
  return (
    <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 mb-3 w-fit">
      <button onClick={()=>setP(!p)} className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm">
        <span className="material-symbols-outlined text-sm">{p?"pause":"play_arrow"}</span>
      </button>
      <div className="flex gap-0.5 items-end h-4">
        {[3,5,4,7,5,8,4,6,3,7,5].map((h,i)=>(
          <div key={i} className={`w-1 rounded-full ${i<(p?6:3)?"bg-primary":"bg-slate-300"}`} style={{height:h*2}}/>
        ))}
      </div>
      <span className="text-[10px] font-mono text-slate-500">0:45</span>
    </div>
  );
}

export default function ExamResultMain() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState({});
const { id } = useParams();
const [result, setResult] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");  
  
  fetch(`http://localhost:8080/api/exam/result/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }) 
    }
  })
    .then(res => res.json())
    .then(data => {
         console.log(" RAW API DATA:", data);  // ← THÊM DÒNG NÀY
      console.log(" SECTIONS:", data.data?.sections);  // ← THÊM DÒNG NÀY
      console.log(" QUESTIONS:", data.data?.questions);  
      console.log("RESULT API:", data);
      setResult(data.data || data); 
    })
    .catch(err => console.error("Error:", err));
}, [id]);

if (!result) return <div>Loading...</div>;

const r = {
  ...result,
  questions: result.questions || [],
  sections: Array.isArray(result.sections) && result.sections.length > 0
    ? result.sections
    : [],
  history: result.history || []
};

  const filtered = r.questions.filter(q => {
    if (filter==="correct") return q.isCorrect===true;
    if (filter==="wrong")   return q.isCorrect===false;
    if (filter==="pending") return q.isCorrect===null;
    return true;
  });
const SECTION_LABEL = {
  nghe: "Nghe (听)",
  doc: "Đọc (读)",
  viet: "Viết (写)"
};
  const cntCorrect = r.questions.filter(q=>q.isCorrect===true).length;
  const cntWrong   = r.questions.filter(q=>q.isCorrect===false).length;
  const cntPending = r.questions.filter(q=>q.isCorrect===null).length;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
          <Link to="/Home" className="flex items-center gap-3 flex-shrink-0">
            <img src={logo} alt="TOXI" className="h-10 w-10 rounded-xl shadow-lg"/>
            <div>
              <h1 className="text-lg font-black tracking-tighter leading-none">TOXI</h1>
              <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">学以致用</p>
            </div>
          </Link>
          <div className="flex-1"/>
          <button onClick={()=>{ navigate("/Exam"); }}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary font-bold text-sm rounded-xl hover:bg-secondary/90 transition">
            <span className="material-symbols-outlined text-base">replay</span>Làm lại bài
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl transition">
            <span className="material-symbols-outlined text-base">download</span>Tải PDF
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <div className="bg-primary pb-16 pt-8">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 text-white/60 text-xs mb-4 font-medium">
            <Link to="/home" className="hover:text-white transition">Trang chủ</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <Link to="/Practice" className="hover:text-white transition">Luyện thi HSK</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-white">Kết quả</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-secondary/30 text-secondary text-xs font-bold rounded-md uppercase">{r.hsk}</span>
                <span className="text-white/60 text-xs">{r.date}</span>
              </div>
              <h1 className="text-3xl font-black text-white mb-1">Kết quả thi thử {r.hsk}</h1>
              <p className="text-white/70 text-sm">{r.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 -mt-10 pb-10 relative z-10">

        {/* ── SCORE CARDS ── */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
  {/* Total */}
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center relative overflow-hidden">
    <div className="absolute top-3 right-3 opacity-10">
      <span className="material-symbols-outlined text-5xl text-primary">emoji_events</span>
    </div>
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tổng điểm</p>
    <p className="text-4xl font-black text-primary mb-1">{r.score}<span className="text-xl text-slate-400 font-normal">/{r.total}</span></p>
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${r.pass?"bg-emerald-100 text-emerald-700 border-emerald-200":"bg-red-100 text-red-700 border-red-200"}`}>
      {r.pass?"ĐẠT (PASS)":"KHÔNG ĐẠT"}
    </span> 
  </div>

  {/* 🔥 Section scores - INSIDE GRID */}
  {r.sections && r.sections.length > 0 ? (
    r.sections.map(sec => {
      const skillId = sec.skill?.toLowerCase() || sec.id?.toLowerCase() || "nghe";
      const c = SECTION_COLORS[skillId] || SECTION_COLORS.nghe;
      
      const maxScore = sec.max || 100;
      const pct = maxScore > 0 ? Math.round((sec.score || 0) / maxScore * 100) : 0;
      
      const labels = {
        nghe: "Nghe hiểu",
        doc: "Đọc hiểu",
        viet: "Viết"
      };
      const label = labels[skillId] || "Unknown";
      
      const icons = {
        nghe: "hearing",
        doc: "menu_book",
        viet: "edit_note"
      };
      const icon = icons[skillId] || "help";
      
      // 🔥 STATIC BG COLORS (vì Tailwind không support dynamic classes)
      const bgColorMap = {
        nghe: "bg-blue-100",
        doc: "bg-violet-100",
        viet: "bg-orange-100"
      };
      const bgColor = bgColorMap[skillId] || "bg-slate-100";
      
      return (
        <div key={skillId} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl ${bgColor} flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-base ${c.icon}`}>{icon}</span>
              </div>
              <span className="font-bold text-slate-700 text-sm">{label}</span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600">
              +0% so với TB
            </span>
          </div>
          <div className="flex items-end justify-between mb-1.5">
            <span className="text-2xl font-bold text-slate-800">
              {sec.score || 0}<span className="text-sm text-slate-400 font-normal">/{maxScore}</span>
            </span>
            <span className={`text-sm font-bold ${c.icon}`}>{pct}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${c.bar} rounded-full transition-all duration-700`} 
              style={{width:`${pct}%`}}
            />
          </div>
        </div>
      );
    })
  ) : (
    // 🔥 FALLBACK: Nếu không có section
    <div className="col-span-1 md:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 text-center text-slate-500">
      Chưa có dữ liệu section
    </div>
  )}
 </div>
        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* LEFT: Question review */}
          <div className="lg:col-span-8 space-y-4">

            {/* Filter bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3 flex items-center gap-2 flex-wrap sticky top-16 z-30 shadow-sm">
              <span className="text-xs font-bold text-slate-600 mr-1">Xem lại:</span>
              {[
                {v:"all",     l:`Tất cả (${r.questions.length})`,    active:"bg-primary text-white"},
                {v:"wrong",   l:`Sai (${cntWrong})`,                  active:"bg-red-500 text-white"},
                {v:"correct", l:`Đúng (${cntCorrect})`,               active:"bg-emerald-500 text-white"},
                {v:"pending", l:`Chờ chấm (${cntPending})`,           active:"bg-amber-500 text-white"},
              ].map(f=>(
                <button key={f.v} onClick={()=>setFilter(f.v)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${filter===f.v?f.active+" border-transparent":"border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                  {f.l}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"/>Đúng
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 ml-1"/>Sai
              </div>
            </div>

            {filtered.map(q => {
              const c = SECTION_COLORS[q.section];
              const isExp = expanded[q.id];
              return (
                <div key={q.id} id={`q${q.id}`}
                  className={`bg-white rounded-2xl border overflow-hidden ${
                    q.isCorrect===true?"border-emerald-200":q.isCorrect===false?"border-red-200":q.isCorrect===null?"border-amber-200":"border-slate-200"
                  }`}>
                  {/* Header */}
                  <div className={`flex items-center justify-between px-5 py-3 border-b ${
                    q.isCorrect===true?"bg-emerald-50 border-emerald-200":q.isCorrect===false?"bg-red-50 border-red-200":q.isCorrect===null?"bg-amber-50 border-amber-200":"bg-slate-50 border-slate-200"
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white ${
                        q.isCorrect===true?"bg-emerald-500":q.isCorrect===false?"bg-red-500":"bg-amber-500"
                      }`}>{q.id}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${c.badge}`}>
               {SECTION_LABEL[q.section]}
                      </span>
                    </div>
                    <span className={`material-symbols-outlined text-xl ${
                      q.isCorrect===true?"text-emerald-500":q.isCorrect===false?"text-red-500":"text-amber-500"
                    }`}>
                      {q.isCorrect===true?"check_circle":q.isCorrect===false?"cancel":"pending"}
                    </span>
                  </div>

                  <div className="p-5">
                    {/* Audio */}
                    {q.audio && <AudioMini/>}

                    {/* Content */}
                    <p className="text-sm font-semibold text-slate-800 mb-4 leading-relaxed">{q.content}</p>

                    {/* Answers */}
                    <div className="space-y-2 mb-4">
                      {/* User answer */}
                      {q.isCorrect !== null && (
                        <div className={`flex items-center gap-3 p-3 rounded-xl border-2 ${
                          q.isCorrect ? "border-emerald-400 bg-emerald-50" : "border-red-400 bg-red-50"
                        }`}>
                         <div className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 text-white ${
                              q.isCorrect ? "bg-emerald-500" : "bg-red-500"
                    }`}>
                              {q.userAnswer === "true" || q.userAnswer === "false" 
                  ? (q.userAnswer === "true" ? "Đ" : "S")
                      : q.userAnswer}
                             </div>
                          <span className={`text-sm font-semibold flex-1 ${q.isCorrect?"text-emerald-700":"text-red-700"}`}>
                            {q.userAnswer === q.correctAnswer ? "Đáp án của bạn" : "Bạn đã chọn (Sai)"}
                          </span>
                          <span className={`material-symbols-outlined text-base ${q.isCorrect?"text-emerald-500":"text-red-500"}`}>
                            {q.isCorrect?"check_circle":"close"}
                          </span>
                        </div>
                      )}
                      {/* Correct answer (if wrong) */}
                      {q.isCorrect===false && (
                        <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-emerald-400 bg-emerald-50">
                          <div className="w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 text-white bg-emerald-500">{q.correctAnswer}</div>
                          <span className="text-sm font-semibold text-emerald-700 flex-1">Đáp án đúng</span>
                          <span className="material-symbols-outlined text-base text-emerald-500">check_circle</span>
                        </div>
                      )}
                      {/* Pending */}
                      {q.isCorrect===null && (
                        <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-sm text-amber-700">
                          <span className="material-symbols-outlined text-base">schedule</span>
                          Bài viết đang chờ giáo viên chấm
                        </div>
                      )}
                    </div>

                    {/* Explanation toggle */}
                    <button onClick={()=>setExpanded(e=>({...e,[q.id]:!isExp}))}
                      className="w-full flex items-center justify-between p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl hover:bg-amber-50 transition text-left">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-500 text-base">lightbulb</span>
                        <span className="text-xs font-bold text-slate-700">Giải thích chi tiết</span>
                      </div>
                      <span className={`material-symbols-outlined text-slate-400 text-base transition-transform ${isExp?"rotate-180":""}`}>expand_more</span>
                    </button>
                    {isExp && (
                      <div className="mt-2 px-4 py-3 bg-amber-50/50 rounded-xl border border-amber-200/40 text-sm text-slate-700 leading-relaxed">
                        {q.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Sticky stats */}
          <div className="lg:col-span-4 space-y-4 sticky top-20">

            {/* Score chart */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">bar_chart</span>
                Biểu đồ năng lực
              </h3>
              <div className="flex items-end gap-3 h-28 px-2 mb-3">
                {r.sections.map((sec,i)=>{
                 const skillId = sec.skill?.toLowerCase() || sec.id?.toLowerCase() || "nghe";
const c = SECTION_COLORS[skillId] || SECTION_COLORS.nghe;  
                  const pct = Math.round((sec.score || 0)/(sec.max || 100)*100);
                     const labels = {
      nghe: "Nghe",
      doc: "Đọc",
      viet: "Viết"
    };
    const label = labels[skillId] || "Unknown";
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <span className="text-xs font-bold text-slate-600">{sec.score}</span>
                      <div className="w-full rounded-t-lg overflow-hidden bg-slate-100 flex items-end" style={{height:"80%"}}>
                        <div className={`w-full ${c.bar} rounded-t-lg transition-all duration-700`} style={{height:`${pct}%`}}/>
                      </div>
                   <span className="text-[10px] text-slate-500 font-medium">{label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-center pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">Đánh giá chung: <span className="font-bold text-primary">Khá Tốt</span></p>
              </div>
            </div>

            {/* Question grid */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-800 text-sm">Danh sách câu hỏi</h3>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg">{r.questions.length} câu</span>
              </div>
              <div className="flex gap-3 text-[10px] text-slate-500 mb-3 font-semibold">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500"/>Đúng</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-500"/>Sai</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-400"/>Chờ chấm</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {r.questions.map(q=>(
                  <a key={q.id} href={`#q${q.id}`}
                    className={`h-9 rounded-lg text-xs font-bold flex items-center justify-center border transition ${
                      q.isCorrect===true  ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200"
                    : q.isCorrect===false ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                    :                     "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200"
                    }`}>
                    {q.id}
                  </a>
                ))}
              </div>
            </div>

            {/* Suggestion */}
            <div className="bg-primary rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute -right-3 -top-3 opacity-10">
                <span className="material-symbols-outlined text-8xl">school</span>
              </div>
              <h4 className="font-bold text-base mb-1.5 relative z-10">Luyện tiếp {r.hsk}?</h4>
              <p className="text-xs text-white/70 mb-4 leading-relaxed relative z-10">
                Bạn yếu phần <strong className="text-secondary">Viết</strong>. Hãy xem khóa học HSK chuyên sâu của TOXI.
              </p>
              <Link to="/course" className="block w-full py-2.5 bg-secondary text-primary font-bold text-sm rounded-xl text-center hover:bg-secondary/90 transition relative z-10">
                Xem khóa học
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
