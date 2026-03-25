import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { createQuiz } from "./api/apiquiz";

const inputCls = "border border-slate-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-white";

export default function AdminAddNewQuiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initStep = Number(searchParams.get("step")) || 1;

  const [step, setStep] = useState(initStep);
  const [form, setForm] = useState({
    title:"", hsk:"HSK 1", type:"Tổng hợp", time:45, pass:60, desc:"", status:"DRAFT", randomize:true, showPinyin:true,
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const sf = v => setForm(f=>({...f,...v}));

const convertForm = () => ({
  title: form.title,
  hsklevel: parseInt(form.hsk.split(" ")[1]),
  quizType: form.type,
  timeLimit: form.time,
  passScore: form.pass,
  description: form.desc,
  status: "DRAFT",
  showPinyin: form.showPinyin

});
const handleNext = async () => {
  if (!form.title.trim()) {
    alert("Vui lòng nhập tên đề thi!");
    return;
  }

  try {
    setLoading(true);

    const res = await createQuiz(convertForm());

    console.log("CREATE QUIZ RESPONSE:", res);

    const newId =
      res.data?.data?.id ??
      res.data?.data?.quizId ??
      res.data?.id ??
      res.data?.quizId;

    if (!newId) {
      console.error("Không tìm thấy quizId trong response");
      return;
    }

    navigate(`/adminEditQuiz/${newId}?step=2`);

  } catch (err) {
    alert("Lỗi tạo đề: " + err.message);
  } finally {
    setLoading(false);
  }
};
  const handleCreate = async () => {
    if (!form.title.trim()) { alert("Vui lòng nhập tên đề thi!"); return; }
    
    try {
      setLoading(true);
      
      // Gọi API tạo đề thi
      const response = await createQuiz({
        title: form.title,
        hsklevel: parseInt(form.hsk.split(" ")[1]),
        quizType: form.type,
        timeLimit: form.time,
        passScore: form.pass,
        description: form.desc,
        status: form.status,
        showPinyin: form.showPinyin
      });

      if (response.success) {
        setSaved(true);
        setTimeout(() => {
          // Chuyển tới trang edit để thêm câu hỏi
          navigate(`/adminEditQuiz/${response.data.quizId || response.data.id}`);
        }, 1500);
      }
    } catch (err) {
      alert("Lỗi tạo đề thi: " + err.message);
      setLoading(false);
    }
  };

  const steps = [
    {n:1, label:"Thông tin cơ bản", ico:"info"},
    {n:2, label:"Thêm câu hỏi",    ico:"add_circle"},
    {n:3, label:"Cài đặt",         ico:"settings"},
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-3 flex-shrink-0">
          <button onClick={()=>navigate("/adminQuiz")} className="p-2 hover:bg-slate-100 rounded-lg transition">
            <span className="material-symbols-outlined text-slate-500">arrow_back</span>
          </button>
          <div className="flex-1">
            <p className="text-[11px] text-slate-400 mb-0.5">
              <Link to="/adminQuiz" className="hover:text-primary">Quản lí đề thi</Link>
              <span className="mx-1">›</span>
              <span className="text-slate-700">Tạo đề thi mới</span>
            </p>
            <h1 className="text-base font-bold text-slate-900">Tạo đề thi mới</h1>
          </div>
          <Link to="/adminQuiz" className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Huỷ</Link>
          <button onClick={handleCreate} disabled={loading}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition shadow-md disabled:opacity-50 ${saved?"bg-emerald-600 shadow-emerald-200":"bg-primary shadow-primary/20 hover:bg-primary/90"} text-white`}>
            {saved ? "✓ Đã tạo! Đang chuyển..." : loading ? "Đang tạo..." : "Tạo đề thi"}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-5">

            {/* Steps */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center">
                {steps.map((s,i)=>(
                  <div key={s.n} className="flex items-center flex-1">
                    <button onClick={()=>setStep(s.n)} className="flex flex-col items-center gap-1 group">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition ${step===s.n?"bg-primary text-white":step>s.n?"bg-emerald-500 text-white":"bg-slate-100 text-slate-400 group-hover:bg-slate-200"}`}>
                        {step>s.n ? <span className="material-symbols-outlined text-base">check</span>
                          : <span className="material-symbols-outlined text-base">{s.ico}</span>}
                      </div>
                      <span className={`text-xs font-semibold whitespace-nowrap ${step===s.n?"text-primary":step>s.n?"text-emerald-600":"text-slate-400"}`}>{s.label}</span>
                    </button>
                    {i<steps.length-1 && <div className={`flex-1 h-0.5 mx-3 mb-4 transition ${step>s.n?"bg-emerald-400":"bg-slate-200"}`}/>}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Basic Info */}
            {step===1 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <h2 className="text-base font-bold text-slate-800">Thông tin cơ bản</h2>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Tên đề thi *</label>
                  <input className={inputCls} value={form.title} onChange={e=>sf({title:e.target.value})} placeholder="VD: Đề thi HSK1 - Mã đề 201"/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Cấp độ HSK</label>
                    <select className={inputCls} value={form.hsk} onChange={e=>sf({hsk:e.target.value})}>
                      {["HSK 1","HSK 2","HSK 3","HSK 4","HSK 5","HSK 6"].map(h=><option key={h}>{h}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Dạng đề</label>
                    <select className={inputCls} value={form.type} onChange={e=>sf({type:e.target.value})}>
                      {["Tổng hợp","Nghe","Đọc","Viết","Mock test"].map(t=><option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Thời gian (phút)</label>
                    <input type="number" className={inputCls} value={form.time} onChange={e=>sf({time:+e.target.value})}/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Điểm đạt (%)</label>
                    <input type="number" className={inputCls} value={form.pass} onChange={e=>sf({pass:+e.target.value})}/>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Mô tả</label>
                  <textarea className={inputCls+" resize-none"} rows={3} value={form.desc} onChange={e=>sf({desc:e.target.value})} placeholder="Mô tả nội dung đề thi..."/>
                </div>

                <div className="flex justify-end pt-2">
                  <button  onClick={handleNext} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition">
                    Tiếp theo — Thêm câu hỏi <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Add questions */}
            {step===2 && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h2 className="text-base font-bold text-slate-800 mb-1">Thêm câu hỏi</h2>
                  <p className="text-sm text-slate-500 mb-4">Chọn cách thêm câu hỏi vào đề thi</p>

                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/listenQuiz"
                      className="group flex flex-col items-center gap-3 p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-primary hover:bg-blue-50 transition cursor-pointer">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition">
                        <span className="material-symbols-outlined text-blue-600 text-2xl">hearing</span>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-slate-700 text-sm">Câu hỏi Nghe</p>
                        <p className="text-xs text-slate-400 mt-0.5">Đúng/Sai, ABC ảnh, Gộp câu, ABCD</p>
                      </div>
                    </Link>

                    <Link to="/readQuiz"
                      className="group flex flex-col items-center gap-3 p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-primary hover:bg-emerald-50 transition cursor-pointer">
                      <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-200 transition">
                        <span className="material-symbols-outlined text-emerald-600 text-2xl">menu_book</span>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-slate-700 text-sm">Câu hỏi Đọc</p>
                        <p className="text-xs text-slate-400 mt-0.5">Đúng/Sai, Gộp câu, ABCD, Điền từ</p>
                      </div>
                    </Link>

                    <Link to="/writtingQuiz"
                      className="group flex flex-col items-center gap-3 p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-primary hover:bg-orange-50 transition cursor-pointer">
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-200 transition">
                        <span className="material-symbols-outlined text-orange-600 text-2xl">edit_note</span>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-slate-700 text-sm">Câu hỏi Viết</p>
                        <p className="text-xs text-slate-400 mt-0.5">Sắp xếp từ, Viết đoạn văn</p>
                      </div>
                    </Link>

                    <div className="group flex flex-col items-center gap-3 p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-violet-400 hover:bg-violet-50 transition cursor-pointer"
                      onClick={()=>{}}>
                      <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center group-hover:bg-violet-200 transition">
                        <span className="material-symbols-outlined text-violet-600 text-2xl">library_add</span>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-slate-700 text-sm">Thêm từ ngân hàng</p>
                        <p className="text-xs text-slate-400 mt-0.5">Chọn câu hỏi đã có sẵn</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={()=>setStep(1)} className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 bg-white rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                    <span className="material-symbols-outlined text-base">arrow_back</span>Quay lại
                  </button>
                  <button onClick={()=>setStep(3)} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition">
                    Tiếp theo — Cài đặt <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Settings */}
            {step===3 && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                  <h2 className="text-base font-bold text-slate-800">Cài đặt đề thi</h2>

                  {/* Toggles */}
                  {[
                    {key:"randomize",label:"Xáo trộn câu hỏi",desc:"Mỗi học viên nhận thứ tự câu hỏi khác nhau"},
                    {key:"showPinyin",label:"Hiển thị Pinyin",desc:"Hiện phiên âm dưới chữ Hán"},
                  ].map(t=>(
                    <div key={t.key} className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{t.label}</p>
                        <p className="text-xs text-slate-400">{t.desc}</p>
                      </div>
                      <button onClick={()=>sf({[t.key]:!form[t.key]})}
                        className={`w-11 h-6 rounded-full relative transition-colors ${form[t.key]?"bg-primary":"bg-slate-300"}`}>
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form[t.key]?"left-5":"left-0.5"}`}/>
                      </button>
                    </div>
                  ))}

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Trạng thái xuất bản</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {v:"ACTIVE",label:"Công khai",ico:"public",desc:"Học viên thấy ngay"},
                        {v:"DRAFT", label:"Nháp",     ico:"edit",  desc:"Chỉ admin thấy"},
                        {v:"HIDDEN",label:"Ẩn",       ico:"visibility_off",desc:"Tạm thời ẩn"},
                      ].map(o=>(
                        <button key={o.v} onClick={()=>sf({status:o.v})}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition ${form.status===o.v?"border-primary bg-blue-50":"border-slate-200 hover:border-slate-300"}`}>
                          <span className={`material-symbols-outlined ${form.status===o.v?"text-primary":"text-slate-400"}`}>{o.ico}</span>
                          <span className={`text-xs font-bold ${form.status===o.v?"text-primary":"text-slate-600"}`}>{o.label}</span>
                          <span className="text-[10px] text-slate-400">{o.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={()=>setStep(2)} className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 bg-white rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                    <span className="material-symbols-outlined text-base">arrow_back</span>Quay lại
                  </button>
                  <button onClick={handleCreate} disabled={loading}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition shadow-md disabled:opacity-50 ${saved?"bg-emerald-600 shadow-emerald-200":"bg-primary shadow-primary/20 hover:bg-primary/90"} text-white`}>
                    <span className="material-symbols-outlined text-base">{saved?"check":"publish"}</span>
                    {saved?"Đã tạo! Đang chuyển...":loading?"Đang tạo...":"Tạo đề thi"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
