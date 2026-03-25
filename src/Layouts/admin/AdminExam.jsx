import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

// ── Mock data ──
const INIT_QUESTIONS = [
  { id:1,  skill:"nghe", type:"Đúng / Sai",       hsk:"HSK 1", content:"他想去北京旅游。",                          pinyin:"Tā xiǎng qù Běijīng lǚyóu.",      answers:["ĐÚNG","SAI"],              correct:0, status:"done",  date:"10/03/2025", quizzes:["Đề HSK1-101","HSK1 Luyện nhanh"] },
  { id:2,  skill:"nghe", type:"A B C ảnh",         hsk:"HSK 1", content:"请选择与录音内容一致的图片。",               pinyin:"",                                 answers:["Ảnh A","Ảnh B","Ảnh C"],   correct:1, status:"done",  date:"11/03/2025", quizzes:["Đề HSK1-101"] },
  { id:3,  skill:"nghe", type:"Gộp câu",           hsk:"HSK 1", content:"Nhóm 5 câu — Nghe và ghép ảnh A B C D E", pinyin:"",                                 answers:["A","B","C","D","E"],        correct:0, status:"done",  date:"12/03/2025", quizzes:["Đề HSK1-102"] },
  { id:4,  skill:"nghe", type:"A B C D văn bản",   hsk:"HSK 2", content:'"经理，这份材料我已经翻译好了。" 说话人做了什么？', pinyin:"",                            answers:["正在开会","写完了","翻译完了","没回来"], correct:2, status:"done", date:"13/03/2025", quizzes:["Đề HSK2-201"] },
  { id:5,  skill:"nghe", type:"Đúng / Sai",        hsk:"HSK 2", content:"女的觉得这家饭店的菜很好吃。",              pinyin:"Nǚ de juéde zhè jiā fàndiàn...", answers:["ĐÚNG","SAI"],              correct:1, status:"draft", date:"14/03/2025", quizzes:[] },
  { id:6,  skill:"nghe", type:"A B C ảnh",         hsk:"HSK 3", content:"请根据对话内容选择正确的图片。",             pinyin:"",                                 answers:["Ảnh A","Ảnh B","Ảnh C"],   correct:0, status:"done",  date:"15/03/2025", quizzes:[] },
  { id:7,  skill:"doc",  type:"Đúng sai + ảnh",    hsk:"HSK 1", content:"图片中的人正在跑步。",                    pinyin:"Túpiàn zhōng de rén zhèngzài pǎobù.", answers:["ĐÚNG","SAI"],             correct:0, status:"done",  date:"10/03/2025", quizzes:["Đề HSK1-101"] },
  { id:8,  skill:"doc",  type:"Gộp câu ảnh",       hsk:"HSK 1", content:"请将图片与对应的句子连线。(5 ảnh ↔ 5 câu)",pinyin:"",                                 answers:["A","B","C","D","E"],        correct:0, status:"done",  date:"11/03/2025", quizzes:["HSK1 Luyện nhanh"] },
  { id:9,  skill:"doc",  type:"A B C D đoạn",      hsk:"HSK 3", content:"根据短文，下面哪个说法是正确的？",         pinyin:"",                                 answers:["喜欢运动","不锻炼","骑自行车","不喜欢游泳"], correct:0, status:"done", date:"12/03/2025", quizzes:["Đề HSK3-301"] },
  { id:10, skill:"doc",  type:"Sắp xếp từ",        hsk:"HSK 4", content:"我 / 把 / 书 / 放在 / 桌子 / 上",        pinyin:"Wǒ bǎ shū fàng zài zhuōzi shàng.", answers:["我把书放在桌子上"],          correct:0, status:"done",  date:"13/03/2025", quizzes:["Đề HSK4-401"] },
  { id:11, skill:"doc",  type:"Điền từ",           hsk:"HSK 6", content:"他___去过北京，所以对那里的景点非常熟悉。",  pinyin:"",                                 answers:["从来没有","已经","还没","正在"], correct:1, status:"draft", date:"14/03/2025", quizzes:[] },
  { id:12, skill:"doc",  type:"Gộp câu văn",       hsk:"HSK 2", content:"请将句子与对应的解释连线。(5 câu ↔ 5 giải thích)", pinyin:"",                          answers:["A","B","C","D","E"],        correct:0, status:"done",  date:"15/03/2025", quizzes:["Đề HSK2-201"] },
  { id:13, skill:"viet", type:"Sắp xếp từ",        hsk:"HSK 3", content:"我 / 学习 / 汉语 / 每天 / 在家",         pinyin:"Wǒ měitiān zàijiā xuéxí Hànyǔ.", answers:["我每天在家学习汉语"],          correct:0, status:"done",  date:"10/03/2025", quizzes:["Đề HSK3-301"] },
  { id:14, skill:"viet", type:"Viết đoạn văn",     hsk:"HSK 4", content:"根据图片，写一篇80字左右的短文描述图片内容。", pinyin:"",                               answers:["Bài viết tự do ≥ 80 từ"],   correct:0, status:"draft", date:"11/03/2025", quizzes:["Đề HSK4-401"] },
  { id:15, skill:"viet", type:"Sắp xếp từ",        hsk:"HSK 3", content:"她 / 非常 / 喜欢 / 唱歌 / 和 / 跳舞",    pinyin:"Tā fēicháng xǐhuān chànggē hé tiàowǔ.", answers:["她非常喜欢唱歌和跳舞"],    correct:0, status:"done",  date:"12/03/2025", quizzes:[] },
];

const SKILL_BADGE  = { nghe:"bg-blue-100 text-blue-800",    doc:"bg-emerald-100 text-emerald-800", viet:"bg-orange-100 text-orange-800" };
const SKILL_LABEL  = { nghe:"Nghe",  doc:"Đọc",   viet:"Viết" };
const SKILL_ICON   = { nghe:"hearing", doc:"menu_book", viet:"edit_note" };
const HSK_BADGE    = { "HSK 1":"bg-emerald-100 text-emerald-800","HSK 2":"bg-blue-100 text-blue-800","HSK 3":"bg-violet-100 text-violet-800","HSK 4":"bg-orange-100 text-orange-800","HSK 5":"bg-red-100 text-red-800","HSK 6":"bg-slate-800 text-slate-100" };

function Modal({ title, sub, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
              {sub && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{sub}</p>}
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition ml-4 flex-shrink-0">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function AdminExam() {
  const navigate = useNavigate();
  const [data, setData]           = useState(INIT_QUESTIONS);
  const [activeSkill, setActiveSkill] = useState("all");
  const [activeType, setActiveType]   = useState("all");
  const [activeHSK, setActiveHSK]     = useState("all");
  const [activeSt, setActiveSt]       = useState("all");
  const [search, setSearch]       = useState("");
  const [page, setPage]           = useState(1);
  const [delItem, setDelItem]     = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [view, setView]           = useState("grid"); // grid | table
  const perPage = 9;

  // stats
  const total   = data.length;
  const done    = data.filter(d => d.status === "done").length;
  const bySkill = { nghe: data.filter(d=>d.skill==="nghe").length, doc: data.filter(d=>d.skill==="doc").length, viet: data.filter(d=>d.skill==="viet").length };

  // type options based on active skill
  const TYPE_OPTIONS = {
    all:  [...new Set(data.map(d=>d.type))],
    nghe: ["Đúng / Sai","A B C ảnh","Gộp câu","A B C D văn bản"],
    doc:  ["Đúng sai + ảnh","Gộp câu ảnh","Gộp câu văn","A B C D đoạn","Sắp xếp từ","Điền từ"],
    viet: ["Sắp xếp từ","Viết đoạn văn"],
  };

  // filter
  let filtered = data.filter(d => {
    const ms = activeSkill==="all" || d.skill===activeSkill;
    const mt = activeType==="all"  || d.type===activeType;
    const mh = activeHSK==="all"   || d.hsk===activeHSK;
    const mk = activeSt==="all"    || d.status===activeSt;
    const mq = !search || d.content.toLowerCase().includes(search.toLowerCase()) || d.type.toLowerCase().includes(search.toLowerCase());
    return ms&&mt&&mh&&mk&&mq;
  });

  const total_f = filtered.length;
  const pages   = Math.ceil(total_f / perPage);
  const rows    = filtered.slice((page-1)*perPage, page*perPage);

  function confirmDel() {
    setData(data.filter(d=>d.id!==delItem.id));
    setDelItem(null);
  }

  function setSkill(sk) { setActiveSkill(sk); setActiveType("all"); setPage(1); }

  const editRoute = q => q.skill==="nghe"?"/editlisten" : q.skill==="doc"?"/editread" : "/editwritting";
  const addRoute  = sk => sk==="nghe"?"/listenQuiz" : sk==="doc"?"/readQuiz" : "/writtingQuiz";

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-3 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-slate-400 mb-0.5">Nội dung › <span className="text-slate-700">Ngân hàng câu hỏi</span></p>
            <h1 className="text-lg font-bold text-slate-900">Ngân hàng câu hỏi</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 transition">
            <span className="material-symbols-outlined text-base">download</span>Xuất Excel
          </button>
          <Link to="/adminAddNewExam" className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition shadow-md shadow-primary/20">
            <span className="material-symbols-outlined text-base">add_circle</span>Thêm câu hỏi mới
          </Link>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          {/* Stat cards */}
          <div className="grid grid-cols-5 gap-4">
            {[
              { label:"Tổng câu hỏi", val:total,         ico:"quiz",         bg:"bg-blue-50",    icoclr:"text-blue-500",   valclr:"text-slate-900" },
              { label:"Hoàn thiện",   val:done,           ico:"check_circle", bg:"bg-emerald-50", icoclr:"text-emerald-500",valclr:"text-emerald-600" },
              { label:"Nháp",         val:total-done,     ico:"pending",      bg:"bg-amber-50",   icoclr:"text-amber-500",  valclr:"text-amber-600" },
              { label:"Kỹ năng Nghe", val:bySkill.nghe,  ico:"hearing",      bg:"bg-blue-50",    icoclr:"text-blue-600",   valclr:"text-blue-700" },
              { label:"Kỹ năng Đọc",  val:bySkill.doc,   ico:"menu_book",    bg:"bg-emerald-50", icoclr:"text-emerald-600",valclr:"text-emerald-700" },
            ].map((s,i)=>(
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-symbols-outlined ${s.icoclr}`}>{s.ico}</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium leading-tight">{s.label}</p>
                  <p className={`text-xl font-bold ${s.valclr}`}>{s.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Skill tabs + content */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

            {/* Skill tabs */}
            <div className="flex border-b border-slate-200">
              {[
                {k:"all",  label:"Tất cả",     cnt:total},
                {k:"nghe", label:"Nghe (听)",   cnt:bySkill.nghe},
                {k:"doc",  label:"Đọc (读)",    cnt:bySkill.doc},
                {k:"viet", label:"Viết (写)",   cnt:bySkill.viet},
              ].map(t=>(
                <button key={t.k} onClick={()=>setSkill(t.k)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition ${activeSkill===t.k?"border-primary text-primary":"border-transparent text-slate-500 hover:text-slate-700"}`}>
                  {t.label}
                  <span className={`text-xs px-2 py-0.5 rounded-lg font-bold ${activeSkill===t.k?"bg-primary/10 text-primary":"bg-slate-100 text-slate-500"}`}>{t.cnt}</span>
                </button>
              ))}
              <div className="flex-1"/>
              {/* View toggle */}
              <div className="flex items-center gap-1 px-4">
                <button onClick={()=>setView("grid")} className={`p-1.5 rounded-lg ${view==="grid"?"bg-primary/10 text-primary":"text-slate-400 hover:bg-slate-100"}`}>
                  <span className="material-symbols-outlined text-lg">grid_view</span>
                </button>
                <button onClick={()=>setView("table")} className={`p-1.5 rounded-lg ${view==="table"?"bg-primary/10 text-primary":"text-slate-400 hover:bg-slate-100"}`}>
                  <span className="material-symbols-outlined text-lg">table_rows</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3 flex-wrap bg-slate-50/50">
              {/* Search */}
              <div className="relative flex-1 min-w-48">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">search</span>
                <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
                  placeholder="Tìm nội dung câu hỏi..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white transition"/>
              </div>
              {/* Type filter */}
              <div className="flex gap-1.5 flex-wrap">
                <button onClick={()=>{setActiveType("all");setPage(1);}}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${activeType==="all"?"bg-primary text-white border-primary":"bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                  Tất cả dạng
                </button>
                {(TYPE_OPTIONS[activeSkill]||[]).map(t=>(
                  <button key={t} onClick={()=>{setActiveType(t);setPage(1);}}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${activeType===t?"bg-primary text-white border-primary":"bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                    {t}
                  </button>
                ))}
              </div>
              {/* HSK + Status */}
              <select value={activeHSK} onChange={e=>{setActiveHSK(e.target.value);setPage(1);}}
                className="border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-600 focus:outline-none">
                <option value="all">Tất cả HSK</option>
                {["HSK 1","HSK 2","HSK 3","HSK 4","HSK 5","HSK 6"].map(h=><option key={h}>{h}</option>)}
              </select>
              <select value={activeSt} onChange={e=>{setActiveSt(e.target.value);setPage(1);}}
                className="border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-600 focus:outline-none">
                <option value="all">Tất cả trạng thái</option>
                <option value="done">Hoàn thiện</option>
                <option value="draft">Nháp</option>
              </select>
              {/* Quick add buttons */}
              <div className="flex gap-1.5 ml-auto">
                {["nghe","doc","viet"].map(sk=>(
                  <Link key={sk} to={addRoute(sk)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition">
                    <span className="material-symbols-outlined text-sm">add</span>{SKILL_LABEL[sk]}
                  </Link>
                ))}
              </div>
            </div>

            {/* GRID VIEW */}
            {view==="grid" && (
              <div className="p-4">
                {rows.length===0 ? (
                  <div className="text-center py-16">
                    <span className="material-symbols-outlined text-5xl text-slate-300 block mb-3">search_off</span>
                    <p className="text-slate-400 text-sm mb-4">Không tìm thấy câu hỏi nào</p>
                    <Link to="/adminAddNewExam" className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition">
                      Thêm câu hỏi đầu tiên
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {rows.map(q=>(
                      <div key={q.id} className="border border-slate-200 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-sm transition group bg-white">
                        {/* Card header */}
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${SKILL_BADGE[q.skill]}`}>{SKILL_LABEL[q.skill]}</span>
                          <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">{q.type}</span>
                          <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${HSK_BADGE[q.hsk]}`}>{q.hsk}</span>
                          <span className={`ml-auto w-2 h-2 rounded-full flex-shrink-0 ${q.status==="done"?"bg-emerald-500":"bg-amber-500"}`} title={q.status==="done"?"Hoàn thiện":"Nháp"}/>
                        </div>
                        {/* Content */}
                        <div className="px-4 pt-3 pb-2">
                          <p className="text-sm font-medium text-slate-800 leading-relaxed line-clamp-2 mb-2">{q.content}</p>
                          {q.pinyin && <p className="text-xs text-slate-400 italic mb-2">{q.pinyin}</p>}
                          {/* Answers preview */}
                          {q.answers.length<=4 && (
                            <div className="flex gap-1.5 flex-wrap">
                              {q.answers.map((a,ai)=>(
                                <span key={ai} className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs ${ai===q.correct?"bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold":"bg-slate-50 text-slate-500 border border-slate-200"}`}>
                                  <span className="font-bold">{String.fromCharCode(65+ai)}.</span> {a.length>12?a.slice(0,12)+"…":a}
                                  {ai===q.correct && <span className="material-symbols-outlined text-[10px] text-emerald-600 ml-0.5">check</span>}
                                </span>
                              ))}
                            </div>
                          )}
                          {/* Quiz tags */}
                          {q.quizzes.length>0 && (
                            <div className="flex gap-1 flex-wrap mt-2">
                              {q.quizzes.slice(0,2).map((qz,i)=>(
                                <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary rounded-lg text-[10px] font-semibold">{qz}</span>
                              ))}
                              {q.quizzes.length>2 && <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-lg text-[10px]">+{q.quizzes.length-2}</span>}
                            </div>
                          )}
                          {q.quizzes.length===0 && (
                            <span className="inline-block mt-2 px-2 py-0.5 bg-slate-100 text-slate-400 rounded-lg text-[10px]">Chưa gắn đề nào</span>
                          )}
                        </div>
                        {/* Footer actions */}
                        <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">ID #{q.id} · {q.date}</span>
                          <div className="flex gap-1">
                            <button onClick={()=>setDetailItem(q)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 transition" title="Chi tiết">
                              <span className="material-symbols-outlined text-base">visibility</span>
                            </button>
                            <Link to={editRoute(q)} className="flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition">
                              <span className="material-symbols-outlined text-sm">edit</span>Sửa
                            </Link>
                            <button onClick={()=>setDelItem(q)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 border border-transparent hover:border-red-200 transition" title="Xoá">
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TABLE VIEW */}
            {view==="table" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left" style={{minWidth:800}}>
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      {["Nội dung câu hỏi","Kỹ năng","Dạng","HSK","Đáp án đúng","Gắn vào đề","Trạng thái","Thao tác"].map(h=>(
                        <th key={h} className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rows.length===0 ? (
                      <tr><td colSpan={8} className="px-4 py-12 text-center text-slate-400 text-sm">Không tìm thấy câu hỏi nào</td></tr>
                    ) : rows.map(q=>(
                      <tr key={q.id} className="hover:bg-slate-50 transition">
                        <td className="px-4 py-3 max-w-xs">
                          <p className="text-sm font-medium text-slate-800 line-clamp-2 leading-relaxed">{q.content}</p>
                          {q.pinyin && <p className="text-xs text-slate-400 italic mt-0.5">{q.pinyin}</p>}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${SKILL_BADGE[q.skill]}`}>{SKILL_LABEL[q.skill]}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">{q.type}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${HSK_BADGE[q.hsk]}`}>{q.hsk}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
                            {String.fromCharCode(65+q.correct)}. {q.answers[q.correct]?.slice(0,16)}{q.answers[q.correct]?.length>16?"…":""}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {q.quizzes.length>0 ? (
                            <div className="flex gap-1 flex-wrap">
                              {q.quizzes.slice(0,2).map((qz,i)=>(
                                <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary rounded-lg text-[10px] font-semibold whitespace-nowrap">{qz}</span>
                              ))}
                              {q.quizzes.length>2 && <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-lg text-[10px]">+{q.quizzes.length-2}</span>}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">Chưa gắn</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center gap-1.5 text-xs font-semibold ${q.status==="done"?"text-emerald-600":"text-amber-600"}`}>
                            <span className={`w-2 h-2 rounded-full inline-block ${q.status==="done"?"bg-emerald-500":"bg-amber-500"}`}/>
                            {q.status==="done"?"Hoàn thiện":"Nháp"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={()=>setDetailItem(q)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition">
                              <span className="material-symbols-outlined text-base">visibility</span>
                            </button>
                            <Link to={editRoute(q)} className="flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition">
                              <span className="material-symbols-outlined text-sm">edit</span>Sửa
                            </Link>
                            <button onClick={()=>setDelItem(q)} className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition">
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Hiển thị {total_f===0?0:(page-1)*perPage+1}–{Math.min(page*perPage,total_f)} trong {total_f} câu hỏi
              </span>
              <div className="flex gap-1">
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
                  className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center">‹</button>
                {Array.from({length:Math.min(pages,7)},(_,i)=>i+1).map(p=>(
                  <button key={p} onClick={()=>setPage(p)}
                    className={`w-8 h-8 rounded-lg border text-xs font-semibold transition ${p===page?"bg-primary text-white border-primary":"border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{p}</button>
                ))}
                {pages>7 && <span className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs">…</span>}
                <button onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page>=pages||pages===0}
                  className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center">›</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {detailItem && (
        <Modal title={`Chi tiết câu hỏi #${detailItem.id}`} onClose={()=>setDetailItem(null)}>
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${SKILL_BADGE[detailItem.skill]}`}>{SKILL_LABEL[detailItem.skill]}</span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">{detailItem.type}</span>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${HSK_BADGE[detailItem.hsk]}`}>{detailItem.hsk}</span>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${detailItem.status==="done"?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700"}`}>
                {detailItem.status==="done"?"✓ Hoàn thiện":"● Nháp"}
              </span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Nội dung</p>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">{detailItem.content}</p>
              {detailItem.pinyin && <p className="text-xs text-slate-400 italic mt-1">{detailItem.pinyin}</p>}
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase mb-2">Đáp án</p>
              <div className="space-y-1.5">
                {detailItem.answers.map((a,i)=>(
                  <div key={i} className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-sm ${i===detailItem.correct?"border-emerald-300 bg-emerald-50":"border-slate-200 bg-white"}`}>
                    <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 ${i===detailItem.correct?"bg-emerald-500 text-white":"bg-slate-200 text-slate-600"}`}>
                      {String.fromCharCode(65+i)}
                    </span>
                    <span className={i===detailItem.correct?"font-semibold text-emerald-700":"text-slate-600"}>{a}</span>
                    {i===detailItem.correct && <span className="ml-auto text-xs font-bold text-emerald-600">✓ Đúng</span>}
                  </div>
                ))}
              </div>
            </div>
            {detailItem.quizzes.length>0 && (
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase mb-2">Gắn vào đề thi</p>
                <div className="flex gap-2 flex-wrap">
                  {detailItem.quizzes.map((qz,i)=>(
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-xl text-xs font-semibold">{qz}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-3 pt-3 border-t border-slate-100">
              <Link to={editRoute(detailItem)} onClick={()=>setDetailItem(null)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition">
                <span className="material-symbols-outlined text-base">edit</span>Chỉnh sửa
              </Link>
              <button onClick={()=>{setDetailItem(null);setDelItem(detailItem);}}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 transition">
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {delItem && (
        <Modal title="Xoá câu hỏi" onClose={()=>setDelItem(null)}>
          <p className="text-sm text-slate-600 mb-2 leading-relaxed">
            Bạn chắc chắn muốn xoá câu hỏi này?
          </p>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4">
            <p className="text-sm text-slate-700 font-medium line-clamp-2">{delItem.content}</p>
            {delItem.quizzes.length>0 && (
              <p className="text-xs text-amber-600 mt-1.5">
                ⚠ Câu hỏi này đang được gắn vào {delItem.quizzes.length} đề thi. Xoá sẽ gỡ liên kết.
              </p>
            )}
          </div>
          <div className="flex gap-3 justify-end">
            <button onClick={()=>setDelItem(null)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Huỷ</button>
            <button onClick={confirmDel} className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition">Xoá câu hỏi</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
