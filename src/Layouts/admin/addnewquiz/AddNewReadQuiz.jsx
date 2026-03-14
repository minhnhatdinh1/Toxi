import react from "react";
import toxiLogo from "../../../assets/image/LOGO (1).png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function AddNewReadQuiz() {
     const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("reading");
  const [image, setImage] = useState(null);
  const handleTabChange = (tab) => {
  setActiveTab(tab);

  if (tab === "listening") navigate("/listenQuiz");
  if (tab === "reading") navigate("/readQuiz");
  if (tab === "writing") navigate("/writtingQuiz");
};
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
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImage(URL.createObjectURL(file));
  }
};
    return (
        <>
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

  {/* Header Buttons */}
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


<main className="flex-1 overflow-y-auto">

  <div className="max-w-[1440px] mx-auto p-6 space-y-6">

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      <section className="lg:col-span-3 space-y-6">

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2 flex items-center gap-2 border border-slate-200">

          <button
            onClick={() => handleTabChange("listening")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 
            ${activeTab === "listening" ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-50"}`}
          >
            Nghe (Listening)
          </button>

          <button
            onClick={() => handleTabChange("reading")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 
            ${activeTab === "reading" ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-50"}`}
          >
            Đọc (Reading)
          </button>

          <button
            onClick={() => handleTabChange("writing")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 
            ${activeTab === "writing" ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-50"}`}
          >
            Viết (Writing)
          </button>

        </div>


        {/* HSK Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">

            <label className="block text-xs font-bold text-blue-600 uppercase mb-2">
              Cấp độ HSK
            </label>

            <select className="w-full rounded-md border-slate-300 focus:ring-blue-500 focus:border-blue-500">

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
    className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
    id="question-type"
    defaultValue="reading-mcq"
  >
    <option value="match-image">
      Đọc và chọn ảnh đúng (Reading - Match Image)
    </option>

    <option value="reading-mcq">
      Đọc hiểu đoạn văn - Trắc nghiệm (Reading MCQs)
    </option>

    <option value="true-false">
      Phán đoán Đúng / Sai (True / False)
    </option>

    <option value="reordering">
      Sắp xếp câu (Sentence Reordering)
    </option>

  </select>

</div>
</div>

{/* Main Editor Content */}

<div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">

  <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">

    <h3 className="font-bold text-toxi-blue">
      Nội dung câu hỏi Đọc hiểu
    </h3>

    <span className="text-xs text-slate-400">
      Tự động lưu lúc 14:45
    </span>

  </div>


  <div className="p-6 space-y-6">

    {/* Image Upload Section */}

    <div className="space-y-2">

      <label className="block text-sm font-semibold text-slate-700">
        Hình ảnh minh họa hoặc Tư liệu (Tùy chọn cho HSK 3+)
      </label>

      <div className="flex items-start gap-4">

        {/* Upload Box */}

       <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-4 w-48 h-48 flex flex-col items-center justify-center text-center hover:border-secondary transition-colors cursor-pointer bg-slate-50 group">

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
className="w-full h-full object-cover rounded"
/>

) : (

<>
<svg
className="h-8 w-8 text-slate-400 group-hover:text-secondary mb-2"
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

<p className="text-[10px] text-slate-500">
Kéo ảnh vào hoặc{" "}
<span className="text-primary font-bold">
tải lên
</span>
</p>
</>

)}

</div>


        {/* Image Info */}

        <div className="flex-1 p-4 bg-slate-50 rounded-lg border border-slate-200">

          <p className="text-xs text-slate-500 mb-2 italic">
            Lưu ý: Đối với HSK 1-2, hình ảnh thường là nội dung chính của câu hỏi "Đọc và chọn ảnh".
          </p>

          <ul className="text-[10px] text-slate-400 space-y-1">

            <li>• Định dạng: JPG, PNG</li>

            <li>• Kích thước tối đa: 2MB</li>

            <li>• Tỷ lệ khuyến nghị: 1:1 hoặc 4:3</li>

          </ul>

        </div>

      </div>

    </div>
{/* Reading Passage / Content */}

<div className="space-y-2">

  <div className="flex justify-between items-center">

    <label className="block text-sm font-semibold text-slate-700">
      Nội dung văn bản (Chinese Passage / Sentences)
    </label>

    <div className="flex gap-2">

      <button className="text-[10px] px-2 py-1 bg-slate-100 border border-slate-200 rounded hover:bg-slate-200">
        Thêm Pinyin
      </button>

      <button className="text-[10px] px-2 py-1 bg-slate-100 border border-slate-200 rounded hover:bg-slate-200">
        Dịch nghĩa
      </button>

    </div>

  </div>


  {/* Simulated Rich Text Editor */}

  <div className="border border-slate-300 rounded-md overflow-hidden">

    <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">

      <button className="p-1 hover:bg-slate-200 rounded">

        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >

          <path d="M13.5 10a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM7.5 10a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM10 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 6.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />

        </svg>

      </button>

      <div className="w-px h-4 bg-slate-300 mx-1"></div>

      <button className="font-bold text-xs px-2 hover:bg-slate-200 rounded">
        B
      </button>

      <button className="italic text-xs px-2 hover:bg-slate-200 rounded">
        I
      </button>

      <button className="underline text-xs px-2 hover:bg-slate-200 rounded">
        U
      </button>

    </div>


    <textarea
      className="w-full p-4 focus:ring-0 border-none min-h-[150px] text-lg font-medium"
      placeholder="Nhập chữ Hán tại đây... (Ví dụ: 我今天去商店买东西。)"
      rows="5"
    />

  </div>

</div>



{/* Questions based on passage */}

<div className="space-y-4 pt-4 border-t border-slate-100">

  <div className="flex justify-between items-center">

    <label className="block text-sm font-semibold text-slate-700">
      Câu hỏi & Đáp án
    </label>

    <div className="flex items-center gap-2">

      <span className="text-xs text-slate-500">
        Chế độ:
      </span>

      <select className="text-xs py-1 rounded border-slate-300">

        <option>Trắc nghiệm (MCQ)</option>
        <option>Đúng / Sai</option>

      </select>

    </div>

  </div>



  <div className="space-y-4">

    <input
      className="w-full text-sm font-bold border-b border-slate-200 focus:border-toxi-gold focus:ring-0 py-2"
      placeholder="Nhập câu hỏi tại đây (Ví dụ: 他今天去哪儿？)"
      type="text"
    />


    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Option A */}

      <div className="flex items-center gap-3">

        <input
          className="w-4 h-4 text-toxi-gold focus:ring-toxi-gold"
          name="reading_answer"
          type="radio"
        />

        <div className="flex-1 flex gap-2">

          <span className="bg-slate-100 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600 text-xs">
            A
          </span>

          <input
            className="flex-1 text-sm rounded-r-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
            placeholder="Đáp án A"
            type="text"
          />

        </div>

      </div>


      {/* Option B */}

      <div className="flex items-center gap-3">

        <input
          className="w-4 h-4 text-toxi-gold focus:ring-toxi-gold"
          name="reading_answer"
          type="radio"
        />

        <div className="flex-1 flex gap-2">

          <span className="bg-slate-100 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600 text-xs">
            B
          </span>

          <input
            className="flex-1 text-sm rounded-r-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
            placeholder="Đáp án B"
            type="text"
          />

        </div>

      </div>


      {/* Option C */}

      <div className="flex items-center gap-3">

        <input
          className="w-4 h-4 text-toxi-gold focus:ring-toxi-gold"
          name="reading_answer"
          type="radio"
        />

        <div className="flex-1 flex gap-2">

          <span className="bg-slate-100 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600 text-xs">
            C
          </span>

          <input
            className="flex-1 text-sm rounded-r-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
            placeholder="Đáp án C"
            type="text"
          />

        </div>

      </div>


      {/* Option D */}

      <div className="flex items-center gap-3">

        <input
          className="w-4 h-4 text-toxi-gold focus:ring-toxi-gold"
          name="reading_answer"
          type="radio"
        />

        <div className="flex-1 flex gap-2">

          <span className="bg-slate-100 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600 text-xs">
            D
          </span>

          <input
            className="flex-1 text-sm rounded-r-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
            placeholder="Đáp án D"
            type="text"
          />

        </div>

      </div>

    </div>

  </div>
{/* Add Sub Question Button */}

<button className="text-toxi-blue text-xs font-bold flex items-center gap-1 hover:underline">

  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >

    <path
      d="M12 4v16m8-8H4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />

  </svg>

  Thêm câu hỏi con (Cho bài đọc dài)

</button>


{/* Explanation / Feedback */}

<div className="space-y-2 pt-4 border-t border-slate-100">

  <label className="block text-sm font-semibold text-slate-700 italic">
    Giải thích & Phân tích ngữ pháp
  </label>

  <textarea
    className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
    placeholder="Phân tích từ mới hoặc cấu trúc ngữ pháp trong bài đọc..."
    rows="3"
  />

</div>
</div>
  </div>

</div>
       

      </section>
<aside className="space-y-6">

  {/* Metadata Card */}

  <section
    className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
    data-purpose="metadata"
  >

    <div className="bg-primary px-4 py-3 border-b border-toxi-gold">

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

          <button className="flex-1 py-1 text-xs border border-green-500 text-green-600 rounded font-bold">
            Dễ
          </button>

          <button className="flex-1 py-1 text-xs border border-orange-500 text-orange-600 rounded bg-orange-50 font-bold">
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
          className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
          type="number"
          step="0.5"
          defaultValue="3.0"
        />

      </div>


      {/* Tags */}

      <div>

        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
          Tags / Từ khóa
        </label>

        <input
          className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
          placeholder="Nhấn Enter để thêm tag"
          type="text"
        />

        <div className="flex flex-wrap gap-2 mt-2">

          <span className="bg-slate-100 text-[10px] font-bold px-2 py-1 rounded-full border border-slate-200 flex items-center gap-1">
            Mua sắm
            <button className="hover:text-red-500">×</button>
          </span>

          <span className="bg-slate-100 text-[10px] font-bold px-2 py-1 rounded-full border border-slate-200 flex items-center gap-1">
            Địa điểm
            <button className="hover:text-red-500">×</button>
          </span>

          <span className="bg-slate-100 text-[10px] font-bold px-2 py-1 rounded-full border border-slate-200 flex items-center gap-1">
            HSK3
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
      
                      
        </>
    )
}