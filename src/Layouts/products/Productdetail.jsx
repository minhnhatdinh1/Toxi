
import { useParams, Link } from "react-router-dom";
import logo from "../../assets/image/LOGO (1).png";
import { useNavigate } from "react-router-dom";
import { getHomeBooks, getBookDetail } from "./api/apiProduct";
import { createBookReview, getBookReviews } from "./api/apiBookReview";
import { useCart } from "../../context/CartContext";
import { useState, useEffect, useRef } from "react";
import LoginModal from "../../components/LoginModal";
import { pushNotification } from "../../utils/notificationCenter";

const PRODUCT_FALLBACK_IMAGE = "https://via.placeholder.com/300x400?text=No+Image";

const buildProductImageUrl = (value) => {
  if (!value || typeof value !== "string") return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `http://localhost:8080/api/files/${value.replace(/^\/+/, "")}`;
};

const normalizeProductImages = (raw = {}) => {
  const rawImages = [
    ...(Array.isArray(raw.imageUrls) ? raw.imageUrls : []),
    ...(Array.isArray(raw.images) ? raw.images : []),
    raw.thumbnailUrl,
    raw.thumbnail,
    raw.imageUrl,
    raw.image,
  ];

  return [...new Set(rawImages.map(buildProductImageUrl).filter(Boolean))];
};

export default function Productdetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0); // dung index thay vi URL string
  const [quantity, setQuantity] = useState(1);
const { addToCart ,cartCount } = useCart();
const [menuOpen, setMenuOpen] = useState(false);
const menuRef = useRef(null);
const [productReviews, setProductReviews] = useState([]);
const [reviewForm, setReviewForm] = useState({ rating: 0, content: "" });
const [reviewSubmitting, setReviewSubmitting] = useState(false);
const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const saved =
    product?.originalPrice && product?.price
      ? product.originalPrice - product.price
      : 0;
  const formatCurrency = (value) => {
    if (!value) return "";
    return Number(value).toLocaleString("vi-VN");
  };
  const [relatedProducts, setRelatedProducts] = useState([]);
const handleAddToCart = () => {
  addToCart(product.bookId, "BOOK", quantity, {
    title: product.title,
    imageUrl: product.image,
    originalPrice: product.originalPrice,
    discountPrice: product.discountPrice,
  });
  alert("Đã thêm vào giỏ hàng!");
};
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getBookDetail(id);
        const imageUrls = normalizeProductImages(data);

        const mappedProduct = {
          id: data.bookId,
          bookId: data.bookId,
          title: data.title,
          name: data.title,
          image: imageUrls[0] || PRODUCT_FALLBACK_IMAGE,
          imageUrls,
          categories: data.categories || [],
          price: data.discountPrice,
          originalPrice: data.price,
          discountPrice: data.discountPrice,
          stock: data.stock,
          description: data.description,
        };

        setProduct(mappedProduct);
        setActiveIndex(0); // reset ve anh dau tien

        const allBooks = await getHomeBooks();
        const books = allBooks || [];

        const mappedProducts = books.map((book) => ({
          id: book.id || book.bookId,
          name: book.name || book.title,
          image: normalizeProductImages(book)[0] || PRODUCT_FALLBACK_IMAGE,
          categories: book.categories || [],
          price: book.price || book.discountPrice,
        }));

        const currentCategories = mappedProduct.categories
          .map((c) => {
            if (typeof c === "string") return c;
            return c?.nameCategory || c?.name || "";
          })
          .filter(Boolean);

        let related = mappedProducts.filter((p) => {
          if (p.id === mappedProduct.id || p.id === mappedProduct.bookId)
            return false;
          if (!p.categories || p.categories.length === 0) return false;
          return p.categories.some((cat) => {
            const catName =
              typeof cat === "string"
                ? cat
                : cat?.nameCategory || cat?.name || "";
            return currentCategories.includes(catName);
          });
        });

        if (related.length === 0) {
          related = mappedProducts
            .filter(
              (p) => p.id !== mappedProduct.id && p.id !== mappedProduct.bookId,
            )
            .slice(0, 4);
        } else if (related.length < 4) {
          const others = mappedProducts.filter(
            (p) =>
              p.id !== mappedProduct.id &&
              p.id !== mappedProduct.bookId &&
              !related.some((r) => r.id === p.id),
          );
          related = [...related, ...others];
        }

        setRelatedProducts(related.slice(0, 4));
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchProduct();
  }, [id]);

useEffect(() => {
  loadProductReviews();
}, [id]);

const loadProductReviews = async () => {
  try {
    const items = await getBookReviews(id);
    setProductReviews(Array.isArray(items) ? items : []);
  } catch (error) {
    console.error("Error loading product reviews:", error);
    setProductReviews([]);
  }
};

const formatReviewDate = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleDateString("vi-VN");
};

const getInitials = (name) => {
  const text = String(name || "U").trim();
  return text ? text.charAt(0).toUpperCase() : "U";
};

const handleReviewSubmit = async (event) => {
  event.preventDefault();

  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  if (!token) {
    setIsLoginModalOpen(true);
    return;
  }

  if (!reviewForm.rating || !String(reviewForm.content).trim()) {
    alert("Vui long chon so sao va nhap noi dung danh gia.");
    return;
  }

  try {
    setReviewSubmitting(true);
    await createBookReview({
      bookId: Number(id),
      rating: Number(reviewForm.rating),
      content: reviewForm.content.trim(),
    });
    pushNotification({
      audience: "admin",
      type: "review",
      title: "Danh gia sach moi",
      message: `${localStorage.getItem("userName") || "Khach hang"} vua gui danh gia cho ${product?.title || "san pham"}.`,
      entityId: Number(id),
      entityType: "book-review",
      actor: localStorage.getItem("userName") || "Khach hang",
    });
    setReviewForm({ rating: 0, content: "" });
    await loadProductReviews();
    alert("Gui danh gia thanh cong.");
  } catch (error) {
    console.error("Error creating product review:", error);
    alert("Khong the gui danh gia luc nay.");
  } finally {
    setReviewSubmitting(false);
  }
};


useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-400">Đang tải sản phẩm...</div>
      </div>
    );
  }

  const discountPercent =
    product?.originalPrice && product?.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  const images = product.imageUrls || [];
  const activeImage = images[activeIndex] || product.image || PRODUCT_FALLBACK_IMAGE;
  const averageRating =
    productReviews.length > 0
      ? (
          productReviews.reduce((sum, item) => sum + Number(item.rating || 0), 0) /
          productReviews.length
        ).toFixed(1)
      : "0.0";
  const reviewCount = productReviews.length;

  return (
    <>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => setIsLoginModalOpen(false)}
        title="Dang nhap de gui danh gia"
        description="Dang nhap de gui nhan xet va dong bo danh gia san pham cua ban."
      />
      {/* Header */}
<header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
  <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>
  <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">

    {/* LOGO */}
    <Link to="/Home" className="flex items-center gap-3 shrink-0">
      <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
      <div>
        <h1 className="text-2xl font-black tracking-tighter leading-none">TOXI</h1>
        <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">学以致用</p>
      </div>
    </Link>

    {/* SEARCH */}
    <div className="flex-1 max-w-2xl hidden md:block">
      <div className="relative group">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm, giáo trình, dụng cụ..."
          className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm focus:ring-2 focus:ring-secondary focus:bg-white focus:text-primary transition-all placeholder-white/60"
        />
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">search</span>
      </div>
    </div>

    {/* ACTIONS */}
    <div className="flex items-center gap-4 shrink-0">

      {/* CART */}
      <Link to="/cart" className="relative cursor-pointer p-2">
        <span className="material-symbols-outlined text-[28px] text-secondary hover:text-white transition-colors">shopping_cart</span>
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary shadow-sm">
            {cartCount}
          </span>
        )}
      </Link>

      {/* PROFILE */}
      {localStorage.getItem("token") ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 hover:bg-white/10 rounded-full px-2 py-1 transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm shadow-md">
              {(localStorage.getItem("userName") || "U").charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:block text-sm font-semibold max-w-[100px] truncate">
              {localStorage.getItem("userName") || "User"}
            </span>
            <span className="material-symbols-outlined text-white/60 text-[18px]">
              {menuOpen ? "expand_less" : "expand_more"}
            </span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100"
              style={{ zIndex: 99999, boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}>

              {/* User info */}
              <div className="px-4 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                    {(localStorage.getItem("userName") || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{localStorage.getItem("userName") || "User"}</p>
                    <p className="text-xs text-slate-400 truncate">{localStorage.getItem("email") || "Học viên TOXI"}</p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-2">
                {[
                  { icon: "person", label: "Trang cá nhân", to: "/Profile" },
                  { icon: "school", label: "Khóa học của tôi", to: "/MyCourse" },
                  { icon: "shopping_bag", label: "Đơn hàng", to: "/MyProduct" },
                  { icon: "info", label: "Thông tin cá nhân", to: "/Profile" },
                ].map((item) => (
                  <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-slate-600 text-sm">
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Logout */}
              <div className="border-t border-slate-100 py-2">
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("accessToken");
                      localStorage.removeItem("refreshToken");
                      localStorage.removeItem("userId");
                      localStorage.removeItem("userName");
                      localStorage.removeItem("email");
                      localStorage.removeItem("phone");
                      localStorage.removeItem("role");
                      setMenuOpen(false);
                      navigate("/Home");
                      window.location.reload();
                    }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-red-500 text-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/login">
            <button className="text-white/80 font-bold text-sm hover:text-white transition-colors">Đăng nhập</button>
          </Link>
          <Link to="/register">
            <button className="bg-secondary text-primary px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:brightness-110 transition-all">Đăng ký</button>
          </Link>
        </div>
      )}
    </div>
  </div>
</header>

      <main className="min-h-screen">
        {/* BREADCRUMB */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
              <a
                href="/Home"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-lg">home</span>
                Trang chủ
              </a>
              <span className="material-symbols-outlined text-xs">
                arrow_forward_ios
              </span>
              <Link
                to={`/store`}
                className="hover:text-primary transition-colors"
              >
                TOXI Store
              </Link>
              <span className="material-symbols-outlined text-xs">
                arrow_forward_ios
              </span>
              <span className="text-primary font-bold">
                {product?.name || "Sản phẩm"}
              </span>
            </nav>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* IMAGE GALLERY */}
            <div className="lg:col-span-5 space-y-4">
              {/* Anh chinh */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center group overflow-hidden relative">
                <div className="chinese-border w-full">
                  <img
                    src={activeImage}
                    alt="Product Main"
                    className="w-full h-auto aspect-square object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
                    }}
                  />
                </div>

                {/* Badge so anh */}
                {images.length > 1 && (
                  <div className="absolute bottom-6 right-6 bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">
                    {activeIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnails - chi hien khi co > 1 anh */}
              {images.length > 1 && (
                <div className="flex gap-3 flex-wrap">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${
                        activeIndex === index
                          ? "border-secondary shadow-md shadow-secondary/30 scale-105"
                          : "border-slate-200 hover:border-slate-400 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`thumb-${index}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center gap-2 mb-4 bg-accent-red/10 border border-accent-red/20 text-accent-red px-3 py-1 rounded-full w-fit">
                <span className="material-symbols-outlined text-sm">stars</span>
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Sản phẩm bán chạy
                </span>
              </div>

              <h2 className="text-4xl font-black text-primary mb-2 leading-tight">
                {product?.name}
              </h2>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={`material-symbols-outlined ${i <= Math.round(Number(averageRating)) ? "text-secondary fill-1" : "text-slate-300"}`}
                    >
                      star
                    </span>
                  ))}
                  <span className="ml-2 text-sm font-bold text-slate-700">
                    {averageRating} ({reviewCount} đánh giá)
                  </span>
                </div>
                <div className="h-4 w-px bg-slate-300"></div>
                <p className="text-sm text-slate-500 font-medium">
                  Đã bán 1.250 sản phẩm
                </p>
              </div>

              {/* PRICE */}
              <div className="bg-white p-8 rounded-2xl mb-8 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-5xl font-black text-primary">
                    {formatCurrency(product?.price)} VND
                  </span>
                  <span className="text-xl text-slate-400 line-through">
                    {formatCurrency(product?.originalPrice)} VND
                  </span>
                  <span className="bg-accent-red text-white text-xs font-bold px-2 py-1 rounded">
                    -{discountPercent}%
                  </span>
                </div>
                <p className="text-accent-red text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    timer
                  </span>
                  Tiết kiệm {formatCurrency(saved)} VND khi mua hôm nay
                </p>
              </div>

              {/* DESCRIPTION */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                  Mô tả ngắn
                </h4>
                {product?.description}
              </div>

              <div className="space-y-8 mb-10">
                <div className="flex items-center gap-6">
                  <span className="text-sm font-bold text-slate-900 w-24">
                    Số lượng:
                  </span>
                  <div className="flex items-center border-2 border-slate-200 rounded-xl bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-5 py-3 hover:bg-slate-50 text-xl font-bold transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => {
                        const v = parseInt(e.target.value || "0", 10);
                        setQuantity(Number.isNaN(v) || v < 1 ? 1 : v);
                      }}
                      className="w-16 text-center border-none focus:ring-0 font-black text-primary text-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-5 py-3 hover:bg-slate-50 text-xl font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <button   onClick={handleAddToCart} className="flex-[1.5] px-8 py-5 bg-primary text-secondary font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 group">
                  <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                    shopping_cart
                  </span>
                  <span className="text-lg">Thêm vào giỏ hàng</span>
                </button>
                <button  onClick={() => {
    handleAddToCart();
    navigate("/checkout");
  }} className="flex-1 px-8 py-5 bg-secondary text-primary font-bold rounded-2xl shadow-xl shadow-secondary/20 hover:bg-secondary-dark transition-all flex items-center justify-center text-lg">
                  Mua ngay
                </button>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-600">
                      verified
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-600">
                    Hàng chính hãng TOXI
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-600">
                      local_shipping
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-600">
                    Giao nhanh toàn quốc
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-orange-600">
                      history
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-600">
                    Đổi trả 7 ngày
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* TABS + DESCRIPTION */}
          <div className="mt-20">
            <div className="bg-white rounded-t-2xl px-6 py-4 border-b border-slate-200 mb-10">
              <div className="flex items-center gap-2 flex-wrap">
                <button type="button" onClick={() => setActiveTab("description")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === "description" ? "bg-primary text-white font-bold" : "bg-slate-100 text-slate-500 hover:text-primary font-medium"}`}>
                  <span className="material-symbols-outlined text-[16px]">description</span>
                  Mo ta san pham
                </button>
                <button type="button" onClick={() => setActiveTab("specs")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === "specs" ? "bg-primary text-white font-bold" : "bg-slate-100 text-slate-500 hover:text-primary font-medium"}`}>
                  <span className="material-symbols-outlined text-[16px]">settings</span>
                  Thong so ky thuat
                </button>
                <button type="button" onClick={() => setActiveTab("reviews")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === "reviews" ? "bg-primary text-white font-bold" : "bg-slate-100 text-slate-500 hover:text-primary font-medium"}`}>
                  <span className="material-symbols-outlined text-[16px]">star</span>
                  Danh gia hoc vien ({reviewCount})
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-8 text-slate-600 leading-relaxed">
                {activeTab === "description" && (
                  <>
                    <h4 className="text-2xl font-bold text-primary">{product?.name}</h4>
                    <p className="text-lg">{product?.description}</p>
                    <div className="bg-white p-8 rounded-3xl border border-secondary/20 shadow-sm relative overflow-hidden group">
                      <ul className="space-y-6 relative z-10">
                        <li className="flex items-start gap-4">
                          <span className="material-symbols-outlined text-secondary bg-primary/5 p-1 rounded-lg">check_circle</span>
                          <span>
                            <strong className="text-primary">Danh muc</strong>{" "}
                            {product?.categories?.map((c) => (typeof c === "string" ? c : c.nameCategory)).join(", ")}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <img
                      src={activeImage}
                      alt={product?.title}
                      className="w-full h-auto aspect-square object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
                      }}
                    />
                  </>
                )}

                {activeTab === "specs" && (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">tune</span>
                      <h4 className="text-xl font-bold text-primary">Thong so ky thuat</h4>
                    </div>
                    <div className="p-6 grid sm:grid-cols-2 gap-4">
                      <div className="rounded-xl border border-slate-100 p-4"><p className="text-xs text-slate-400 uppercase tracking-wider">Ma san pham</p><p className="text-base font-bold text-slate-800 mt-1">{product?.bookId}</p></div>
                      <div className="rounded-xl border border-slate-100 p-4"><p className="text-xs text-slate-400 uppercase tracking-wider">Ten san pham</p><p className="text-base font-bold text-slate-800 mt-1">{product?.title}</p></div>
                      <div className="rounded-xl border border-slate-100 p-4"><p className="text-xs text-slate-400 uppercase tracking-wider">Danh muc</p><p className="text-base font-bold text-slate-800 mt-1">{product?.categories?.map((c) => (typeof c === "string" ? c : c?.nameCategory)).join(", ") || "Dang cap nhat"}</p></div>
                      <div className="rounded-xl border border-slate-100 p-4"><p className="text-xs text-slate-400 uppercase tracking-wider">Ton kho</p><p className="text-base font-bold text-slate-800 mt-1">{product?.stock ?? 0}</p></div>
                      <div className="rounded-xl border border-slate-100 p-4"><p className="text-xs text-slate-400 uppercase tracking-wider">Gia goc</p><p className="text-base font-bold text-slate-800 mt-1">{formatCurrency(product?.originalPrice)}đ</p></div>
                      <div className="rounded-xl border border-slate-100 p-4"><p className="text-xs text-slate-400 uppercase tracking-wider">Gia sau giam</p><p className="text-base font-bold text-red-500 mt-1">{formatCurrency(product?.discountPrice)}đ</p></div>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <form onSubmit={handleReviewSubmit} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-2xl">
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/60">
                            Danh gia san pham
                          </p>
                          <h4 className="mt-2 text-2xl font-black text-primary">Viet danh gia cua ban</h4>
                          <p className="mt-2 text-sm text-slate-500">
                            Chia se cam nhan cua ban de nguoi mua sau co them thong tin tham khao.
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewForm((prev) => ({ ...prev, rating: star }))}
                                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-left transition hover:border-secondary hover:bg-secondary/10"
                              >
                                <span className={`material-symbols-outlined align-middle ${star <= reviewForm.rating ? "fill-1 text-secondary" : "text-slate-300"}`}>
                                  star
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="w-full lg:max-w-xl">
                          <textarea
                            value={reviewForm.content}
                            onChange={(event) =>
                              setReviewForm((prev) => ({ ...prev, content: event.target.value }))
                            }
                            rows={5}
                            placeholder="Chia se trai nghiem cua ban ve san pham nay..."
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                          />
                          <div className="mt-4 flex justify-end">
                            <button
                              type="submit"
                              disabled={reviewSubmitting}
                              className="rounded-2xl bg-secondary px-6 py-3 text-sm font-bold text-primary transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {reviewSubmitting ? "Dang gui..." : "Gui danh gia"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold text-primary">Danh gia hoc vien</h4>
                        <div className="text-sm font-bold text-slate-700">{averageRating}/5 ({reviewCount} danh gia)</div>
                      </div>
                      <div className="mt-3 flex text-secondary">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span
                            key={i}
                            className={`material-symbols-outlined ${i <= Math.round(Number(averageRating)) ? "fill-1" : "text-slate-300"}`}
                          >
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                    {productReviews.length === 0 && (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                        Chua co danh gia nao cho san pham nay.
                      </div>
                    )}
                    {productReviews.map((item) => (
                      <div key={item.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                              {getInitials(item.userName)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{item.userName}</p>
                              <p className="text-xs text-slate-400 mt-1">{formatReviewDate(item.createdAt)}</p>
                            </div>
                          </div>
                          <div className="flex text-secondary">
                            {[1, 2, 3, 4, 5].map((star) => (<span key={star} className={`material-symbols-outlined ${star <= item.rating ? "fill-1" : "text-slate-300"}`}>star</span>))}
                          </div>
                        </div>
                        <p className="text-slate-600 mt-4 leading-relaxed">{item.content}</p>
                        {item.adminReply && (
                          <div className="mt-4 rounded-2xl border border-primary/10 bg-primary/5 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">Phan hoi tu TOXI</p>
                            <p className="mt-2 text-sm text-slate-600">{item.adminReply}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl h-fit sticky top-32">
                  <h4 className="font-bold text-primary mb-6 border-b border-slate-100 pb-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">info</span>
                    Thong tin chi tiet
                  </h4>
                  <dl className="space-y-5 text-sm">
                    <div className="flex justify-between border-b border-dashed border-slate-100 pb-3"><dt className="text-slate-500">Ma sach</dt><dd className="font-bold text-slate-900">{product.bookId}</dd></div>
                    <div className="flex justify-between border-b border-dashed border-slate-100 pb-3"><dt className="text-slate-500">Ten sach</dt><dd className="font-bold text-slate-900">{product.title}</dd></div>
                    <div className="flex justify-between border-b border-dashed border-slate-100 pb-3"><dt className="text-slate-500">Gia goc</dt><dd className="font-bold text-slate-900">{formatCurrency(product.originalPrice)}₫</dd></div>
                    <div className="flex justify-between border-b border-dashed border-slate-100 pb-3"><dt className="text-slate-500">Gia sau khi giam</dt><dd className="font-bold text-red-500">{formatCurrency(product.discountPrice)}₫</dd></div>
                    <div className="flex justify-between border-b border-dashed border-slate-100 pb-3"><dt className="text-slate-500">Ton kho</dt><dd className="font-bold text-slate-900">{product.stock}</dd></div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          {/* RELATED PRODUCTS */}
          <section className="bg-white py-20 border-t border-slate-100">
            <div className="max-w-[1920px] mx-auto px-4 md:px-8">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-black text-primary">
                    Sản phẩm liên quan
                  </h2>
                  <div className="h-1 w-20 bg-secondary rounded-full"></div>
                </div>
                <Link
                  to={`/store`}
                  className="text-sm font-bold text-primary hover:text-accent-red flex items-center gap-1 transition-colors group"
                >
                  Xem tất cả cửa hàng
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[3/4] rounded-2xl bg-slate-100 overflow-hidden mb-5 relative shadow-sm border border-slate-200">
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-accent-red text-white text-[11px] font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                          {product.badge}
                        </div>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
                        }}
                      />
                      <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white text-primary p-4 rounded-full shadow-2xl hover:bg-secondary transition-colors">
                          <span className="material-symbols-outlined">
                            shopping_cart
                          </span>
                        </button>
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 truncate group-hover:text-primary transition-colors text-lg">
                      {product.name}
                    </h3>
                    <p className="text-accent-red font-black text-xl">
                      {formatCurrency(product.price)} VND
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}





