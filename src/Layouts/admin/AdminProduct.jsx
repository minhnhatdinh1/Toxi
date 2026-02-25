

import React, { useState } from "react";

import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
export default function AdminProduct() {
  const products = [
  {
    id: 1,
    name: "Standard HSK 4 Textbook",
    price: "¥128.00",
    stock: 450,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
  },
  {
    id: 2,
    name: "Elementary 500 Flashcards",
    price: "¥89.00",
    stock: 8,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
  },
  {
    id: 3,
    name: "Calligraphy Master Set",
    price: "¥255.00",
    stock: 124,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794"
  },
  {
    id: 4,
    name: "Grammar Guide Level 1-3",
    price: "¥65.00",
    stock: 89,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
  },
  {
    id: 5,
    name: "HSK 5 Mock Test Book",
    price: "¥150.00",
    stock: 32,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
  },
  {
    id: 6,
    name: "Chinese Idioms Handbook",
    price: "¥98.00",
    stock: 77,
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090"
  }
];

const itemsPerPage = 4;
const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(products.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const currentProducts = products.slice(
  startIndex,
  startIndex + itemsPerPage
);
    return(
        <>
       <div class="flex h-screen overflow-hidden">
             <AdminSidebar />
        {/* Main Content */}
<main className="flex-1 overflow-y-auto bg-background-light">
  {/* Top Header */}
  <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-[#e7ebf3] px-8 py-4 flex items-center justify-between">
    <div>
      <div className="flex items-center gap-2 text-sm text-[#4c669a] mb-1">
        <span>Store Management</span>
        <span className="material-symbols-outlined text-xs">
          chevron_right
        </span>
        <span className="text-[#0d121b] font-medium">
          Product List
        </span>
      </div>
      <h2 className="text-2xl font-bold text-[#0d121b]">
        Product Inventory
      </h2>
    </div>

   <div className="flex items-center gap-4">
  <Link
    to="/addnewProduct"
    className="flex items-center gap-2 px-4 py-2.5 bg-accent-yellow hover:bg-accent-yellow-hover text-black font-bold rounded-lg transition-all shadow-sm"
  >
    <span className="material-symbols-outlined">add</span>
    <span>Add New Product</span>
  </Link>
</div>
  </header>

  <div className="p-8 space-y-6">
    {/* Stats Overview */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Total Products */}
      <div className="bg-white p-6 rounded-xl border border-[#e7ebf3] shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#4c669a] text-sm font-medium">
            Total Products
          </span>
          <div className="p-2 bg-primary/10 rounded-lg">
            <span className="material-symbols-outlined text-primary">
              inventory_2
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold">1,248</h3>
          <span className="text-green-600 text-sm font-bold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-xs">
              arrow_upward
            </span>
            5.2%
          </span>
        </div>
      </div>

      {/* Low Stock */}
      <div className="bg-white p-6 rounded-xl border border-[#e7ebf3] shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#4c669a] text-sm font-medium">
            Low Stock Items
          </span>
          <div className="p-2 bg-orange-100 rounded-lg">
            <span className="material-symbols-outlined text-orange-600">
              warning
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold">12</h3>
          <span className="text-orange-600 text-sm font-medium italic">
            Requires attention
          </span>
        </div>
      </div>

      {/* Total Sales */}
      <div className="bg-white p-6 rounded-xl border border-[#e7ebf3] shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#4c669a] text-sm font-medium">
            Total Sales (MTD)
          </span>
          <div className="p-2 bg-green-100 rounded-lg">
            <span className="material-symbols-outlined text-green-600">
              payments
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold">¥45,000</h3>
          <span className="text-green-600 text-sm font-bold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-xs">
              arrow_upward
            </span>
            12.4%
          </span>
        </div>
      </div>

    </div>
    {/* Product Table Container */}
<div className="bg-white rounded-xl border border-[#e7ebf3] shadow-sm overflow-hidden">
  
  {/* Filters & Search */}
  <div className="p-4 border-b border-[#e7ebf3] flex flex-wrap items-center justify-between gap-4">
    
    <div className="flex items-center gap-4 flex-1 min-w-[300px]">
      
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4c669a] text-xl">
          search
        </span>
        <input
          type="text"
          placeholder="Search product name, SKU..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border-[#e7ebf3] focus:border-primary focus:ring-primary text-sm"
        />
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <select className="rounded-lg border-[#e7ebf3] text-sm focus:border-primary focus:ring-primary py-2 px-3">
          <option>All Categories</option>
          <option>Books</option>
          <option>Flashcards</option>
          <option>Tools</option>
        </select>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex items-center gap-2">
      <button className="flex items-center gap-2 px-3 py-2 border border-[#e7ebf3] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
        <span className="material-symbols-outlined text-sm">filter_list</span>
        <span>Advanced Filters</span>
      </button>

      <button className="flex items-center gap-2 px-3 py-2 border border-[#e7ebf3] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
        <span className="material-symbols-outlined text-sm">download</span>
        <span>Export</span>
      </button>
    </div>
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      
      <thead className="bg-gray-50 border-b border-[#e7ebf3]">
        <tr>
          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase tracking-wider">
            Product Image
          </th>
          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase tracking-wider">
            Product Name
          </th>
          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase tracking-wider">
            Category
          </th>
          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase tracking-wider text-right">
            Price
          </th>
          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase tracking-wider text-right">
            Stock
          </th>
          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase tracking-wider text-center">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-[#e7ebf3]">
  {currentProducts.map((product) => (
    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4">
        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
              <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover"
    />
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm font-bold text-[#0d121b]">
          {product.name}
        </span>
      </td>

      <td className="px-6 py-4 text-right font-bold">
        {product.price}
      </td>

      <td className="px-6 py-4 text-right">
        {product.stock}
      </td>
    </tr>
  ))}
</tbody>
    </table>
  </div>
  {/* Pagination */}
<div className="p-4 bg-gray-50 border-t border-[#e7ebf3] flex items-center justify-between">

  <p className="text-sm text-[#4c669a]">
    Page <span className="font-bold text-[#0d121b]">{currentPage}</span> of{" "}
    <span className="font-bold text-[#0d121b]">{totalPages}</span>
  </p>

  <div className="flex items-center gap-2">

    {/* Prev */}
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-3 py-1 rounded ${
          currentPage === index + 1
            ? "bg-primary text-white"
            : "bg-white border"
        }`}
      >
        {index + 1}
      </button>
    ))}

    {/* Next */}
    <button
      onClick={() =>
        setCurrentPage((prev) =>
          Math.min(prev + 1, totalPages)
        )
      }
      disabled={currentPage === totalPages}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
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