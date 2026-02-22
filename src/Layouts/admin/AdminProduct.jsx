import react from 'react';
import AdminSidebar from "./AdminSidebar";
export default function AdminProduct() {
    return (
        <>
    <div class="flex h-screen overflow-hidden">
             <AdminSidebar />
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