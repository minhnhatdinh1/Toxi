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

  const formatCurrency = (value) => {
    if (!value) return "0 đ";
    return `${new Intl.NumberFormat("vi-VN").format(value)} đ`;
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
      console.log("PRODUCT DATA:", data);
      console.log("FIRST PRODUCT:", data[0]);
      const list = Array.isArray(data) ? data : [];
      setProducts(list);
      setFilteredProducts(list);
    } catch (err) {
      console.error(err);
      setError("Lỗi khi tải danh sách sản phẩm");
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
    } finally {
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
      `Bạn có chắc muốn xóa sản phẩm "${product.name}"?`,
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item.id !== id));
      setFilteredProducts((prev) => prev.filter((item) => item.id !== id));
      alert("Xóa sản phẩm thành công!");
    } catch (err) {
      console.error(err);
      setError("Xóa sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };

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
    } catch (exportError) {
      console.error("Export failed:", exportError);
      alert("Xuất file thất bại!");
    }
  };

  return (
    <>
      <div className="flex min-h-screen overflow-hidden">
        <AdminSidebar />

        <main className="flex-1 overflow-y-auto bg-background-light">
          <header className="sticky top-0 z-10 flex flex-col gap-4 border-b border-[#e7ebf3] bg-white/80 px-4 py-4 backdrop-blur-md sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <div className="mb-1 flex items-center gap-2 text-sm text-[#4c669a]">
                <span>Quản lý cửa hàng</span>
                <span className="material-symbols-outlined text-xs">
                  chevron_right
                </span>
                <span className="font-medium text-[#0d121b]">
                  Danh sách sản phẩm
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#0d121b]">
                Kho sản phẩm
              </h2>
            </div>

            <div className="flex w-full items-center gap-4 lg:w-auto">
              <Link
                to="/addnewProduct"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-yellow px-4 py-2.5 font-bold text-black shadow-sm transition-all hover:bg-accent-yellow-hover sm:w-auto"
              >
                <span className="material-symbols-outlined">add</span>
                <span>Thêm sản phẩm mới</span>
              </Link>
            </div>
          </header>

          <div className="space-y-6 p-4 sm:p-6 lg:p-8">
            {error && (
              <div
                className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                role="alert"
              >
                <strong className="font-bold">Lỗi: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
              <div className="rounded-xl border border-[#e7ebf3] bg-white p-6 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#4c669a]">
                    Tổng sản phẩm
                  </span>
                  <div className="rounded-lg bg-primary/10 p-2">
                    <span className="material-symbols-outlined text-primary">
                      inventory_2
                    </span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold">{products.length}</h3>
                </div>
              </div>

              <div className="rounded-xl border border-[#e7ebf3] bg-white p-6 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#4c669a]">
                    Sản phẩm sắp hết
                  </span>
                  <div className="rounded-lg bg-orange-100 p-2">
                    <span className="material-symbols-outlined text-orange-600">
                      warning
                    </span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold">
                    {products.filter((p) => p.stock < 10).length}
                  </h3>
                  <span className="text-sm font-medium italic text-orange-600">
                    Cần kiểm tra
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#e7ebf3] bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-[#e7ebf3] p-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-[#4c669a]">
                      search
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm tên sản phẩm..."
                      className="w-full rounded-lg border border-[#e7ebf3] py-2 pr-4 pl-10 text-sm focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div className="relative flex items-center gap-2">
                    <span className="material-symbols-outlined pointer-events-none absolute left-3 text-[20px] text-[#4c669a]">
                      category
                    </span>

                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="
                        appearance-none rounded-lg border border-[#e7ebf3] bg-white
                        py-2.5 pr-8 pl-10 text-sm text-[#0d121b] shadow-sm transition-all
                        hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30
                      "
                    >
                      <option value="All">Tất cả danh mục</option>
                      {Array.from(
                        new Set(products.map((p) => p.category).filter(Boolean)),
                      ).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    <span className="material-symbols-outlined pointer-events-none absolute right-2 text-[18px] text-[#4c669a]">
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExport}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                    Xuất file
                  </button>
                </div>
              </div>

              <div ref={tableRef}>
                <div className="rounded-xl border border-[#e7ebf3] bg-white">
                  <div className="h-[500px] overflow-auto">
                    <table className="w-full min-w-[760px] text-left">
                      <thead className="sticky top-0 z-10 border-b border-[#e7ebf3] bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-xs font-bold uppercase text-[#4c669a]">
                            Ảnh sản phẩm
                          </th>
                          <th className="px-6 py-4 text-xs font-bold uppercase text-[#4c669a]">
                            Tên sản phẩm
                          </th>
                          <th className="px-6 py-4 text-xs font-bold uppercase text-[#4c669a]">
                            Danh mục
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-bold uppercase text-[#4c669a]">
                            Giá
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-bold uppercase text-[#4c669a]">
                            Tồn kho
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-bold uppercase text-[#4c669a]">
                            Thao tác
                          </th>
                        </tr>
                      </thead>

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
                              className="transition-colors hover:bg-gray-50/50"
                            >
                              <td className="px-6 py-4">
                                <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              </td>

                              <td className="px-6 py-4 font-bold text-[#0d121b]">
                                {product.name}
                              </td>

                              <td className="px-6 py-4">
                                {product.category ? (
                                  <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                                    {product.category}
                                  </span>
                                ) : (
                                  <span className="text-sm text-gray-400">
                                    Chưa phân loại
                                  </span>
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
                                    className="rounded-lg p-2 text-gray-400 transition-all hover:bg-primary/10 hover:text-primary"
                                  >
                                    <span className="material-symbols-outlined text-xl">
                                      edit
                                    </span>
                                  </Link>

                                  <button
                                    onClick={() => handleDelete(product.id)}
                                    className="rounded-lg p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
                                  >
                                    <span className="material-symbols-outlined text-xl">
                                      delete
                                    </span>
                                  </button>

                                  <Link
                                    to={`/adminProductDetail/${product.id}?page=${currentPage}`}
                                    className="rounded-lg p-2 text-gray-400 transition-all hover:bg-blue-50 hover:text-blue-500"
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

              <div className="flex flex-col gap-3 border-t border-[#e7ebf3] bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#4c669a]">
                  Trang <span className="font-bold text-[#0d121b]">{currentPage}</span>{" "}
                  trên <span className="font-bold text-[#0d121b]">{totalPages}</span>
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      const newPage = Math.max(currentPage - 1, 1);
                      setSearchParams({ page: newPage });
                    }}
                    className={`rounded border px-3 py-1 transition ${
                      currentPage === 1
                        ? "cursor-not-allowed bg-gray-100 opacity-50"
                        : "bg-white hover:bg-primary hover:text-white"
                    }`}
                  >
                    Trước
                  </button>

                  {(() => {
                    const pages = [];
                    const maxVisible = 5;

                    let start = Math.max(currentPage - 2, 1);
                    let end = Math.min(start + maxVisible - 1, totalPages);

                    if (end - start < maxVisible - 1) {
                      start = Math.max(end - maxVisible + 1, 1);
                    }

                    if (start > 1) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => setSearchParams({ page: 1 })}
                          className="rounded border bg-white px-3 py-1 hover:bg-primary hover:text-white"
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

                    for (let i = start; i <= end; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => setSearchParams({ page: i })}
                          className={`rounded border px-3 py-1 transition ${
                            currentPage === i
                              ? "border-primary bg-primary text-white"
                              : "bg-white hover:bg-primary hover:text-white"
                          }`}
                        >
                          {i}
                        </button>,
                      );
                    }

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
                          className="rounded border bg-white px-3 py-1 hover:bg-primary hover:text-white"
                        >
                          {totalPages}
                        </button>,
                      );
                    }

                    return pages;
                  })()}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      const newPage = Math.min(currentPage + 1, totalPages);
                      setSearchParams({ page: newPage });
                    }}
                    className={`rounded border px-3 py-1 transition ${
                      currentPage === totalPages
                        ? "cursor-not-allowed bg-gray-100 opacity-50"
                        : "bg-white hover:bg-primary hover:text-white"
                    }`}
                  >
                    Sau
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
