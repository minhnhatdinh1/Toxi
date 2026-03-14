import react from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toxiLogo from "../../../assets/image/LOGO (1).png";
export default function EditRead(){
    const [image, setImage] = useState(null);
    const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImage(URL.createObjectURL(file));
  }
};
    return(
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
                 <main className="max-w-[1000px] mx-auto p-6 space-y-6">


      {/* LevelAndTypeSelector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <label className="block text-xs font-bold text-toxi-blue uppercase mb-2">
            Cấp độ HSK
          </label>

          <select className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold">
            <option>HSK 1</option>
            <option>HSK 2</option>
            <option selected>HSK 3</option>
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
            <option>Đọc và chọn ảnh đúng (Reading - Match Image)</option>
            <option selected>
              Đọc hiểu đoạn văn - Trắc nghiệm (Reading MCQs)
            </option>
            <option>Phán đoán Đúng / Sai (True / False)</option>
            <option>Sắp xếp câu (Sentence Reordering)</option>
          </select>
        </div>
      </div>

      {/* MainEditorContent */}
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
        data-purpose="editor-container"
      >
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
      <div className="space-y-2">

      {/* Reading Passage */}
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

      {/* Editor */}
      <div className="border border-slate-300 rounded-md overflow-hidden">

        <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">

          <button className="p-1 hover:bg-slate-200 rounded">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
          rows={5}
          defaultValue="我今天上午去商店买东西。商店里的东西很多，也很便宜。我买了一些苹果，还买了一个杯子。一共花了五十块钱。"
        />

      </div>

      {/* Translation */}
      <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
        <p className="text-xs text-blue-700 font-medium italic">
          Bản dịch: Sáng nay tôi đi cửa hàng mua đồ. Đồ trong cửa hàng rất nhiều
          và cũng rất rẻ. Tôi đã mua một ít táo và còn mua một cái ly. Tổng cộng
          hết 50 tệ.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-4 pt-4 border-t border-slate-100">

        <div className="flex justify-between items-center">
          <label className="block text-sm font-semibold text-slate-700">
            Câu hỏi & Đáp án
          </label>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Chế độ:</span>

            <select className="text-xs py-1 rounded border-slate-300" defaultValue="mcq">
              <option value="mcq">Trắc nghiệm (MCQ)</option>
              <option value="truefalse">Đúng / Sai</option>
            </select>

          </div>
        </div>

        {/* Question */}
        <div className="space-y-1">
          <input
            type="text"
            defaultValue="他今天上午去哪儿了？"
            className="w-full text-base font-bold border-b border-slate-200 focus:border-toxi-gold focus:ring-0 py-2"
          />

          <p className="text-xs text-slate-500 italic">
            Dịch: Sáng nay anh ấy đã đi đâu?
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* A */}
          <div className="flex items-center gap-3">
            <input type="radio" name="reading_answer" className="w-4 h-4 text-toxi-gold focus:ring-toxi-gold" />

            <div className="flex-1">
              <div className="flex gap-2">

                <span className="bg-slate-100 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600 text-xs flex items-center">
                  A
                </span>

                <input
                  type="text"
                  defaultValue="医院 (Bệnh viện)"
                  className="flex-1 text-sm rounded-r-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
                />

              </div>
            </div>
          </div>

          {/* B */}
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="reading_answer"
              defaultChecked
              className="w-4 h-4 text-toxi-gold focus:ring-toxi-gold"
            />

            <div className="flex-1">
              <div className="flex gap-2">

                <span className="bg-slate-100 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600 text-xs flex items-center">
                  B
                </span>

                <input
                  type="text"
                  defaultValue="商店 (Cửa hàng)"
                  className="flex-1 text-sm rounded-r-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
                />

              </div>
            </div>
          </div>

          {/* C */}
          <div className="flex items-center gap-3">
            <input type="radio" name="reading_answer" className="w-4 h-4 text-toxi-gold focus:ring-toxi-gold" />

            <div className="flex-1">
              <div className="flex gap-2">

                <span className="bg-slate-100 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600 text-xs flex items-center">
                  C
                </span>

                <input
                  type="text"
                  defaultValue="学校 (Trường học)"
                  className="flex-1 text-sm rounded-r-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
                />

              </div>
            </div>
          </div>

          {/* D */}
          <div className="flex items-center gap-3">
            <input type="radio" name="reading_answer" className="w-4 h-4 text-toxi-gold focus:ring-toxi-gold" />

            <div className="flex-1">
              <div className="flex gap-2">

                <span className="bg-slate-100 px-3 py-2 rounded-l-md border border-r-0 border-slate-300 font-bold text-slate-600 text-xs flex items-center">
                  D
                </span>

                <input
                  type="text"
                  defaultValue="饭馆 (Nhà hàng)"
                  className="flex-1 text-sm rounded-r-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
                />

              </div>
            </div>
          </div>

        </div>

        {/* Add sub question */}
        <button className="text-toxi-blue text-xs font-bold flex items-center gap-1 hover:underline">

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

          Thêm câu hỏi con (Cho bài đọc dài)

        </button>

      </div>
    </div>
        </div>
      </div>

    </main>
        </>
    )
};