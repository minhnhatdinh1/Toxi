import react from 'react';
import toxiLogo from "../../assets/image/LOGO (1).png";
export default function AdminProduct() {
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
              href="/adminExample"
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
         <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <header className="h-20 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-8 shrink-0">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black text-primary dark:text-accent tracking-tight uppercase">
            Course Management
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your active and draft curriculum
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-white/5 border-none rounded-lg focus:ring-2 focus:ring-primary w-64 text-sm transition-all"
              placeholder="Search courses..."
              type="text"
            />
          </div>

          {/* Add Button */}
          <button className="bg-accent hover:bg-yellow-400 text-primary px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-accent/20 transition-all active:scale-95">
            <span className="material-symbols-outlined font-bold">add</span>
            Add New Course
          </button>
        </div>
      </header>

      {/* Table Section */}
      <div className="flex-1 overflow-auto p-8">
        {/* Tabs */}
        <div className="flex gap-8 mb-6 border-b border-gray-200 dark:border-white/10">
          <button className="pb-4 text-primary dark:text-accent font-bold border-b-2 border-primary dark:border-accent flex items-center gap-2">
            All Courses
            <span className="bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent px-2 py-0.5 rounded text-xs">
              24
            </span>
          </button>

          <button className="pb-4 text-gray-400 font-medium hover:text-primary dark:hover:text-accent transition-colors">
            Active
          </button>

          <button className="pb-4 text-gray-400 font-medium hover:text-primary dark:hover:text-accent transition-colors">
            Draft
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Students Enrolled
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {/* Course Row */}
              <tr className="hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">
                        translate
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      HSK 4 Intensive Prep
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    HSK
                  </span>
                </td>

                <td className="px-6 py-5 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-400 text-sm">
                      person
                    </span>
                    1,240
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    <span className="size-1.5 rounded-full bg-green-500"></span>
                    Active
                  </span>
                </td>

                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-xl">
                        edit
                      </span>
                    </button>

                    <button
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Course Row 2 */}
<tr className="hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
  <td className="px-6 py-5">
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary">
          business_center
        </span>
      </div>
      <span className="font-semibold text-gray-900 dark:text-white">
        Business Chinese Basics
      </span>
    </div>
  </td>

  <td className="px-6 py-5">
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
      Business
    </span>
  </td>

  <td className="px-6 py-5 text-gray-600 dark:text-gray-300">
    <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-gray-400 text-sm">
        person
      </span>
      850
    </div>
  </td>

  <td className="px-6 py-5">
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
      <span className="size-1.5 rounded-full bg-green-500"></span>
      Active
    </span>
  </td>

  <td className="px-6 py-5 text-right">
    <div className="flex justify-end gap-2">
      <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
        <span className="material-symbols-outlined text-xl">edit</span>
      </button>
      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
        <span className="material-symbols-outlined text-xl">delete</span>
      </button>
    </div>
  </td>
</tr>

{/* Course Row 3 */}
<tr className="hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
  <td className="px-6 py-5">
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary">forum</span>
      </div>
      <span className="font-semibold text-gray-900 dark:text-white">
        Daily Communication
      </span>
    </div>
  </td>

  <td className="px-6 py-5">
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">
      Communication
    </span>
  </td>

  <td className="px-6 py-5 text-gray-600 dark:text-gray-300">
    <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-gray-400 text-sm">
        person
      </span>
      2,100
    </div>
  </td>

  <td className="px-6 py-5">
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
      <span className="size-1.5 rounded-full bg-green-500"></span>
      Active
    </span>
  </td>

  <td className="px-6 py-5 text-right">
    <div className="flex justify-end gap-2">
      <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
        <span className="material-symbols-outlined text-xl">edit</span>
      </button>
      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
        <span className="material-symbols-outlined text-xl">delete</span>
      </button>
    </div>
  </td>
</tr>

{/* Course Row 4 */}
<tr className="hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
  <td className="px-6 py-5">
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary">
          menu_book
        </span>
      </div>
      <span className="font-semibold text-gray-900 dark:text-white">
        HSK 1 Beginner
      </span>
    </div>
  </td>

  <td className="px-6 py-5">
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
      HSK
    </span>
  </td>

  <td className="px-6 py-5 text-gray-600 dark:text-gray-300">
    <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-gray-400 text-sm">
        person
      </span>
      420
    </div>
  </td>

  <td className="px-6 py-5">
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400">
      <span className="size-1.5 rounded-full bg-gray-400"></span>
      Draft
    </span>
  </td>

  <td className="px-6 py-5 text-right">
    <div className="flex justify-end gap-2">
      <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
        <span className="material-symbols-outlined text-xl">edit</span>
      </button>
      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
        <span className="material-symbols-outlined text-xl">delete</span>
      </button>
    </div>
  </td>
</tr>
            </tbody>
          </table>
        </div>
        {/* Pagination */}
<div className="mt-6 flex items-center justify-between">
  <p className="text-sm text-gray-500">
    Showing{" "}
    <span className="font-bold text-primary dark:text-accent">
      1-4
    </span>{" "}
    of{" "}
    <span className="font-bold text-primary dark:text-accent">
      24
    </span>{" "}
    courses
  </p>

  <div className="flex gap-2">
    <button
      className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
      disabled
    >
      Previous
    </button>

    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20">
      1
    </button>

    <button className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
      2
    </button>

    <button className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
      3
    </button>

    <button className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
      Next
    </button>
  </div>
</div>
      </div>
    </main>
        </div>
        </>
    )
};