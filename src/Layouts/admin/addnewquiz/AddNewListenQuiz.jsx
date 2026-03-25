import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import {
  QuizSidebar, QuizPageHeader, QuizRightPanel,
  AnswerOptions, AudioUpload, ImageSlot,
  inputCls, labelCls,
} from "./_QuizShared";
import { useEffect } from "react";
import { fetchQuestionDetail, updateQuestion } from "../api/apiquiz";
import { createQuestion } from "../api/apiquiz";
const TYPES = [
  {value:"dung-sai",    label:"Đúng / Sai"},
  {value:"abc-anh",     label:"A B C ảnh"},
  {value:"gop-cau",     label:"Gộp câu"},
  {value:"abcd-vanban", label:"A B C D văn bản"},
];

export default function AddNewListenQuiz() {
  const navigate  = useNavigate();
  const { quizId, questionId } = useParams();
const isEdit = !!questionId;
  const [activeType, setActiveType] = useState("dung-sai");
  const [audio, setAudio]           = useState(null);
  const [content, setContent]       = useState("");
  const [pinyin, setPinyin]         = useState("");
  const [answers, setAnswers]       = useState(["ĐÚNG (对)","SAI (错)"]);
  const [correct, setCorrect]       = useState(0);
  const [explanation, setExplanation] = useState("");
  const [images, setImages]         = useState([null,null,null,null,null]);
  const [subQuestions, setSubQ]     = useState(
    Array.from({length:5},(_,i)=>({id:i+1,audio:null,answer:"A"}))
  );
  const [form, setForm] = useState({hsk:"HSK 1",autoGrade:true,shuffle:false,pinyin:true,score:1,seconds:60,status:"DONE"});
  const [recentList]    = useState([
    {id:1,type:"Đúng / Sai",status:"done"},
    {id:2,type:"ABC ảnh",   status:"done"},
  ]);
function switchType(t) {
  setActiveType(t);

  if (t === "dung-sai") {
    setAnswers(["ĐÚNG (对)", "SAI (错)"]);
    setCorrect(0);
  }

  if (t === "abc-anh") {
    setAnswers(["A", "B", "C"]);
    setCorrect(0);
  }

  if (t === "abcd-vanban") {
    setAnswers(["", "", "", ""]);
    setCorrect(0);
  }
}
  async function handleSave(andNext = false) {
      
    let finalOptions = [];

    // ===== ĐÚNG / SAI =====
    if (activeType === "dung-sai") {
      finalOptions = ["ĐÚNG (对)", "SAI (错)"].map((a, i) => ({
        content: a,
        imageUrl: null,
        isCorrect: i === correct
      }));
    }

    // ===== ABC ẢNH =====
    if (activeType === "abc-anh") {

      if (!content || content.trim().length < 3) {
        alert("Vui lòng nhập nội dung câu hỏi");
        return;
      }
    finalOptions = images.slice(0, 3).map((img, i) => {
        let imageUrl = null;
        
        if (img) {
            if (img instanceof File) {
                // New upload - lấy từ File name
                imageUrl = img.name;
            } else if (typeof img === 'object' && img.url) {
                // Existing image - extract filename từ URL
                imageUrl = img.url.split('/').pop(); // "hsk2new.jpg"
            } else if (typeof img === 'string') {
                // Direct string URL
                imageUrl = img.split('/').pop();
            }
        }
        
        return {
            content: String.fromCharCode(65 + i), // A, B, C
            imageUrl: imageUrl,  // ✅ Correct filename
            isCorrect: i === correct
        };
    });
    }

    // ===== ABCD VĂN BẢN =====
    if (activeType === "abcd-vanban") {
      finalOptions = answers.map((a, i) => ({
        content: a,
        imageUrl: null,
        isCorrect: i === correct
      }));
    }
    if (activeType === "gop-cau") {

  // Validate đủ 5 ảnh
  if (images.slice(0,5).some(img => !img)) {
    alert("Vui lòng tải đủ 5 ảnh");
    return;
  }

  // Build options A–E
  finalOptions = images.slice(0,5).map((img, i) => ({
    content: String.fromCharCode(65 + i), // A,B,C,D,E
    imageUrl: img?.name || null,
    optionOrder: i + 1,
    isCorrect: false
  }));

  // Build subQuestions
  payloadSubQuestions = subQuestions.map((sq, i) => ({
    content: sq.content || "",
    audioUrl: sq.audio?.name || null,
    correctAnswer: sq.answer,
    questionOrder: i + 1
  }));
}
  try {
    const payload = {
      questionType: activeType,
      skill: "nghe",
      hskLevel: parseInt(form.hsk.replace("HSK ", "")),

      content,
      pinyin,
      explanation,
      

     audioUrl: audio?.name || null,

      status: form.status.toUpperCase(),
      score: form.score,
   quizOptions: finalOptions,
     ...(activeType === "gop-cau" && {
    subQuestions: payloadSubQuestions
  })
    };

    if (isEdit) {
  await updateQuestion(questionId, payload);
} else {
  await createQuestion(quizId, payload);
}
    if (andNext) {
      setContent("");
      setAudio(null);
      setExplanation("");
    } else {
      navigate(`/adminEditQuiz/${quizId}`);
    }

  } catch (err) {
  console.log("FULL ERROR:", err.response);
  alert(JSON.stringify(err.response?.data));
}
}
useEffect(() => {
  if (!isEdit) return;

  async function load() {
    const res = await fetchQuestionDetail(questionId);
    const q = res.data;
  console.log("QUESTION:", q);
  console.log("OPTIONS:", q.quizOptions);
    setActiveType(q.questionType);
    setContent(q.content || "");
    setPinyin(q.pinyin || "");
    setExplanation(q.explanation || "");
    setForm(prev => ({
      ...prev,
      hsk: `HSK ${q.hskLevel}`,
      score: q.score,
      status: q.status
    }));

if (q.quizOptions) {
  setAnswers(q.quizOptions.map(o => o.content));
  setCorrect(q.quizOptions.findIndex(o => o.isCorrect));

 setImages(
  q.quizOptions.map(o =>
    o.imageUrl
      ? { name: o.imageUrl, url: o.imageUrl } // giữ nguyên tên file đầy đủ
      : null
  )
);
}
if (q.audioUrl) {
  setAudio({
    name: q.audioUrl.split("/").pop(),
    url: q.audioUrl.startsWith("http")
      ? q.audioUrl
      : `http://localhost:8080/uploads/${q.audioUrl}`
  });
}

    if (q.subQuestions) {
      setSubQ(q.subQuestions);
    }
  }

  load();
}, [questionId]);
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <QuizSidebar activeType={activeType} skill="nghe"   quizId={quizId} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <QuizPageHeader
          title={`${isEdit ? "Chỉnh sửa" : "Tạo"} câu hỏi Nghe — ${TYPES.find(t=>t.value===activeType)?.label}`}
      onCancel={() => navigate(`/adminEditQuiz/${quizId}`)}
          onSaveAndClose={()=>handleSave(false)}
        />

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-5 max-w-5xl mx-auto">

            {/* MAIN EDITOR */}
            <div className="flex-1 min-w-0 space-y-4">

              {/* Type tabs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex gap-1">
                {TYPES.map(t=>(
                  <button key={t.value} onClick={()=>switchType(t.value)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${activeType===t.value?"bg-primary text-white shadow-sm":"text-slate-500 hover:bg-slate-100"}`}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Audio upload (all types) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <AudioUpload label="File audio câu hỏi" value={audio} onChange={setAudio}/>
              </div>

              {/* ── ĐÚNG / SAI ── */}
              {activeType==="dung-sai" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Câu trần thuật (học viên đánh giá Đúng/Sai)</label>
                    <textarea className={inputCls+" resize-none"} rows={2} value={content} onChange={e=>setContent(e.target.value)} placeholder="Nhập câu trần thuật bằng tiếng Trung..."/>
                  </div>
                  <div>
                    <label className={labelCls}>Pinyin</label>
                    <input className={inputCls} value={pinyin} onChange={e=>setPinyin(e.target.value)} placeholder="Phiên âm tự động..."/>
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

              {/* ── A B C ẢNH ── */}
              {activeType==="abc-anh" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                   <div>
      <label className={labelCls}>Nội dung câu hỏi</label>
      <textarea
        className={inputCls+" resize-none"}
        rows={2}
        value={content}
        onChange={e=>setContent(e.target.value)}
        placeholder="VD: Hình nào đúng với nội dung nghe?"
      />
    </div>
                  <div>
                    <label className={labelCls}>3 ảnh lựa chọn</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["A","B","C"].map((l,i)=>(
                        <div key={i} className={`rounded-2xl overflow-hidden border-2 transition ${correct===i?"border-emerald-400":"border-slate-200 hover:border-slate-300"}`}>
                        <ImageSlot
  label={`Ảnh lựa chọn ${i+1}`}
  value={images[i]}  // string (tên file) hoặc File upload mới
  onChange={(file) => {
    const newImages = [...images];
    newImages[i] = file;
    setImages(newImages);
  }}
/>
                          <div className="bg-slate-50 py-1.5 flex items-center justify-between px-3">
                            <span className={`text-xs font-bold ${correct===i?"text-emerald-600":"text-slate-500"}`}>{l}</span>
                            <button onClick={()=>setCorrect(i)}
                              className={`text-xs font-semibold transition ${correct===i?"text-emerald-600":"text-slate-400 hover:text-emerald-500"}`}>
                              {correct===i?"✓ Đúng":"Đánh dấu"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── GỘP CÂU ── */}
              {activeType==="gop-cau" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>5 ảnh lựa chọn (A – E)</label>
                    <div className="grid grid-cols-5 gap-2">
                      {["A","B","C","D","E"].map((l,i)=>(
                        <div key={i} className="rounded-xl overflow-hidden border border-slate-200">
                     <ImageSlot
  value={images[i]}
  onChange={(file) => {
    const newImages = [...images];
    newImages[i] = file;
    setImages(newImages);
  }}
/>
                          <div className="bg-slate-50 py-1 text-center">
                            <span className="text-xs font-bold text-slate-500">{l}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>5 câu hỏi con (mỗi câu có audio riêng)</label>
                    <div className="space-y-3">
                      {subQuestions.map((sq,i)=>(
                        <div key={sq.id} className="border border-slate-200 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</div>
                          <input
  className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
  placeholder={`Nội dung câu hỏi ${i+1}...`}
  value={sq.content || ""}
  onChange={e => {
    const n = [...subQuestions];
    n[i] = { ...n[i], content: e.target.value };
    setSubQ(n);
  }}
/>
                            <select value={sq.answer}
                              onChange={e=>{ const n=[...subQuestions]; n[i]={...n[i],answer:e.target.value}; setSubQ(n); }}
                              className="border border-slate-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-primary">
                              {["A","B","C","D","E"].map(l=><option key={l}>{l}</option>)}
                            </select>
                          </div>
                          <AudioUpload label="" value={sq.audio}
                            onChange={v=>{ const n=[...subQuestions]; n[i]={...n[i],audio:v}; setSubQ(n); }}/>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── A B C D VĂN BẢN ── */}
              {activeType==="abcd-vanban" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Câu hỏi</label>
                    <textarea className={inputCls+" resize-none"} rows={3} value={content} onChange={e=>setContent(e.target.value)} placeholder="Nhập câu hỏi hoặc đoạn hội thoại..."/>
                  </div>
                  <div>
                    <label className={labelCls}>Đáp án A B C D</label>
                    <AnswerOptions answers={answers} correct={correct} onChange={setAnswers} onCorrect={setCorrect} maxOptions={4}/>
                  </div>
                </div>
              )}

              {/* Explanation (all types) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <label className={labelCls}>Giải thích đáp án</label>
                <textarea className={inputCls+" resize-none"} rows={3} value={explanation} onChange={e=>setExplanation(e.target.value)} placeholder="Giải thích tại sao đáp án đúng..."/>
                <div className="mt-3">
                  <label className={labelCls}>Pinyin tự động</label>
                  <input className={inputCls} value={pinyin} onChange={e=>setPinyin(e.target.value)} placeholder="Wǒ bǎ shū fàng zài zhuōzi shàng"/>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <QuizRightPanel form={form} setForm={setForm} recentList={recentList}/>
          </div>
        </div>
      </div>
    </div>
  );
}
