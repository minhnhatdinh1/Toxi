

import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "./api/apiProduct";

export default function AdminProduct() {

  // fallback data in case the API is unreachable, will be overwritten by real
  // products after a successful load. Can be removed when backend is stable.
  const initialProducts = [];


const [products, setProducts] = useState(initialProducts);
const [filteredProducts, setFilteredProducts] = useState(initialProducts);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');
const itemsPerPage = 4;
const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
  loadProducts();
}, []);

const loadProducts = async () => {
  setLoading(true);
  try {

    const data = await getAllProducts();
    // ensure we always have an array
    const list = Array.isArray(data) ? data : [];
    setProducts(list);
    setFilteredProducts(list);
  } catch (err) {
    console.error(err);
    setError('Lỗi khi tải danh sách sản phẩm');
    // keep fallback data if available
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);

  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  let result = products;
  if (selectedCategory !== 'All') {
    result = result.filter(p => p.category === selectedCategory);
  }
  if (searchQuery.trim()) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  setFilteredProducts(result);
  setCurrentPage(1);
}, [searchQuery, selectedCategory, products]);

const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

const handleDelete = async (id) => {

  const product = products.find((p) => p.id === id);
  if (!product) return;

  const confirmDelete = window.confirm(
    `Bạn có chắc muốn xoá sản phẩm "${product.name}"?`
  );
  if (!confirmDelete) return;


  try {
    setLoading(true);
    await deleteProduct(id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setFilteredProducts((prev) => prev.filter((item) => item.id !== id));
    alert('Xoá sản phẩm thành công!');
  } catch (err) {
    console.error(err);

    setError('Xoá sản phẩm thất bại');
  } finally {
    setLoading(false);
  }
};

    if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg">Loading products...</span>
      </div>
    );
  }

  return(
        <>
       <div className="flex h-screen overflow-hidden">

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

    {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    )}

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

          <h3 className="text-3xl font-bold">{products.length}</h3>
          {/* you could compute percentage change here if you have historical data */}

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

          <h3 className="text-3xl font-bold">
            {products.filter((p) => p.stock < 10).length}
          </h3>

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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search product name, SKU..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#e7ebf3] focus:border-primary focus:ring-primary text-sm"
        />
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">

        <select

          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-[#e7ebf3] text-sm focus:border-primary focus:ring-primary py-2 px-3"
        >

          {/* build options dynamically from products */}
          <option>All</option>
          {Array.from(new Set(products.map((p) => p.category))).map(
            (cat) => (
              <option key={cat}>{cat}</option>
            )
          )}

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

  {currentProducts.length === 0 && (
    <tr>
      <td colSpan={6} className="px-6 py-4 text-center text-sm text-[#4c669a]">
        Không có sản phẩm phù hợp.
      </td>
    </tr>
  )}

  {currentProducts.map((product) => (
    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
      
      {/* IMAGE */}
      <td className="px-6 py-4">
        <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </td>

      {/* NAME */}
      <td className="px-6 py-4">
        <span className="text-sm font-bold text-[#0d121b]">
          {product.name}
        </span>
      </td>


      {/* CATEGORY */}
      <td className="px-6 py-4">
        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
          {product.category || 'Uncategorized'}

        </span>
      </td>

      {/* PRICE */}
      <td className="px-6 py-4 text-right font-bold">
        {product.price}
      </td>

      {/* STOCK */}
      <td className="px-6 py-4 text-right">
        <span
          className={`font-bold ${
            product.stock < 10 ? "text-red-500" : "text-green-600"
          }`}
        >
          {product.stock}
        </span>
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-4 text-center">
        <div className="flex justify-center gap-2">
          
          {/* EDIT */}
          <Link
            to={`/admin/products/edit/${product.id}`}
            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-xl">
              edit
            </span>
          </Link>

          {/* DELETE */}
          <button
            onClick={() => handleDelete(product.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-xl">
              delete
            </span>
          </button>

        </div>
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