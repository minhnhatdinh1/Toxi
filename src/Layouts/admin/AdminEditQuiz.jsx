import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const MOCK_QUESTIONS = [
  {id:1,skill:"nghe",type:"Đúng / Sai",hsk:"HSK 1",content:"他想去北京旅游。",pinyin:"Tā xiǎng qù Běijīng lǚyóu.",answers:["ĐÚNG (对)","SAI (错)"],correct:0,status:"done"},
  {id:2,skill:"nghe",type:"A B C ảnh",hsk:"HSK 1",content:"请选择与录音内容一致的图片。",pinyin:"",answers:["Ảnh A","Ảnh B","Ảnh C"],correct:1,status:"done"},
  {id:3,skill:"nghe",type:"A B C D văn bản",hsk:"HSK 2",content:'"经理，这份材料我已经翻译好了。" 问：说话人做了什么？',pinyin:"",answers:["他们正在开会","材料已经写完了","翻译工作完成了","经理还没回来"],correct:2,status:"done"},
  {id:4,skill:"doc",type:"Đúng sai + ảnh",hsk:"HSK 1",content:"图片中的人正在跑步。",pinyin:"Túpiàn zhōng de rén zhèngzài pǎobù.",answers:["ĐÚNG (对)","SAI (错)"],correct:0,status:"done"},
  {id:5,skill:"doc",type:"A B C D đoạn",hsk:"HSK 3",content:"根据短文，下面哪个说法是正确的？",pinyin:"",answers:["他很喜欢运动","他从来不锻炼","他每天骑自行车","他不喜欢游泳"],correct:0,status:"draft"},
  {id:6,skill:"viet",type:"Sắp xếp từ",hsk:"HSK 3",content:"我 / 学习 / 汉语 / 每天 / 在家",pinyin:"Wǒ měitiān zàijiā xuéxí Hànyǔ.",answers:["我每天在家学习汉语"],correct:0,status:"done"},
];

const SKILL_BADGE = {nghe:"bg-blue-100 text-blue-800",doc:"bg-emerald-100 text-emerald-800",viet:"bg-orange-100 text-orange-800"};
const SKILL_LABEL = {nghe:"Nghe",doc:"Đọc",viet:"Viết"};
const HSK_BADGE = {"HSK 1":"bg-emerald-100 text-emerald-800","HSK 2":"bg-blue-100 text-blue-800","HSK 3":"bg-violet-100 text-violet-800","HSK 4":"bg-orange-100 text-orange-800","HSK 5":"bg-red-100 text-red-800","HSK 6":"bg-slate-800 text-slate-100"};

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

  const [quizInfo] = useState({
    id: id||1, name:"Đề thi HSK1 - Mã đề 101", hsk:"HSK 1", type:"Tổng hợp",
    time:35, pass:60, status:"active", desc:"Từ vựng cơ bản 150 từ",
  });

  const [questions, setQuestions]   = useState(MOCK_QUESTIONS);
  const [saved, setSaved]           = useState(false);
  const [delQ, setDelQ]             = useState(null);
  const [showAddFromBank, setShowAddFromBank] = useState(false);
  const [bankSearch, setBankSearch] = useState("");
  const [selectedBankIds, setSelectedBankIds] = useState([]);
  const [activeSkill, setActiveSkill] = useState("all");
  const [dragIdx, setDragIdx]       = useState(null);

  // bank = questions not yet in this quiz (mock: all questions)
  const bankQuestions = MOCK_QUESTIONS.filter(q => !questions.find(qq=>qq.id===q.id));

  const filteredBank = bankQuestions.filter(q => {
    const ms = activeSkill==="all"||q.skill===activeSkill;
    const mq = !bankSearch||q.content.toLowerCase().includes(bankSearch.toLowerCase());
    return ms&&mq;
  });

  function handleSave() {
    setSaved(true);
    setTimeout(()=>setSaved(false), 2000);
  }
  function deleteQ(q) {
    setQuestions(questions.filter(qq=>qq.id!==q.id));
    setDelQ(null);
  }
  function addFromBank() {
    const toAdd = bankQuestions.filter(q=>selectedBankIds.includes(q.id));
    setQuestions([...questions, ...toAdd]);
    setSelectedBankIds([]);
    setShowAddFromBank(false);
  }
  function toggleBankSelect(id) {
    setSelectedBankIds(prev => prev.includes(id)?prev.filter(i=>i!==id):[...prev,id]);
  }

  // drag to reorder
  function onDragStart(idx) { setDragIdx(idx); }
  function onDrop(idx) {
    if (dragIdx===null||dragIdx===idx) return;
    const newList = [...questions];
    const moved = newList.splice(dragIdx,1)[0];
    newList.splice(idx,0,moved);
    setQuestions(newList);
    setDragIdx(null);
  }

  // change order by input
  function changeOrder(fromIdx, newPos) {
    const pos = Math.max(0, Math.min(questions.length-1, newPos-1));
    if (pos===fromIdx) return;
    const newList = [...questions];
    const moved = newList.splice(fromIdx,1)[0];
    newList.splice(pos,0,moved);
    setQuestions(newList);
  }

  const editRoute = (q) => {
    if (q.skill==="nghe") return "/editlisten";
    if (q.skill==="doc")  return "/editread";
    return "/editwritting";
  };

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
              <span className="text-slate-700">{quizInfo.name}</span>
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-amber-100 text-amber-700">✎ Đang chỉnh sửa</span>
              <h1 className="text-base font-bold text-slate-900 truncate">{quizInfo.name}</h1>
              <span className={`text-xs px-2.5 py-0.5 rounded-lg font-bold ${HSK_BADGE[quizInfo.hsk]}`}>{quizInfo.hsk}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>navigate("/adminQuiz")} className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Huỷ</button>
            <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Lưu nháp</button>
            <button onClick={handleSave}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition shadow-md ${saved?"bg-emerald-600 shadow-emerald-200":"bg-primary shadow-primary/20 hover:bg-primary/90"} text-white`}>
              {saved ? "✓ Đã lưu!" : "Lưu (PUT)"}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-5">

            {/* LEFT: Question list */}
            <div className="flex-1 min-w-0 space-y-4">

              {/* Quiz stats bar */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-6">
                {[
                  {label:"Tổng câu hỏi",val:questions.length,ico:"quiz",color:"text-blue-600"},
                  {label:"Thời gian",val:`${quizInfo.time} phút`,ico:"timer",color:"text-slate-700"},
                  {label:"Điểm đạt",val:`${quizInfo.pass}%`,ico:"grade",color:"text-amber-600"},
                  {label:"Hoàn thiện",val:`${questions.filter(q=>q.status==="done").length}/${questions.length}`,ico:"check_circle",color:"text-emerald-600"},
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
                <h3 className="text-sm font-bold text-slate-700">Câu hỏi trong đề ({questions.length})</h3>
                <div className="flex gap-2">
                  <button onClick={()=>setShowAddFromBank(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 transition">
                    <span className="material-symbols-outlined text-base">library_add</span>Thêm từ ngân hàng
                  </button>
                  <Link to="/adminaddnewquiz?step=2"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition shadow-md shadow-primary/20">
                    <span className="material-symbols-outlined text-base">add_circle</span>Tạo câu mới
                  </Link>
                </div>
              </div>

              {/* Question cards */}
              {questions.length===0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                  <span className="material-symbols-outlined text-5xl text-slate-300 block mb-3">quiz</span>
                  <p className="text-slate-400 text-sm mb-4">Chưa có câu hỏi nào trong đề thi này</p>
                  <Link to="/adminaddnewquiz" className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition">
                    Tạo câu hỏi đầu tiên
                  </Link>
                </div>
              ) : questions.map((q, idx) => (
                <div key={q.id}
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
                          <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">{q.type}</span>
                          <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${HSK_BADGE[q.hsk]}`}>{q.hsk}</span>
                          <span className={`w-2 h-2 rounded-full inline-block ml-auto ${q.status==="done"?"bg-emerald-500":"bg-amber-500"}`} title={q.status==="done"?"Hoàn thiện":"Nháp"}/>
                        </div>
                        <p className="text-sm font-medium text-slate-800 leading-relaxed line-clamp-2">{q.content}</p>
                        {q.pinyin && <p className="text-xs text-slate-400 italic mt-1">{q.pinyin}</p>}
                        {/* Answers preview */}
                        {q.answers.length<=4 && (
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {q.answers.map((a,ai)=>(
                              <span key={ai} className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${ai===q.correct?"bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold":"bg-slate-50 text-slate-500 border border-slate-200"}`}>
                                <span className="font-bold">{String.fromCharCode(65+ai)}.</span> {a}
                                {ai===q.correct && <span className="material-symbols-outlined text-xs text-emerald-600">check</span>}
                              </span>
                            ))}
                          </div>
                        )}
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
                    {l:"Cấp độ",v:quizInfo.hsk},
                    {l:"Dạng đề",v:quizInfo.type},
                    {l:"Thời gian",v:`${quizInfo.time} phút`},
                    {l:"Điểm đạt",v:`${quizInfo.pass}%`},
                  ].map((r,i)=>(
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                      <span className="text-slate-500">{r.l}</span>
                      <span className="font-semibold text-slate-800">{r.v}</span>
                    </div>
                  ))}
                </div>
                <button onClick={()=>navigate("/adminQuiz")}
                  className="mt-3 w-full flex items-center justify-center gap-1 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
                  <span className="material-symbols-outlined text-sm">tune</span>Chỉnh sửa thông tin
                </button>
              </div>

              {/* Skill distribution */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Phân bổ kỹ năng</h3>
                {["nghe","doc","viet"].map(sk=>{
                  const cnt = questions.filter(q=>q.skill===sk).length;
                  const pct = questions.length ? Math.round(cnt/questions.length*100) : 0;
                  return (
                    <div key={sk} className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-600">{SKILL_LABEL[sk]}</span>
                        <span className="text-slate-400">{cnt} câu</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-primary transition-all" style={{width:`${pct}%`}}/>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Danh sách câu gần đây từ ngân hàng */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Thứ tự câu hỏi</h3>
                <p className="text-[11px] text-slate-400 mb-2">Kéo thả hoặc nhập số để sắp xếp lại</p>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {questions.map((q,idx)=>(
                    <div key={q.id} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50">
                      <span className="text-[10px] font-bold text-slate-400 w-5 text-center">{idx+1}</span>
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${q.status==="done"?"bg-emerald-500":"bg-amber-500"}`}/>
                      <span className="text-xs text-slate-600 truncate flex-1">{q.type}</span>
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
              <div key={q.id} onClick={()=>toggleBankSelect(q.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${selectedBankIds.includes(q.id)?"border-primary bg-blue-50":"border-slate-200 hover:bg-slate-50"}`}>
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${selectedBankIds.includes(q.id)?"bg-primary border-primary":"border-slate-300"}`}>
                  {selectedBankIds.includes(q.id) && <span className="material-symbols-outlined text-white text-xs">check</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-1.5 mb-1 flex-wrap">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${SKILL_BADGE[q.skill]}`}>{SKILL_LABEL[q.skill]}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">{q.type}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${HSK_BADGE[q.hsk]}`}>{q.hsk}</span>
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
