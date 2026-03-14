import react from "react";
import {usestate} from "react";
import { Link } from "react-router-dom";
import toxiLogo from "../../../assets/image/LOGO (1).png";
export default function EditWritting(){
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
                <main className="max-w-4xl mx-auto p-6">
      <section className="space-y-6">

        {/* LevelAndTypeSelector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <label className="block text-xs font-bold text-toxi-blue uppercase mb-2">
              Cấp độ HSK
            </label>

            <select
              className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
              defaultValue="HSK 5"
            >
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

        {/* MainEditorContent */}
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

            {/* Essay type fields */}
            <div className="space-y-6" id="essay-type-fields">

              {/* Prompt */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Yêu cầu/Đề bài (Prompt)
                </label>

                <textarea
                  rows={3}
                  placeholder="Ví dụ: Sử dụng 5 từ sau để viết một đoạn văn khoảng 80 chữ: 愉快, 积累, 毕业, 诚恳, 愿望"
                  className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">

                <label className="block text-sm font-semibold text-slate-700">
                  Hình ảnh minh họa (Nếu có)
                </label>

                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-toxi-gold transition-colors cursor-pointer bg-slate-50 group">

                  <svg
                    className="mx-auto h-8 w-8 text-slate-400 group-hover:text-toxi-gold mb-2"
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

                </div>

              </div>

              {/* Student preview */}
              <div className="space-y-2">

                <label className="block text-sm font-semibold text-slate-700 italic">
                  Khu vực học sinh làm bài (Preview)
                </label>

                <div className="w-full bg-slate-50 border border-slate-200 rounded-md p-4 min-h-[200px] text-slate-400 font-serif">
                  Học sinh sẽ nhập đoạn văn tại đây...
                </div>

              </div>
 <div className="space-y-6 hidden" id="sort-type-fields">

      {/* Full sentence input */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          Câu hoàn chỉnh (Full Chinese Sentence)
        </label>

        <input
          type="text"
          placeholder="Ví dụ: 我 昨天 买 了 一 本 书 。"
          className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
        />

        <p className="text-[10px] text-slate-500 italic">
          * Sử dụng khoảng trắng để phân cách các từ sẽ được tách thành chip.
        </p>
      </div>

      {/* Preview draggable words */}
      <div className="space-y-3">

        <label className="block text-sm font-semibold text-slate-700">
          Xem trước các từ (Draggable Preview)
        </label>

        <div className="flex flex-wrap gap-2 p-4 bg-slate-50 border border-slate-200 rounded-lg min-h-[80px] items-center">

          {/* Word chip */}
          <div className="bg-white border border-slate-300 px-4 py-2 rounded shadow-sm cursor-move hover:border-toxi-gold flex items-center gap-2">
            <span className="text-toxi-blue font-medium">我</span>

            <svg className="h-3 w-3 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 7h2v2H7V7zm0 4h2v2H7v-2zm4-4h2v2h-2V7zm0 4h2v2h-2v-2z"></path>
            </svg>
          </div>

          <div className="bg-white border border-slate-300 px-4 py-2 rounded shadow-sm cursor-move hover:border-toxi-gold flex items-center gap-2">
            <span className="text-toxi-blue font-medium">昨天</span>

            <svg className="h-3 w-3 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 7h2v2H7V7zm0 4h2v2H7v-2zm4-4h2v2h-2V7zm0 4h2v2h-2v-2z"></path>
            </svg>
          </div>

          <div className="bg-white border border-slate-300 px-4 py-2 rounded shadow-sm cursor-move hover:border-toxi-gold flex items-center gap-2">
            <span className="text-toxi-blue font-medium">买</span>

            <svg className="h-3 w-3 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 7h2v2H7V7zm0 4h2v2H7v-2zm4-4h2v2h-2V7zm0 4h2v2h-2v-2z"></path>
            </svg>
          </div>

          <div className="bg-white border border-slate-300 px-4 py-2 rounded shadow-sm cursor-move hover:border-toxi-gold flex items-center gap-2">
            <span className="text-toxi-blue font-medium">了</span>

            <svg className="h-3 w-3 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 7h2v2H7V7zm0 4h2v2H7v-2zm4-4h2v2h-2V7zm0 4h2v2h-2v-2z"></path>
            </svg>
          </div>

          <div className="bg-white border border-slate-300 px-4 py-2 rounded shadow-sm cursor-move hover:border-toxi-gold flex items-center gap-2">
            <span className="text-toxi-blue font-medium">一本</span>

            <svg className="h-3 w-3 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 7h2v2H7V7zm0 4h2v2H7v-2zm4-4h2v2h-2V7zm0 4h2v2h-2v-2z"></path>
            </svg>
          </div>

          <div className="bg-white border border-slate-300 px-4 py-2 rounded shadow-sm cursor-move hover:border-toxi-gold flex items-center gap-2">
            <span className="text-toxi-blue font-medium">书</span>

            <svg className="h-3 w-3 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 7h2v2H7V7zm0 4h2v2H7v-2zm4-4h2v2h-2V7zm0 4h2v2h-2v-2z"></path>
            </svg>
          </div>

        </div>
      </div>

    </div>
      {/* Fields for 'Viết chữ Hán theo Pinyin' */}
      <div className="space-y-4 hidden" id="pinyin-type-fields">

        <div className="grid grid-cols-2 gap-4">

          {/* Pinyin */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Pinyin
            </label>

            <input
              type="text"
              placeholder="Ví dụ: píngguǒ"
              className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
            />
          </div>

          {/* Chinese target */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Chữ Hán mục tiêu (Target)
            </label>

            <input
              type="text"
              placeholder="Ví dụ: 苹果"
              className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold font-serif text-lg"
            />
          </div>

        </div>

        {/* Vietnamese hint */}
        <div className="space-y-2">

          <label className="block text-sm font-semibold text-slate-700">
            Gợi ý tiếng Việt (Hint)
          </label>

          <input
            type="text"
            placeholder="Ví dụ: Quả táo"
            className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
          />

        </div>

      </div>

      {/* Common Explanation Field */}
      <div className="space-y-2 pt-4 border-t border-slate-100">

        <label className="block text-sm font-semibold text-slate-700 italic">
          Đáp án tham khảo / Giải thích
        </label>

        <textarea
          rows={2}
          placeholder="Nhập đáp án mẫu hoặc lưu ý chấm điểm cho giáo viên..."
          className="w-full rounded-md border-slate-300 focus:ring-toxi-gold focus:border-toxi-gold"
        />

      </div>
            </div>

          </div>
        </div>

      </section>
    </main>

        </>
    )
}