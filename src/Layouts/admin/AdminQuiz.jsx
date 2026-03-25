import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const INIT_QUIZZES = [
  { id:1,  name:"Đề thi HSK1 - Mã đề 101", hsk:"HSK 1", type:"Tổng hợp", questions:40,  time:35,  pass:60, plays:1200, status:"active", date:"10/03/2025", desc:"Từ vựng cơ bản 150 từ" },
  { id:2,  name:"Đề thi HSK1 - Mã đề 102", hsk:"HSK 1", type:"Nghe",     questions:40,  time:35,  pass:60, plays:980,  status:"active", date:"12/03/2025", desc:"" },
  { id:3,  name:"HSK1 - Luyện tập nhanh",  hsk:"HSK 1", type:"Tổng hợp", questions:20,  time:15,  pass:70, plays:2100, status:"active", date:"15/03/2025", desc:"Bài tập ngắn 20 câu" },
  { id:4,  name:"Đề thi HSK2 - Mã đề 201", hsk:"HSK 2", type:"Tổng hợp", questions:60,  time:55,  pass:60, plays:750,  status:"active", date:"01/02/2025", desc:"" },
  { id:5,  name:"Đề thi HSK2 - Mã đề 202", hsk:"HSK 2", type:"Tổng hợp", questions:60,  time:55,  pass:60, plays:430,  status:"draft",  date:"05/02/2025", desc:"Đang hoàn thiện" },
  { id:6,  name:"HSK2 - Ôn tập cuối kỳ",   hsk:"HSK 2", type:"Mock test",questions:80,  time:70,  pass:65, plays:320,  status:"active", date:"20/02/2025", desc:"" },
  { id:7,  name:"Đề thi HSK3 - Mã đề 301", hsk:"HSK 3", type:"Tổng hợp", questions:100, time:90,  pass:60, plays:610,  status:"active", date:"10/01/2025", desc:"" },
  { id:8,  name:"HSK3 - Chuyên sâu ngữ pháp",hsk:"HSK 3",type:"Viết",   questions:100, time:95,  pass:65, plays:280,  status:"draft",  date:"18/01/2025", desc:"Tập trung ngữ pháp" },
  { id:9,  name:"Đề thi HSK4 - Mã đề 401", hsk:"HSK 4", type:"Tổng hợp", questions:100, time:105, pass:60, plays:380,  status:"active", date:"05/12/2024", desc:"" },
  { id:10, name:"Đề thi HSK4 - Mã đề 402", hsk:"HSK 4", type:"Nghe",     questions:100, time:105, pass:60, plays:210,  status:"hidden", date:"10/12/2024", desc:"Tạm ẩn cập nhật" },
  { id:11, name:"Đề thi HSK5 - Mã đề 501", hsk:"HSK 5", type:"Tổng hợp", questions:100, time:125, pass:60, plays:150,  status:"active", date:"01/11/2024", desc:"" },
  { id:12, name:"Đề thi HSK6 - Mock test",  hsk:"HSK 6", type:"Mock test",questions:101, time:140, pass:60, plays:85,   status:"active", date:"01/10/2024", desc:"Thi thử toàn diện" },
];

const HSK_BADGE = {
  "HSK 1":"bg-emerald-100 text-emerald-800","HSK 2":"bg-blue-100 text-blue-800",
  "HSK 3":"bg-violet-100 text-violet-800",  "HSK 4":"bg-orange-100 text-orange-800",
  "HSK 5":"bg-red-100 text-red-800",         "HSK 6":"bg-slate-800 text-slate-100",
};
const HSK_BAR_COLORS = ["#10b981","#3b82f6","#8b5cf6","#f97316","#ef4444","#475569"];
const inputCls = "border border-slate-200 rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-white";

function StatusDot({ s }) {
  const cfg = s==="active"
    ? {dot:"bg-emerald-500",text:"text-emerald-600",label:"Công khai"}
    : s==="draft"
    ? {dot:"bg-amber-500",text:"text-amber-600",label:"Nháp"}
    : {dot:"bg-slate-400",text:"text-slate-400",label:"Ẩn"};
  return <span className={`flex items-center gap-1.5 text-xs font-semibold ${cfg.text}`}><span className={`w-2 h-2 rounded-full inline-block ${cfg.dot}`}/>{cfg.label}</span>;
}

function Modal({ title, sub, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
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
function FormBody({ form, sf, editItem, inputCls }) {
  return (
    <>
      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
          Tên đề thi *
        </label>

        <input
          className={inputCls}
          value={form.name || ""}
          onChange={(e) => sf({ name: e.target.value })}
          placeholder="VD: Đề thi HSK1 - Mã đề 201"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
            Cấp độ HSK
          </label>

          <select
            className={inputCls}
            value={form.hsk}
            onChange={(e) => sf({ hsk: e.target.value })}
          >
            {["HSK 1","HSK 2","HSK 3","HSK 4","HSK 5","HSK 6"].map(h => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
            Dạng đề
          </label>

          <select
            className={inputCls}
            value={form.type}
            onChange={(e) => sf({ type: e.target.value })}
          >
            {["Tổng hợp","Nghe","Đọc","Viết","Mock test"].map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
            Thời gian (phút)
          </label>

          <input
            type="number"
            className={inputCls}
            value={form.time}
            onChange={(e) => sf({ time: +e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
            Điểm đạt (%)
          </label>

          <input
            type="number"
            className={inputCls}
            value={form.pass}
            onChange={(e) => sf({ pass: +e.target.value })}
          />
        </div>
      </div>

      {editItem && (
        <div className="mb-3">
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
            Trạng thái
          </label>

          <select
            className={inputCls}
            value={form.status}
            onChange={(e) => sf({ status: e.target.value })}
          >
            <option value="active">Công khai</option>
            <option value="draft">Nháp</option>
            <option value="hidden">Ẩn</option>
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
          Mô tả
        </label>

        <textarea
          className={inputCls + " resize-none"}
          rows={3}
          value={form.desc}
          onChange={(e) => sf({ desc: e.target.value })}
          placeholder="Mô tả nội dung đề thi..."
        />
      </div>
    </>
  );
}
export default function AdminQuiz() {
  const navigate = useNavigate();
  const [data, setData]         = useState(INIT_QUIZZES);
  const [search, setSearch]     = useState("");
  const [activeLv, setActiveLv] = useState("Tất cả");
  const [activeSt, setActiveSt] = useState("Tất cả");
  const [sortVal, setSortVal]   = useState("newest");
  const [page, setPage]         = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [delItem, setDelItem]   = useState(null);
  const [form, setForm] = useState({ name:"",hsk:"HSK 1",type:"Tổng hợp",time:45,pass:60,desc:"",status:"draft" });
  const perPage = 8;
  const maxPlays = Math.max(...data.map(d=>d.plays), 1);

  const sf = v => setForm(f=>({...f,...v}));

  // filter + sort
  let filtered = data.filter(d => {
    const ml = activeLv==="Tất cả" || d.hsk===activeLv;
    const ms = activeSt==="Tất cả"
      || (activeSt==="Công khai"&&d.status==="active")
      || (activeSt==="Nháp"&&d.status==="draft")
      || (activeSt==="Ẩn"&&d.status==="hidden");
    const mq = !search || d.name.toLowerCase().includes(search.toLowerCase());
    return ml&&ms&&mq;
  });
  if (sortVal==="newest") filtered=[...filtered].sort((a,b)=>b.id-a.id);
  if (sortVal==="oldest") filtered=[...filtered].sort((a,b)=>a.id-b.id);
  if (sortVal==="most")   filtered=[...filtered].sort((a,b)=>b.questions-a.questions);
  if (sortVal==="plays")  filtered=[...filtered].sort((a,b)=>b.plays-a.plays);
  if (sortVal==="az")     filtered=[...filtered].sort((a,b)=>a.name.localeCompare(b.name));

  const total = filtered.length;
  const pages = Math.ceil(total/perPage);
  const rows  = filtered.slice((page-1)*perPage, page*perPage);

  const hskCounts = ["HSK 1","HSK 2","HSK 3","HSK 4","HSK 5","HSK 6"].map(l=>({l,c:data.filter(d=>d.hsk===l).length}));
  const maxHsk = Math.max(...hskCounts.map(h=>h.c),1);

  function openCreate() {
    setForm({name:"",hsk:"HSK 1",type:"Tổng hợp",time:45,pass:60,desc:"",status:"draft"});
    setShowCreate(true);
  }
  function confirmCreate() {
    if (!form.name.trim()) return;
    const now = new Date();
    setData([{...form,id:Math.max(...data.map(d=>d.id))+1,questions:0,plays:0,
      date:`${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`},...data]);
    setShowCreate(false);
  }
  function openEdit(item) {
    setForm({name:item.name,hsk:item.hsk,type:item.type,time:item.time,pass:item.pass,desc:item.desc||"",status:item.status});
    setEditItem(item);
  }
  function confirmEdit() {
    setData(data.map(d=>d.id===editItem.id?{...d,...form}:d));
    setEditItem(null);
  }
  function confirmDel() {
    setData(data.filter(d=>d.id!==delItem.id));
    setDelItem(null);
  }
  function copyQuiz(item) {
    const now = new Date();
    setData([{...item,id:Math.max(...data.map(d=>d.id))+1,name:item.name+" (bản sao)",plays:0,status:"draft",
      date:`${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`},...data]);
  }


  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-3 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-slate-400 mb-0.5">Nội dung › <span className="text-slate-700">Quản lí đề thi</span></p>
            <h1 className="text-lg font-bold text-slate-900">Quản lí đề thi</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition bg-white">
            <span className="material-symbols-outlined text-base">download</span>Xuất Excel
          </button>
          <button onClick={() => navigate("/adminAddNewQuiz")} className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition shadow-md shadow-primary/20">
            <span className="material-symbols-outlined text-base">add_circle</span>Tạo đề thi mới
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              {label:"Tổng đề thi",   val:data.length,                                   ico:"quiz",         bg:"bg-blue-50",    icoclr:"text-blue-500",   valclr:"text-slate-900"},
              {label:"Công khai",      val:data.filter(d=>d.status==="active").length,     ico:"check_circle", bg:"bg-emerald-50", icoclr:"text-emerald-500",valclr:"text-emerald-600"},
              {label:"Nháp / Ẩn",     val:data.filter(d=>d.status!=="active").length,     ico:"pending",      bg:"bg-amber-50",   icoclr:"text-amber-500",  valclr:"text-amber-600"},
              {label:"Tổng lượt làm", val:data.reduce((a,d)=>a+d.plays,0).toLocaleString("vi-VN"),ico:"group",bg:"bg-violet-50",icoclr:"text-violet-500",valclr:"text-violet-600"},
            ].map((s,i)=>(
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4">
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-symbols-outlined ${s.icoclr}`}>{s.ico}</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                  <p className={`text-xl font-bold ${s.valclr}`}>{s.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* HSK Distribution bars */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700">Phân bổ theo cấp độ HSK</h3>
              <span className="text-xs text-slate-400">Bấm vào cột để lọc</span>
            </div>
            <div className="flex gap-3 items-end" style={{height:80}}>
              {hskCounts.map((h,i)=>(
                <div key={i}
                  className={`flex-1 flex flex-col items-center gap-1 cursor-pointer transition-opacity ${activeLv===h.l?"opacity-100":"opacity-60 hover:opacity-80"}`}
                  onClick={()=>{setActiveLv(activeLv===h.l?"Tất cả":h.l);setPage(1);}}>
                  <div className="w-full flex items-end rounded overflow-hidden bg-slate-100"
                    style={{height:52,outline:activeLv===h.l?"2px solid #2563eb":"none",outlineOffset:2,borderRadius:4}}>
                    <div className="w-full rounded-t transition-all duration-500"
                      style={{height:`${Math.round(h.c/maxHsk*100)}%`,background:HSK_BAR_COLORS[i]}}/>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{h.l.replace("HSK ","H")}</span>
                  <span className={`text-xs font-bold ${activeLv===h.l?"text-blue-600":"text-slate-700"}`}>{h.c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">search</span>
              <input
              
              value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
                placeholder="Tìm tên đề thi..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white transition"/>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["Tất cả","Công khai","Nháp","Ẩn"].map(s=>(
                <button key={s} onClick={()=>{setActiveSt(s);setPage(1);}}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${activeSt===s?"bg-primary text-white border-primary":"bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{s}</button>
              ))}
            </div>
            <select value={sortVal} onChange={e=>{setSortVal(e.target.value);setPage(1);}}
              className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white text-slate-600 focus:outline-none">
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="most">Nhiều câu nhất</option>
              <option value="plays">Lượt làm cao nhất</option>
              <option value="az">Tên A → Z</option>
            </select>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left" style={{minWidth:960}}>
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {["Tên đề thi","Cấp độ","Dạng đề","Số câu","Thời gian","Lượt làm","Trạng thái","Ngày tạo","Thao tác"].map(h=>(
                      <th key={h} className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.length===0 ? (
                    <tr><td colSpan={9} className="px-4 py-12 text-center">
                      <span className="material-symbols-outlined text-4xl text-slate-300 block mb-2">search_off</span>
                      <span className="text-slate-400 text-sm">Không tìm thấy đề thi nào</span>
                    </td></tr>
                  ) : rows.map(d=>(
                    <tr key={d.id} className="hover:bg-slate-50 transition group">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-800 text-sm leading-tight">{d.name}</div>
                        {d.desc && <div className="text-xs text-slate-400 mt-0.5">{d.desc}</div>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${HSK_BADGE[d.hsk]}`}>{d.hsk}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 whitespace-nowrap">{d.type}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{d.questions} câu</td>
                      <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{d.time} phút</td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-slate-600">{d.plays.toLocaleString("vi-VN")}</div>
                        <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-blue-400 rounded-full" style={{width:`${Math.round(d.plays/maxPlays*100)}%`}}/>
                        </div>
                      </td>
                      <td className="px-4 py-3"><StatusDot s={d.status}/></td>
                      <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{d.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {/* Xem / sửa câu hỏi */}
                          <button onClick={()=>navigate(`/adminEditQuiz/${d.id}`)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition whitespace-nowrap">
                            <span className="material-symbols-outlined text-sm">edit</span>Sửa
                          </button>
                          {/* Sửa thông tin */}
                          <button onClick={()=>openEdit(d)} title="Sửa thông tin"
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 transition">
                            <span className="material-symbols-outlined text-sm">tune</span>
                          </button>
                          {/* Nhân bản */}
                          <button onClick={()=>copyQuiz(d)} title="Nhân bản"
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 transition">
                            <span className="material-symbols-outlined text-sm">content_copy</span>
                          </button>
                          {/* Xoá */}
                          <button onClick={()=>setDelItem(d)} title="Xoá"
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Hiển thị {total===0?0:(page-1)*perPage+1}–{Math.min(page*perPage,total)} trong {total} đề thi
              </span>
              <div className="flex gap-1">
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
                  className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center">‹</button>
                {Array.from({length:pages},(_,i)=>i+1).map(p=>(
                  <button key={p} onClick={()=>setPage(p)}
                    className={`w-8 h-8 rounded-lg border text-xs font-semibold transition ${p===page?"bg-primary text-white border-primary":"border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{p}</button>
                ))}
                <button onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages||pages===0}
                  className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center">›</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <Modal title="Tạo đề thi mới" sub="Điền thông tin cơ bản. Thêm câu hỏi sau khi tạo xong." onClose={()=>setShowCreate(false)}>
      <FormBody
  form={form}
  sf={sf}
  editItem={editItem}
  inputCls={inputCls}
/>
          <div className="flex gap-3 justify-end pt-3 border-t border-slate-100">
            <button onClick={()=>setShowCreate(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Huỷ</button>
            <button onClick={confirmCreate} className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition">Tạo đề thi</button>
          </div>
        </Modal>
      )}

      {/* EDIT INFO MODAL */}
      {editItem && (
        <Modal title="Chỉnh sửa thông tin đề thi" sub="Cập nhật thông tin. Thay đổi có hiệu lực ngay sau khi lưu." onClose={()=>setEditItem(null)}>
       <FormBody
  form={form}
  sf={sf}
  editItem={editItem}
  inputCls={inputCls}
/>
          <div className="flex gap-3 justify-end pt-3 border-t border-slate-100">
            <button onClick={()=>setEditItem(null)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Huỷ</button>
            <button onClick={confirmEdit} className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition">Lưu thay đổi</button>
          </div>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {delItem && (
        <Modal title="Xoá đề thi" onClose={()=>setDelItem(null)}>
          <p className="text-sm text-slate-600 mb-5 leading-relaxed">
            Bạn chắc chắn muốn xoá <strong className="text-red-600">{delItem.name}</strong>?<br/>
            Toàn bộ câu hỏi liên kết sẽ bị gỡ. Hành động không thể hoàn tác.
          </p>
          <div className="flex gap-3 justify-end">
            <button onClick={()=>setDelItem(null)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Huỷ</button>
            <button onClick={confirmDel} className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition">Xoá đề thi</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
