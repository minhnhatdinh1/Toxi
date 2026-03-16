import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  QuizSidebar, QuizPageHeader, QuizRightPanel,
  AnswerOptions, ImageSlot, inputCls, labelCls,
} from "./_QuizShared";

const MOCK = {
  type:"abcd-doan",
  passage:"根据短文，这个人每天都在公园跑步，他非常喜欢运动。",
  content:"根据短文，下面哪个说法是正确的？",
  answers:["他很喜欢运动","他从来不锻炼","他每天骑自行车","他不喜欢游泳"],
  correct:0,
  explanation:"短文中提到他每天跑步，说明他很喜欢运动。",
  hsk:"HSK 3",
};

export default function EditRead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState(MOCK.type);
  const [passage, setPassage]     = useState(MOCK.passage);
  const [content, setContent]     = useState(MOCK.content);
  const [answers, setAnswers]     = useState(MOCK.answers);
  const [correct, setCorrect]     = useState(MOCK.correct);
  const [explanation, setExplanation] = useState(MOCK.explanation);
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages]       = useState([null,null,null,null,null]);
  const [words, setWords]         = useState(["我","把","书","放在","桌子","上"]);
  const [newWord, setNewWord]     = useState("");
  const [correctOrder, setCorrectOrder] = useState("我把书放在桌子上");
  const [hints, setHints]         = useState(["从来没有","已经","还没","正在"]);
  const [form, setForm]           = useState({hsk:MOCK.hsk,autoGrade:true,shuffle:false,pinyin:true,score:1,seconds:60,status:"done"});
  const [recentList] = useState([
    {id:7,type:"Đúng sai + ảnh",status:"done"},
    {id:9,type:"A B C D đoạn",  status:"done"},
    {id:10,type:"Sắp xếp từ",   status:"done"},
  ]);

  const TYPES = [
    {value:"dung-sai-anh",label:"Đúng sai + ảnh"},
    {value:"gop-anh",     label:"Gộp câu ảnh"},
    {value:"gop-van",     label:"Gộp câu văn"},
    {value:"abcd-doan",   label:"A B C D đoạn"},
    {value:"sap-xep",     label:"Sắp xếp từ"},
    {value:"dien-tu",     label:"Điền từ"},
  ];

  function handleSave() { navigate(-1); }

  function addWord() { if(newWord.trim()){ setWords([...words,newWord.trim()]); setNewWord(""); } }
  function removeWord(i) { setWords(words.filter((_,idx)=>idx!==i)); }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <QuizSidebar activeType={activeType} skill="doc"/>

      <div className="flex-1 flex flex-col overflow-hidden">
        <QuizPageHeader
          title={`Chỉnh sửa câu #${id||"??"} — ${TYPES.find(t=>t.value===activeType)?.label} (Đọc)`}
          isEdit
          onSaveAndNext={()=>navigate(-1)}
          onSaveAndClose={handleSave}
        />

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-5 max-w-5xl mx-auto">
            <div className="flex-1 min-w-0 space-y-4">

              {/* Type tabs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex gap-1 overflow-x-auto">
                {TYPES.map(t=>(
                  <button key={t.value} onClick={()=>setActiveType(t.value)}
                    className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition ${activeType===t.value?"bg-primary text-white shadow-sm":"text-slate-500 hover:bg-slate-100"}`}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* ĐÚNG SAI + ẢNH */}
              {activeType==="dung-sai-anh" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Ảnh câu hỏi</label>
                      <ImageSlot value={mainImage} onChange={setMainImage}/>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className={labelCls}>Câu trần thuật</label>
                        <textarea className={inputCls+" resize-none"} rows={3} value={content} onChange={e=>setContent(e.target.value)}/>
                      </div>
                      <div>
                        <label className={labelCls}>Đáp án đúng</label>
                        <div className="flex gap-2">
                          {["ĐÚNG (对)","SAI (错)"].map((a,i)=>(
                            <button key={i} onClick={()=>setCorrect(i)}
                              className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-xs transition flex items-center justify-center gap-1 ${correct===i?i===0?"border-emerald-400 bg-emerald-50 text-emerald-700":"border-red-400 bg-red-50 text-red-700":"border-slate-200 text-slate-500"}`}>
                              <span className="material-symbols-outlined text-sm">{i===0?"check_circle":"cancel"}</span>{i===0?"Đúng":"Sai"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* A B C D ĐOẠN */}
              {activeType==="abcd-doan" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Đoạn văn</label>
                    <textarea className={inputCls+" resize-none"} rows={5} value={passage} onChange={e=>setPassage(e.target.value)}/>
                  </div>
                  <div>
                    <label className={labelCls}>Câu hỏi</label>
                    <textarea className={inputCls+" resize-none"} rows={2} value={content} onChange={e=>setContent(e.target.value)}/>
                  </div>
                  <div>
                    <label className={labelCls}>Đáp án A B C D</label>
                    <AnswerOptions answers={answers} correct={correct} onChange={setAnswers} onCorrect={setCorrect} maxOptions={4}/>
                  </div>
                </div>
              )}

              {/* SẮP XẾP TỪ */}
              {activeType==="sap-xep" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Các từ</label>
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
                      <input value={newWord} onChange={e=>setNewWord(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addWord()} className={inputCls} placeholder="Thêm từ..."/>
                      <button onClick={addWord} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold">Thêm</button>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Thứ tự đúng</label>
                    <input className={inputCls} value={correctOrder} onChange={e=>setCorrectOrder(e.target.value)}/>
                  </div>
                </div>
              )}

              {/* ĐIỀN TỪ */}
              {activeType==="dien-tu" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Đoạn văn (dùng ___ đánh dấu chỗ trống)</label>
                    <textarea className={inputCls+" resize-none"} rows={4} value={passage} onChange={e=>setPassage(e.target.value)}/>
                  </div>
                  <div>
                    <label className={labelCls}>Từ gợi ý</label>
                    <div className="flex flex-wrap gap-2">
                      {hints.map((h,i)=>(
                        <span key={i} className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-sm font-medium text-amber-800 group">
                          {h}
                          <button onClick={()=>setHints(hints.filter((_,idx)=>idx!==i))} className="text-amber-400 hover:text-red-500 opacity-0 group-hover:opacity-100">
                            <span className="material-symbols-outlined text-xs">close</span>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Đáp án đúng</label>
                    <input className={inputCls} placeholder="Nhập đáp án..."/>
                  </div>
                </div>
              )}

              {(activeType==="gop-anh"||activeType==="gop-van") && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm text-slate-500 text-center py-4">Chuyển sang dạng này sẽ reset nội dung câu hỏi. Bạn có chắc không?</p>
                  <button className="w-full py-2 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-primary hover:text-primary transition">
                    Xác nhận chuyển sang dạng {TYPES.find(t=>t.value===activeType)?.label}
                  </button>
                </div>
              )}

              {/* Explanation */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <label className={labelCls}>Giải thích đáp án</label>
                <textarea className={inputCls+" resize-none"} rows={3} value={explanation} onChange={e=>setExplanation(e.target.value)}/>
              </div>

            </div>
            <QuizRightPanel form={form} setForm={setForm} recentList={recentList}/>
          </div>
        </div>
      </div>
    </div>
  );
}
