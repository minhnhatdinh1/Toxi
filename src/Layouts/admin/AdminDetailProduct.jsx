import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../admin/api/apiProduct";

export default function AdminDetailProduct() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getProductById(id);
        setBook(data);
        setActiveImg(0);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sách:", error);
      }
    };

    fetchBook();
  }, [id]);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getProductById(id);
        setBook(data);
        setActiveImg(0);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sách:", error);
      }
    };

    fetchBook();
  }, [id]);
  const handleBack = () => {
    navigate(`/adminProduct?page=${page}`);
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <span className="material-symbols-outlined text-5xl animate-spin">
            autorenew
          </span>
          <span className="text-sm font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  const images = book.imageUrls || [];
  const mainImage = images[activeImg] || null;
  const thumbs = images.slice(1);

  const discountPercent =
    book.price && book.discountPrice
      ? Math.round(((book.price - book.discountPrice) / book.price) * 100)
      : 0;

  const formatPrice = (val) => Number(val).toLocaleString("vi-VN") + " ₫";

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-base">
            arrow_back
          </span>
          Back
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          Book Detail
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* ── LEFT: Image Gallery ── */}
          <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-100">
            {/* Ảnh chính */}
            <div className="relative w-full aspect-[3/4] max-h-[480px] rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt="main"
                  className="w-full h-full object-contain transition-all duration-300"
                />
              ) : (
                <span className="material-symbols-outlined text-6xl text-slate-300">
                  image_not_supported
                </span>
              )}

              {/* Badge số lượng ảnh */}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm">
                  {activeImg + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnails (ảnh phụ) */}
            {images.length > 1 && (
              <div className="mt-4 flex gap-2 flex-wrap">
                {images.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImg(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImg === index
                        ? "border-primary shadow-md shadow-primary/20 scale-105"
                        : "border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`thumb-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Info ── */}
          <div className="p-6 lg:p-8 flex flex-col gap-5">
            {/* ID */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                ID
              </span>
              <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                #{book.bookId}
              </span>
            </div>

            {/* Title */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                Title
              </p>
              <h2 className="text-2xl font-extrabold text-slate-900 leading-snug">
                {book.title}
              </h2>
            </div>

            {/* Price */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Price
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-2xl font-extrabold text-primary">
                  {formatPrice(book.discountPrice)}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(book.price)}
                </span>
                {discountPercent > 0 && (
                  <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                    -{discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* Stock */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Stock
              </p>
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                  book.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <span
                  className={`size-2 rounded-full ${
                    book.stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
              </div>
            </div>

            {/* Categories */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {book.categories?.length > 0 ? (
                  book.categories.map((c) => (
                    <span
                      key={c.categoryId}
                      className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full"
                    >
                      {c.nameCategory}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-400">—</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Description
              </p>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {book.description || "—"}
              </p>
            </div>

            {/* Back button */}
            <button
              onClick={handleBack}
              className="mt-auto self-start flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
