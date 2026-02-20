import react from 'react';
import toxiLogo from "../../assets/image/LOGO (1).png";
export default function AdminExample() {
    return (
        <>
         <div class="flex h-screen overflow-hidden">
                          <aside className="w-72 bg-primary dark:bg-slate-900 flex-shrink-0 flex flex-col relative chinese-cloud-bg shadow-2xl z-20">
                  
                  {/* Logo */}
                  <div className="px-3 py-2.5 flex flex-col items-center border-b border-white/10 relative">
                    <div className="h-16 w-16 rounded-2xl  text-primary flex items-center ">
                      <img src={toxiLogo} alt="TOXI Logo" className=" object-contain" />
                    </div>
                
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
                
                  {/* Navigation */}
                  <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    
                    <a
                      className="sidebar-active flex items-center gap-3 px-4 py-3 rounded-lg text-white transition-all"
                      href="/admin"
                    >
                      <span className="material-symbols-outlined">dashboard</span>
                      <span className="font-medium">Tổng quan</span>
                    </a>
                
                    <a
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
                      href="#"
                    >
                      <span className="material-symbols-outlined">group</span>
                      <span className="font-medium">Quản lý học viên</span>
                    </a>
                
                    <a
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
                      href="/adminCourse"
                    >
                      <span className="material-symbols-outlined">menu_book</span>
                      <span className="font-medium">Quản lý khóa học</span>
                    </a>
                
                    <a
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
                      href="/adminStore"
                    >
                      <span className="material-symbols-outlined">shopping_bag</span>
                      <span className="font-medium">Quản lý Store (Sách)</span>
                    </a>
                
                    <a
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
                      href="#"
                    >
                      <span className="material-symbols-outlined">quiz</span>
                      <span className="font-medium">Ngân hàng đề thi HSK</span>
                    </a>
                
                    <a
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
                      href="#"
                    >
                      <span className="material-symbols-outlined">article</span>
                      <span className="font-medium">Bài viết Blog</span>
                    </a>
                
                    <a
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
                      href="#"
                    >
                      <span className="material-symbols-outlined">payments</span>
                      <span className="font-medium">Báo cáo tài chính</span>
                    </a>
                
                    {/* System */}
                    <div className="pt-10">
                      <p className="px-4 text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
                        Hệ thống
                      </p>
                
                      <a
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
                        href="#"
                      >
                        <span className="material-symbols-outlined">settings</span>
                        <span className="font-medium">Cài đặt</span>
                      </a>
                    </div>
                  </nav>
                
                  {/* Admin Profile */}
                  <div className="p-4 mt-auto">
                    <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-3">
                
                        <div className="size-10 rounded-full border-2 border-accent-yellow overflow-hidden bg-slate-200">
                          <img
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZvYHM0SKvQCObpBDREu25_Bwy4qTgGLQUSa0jqEOXBroKnKObgFjEzPxG8in7x9UUw9W2f7HK2Liccz8_Vit6UssF-JWAXk3bGyPyImyniFp5g0BSONX6CFXhfipp7Aqa79hs2xuHMDMQSWNU9L99c76KH3ZzfuOD2EhW3Nn1fbXSFj5vLwOjrcMj3YVZAUwJE4VFnarDoy4oeLhHaYtSLX9oglXtiaVhaSmp2vwo5vRJGicXHDYP-cDjj38oMPTyzxShK7DoF1I"
                            alt="Avatar của người quản trị admin"
                          />
                        </div>
                
                        <div className="overflow-hidden">
                          <p className="text-white text-sm font-semibold truncate">
                            Quản trị viên
                          </p>
                          <p className="text-white/50 text-[10px] truncate">
                            admin@toxi.edu.vn
                          </p>
                        </div>
                
                      </div>
                    </div>
                  </div>
                
                </aside>
                 <main className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-border-light bg-white flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-6 flex-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              auto_stories
            </span>
            <h2 className="text-lg font-bold text-primary tracking-tight">
              Exam Bank Management
            </h2>
          </div>

          {/* Search */}
          <div className="relative max-w-md w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Search exams, levels, or categories..."
              className="w-full bg-slate-50 border border-border-light text-slate-900 text-sm rounded-xl pl-10 pr-4 h-10 focus:ring-accent-yellow focus:border-accent-yellow transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Add Exam Button */}
          <button className="size-8 flex items-center justify-center rounded-lg bg-accent-yellow text-primary text-xs font-bold shadow-lg shadow-yellow-500/20">
            <span className="material-symbols-outlined text-xl">add</span>
          </button>

          <div className="h-8 w-[1px] bg-border-dark mx-2"></div>

          {/* Notification */}
          <button className="relative bg-white rounded-xl border border-border-light shadow-sm p-2">
            <span className="material-symbols-outlined">
              notifications
            </span>
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-surface-dark"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-2">
            <div className="size-9 rounded-full bg-slate-700 border border-border-dark overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Admin user profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXqVJK5CjsOMGIrsYRf-395FUund2hcLFu6B7XjcFmpkN5CwuPBbaJRThsfOuy7IQgzMWaIzy8HTVqn-QwnRkD1syM0Y8lN0kB32bpPR0D0JurY7ifZTAW4yTUkF59YyMc0uxAKrWnqA48WZacmhsAJfvZBCHCKFaLEfawcAqumnjtDQLuM5E5WYuouN7WLBAM-OsO2x1W9VAcdzVfCnyPVOJIH5ymAD1qvB1KhZvRCOohVAtmEsp7-LqweYwxtuYCY3_fpAYjvT0"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl border border-border-light flex items-center gap-4 shadow-sm">
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">
                assignment
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">
                Total Exams
              </p>
              <h3 className="text-2xl font-bold !text-primary mt-1">
                128
              </h3>
              <p className="text-emerald-500 text-xs font-bold mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">
                  trending_up
                </span>
                +5% from last month
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl border border-border-light flex items-center gap-4 shadow-sm">
            <div className="size-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-500 text-3xl">
                check_circle
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">
                Active Exams
              </p>
              <h3 className="text-2xl font-bold !text-primary mt-1">
                94
              </h3>
              <p className="text-slate-500 text-xs font-medium mt-1">
                73% of total bank
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl border border-border-light flex items-center gap-4 shadow-sm">
            <div className="size-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-500 text-3xl">
                pending_actions
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">
                New Submissions
              </p>
              <h3 className="text-2xl font-bold !text-primary mt-1">
                12
              </h3>
              <p className="text-amber-500 text-xs font-bold mt-1">
                Awaiting review
              </p>
            </div>
          </div>
        </div>
        {/* Main Table Section */}
<div className="bg-white rounded-xl border border-border-light shadow-sm overflow-hidden">
  {/* Table Header */}
  <div className="px-6 py-4 border-b border-border-dark flex items-center justify-between bg-white/5">
    <h3 className="text-primary font-bold flex items-center gap-2">
      <span className="material-symbols-outlined text-accent-yellow">
        list
      </span>
      Exam List
    </h3>

    <div className="flex items-center gap-2">
      <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg border border-slate-700 transition-colors">
        <span className="material-symbols-outlined text-base text-primary">
          filter_list
        </span>
        Filter
      </button>

      <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg border border-slate-700 transition-colors">
        <span className="material-symbols-outlined text-base text-primary">
          download
        </span>
        Export
      </button>
    </div>
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="text-slate-400 text-xs uppercase tracking-wider font-bold">
          <th className="px-6 py-4">Exam Name</th>
          <th className="px-6 py-4">Category</th>
          <th className="px-6 py-4">Duration</th>
          <th className="px-6 py-4">Questions</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-border-light text-slate-600 text-sm">
        {/* Row 1 */}
        <tr className="hover:bg-white/5 transition-colors group">
          <td className="px-6 py-4 font-semibold text-slate-100">
            HSK 4 Standard Mock A
          </td>

          <td className="px-6 py-4">
            <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[11px] font-bold border border-primary/30">
              HSK 4
            </span>
          </td>

          <td className="px-6 py-4">105 min</td>
          <td className="px-6 py-4">100</td>

          <td className="px-6 py-4">
            <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
              <span className="size-2 rounded-full bg-emerald-500"></span>
              Active
            </span>
          </td>

          <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end gap-2">
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg">
                  edit
                </span>
              </button>

              <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg">
                  delete
                </span>
              </button>
            </div>
          </td>
        </tr>

        {/* Row 2 */}
        <tr className="hover:bg-white/5 transition-colors group">
          <td className="px-6 py-4 font-semibold text-slate-100">
            Business Chinese Level 1
          </td>

          <td className="px-6 py-4">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-bold border border-blue-500/30">
              BCT A
            </span>
          </td>

          <td className="px-6 py-4">45 min</td>
          <td className="px-6 py-4">40</td>

          <td className="px-6 py-4">
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <span className="size-2 rounded-full bg-slate-500"></span>
              Draft
            </span>
          </td>

          <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end gap-2">
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg">
                  edit
                </span>
              </button>

              <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg">
                  delete
                </span>
              </button>
            </div>
          </td>
        </tr>
        {/* Row 3 */}
<tr className="hover:bg-white/5 transition-colors group">
  <td className="px-6 py-4 font-semibold text-slate-100">
    HSK 6 Advanced Proficiency
  </td>
  <td className="px-6 py-4">
    <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[11px] font-bold border border-primary/30">
      HSK 6
    </span>
  </td>
  <td className="px-6 py-4">140 min</td>
  <td className="px-6 py-4">101</td>
  <td className="px-6 py-4">
    <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
      <span className="size-2 rounded-full bg-emerald-500"></span>
      Active
    </span>
  </td>
  <td className="px-6 py-4 text-right">
    <div className="flex items-center justify-end gap-2">
      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
        <span className="material-symbols-outlined text-lg">edit</span>
      </button>
      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
        <span className="material-symbols-outlined text-lg">delete</span>
      </button>
    </div>
  </td>
</tr>

{/* Row 4 */}
<tr className="hover:bg-white/5 transition-colors group">
  <td className="px-6 py-4 font-semibold text-slate-100">
    HSK 1 Beginner Basics
  </td>
  <td className="px-6 py-4">
    <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[11px] font-bold border border-primary/30">
      HSK 1
    </span>
  </td>
  <td className="px-6 py-4">35 min</td>
  <td className="px-6 py-4">40</td>
  <td className="px-6 py-4">
    <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
      <span className="size-2 rounded-full bg-emerald-500"></span>
      Active
    </span>
  </td>
  <td className="px-6 py-4 text-right">
    <div className="flex items-center justify-end gap-2">
      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
        <span className="material-symbols-outlined text-lg">edit</span>
      </button>
      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
        <span className="material-symbols-outlined text-lg">delete</span>
      </button>
    </div>
  </td>
</tr>

{/* Row 5 */}
<tr className="hover:bg-white/5 transition-colors group">
  <td className="px-6 py-4 font-semibold text-slate-100">
    HSK 3 Intermediate Prep
  </td>
  <td className="px-6 py-4">
    <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[11px] font-bold border border-primary/30">
      HSK 3
    </span>
  </td>
  <td className="px-6 py-4">90 min</td>
  <td className="px-6 py-4">80</td>
  <td className="px-6 py-4">
    <span className="flex items-center gap-1.5 text-slate-500 font-medium">
      <span className="size-2 rounded-full bg-slate-500"></span>
      Draft
    </span>
  </td>
  <td className="px-6 py-4 text-right">
    <div className="flex items-center justify-end gap-2">
      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
        <span className="material-symbols-outlined text-lg">edit</span>
      </button>
      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
        <span className="material-symbols-outlined text-lg">delete</span>
      </button>
    </div>
  </td>
</tr>
      </tbody>
    </table>
  </div>
  {/* Pagination */}
<div className="px-6 py-4 bg-white/5 border-t border-border-dark flex items-center justify-between">
  <p className="text-xs text-slate-500 font-medium">
    Showing <span className="text-slate-300">1 to 5</span> of{" "}
    <span className="text-slate-300">128</span> exams
  </p>

  <div className="flex items-center gap-1">
    <button className="size-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white transition-colors">
      <span className="material-symbols-outlined">chevron_left</span>
    </button>

    <button className="size-8 flex items-center justify-center rounded-lg bg-accent-yellow text-primary text-xs font-bold shadow-lg shadow-yellow-500/20">
      1
    </button>

    <button className="size-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white text-xs font-bold transition-all">
      2
    </button>

    <button className="size-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white text-xs font-bold transition-all">
      3
    </button>

    <span className="text-slate-600 px-1 font-bold">...</span>

    <button className="size-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white text-xs font-bold transition-all">
      26
    </button>

    <button className="size-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white transition-colors">
      <span className="material-symbols-outlined">chevron_right</span>
    </button>
  </div>
</div>
</div>
      </div>
    </main>
                </div>
        </>
    )
};