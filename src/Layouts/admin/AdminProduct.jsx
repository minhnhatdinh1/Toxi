import React, { useState, useEffect, useRef } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { getAllProducts, deleteProduct } from "./api/apiProduct";
import { exportBooksExcel } from "./api/apiFile";

export default function AdminProduct() {

  const initialProducts = [];
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const itemsPerPage = 4;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const location = useLocation();
  const tableRef = useRef(null);
  //vnđ
  const formatCurrency = (value) => {
    if (!value) return "0 đ";
    return new Intl.NumberFormat("vi-VN").format(value) + " đ";
  };
  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (location.state?.scrollToTable && tableRef.current) {
      tableRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location]);
  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
        console.log("PRODUCT DATA:", data); // ← thêm dòng này
      console.log("FIRST PRODUCT:", data[0]); // ← xem cấu trúc
      const list = Array.isArray(data) ? data : [];
      setProducts(list);
      setFilteredProducts(list);
    } catch (err) {
      console.error(err);
      setError("Lỗi khi tải danh sách sản phẩm");
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
    } finally {
      // dùng load ở trên thì bỏ comment này
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = products;

    if (selectedCategory !== "All") {
result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);

  useEffect(() => {
    if (searchQuery || selectedCategory !== "All") {
      setSearchParams({ page: 1 });
    }
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setSearchParams({ page: totalPages });
    }
  }, [filteredProducts]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDelete = async (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xoá sản phẩm "${product.name}"?`,
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item.id !== id));
      setFilteredProducts((prev) => prev.filter((item) => item.id !== id));
      alert("Xoá sản phẩm thành công!");
    } catch (err) {
      console.error(err);
      setError("Xoá sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };
  // nếu muốn khi k có sản phẩm thì loadding
  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <span className="text-lg">Loading products...</span>
  //     </div>
  //   );
  // }
  const handleExport = async () => {
    try {
      const blob = await exportBooksExcel();

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "books.xlsx");
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Xuất file thất bại!");
    }
  };
  return (
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
                <span className="text-[#0d121b] font-medium">Product List</span>
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
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
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
                      placeholder="Search product name..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#e7ebf3] focus:border-primary focus:ring-primary text-sm"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex items-center gap-2 relative">
                    <span className="material-symbols-outlined absolute left-3 text-[#4c669a] text-[20px] pointer-events-none">
                      category
                    </span>

                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="
      appearance-none
      pl-10 pr-8 py-2.5
      rounded-lg
      border border-[#e7ebf3]
      bg-white
      text-sm
      text-[#0d121b]
      shadow-sm
      hover:border-primary
      focus:outline-none
      focus:ring-2
      focus:ring-primary/30
      transition-all
      cursor-pointer
    "
                    >
                      <option value="All">All Categories</option>

                 {Array.from(new Set(products.map((p) => p.category).filter(Boolean))).map((cat) => (
  <option key={cat} value={cat}>{cat}</option>
))}
                    </select>

                    {/* custom arrow */}
                    <span className="material-symbols-outlined absolute right-2 text-[#4c669a] text-[18px] pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 16V4m0 12l-4-4m4 4l4-4M4 20h16"
                      />
                    </svg>
                    Export
                  </button>
                </div>
              </div>

              <div ref={tableRef}>
                {/* Table */}
                <div className="border border-[#e7ebf3] rounded-xl bg-white">
                  <div className="h-[500px] overflow-y-auto">
                    <table className="w-full text-left">
                      {/* HEADER */}
                      <thead className="bg-gray-50 border-b border-[#e7ebf3] sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase">
                            Product Image
                          </th>
                          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase">
                            Product Name
                          </th>
                          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase">
                            Category
                          </th>
                          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase text-right">
                            Price
                          </th>
                          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase text-right">
                            Stock
                          </th>
                          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase text-center">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      {/* BODY */}
                      <tbody className="divide-y divide-[#e7ebf3]">
                        {currentProducts.length === 0 ? (
                          <tr>
                            <td
                              colSpan={6}
                              className="px-6 py-10 text-center text-sm text-[#4c669a]"
                            >
                              Không có sản phẩm phù hợp.
                            </td>
                          </tr>
                        ) : (
                          currentProducts.map((product) => (
                            <tr
                              key={product.id}
                              className="hover:bg-gray-50/50 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </td>

                              <td className="px-6 py-4 font-bold text-[#0d121b]">
                                {product.name}
                              </td>

                            <td className="px-6 py-4">
  {product.category ? (
    <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full border border-blue-100">
      {product.category}
    </span>
  ) : (
    <span className="text-gray-400 text-sm">Uncategorized</span>
  )}
</td>

                              <td className="px-6 py-4 text-right font-bold">
                                {formatCurrency(product.price)}
                              </td>

                              <td className="px-6 py-4 text-right">
                                <span
                                  className={`font-bold ${
                                    product.stock < 10
                                      ? "text-red-500"
                                      : "text-green-600"
                                  }`}
                                >
                                  {product.stock}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-center">
                                <div className="flex justify-center gap-2">
                                  <Link
                                    to={`/admin/products/edit/${product.id}?page=${currentPage}`}
                                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                  >
                                    <span className="material-symbols-outlined text-xl">
                                      edit
                                    </span>
                                  </Link>

                                  <button
                                    onClick={() => handleDelete(product.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                  >
                                    <span className="material-symbols-outlined text-xl">
                                      delete
                                    </span>
                                  </button>
                                  <Link
                                    to={`/adminProductDetail/${product.id}?page=${currentPage}`}
                                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                                  >
                                    <span className="material-symbols-outlined text-xl">
                                      visibility
                                    </span>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* Pagination */}
              <div className="p-4 bg-gray-50 border-t border-[#e7ebf3] flex items-center justify-between">
                <p className="text-sm text-[#4c669a]">
                  Page{" "}
                  <span className="font-bold text-[#0d121b]">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-[#0d121b]">{totalPages}</span>
                </p>

                <div className="flex items-center gap-2">
                  {/* Prev */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      const newPage = Math.max(currentPage - 1, 1);
                      setSearchParams({ page: newPage });
                    }}
                    className={`px-3 py-1 rounded border transition ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed bg-gray-100"
                        : "bg-white hover:bg-primary hover:text-white"
                    }`}
                  >
                    Prev
                  </button>

                  {/* Dynamic Page Numbers */}
                  {(() => {
                    const pages = [];
                    const maxVisible = 5; // số page hiển thị giữa

                    let start = Math.max(currentPage - 2, 1);
                    let end = Math.min(start + maxVisible - 1, totalPages);

                    if (end - start < maxVisible - 1) {
                      start = Math.max(end - maxVisible + 1, 1);
                    }

                    // Always show first page
                    if (start > 1) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => setSearchParams({ page: 1 })}
                          className="px-3 py-1 rounded border bg-white hover:bg-primary hover:text-white"
                        >
                          1
                        </button>,
                      );

                      if (start > 2) {
                        pages.push(
                          <span key="start-ellipsis" className="px-2">
                            ...
                          </span>,
                        );
                      }
                    }

                    // Middle pages
                    for (let i = start; i <= end; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => setSearchParams({ page: i })}
                          className={`px-3 py-1 rounded border transition ${
                            currentPage === i
                              ? "bg-primary text-white border-primary"
                              : "bg-white hover:bg-primary hover:text-white"
                          }`}
                        >
                          {i}
                        </button>,
                      );
                    }

                    // Always show last page
                    if (end < totalPages) {
                      if (end < totalPages - 1) {
                        pages.push(
                          <span key="end-ellipsis" className="px-2">
                            ...
                          </span>,
                        );
                      }

                      pages.push(
                        <button
                          key={totalPages}
                          onClick={() => setSearchParams({ page: totalPages })}
                          className="px-3 py-1 rounded border bg-white hover:bg-primary hover:text-white"
                        >
                          {totalPages}
                        </button>,
                      );
                    }

                    return pages;
                  })()}

                  {/* Next */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      const newPage = Math.min(currentPage + 1, totalPages);
                      setSearchParams({ page: newPage });
                    }}
                    className={`px-3 py-1 rounded border transition ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed bg-gray-100"
                        : "bg-white hover:bg-primary hover:text-white"
                    }`}
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
  );
}
