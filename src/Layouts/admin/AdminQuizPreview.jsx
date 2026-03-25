import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

// ── Mock questions (reuse từ AdminEditQuiz) ──
const MOCK_QUESTIONS = [
  { id:1, skill:"nghe", type:"Đúng / Sai",       hsk:"HSK 1", content:"他想去北京旅游。",                                  pinyin:"Tā xiǎng qù Běijīng lǚyóu.",       answers:["ĐÚNG (对)","SAI (错)"],                           correct:0 },
  { id:2, skill:"nghe", type:"A B C ảnh",         hsk:"HSK 1", content:"请选择与录音内容一致的图片。",                     pinyin:"",                                  answers:["Ảnh A","Ảnh B","Ảnh C"],                          correct:1,
    images:[
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=130&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=130&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=130&fit=crop",
    ]
  },
  { id:3, skill:"nghe", type:"A B C D văn bản",   hsk:"HSK 2", content:'"经理，这份材料我已经翻译好了。" 问：说话人做了什么？', pinyin:"",                               answers:["A. 他们正在开会","B. 材料已经写完了","C. 翻译工作完成了","D. 经理还没回来"], correct:2 },
  { id:4, skill:"nghe", type:"Đúng / Sai",         hsk:"HSK 2", content:"女的觉得这次旅行很开心。",                         pinyin:"Nǚ de juéde zhè cì lǚxíng hěn kāixīn.", answers:["ĐÚNG (对)","SAI (错)"],                        correct:0 },
  { id:5, skill:"doc",  type:"Đúng sai + ảnh",    hsk:"HSK 1", content:"图片中的人正在跑步。",                             pinyin:"Túpiàn zhōng de rén zhèngzài pǎobù.",answers:["ĐÚNG (对)","SAI (错)"],                           correct:0,
    image:"https://images.unsplash.com/photo-1524055988636-436cfa46e59e?w=360&h=220&fit=crop"
  },
  { id:6, skill:"doc",  type:"A B C D đoạn",      hsk:"HSK 3", content:"根据短文，下面哪个说法是正确的？",
    passage:"王明是一位非常勤奋的学生，他每天早上六点就起床，先去操场跑步，然后回来吃早饭，再去上课。他的成绩一直很好，老师和同学都很喜欢他。",
    pinyin:"",                                                                                                              answers:["A. 王明每天七点起床","B. 王明先吃早饭再去跑步","C. 王明的成绩非常好","D. 老师不喜欢王明"], correct:2 },
  { id:7, skill:"doc",  type:"Sắp xếp từ",        hsk:"HSK 4", content:"Sắp xếp các từ sau thành câu hoàn chỉnh:",
    words:["我","把","书","放在","桌子","上"],                                                                               answers:["A. 我把桌子放在书上","B. 我把书放在桌子上","C. 书把我放在桌子上","D. 桌子把书放在我上"], correct:1,
    pinyin:"Wǒ bǎ shū fàng zài zhuōzi shàng." },
  { id:8, skill:"doc",  type:"Điền từ",           hsk:"HSK 6", content:"他___去过北京，所以对那里的景点非常熟悉。",         pinyin:"",                                  answers:["A. 从来没有","B. 已经","C. 还没","D. 正在"],       correct:1,
    hints:["从来没有","已经","还没","正在"] },
  { id:9, skill:"viet", type:"Sắp xếp từ",        hsk:"HSK 3", content:"Sắp xếp các từ sau để tạo thành câu đúng:",
    words:["她","非常","喜欢","唱歌","和","跳舞"],                                                                          answers:["A. 她非常喜欢唱歌和跳舞","B. 唱歌她非常喜欢和跳舞","C. 她喜欢非常唱歌和跳舞","D. 非常她喜欢唱歌和跳舞"], correct:0,
    pinyin:"Tā fēicháng xǐhuān chànggē hé tiàowǔ." },
  { id:10,skill:"viet", type:"Viết đoạn văn",     hsk:"HSK 4", content:"根据图片，写一篇80字左右的短文描述图片内容。",       pinyin:"",                                  answers:[],                                                  correct:null,
    image:"https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=360&h=220&fit=crop",
    isWrite:true },
];

const QUIZ_INFO = {
  id:1, name:"Đề thi HSK 4 — Mã đề 101", hsk:"HSK 4", type:"Tổng hợp",
  time:105, pass:60, status:"active", desc:"Từ vựng cơ bản và ngữ pháp HSK4",
};

const SKILL_STYLES = {
  nghe:  { bg:"bg-blue-50",   border:"border-blue-200",  badge:"bg-blue-100 text-blue-800",   dot:"bg-blue-500",  header:"bg-blue-600",  label:"Nghe (听)" },
  doc:   { bg:"bg-violet-50", border:"border-violet-200",badge:"bg-violet-100 text-violet-800",dot:"bg-violet-500",header:"bg-violet-600",label:"Đọc (读)" },
  viet:  { bg:"bg-orange-50", border:"border-orange-200",badge:"bg-orange-100 text-orange-800",dot:"bg-orange-500",header:"bg-orange-600",label:"Viết (写)" },
};

const HSK_BADGE = {
  "HSK 1":"bg-emerald-100 text-emerald-800","HSK 2":"bg-blue-100 text-blue-800",
  "HSK 3":"bg-violet-100 text-violet-800",  "HSK 4":"bg-orange-100 text-orange-800",
  "HSK 5":"bg-red-100 text-red-800",         "HSK 6":"bg-slate-800 text-slate-100",
};

// ── Mock audio bar ──
function AudioBar() {
  const [p,setP]=useState(false);
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-4">
      <button onClick={()=>setP(!p)} className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
        <span className="material-symbols-outlined text-base">{p?"pause":"play_arrow"}</span>
      </button>
      <div className="flex-1">
        <div className="flex gap-0.5 items-end h-4 mb-1">
          {[3,5,4,7,5,8,4,6,3,7,5,4,6,3,5,7,4,6,3,5].map((h,i)=>(
            <div key={i} className={`w-1 rounded-full ${i<(p?9:4)?"bg-primary":"bg-slate-300"}`} style={{height:h*2}}/>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 font-mono"><span>0:00</span><span>0:45</span></div>
      </div>
      <span className="text-xs font-mono text-slate-400">0:45</span>
    </div>
  );
}

// ── Answer option (read-only with correct highlight) ──
function AnswerRow({ label, text, isCorrect, showAnswer }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition ${
      showAnswer && isCorrect
        ? "border-emerald-400 bg-emerald-50"
        : "border-slate-200 bg-white"
    }`}>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
        showAnswer && isCorrect ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"
      }`}>{label}</div>
      <span className={`text-sm flex-1 ${showAnswer&&isCorrect?"font-semibold text-emerald-700":"text-slate-700"}`}>{text}</span>
      {showAnswer && isCorrect && (
        <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
      )}
    </div>
  );
}

export default function AdminQuizPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAnswers, setShowAnswers] = useState(false);
  const [activeSection, setActiveSection] = useState("all");

  const sections = ["all","nghe","doc","viet"];
  const filtered = activeSection==="all" ? MOCK_QUESTIONS : MOCK_QUESTIONS.filter(q=>q.skill===activeSection);

  const sectionGroups = ["nghe","doc","viet"].map(sk=>({
    sk, qs: MOCK_QUESTIONS.filter(q=>q.skill===sk)
  }));

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3 flex-shrink-0">
          <button onClick={()=>navigate(`/adminEditQuiz/${id||1}`)} className="p-2 hover:bg-slate-100 rounded-lg transition">
            <span className="material-symbols-outlined text-slate-500">arrow_back</span>
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-slate-400">
              <Link to="/adminQuiz" className="hover:text-primary">Quản lí đề thi</Link>
              <span className="mx-1">›</span>
              <Link to={`/adminEditQuiz/${id||1}`} className="hover:text-primary">{QUIZ_INFO.name}</Link>
              <span className="mx-1">›</span>
              <span className="text-slate-700">Xem trước</span>
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">preview</span>Chế độ xem trước
              </span>
              <h1 className="text-sm font-bold text-slate-900 truncate">{QUIZ_INFO.name}</h1>
            </div>
          </div>
          {/* Toggle show answers */}
          <button onClick={()=>setShowAnswers(!showAnswers)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition ${
              showAnswers ? "bg-emerald-100 text-emerald-700 border-emerald-300" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}>
            <span className="material-symbols-outlined text-base">{showAnswers?"visibility_off":"visibility"}</span>
            {showAnswers ? "Ẩn đáp án" : "Hiện đáp án"}
          </button>
          <Link to={`/adminEditQuiz/${id||1}`}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition shadow-md shadow-primary/20">
            <span className="material-symbols-outlined text-base">edit</span>Chỉnh sửa
          </Link>
        </header>

        {/* Section filter bar */}
        <div className="bg-white border-b border-slate-200 px-6 flex items-center gap-0">
          {[
            {k:"all",  l:`Tất cả (${MOCK_QUESTIONS.length})`,     dot:"bg-slate-400"},
            {k:"nghe", l:`Nghe — ${MOCK_QUESTIONS.filter(q=>q.skill==="nghe").length} câu`, dot:"bg-blue-500"},
            {k:"doc",  l:`Đọc — ${MOCK_QUESTIONS.filter(q=>q.skill==="doc").length} câu`,  dot:"bg-violet-500"},
            {k:"viet", l:`Viết — ${MOCK_QUESTIONS.filter(q=>q.skill==="viet").length} câu`, dot:"bg-orange-500"},
          ].map(t=>(
            <button key={t.k} onClick={()=>setActiveSection(t.k)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition ${activeSection===t.k?"border-primary text-primary":"border-transparent text-slate-500 hover:text-slate-700"}`}>
              <span className={`w-2 h-2 rounded-full ${t.dot}`}/>
              {t.l}
            </button>
          ))}
          <div className="flex-1"/>
          {/* Quiz meta */}
          <div className="flex items-center gap-3 text-xs text-slate-400 px-2">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">timer</span>{QUIZ_INFO.time} phút</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">grade</span>Đạt {QUIZ_INFO.pass}%</span>
            <span className={`px-2 py-0.5 rounded-lg font-bold text-xs ${HSK_BADGE[QUIZ_INFO.hsk]}`}>{QUIZ_INFO.hsk}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-5 py-5 space-y-5">

            {/* Preview notice */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              <span className="material-symbols-outlined text-blue-500 text-xl flex-shrink-0">info</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-800">Chế độ xem trước — Read Only</p>
                <p className="text-xs text-blue-600 mt-0.5">Đây là giao diện học viên sẽ thấy. Đồng hồ và nộp bài không hoạt động ở chế độ này.</p>
              </div>
              <button onClick={()=>setShowAnswers(!showAnswers)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex-shrink-0">
                <span className="material-symbols-outlined text-sm">{showAnswers?"visibility_off":"visibility"}</span>
                {showAnswers?"Ẩn":"Hiện"} đáp án
              </button>
            </div>

            {/* Mock exam header (như học viên thấy) */}
            <div className="bg-primary rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-xs text-white/60 mb-0.5">{QUIZ_INFO.hsk} · {QUIZ_INFO.type}</p>
                  <h2 className="text-lg font-black">{QUIZ_INFO.name}</h2>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-xs text-white/60">Tổng câu</p>
                    <p className="font-black text-xl">{MOCK_QUESTIONS.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-white/60">Thời gian</p>
                    <p className="font-black text-xl">{QUIZ_INFO.time}'</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-white/60">Điểm đạt</p>
                    <p className="font-black text-xl">{QUIZ_INFO.pass}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions by section */}
            {(activeSection==="all" ? sectionGroups : sectionGroups.filter(g=>g.sk===activeSection)).map(({sk,qs})=>{
              if (!qs.length) return null;
              const s = SKILL_STYLES[sk];
              return (
                <div key={sk}>
                  {/* Section divider */}
                  <div className={`flex items-center gap-3 px-5 py-3 ${s.bg} border ${s.border} rounded-2xl mb-3`}>
                    <div className={`w-8 h-8 ${s.header} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <span className="material-symbols-outlined text-white text-base">
                        {sk==="nghe"?"hearing":sk==="doc"?"menu_book":"edit_note"}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{s.label}</p>
                      <p className="text-xs text-slate-500">{qs.length} câu hỏi</p>
                    </div>
                    <div className="ml-auto flex gap-1.5 flex-wrap">
                      {[...new Set(qs.map(q=>q.type))].map(t=>(
                        <span key={t} className={`text-xs px-2 py-0.5 rounded-lg font-semibold ${s.badge}`}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="space-y-4">
                    {qs.map(q=>{
                      return (
                        <div key={q.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

                          {/* Question header */}
                          <div className={`flex items-center justify-between px-5 py-3 ${s.bg} border-b ${s.border}`}>
                            <div className="flex items-center gap-2.5">
                              <div className={`w-7 h-7 ${s.header} rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                                {q.id}
                              </div>
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${s.badge}`}>{q.type}</span>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${HSK_BADGE[q.hsk]}`}>{q.hsk}</span>
                            </div>
                            {/* Admin actions per question */}
                            <div className="flex items-center gap-1">
                              <Link to={sk==="nghe"?"/editlisten":sk==="doc"?"/editread":"/editwritting"}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 transition">
                                <span className="material-symbols-outlined text-sm">edit</span>Sửa
                              </Link>
                            </div>
                          </div>

                          <div className="p-5">
                            {/* Audio */}
                            {q.skill==="nghe" && <AudioBar/>}

                            {/* Passage */}
                            {q.passage && (
                              <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <p className="text-sm font-medium text-slate-800 leading-relaxed">{q.passage}</p>
                              </div>
                            )}

                            {/* Image */}
                            {q.image && (
                              <div className="mb-4 flex justify-center">
                                <img src={q.image} alt="" className="rounded-xl max-h-52 object-cover border border-slate-200"/>
                              </div>
                            )}

                            {/* Words */}
                            {q.words && (
                              <div className="mb-4 flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                                {q.words.map((w,i)=>(
                                  <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm">{w}</span>
                                ))}
                              </div>
                            )}

                            {/* Hints */}
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

                            {/* Đúng / Sai */}
                            {(q.type==="Đúng / Sai"||q.type==="Đúng sai + ảnh") && (
                              <div className="flex gap-3">
                                {q.answers.map((a,i)=>(
                                  <div key={i} className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 ${
                                    showAnswers && i===q.correct
                                      ? i===0?"border-emerald-400 bg-emerald-50 text-emerald-700":"border-red-400 bg-red-50 text-red-700"
                                      : "border-slate-200 text-slate-500 bg-white"
                                  }`}>
                                    <span className="material-symbols-outlined">{i===0?"check_circle":"cancel"}</span>{a}
                                    {showAnswers && i===q.correct && <span className="material-symbols-outlined text-sm">check</span>}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* ABC ảnh */}
                            {q.type==="A B C ảnh" && q.images && (
                              <div className="grid grid-cols-3 gap-3">
                                {q.images.map((img,i)=>(
                                  <div key={i} className={`rounded-xl overflow-hidden border-2 ${showAnswers&&i===q.correct?"border-emerald-400":"border-slate-200"}`}>
                                    <img src={img} alt={String.fromCharCode(65+i)} className="w-full h-28 object-cover"/>
                                    <div className={`py-1.5 text-center text-xs font-bold ${showAnswers&&i===q.correct?"bg-emerald-500 text-white":"bg-slate-50 text-slate-600"}`}>
                                      {String.fromCharCode(65+i)}{showAnswers&&i===q.correct?" ✓":""}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* ABCD options */}
                            {q.answers.length>2 && !q.images && !q.isWrite && (
                              <div className="space-y-2">
                                {q.answers.map((a,i)=>(
                                  <AnswerRow key={i} label={String.fromCharCode(65+i)} text={a} isCorrect={i===q.correct} showAnswer={showAnswers}/>
                                ))}
                              </div>
                            )}

                            {/* Viết đoạn */}
                            {q.isWrite && (
                              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 text-center">
                                <span className="material-symbols-outlined text-slate-400 text-3xl block mb-1">edit_note</span>
                                <p className="text-sm text-slate-400">Học viên sẽ viết đoạn văn tại đây (tối thiểu 80 từ)</p>
                              </div>
                            )}

                            {/* Answer key banner (admin only) */}
                            {showAnswers && q.correct!==null && !q.isWrite && (
                              <div className="mt-3 flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                                <span className="material-symbols-outlined text-emerald-600 text-sm">key</span>
                                <span className="text-xs font-bold text-emerald-700">
                                  Đáp án đúng: {String.fromCharCode(65+q.correct)}. {q.answers[q.correct]}
                                </span>
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

            {/* Bottom nav */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
              <div className="text-sm text-slate-500">
                Tổng: <strong className="text-slate-800">{filtered.length} câu hỏi</strong> đang hiển thị
              </div>
              <div className="flex gap-2">
                <Link to={`/adminEditQuiz/${id||1}`}
                  className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                  <span className="material-symbols-outlined text-base">edit</span>Chỉnh sửa đề
                </Link>
                <Link to="/adminQuiz"
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition">
                  <span className="material-symbols-outlined text-base">list</span>Về danh sách
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
