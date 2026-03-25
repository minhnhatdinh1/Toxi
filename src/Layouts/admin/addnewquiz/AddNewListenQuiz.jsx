import { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import toxiLogo from "../../../assets/image/LOGO (1).png"
export default function addnewlistenPicture() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("listening");
  const [audioFile, setAudioFile] = useState(null);
  const handleTabChange = (tab) => {
  setActiveTab(tab);
=======
import {
  QuizSidebar, QuizPageHeader, QuizRightPanel,
  AnswerOptions, AudioUpload, ImageSlot,
  inputCls, labelCls,
} from "./_QuizShared";

const TYPES = [
  {value:"dung-sai",    label:"Đúng / Sai"},
  {value:"abc-anh",     label:"A B C ảnh"},
  {value:"gop-cau",     label:"Gộp câu"},
  {value:"abcd-vanban", label:"A B C D văn bản"},
];

export default function AddNewListenQuiz() {
  const navigate  = useNavigate();
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
  const [form, setForm] = useState({hsk:"HSK 1",autoGrade:true,shuffle:false,pinyin:true,score:1,seconds:60,status:"done"});
  const [recentList]    = useState([
    {id:1,type:"Đúng / Sai",status:"done"},
    {id:2,type:"ABC ảnh",   status:"done"},
  ]);
>>>>>>> dat

  function switchType(t) {
    setActiveType(t);
    if (t==="dung-sai")    { setAnswers(["ĐÚNG (对)","SAI (错)"]); setCorrect(0); }
    if (t==="abc-anh")     { setAnswers(["Ảnh A","Ảnh B","Ảnh C"]); setCorrect(0); }
    if (t==="abcd-vanban") { setAnswers(["","","",""]); setCorrect(0); }
  }

  function handleSave(andNext=false) {
    if (andNext) { setContent(""); setAudio(null); setExplanation(""); }
    else navigate("/adminEditQuiz/1");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <QuizSidebar activeType={activeType} skill="nghe"/>

      <div className="flex-1 flex flex-col overflow-hidden">
        <QuizPageHeader
          title={`Tạo câu hỏi Nghe — ${TYPES.find(t=>t.value===activeType)?.label}`}
          onSaveAndNext={()=>handleSave(true)}
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
                    <label className={labelCls}>3 ảnh lựa chọn</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["A","B","C"].map((l,i)=>(
                        <div key={i} className={`rounded-2xl overflow-hidden border-2 transition ${correct===i?"border-emerald-400":"border-slate-200 hover:border-slate-300"}`}>
                          <ImageSlot value={images[i]} onChange={v=>{ const n=[...images]; n[i]=v; setImages(n); }}/>
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
                          <ImageSlot value={images[i]} onChange={v=>{ const n=[...images]; n[i]=v; setImages(n); }}/>
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
                            <input className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary" placeholder={`Nội dung câu hỏi ${i+1}...`}/>
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
<<<<<<< HEAD
]);

   return(
        <>  
    <div className="min-h-screen text-text-main flex flex-col">

{/* Header */}
<header className="bg-primary text-white shadow-lg sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b-4 border-secondary h-20">

    {/* Logo */}
  <div className="flex items-center gap-4">

    <div className="h-12 w-12 rounded-xl flex items-center justify-center">
      <img src={toxiLogo} alt="TOXI Logo" className="h-full w-full object-contain" />
    </div>

    <div className="flex flex-col leading-tight">
      <h1 className="text-xl font-black tracking-tight text-white">
        TOXI
      </h1>

      <div className="flex items-center gap-2">
        <div className="h-[1px] w-3 bg-secondary"></div>

        <p className="text-[9px] uppercase tracking-widest text-secondary font-bold">
          Education
        </p>

        <div className="h-[1px] w-3 bg-secondary"></div>
      </div>
    </div>

  </div>

  <div className="flex items-center gap-3">

   <Link
    to="/adminaddnewquiz"
    className="px-4 py-2 text-sm font-medium hover:text-secondary transition-colors"
  >
    Hủy bỏ
  </Link>

  <Link
    to="/adminaddnewquiz"
    className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-full shadow-md text-sm transition-all border border-white/20"
  >
    Lưu và Thêm câu tiếp theo
  </Link>

  <Link
    to="/admin/publish-exam"
    className="bg-secondary text-primary font-bold px-6 py-2 rounded-full shadow-md flex items-center gap-2 text-sm"
  >
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>

    Lưu và Xuất bản
  </Link>

  </div>

</header>


<div className="flex flex-1 overflow-hidden">

{/* Sidebar */}
<aside className="w-64 bg-primary-dark flex-shrink-0 flex flex-col border-r border-slate-700/50">

  <nav className="flex-1 py-6 px-3 space-y-2">

   <Link
to="/AddNewFillOfWord"
className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
>
<span className="material-symbols-outlined text-xl">grid_view</span>
<span className="font-medium">câu hỏi điền từ</span>
</Link>

<Link
to="/listenquiz"
className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white"
>
<span className="material-symbols-outlined text-xl">inventory_2</span>
<span className="font-medium">bài nghe </span>
</Link>



  </nav>


  <div className="p-6 bg-primary/40 border-t border-white/5">

    <div className="flex items-center gap-3">

      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-primary text-xs">
        AD
      </div>

      <div>
        <p className="text-xs font-bold text-white">
          Admin User
        </p>

        <p className="text-[10px] text-slate-400">
          Quản trị viên
        </p>
      </div>

    </div>

  </div>

</aside>
<main className="flex-1 overflow-y-auto">
  <div className="max-w-[1440px] mx-auto p-6 space-y-6">

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      {/* Left Column */}
      <section className="lg:col-span-3 space-y-6">

        {/* Skill Selector */}
        <div
          className="bg-white rounded-xl shadow-sm p-2 flex items-center gap-2 border border-slate-200"
          data-purpose="skill-tabs"
        >

         <button
onClick={() => handleTabChange("listening")}
className={`flex-1 py-3 px-4 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 
${activeTab === "listening" ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-50"}
`}
>
Nghe (Listening)
</button>


         <button
onClick={() => handleTabChange("reading")}
className={`flex-1 py-3 px-4 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 
${activeTab === "reading" ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-50"}
`}
>
Đọc (Reading)
</button>


         <button
onClick={() => handleTabChange("writing")}
className={`flex-1 py-3 px-4 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 
${activeTab === "writing" ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-50"}
`}
>
Viết (Writing)
</button>

        </div>


        {/* Level + Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <label className="block text-xs font-bold text-primary uppercase mb-2">
              Cấp độ HSK
            </label>

            <select className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary">

              <option>HSK 1</option>
              <option>HSK 2</option>
              <option>HSK 3</option>
              <option>HSK 4</option>
              <option>HSK 5</option>
              <option>HSK 6</option>

            </select>

          </div>


          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">

            <label className="block text-xs font-bold text-primary uppercase mb-2">
              Loại câu hỏi
            </label>

          <select
  id="question-type"
  onChange={(e) => navigate(e.target.value)}
  className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary"
>

<option value="">Chọn dạng câu hỏi</option>

<option value="/addnewlistenPicture">
Nghe và chọn ảnh đúng (Listening - Match Image)
</option>

<option value="/listenQuiz">
Nghe và chọn đáp án đúng (Listening - MCQs)
</option>

<option value="/listenTrueFalseQuiz">
Đúng / Sai (True / False)
</option>
<option value="/listenPictureTrueFalseQuiz">
Đúng / Sai chọn ảnh 
</option>

</select>

          </div>

        </div>


        {/* Editor */}
        <div
          className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
          data-purpose="editor-container"
        >

          <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
            <h3 className="font-bold text-primary">Nội dung soạn thảo</h3>
            <span className="text-xs text-slate-400">
              Tự động lưu lúc 14:30
            </span>
          </div>


          <div  className="p-6 space-y-6">

            {/* Upload Audio */}

            <div className="space-y-2">
<label className="block text-sm font-semibold text-slate-700">
Tải lên file âm thanh (.mp3, .wav)
</label>

<input
type="file"
accept=".mp3,.wav"
onChange={handleAudioChange}
className="hidden"
id="audioUpload"
/>

<label
htmlFor="audioUpload"
className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-secondary transition-colors cursor-pointer bg-slate-50 group block"
>

<div className="mx-auto w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mb-2 group-hover:bg-secondary/10">

<svg
className="h-5 w-5 text-slate-500 group-hover:text-secondary"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
>
<path
d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="2"
/>
</svg>

</div>

<p className="text-sm text-slate-600">
{audioFile
? `File đã chọn: ${audioFile.name}`
: <>Kéo và thả tệp tại đây hoặc <span className="text-primary font-bold underline">chọn tệp</span></>
}
</p>

</label>

               
              </div>

            </div>


            {/* Chinese / Pinyin / Vietnamese */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="space-y-2">

                <label className="block text-sm font-semibold text-slate-700">
                  Nội dung tiếng Trung
                </label>

                <textarea
                  className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary text-sm"
                  placeholder="Nhập chữ Hán..."
                  rows="2"
                />

              </div>


              <div className="space-y-2">

                <label className="block text-sm font-semibold text-slate-700">
                  Phiên âm (Pinyin)
                </label>

                <textarea
                  className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary text-sm"
                  placeholder="Nhập Pinyin..."
                  rows="2"
                />

              </div>


              <div className="space-y-2">

                <label className="block text-sm font-semibold text-slate-700">
                  Dịch nghĩa tiếng Việt
                </label>

                <textarea
                  className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary text-sm"
                  placeholder="Nhập nghĩa tiếng Việt..."
                  rows="2"
                />

              </div>

            </div>


            {/* Script */}

            <div className="space-y-2">

              <label className="block text-sm font-semibold text-slate-700">
                Nội dung câu hỏi
              </label>

              <textarea
                className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary"
                placeholder="Nhập lời thoại của đoạn băng..."
                rows="2"
              />

            </div>

         
   {/* Multiple Choice Options */}
<div className="space-y-4">

  <label className="block text-sm font-semibold text-slate-700">
    Các phương án đáp án
  </label>

  <div className="space-y-4">

    {/* Option A */}
    <div className="flex items-start gap-3 p-3 border border-slate-100 rounded-lg bg-slate-50/50">

      <input
        type="radio"
        name="correct_answer"
        className="mt-2 w-5 h-5 text-secondary focus:ring-secondary"
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">

        <div className="flex gap-2">

          <span className="bg-slate-200 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600">
            A
          </span>

          <input
            type="text"
            placeholder="Chữ Hán đáp án A"
            className="flex-1 rounded-r-md border-slate-300 focus:ring-secondary focus:border-secondary text-sm"
          />

        </div>

        <input
          type="text"
          placeholder="Dịch nghĩa tiếng Việt A"
          className="rounded-md border-slate-300 focus:ring-secondary focus:border-secondary text-sm"
        />

      </div>

    </div>


    {/* Option B */}
    <div className="flex items-start gap-3 p-3 border border-slate-100 rounded-lg bg-slate-50/50">

      <input
        type="radio"
        name="correct_answer"
        className="mt-2 w-5 h-5 text-secondary focus:ring-secondary"
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">

        <div className="flex gap-2">

          <span className="bg-slate-200 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600">
            B
          </span>

          <input
            type="text"
            placeholder="Chữ Hán đáp án B"
            className="flex-1 rounded-r-md border-slate-300 focus:ring-secondary focus:border-secondary text-sm"
          />

        </div>

        <input
          type="text"
          placeholder="Dịch nghĩa tiếng Việt B"
          className="rounded-md border-slate-300 focus:ring-secondary focus:border-secondary text-sm"
        />

      </div>

    </div>


    {/* Option C */}
    <div className="flex items-start gap-3 p-3 border border-slate-100 rounded-lg bg-slate-50/50">

      <input
        type="radio"
        name="correct_answer"
        className="mt-2 w-5 h-5 text-secondary focus:ring-secondary"
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">

        <div className="flex gap-2">

          <span className="bg-slate-200 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600">
            C
          </span>

          <input
            type="text"
            placeholder="Chữ Hán đáp án C"
            className="flex-1 rounded-r-md border-slate-300 focus:ring-secondary focus:border-secondary text-sm"
          />

        </div>

        <input
          type="text"
          placeholder="Dịch nghĩa tiếng Việt C"
          className="rounded-md border-slate-300 focus:ring-secondary focus:border-secondary text-sm"
        />

      </div>

    </div>


    {/* Option D */}
    <div className="flex items-start gap-3 p-3 border border-slate-100 rounded-lg bg-slate-50/50">

      <input
        type="radio"
        name="correct_answer"
        className="mt-2 w-5 h-5 text-secondary focus:ring-secondary"
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">

        <div className="flex gap-2">

          <span className="bg-slate-200 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600">
            D
          </span>

          <input
            type="text"
            placeholder="Chữ Hán đáp án D"
            className="flex-1 rounded-r-md border-slate-300 focus:ring-secondary focus:border-secondary text-sm"
          />

        </div>

        <input
          type="text"
          placeholder="Dịch nghĩa tiếng Việt D"
          className="rounded-md border-slate-300 focus:ring-secondary focus:border-secondary text-sm"
        />

      </div>

    </div>

  </div>


  {/* Add option */}
  <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">

    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 4v16m8-8H4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>

    Thêm lựa chọn

  </button>


  {/* Explanation */}

  <div className="space-y-2 pt-4 border-t border-slate-100">

    <label className="block text-sm font-semibold text-slate-700 italic">
      Giải thích đáp án chi tiết (Hướng dẫn học sinh)
    </label>

    <textarea
      rows="4"
      placeholder="Giải thích chi tiết tại sao chọn đáp án này, phân tích ngữ pháp hoặc từ vựng..."
      className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary"
    />

  </div>

</div>
        </div>

      </section>
{/* Right Sidebar */}
<aside className="space-y-6">

  {/* Metadata Card */}
  <section
    className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
    data-purpose="metadata"
  >

    {/* Header */}
    <div className="bg-primary px-4 py-3 border-b border-secondary">
      <h3 className="text-white font-bold text-sm tracking-widest uppercase">
        Thông tin bổ trợ
      </h3>
    </div>

    <div className="p-4 space-y-4">

      {/* Difficulty */}
      <div>

        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
          Độ khó
        </label>

        <div className="flex gap-2">

          <button className="flex-1 py-1 text-xs border border-green-500 text-green-600 rounded bg-green-50 font-bold">
            Dễ
          </button>

          <button className="flex-1 py-1 text-xs border border-orange-500 text-orange-600 rounded font-bold">
            TB
          </button>

          <button className="flex-1 py-1 text-xs border border-red-500 text-red-600 rounded font-bold">
            Khó
          </button>

        </div>

      </div>


      {/* Score */}
      <div>

        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
          Điểm số
        </label>

        <input
          type="number"
          step="0.5"
          defaultValue="2.5"
          className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary"
        />

      </div>


      {/* Tags */}
      <div>

        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
          Tags / Từ khóa
        </label>

        <input
          type="text"
          placeholder="Nhấn Enter để thêm tag"
          className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary text-sm"
        />

        <div className="flex flex-wrap gap-2 mt-2">

          <span className="bg-slate-100 text-[10px] font-bold px-2 py-1 rounded-full border border-slate-200 flex items-center gap-1">
            Gia đình
            <button className="hover:text-red-500">×</button>
          </span>

          <span className="bg-slate-100 text-[10px] font-bold px-2 py-1 rounded-full border border-slate-200 flex items-center gap-1">
            HSK1
            <button className="hover:text-red-500">×</button>
          </span>

        </div>

      </div>

    </div>

  </section>

</aside>

    </div>
{/* Created Questions List */}
<section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

  {/* Header */}
  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">

    <h3 className="font-bold text-primary flex items-center gap-2">

      <svg
        className="h-5 w-5 text-secondary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>

      Danh sách câu hỏi đã tạo (4)

    </h3>

    <button className="text-xs font-bold text-primary hover:underline">
      Xuất dữ liệu (.xlsx)
    </button>

  </div>


  {/* Table */}
  <div className="overflow-x-auto">

    <table className="w-full text-left text-sm">

      <thead className="bg-slate-50/50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">

        <tr>
          <th className="px-6 py-3">STT</th>
          <th className="px-6 py-3">Loại</th>
          <th className="px-6 py-3">Nội dung</th>
          <th className="px-6 py-3">Cấp độ</th>
          <th className="px-6 py-3">Thao tác</th>
        </tr>

      </thead>


     <tbody className="divide-y divide-slate-100">

{(showAll ? questions : questions.slice(0,2)).map((q,index)=>(
<tr key={q.id} className="hover:bg-slate-50 transition-colors">

<td className="px-6 py-4 font-medium text-slate-400">
{index+1}
</td>

<td className="px-6 py-4">
<span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">
{q.type}
</span>
</td>

<td className="px-6 py-4">
<p className="font-medium text-slate-700 truncate max-w-md">
{q.content}
</p>
</td>

<td className="px-6 py-4">
<span className="font-bold text-primary">
{q.level}
</span>
</td>

<td className="px-6 py-4">
<div className="flex gap-2">

<Link to="/editlisten" className="p-1 hover:text-primary">
  <span className="material-symbols-outlined text-base">
    edit
  </span>
</Link>

<button className="p-1 hover:text-red-500">
<span className="material-symbols-outlined text-base">
delete
</span>
</button>

</div>
</td>

</tr>
))}

</tbody>

    </table>

  </div>


  {/* Footer */}
  <div className="p-4 bg-slate-50/50 border-t border-slate-200 text-center">

   <button
onClick={()=>setShowAll(!showAll)}
className="text-xs font-bold text-slate-500 hover:text-primary"
>
{showAll ? "Thu gọn danh sách" : "Xem tất cả câu hỏi"}
</button>

  </div>

</section>
  </div>
</main>
</div>

</div>
        </>
    )
}
=======
>>>>>>> dat
