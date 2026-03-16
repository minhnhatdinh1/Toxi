import react from "react";
import {usestate} from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
export default function AdminAddNewQuiz() {
    return (
        <>
  <div class="flex h-screen overflow-hidden">
            <AdminSidebar />
           {/* Main Content */}
<main className="flex-1 flex flex-col h-screen overflow-y-auto">

  {/* Header */}
  <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">

    <div className="flex items-center gap-4">

      <div className="flex items-center gap-2 text-slate-500 text-sm">

        <a className="hover:text-primary transition-colors" href="#">
          Exams
        </a>

        <span className="material-symbols-outlined text-xs">
          chevron_right
        </span>

        <span className="text-slate-900 dark:text-slate-100 font-semibold">
          Create New Exam
        </span>

      </div>

    </div>


    <div className="flex items-center gap-3">
{/* Publish Button */}
<Link
  to="/listenquiz"
  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg font-bold text-sm transition-all"
>
  <span className="material-symbols-outlined text-sm">
    save
  </span>

  Tạo câu hỏi mới
</Link>

    </div>

  </header>


  {/* Form Content */}
  <div className="p-8 mx-auto w-full">

    <div className="mb-8">

      <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
        Create New HSK Exam
      </h1>

      <p className="text-slate-500 dark:text-slate-400 mt-2">
        Configure exam content, scoring logic, and availability windows for candidates.
      </p>

    </div>


    <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">

        <section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">

          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">

            <span className="material-symbols-outlined text-primary">
              edit_note
            </span>

            <h2 className="text-lg font-bold">
              General Information
            </h2>

          </div>


          <div className="space-y-4">

            {/* Exam Title */}
            <div>

              <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                Exam Title
              </label>

              <input
                type="text"
                placeholder="e.g. HSK Level 4 Spring 2024 Final"
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* HSK Level */}
              <div>

                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  HSK Level
                </label>

                <select
                  defaultValue="4"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none"
                >

                  <option value="1">Level 1 (Entry)</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                  <option value="4">Level 4</option>
                  <option value="5">Level 5</option>
                  <option value="6">Level 6 (Advanced)</option>

                </select>

              </div>


              {/* Duration */}
              <div>

                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  Duration (Minutes)
                </label>

                <div className="relative">

                  <input
                    type="number"
                    defaultValue="120"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none"
                  />

                  <span className="absolute right-3 top-3 text-slate-400 text-sm">
                    min
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>
<section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">

  <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">

    <span className="material-symbols-outlined text-primary">
      rule
    </span>

    <h2 className="text-lg font-bold">
      Scoring & Retakes
    </h2>

  </div>


  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Passing Score */}
    <div>

      <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
        Passing Score (%)
      </label>

      <div className="flex items-center gap-4">

        <input
          type="range"
          min="0"
          max="100"
          defaultValue="60"
          className="flex-1 accent-primary h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />

        <span className="bg-primary/10 text-primary px-3 py-1 rounded font-bold">
          60%
        </span>

      </div>

    </div>


    {/* Max Attempts */}
    <div>

      <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
        Max Attempts
      </label>

      <select
        defaultValue="2"
        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none"
      >

        <option value="1">1 Attempt Only</option>
        <option value="2">2 Attempts</option>
        <option value="3">3 Attempts</option>
        <option value="unlimited">Unlimited</option>

      </select>

    </div>

  </div>

</section>
  {/* Chinese Accent Banner */}
  <div className="bg-hsk-blue text-white p-6 rounded-xl flex items-center justify-between relative overflow-hidden group">

    <div className="relative z-10">

      <h3 className="font-bold text-lg mb-1">
        Chinese Cultural Accent
      </h3>

      <p className="text-slate-400 text-sm max-w-xs">
        Enhance your exam papers with traditional calligraphy watermark backgrounds.
      </p>

      <button
        type="button"
        className="mt-4 text-hsk-gold font-bold text-sm flex items-center gap-2 hover:underline"
      >

        Configure Design

        <span className="material-symbols-outlined text-sm">
          arrow_forward
        </span>

      </button>

    </div>
</div>

    <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform duration-500">

      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz52iIXOpLgQxiTjkBBkITqRFfAMW0nz90HbYH_Y1-iWyEu0_Mg2PQnd26W8Iulmd5yCnUD6Tf5bmzSFA29nx5Wm4IkAkj-vl-rCEFL_bDTo7wiRxxZY781i3zZbB540Tre0zGAjK1_GT6MT2TKl3TWuFc34Ri-z6-4FSX-Vob2UxkH1mkCL54_FNBiPTlqFdFkVdjkMD6u2hInaLTxnbIdXwkv8UjxXX7SEcgcsykah74Cxjwy1_1zEj_4D8Qaxxq9IIJGkoJg3M"
        alt="Abstract Chinese Pattern"
        className="size-48 object-cover rounded-full"
      />

    </div>

  </div>


  {/* Right Column */}
  <div className="space-y-6">

    <section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">

      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">

        <span className="material-symbols-outlined text-primary">
          settings_suggest
        </span>

        <h2 className="text-lg font-bold">
          Exam Settings
        </h2>

      </div>


      <div className="space-y-6">

        {/* Date */}
        <div>

          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
            Drip Release Date
          </label>

          <div className="relative">

            <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">
              calendar_today
            </span>

            <input
              type="date"
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-primary/20 outline-none"
            />

          </div>

          <p className="text-xs text-slate-500 mt-2">
            When students will first be able to access the exam.
          </p>

        </div>


        {/* Visibility */}
        <div>

          <label className="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
            Visibility Status
          </label>

          <div className="space-y-3">

            {/* Public */}
            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:border-primary/50 transition-colors">

              <input
                type="radio"
                name="visibility"
                defaultChecked
                className="text-primary focus:ring-primary"
              />

              <div>

                <p className="text-sm font-bold">
                  Public
                </p>

                <p className="text-[10px] text-slate-500">
                  Visible to all registered students
                </p>

              </div>

            </label>


            {/* Draft */}
            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:border-primary/50 transition-colors">

              <input
                type="radio"
                name="visibility"
                className="text-primary focus:ring-primary"
              />

              <div>

                <p className="text-sm font-bold">
                  Draft
                </p>

                <p className="text-[10px] text-slate-500">
                  Only visible to administrators
                </p>

              </div>

            </label>


            {/* Private */}
            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:border-primary/50 transition-colors">

              <input
                type="radio"
                name="visibility"
                className="text-primary focus:ring-primary"
              />

              <div>

                <p className="text-sm font-bold">
                  Private / Invited
                </p>

                <p className="text-[10px] text-slate-500">
                  Access only via specific invitation links
                </p>

              </div>

            </label>

          </div>

        </div>

      </div>

    </section>
<section className="bg-primary/5 dark:bg-primary/10 border-2 border-dashed border-primary/20 p-6 rounded-xl">
  <div className="flex flex-col items-center text-center gap-3">

    <div className="size-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
      <span className="material-symbols-outlined">
        upload_file
      </span>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 dark:text-slate-200">
        Import Questions
      </h3>

      <p className="text-xs text-slate-500 mt-1">
        Bulk upload questions via CSV or Excel templates.
      </p>
    </div>

    <button
      type="button"
      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
    >
      Choose File
    </button>

  </div>
</section>
  </div>
</form>

  </div>

</main>
            </div>
        </>
    )
}
