import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  QuizSidebar, QuizPageHeader, QuizRightPanel,
  ImageSlot, inputCls, labelCls,
} from "./_QuizShared";

const TYPES = [
  {value:"sap-xep-viet", label:"Sắp xếp từ", desc:"HSK 3"},
  {value:"viet-doan",    label:"Viết đoạn văn", desc:"HSK 4"},
];

export default function AddNewWritting() {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("sap-xep-viet");
  const [words, setWords]       = useState(["我","学习","汉语","每天","在家"]);
  const [newWord, setNewWord]   = useState("");
  const [correctOrder, setCorrectOrder] = useState("");
  const [pinyin, setPinyin]     = useState("");
  const [meaning, setMeaning]   = useState("");
  const [explanation, setExplanation] = useState("");
  const [promptImage, setPromptImage] = useState(null);
  const [promptText, setPromptText]   = useState("");
  const [minWords, setMinWords] = useState(80);
  const [form, setForm] = useState({hsk:"HSK 3",autoGrade:false,shuffle:false,pinyin:true,score:1,seconds:120,status:"done"});

  function addWord() { if(newWord.trim()){ setWords([...words,newWord.trim()]); setNewWord(""); } }
  function removeWord(i) { setWords(words.filter((_,idx)=>idx!==i)); }

  function handleSave(andNext=false) {
    if (andNext) { setWords([]); setCorrectOrder(""); setExplanation(""); setPromptText(""); }
    else navigate("/adminEditQuiz/1");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <QuizSidebar activeType={activeType} skill="viet"/>

      <div className="flex-1 flex flex-col overflow-hidden">
        <QuizPageHeader
          title={`Tạo câu hỏi Viết — ${TYPES.find(t=>t.value===activeType)?.label}`}
          onSaveAndNext={()=>handleSave(true)}
          onSaveAndClose={()=>handleSave(false)}
        />

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-5 max-w-5xl mx-auto">
            <div className="flex-1 min-w-0 space-y-4">

              {/* Type tabs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex gap-2">
                {TYPES.map(t=>(
                  <button key={t.value} onClick={()=>setActiveType(t.value)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition flex flex-col items-center gap-0.5 ${activeType===t.value?"bg-primary text-white shadow-sm":"text-slate-500 hover:bg-slate-100"}`}>
                    <span>{t.label}</span>
                    <span className={`text-[10px] font-normal ${activeType===t.value?"text-white/70":"text-slate-400"}`}>{t.desc}</span>
                  </button>
                ))}
              </div>

              {/* ── SẮP XẾP TỪ ── */}
              {activeType==="sap-xep-viet" && (
                <>
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                    <div>
                      <label className={labelCls}>Các từ cần sắp xếp</label>
                      <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 min-h-16 mb-2">
                        {words.map((w,i)=>(
                          <span key={i} className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm group cursor-grab">
                            <span className="material-symbols-outlined text-slate-300 text-sm">drag_indicator</span>
                            {w}
                            <button onClick={()=>removeWord(i)} className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition ml-1">
                              <span className="material-symbols-outlined text-xs">close</span>
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input value={newWord} onChange={e=>setNewWord(e.target.value)}
                          onKeyDown={e=>e.key==="Enter"&&addWord()}
                          className={inputCls} placeholder="Nhập từ + Enter để thêm"/>
                        <button onClick={addWord} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition">Thêm</button>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Thứ tự đúng (câu hoàn chỉnh)</label>
                      <input className={inputCls} value={correctOrder} onChange={e=>setCorrectOrder(e.target.value)} placeholder="VD: 我每天在家学习汉语"/>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Nghĩa tiếng Việt</label>
                        <input className={inputCls} value={meaning} onChange={e=>setMeaning(e.target.value)} placeholder="Tôi học tiếng Trung ở nhà mỗi ngày"/>
                      </div>
                      <div>
                        <label className={labelCls}>Pinyin</label>
                        <input className={inputCls} value={pinyin} onChange={e=>setPinyin(e.target.value)} placeholder="Wǒ měitiān zàijiā xuéxí Hànyǔ"/>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <label className={labelCls}>Giải thích cấu trúc ngữ pháp</label>
                    <textarea className={inputCls+" resize-none"} rows={3} value={explanation}
                      onChange={e=>setExplanation(e.target.value)}
                      placeholder="Giải thích trật tự từ trong câu, cấu trúc ngữ pháp liên quan..."/>
                  </div>
                </>
              )}

              {/* ── VIẾT ĐOẠN VĂN ── */}
              {activeType==="viet-doan" && (
                <>
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                    <div>
                      <label className={labelCls}>Ảnh gợi ý (chủ đề)</label>
                      <div className="max-w-xs">
                        <ImageSlot value={promptImage} onChange={setPromptImage}/>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Đoạn văn gợi ý / từ khoá</label>
                      <textarea className={inputCls+" resize-none"} rows={3} value={promptText}
                        onChange={e=>setPromptText(e.target.value)}
                        placeholder="Nhập từ khoá hoặc đoạn văn mẫu làm gợi ý cho học viên..."/>
                    </div>

                    <div>
                      <label className={labelCls}>Yêu cầu bài viết</label>
                      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-sm text-slate-600">Tối thiểu</span>
                        <input type="number" value={minWords} onChange={e=>setMinWords(+e.target.value)}
                          className="w-20 text-center border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary font-bold"/>
                        <span className="text-sm text-slate-600">từ</span>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Tiêu chí chấm điểm (gợi ý)</label>
                      <textarea className={inputCls+" resize-none"} rows={3}
                        placeholder="VD: Nội dung phù hợp ảnh, sử dụng đúng ngữ pháp, từ vựng đa dạng..."/>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <label className={labelCls}>Bài mẫu tham khảo (tuỳ chọn)</label>
                    <textarea className={inputCls+" resize-none"} rows={4}
                      placeholder="Nhập bài viết mẫu để giáo viên tham khảo khi chấm..."/>
                  </div>
                </>
              )}

            </div>
            <QuizRightPanel form={form} setForm={setForm}/>
          </div>
        </div>
      </div>
    </div>
  );
}
