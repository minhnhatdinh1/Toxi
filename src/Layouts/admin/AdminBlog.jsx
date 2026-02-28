import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
export default function AdminBlog() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
const [activeTab, setActiveTab] = useState("ALL");
const [currentPage, setCurrentPage] = useState(1);

const postsPerPage = 5;

const [posts, setPosts] = useState([
  {
    id: 1,
    title: "The Art of Traditional Tea Ceremony",
    category: "Culture",
    author: "Li Wei",
    status: "PUBLISHED",
    date: "Oct 24, 2023",
  },
  {
    id: 2,
    title: "10 Must-Try Street Foods in Chengdu",
    category: "Food",
    author: "Chen Hao",
    status: "PUBLISHED",
    date: "Oct 18, 2023",
  },
  {
    id: 3,
    title: "Hidden Temples in Shanghai",
    category: "Travel",
    author: "Wang Jun",
    status: "DRAFT",
    date: "Oct 12, 2023",
  },
]);
const filteredPosts = posts
  .filter((post) => {
    if (activeTab === "ALL") return true;
    return post.status === activeTab;
  })
  .filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

const indexOfLast = currentPage * postsPerPage;
const indexOfFirst = indexOfLast - postsPerPage;
const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
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
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
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
     <button
  onClick={() => setActiveTab("ALL")}
  className={`px-4 py-1.5 rounded-full text-xs font-bold ${
    activeTab === "ALL"
      ? "bg-slate-900 text-white"
      : "bg-slate-100 text-slate-600"
  }`}
>
  All Posts
</button>

<button
  onClick={() => setActiveTab("PUBLISHED")}
  className={`px-4 py-1.5 rounded-full text-xs font-bold ${
    activeTab === "PUBLISHED"
      ? "bg-slate-900 text-white"
      : "bg-slate-100 text-slate-600"
  }`}
>
  Published
</button>

<button
  onClick={() => setActiveTab("DRAFT")}
  className={`px-4 py-1.5 rounded-full text-xs font-bold ${
    activeTab === "DRAFT"
      ? "bg-slate-900 text-white"
      : "bg-slate-100 text-slate-600"
  }`}
>
  Drafts
</button>
    </div>

    {/* Actions */}
    <div className="flex gap-3">
      {/* Add Post Button */}

  {/* Add Post */}
  <button
    onClick={() => navigate("/admin/blog/add")}
    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 active:scale-95 transition-all"
  >
    <span className="material-symbols-outlined text-lg">
      add
    </span>
    Add Post
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
  {currentPosts.map((post) => (
    <tr key={post.id} className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4">
        <span className="text-sm font-semibold">
          {post.title}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-600">
          {post.category}
        </span>
      </td>

      <td className="px-6 py-4 text-sm">
        {post.author}
      </td>

      <td className="px-6 py-4">
        <span
          className={`text-xs font-bold uppercase ${
            post.status === "PUBLISHED"
              ? "text-green-500"
              : "text-yellow-500"
          }`}
        >
          {post.status}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-slate-500">
        {post.date}
      </td>

      <td className="px-6 py-4">
        <button
          onClick={() =>
            setPosts(posts.filter((p) => p.id !== post.id))
          }
          className="text-red-500 text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>
</div>

{/* Pagination */}
<div className="p-6 border-t border-slate-100 flex items-center justify-between">

  {/* Text hiển thị số bản ghi */}
  <p className="text-xs text-slate-500 dark:text-slate-400">
    Showing{" "}
    {filteredPosts.length === 0
      ? 0
      : (currentPage - 1) * postsPerPage + 1}{" "}
    to{" "}
    {Math.min(
      currentPage * postsPerPage,
      filteredPosts.length
    )}{" "}
    of {filteredPosts.length} entries
  </p>

  {/* Pagination buttons */}
  {filteredPosts.length > 0 && (
    <div className="flex gap-1">

      {/* Prev */}
      <button
        onClick={() =>
          setCurrentPage((prev) => Math.max(prev - 1, 1))
        }
        disabled={currentPage === 1}
        className="size-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-xs disabled:opacity-40"
      >
        <span className="material-symbols-outlined text-sm">
          chevron_left
        </span>
      </button>

      {/* Page numbers */}
      {Array.from(
        {
          length: Math.ceil(
            filteredPosts.length / postsPerPage
          ),
        },
        (_, i) => i + 1
      ).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`size-8 flex items-center justify-center rounded-lg text-xs ${
            currentPage === page
              ? "bg-slate-900 text-white"
              : "border border-slate-200 hover:bg-slate-50"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() =>
          setCurrentPage((prev) =>
            Math.min(
              prev + 1,
              Math.ceil(
                filteredPosts.length / postsPerPage
              )
            )
          )
        }
        disabled={
          currentPage ===
          Math.ceil(
            filteredPosts.length / postsPerPage
          )
        }
        className="size-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-xs disabled:opacity-40"
      >
        <span className="material-symbols-outlined text-sm">
          chevron_right
        </span>
      </button>

    </div>
  )}
</div>

</section>

</div>

</main>
            </div>
        </>
    )
};