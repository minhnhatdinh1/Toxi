import react from "react";
import toxiLogo from "../../../assets/image/LOGO (1).png";
import {usestate} from "react";
export default function AddNewReadQuiz() {
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
        
            <button className="px-4 py-2 text-sm font-medium hover:text-secondary transition-colors">
              Hủy bỏ
            </button>
        
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-full shadow-md text-sm transition-all border border-white/20">
              Lưu và Thêm câu tiếp theo
            </button>
        
            <button className="bg-secondary text-primary font-bold px-6 py-2 rounded-full shadow-md flex items-center gap-2 text-sm">
        
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
        
              Lưu Câu Hỏi
        
            </button>
        
          </div>
        
        </header>
       <main className="flex-1 overflow-y-auto">

  <div className="max-w-[1440px] mx-auto p-6 space-y-6">

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      <section className="lg:col-span-3 space-y-6">

        <div className="bg-white rounded-xl shadow-sm p-2 flex items-center gap-2 border border-slate-200">

          <button
            onClick={() => handleTabChange("listening")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 
            ${activeTab === "listening" ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}
          >
            Nghe (Listening)
          </button>

          <button
            onClick={() => handleTabChange("reading")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 
            ${activeTab === "reading" ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}
          >
            Đọc (Reading)
          </button>

          <button
            onClick={() => handleTabChange("writing")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 
            ${activeTab === "writing" ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}
          >
            Viết (Writing)
          </button>

        </div>

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

        </div>

      </section>

    </div>

  </div>

</main>
      
                           </div>
        </>
    )
}