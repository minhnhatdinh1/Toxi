import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  QuizSidebar, QuizPageHeader, QuizRightPanel,
  AnswerOptions, ImageSlot, inputCls, labelCls,
} from "./_QuizShared";

const TYPES = [
  {value:"dung-sai-anh", label:"Đúng sai + ảnh"},
  {value:"gop-anh",      label:"Gộp câu ảnh"},
  {value:"gop-van",      label:"Gộp câu văn"},
  {value:"abcd-doan",    label:"A B C D đoạn"},
  {value:"sap-xep",      label:"Sắp xếp từ"},
  {value:"dien-tu",      label:"Điền từ"},
];

export default function AddNewReadQuiz() {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("dung-sai-anh");
  const [content, setContent]   = useState("");
  const [passage, setPassage]   = useState("");
  const [pinyin, setPinyin]     = useState("");
  const [explanation, setExplanation] = useState("");
  const [answers, setAnswers]   = useState(["ĐÚNG (对)","SAI (错)"]);
  const [correct, setCorrect]   = useState(0);
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages]     = useState([null,null,null,null,null]);
  const [words, setWords]       = useState(["我","把","书","放在","桌子","上"]);
  const [newWord, setNewWord]   = useState("");
  const [correctOrder, setCorrectOrder] = useState("");
  const [hints, setHints]       = useState(["从来没有","已经","还没","正在"]);
  const [newHint, setNewHint]   = useState("");
  const [blanks, setBlanks]     = useState([{answer:""}]);
  const [form, setForm]         = useState({hsk:"HSK 1",autoGrade:true,shuffle:false,pinyin:true,score:1,seconds:60,status:"done"});
  const [subSentences, setSubSentences] = useState(
    Array.from({length:5},(_,i)=>({id:i+1,text:"",answer:"A"}))
  );
  const [matchSentences, setMatchSentences] = useState(
    Array.from({length:5},(_,i)=>({id:i+1,question:"",answer:"A"}))
  );

  function switchType(t) {
    setActiveType(t);
    if (t==="dung-sai-anh") { setAnswers(["ĐÚNG (对)","SAI (错)"]); setCorrect(0); }
    if (t==="abcd-doan")    { setAnswers(["","","",""]); setCorrect(0); }
  }

  function handleSave(andNext=false) {
    if (andNext) { setContent(""); setPassage(""); setExplanation(""); }
    else navigate("/adminEditQuiz/1");
  }

  function addWord() { if(newWord.trim()){ setWords([...words,newWord.trim()]); setNewWord(""); } }
  function removeWord(i) { setWords(words.filter((_,idx)=>idx!==i)); }
  function addHint() { if(newHint.trim()){ setHints([...hints,newHint.trim()]); setNewHint(""); } }
  function removeHint(i) { setHints(hints.filter((_,idx)=>idx!==i)); }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <QuizSidebar activeType={activeType} skill="doc"/>

      <div className="flex-1 flex flex-col overflow-hidden">
        <QuizPageHeader
          title={`Tạo câu hỏi Đọc — ${TYPES.find(t=>t.value===activeType)?.label}`}
          onSaveAndNext={()=>handleSave(true)}
          onSaveAndClose={()=>handleSave(false)}
        />

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-5 max-w-5xl mx-auto">
            <div className="flex-1 min-w-0 space-y-4">

              {/* Type tabs - scrollable */}
              <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex gap-1 overflow-x-auto">
                {TYPES.map(t=>(
                  <button key={t.value} onClick={()=>switchType(t.value)}
                    className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition ${activeType===t.value?"bg-primary text-white shadow-sm":"text-slate-500 hover:bg-slate-100"}`}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* ── ĐÚNG SAI + ẢNH ── */}
              {activeType==="dung-sai-anh" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4 items-start">
                    <div>
                      <label className={labelCls}>Ảnh câu hỏi</label>
                      <ImageSlot value={mainImage} onChange={setMainImage}/>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className={labelCls}>Câu trần thuật</label>
                        <textarea className={inputCls+" resize-none"} rows={3} value={content} onChange={e=>setContent(e.target.value)} placeholder="Mô tả ảnh bằng tiếng Trung..."/>
                      </div>
                      <div>
                        <label className={labelCls}>Pinyin</label>
                        <input className={inputCls} value={pinyin} onChange={e=>setPinyin(e.target.value)} placeholder="Phiên âm..."/>
                      </div>
                      <div>
                        <label className={labelCls}>Đáp án đúng</label>
                        <div className="flex gap-2">
                          {["ĐÚNG (对)","SAI (错)"].map((a,i)=>(
                            <button key={i} onClick={()=>setCorrect(i)}
                              className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-xs transition flex items-center justify-center gap-1.5 ${correct===i?i===0?"border-emerald-400 bg-emerald-50 text-emerald-700":"border-red-400 bg-red-50 text-red-700":"border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                              <span className="material-symbols-outlined text-sm">{i===0?"check_circle":"cancel"}</span>{a}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── GỘP CÂU ẢNH ── */}
              {activeType==="gop-anh" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>5 ảnh lựa chọn (A – E)</label>
                    <div className="grid grid-cols-5 gap-2">
                      {["A","B","C","D","E"].map((l,i)=>(
                        <div key={i} className="rounded-xl overflow-hidden border border-slate-200">
                          <ImageSlot value={images[i]} onChange={v=>{ const n=[...images]; n[i]=v; setImages(n); }}/>
                          <div className="bg-slate-50 py-1 text-center"><span className="text-xs font-bold text-slate-500">{l}</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>5 câu hỏi — chọn đáp án tương ứng</label>
                    <div className="space-y-2">
                      {subSentences.map((s,i)=>(
                        <div key={s.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl">
                          <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</div>
                          <input className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary" placeholder={`Câu hỏi ${i+1}...`}
                            value={s.text} onChange={e=>{ const n=[...subSentences]; n[i]={...n[i],text:e.target.value}; setSubSentences(n); }}/>
                          <select value={s.answer} onChange={e=>{ const n=[...subSentences]; n[i]={...n[i],answer:e.target.value}; setSubSentences(n); }}
                            className="border border-slate-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-primary">
                            {["A","B","C","D","E"].map(l=><option key={l}>{l}</option>)}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── GỘP CÂU VĂN ── */}
              {activeType==="gop-van" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>5 câu lựa chọn (A – E)</label>
                    <div className="space-y-2">
                      {["A","B","C","D","E"].map((l,i)=>(
                        <div key={i} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl">
                          <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{l}</span>
                          <input className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary" placeholder={`Câu ${l}...`}/>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>5 câu hỏi — chọn đáp án A–E</label>
                    <div className="space-y-2">
                      {matchSentences.map((s,i)=>(
                        <div key={s.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl">
                          <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</div>
                          <input className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary" placeholder={`Câu hỏi ${i+1}...`}
                            value={s.question} onChange={e=>{ const n=[...matchSentences]; n[i]={...n[i],question:e.target.value}; setMatchSentences(n); }}/>
                          <select value={s.answer} onChange={e=>{ const n=[...matchSentences]; n[i]={...n[i],answer:e.target.value}; setMatchSentences(n); }}
                            className="border border-slate-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-primary">
                            {["A","B","C","D","E"].map(l=><option key={l}>{l}</option>)}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── A B C D ĐOẠN ── */}
              {activeType==="abcd-doan" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Đoạn văn đọc hiểu</label>
                    <textarea className={inputCls+" resize-none"} rows={5} value={passage} onChange={e=>setPassage(e.target.value)} placeholder="Nhập đoạn văn tiếng Trung..."/>
                  </div>
                  <div>
                    <label className={labelCls}>Câu hỏi</label>
                    <textarea className={inputCls+" resize-none"} rows={2} value={content} onChange={e=>setContent(e.target.value)} placeholder="Câu hỏi cho đoạn văn trên..."/>
                  </div>
                  <div>
                    <label className={labelCls}>Đáp án A B C D</label>
                    <AnswerOptions answers={answers} correct={correct} onChange={setAnswers} onCorrect={setCorrect} maxOptions={4}/>
                  </div>
                </div>
              )}

              {/* ── SẮP XẾP TỪ ── */}
              {activeType==="sap-xep" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Các từ cần sắp xếp</label>
                    <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 min-h-14 mb-2">
                      {words.map((w,i)=>(
                        <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm group">
                          {w}
                          <button onClick={()=>removeWord(i)} className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition">
                            <span className="material-symbols-outlined text-xs">close</span>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input value={newWord} onChange={e=>setNewWord(e.target.value)}
                        onKeyDown={e=>e.key==="Enter"&&addWord()}
                        className={inputCls} placeholder="Nhập từ mới + Enter"/>
                      <button onClick={addWord} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition">Thêm</button>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Thứ tự đúng (câu hoàn chỉnh)</label>
                    <input className={inputCls} value={correctOrder} onChange={e=>setCorrectOrder(e.target.value)} placeholder="VD: 我把书放在桌子上"/>
                  </div>
                  <div>
                    <label className={labelCls}>Nghĩa tiếng Việt</label>
                    <input className={inputCls} placeholder="Tôi đặt cuốn sách lên bàn"/>
                  </div>
                  <div>
                    <label className={labelCls}>Pinyin</label>
                    <input className={inputCls} value={pinyin} onChange={e=>setPinyin(e.target.value)} placeholder="Wǒ bǎ shū fàng zài zhuōzi shàng"/>
                  </div>
                </div>
              )}

              {/* ── ĐIỀN TỪ ── */}
              {activeType==="dien-tu" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Đoạn văn (dùng ___ đánh dấu chỗ trống)</label>
                    <textarea className={inputCls+" resize-none"} rows={4} value={passage} onChange={e=>setPassage(e.target.value)} placeholder="VD: 他___去过北京，所以对那里的景点非常熟悉。"/>
                    <p className="text-xs text-slate-400 mt-1">Dùng <code className="bg-slate-100 px-1 rounded">___</code> để đánh dấu chỗ cần điền</p>
                  </div>
                  <div>
                    <label className={labelCls}>Các từ gợi ý để chọn</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {hints.map((h,i)=>(
                        <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-sm font-medium text-amber-800 group">
                          {h}
                          <button onClick={()=>removeHint(i)} className="text-amber-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                            <span className="material-symbols-outlined text-xs">close</span>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input value={newHint} onChange={e=>setNewHint(e.target.value)}
                        onKeyDown={e=>e.key==="Enter"&&addHint()}
                        className={inputCls} placeholder="Thêm từ gợi ý + Enter"/>
                      <button onClick={addHint} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition">Thêm</button>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Đáp án đúng</label>
                    <input className={inputCls} placeholder="Nhập đáp án chính xác..."/>
                  </div>
                </div>
              )}

              {/* Explanation */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <label className={labelCls}>Giải thích đáp án</label>
                <textarea className={inputCls+" resize-none"} rows={3} value={explanation} onChange={e=>setExplanation(e.target.value)} placeholder="Giải thích tại sao đáp án đúng..."/>
              </div>
            </div>

            <QuizRightPanel form={form} setForm={setForm}/>
          </div>
        </div>
      </div>
    </div>
  );
}
