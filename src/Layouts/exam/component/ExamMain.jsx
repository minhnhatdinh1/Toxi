import react, { useState, useEffect } from "react";
import logo from '../../../assets/image/LOGO (1).png'
import { Link, useNavigate } from "react-router-dom";
import toxiLogo from "../../../assets/image/LOGO (1).png";
export default function ExamMain() {
 const [questionsData] = useState([
  {
    id: 1,
    type: "text",
    question: "我想去书店买一本关于中国文化的书。",
    options: [
      "A. Bức tranh A (Thư viện)",
      "B. Bức tranh B (Hiệu sách)",
      "C. Bức tranh C (Công viên)",
      "D. Bức tranh D (Trường học)"
    ]
  },
  {
    id: 2,
    type: "image",
    question: "请选择正确的图片",
    image: "https://images2.thanhnien.vn/528068263637045248/2024/1/25/3b690baedbd9a609207c76684a3413d0-65a11b0a7e79d880-17061562931311973368410.jpg",
    options: [
      "A. 图片A",
      "B. 图片B",
      "C. 图片C",
      "D. 图片D"
    ]
  }
]);

const [currentQuestion, setCurrentQuestion] = useState(1);
const [answers, setAnswers] = useState({});

const question = questionsData.find(q => q.id === currentQuestion);

const handleAnswer = (option) => {
  setAnswers({
    ...answers,
    [currentQuestion]: option
  });
};

const nextQuestion = () => {
  if (currentQuestion < questionsData.length) {
    setCurrentQuestion(currentQuestion + 1);
  }
};

const prevQuestion = () => {
  if (currentQuestion > 1) {
    setCurrentQuestion(currentQuestion - 1);
  }
};
   return (
    <>
  <header className="bg-primary text-text-invert shadow-lg sticky top-0 z-50">

      <div className=" mx-auto px-4 py-3 flex justify-between items-center">

        {/* LEFT */}
        <div className="flex items-center space-x-4">

       <Link to="/home" className="flex items-center gap-4">

  {/* LOGO */}
  <div className="h-16 w-16 rounded-2xl flex items-center">
    <img
      src={toxiLogo}
      alt="TOXI Logo"
      className="object-contain"
    />
  </div>

  {/* BRAND */}
  <div>

    <h1 className="text-3xl font-black tracking-tighter text-white">
      TOXI
    </h1>

    <div className="flex items-center gap-2 mt-1">
      <div className="h-[1px] w-4 bg-secondary"></div>

      <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">
        Education
      </p>

      <div className="h-[1px] w-4 bg-secondary"></div>
    </div>

  </div>

</Link>

        </div>

        {/* RIGHT */}
        <div className="flex items-center space-x-6">

          <div className="text-right hidden md:block">

            <span className="block text-xs uppercase tracking-wider opacity-80">
              Trình độ / 级别
            </span>

            <span className="font-bold text-secondary">
              HSK 4 (Cấp 4)
            </span>

          </div>

          {/* EXIT BUTTON */}
          <button className="bg-accent-red hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center">

            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>

            Thoát / 退出

          </button>

        </div>

      </div>

    </header>
     <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">

      {/* Left Column */}
      <section
        className="lg:col-span-8 space-y-6"
        data-purpose="question-area"
      >

        {/* Audio Player */}
        <div className="bg-white p-4 rounded-xl border-l-8 border-primary shadow-sm flex items-center space-x-4">

          <div className="p-3 bg-blue-50 rounded-full">
            <svg
              className="w-6 h-6 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14l-7-7H3V9h2l7-7zM18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM16 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
            </svg>
          </div>

          <div className="flex-1">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Đang nghe: Câu hỏi 1-10 / 听力部分 1-10题
            </div>

            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-1/3"></div>
            </div>
          </div>

          <span className="text-sm font-mono font-bold text-primary">
            01:45 / 05:20
          </span>

        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-3xl">

          {/* Question Header */}
       <div className="bg-slate-50 border-b p-4 flex justify-between items-center">

  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
    Câu hỏi {currentQuestion} / 第{currentQuestion}题
  </span>

  <span className="text-primary text-sm font-medium">
    {question.question}
  </span>

</div>

{/* IMAGE */}
{question.image && (
  <div className="flex justify-center py-6 bg-white">
    <img
      src={question.image}
      alt="question"
      className="rounded-xl shadow-lg max-h-80 object-cover"
    />
  </div>
)}

          {/* Question Body */}
          <div className="p-8">

            {/* Question Text */}
            <div className="mb-8">

              <h2 className="text-xl font-semibold mb-3 text-slate-800">
                Nghe và chọn bức tranh tương ứng:
                <br />

                <span className="text-primary">
                  请听录音，选出与内容相符的图片。
                </span>
              </h2>

              <div className="p-6 bg-gold-light rounded-xl border border-secondary/30 italic text-lg text-slate-700">
                "我想去书店买一本关于中国文化的书。"
              </div>

            </div>

            {/* Answers */}
            <div className="space-y-4">

               {question.options.map((opt, index) => (

    <label
      key={index}
      className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all
      ${
        answers[currentQuestion] === opt
          ? "border-primary bg-blue-50"
          : "border-gray-100 hover:border-primary hover:bg-blue-50"
      }`}
    >

      <input
        type="radio"
        name={`question-${currentQuestion}`}
        checked={answers[currentQuestion] === opt}
        onChange={() => handleAnswer(opt)}
        className="w-5 h-5 text-primary focus:ring-primary"
      />

      <span className="ml-3 text-base">
        {opt}
      </span>

    </label>

  ))}
            </div>

          </div>

          {/* Navigation */}
          <div className="p-6 bg-slate-50 border-t flex justify-between">

            <button className="px-6 py-2 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all">
              Câu trước / 上一题
            </button>

            <button className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-all">
              Câu tiếp theo / 下一题
            </button>

          </div>

        </div>

      </section>
 <aside className="lg:col-span-4 space-y-6" data-purpose="exam-sidebar">

      {/* Timer */}
      <div className="bg-white p-6 rounded-2xl shadow-md text-center relative overflow-hidden">

        <div className="absolute top-0 right-0 p-2">
          <svg
            className="w-12 h-12 text-primary opacity-10"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
          </svg>
        </div>

        <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">
          Thời gian còn lại / 剩余时间
        </h3>

        <div className="text-5xl font-mono font-black text-primary tracking-tighter">
          45:12
        </div>

      </div>

      {/* Question Navigator */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <h3 className="font-bold border-b pb-3 mb-4 flex justify-between items-center">
          <span>Danh sách câu hỏi / 题目列表</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            40 câu
          </span>
        </h3>

        <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto pr-2">

         {questionsData.map((q) => {

  let style = "border-gray-200 hover:border-primary";

  if (answers[q.id]) {
    style = "bg-secondary text-white border-secondary";
  }

  if (q.id === currentQuestion) {
    style = "bg-primary text-white border-primary";
  }

  return (
    <button
      key={q.id}
      onClick={() => setCurrentQuestion(q.id)}
      className={`h-10 border-2 rounded-lg font-bold text-sm transition ${style}`}
    >
      {q.id}
    </button>
  );

})}

        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-gray-600 border-t pt-4">

          <div className="flex items-center">
            <span className="w-3 h-3 bg-primary rounded mr-1"></span>
            Đang chọn
          </div>

          <div className="flex items-center">
            <span className="w-3 h-3 bg-secondary rounded mr-1"></span>
            Đã làm
          </div>

          <div className="flex items-center">
            <span className="w-3 h-3 border border-gray-300 rounded mr-1"></span>
            Chưa làm
          </div>

        </div>

      </div>

      {/* Submit Button */}
      <button className="w-full bg-secondary text-primary font-black text-xl py-5 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-b-4 border-yellow-600 flex flex-col items-center group">

        <span>NỘP BÀI / 提交</span>

        <span className="text-xs font-normal opacity-70 group-hover:opacity-100">
          Hoàn thành bài thi của bạn
        </span>

      </button>

      {/* Decorative Cloud */}
      <div className="flex justify-center opacity-40">

        <svg
          className="w-24 h-12 text-primary"
          viewBox="0 0 100 50"
        >
          <path
            d="M10 40c0-10 10-15 20-15 5-10 20-15 30-5 10-5 25 0 25 15 5 5 5 15-5 15H20c-10 0-10-10-10-10z"
            fill="currentColor"
          />
        </svg>

      </div>

    </aside>
    </main>
        </>
    )
};