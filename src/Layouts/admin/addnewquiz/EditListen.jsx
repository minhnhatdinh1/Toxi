import react from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toxiLogo from "../../../assets/image/LOGO (1).png"
export default function EditListen(){
    const [audioFile, setAudioFile] = useState(null);
const [image, setImage] = useState(null);

const handleAudioChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setAudioFile(file);
  }
};

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const preview = URL.createObjectURL(file);
    setImage(preview);
  }
};
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

{/* Level And Type */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">

<label className="block text-xs font-bold text-toxi-blue uppercase mb-2">
Cấp độ HSK
</label>

<select className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold">

<option>HSK 1</option>
<option>HSK 2</option>
<option>HSK 3</option>
<option>HSK 4</option>
<option>HSK 5</option>
<option>HSK 6</option>

</select>

</div>


<div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">

<label className="block text-xs font-bold text-toxi-blue uppercase mb-2">
Loại câu hỏi
</label>

<select
id="question-type"
className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
>

<option>Nghe và chọn ảnh đúng (Listening - Match Image)</option>
<option>Nghe và chọn đáp án đúng (Listening - MCQs)</option>
<option>Đúng / Sai (True / False)</option>

</select>

</div>

</div>


{/* Editor */}
<div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">

<div className="p-6 space-y-6">

<div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">

<h3 className="font-bold text-toxi-blue">
Nội dung soạn thảo
</h3>

<span className="text-xs text-slate-400">
Tự động lưu lúc 14:30
</span>

</div>


 <div className="space-y-2">

<label className="block text-sm font-semibold text-slate-700">
Hình ảnh minh họa (Nếu có)
</label>

<div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-secondary transition-colors cursor-pointer bg-slate-50 group">

<input
type="file"
accept="image/*"
onChange={handleImageUpload}
className="absolute inset-0 opacity-0 cursor-pointer"
/>

{image ? (

<img
src={image}
alt="preview"
className="mx-auto max-h-40 object-contain rounded"
/>

) : (

<>
<svg
className="mx-auto h-8 w-8 text-slate-400 group-hover:text-secondary mb-2"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
>
<path
d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="2"
/>
</svg>

<p className="text-xs text-slate-500">
Tải ảnh lên cho đề bài Viết (Ví dụ: đề bài HSK 5 phần 2 câu 99)
</p>
</>

)}

</div>

</div>


{/* Question Fields */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="space-y-2">

<label className="block text-sm font-semibold text-slate-700">
Nội dung tiếng Trung
</label>

<textarea
rows="2"
placeholder="Nhập chữ Hán..."
className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
defaultValue="______, 我去图书馆学习。"
/>

</div>


<div className="space-y-2">

<label className="block text-sm font-semibold text-slate-700">
Phiên âm (Pinyin)
</label>

<textarea
rows="2"
placeholder="Nhập Pinyin..."
className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
defaultValue="Nǐ hǎo"
/>

</div>


<div className="space-y-2">

<label className="block text-sm font-semibold text-slate-700">
Dịch nghĩa tiếng Việt
</label>

<textarea
rows="2"
placeholder="Nhập nghĩa tiếng Việt..."
className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
defaultValue="Tối nay bạn làm gì? Tôi đi thư viện học bài."
/>

</div>

</div>


{/* Transcription */}
<div className="space-y-2">

<label className="block text-sm font-semibold text-slate-700">
Bản ghi âm (Transcription/Script)
</label>

<textarea
rows="2"
placeholder="Nhập lời thoại của đoạn băng..."
className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
defaultValue={`A: 你好！
B: 你好！`}
/>

</div>


{/* Image Resource */}
<div className="space-y-2">

<label className="block text-sm font-semibold text-slate-700">
Hình ảnh minh họa (Tùy chọn)
</label>

<div className="flex items-center gap-4">

<div className="w-24 h-24 bg-slate-100 border border-slate-200 rounded flex items-center justify-center relative overflow-hidden">

<img
src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm97CDtC1kyLrKT5mwh3RbpA1yVVgPfRMppDG0G42ivfHixbIl3uGbzVolNndR8J473VMTIiDOS2PVZxeR1jvPd-LXOhAqCGJAAADFoFtt_AObqC6GJUdVqLY1UTuBkBKM9aKASF6xCdI0MRKadtbnMOpDHUhjKne9BrwxTeToV80LnD0D_otIvjXCBJVVQDXc0c6zCudNBg_ffSRXsLENupjfmY2K3b3XN2X9e_ZVaFQBtqZI9A2UTIoq9-v5Ts__xcPm0-9PAUU"
alt="Preview"
className="object-cover w-full h-full"
/>

<button className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm">

<svg
className="h-3 w-3"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
>

<path
d="M6 18L18 6M6 6l12 12"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="2"
/>

</svg>

</button>

</div>


<button className="text-xs font-bold text-toxi-blue px-3 py-2 border border-toxi-blue rounded hover:bg-toxi-blue hover:text-white transition-all">
Thay đổi ảnh
</button>

</div>

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
defaultChecked
className="mt-2 w-5 h-5 text-toxi-gold focus:ring-toxi-gold"
/>

<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">

<div className="flex gap-2">

<span className="bg-slate-200 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600">
A
</span>

<input
type="text"
placeholder="Chữ Hán đáp án A"
defaultValue="你晚上做什么？"
className="flex-1 rounded-r-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
/>

</div>

<input
type="text"
placeholder="Dịch nghĩa tiếng Việt A"
className="rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
/>

</div>
</div>


{/* Option B */}
<div className="flex items-start gap-3 p-3 border border-slate-100 rounded-lg bg-slate-50/50">

<input
type="radio"
name="correct_answer"
className="mt-2 w-5 h-5 text-toxi-gold focus:ring-toxi-gold"
/>

<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">

<div className="flex gap-2">

<span className="bg-slate-200 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600">
B
</span>

<input
type="text"
placeholder="Chữ Hán đáp án B"
defaultValue="你喜欢什么？"
className="flex-1 rounded-r-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
/>

</div>

<input
type="text"
placeholder="Dịch nghĩa tiếng Việt B"
className="rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
/>

</div>
</div>


{/* Option C */}
<div className="flex items-start gap-3 p-3 border border-slate-100 rounded-lg bg-slate-50/50">

<input
type="radio"
name="correct_answer"
className="mt-2 w-5 h-5 text-toxi-gold focus:ring-toxi-gold"
/>

<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">

<div className="flex gap-2">

<span className="bg-slate-200 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600">
C
</span>

<input
type="text"
placeholder="Chữ Hán đáp án C"
defaultValue="你要去哪儿？"
className="flex-1 rounded-r-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
/>

</div>

<input
type="text"
placeholder="Dịch nghĩa tiếng Việt C"
className="rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
/>

</div>
</div>


{/* Option D */}
<div className="flex items-start gap-3 p-3 border border-slate-100 rounded-lg bg-slate-50/50">

<input
type="radio"
name="correct_answer"
className="mt-2 w-5 h-5 text-toxi-gold focus:ring-toxi-gold"
/>

<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">

<div className="flex gap-2">

<span className="bg-slate-200 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600">
D
</span>

<input
type="text"
placeholder="Chữ Hán đáp án D"
defaultValue="这里的书好吗？"
className="flex-1 rounded-r-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
/>

</div>

<input
type="text"
placeholder="Dịch nghĩa tiếng Việt D"
className="rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
/>

</div>
</div>

</div>


{/* Add option */}
<button className="text-toxi-blue text-sm font-bold flex items-center gap-1 hover:underline">

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

</div>


{/* Explanation */}
<div className="space-y-2 pt-4 border-t border-slate-100">

<label className="block text-sm font-semibold text-slate-700 italic">
Giải thích đáp án chi tiết (Hướng dẫn học sinh)
</label>

<textarea
rows="4"
placeholder="Giải thích chi tiết tại sao chọn đáp án này..."
defaultValue="Câu hỏi yêu cầu một hành động trong tương lai gần (buổi tối). Đáp án A là câu hỏi về hành động, phù hợp nhất với câu trả lời đi học bài."
className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
/>

</div>
</div>
</div>

</section>

</div>
</div>
</main>
</div>
</div>
        </>
    )
}