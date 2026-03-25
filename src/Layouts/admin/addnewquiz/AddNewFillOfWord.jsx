import React from "react";
import {useState} from "react";
import { Link } from "react-router-dom";
import toxiLogo from "../../../assets/image/LOGO (1).png"
export default function AddNewFillOfWord(){
    const [showAll, setShowAll] = useState(false);
    
    const [questions, setQuestions] = useState([
    {
    id:1,
    type:"Nghe hiểu",
    content:"这是我哥哥。 (Đây là anh trai của tôi.)",
    level:"HSK 1"
    },
    {
    id:2,
    type:"Đọc hiểu",
    content:"苹果在桌子上。 (Quả táo ở trên bàn.)",
    level:"HSK 1"
    },
    {
    id:3,
    type:"Nghe hiểu",
    content:"你叫什么名字？ (Bạn tên là gì?)",
    level:"HSK 1"
    },
    {
    id:4,
    type:"Đọc hiểu",
    content:"他在学校学习。 (Anh ấy học ở trường.)",
    level:"HSK 1"
    }
    ]);
    return (
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
    to="#"
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


<div div className="flex flex-1 overflow-hidden">

{/* Sidebar */}
<aside className="w-64 bg-primary-dark flex-shrink-0 flex flex-col border-r border-slate-700/50">

  <nav className="flex-1 py-6 px-3 space-y-2">

   <Link
to="/addNewfillofword"
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

{/* Level And Type */}
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
className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary"
>

<option>Điền từ vào chỗ trống (Fill in the Blanks)</option>
<option>Sắp xếp câu (Sentence Reordering)</option>
<option>Chọn đáp án đúng (Multiple Choice)</option>
<option>Nối câu (Matching)</option>

</select>

</div>

</div>


{/* Editor */}
<div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">

<div className="bg-secondary-dark border-b border-slate-200 p-4 flex justify-between items-center">

<h3 className="font-bold text-primary">
Thiết kế câu hỏi: Điền từ vào chỗ trống
</h3>

<span className="text-xs text-text-muted">
Tự động lưu lúc 14:35
</span>

</div>


<div className="p-6 space-y-6">

{/* Textarea */}

<div className="space-y-2">

<div className="flex justify-between items-end">

<label className="block text-sm font-semibold text-text-main">
Nội dung văn bản
</label>

<span className="text-[10px] text-text-muted bg-surface px-2 py-0.5 rounded">

Sử dụng <strong>[ ]</strong> để tạo ô trống.

</span>

</div>

<textarea
className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary font-serif text-lg leading-relaxed"
placeholder="Ví dụ: 明天 [天气] 很好，我们去 [公园] 玩吧。"
rows="6"
/>

</div>


{/* Answers */}

<div className="space-y-6">

<label className="block text-sm font-semibold text-text-main">
Đáp án cho các ô trống
</label>


{/* Blank 1 */}

<div className="space-y-3 p-4 border border-slate-200 rounded-xl bg-surface">

<div className="flex items-center gap-3">

<span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-secondary flex items-center justify-center font-bold text-sm">
1
</span>

<span className="text-sm font-bold text-primary uppercase tracking-wider">
Ô trống số 1
</span>

</div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-3">

{/* A */}

<div className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200">

<span className="text-xs font-bold text-text-muted w-5">
A.
</span>

<input
className="w-full border-0 focus:ring-0 p-0 text-sm font-medium"
placeholder="Nhập đáp án A"
type="text"
/>

<span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
ĐÚNG
</span>

</div>


{/* B */}

<div className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200">

<span className="text-xs font-bold text-text-muted w-5">
B.
</span>

<input
className="w-full border-0 focus:ring-0 p-0 text-sm"
placeholder="Nhập đáp án B"
type="text"
/>

</div>


{/* C */}

<div className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200">

<span className="text-xs font-bold text-text-muted w-5">
C.
</span>

<input
className="w-full border-0 focus:ring-0 p-0 text-sm"
placeholder="Nhập đáp án C"
type="text"
/>

</div>


{/* D */}

<div className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200">

<span className="text-xs font-bold text-text-muted w-5">
D.
</span>

<input
className="w-full border-0 focus:ring-0 p-0 text-sm"
placeholder="Nhập đáp án D"
type="text"
/>

</div>

</div>

</div>

</div>
<div className="space-y-3 pt-4 border-t border-slate-100">

<label className="block text-sm font-semibold text-text-main">
Từ gây nhiễu chung (Tùy chọn)
</label>

<div className="flex flex-wrap gap-2">

<div className="flex items-center bg-white border border-slate-300 rounded-md px-3 py-1 gap-2">

<input
className="border-0 p-0 text-sm focus:ring-0 w-20"
type="text"
defaultValue="漂亮"
/>

<button className="text-text-muted hover:text-accent-red">
×
</button>

</div>


<div className="flex items-center bg-white border border-slate-300 rounded-md px-3 py-1 gap-2">

<input
className="border-0 p-0 text-sm focus:ring-0 w-20"
type="text"
defaultValue="买"
/>

<button className="text-text-muted hover:text-accent-red">
×
</button>

</div>


<button className="text-xs font-bold text-primary border border-dashed border-primary px-3 py-1 rounded-md hover:bg-primary/5">
+ Thêm từ
</button>

</div>

</div>


{/* Explanation */}

<div className="space-y-2 pt-4 border-t border-slate-100">

<label className="block text-sm font-semibold text-text-main italic">
Giải thích đáp án (Hướng dẫn học sinh)
</label>

<textarea
className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary"
placeholder="Giải thích ngữ pháp hoặc từ vựng..."
rows="2"
/>

</div>


{/* Sentence Reordering Editor */}

<div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">

<div className="bg-secondary-dark border-b border-slate-200 p-4 flex justify-between items-center">

<h3 className="font-bold text-primary">
Thiết kế câu hỏi: Sắp xếp câu
</h3>

<span className="text-xs text-text-muted">
Bản nháp
</span>

</div>


<div className="p-6 space-y-6">

<div className="space-y-2">

<label className="block text-sm font-semibold text-text-main">
Câu hoàn chỉnh (Đáp án đúng)
</label>

<input
className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary text-lg"
placeholder="Nhập câu đầy đủ..."
type="text"
defaultValue="他在教室里学习汉语。"
/>

</div>


<div className="space-y-4">

<label className="block text-sm font-semibold text-text-main">
Phân tách khối (Draggable Blocks)
</label>

<p className="text-[10px] text-text-muted">
Nhấn giữa các chữ hoặc dùng dấu |
</p>


<div className="flex flex-wrap gap-2 p-4 bg-surface border border-slate-200 rounded-lg min-h-[80px] items-center">


{/* Block */}

<div className="px-4 py-2 bg-white border-2 border-secondary/40 rounded shadow-sm font-bold text-primary cursor-move flex items-center gap-2">

<svg className="h-3 w-3 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
<path d="M10 9h4V5h3l-5-5-5 5h3v4z" />
</svg>

他

</div>


<div className="px-4 py-2 bg-white border-2 border-secondary/40 rounded shadow-sm font-bold text-primary cursor-move flex items-center gap-2">

<svg className="h-3 w-3 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
<path d="M10 9h4V5h3l-5-5-5 5h3v4z" />
</svg>

在教室里

</div>


<div className="px-4 py-2 bg-white border-2 border-secondary/40 rounded shadow-sm font-bold text-primary cursor-move flex items-center gap-2">

<svg className="h-3 w-3 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
<path d="M10 9h4V5h3l-5-5-5 5h3v4z" />
</svg>

学习

</div>


<div className="px-4 py-2 bg-white border-2 border-secondary/40 rounded shadow-sm font-bold text-primary cursor-move flex items-center gap-2">

<svg className="h-3 w-3 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
<path d="M10 9h4V5h3l-5-5-5 5h3v4z" />
</svg>

汉语。

</div>

</div>


<div className="flex justify-end">

<button className="text-xs text-primary font-bold flex items-center gap-1 hover:underline">

<svg
className="h-3 w-3"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
>

<path
d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="2"
/>

</svg>

Đặt lại khối

</button>

</div>

</div>

</div>

</div>
</div>

</div>

</section>
<aside className="space-y-6">

{/* Metadata Card */}

<section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

<div className="bg-primary px-4 py-3 border-b border-secondary">

<h3 className="text-white font-bold text-sm tracking-widest uppercase">
Thông tin bổ trợ
</h3>

</div>


<div className="p-4 space-y-4">

{/* Difficulty */}

<div>

<label className="block text-xs font-bold text-text-muted uppercase mb-2">
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

<label className="block text-xs font-bold text-text-muted uppercase mb-2">
Điểm số
</label>

<input
className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary"
step="0.5"
type="number"
defaultValue="2.5"
/>

</div>


{/* Tags */}

<div>

<label className="block text-xs font-bold text-text-muted uppercase mb-2">
Tags / Từ khóa
</label>

<input
className="w-full rounded-md border-slate-300 focus:ring-secondary focus:border-secondary text-sm"
placeholder="Nhấn Enter để thêm tag"
type="text"
/>

<div className="flex flex-wrap gap-2 mt-2">

<span className="bg-slate-100 text-[10px] font-bold px-2 py-1 rounded-full border border-slate-200 flex items-center gap-1">

HSK 3

<button className="hover:text-accent-red">
×
</button>

</span>


<span className="bg-slate-100 text-[10px] font-bold px-2 py-1 rounded-full border border-slate-200 flex items-center gap-1">

Ngữ pháp

<button className="hover:text-accent-red">
×
</button>

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

<button className="p-1 hover:text-primary">
<span className="material-symbols-outlined text-base">
edit
</span>
</button>

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