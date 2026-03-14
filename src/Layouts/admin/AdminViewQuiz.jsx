import react from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
export default function AdminViewQuiz() {
  const [preview, setPreview] = useState(null);
  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setPreview(URL.createObjectURL(file));
  }
};
    return (
      <>
          <div className="flex h-screen overflow-hidden ">
                     <AdminSidebar />
                     <main className="flex-1 flex flex-col min-w-0">

  {/* Header */}
  <header className="bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 px-8 py-4 sticky top-0 z-10 flex items-center justify-between">

    <div className="flex items-center gap-4">

      <a className="text-slate-500 hover:text-primary transition-colors" href="/adminquiz">
        <span className="material-symbols-outlined">
          arrow_back
        </span>
      </a>

      <div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-0.5">
          <span>Quizzes</span>

          <span className="material-symbols-outlined text-[10px]">
            chevron_right
          </span>

          <span>HSK 3 Mastery</span>
        </div>

        <input
          type="text"
          defaultValue="HSK 3 Vocabulary Unit 4"
          placeholder="Quiz Title"
          className="text-xl font-bold text-slate-900 dark:text-slate-100 bg-transparent border-none p-0 focus:ring-0 focus:border-b focus:border-primary w-full max-w-lg"
        />

      </div>

    </div>


    <div className="flex items-center gap-3">

      <Link
  to="/adminquiz"
  className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
>
  Preview Quiz
</Link>

      <button className="px-6 py-2 text-sm font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
        Update Quiz
      </button>

    </div>

  </header>


  {/* Scrollable Content */}
<div className="p-6 overflow-y-auto max-w-6xl mx-auto w-full">

  {/* Quick Settings */}
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

    {/* Timer Setting */}
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm min-h-[120px]">

      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-md text-blue-600">
          <span className="material-symbols-outlined text-[20px]">
            timer
          </span>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />

          <div className="w-10 h-5 bg-slate-200 rounded-full peer dark:bg-slate-700
          peer-checked:after:translate-x-full after:content-[''] after:absolute
          after:top-[2px] after:left-[2px] after:bg-white after:rounded-full
          after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>

      <h3 className="text-sm font-semibold mb-1">Time Limit</h3>

      <div className="flex items-center gap-2">
        <input
          type="number"
          defaultValue="45"
          className="w-16 px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm"
        />

        <span className="text-sm text-slate-500">minutes</span>
      </div>

    </div>


    {/* Randomize Questions */}
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm min-h-[120px]">

      <div className="flex items-center justify-between mb-3">

        <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-md text-purple-600">
          <span className="material-symbols-outlined text-[20px]">
            shuffle
          </span>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />

          <div className="w-10 h-5 bg-slate-200 rounded-full peer dark:bg-slate-700
          peer-checked:after:translate-x-full after:content-[''] after:absolute
          after:top-[2px] after:left-[2px] after:bg-white after:rounded-full
          after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
        </label>

      </div>

      <h3 className="text-sm font-semibold mb-1">
        Randomize Questions
      </h3>

      <p className="text-xs text-slate-500">
        Shuffle questions for each student
      </p>

    </div>


    {/* Passing Score */}
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm min-h-[120px]">

      <div className="mb-3">
        <div className="p-2 bg-amber-50 rounded-md text-amber-500 w-fit">
          <span className="material-symbols-outlined text-[20px]">
            grade
          </span>
        </div>
      </div>

      <h3 className="text-sm font-semibold mb-1">
        Passing Score
      </h3>

      <div className="flex items-center gap-2">

        <input
          type="number"
          defaultValue="75"
          className="w-16 px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm"
        />

        <span className="text-sm text-slate-500">
          % Required
        </span>

      </div>

    </div>


    {/* Quiz Thumbnail */}
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm min-h-[120px]">

      <div className="mb-3">
        <div className="p-2 bg-pink-50 rounded-md text-pink-500 w-fit">
          <span className="material-symbols-outlined text-[20px]">
            image
          </span>
        </div>
      </div>

      <h3 className="text-sm font-semibold mb-3">
        Quiz Thumbnail
      </h3>

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-24 h-16 object-cover rounded mb-2"
        />
      )}

      <label className="flex flex-col items-center justify-center w-full h-16 border border-dashed border-slate-300 rounded-md cursor-pointer hover:bg-slate-50 transition">

        <span className="material-symbols-outlined text-slate-400 text-lg">
          upload
        </span>

        <p className="text-xs text-slate-500">
          Upload
        </p>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

      </label>

    </div>

  </div>
{/* Questions List */}
<div className="flex items-center justify-between mb-6">

  <div>
    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
      Questions Bank
    </h3>

    <p className="text-sm text-slate-500">
      Manage 12 questions in this quiz.
    </p>
  </div>

  <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors text-sm font-semibold">

    <span className="material-symbols-outlined text-sm">
      add_circle
    </span>

    Add Question

  </button>

</div>


<div className="space-y-4">

  {/* Question Card */}
  <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:border-primary/50 transition-all">

    <div className="flex gap-4">

      {/* Drag */}
      <div className="flex flex-col items-center gap-2 py-2 cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600">

        <span className="material-symbols-outlined">
          drag_indicator
        </span>

        <span className="text-xs font-bold">
          1
        </span>

      </div>


      <div className="flex-1">

        {/* Header */}
        <div className="flex justify-between items-start mb-3">

          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider rounded">
            Multiple Choice
          </span>

          <div className="flex items-center gap-1 transition-opacity">

            <button
              className="p-1.5 text-secondary hover:text-accent transition-all"
              title="Sửa"
            >
              <span className="material-symbols-outlined text-sm font-bold">
                edit
              </span>
            </button>

            <button
              className="p-1.5 text-secondary hover:text-red-500 transition-all"
              title="Xóa"
            >
              <span className="material-symbols-outlined text-sm font-bold">
                delete
              </span>
            </button>

          </div>

        </div>


        {/* Question */}
        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
          What is the correct Pinyin for "虽然" (suīrán)?
        </h4>


        {/* Answers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* Answer A */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">

            <span className="size-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
              A
            </span>

            <span className="text-sm text-slate-700 dark:text-slate-300">
              suī rán
            </span>

            <span className="material-symbols-outlined text-green-500 text-sm ml-auto">
              check_circle
            </span>

          </div>


          {/* Answer B */}
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">

            <span className="size-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 text-[10px] flex items-center justify-center font-bold">
              B
            </span>

            <span className="text-sm text-slate-600 dark:text-slate-400">
              suì ràn
            </span>

          </div>


          {/* Answer C */}
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">

            <span className="size-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 text-[10px] flex items-center justify-center font-bold">
              C
            </span>

            <span className="text-sm text-slate-600 dark:text-slate-400">
              shuī rán
            </span>

          </div>


          {/* Answer D */}
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">

            <span className="size-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 text-[10px] flex items-center justify-center font-bold">
              D
            </span>

            <span className="text-sm text-slate-600 dark:text-slate-400">
              suī lán
            </span>

          </div>

        </div>

      </div>

    </div>

  </div>
  {/* Question Card 2 */}
<div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:border-primary/50 transition-all">

  <div className="flex gap-4">

    <div className="flex flex-col items-center gap-2 py-2 cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600">
      <span className="material-symbols-outlined">drag_indicator</span>
      <span className="text-xs font-bold">2</span>
    </div>

    <div className="flex-1">

      <div className="flex justify-between items-start mb-3">

        <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider rounded">
          True/False
        </span>

        <div className="flex items-center gap-1 transition-opacity">

        <Link
  to="/editlisten"
  className="p-1.5 text-secondary hover:text-accent transition-all"
  title="Sửa"
>
  <span className="material-symbols-outlined text-sm font-bold">
    edit
  </span>
</Link>

          <button
            className="p-1.5 text-secondary hover:text-red-500 transition-all"
            title="Xóa"
          >
            <span className="material-symbols-outlined text-sm font-bold">
              delete
            </span>
          </button>

        </div>

      </div>

      <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
        The character "碗" (wǎn) is a measure word for containers like bowls.
      </h4>

      <div className="flex gap-4">

        <div className="flex-1 flex items-center justify-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-primary/30">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase">
            True
          </span>

          <span className="material-symbols-outlined text-primary text-sm">
            verified
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
          <span className="text-sm font-bold text-slate-400 dark:text-slate-600 uppercase">
            False
          </span>
        </div>

      </div>

    </div>
  </div>
</div>


{/* Question Card 3 */}
<div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:border-primary/50 transition-all">

  <div className="flex gap-4">

    <div className="flex flex-col items-center gap-2 py-2 cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600">
      <span className="material-symbols-outlined">drag_indicator</span>
      <span className="text-xs font-bold">3</span>
    </div>

    <div className="flex-1">

      <div className="flex justify-between items-start mb-3">

        <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider rounded">
          Fill in the blank
        </span>

        <div className="flex items-center gap-1 transition-opacity">
      
          <Link to="/editread"
            className="p-1.5 text-secondary hover:text-accent transition-all"
            title="Sửa"
          >
            <span className="material-symbols-outlined text-sm font-bold">
              edit
            </span>
          </Link>

          <button
            className="p-1.5 text-secondary hover:text-red-500 transition-all"
            title="Xóa"
          >
            <span className="material-symbols-outlined text-sm font-bold">
              delete
            </span>
          </button>

        </div>

      </div>

      <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Complete the sentence: 我____去过北京。(I have never been to Beijing.)
      </h4>

      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">

        <div className="flex items-center gap-2">

          <span className="text-xs font-bold text-slate-400 uppercase">
            Answer Key:
          </span>

          <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md text-sm font-bold text-primary">
            从来没有
          </span>

          <span className="text-xs text-slate-400">
            or
          </span>

          <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md text-sm font-bold text-primary">
            没
          </span>

        </div>

      </div>

    </div>
  </div>

</div>


{/* Bottom Action */}
<div className="flex justify-center py-6">

  <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-all">

    <span className="material-symbols-outlined text-3xl">
      add_circle
    </span>

    <span className="text-xs font-bold uppercase tracking-widest">
      New Question
    </span>

  </button>

</div>

</div>
{/* Footer Summary Card */}
<div className="mt-12 p-8 bg-secondary dark:bg-slate-950 rounded-2xl overflow-hidden relative">

  <div className="absolute top-0 right-0 p-8 opacity-10">
    <span className="material-symbols-outlined text-[120px] text-white">
      auto_awesome
    </span>
  </div>

  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">

    <div>
      <h4 className="text-xl font-bold text-white mb-2">
        Ready to Publish?
      </h4>

      <p className="text-slate-300 max-w-md">
        Your changes will be immediately available to all enrolled students.
        Ensure all questions and answer keys are correct.
      </p>
    </div>


    <div className="flex items-center gap-4">

      <div className="text-right">
        <p className="text-accent text-xs font-bold uppercase tracking-widest">
          Est. Duration
        </p>

        <p className="text-white text-xl font-bold">
          ~ 15 mins
        </p>
      </div>

      <div className="w-[1px] h-12 bg-white/10 hidden md:block"></div>

      <button className="px-8 py-4 bg-primary text-white font-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30">
        SAVE CHANGES
      </button>

    </div>

  </div>

</div>
  </div>

</main>
                     </div>
        </>
    )
}