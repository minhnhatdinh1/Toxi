import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../../assets/image/LOGO (1).png";
import { useCart } from "../../../context/CartContext";

// ── Mock data ──
const QUIZ = {
  id: 1,
  title: "Đề thi HSK 4 — Mã đề 101",
  hsk: "HSK 4",
  type: "Tổng hợp",
  desc: "Đề thi thử HSK 4 toàn diện, bao gồm đầy đủ 3 kỹ năng Nghe, Đọc và Viết với độ khó chuẩn theo format thi chính thức.",
  time: 105,
  pass: 60,
  totalQ: 10,
  plays: 1240,
  rating: 4.8,
  reviewCount: 312,
  status: "active",
  createdAt: "10/03/2025",
  sections: [
    { skill: "nghe",  label: "Nghe (听)",  icon: "hearing",   color: "blue",   questions: 4,  desc: "Đúng/Sai, ABC ảnh, Gộp câu, ABCD văn bản" },
    { skill: "doc",   label: "Đọc (读)",   icon: "menu_book", color: "violet", questions: 4,  desc: "Đúng sai ảnh, A B C D đoạn, Sắp xếp từ, Điền từ" },
    { skill: "viet",  label: "Viết (写)",  icon: "edit_note", color: "orange", questions: 2,  desc: "Sắp xếp từ, Viết đoạn văn" },
  ],
  history: [
    { id: 1, date: "10/03/2025", score: 210, total: 300, time: "98 phút", pass: true },
    { id: 2, date: "01/02/2025", score: 185, total: 300, time: "105 phút", pass: false },
  ],
  related: [
    { id: 2, title: "Đề thi HSK 4 — Mã đề 102", questions: 40, time: 105, plays: 890, hsk: "HSK 4" },
    { id: 3, title: "HSK 4 — Luyện tập nhanh",   questions: 20, time: 45,  plays: 1560, hsk: "HSK 4" },
    { id: 4, title: "Đề thi HSK 5 — Mã đề 501",  questions: 100,time: 125, plays: 340, hsk: "HSK 5" },
  ],
};

const HSK_BADGE = {
  "HSK 1":"bg-emerald-100 text-emerald-800",
  "HSK 2":"bg-blue-100 text-blue-800",
  "HSK 3":"bg-violet-100 text-violet-800",
  "HSK 4":"bg-orange-100 text-orange-800",
  "HSK 5":"bg-red-100 text-red-800",
  "HSK 6":"bg-slate-800 text-slate-100",
};

const SKILL_COLORS = {
  nghe:  { bg:"bg-blue-50",   border:"border-blue-200",  badge:"bg-blue-100 text-blue-800",   icon:"text-blue-600",   bar:"bg-blue-500" },
  doc:   { bg:"bg-violet-50", border:"border-violet-200",badge:"bg-violet-100 text-violet-800",icon:"text-violet-600", bar:"bg-violet-500" },
  viet:  { bg:"bg-orange-50", border:"border-orange-200",badge:"bg-orange-100 text-orange-800",icon:"text-orange-600", bar:"bg-orange-500" },
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`material-symbols-outlined text-base ${i<=Math.round(rating)?"text-amber-400":"text-slate-300"}`}
          style={{fontVariationSettings:"'FILL' 1"}}>star</span>
      ))}
    </div>
  );
}

function ConfirmModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="text-center mb-5">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-primary text-3xl">quiz</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Bắt đầu làm bài?</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Đồng hồ sẽ bắt đầu chạy ngay khi bạn nhấn xác nhận.<br/>
            Thời gian: <strong className="text-primary">{QUIZ.time} phút</strong>
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-xs text-amber-700 flex gap-2">
          <span className="material-symbols-outlined text-amber-500 text-sm flex-shrink-0">warning</span>
          Sau khi bắt đầu, bạn không thể tạm dừng hoặc quay lại trang này.
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
            Huỷ bỏ
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition shadow-md shadow-primary/20">
            Bắt đầu thi
          </button>
        </div>
      </div>
    </div>
  );
}

export default function QuizDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const userName = localStorage.getItem("userName") || "User";
  const q = QUIZ;

  const bestScore = q.history.length ? Math.max(...q.history.map(h=>h.score)) : null;
  const lastAttempt = q.history[0] || null;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4">
          <Link to="/home" className="flex items-center gap-3 flex-shrink-0">
            <img src={logo} alt="TOXI" className="h-10 w-10 rounded-xl shadow-lg"/>
            <div>
              <h1 className="text-lg font-black tracking-tighter leading-none">TOXI</h1>
              <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">学以致用</p>
            </div>
          </Link>
          <div className="flex-1"/>
          <Link to="/Practice" className="text-white/70 hover:text-white text-sm font-medium transition flex items-center gap-1">
            <span className="material-symbols-outlined text-base">arrow_back</span>Ngân hàng đề thi
          </Link>
          <Link to="/cart" className="relative p-2 hover:bg-white/10 rounded-xl transition">
            <span className="material-symbols-outlined text-white/80">shopping_cart</span>
            {cartCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
          </Link>
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <div className="bg-primary pb-20 pt-8">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-xs mb-5 font-medium">
            <Link to="/home" className="hover:text-white transition">Trang chủ</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <Link to="/Practice" className="hover:text-white transition">Luyện thi HSK</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-white truncate max-w-xs">{q.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${HSK_BADGE[q.hsk]}`}>{q.hsk}</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/20 text-white">{q.type}</span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300">
                  <span className="material-symbols-outlined text-sm">verified</span>Chuẩn format thi
                </span>
              </div>
              <h1 className="text-3xl font-black text-white mb-3 leading-tight">{q.title}</h1>
              <p className="text-white/75 text-sm leading-relaxed mb-4 max-w-2xl">{q.desc}</p>

              {/* Stats row */}
              <div className="flex items-center gap-5 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <StarRating rating={q.rating}/>
                  <span className="text-white font-bold text-sm">{q.rating}</span>
                  <span className="text-white/60 text-xs">({q.reviewCount} đánh giá)</span>
                </div>
                <span className="text-white/40">·</span>
                <span className="text-white/70 text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">group</span>
                  {q.plays.toLocaleString("vi-VN")} lượt làm
                </span>
                <span className="text-white/40">·</span>
                <span className="text-white/70 text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  Cập nhật {q.createdAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 -mt-12 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT: Details */}
          <div className="lg:col-span-2 space-y-5">

            {/* Quick info cards */}
            <div className="grid grid-cols-4 gap-3">
              {[
                {ico:"quiz",       label:"Số câu",      val:q.totalQ+" câu",      clr:"text-primary"},
                {ico:"timer",      label:"Thời gian",   val:q.time+" phút",       clr:"text-slate-800"},
                {ico:"grade",      label:"Điểm đạt",    val:q.pass+"%",           clr:"text-amber-600"},
                {ico:"group",      label:"Lượt làm",    val:q.plays.toLocaleString("vi-VN"), clr:"text-slate-800"},
              ].map((s,i)=>(
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 text-center shadow-sm">
                  <span className={`material-symbols-outlined text-2xl mb-1.5 block ${s.clr}`}>{s.ico}</span>
                  <p className={`text-lg font-black ${s.clr}`}>{s.val}</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="flex border-b border-slate-200">
                {[
                  {k:"info",    l:"Nội dung đề thi"},
                  {k:"history", l:`Lịch sử (${q.history.length})`},
                  {k:"review",  l:"Đánh giá"},
                ].map(t=>(
                  <button key={t.k} onClick={()=>setActiveTab(t.k)}
                    className={`flex-1 py-3.5 text-sm font-semibold border-b-2 transition ${activeTab===t.k?"border-primary text-primary":"border-transparent text-slate-500 hover:text-slate-700"}`}>
                    {t.l}
                  </button>
                ))}
              </div>

              <div className="p-5">

                {/* TAB: INFO */}
                {activeTab==="info" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-700 mb-3">Cấu trúc đề thi</h3>
                      <div className="space-y-3">
                        {q.sections.map(sec=>{
                          const s = SKILL_COLORS[sec.skill];
                          return (
                            <div key={sec.skill} className={`flex items-center gap-4 p-4 ${s.bg} border ${s.border} rounded-xl`}>
                              <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                <span className={`material-symbols-outlined ${s.icon}`}>{sec.icon}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <p className="font-bold text-slate-800 text-sm">{sec.label}</p>
                                  <span className={`text-xs px-2 py-0.5 rounded-lg font-semibold ${s.badge}`}>{sec.questions} câu</span>
                                </div>
                                <p className="text-xs text-slate-500">{sec.desc}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-xs text-slate-500">Tỉ lệ</p>
                                <p className="font-bold text-slate-700 text-sm">{Math.round(sec.questions/q.totalQ*100)}%</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="divider h-px bg-slate-100"/>

                    <div>
                      <h3 className="text-sm font-bold text-slate-700 mb-3">Lưu ý khi làm bài</h3>
                      <ul className="space-y-2">
                        {[
                          "Đồng hồ đếm ngược bắt đầu ngay khi vào trang thi",
                          "Có thể cuộn xuống để xem tất cả câu hỏi",
                          "Bấm số câu ở bảng bên phải để nhảy đến câu đó",
                          "Bài viết tự do sẽ được giáo viên chấm trong 24h",
                          "Kết quả lưu vào lịch sử ngay sau khi nộp bài",
                        ].map((note,i)=>(
                          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                            <span className="material-symbols-outlined text-primary text-base flex-shrink-0 mt-0.5">check_circle</span>
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* TAB: HISTORY */}
                {activeTab==="history" && (
                  <div>
                    {q.history.length===0 ? (
                      <div className="text-center py-10">
                        <span className="material-symbols-outlined text-5xl text-slate-300 block mb-2">history</span>
                        <p className="text-slate-400 text-sm">Bạn chưa làm đề thi này lần nào</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Best score banner */}
                        {bestScore && (
                          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary text-xl">emoji_events</span>
                            <div>
                              <p className="text-xs text-slate-500">Điểm cao nhất của bạn</p>
                              <p className="font-black text-primary text-lg">{bestScore}<span className="text-sm text-slate-400 font-normal">/300</span></p>
                            </div>
                          </div>
                        )}
                        {q.history.map((h,i)=>(
                          <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${h.pass?"border-emerald-200 bg-emerald-50":"border-red-200 bg-red-50"}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-lg ${h.pass?"bg-emerald-500 text-white":"bg-red-400 text-white"}`}>
                              {i+1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                <p className="font-bold text-slate-800 text-sm">{h.date}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-lg font-bold ${h.pass?"bg-emerald-100 text-emerald-700":"bg-red-100 text-red-600"}`}>
                                  {h.pass?"ĐẠT":"KHÔNG ĐẠT"}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">Thời gian: {h.time}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className={`text-xl font-black ${h.pass?"text-emerald-600":"text-red-500"}`}>{h.score}</p>
                              <p className="text-xs text-slate-400">/300 điểm</p>
                            </div>
                            <Link to="/ExamResult" className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition flex-shrink-0">
                              <span className="material-symbols-outlined text-sm">visibility</span>Xem lại
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB: REVIEW */}
                {activeTab==="review" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-center">
                        <p className="text-4xl font-black text-primary">{q.rating}</p>
                        <StarRating rating={q.rating}/>
                        <p className="text-xs text-slate-500 mt-1">{q.reviewCount} đánh giá</p>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {[5,4,3,2,1].map(star=>{
                          const pct = star===5?65:star===4?25:star===3?7:star===2?2:1;
                          return (
                            <div key={star} className="flex items-center gap-2">
                              <span className="text-xs text-slate-500 w-4">{star}</span>
                              <span className="material-symbols-outlined text-amber-400 text-sm" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-400 rounded-full" style={{width:`${pct}%`}}/>
                              </div>
                              <span className="text-xs text-slate-400 w-8 text-right">{pct}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {[
                      {name:"Nguyễn Văn A", rating:5, date:"12/03/2025", comment:"Đề rất sát với đề thi thật, mình thi HSK4 được 210 điểm sau khi luyện đề này nhiều lần!"},
                      {name:"Trần Thị B",   rating:4, date:"05/03/2025", comment:"Câu hỏi phong phú và giải thích chi tiết. Phần viết hơi khó nhưng đúng với format thật."},
                      {name:"Lê Hoàng C",   rating:5, date:"28/02/2025", comment:"Rất hài lòng! Giao diện dễ dùng, phân chia phần rõ ràng. Sẽ tiếp tục luyện."},
                    ].map((rv,i)=>(
                      <div key={i} className="border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">
                            {rv.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{rv.name}</p>
                            <div className="flex items-center gap-2">
                              <StarRating rating={rv.rating}/>
                              <span className="text-xs text-slate-400">{rv.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{rv.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Related quizzes */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-700 mb-4">Đề thi liên quan</h3>
              <div className="space-y-3">
                {q.related.map(r=>(
                  <Link key={r.id} to={`/quiz/${r.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-primary/30 hover:bg-slate-50 transition group">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-base">quiz</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-primary transition truncate">{r.title}</p>
                      <p className="text-xs text-slate-400">{r.questions} câu · {r.time} phút · {r.plays.toLocaleString("vi-VN")} lượt làm</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-bold flex-shrink-0 ${HSK_BADGE[r.hsk]}`}>{r.hsk}</span>
                    <span className="material-symbols-outlined text-slate-400 text-base group-hover:text-primary transition">arrow_forward</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: CTA Card (sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">

              {/* Main CTA */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-primary/5 border-b border-primary/10 p-4 text-center">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Điểm cao nhất của bạn</p>
                  {bestScore ? (
                    <p className="text-3xl font-black text-primary">{bestScore}<span className="text-base text-slate-400 font-normal">/300</span></p>
                  ) : (
                    <p className="text-slate-400 text-sm font-medium">Chưa có lần làm nào</p>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  {/* Info rows */}
                  {[
                    {ico:"quiz",       l:"Số câu hỏi",     v:q.totalQ+" câu"},
                    {ico:"timer",      l:"Thời gian làm",  v:q.time+" phút"},
                    {ico:"grade",      l:"Điểm để đạt",    v:q.pass+"% ("+Math.round(300*q.pass/100)+" điểm)"},
                    {ico:"autorenew",  l:"Đã làm",         v:q.history.length+" lần"},
                  ].map((row,i)=>(
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <span className="material-symbols-outlined text-base">{row.ico}</span>
                        {row.l}
                      </div>
                      <span className="font-semibold text-slate-800">{row.v}</span>
                    </div>
                  ))}

                  <div className="pt-2 space-y-2">
                    <button onClick={()=>setShowConfirm(true)}
                      className="w-full py-3.5 bg-primary text-white font-black text-base rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">play_circle</span>
                      {q.history.length>0 ? "Làm lại bài thi" : "Bắt đầu làm bài"}
                    </button>
                    <Link to={`/adminQuiz/${q.id}/preview`}
                      className="w-full py-2.5 border border-slate-200 text-slate-600 font-semibold text-sm rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-base">preview</span>
                      Xem trước đề thi
                    </Link>
                  </div>
                </div>
              </div>

              {/* Skill distribution */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Phân bổ câu hỏi</h3>
                <div className="space-y-2.5">
                  {q.sections.map(sec=>{
                    const s = SKILL_COLORS[sec.skill];
                    const pct = Math.round(sec.questions/q.totalQ*100);
                    return (
                      <div key={sec.skill}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-semibold text-slate-600">{sec.label}</span>
                          <span className="text-slate-400">{sec.questions} câu ({pct}%)</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${s.bar} rounded-full`} style={{width:`${pct}%`}}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Warning box */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-amber-500 flex-shrink-0 text-base">info</span>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Chuẩn bị sẵn sàng trước khi bắt đầu. Đồng hồ không thể dừng sau khi vào trang thi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <ConfirmModal
          onClose={()=>setShowConfirm(false)}
          onConfirm={()=>{ setShowConfirm(false); navigate("/Exam"); }}
        />
      )}
    </div>
  );
}
