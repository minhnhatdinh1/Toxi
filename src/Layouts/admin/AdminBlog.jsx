import React from "react";
import AdminSidebar from "./AdminSidebar";
export default function AdminBlog() {
    return (
        <>
            <div className="flex h-screen overflow-hidden ">
            <AdminSidebar />
                                {/* Main Content */}
<main className="flex-1 flex flex-col overflow-hidden relative">

  {/* Header */}
  <div className="h-16 flex items-center justify-between px-8 border-b border-slate-100 bg-white/80 backdrop-blur-sm z-10">

    {/* Left */}
    <div className="flex items-center gap-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <span className="text-slate-900 material-symbols-outlined">
          filter_vintage
        </span>
        Blog Management
      </h2>
    </div>

    {/* Right */}
    <div className="flex items-center gap-4">

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">
          search
        </span>
        <input
          type="text"
          placeholder="Search posts..."
          className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-slate-900 w-64"
        />
      </div>

      {/* Notification */}
      <button className="p-2 rounded-lg bg-slate-100 text-slate-600 relative">
        <span className="material-symbols-outlined">
          notifications
        </span>
        <span className="absolute top-2 right-2 size-2 bg-blue-500 rounded-full"></span>
      </button>

      {/* Avatar */}
      <div className="size-10 rounded-full border-2 border-slate-200 overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC774ihvnJj_MK3G_gmKKm-i0PU4UDCS4XKg49ZvvkpA204dXlqCw0ZvGnKH0mT804v8YPYTCHTpCwfs_y9JLAlZoqOnEbtHmq-DJPgkPQlEJM6vkrb6ZyYR11SLCZcVYByRfU8oYBccbgvNoNz8snw0YElaNmOVOp3gKu0ltQLBjgPqecoVCjPL8hruHWtBz7P97p0INha2a7mH6RKUgfYo1_MtGh4m-HrixzJCubL_ZrV4TLbqvKKWuA0TcbFY21CX1NqRTIDT7Y"
          alt="Admin Avatar"
          className="w-full h-full object-cover"
        />
      </div>

    </div>

  </div>
  {/* Scrollable Content Area */}
<div className="flex-1 overflow-y-auto p-8 space-y-8">

  {/* Stats Summary */}
  <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Total Posts */}
    <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm group hover:border-slate-300 transition-all">
      <div>
        <p className="text-slate-500 text-sm font-medium">
          Total Posts
        </p>
        <h3 className="text-3xl font-bold mt-1">
          1,284
        </h3>
        <p className="text-green-500 text-xs font-bold mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">
            trending_up
          </span>
          +12.5% this month
        </p>
      </div>

      <div className="size-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900">
        <span className="material-symbols-outlined text-2xl">
          book
        </span>
      </div>
    </div>

    {/* Published */}
    <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm group hover:border-slate-300 transition-all">
      <div>
        <p className="text-slate-500 text-sm font-medium">
          Published
        </p>
        <h3 className="text-3xl font-bold mt-1">
          1,156
        </h3>
        <p className="text-green-500 text-xs font-bold mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">
            check_circle
          </span>
          92% completion
        </p>
      </div>

      <div className="size-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500">
        <span className="material-symbols-outlined text-2xl">
          publish
        </span>
      </div>
    </div>

    {/* Drafts */}
    <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm group hover:border-slate-300 transition-all">
      <div>
        <p className="text-slate-500 text-sm font-medium">
          Drafts
        </p>
        <h3 className="text-3xl font-bold mt-1">
          128
        </h3>
        <p className="text-blue-600 text-xs font-bold mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">
            edit_note
          </span>
          Needs attention
        </p>
      </div>

      <div className="size-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900">
        <span className="material-symbols-outlined text-2xl">
          draft
        </span>
      </div>
    </div>

  </section>
  {/* Blog Table Section */}
<section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

  {/* Top Bar */}
  <div className="p-6 border-b border-slate-100 flex items-center justify-between">

    {/* Tabs */}
    <div className="flex gap-2">
      <button className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold">
        All Posts
      </button>
      <button className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-all">
        Published
      </button>
      <button className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-all">
        Drafts
      </button>
    </div>

    {/* Actions */}
    <div className="flex gap-3">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium hover:bg-slate-50">
        <span className="material-symbols-outlined text-lg text-slate-900">
          filter_list
        </span>
        Filter
      </button>

      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium hover:bg-slate-50">
        <span className="material-symbols-outlined text-lg text-slate-900">
          download
        </span>
        Export
      </button>
    </div>

  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full text-left">

      {/* Table Head */}
      <thead>
        <tr className="bg-slate-50">
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Title</th>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Category</th>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Author</th>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Publish Date</th>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Actions</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody className="divide-y divide-primary/5">

        {/* Row 1 */}
        <tr className="hover:bg-slate-50 transition-colors">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-900">
                  image
                </span>
              </div>
              <span className="text-sm font-semibold truncate max-w-[200px]">
                The Art of Traditional Tea Ceremony
              </span>
            </div>
          </td>

          <td className="px-6 py-4">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-600">
              Culture
            </span>
          </td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNgwYi20PwJFp2DKCGTjvLaIyWmp8Ec3bnh15qZq9HOOewQ95sWrM8OZoCh58KUo9tobY1lkBa01CK-DIuaI5WLg1FILrLoUS_lCXToEmOv9ddPXrIvkckWVyiI8kN8nOEbViWWRhRhe8mnTD_aoU4COvx-_nm7TKN-ZEz6xi3w4MtFBQB8ecelA8E8cG_qRItt1Na6vpGtbFMEQr4eC4hiVGzpJu89drFTgOxgzGdE_3OS6axb7-SFB_g2WP0niQEDr4vwPZbH_8"
                alt="Author"
                className="size-6 rounded-full object-cover"
              />
              <span className="text-sm">Li Wei</span>
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-1.5 text-green-500">
              <span className="size-2 rounded-full bg-current"></span>
              <span className="text-xs font-bold uppercase">Published</span>
            </div>
          </td>

          <td className="px-6 py-4 text-sm text-slate-500">
            Oct 24, 2023
          </td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-lg hover:bg-primary/10 text-slate-500 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">visibility</span>
              </button>
              <button className="p-1.5 rounded-lg hover:bg-primary/10 text-slate-500 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">edit</span>
              </button>
              <button className="p-1.5 rounded-lg hover:bg-primary/10 text-slate-500 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            </div>
          </td>
          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
  ---
</td>


</tr>

<tr className="hover:bg-slate-50 transition-colors">
  <td className="px-6 py-4">
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-lg bg-slate-100 flex-shrink-0 flex items-center justify-center">
        <span className="material-symbols-outlined text-slate-900">
          restaurant
        </span>
      </div>
      <span className="text-sm font-semibold truncate max-w-[200px]">
        10 Must-Try Street Foods in Chengdu
      </span>
    </div>
  </td>

  <td className="px-6 py-4">
    <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400">
      Food
    </span>
  </td>

  <td className="px-6 py-4">
    <div className="flex items-center gap-2">
      <img
        alt="Author"
        className="size-6 rounded-full"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuALXrtoQNWoK_Pmm2sjBFKXadGI7ZQq4HS7MveWqvvWB_nkxnQu-CWS0gIJ0sLjhUXM6AbkYd6yEEidlzgjFzmfSjx0gOvNCzJp4gSh8GvpiYdLCIRtQ_GmQZy-YB_5MGtKP9TMcnjCO03HAFp7pJCxqyGrpi6IFtXLuwa8MaoFta4G84VcOoObJFeR5j2I2QOsU1d1v4awdCy437MkhNX0s5lTIFVbaKYdwlvL_YzAGWGjlLqpi7hwhV7MYYItKVzcT_jowW73ZnU"
      />
      <span className="text-sm">Chen Hao</span>
    </div>
  </td>

  <td className="px-6 py-4">
    <div className="flex items-center gap-1.5 text-green-500">
      <span className="size-2 rounded-full bg-current"></span>
      <span className="text-xs font-bold uppercase">
        Published
      </span>
    </div>
  </td>

  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
    Oct 18, 2023
  </td>

  <td className="px-6 py-4">
    <div className="flex items-center gap-2">
      <button className="p-1.5 rounded-lg hover:bg-primary/10 text-slate-500 hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-lg">
          visibility
        </span>
      </button>
      <button className="p-1.5 rounded-lg hover:bg-primary/10 text-slate-500 hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-lg">
          edit
        </span>
      </button>
      <button className="p-1.5 rounded-lg hover:bg-primary/10 text-slate-500 hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-lg">
          delete
        </span>
      </button>
    </div>
  </td>
</tr>
</tbody>
</table>
</div>

{/* Pagination */}
<div className="p-6 border-t border-slate-100 flex items-center justify-between">
  <p className="text-xs text-slate-500 dark:text-slate-400">
    Showing 1 to 10 of 1,284 entries
  </p>

  <div className="flex gap-1">
    <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-xs">
      <span className="material-symbols-outlined text-sm">
        chevron_left
      </span>
    </button>

    <button className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold">
      1
    </button>

    <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-xs">
      2
    </button>

    <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-xs">
      3
    </button>

    <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-xs">
      <span className="material-symbols-outlined text-sm">
        chevron_right
      </span>
    </button>
  </div>
</div>

</section>

</div>

</main>
            </div>
        </>
    )
};