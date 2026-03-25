// ── SHARED QUESTION FORM UTILITIES ──
// Dùng chung cho AddNew + Edit của Nghe / Đọc / Viết

import toxiLogo from "../../../assets/image/LOGO (1).png";
import { Link } from "react-router-dom";

export const inputCls = "border border-slate-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-white";
export const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5";

// ── Question Type definitions ──
export const QUESTION_TYPES = {
  nghe: [
    { value: "dung-sai",     label: "Đúng / Sai",        desc: "1 audio + 1 câu đánh giá" },
    { value: "abc-anh",      label: "A B C ảnh",          desc: "1 audio + chọn 1 trong 3 ảnh" },
    { value: "gop-cau",      label: "Gộp câu",            desc: "5 ảnh + 5 audio riêng" },
    { value: "abcd-vanban",  label: "A B C D văn bản",    desc: "1 audio + 4 lựa chọn chữ" },
  ],
  doc: [
    { value: "dung-sai-anh", label: "Đúng sai + ảnh",    desc: "1 ảnh + 1 câu trần thuật" },
    { value: "gop-anh",      label: "Gộp câu ảnh",        desc: "5 ảnh ↔ 5 câu" },
    { value: "gop-van",      label: "Gộp câu văn",        desc: "5 câu ↔ 5 câu" },
    { value: "abcd-doan",    label: "A B C D đoạn văn",   desc: "Đoạn văn + 4 lựa chọn" },
    { value: "sap-xep",      label: "Sắp xếp từ",         desc: "Sắp xếp từ thành câu đúng" },
    { value: "dien-tu",      label: "Điền từ",             desc: "Đoạn văn có chỗ trống" },
  ],
  viet: [
    { value: "sap-xep-viet", label: "Sắp xếp từ",         desc: "HSK3 - viết câu đúng" },
    { value: "viet-doan",    label: "Viết đoạn văn",       desc: "HSK4 - ảnh + gợi ý" },
  ],
};

// ── Sidebar for question creation ──
export function QuizSidebar({ activeType, skill,quizId }) {
  const types = QUESTION_TYPES[skill] || [];
  const skillRoutes = { nghe:`/adminQuiz/${quizId}/add-question/listen`, doc:`/adminQuiz/${quizId}/add-question/read`, viet:`/adminQuiz/${quizId}/add-question/write`};
  const skillLabels = { nghe:"Nghe (听)", doc:"Đọc (读)", viet:"Viết (写)" };
  const skillColors = { nghe:"text-blue-400", doc:"text-emerald-400", viet:"text-orange-400" };

  return (
    <aside className="w-60 bg-slate-900 flex-shrink-0 flex flex-col h-screen">
      {/* Back */}
      <div className="p-4 border-b border-white/10">
      <Link to={`/adminEditQuiz/${quizId}`} className="flex items-center gap-2 text-white/60 hover:text-white text-xs font-semibold transition">
          <span className="material-symbols-outlined text-sm">arrow_back</span>Quay lại tạo đề
        </Link>
      </div>
      
      <div className="p-4 border-b border-white/10">
        <p className="text-[10px] text-white/40 uppercase fonts-bold tracking-widest mb-1">Kỹ năng đang chọn</p>
        <span className={`text-sm font-bold text-white`}>{skillLabels[skill]}</span>
      </div>

      <div className="p-3 flex-1 overflow-y-auto">
        <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest px-2 mb-2">Dạng câu hỏi</p>
        {/* Skill selector */}
        <div className="flex gap-1 mb-3">
          {Object.keys(skillRoutes).map(sk=>(
            <Link key={sk} to={skillRoutes[sk]}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold text-center transition ${skill===sk?"bg-primary text-white":"text-white/50 hover:text-white hover:bg-white/10"}`}>
              {skillLabels[sk].split(" ")[0]}
            </Link>
          ))}
        </div>
 
        <nav className="space-y-1">
          {types.map(t=>(
            <div key={t.value}
              className={`px-3 py-2.5 rounded-xl cursor-pointer transition ${activeType===t.value?"bg-primary text-white":"text-white/60 hover:bg-white/10 hover:text-white"}`}>
              <p className="text-xs font-semibold">{t.label}</p>
              <p className={`text-[10px] mt-0.5 ${activeType===t.value?"text-white/70":"text-white/40"}`}>{t.desc}</p>
            </div>
          ))}
        </nav>
      </div>

      {/* User */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">AD</div>
          <div>
            <p className="text-white text-xs font-semibold">Admin TOXI</p>
            <p className="text-white/40 text-[10px]">Quản trị viên</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ── Top header for question pages ──
export function QuizPageHeader({ title, isEdit=false, onCancel, onSaveAndNext, onSaveAndClose }) {
    
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0 sticky top-0 z-10">
      <div>
        {isEdit && <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-2 py-0.5 mb-1">
          <span className="material-symbols-outlined text-xs">edit</span>Đang sửa
        </span>}
        <h1 className="text-base font-bold text-slate-900">{title}</h1>
        <p className="text-[11px] text-slate-400 mt-0.5">Cập nhật lần cuối: hôm nay</p>
      </div>
      <div className="flex items-center gap-2">
       <button
  onClick={onCancel}
  className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
  Huỷ
</button>
        <button onClick={onSaveAndNext} className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
          {isEdit ? "Lưu nháp" : "Lưu & tạo tiếp"}
        </button>
        <button onClick={onSaveAndClose} className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition shadow-md shadow-primary/20">
          {isEdit ? "Lưu (PUT)" : "Lưu & đóng"}
        </button>
      </div>
    </header>
  );
}

// ── Right panel: settings ──
export function QuizRightPanel({ form, setForm, recentList=[], onReorder }) {
  const sf = v => setForm(f=>({...f,...v}));
  return (
    <aside className="w-56 flex-shrink-0 flex flex-col gap-4 overflow-y-auto">
      {/* HSK */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cấp độ HSK</p>
        <div className="flex flex-wrap gap-1.5">
          {["HSK 1","HSK 2","HSK 3","HSK 4","HSK 5","HSK 6"].map(h=>(
            <button key={h} onClick={()=>sf({hsk:h})}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${form.hsk===h?"bg-amber-100 text-amber-800 border-amber-300":"border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{h}</button>
          ))}
        </div>
      </div>

      {/* Settings toggles */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cài đặt</p>
        {[
          {key:"autoGrade", label:"Tự động chấm"},
          {key:"shuffle",   label:"Xáo trộn đáp án"},
          {key:"pinyin",    label:"Hiển thị pinyin"},
        ].map(t=>(
          <div key={t.key} className="flex items-center justify-between">
            <span className="text-xs text-slate-600">{t.label}</span>
            <button onClick={()=>sf({[t.key]:!form[t.key]})}
              className={`w-9 h-5 rounded-full relative transition-colors ${form[t.key]?"bg-primary":"bg-slate-300"}`}>
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${form[t.key]?"left-4":"left-0.5"}`}/>
            </button>
          </div>
        ))}
      </div>

      {/* Score + time */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Điểm & thời gian</p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] text-slate-500 mb-1">Điểm</label>
            <input type="number" value={form.score||1} onChange={e=>sf({score:+e.target.value})} className="border border-slate-200 rounded-lg px-2 py-1.5 text-xs w-full focus:outline-none focus:border-primary"/>
          </div>
          <div>
            <label className="block text-[10px] text-slate-500 mb-1">Giây</label>
            <input type="number" value={form.seconds||60} onChange={e=>sf({seconds:+e.target.value})} className="border border-slate-200 rounded-lg px-2 py-1.5 text-xs w-full focus:outline-none focus:border-primary"/>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Trạng thái</p>
        <div className="flex gap-1.5">
          {[{v:"done",l:"Xong"},{v:"draft",l:"Nháp"},{v:"hidden",l:"Ẩn"}].map(o=>(
            <button key={o.v} onClick={()=>sf({status:o.v})}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${form.status===o.v?o.v==="done"?"bg-emerald-100 text-emerald-700 border-emerald-300":o.v==="draft"?"bg-amber-100 text-amber-700 border-amber-300":"bg-slate-100 text-slate-600 border-slate-300":"border-slate-200 text-slate-500 hover:bg-slate-50"}`}>{o.l}</button>
          ))}
        </div>
      </div>

      {/* Recent list */}
      {recentList.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Sắp xếp thứ tự</p>
          <p className="text-[10px] text-slate-400 mb-2">Kéo thả hoặc nhập số</p>
          <div className="space-y-1 max-h-36 overflow-y-auto">
            {recentList.map((q,i)=>(
              <div key={q.id} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-300 text-sm cursor-grab">drag_indicator</span>
                <input type="number" min={1} max={recentList.length} defaultValue={i+1}
                  className="w-9 text-center text-[10px] border border-slate-200 rounded-lg py-1 focus:outline-none focus:border-primary"
                  onChange={e=>onReorder&&onReorder(i,+e.target.value)}/>
                <span className="text-[10px] text-slate-600 truncate flex-1">{q.type}</span>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${q.status==="done"?"bg-emerald-500":"bg-amber-500"}`}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

// ── Answer options builder ──
export function AnswerOptions({ answers, correct, onChange, onCorrect, showLetters=true, maxOptions=4 }) {
  function updateAnswer(idx, val) {
    const newA = [...answers]; newA[idx]=val; onChange(newA);
  }
  function addAnswer() { if (answers.length<maxOptions) onChange([...answers,""]); }
  function removeAnswer(idx) { onChange(answers.filter((_,i)=>i!==idx)); if(correct===idx) onCorrect(0); }

  return (
    <div className="space-y-2">
      {answers.map((a,i)=>(
        <div key={i} className={`flex items-center gap-2 p-3 rounded-xl border transition ${i===correct?"border-emerald-300 bg-emerald-50":"border-slate-200 bg-white hover:bg-slate-50"}`}>
          {showLetters && (
            <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 ${i===correct?"bg-emerald-500 text-white":"bg-slate-200 text-slate-600"}`}>
              {String.fromCharCode(65+i)}
            </span>
          )}
          <input value={a} onChange={e=>updateAnswer(i,e.target.value)} placeholder={`Đáp án ${String.fromCharCode(65+i)}...`}
            className="flex-1 text-sm bg-transparent border-none outline-none"/>
          <button onClick={()=>onCorrect(i)} title="Đánh dấu đúng"
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition ${i===correct?"text-emerald-600":"text-slate-300 hover:text-emerald-500"}`}>
            <span className="material-symbols-outlined text-base">{i===correct?"check_circle":"radio_button_unchecked"}</span>
          </button>
          {answers.length>2 && (
            <button onClick={()=>removeAnswer(i)} className="text-slate-300 hover:text-red-400 transition">
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          )}
        </div>
      ))}
      {answers.length<maxOptions && (
        <button onClick={addAnswer} className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline">
          <span className="material-symbols-outlined text-base">add_circle</span>Thêm đáp án
        </button>
      )}
    </div>
  );
}

// ── Audio upload block ──
export function AudioUpload({ label="File audio", value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{label}</label>
      {value ? (
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white text-base">play_arrow</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="flex gap-px items-end h-5">
                {[3,6,4,7,5,8,4,6,3,7,5,4,6,3,5].map((h,i)=>(
                  <div key={i} className="w-1 rounded-sm bg-primary/60" style={{height:`${h*3}px`}}/>
                ))}
              </div>
              <span className="text-xs text-slate-500 font-mono">0:00 / 0:45</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{value.name||"audio.mp3"}</p>
          </div>
          <button onClick={()=>onChange(null)} className="text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-2.5 py-1 hover:bg-slate-100 transition">Đổi file</button>
        </div>
      ) : (
        <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-primary hover:bg-blue-50 transition cursor-pointer">
          <span className="material-symbols-outlined text-3xl text-slate-400">cloud_upload</span>
          <p className="text-sm text-slate-500">Kéo thả file <span className="text-primary font-semibold">.mp3 / .wav</span> hoặc bấm để chọn</p>
          <input type="file" accept=".mp3,.wav" className="hidden" onChange={e=>onChange(e.target.files[0])}/>
        </label>
      )}
    </div>
  );
}
export function ImageSlot({ label, value, onChange }) {
  const getSrc = () => {
    if (!value) return null;

    if (value instanceof File) {
      return URL.createObjectURL(value);
    }

    if (typeof value === "object" && value.url) {
      return value.url.startsWith("http")
        ? value.url
        : `http://localhost:8080/api/files/${encodeURIComponent(value.url)}`;
    }

    if (typeof value === "string") {
      return `http://localhost:8080/api/files/${encodeURIComponent(value)}`;
    }

    return null;
  };

  const src = getSrc();

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-xs font-semibold text-slate-500 uppercase">{label}</span>
      )}

      {src ? (
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 group">
          <img
            src={src}
            alt=""
            onError={(e) => {
              if (!e.target.dataset.errorHandled) {
                console.log("🔥 Image load error:", src);
                e.target.dataset.errorHandled = true;
                e.target.src = "/fallback.png"; // fallback ảnh mặc định
              }
            }}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => onChange(null)}
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            <span className="material-symbols-outlined text-white">edit</span>
          </button>
        </div>
      ) : (
        <label className="aspect-[4/3] flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-300 hover:border-primary hover:bg-blue-50 transition cursor-pointer">
          <span className="material-symbols-outlined text-slate-400 text-2xl">image</span>
          <span className="text-xs text-slate-400">Tải ảnh lên</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onChange(e.target.files[0])}
          />
        </label>
      )}
    </div>
  );
}