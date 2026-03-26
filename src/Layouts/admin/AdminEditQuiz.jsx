import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams,Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import LoadingSpinner from "../common/LoadingSpinner";
import {
  fetchQuizDetail,
  createQuestion,
  removeQuestionFromQuiz,
  reorderQuestions,fetchQuestionBank,
 updateQuiz
} from "./api/apiquiz";

const SKILL_BADGE = {nghe:"bg-blue-100 text-blue-800",doc:"bg-emerald-100 text-emerald-800",viet:"bg-orange-100 text-orange-800"};
const SKILL_LABEL = {nghe:"Nghe",doc:"Đọc",viet:"Viết"};
const HSK_BADGE = {"HSK 1":"bg-emerald-100 text-emerald-800","HSK 2":"bg-blue-100 text-blue-800","HSK 3":"bg-violet-100 text-violet-800","HSK 4":"bg-orange-100 text-orange-800","HSK 5":"bg-red-100 text-red-800","HSK 6":"bg-slate-800 text-slate-100"};

function getQuestionSpan(question) {
  if (question?.questionType === "gop-cau" || question?.questionType === "gop-anh" || question?.questionType === "gop-van") {
    return question?.subQuestions?.length || 1;
  }
  return 1;
}

function withDisplayRange(questionList) {
  let runningNumber = 1;
  return (questionList || []).map((question) => {
    const span = getQuestionSpan(question);
    const displayStart = runningNumber;
    const displayEnd = runningNumber + span - 1;
    runningNumber += span;

    return {
      ...question,
      displayStart,
      displayEnd,
      displaySpan: span,
    };
  });
}

function Modal({ title, sub, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
              {sub && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{sub}</p>}
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition ml-4">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function AdminEditQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quizInfo, setQuizInfo]  = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [saved, setSaved]       = useState(false);
  const [delQ, setDelQ]         = useState(null);
  const [showAddFromBank, setShowAddFromBank] = useState(false);
  const [bankQuestions, setBankQuestions] = useState([]);
  const [bankSearch, setBankSearch] = useState("");
  const [selectedBankIds, setSelectedBankIds] = useState([]);
  const [activeSkill, setActiveSkill] = useState("all");
  const [dragIdx, setDragIdx]   = useState(null);
  const [showAddQuestionStep, setShowAddQuestionStep] = useState(false);
  const [searchParams] = useSearchParams();
const currentStep = Number(searchParams.get("step")) || 1;
const [step, setStep] = useState(2); // mặc định = 2 luôn

  // ================== LOAD DATA ==================
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Lấy chi tiết đề + câu hỏi
        const response = await fetchQuizDetail(id);
        
        if (response.success) {
          setQuizInfo(response.data);
          setQuestions(withDisplayRange(response.data.questions || []));
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }

      try {
        const bankRes = await fetchQuestionBank(id);
        if (bankRes.success) {
          setBankQuestions(bankRes.data || []);
        }
      } catch (err) {
        console.error("Error fetching question bank:", err);
        setBankQuestions([]);
      }
    };

    loadData();
  }, [id]);

  useEffect(() => {
  if (currentStep === 2) {
    setShowAddQuestionStep(true);
  }
}, [currentStep]);

const handlePublish = async () => {
  try {
    await updateQuiz(id, {
      title: quizInfo.title || "",
      quizType: quizInfo.quizType || "",
      hsklevel: quizInfo.hsklevel ?? 1,
      timeLimit: quizInfo.timeLimit ?? 1,
      passScore: quizInfo.passScore ?? 0,
      description: quizInfo.description || "",
      status: "ACTIVE",
      showPinyin: quizInfo.showPinyin ?? true,
      thumbnail: quizInfo.thumbnail || null,
      maxAttempts: quizInfo.maxAttempts ?? null,
      maxPauses: quizInfo.maxPauses ?? null
    });

    alert("Đã publish đề thi!");
    navigate("/adminQuiz");

  } catch (err) {
    alert("Lỗi publish: " + err.message);
  }
};
  // ================== SAVE ==================
  const handleSave = () => {
    setSaved(true);
    setTimeout(()=>setSaved(false), 2000);
  };

  // ================== DELETE QUESTION ==================
 const deleteQ = async (q) => {
    try {
      await removeQuestionFromQuiz(id, q.quizQuestionId || q.id);
      setQuestions(questions.filter(qq=>(qq.quizQuestionId || qq.id) !== (q.quizQuestionId || q.id)));
      setDelQ(null);
      alert("Gỡ câu hỏi thành công!");
    } catch (err) {
      alert("Lỗi gỡ câu hỏi: " + err.message);
    }
  };

  // ================== ADD FROM BANK ==================
  const addFromBank = async () => {
    try {
      await createQuestion(id, selectedBankIds);

      // Reload questions
      const response = await fetchQuizDetail(id);
      if (response.success) {
        setQuestions(withDisplayRange(response.data.questions || []));
      }

      setSelectedBankIds([]);
      setShowAddFromBank(false);
      alert("Thêm câu hỏi thành công!");
    } catch (err) {
      alert("Lỗi thêm câu hỏi: " + err.message);
    }
  };

  // ================== REORDER ==================
  const changeOrder = async (fromIdx, newPos) => {
    const pos = Math.max(0, Math.min(questions.length-1, newPos-1));
    if (pos===fromIdx) return;

    const newList = [...questions];
    const moved = newList.splice(fromIdx,1)[0];
    newList.splice(pos,0,moved);
    setQuestions(withDisplayRange(newList));

    // Gọi API để lưu thứ tự mới
    try {
      const orderedIds = newList.map(q => q.quizQuestionId || q.id);
      await reorderQuestions(id, orderedIds);
    } catch (err) {
      console.error("Error reordering:", err);
    }
  };

  // ================== DRAG & DROP ==================
  const onDragStart = (idx) => { setDragIdx(idx); }
  const onDrop = (idx) => {
    if (dragIdx===null||dragIdx===idx) return;
    changeOrder(dragIdx, idx+1);
    setDragIdx(null);
  };

  if (loading) return <LoadingSpinner fullScreen text="Dang tai du lieu..." />;
  if (error) return <div className="flex h-screen items-center justify-center text-red-600">{error}</div>;
  if (!quizInfo) return <div className="flex h-screen items-center justify-center">Không tìm thấy đề thi</div>;

const editRoute = (q) => {
  const skill = q.skill || "nghe";
  const qId = q.quizQuestionId || q.id;

  if (skill === "nghe") return `/adminQuiz/${id}/edit-question/listen/${qId}`;
  if (skill === "doc")  return `/adminQuiz/${id}/edit-question/read/${qId}`;
  return `/adminQuiz/${id}/edit-question/write/${qId}`;
};
  const filteredBank = bankQuestions.filter(q => {
    const ms = activeSkill==="all"||q.skill===activeSkill;
    const mq = !bankSearch||q.content.toLowerCase().includes(bankSearch.toLowerCase());
    return ms&&mq;
  });
  const totalQuestionCount = questions.reduce((sum, question) => sum + getQuestionSpan(question), 0);
  const completedQuestionCount = questions.reduce(
    (sum, question) => sum + (String(question.status || "").toLowerCase() === "done" ? getQuestionSpan(question) : 0),
    0
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3 flex-shrink-0">
          <button onClick={()=>navigate("/adminQuiz")} className="p-2 hover:bg-slate-100 rounded-lg transition">
            <span className="material-symbols-outlined text-slate-500">arrow_back</span>
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-slate-400">
              <Link to="/adminQuiz" className="hover:text-primary">Quản lí đề thi</Link>
              <span className="mx-1">›</span>
              <span className="text-slate-700">{quizInfo.title}</span>
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-amber-100 text-amber-700">✎ Đang chỉnh sửa</span>
              <h1 className="text-base font-bold text-slate-900 truncate">{quizInfo.title}</h1>
              <span className={`text-xs px-2.5 py-0.5 rounded-lg font-bold ${HSK_BADGE[`HSK ${quizInfo.hsklevel}`]}`}>HSK {quizInfo.hsklevel}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>navigate("/adminQuiz")} className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Huỷ</button>
            <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Lưu nháp</button>
            <button onClick={handleSave}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition shadow-md ${saved?"bg-emerald-600 shadow-emerald-200":"bg-primary shadow-primary/20 hover:bg-primary/90"} text-white`}>
              {saved ? "✓ Đã lưu!" : "Lưu (PUT)"}
            </button>
             {quizInfo.status === "DRAFT" && (
    <button
      onClick={handlePublish}
      className="px-5 py-2 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition">
      Publish
    </button>
  )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-5">

            {/* LEFT: Question list */}
            <div className="flex-1 min-w-0 space-y-4">

              {/* Quiz stats bar */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-6">
                {[
                  {label:"Tổng câu hỏi",val:totalQuestionCount,ico:"quiz",color:"text-blue-600"},
                  {label:"Thời gian",val:`${quizInfo.timeLimit} phút`,ico:"timer",color:"text-slate-700"},
                  {label:"Điểm đạt",val:`${quizInfo.passScore}%`,ico:"grade",color:"text-amber-600"},
                  {label:"Hoàn thiện",val:`${completedQuestionCount}/${totalQuestionCount}`,ico:"check_circle",color:"text-emerald-600"},
                ].map((s,i)=>(
                  <div key={i} className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-lg ${s.color}`}>{s.ico}</span>
                    <div>
                      <div className="text-xs text-slate-400">{s.label}</div>
                      <div className="text-sm font-bold text-slate-800">{s.val}</div>
                    </div>
                    {i<3 && <div className="w-px h-8 bg-slate-200 ml-4"/>}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-700">Câu hỏi trong đề ({totalQuestionCount})</h3>
                <div className="flex gap-2">
                  <button onClick={()=>setShowAddFromBank(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 transition">
                    <span className="material-symbols-outlined text-base">library_add</span>Thêm từ ngân hàng
                  </button>
   
                  <button onClick={() => setShowAddQuestionStep(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition shadow-md shadow-primary/20">
   <span className="material-symbols-outlined text-base">add_circle</span>Tạo câu mới
</button>
{showAddQuestionStep && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white w-full max-w-2xl rounded-2xl p-6">

      {/* Step 2 UI của bạn */}
       {step===2 && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h2 className="text-base font-bold text-slate-800 mb-1">Thêm câu hỏi</h2>
                  <p className="text-sm text-slate-500 mb-4">Chọn cách thêm câu hỏi vào đề thi</p>

                  <div className="grid grid-cols-2 gap-4">
               <button onClick={() => navigate(`/adminQuiz/${id}/add-question/listen`)}
                      className="group flex flex-col items-center gap-3 p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-primary hover:bg-blue-50 transition cursor-pointer">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition">
                        <span className="material-symbols-outlined text-blue-600 text-2xl">hearing</span>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-slate-700 text-sm">Câu hỏi Nghe</p>
                        <p className="text-xs text-slate-400 mt-0.5">Đúng/Sai, ABC ảnh, Gộp câu, ABCD</p>
                      </div>
                 </button>
                     <button onClick={() => navigate(`/adminQuiz/${id}/add-question/read`)}
                      className="group flex flex-col items-center gap-3 p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-primary hover:bg-emerald-50 transition cursor-pointer">
                      <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-200 transition">
                        <span className="material-symbols-outlined text-emerald-600 text-2xl">menu_book</span>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-slate-700 text-sm">Câu hỏi Đọc</p>
                        <p className="text-xs text-slate-400 mt-0.5">Đúng/Sai, Gộp câu, ABCD, Điền từ</p>
                      </div>
                    </button>

                   <button onClick={() => navigate(`/adminQuiz/${id}/add-question/write`)}
                      className="group flex flex-col items-center gap-3 p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-primary hover:bg-orange-50 transition cursor-pointer">
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-200 transition">
                        <span className="material-symbols-outlined text-orange-600 text-2xl">edit_note</span>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-slate-700 text-sm">Câu hỏi Viết</p>
                        <p className="text-xs text-slate-400 mt-0.5">Sắp xếp từ, Viết đoạn văn</p>
                      </div>
                    </button>


                   
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button  onClick={() => setShowAddQuestionStep(false)} className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 bg-white rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                    <span className="material-symbols-outlined text-base">arrow_back</span>Quay lại
                  </button>
                
                </div>
              </div>
            )}

    </div>
  </div>
)}
                </div>
              </div>

              {/* Question cards */}
              {questions.length===0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                  <span className="material-symbols-outlined text-5xl text-slate-300 block mb-3">quiz</span>
                  <p className="text-slate-400 text-sm mb-4">Chưa có câu hỏi nào trong đề thi này</p>
               
                </div>
              ) : questions.map((q, idx) => (
                <div key={q.quizQuestionId || q.id}
                  draggable
                  onDragStart={()=>onDragStart(idx)}
                  onDragOver={e=>e.preventDefault()}
                  onDrop={()=>onDrop(idx)}
                  className={`bg-white rounded-2xl border border-slate-200 hover:border-primary/30 transition group ${dragIdx===idx?"opacity-50 border-primary":""}`}>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Drag handle + order */}
                      <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-500 cursor-grab transition text-lg">drag_indicator</span>
                        <input
                          type="number" min={1} max={questions.length}
                          value={idx+1}
                          onChange={e=>changeOrder(idx,+e.target.value)}
                          className="w-9 text-center text-xs font-bold border border-slate-200 rounded-lg py-1 focus:outline-none focus:border-primary bg-slate-50"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${SKILL_BADGE[q.skill]}`}>{SKILL_LABEL[q.skill]}</span>
                          <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">{q.questionType}</span>
                          <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${HSK_BADGE[`HSK ${q.hskLevel}`]}`}>HSK {q.hskLevel}</span>
                          <span className={`w-2 h-2 rounded-full inline-block ml-auto ${q.status==="done"?"bg-emerald-500":"bg-amber-500"}`} title={q.status}/>
                        </div>
                        <p className="text-sm font-medium text-slate-800 leading-relaxed line-clamp-2">{q.content}</p>
                        {q.pinyin && <p className="text-xs text-slate-400 italic mt-1">{q.pinyin}</p>}
                        <p className="text-xs text-slate-500 mt-2">
                          {q.displaySpan > 1 ? `Hiển thị: Câu ${q.displayStart} - ${q.displayEnd}` : `Hiển thị: Câu ${q.displayStart}`}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Link to={editRoute(q)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition">
                          <span className="material-symbols-outlined text-sm">edit</span>Sửa
                        </Link>
                        <button onClick={()=>setDelQ(q)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition">
                          <span className="material-symbols-outlined text-sm">link_off</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: Settings panel */}
            <div className="w-64 flex-shrink-0 space-y-4">
              {/* Quiz info */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Thông tin đề thi</h3>
                <div className="space-y-2 text-xs">
                  {[
                    {l:"Cấp độ",v:`HSK ${quizInfo.hsklevel}`},
                    {l:"Dạng đề",v:quizInfo.quizType},
                    {l:"Thời gian",v:`${quizInfo.timeLimit} phút`},
                    {l:"Điểm đạt",v:`${quizInfo.passScore}%`},
                  ].map((r,i)=>(
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                      <span className="text-slate-500">{r.l}</span>
                      <span className="font-semibold text-slate-800">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE QUESTION MODAL */}
      {delQ && (
        <Modal title="Gỡ câu hỏi khỏi đề" sub="Câu hỏi sẽ bị gỡ khỏi đề thi này nhưng vẫn còn trong ngân hàng câu hỏi." onClose={()=>setDelQ(null)}>
          <p className="text-sm text-slate-600 mb-5 leading-relaxed bg-slate-50 rounded-xl p-3">
            <strong>"{delQ.content}"</strong>
          </p>
          <div className="flex gap-3 justify-end">
            <button onClick={()=>setDelQ(null)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Huỷ</button>
            <button onClick={()=>deleteQ(delQ)} className="px-5 py-2 rounded-xl bg-amber-600 text-white text-sm font-bold hover:bg-amber-700 transition">Gỡ khỏi đề</button>
          </div>
        </Modal>
      )}

      {/* ADD FROM BANK MODAL */}
      {showAddFromBank && (
        <Modal title="Thêm câu hỏi từ ngân hàng" sub="Chọn câu hỏi muốn thêm vào đề thi này." onClose={()=>{setShowAddFromBank(false);setSelectedBankIds([]);}}>
          {/* Search + filter */}
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input value={bankSearch} onChange={e=>setBankSearch(e.target.value)} placeholder="Tìm câu hỏi..."
                className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary"/>
            </div>
            <select value={activeSkill} onChange={e=>setActiveSkill(e.target.value)}
              className="border border-slate-200 rounded-xl px-2 py-2 text-sm focus:outline-none">
              <option value="all">Tất cả</option>
              <option value="nghe">Nghe</option>
              <option value="doc">Đọc</option>
              <option value="viet">Viết</option>
            </select>
          </div>

          {/* Bank list */}
          <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
            {filteredBank.length===0 ? (
              <p className="text-center text-slate-400 text-sm py-6">Không có câu hỏi nào phù hợp</p>
            ) : filteredBank.map(q=>(
              <div key={q.quizQuestionId || q.id} onClick={()=>setSelectedBankIds(prev => prev.includes(q.quizQuestionId || q.id) ? prev.filter(i=>i!==(q.quizQuestionId || q.id)) : [...prev, q.quizQuestionId || q.id])}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${selectedBankIds.includes(q.quizQuestionId || q.id)?"border-primary bg-blue-50":"border-slate-200 hover:bg-slate-50"}`}>
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${selectedBankIds.includes(q.quizQuestionId || q.id)?"bg-primary border-primary":"border-slate-300"}`}>
                  {selectedBankIds.includes(q.quizQuestionId || q.id) && <span className="material-symbols-outlined text-white text-xs">check</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-1.5 mb-1 flex-wrap">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${SKILL_BADGE[q.skill]}`}>{SKILL_LABEL[q.skill]}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">{q.questionType}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">{q.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500">Đã chọn {selectedBankIds.length} câu hỏi</span>
            <div className="flex gap-2">
              <button onClick={()=>{setShowAddFromBank(false);setSelectedBankIds([]);}}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Huỷ</button>
              <button onClick={addFromBank} disabled={selectedBankIds.length===0}
                className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition disabled:opacity-40">
                Thêm {selectedBankIds.length>0?`(${selectedBankIds.length})`:""}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
  
}



