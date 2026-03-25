import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const SKILL_TYPES = {
  nghe: {
    label: "Nghe (听)", color: "blue",
    icon: "hearing",
    bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700",
    activeBg: "bg-blue-600", activeText: "text-white",
    types: [
      { value:"dung-sai",    label:"Đúng / Sai",       desc:"1 audio + 1 câu trần thuật đánh giá Đúng/Sai",   route:"/listenQuiz",  hsk:["HSK 1","HSK 2"] },
      { value:"abc-anh",     label:"A B C ảnh",         desc:"1 audio + chọn 1 trong 3 ảnh đúng",              route:"/listenQuiz",  hsk:["HSK 1","HSK 2","HSK 3"] },
      { value:"gop-cau",     label:"Gộp câu",           desc:"5 ảnh + 5 audio riêng, ghép ảnh với audio",      route:"/listenQuiz",  hsk:["HSK 1","HSK 2"] },
      { value:"abcd-vanban", label:"A B C D văn bản",   desc:"1 audio + 4 lựa chọn văn bản",                   route:"/listenQuiz",  hsk:["HSK 2","HSK 3","HSK 4"] },
    ]
  },
  doc: {
    label: "Đọc (读)", color: "emerald",
    icon: "menu_book",
    bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700",
    activeBg: "bg-emerald-600", activeText: "text-white",
    types: [
      { value:"dung-sai-anh", label:"Đúng sai + ảnh",  desc:"1 ảnh + 1 câu trần thuật, đánh giá Đúng/Sai",   route:"/readQuiz",    hsk:["HSK 1"] },
      { value:"gop-anh",      label:"Gộp câu ảnh",     desc:"5 ảnh ↔ 5 câu văn bản, ghép đôi",               route:"/readQuiz",    hsk:["HSK 1","HSK 2"] },
      { value:"gop-van",      label:"Gộp câu văn",     desc:"5 câu ↔ 5 câu, ghép đôi ý nghĩa",               route:"/readQuiz",    hsk:["HSK 1","HSK 2"] },
      { value:"abcd-doan",    label:"A B C D đoạn văn",desc:"Đoạn văn + câu hỏi + 4 lựa chọn",               route:"/readQuiz",    hsk:["HSK 2","HSK 3","HSK 4","HSK 5","HSK 6"] },
      { value:"sap-xep",      label:"Sắp xếp từ",      desc:"Sắp xếp các từ thành câu hoàn chỉnh (HSK4)",     route:"/readQuiz",    hsk:["HSK 4"] },
      { value:"dien-tu",      label:"Điền từ",          desc:"Đoạn văn có chỗ trống + gợi ý từ (HSK6)",        route:"/readQuiz",    hsk:["HSK 5","HSK 6"] },
    ]
  },
  viet: {
    label: "Viết (写)", color: "orange",
    icon: "edit_note",
    bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700",
    activeBg: "bg-orange-600", activeText: "text-white",
    types: [
      { value:"sap-xep-viet", label:"Sắp xếp từ",      desc:"Viết câu đúng từ các từ cho sẵn (HSK3)",         route:"/writtingQuiz", hsk:["HSK 3"] },
      { value:"viet-doan",    label:"Viết đoạn văn",   desc:"Viết đoạn văn dựa trên ảnh + gợi ý (HSK4)",     route:"/writtingQuiz", hsk:["HSK 4"] },
    ]
  },
};

const HSK_BADGE = { "HSK 1":"bg-emerald-100 text-emerald-800","HSK 2":"bg-blue-100 text-blue-800","HSK 3":"bg-violet-100 text-violet-800","HSK 4":"bg-orange-100 text-orange-800","HSK 5":"bg-red-100 text-red-800","HSK 6":"bg-slate-800 text-slate-100" };

export default function AdminAddNewExam() {
  const navigate = useNavigate();
  const [activeSkill, setActiveSkill] = useState("nghe");
  const [activeType, setActiveType]   = useState(null);
  const skill = SKILL_TYPES[activeSkill];

  function handleContinue() {
    if (!activeType) return;
    navigate(activeType.route);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-3 flex-shrink-0">
          <button onClick={()=>navigate("/adminExam")} className="p-2 hover:bg-slate-100 rounded-lg transition">
            <span className="material-symbols-outlined text-slate-500">arrow_back</span>
          </button>
          <div className="flex-1">
            <p className="text-[11px] text-slate-400 mb-0.5">
              <Link to="/adminExam" className="hover:text-primary">Ngân hàng câu hỏi</Link>
              <span className="mx-1">›</span>
              <span className="text-slate-700">Thêm câu hỏi mới</span>
            </p>
            <h1 className="text-base font-bold text-slate-900">Thêm câu hỏi mới</h1>
          </div>
          <Link to="/adminExam" className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Huỷ</Link>
          <button onClick={handleContinue} disabled={!activeType}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition shadow-md shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed">
            <span className="material-symbols-outlined text-base">arrow_forward</span>
            Tiếp tục tạo câu hỏi
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* Step indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</div>
                <span className="text-sm font-semibold text-primary">Chọn kỹ năng & dạng câu hỏi</span>
              </div>
              <div className="flex-1 h-px bg-slate-200"/>
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 text-xs font-bold flex items-center justify-center">2</div>
                <span className="text-sm font-semibold text-slate-500">Điền nội dung câu hỏi</span>
              </div>
              <div className="flex-1 h-px bg-slate-200"/>
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 text-xs font-bold flex items-center justify-center">3</div>
                <span className="text-sm font-semibold text-slate-500">Lưu & gắn vào đề thi</span>
              </div>
            </div>

            {/* Skill selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-slate-700 mb-4">Chọn kỹ năng</h2>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(SKILL_TYPES).map(([sk, cfg])=>(
                  <button key={sk} onClick={()=>{setActiveSkill(sk);setActiveType(null);}}
                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition ${activeSkill===sk?`border-primary bg-primary/5`:"border-slate-200 hover:border-slate-300 bg-white"}`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${activeSkill===sk?"bg-primary":"bg-slate-100"} transition`}>
                      <span className={`material-symbols-outlined text-2xl ${activeSkill===sk?"text-white":"text-slate-500"}`}>{cfg.icon}</span>
                    </div>
                    <div className="text-center">
                      <p className={`font-bold text-sm ${activeSkill===sk?"text-primary":"text-slate-700"}`}>{cfg.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{SKILL_TYPES[sk].types.length} dạng câu hỏi</p>
                    </div>
                    {activeSkill===sk && (
                      <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Type selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-slate-700 mb-4">
                Chọn dạng câu hỏi — <span className={skill.text}>{skill.label}</span>
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {skill.types.map(t=>{
                  const isActive = activeType?.value===t.value;
                  return (
                    <button key={t.value} onClick={()=>setActiveType(t)}
                      className={`text-left p-4 rounded-2xl border-2 transition ${isActive?"border-primary bg-primary/5":"border-slate-200 hover:border-slate-300 bg-white"}`}>
                      <div className="flex items-start justify-between mb-2">
                        <p className={`font-bold text-sm ${isActive?"text-primary":"text-slate-800"}`}>{t.label}</p>
                        {isActive && <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center flex-shrink-0">✓</span>}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mb-2">{t.desc}</p>
                      <div className="flex gap-1 flex-wrap">
                        {t.hsk.map(h=>(
                          <span key={h} className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${HSK_BADGE[h]}`}>{h}</span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary + action */}
            {activeType && (
              <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-5 flex items-center gap-4">
                <div className={`w-12 h-12 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <span className="material-symbols-outlined text-white text-xl">{skill.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-primary text-sm">Đã chọn: {skill.label} — {activeType.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{activeType.desc}</p>
                  <div className="flex gap-1 mt-1.5">
                    {activeType.hsk.map(h=>(
                      <span key={h} className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${HSK_BADGE[h]}`}>{h}</span>
                    ))}
                  </div>
                </div>
                <button onClick={handleContinue}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition shadow-md shadow-primary/20">
                  <span className="material-symbols-outlined">arrow_forward</span>
                  Tiếp tục
                </button>
              </div>
            )}

            {/* Info box */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3">
              <span className="material-symbols-outlined text-blue-500 flex-shrink-0">info</span>
              <div>
                <p className="text-xs font-semibold text-blue-700 mb-1">Lưu ý về ngân hàng câu hỏi</p>
                <p className="text-xs text-blue-600 leading-relaxed">
                  Câu hỏi được lưu vào ngân hàng chung. Bạn có thể <strong>gắn vào nhiều đề thi</strong> khác nhau mà không cần tạo lại.
                  Sau khi tạo xong, vào trang <strong>Quản lí đề thi</strong> → chọn đề → <strong>Thêm từ ngân hàng</strong>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
