import react from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toxiLogo from "../../../assets/image/LOGO (1).png";
export default function AddNewWritting() {
      const navigate = useNavigate();
      const [sentence, setSentence] = useState("");
        const [pinyin, setPinyin] = useState("");
  const [target, setTarget] = useState("");
  const [hint, setHint] = useState("");
   const [difficulty, setDifficulty] = useState("medium");
  const [score, setScore] = useState(5.0);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(["Kỹ năng viết", "HSK5"]);

  const [explanation, setExplanation] = useState("");
      const [writingType,setWritingType] = useState("essay");
     const [activeTab, setActiveTab] = useState("writing");
       const [hskLevel, setHskLevel] = useState("HSK1");
 // tách từ theo dấu cách
  const words = sentence.trim().split(" ").filter(Boolean);

  const handleTabChange = (tab) => {
  setActiveTab(tab);

  if (tab === "listening") navigate("/listenQuiz");
  if (tab === "reading") navigate("/readQuiz");
  if (tab === "writing") navigate("/writtingQuiz");
};
 const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
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
const [image, setImage] = useState(null);

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
            ${activeTab === "listening"
              ? "bg-primary text-white"
              : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            Nghe (Listening)
          </button>

          <button
            onClick={() => handleTabChange("reading")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 
            ${activeTab === "reading"
              ? "bg-primary text-white"
              : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            Đọc (Reading)
          </button>

          <button
            onClick={() => handleTabChange("writing")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 
            ${activeTab === "writing"
              ? "bg-primary text-white"
              : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            Viết (Writing)
          </button>

        </div>

        {/* Level + Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* HSK Level */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">

            <label className="block text-xs font-bold text-blue-600 uppercase mb-2">
              Cấp độ HSK
            </label>

            <select
              className="w-full rounded-md border-slate-300 focus:ring-blue-500 focus:border-blue-500"
              value={hskLevel}
              onChange={(e) => setHskLevel(e.target.value)}
            >
              <option value="HSK1">HSK 1</option>
              <option value="HSK2">HSK 2</option>
              <option value="HSK3">HSK 3</option>
              <option value="HSK4">HSK 4</option>
              <option value="HSK5">HSK 5</option>
              <option value="HSK6">HSK 6</option>
            </select>

          </div>
<div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">

  <label className="block text-xs font-bold text-toxi-blue uppercase mb-2">
    Dạng bài (Question Type)
  </label>

  <select
    id="writing-type-selector"
    className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
    defaultValue="essay"
  >
    <option value="sort">Sắp xếp từ thành câu</option>
    <option value="pinyin">Viết chữ Hán theo Pinyin</option>
    <option value="essay">Viết đoạn văn (HSK 5-6)</option>
  </select>

</div>
</div>

{/* Main Editor */}
<div
  className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
  data-purpose="editor-container"
>

  <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">

    <h3 className="font-bold text-toxi-blue" id="editor-title">
      Nội dung câu hỏi: Viết đoạn văn
    </h3>

    <span className="text-xs text-slate-400">
      Tự động lưu lúc 14:45
    </span>

  </div>


  <div className="p-6 space-y-6" id="writing-content-area">

    {/* Essay Fields */}
    <div className="space-y-6" id="essay-type-fields">

      {/* Prompt */}
      <div className="space-y-2">

        <label className="block text-sm font-semibold text-slate-700">
          Yêu cầu/Đề bài (Prompt)
        </label>

        <textarea
          className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
          placeholder="Ví dụ: Sử dụng 5 từ sau để viết một đoạn văn khoảng 80 chữ: 愉快, 积累, 毕业, 诚恳, 愿望"
          rows="3"
        />

      </div>


      {/* Upload Image */}
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


      {/* Student Answer Area */}
      <div className="space-y-2">

        <label className="block text-sm font-semibold text-slate-700 italic">
          Khu vực học sinh làm bài (Preview)
        </label>

        <div className="w-full bg-slate-50 border border-slate-200 rounded-md p-4 min-h-[200px] text-slate-400 font-serif">
          Học sinh sẽ nhập đoạn văn tại đây...
        </div>

      </div>
 <div className="space-y-6" id="sort-type-fields">

      {/* Input sentence */}
      <div className="space-y-2">

        <label className="block text-sm font-semibold text-slate-700">
          Câu hoàn chỉnh (Full Chinese Sentence)
        </label>

        <input
          type="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder="Ví dụ: 我 昨天 买 了 一 本 书 。"
          className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
        />

        <p className="text-[10px] text-slate-500 italic">
          * Sử dụng khoảng trắng để phân cách các từ sẽ được tách thành chip.
        </p>

      </div>


      {/* Preview words */}
      <div className="space-y-3">

        <label className="block text-sm font-semibold text-slate-700">
          Xem trước các từ (Draggable Preview)
        </label>

        <div className="flex flex-wrap gap-2 p-4 bg-slate-50 border border-slate-200 rounded-lg min-h-[80px] items-center">

          {words.map((word, index) => (
            <div
              key={index}
              className="bg-white border border-slate-300 px-4 py-2 rounded shadow-sm cursor-move hover:border-toxi-gold flex items-center gap-2"
            >

              <span className="text-toxi-blue font-medium">
                {word}
              </span>

              <svg
                className="h-3 w-3 text-slate-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M7 7h2v2H7V7zm0 4h2v2H7v-2zm4-4h2v2h-2V7zm0 4h2v2h-2v-2z" />
              </svg>

            </div>
          ))}

        </div>

      </div>

    </div>
     <div className="space-y-6" id="pinyin-type-fields">

      {/* Pinyin + Target */}
      <div className="grid grid-cols-2 gap-4">

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Pinyin
          </label>

          <input
            type="text"
            value={pinyin}
            onChange={(e) => setPinyin(e.target.value)}
            placeholder="Ví dụ: píngguǒ"
            className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
          />
        </div>


        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Chữ Hán mục tiêu (Target)
          </label>

          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Ví dụ: 苹果"
            className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold font-serif text-lg"
          />
        </div>

      </div>


      {/* Hint */}
      <div className="space-y-2">

        <label className="block text-sm font-semibold text-slate-700">
          Gợi ý tiếng Việt (Hint)
        </label>

        <input
          type="text"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          placeholder="Ví dụ: Quả táo"
          className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
        />

      </div>


      {/* Explanation */}
      <div className="space-y-2 pt-4 border-t border-slate-100">

        <label className="block text-sm font-semibold text-slate-700 italic">
          Đáp án tham khảo / Giải thích
        </label>

        <textarea
          rows="2"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="Nhập đáp án mẫu hoặc lưu ý chấm điểm cho giáo viên..."
          className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
        />

      </div>

    </div>
    </div>

  </div>

</div>


      </section>
 <aside className="space-y-6">

      {/* Metadata Card */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="bg-primary px-4 py-3 border-b border-toxi-gold">
          <h3 className="text-white font-bold text-sm tracking-widest uppercase">
            Thông tin bổ trợ
          </h3>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">

          {/* Difficulty */}
          <div>

            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Độ khó
            </label>

            <div className="flex gap-2">

              <button
                onClick={() => setDifficulty("easy")}
                className={`flex-1 py-1 text-xs border rounded font-bold 
                ${difficulty === "easy"
                  ? "border-green-600 bg-green-50 text-green-600"
                  : "border-green-500 text-green-600"
                }`}
              >
                Dễ
              </button>

              <button
                onClick={() => setDifficulty("medium")}
                className={`flex-1 py-1 text-xs border rounded font-bold 
                ${difficulty === "medium"
                  ? "border-orange-600 bg-orange-50 text-orange-600"
                  : "border-orange-500 text-orange-600"
                }`}
              >
                TB
              </button>

              <button
                onClick={() => setDifficulty("hard")}
                className={`flex-1 py-1 text-xs border rounded font-bold 
                ${difficulty === "hard"
                  ? "border-red-600 bg-red-50 text-red-600"
                  : "border-red-500 text-red-600"
                }`}
              >
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
              type="number"
              step="0.5"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
            />

          </div>


          {/* Tags */}
          <div>

            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Tags / Từ khóa
            </label>

            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Nhấn Enter để thêm tag"
              className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold text-sm"
            />

            <div className="flex flex-wrap gap-2 mt-2">

              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-slate-100 text-[10px] font-bold px-2 py-1 rounded-full border border-slate-200 flex items-center gap-1"
                >
                  {tag}

                  <button
                    onClick={() => removeTag(index)}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>

                </span>
              ))}

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

<Link to="/editwritting" className="p-1 hover:text-primary">
  <span className="material-symbols-outlined text-base">
    edit
  </span>
</Link>
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