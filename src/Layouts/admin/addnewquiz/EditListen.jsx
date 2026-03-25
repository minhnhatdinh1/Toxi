import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  QuizSidebar, QuizPageHeader, QuizRightPanel,
  AnswerOptions, AudioUpload, ImageSlot,
  inputCls, labelCls,
} from "./_QuizShared";

// Mock data - trong thực tế fetch từ API theo id
const MOCK = {
  type:"dung-sai", content:"他想去北京旅游。",
  pinyin:"Tā xiǎng qù Běijīng lǚyóu.",
  answers:["ĐÚNG (对)","SAI (错)"], correct:0,
  explanation:"Trong đoạn hội thoại, người nam nói muốn đi du lịch Bắc Kinh.",
  hsk:"HSK 1",
};

export default function EditListen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState(MOCK.type);
  const [audio, setAudio]           = useState(null);
  const [content, setContent]       = useState(MOCK.content);
  const [pinyin, setPinyin]         = useState(MOCK.pinyin);
  const [answers, setAnswers]       = useState(MOCK.answers);
  const [correct, setCorrect]       = useState(MOCK.correct);
  const [explanation, setExplanation] = useState(MOCK.explanation);
  const [images, setImages]         = useState([null,null,null,null,null]);
  const [saved, setSaved]           = useState(false);
  const [form, setForm]             = useState({hsk:MOCK.hsk,autoGrade:true,shuffle:false,pinyin:true,score:1,seconds:60,status:"done"});
  const [recentList] = useState([
    {id:1,type:"Đúng / Sai",status:"done"},
    {id:2,type:"ABC ảnh",   status:"done"},
    {id:3,type:"Gộp câu",   status:"draft"},
  ]);

  const TYPES = [
    {value:"dung-sai",    label:"Đúng / Sai"},
    {value:"abc-anh",     label:"A B C ảnh"},
    {value:"gop-cau",     label:"Gộp câu"},
    {value:"abcd-vanban", label:"A B C D văn bản"},
  ];

  function handleSave() {
    setSaved(true);
    setTimeout(()=>{ setSaved(false); navigate(-1); }, 1500);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <QuizSidebar activeType={activeType} skill="nghe"/>

      <div className="flex-1 flex flex-col overflow-hidden">
        <QuizPageHeader
          title={`Chỉnh sửa câu #${id||"??"} — ${TYPES.find(t=>t.value===activeType)?.label} (Nghe)`}
          isEdit
          onSaveAndNext={()=>navigate(-1)}
          onSaveAndClose={handleSave}
        />

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-5 max-w-5xl mx-auto">
            <div className="flex-1 min-w-0 space-y-4">

              {/* Type tabs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex gap-1">
                {TYPES.map(t=>(
                  <button key={t.value} onClick={()=>setActiveType(t.value)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${activeType===t.value?"bg-primary text-white shadow-sm":"text-slate-500 hover:bg-slate-100"}`}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Audio */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <AudioUpload label="File audio câu hỏi" value={audio} onChange={setAudio}/>
              </div>

              {/* ĐÚNG / SAI */}
              {activeType==="dung-sai" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Câu trần thuật</label>
                    <textarea className={inputCls+" resize-none"} rows={2} value={content} onChange={e=>setContent(e.target.value)}/>
                  </div>
                  <div>
                    <label className={labelCls}>Pinyin</label>
                    <input className={inputCls} value={pinyin} onChange={e=>setPinyin(e.target.value)}/>
                  </div>
                  <div>
                    <label className={labelCls}>Đáp án đúng</label>
                    <div className="flex gap-3">
                      {["ĐÚNG (对)","SAI (错)"].map((a,i)=>(
                        <button key={i} onClick={()=>setCorrect(i)}
                          className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition flex items-center justify-center gap-2 ${correct===i?i===0?"border-emerald-400 bg-emerald-50 text-emerald-700":"border-red-400 bg-red-50 text-red-700":"border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                          <span className="material-symbols-outlined">{i===0?"check_circle":"cancel"}</span>{a}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* A B C ẢNH */}
              {activeType==="abc-anh" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <label className={labelCls}>3 ảnh lựa chọn</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["A","B","C"].map((l,i)=>(
                      <div key={i} className={`rounded-2xl overflow-hidden border-2 transition ${correct===i?"border-emerald-400":"border-slate-200"}`}>
                        <ImageSlot value={images[i]} onChange={v=>{ const n=[...images]; n[i]=v; setImages(n); }}/>
                        <div className="bg-slate-50 py-1.5 flex items-center justify-between px-3">
                          <span className={`text-xs font-bold ${correct===i?"text-emerald-600":"text-slate-500"}`}>{l}</span>
                          <button onClick={()=>setCorrect(i)} className={`text-xs font-semibold ${correct===i?"text-emerald-600":"text-slate-400 hover:text-emerald-500"}`}>
                            {correct===i?"✓ Đúng":"Đánh dấu"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* A B C D VĂN BẢN */}
              {(activeType==="abcd-vanban"||activeType==="gop-cau") && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Nội dung câu hỏi</label>
                    <textarea className={inputCls+" resize-none"} rows={3} value={content} onChange={e=>setContent(e.target.value)}/>
                  </div>
                  <div>
                    <label className={labelCls}>Đáp án</label>
                    <AnswerOptions answers={answers} correct={correct} onChange={setAnswers} onCorrect={setCorrect} maxOptions={activeType==="gop-cau"?5:4}/>
                  </div>
                </div>
              )}

              {/* Explanation */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <label className={labelCls}>Giải thích đáp án</label>
                <textarea className={inputCls+" resize-none"} rows={3} value={explanation} onChange={e=>setExplanation(e.target.value)}/>
                <div className="mt-3">
                  <label className={labelCls}>Pinyin</label>
                  <input className={inputCls} value={pinyin} onChange={e=>setPinyin(e.target.value)}/>
                </div>
              </div>

            </div>
            <QuizRightPanel form={form} setForm={setForm} recentList={recentList}/>
          </div>
        </div>
      </div>
    </div>
  );
}
