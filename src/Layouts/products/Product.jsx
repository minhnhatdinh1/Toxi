import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/image/LOGO (1).png";
import { Link, useNavigate } from "react-router-dom";
import { getHomeBooks, getAllCategories } from "./api/apiProduct";
import { useCart } from "../../context/CartContext";
import LoadingSpinner from "../common/LoadingSpinner";
import FlyToCartAnimation from "../common/FlyToCartAnimation";
const BASE_URL = import.meta.env.VITE_API_URL;


// Quick filter chips
const QUICK_FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "new", label: "Sách mới" },
  { id: "bestseller", label: "Best Seller" },
  { id: "promotion", label: "Khuyến mãi" },
];

// Sort options
const SORT_OPTIONS = [
  { id: "newest", label: "Mới nhất" },
  { id: "price-asc", label: "Giá: Thấp đến Cao" },
  { id: "price-desc", label: "Giá: Cao đến Thấp" },
  { id: "bestselling", label: "Bán chạy nhất" },
];

// vnd
const formatCurrency = (value) => {
  if (!value) return "";
  return Number(value).toLocaleString("vi-VN");
};

const parseCurrency = (value) => {
  return value.replace(/\./g, "").replace(/[^\d]/g, "");
};

const PRODUCT_FALLBACK_IMAGE = "https://via.placeholder.com/200?text=No+Image";

const buildProductImageUrl = (value) => {
  if (!value || typeof value !== "string") return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${BASE_URL}/api/files/${value.replace(/^\/+/, "")}`;
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
const toTimestamp = (value) => {
  if (!value) return 0;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const getPurchaseCount = (book = {}) =>
  Number(
    book.soldCount ??
      book.orderCount ??
      book.purchaseCount ??
      book.totalSold ??
      book.totalOrders ??
      book.boughtCount ??
      0
  );

const getCreatedTimestamp = (book = {}) =>
  toTimestamp(
    book.createdAt ??
      book.created_at ??
      book.createdDate ??
      book.publishDate ??
      book.dateCreated ??
      0
  );
// Product Card Component
function ProductCard({ product, selectedCategories, onAddToCart }) {
  const getBadgeContent = () => {
    if (product.discount) return product.discount;
    if (product.badge === "new") return "Mới";
    if (product.badge === "bestseller") return "Bán chạy";
    return null;
  };

  const getBadgeStyle = () => {
    if (product.discount) return "bg-red-500";
    if (product.badge === "new") return "bg-primary text-background-dark";
    if (product.badge === "bestseller") return "bg-teal-800";
    return "";
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-[#e7f3f0] overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
      <div className="relative w-full pt-[100%] bg-[#f8fcfb] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          data-product-image="true"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
          }}
        />
        {getBadgeContent() && (
          <div
            className={`absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded ${getBadgeStyle()}`}
          >
            {getBadgeContent()}
          </div>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart(product, e.currentTarget);
          }}
          className="absolute bottom-3 right-3 size-10 rounded-full bg-white/90 backdrop-blur text-text-main shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-colors translate-y-14 group-hover:translate-y-0 duration-300"
        >
          <span className="material-symbols-outlined">shopping_cart</span>
        </button>
      </div>

      <div className="flex flex-col p-4 gap-2 grow">
        <div className="flex flex-wrap gap-1 text-xs">
          {(selectedCategories.length > 0
            ? product.categories.filter((c) => selectedCategories.includes(c))
            : product.categories
          ).map((cat) => (
            <span
              key={cat}
              className="px-2 py-0.5 bg-primary/10 text-primary rounded"
            >
              {cat}
            </span>
          ))}
        </div>
        <Link
          to={`/products/${product.id}`}
          className="text-lg font-bold text-text-main leading-snug group-hover:text-primary transition-colors line-clamp-2"
        >
          {product.name}
        </Link>
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="text-xl font-black text-primary">
            {formatCurrency(product.price)}₫
          </span>

          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatCurrency(product.originalPrice)}₫
            </span>
          )}
        </div>
        <p className="text-sm text-text-muted line-clamp-2 mt-1">
          {product.description}
        </p>
        <Link
          to={`/products/${product.id}`}
          className="mt-3 block w-full py-2.5 rounded-lg border border-[#e7f3f0] text-text-main font-bold text-sm hover:border-primary hover:text-primary transition-colors bg-transparent text-center"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuickFilter, setSelectedQuickFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
const { cartCount, addToCart } = useCart();
const [menuOpen, setMenuOpen] = useState(false);
const menuRef = useRef(null);
const cartIconRef = useRef(null);
const flyTimerRef = useRef(null);
const searchRef = useRef(null);
const [avatarUrl, setAvatarUrl] = useState(
  localStorage.getItem("avatarUrl") || null
);
const [flyToCart, setFlyToCart] = useState(null);
useEffect(() => {
  const handleAvatarUpdated = (e) => {
    setAvatarUrl(e.detail);
  };
``
  window.addEventListener("avatarUpdated", handleAvatarUpdated);

  return () => {
    window.removeEventListener("avatarUpdated", handleAvatarUpdated);
  };
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomeBooks();

        const books = Array.isArray(data) ? data : [];
        const bestsellerIds = new Set(
          [...books]
            .sort((a, b) => getPurchaseCount(b) - getPurchaseCount(a))
            .filter((book) => getPurchaseCount(book) > 0)
            .slice(0, 8)
            .map((book) => String(book.id || book.bookId))
        );
        const newIds = new Set(
          [...books]
            .sort((a, b) => getCreatedTimestamp(b) - getCreatedTimestamp(a))
            .filter((book) => getCreatedTimestamp(book) > 0)
            .slice(0, 8)
            .map((book) => String(book.id || book.bookId))
        );

        const mappedProducts = books.map((book) => {
          const discount =
            book.originalPrice && book.price
              ? Math.round(
                  ((book.originalPrice - book.price) / book.originalPrice) *
                    100,
                )
              : 0;

          const productId = String(book.id || book.bookId);

          return {
            id: book.id || book.bookId,
            name: book.name || book.title,
            image: normalizeProductImages(book)[0] || PRODUCT_FALLBACK_IMAGE,
            categories: book.categories || [],
            category: book.categories?.[0] || "Khác",
            price: book.price,
            originalPrice: book.originalPrice,

            discount: discount ? `${discount}%` : null,

            description: book.description || "",

            badge: bestsellerIds.has(productId)
              ? "bestseller"
              : newIds.has(productId)
              ? "new"
              : null,
            purchaseCount: getPurchaseCount(book),
            createdAt: getCreatedTimestamp(book),
          };
        });

        setProducts(mappedProducts);
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi tải danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSuggestionsOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  useEffect(() => {
    return () => {
      if (flyTimerRef.current) {
        clearTimeout(flyTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) {
      setSearchSuggestions([]);
      return;
    }

    const suggestions = products
      .filter((product) =>
        [product.name, product.description, ...(product.categories || [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(keyword)
      )
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(keyword) ? 0 : 1;
        const bStarts = b.name.toLowerCase().startsWith(keyword) ? 0 : 1;
        return aStarts - bStarts || a.name.length - b.name.length;
      })
      .slice(0, 6);

    setSearchSuggestions(suggestions);
  }, [products, searchTerm]);

  // Filter and sort products
  let filteredProducts = products.filter((p) => {
    // CATEGORY FILTER
    if (
      selectedCategories.length > 0 &&
      !p.categories.some((cat) => selectedCategories.includes(cat))
    ) {
      return false;
    }

    // QUICK FILTER
    if (selectedQuickFilter === "new" && p.badge !== "new") {
      return false;
    }

    if (selectedQuickFilter === "bestseller" && p.badge !== "bestseller") {
      return false;
    }

    if (selectedQuickFilter === "promotion" && !p.discount) {
      return false;
    }

    // PRICE FILTER
    const minVal = priceRange.min ? parseInt(priceRange.min) : null;
    const maxVal = priceRange.max ? parseInt(priceRange.max) : null;

    const productPrice = Number(p.price);

    if (minVal !== null && productPrice < minVal) return false;
    if (maxVal !== null && productPrice > maxVal) return false;

    // SEARCH
    if (searchTerm.trim() !== "") {
      const term = searchTerm.trim().toLowerCase();

      if (
        !p.name.toLowerCase().includes(term) &&
        !p.categories.some((cat) => cat.toLowerCase().includes(term))
      ) {
        return false;
      }
    }

    return true;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (b.createdAt || 0) - (a.createdAt || 0);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "bestselling":
        return (b.purchaseCount || 0) - (a.purchaseCount || 0);
      default:
        return 0;
    }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, priceRange, searchTerm, selectedQuickFilter]);

  const handleAddProductToCart = (product, triggerEl) => {
    addToCart(product.id, "BOOK", 1, {
      title: product.name,
      imageUrl: product.image,
      originalPrice: product.originalPrice,
      discountPrice: product.price,
    });

    const cartRect = cartIconRef.current?.getBoundingClientRect();
    const imageRect =
      triggerEl
        ?.closest(".group")
        ?.querySelector('[data-product-image="true"]')
        ?.getBoundingClientRect() || triggerEl?.getBoundingClientRect();

    if (!cartRect || !imageRect) return;

    if (flyTimerRef.current) {
      clearTimeout(flyTimerRef.current);
    }

    setFlyToCart({
      src: product.image || PRODUCT_FALLBACK_IMAGE,
      start: {
        x: imageRect.left,
        y: imageRect.top,
        width: imageRect.width,
        height: imageRect.height,
        opacity: 0.95,
        scale: 1,
      },
      end: {
        x: cartRect.left + cartRect.width / 2 - 18,
        y: cartRect.top + cartRect.height / 2 - 18,
        width: 36,
        height: 36,
        opacity: 0.15,
        scale: 0.2,
      },
      active: false,
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlyToCart((prev) => (prev ? { ...prev, active: true } : prev));
      });
    });

    flyTimerRef.current = setTimeout(() => {
      setFlyToCart(null);
    }, 1300);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSuggestionsOpen(false);
  };

  const handleSuggestionSelect = (product) => {
    if (!product?.id) return;
    setSearchTerm(product.name || "");
    setSuggestionsOpen(false);
    navigate(`/products/${product.id}`);
  };

  return (
    <>
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-chinese-pattern overflow-x-hidden">
        <FlyToCartAnimation
          animation={flyToCart}
          fallbackImage={PRODUCT_FALLBACK_IMAGE}
        />
        {/* Header */}
        <div className="w-full bg-white dark:bg-surface-dark shadow-sm z-50 sticky top-0">
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
      <div ref={searchRef} className="relative group">
        <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onFocus={() => setSuggestionsOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSuggestionsOpen(true);
          }}
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm focus:ring-2 focus:ring-secondary focus:bg-white focus:text-primary transition-all placeholder-white/60"
        />
        </form>
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">search</span>
        {suggestionsOpen && searchTerm.trim() ? (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-[80] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            {searchSuggestions.length > 0 ? (
              <>
                <div className="border-b border-slate-100 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Goi y san pham
                </div>
                {searchSuggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      handleSuggestionSelect(product);
                    }}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50"
                  >
                    <img
                      src={product.image || PRODUCT_FALLBACK_IMAGE}
                      alt={product.name}
                      className="h-12 w-12 rounded-xl object-cover"
                      onError={(event) => {
                        event.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
                      }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-700">
                        {product.name}
                      </span>
                      <span className="block truncate text-xs text-slate-400">
                        {(product.categories || []).join(" - ") || "San pham TOXI"}
                      </span>
                    </span>
                  </button>
                ))}
              </>
            ) : (
              <div className="px-4 py-4 text-sm text-slate-500">
                Khong tim thay san pham phu hop voi <span className="font-bold text-primary">"{searchTerm.trim()}"</span>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>

    {/* ACTIONS */}
    <div className="flex items-center gap-4 shrink-0">

      {/* CART */}
      <Link to="/cart" ref={cartIconRef} className="relative cursor-pointer p-2">
        <span className="material-symbols-outlined text-[28px] text-secondary hover:text-white transition-colors">shopping_cart</span>
        {cartCount > 0 && (
          <span className="absolute -top-0 -right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary shadow-sm">
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
             {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm shadow-md">
          {(localStorage.getItem("userName") || "U").charAt(0).toUpperCase()}
        </div>
      )}

      <span className="hidden sm:block text-sm font-semibold max-w-[100px] truncate">
        {localStorage.getItem("userName") || "User"}
      </span>

    </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100"
              style={{ zIndex: 99999, boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}>
              
              {/* User info */}
              <div className="px-4 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md">
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
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-slate-600 text-sm"
                  >
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
                      navigate("/home");
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
        </div>
        <div className="w-full bg-[#f8fcfb] relative chinese-pattern-bg">
          <div className="layout-container flex flex-col items-center py-10 px-4 md:px-10 lg:px-40">
            <div className="layout-content-container flex flex-col w-full max-w-7xl">
              <div className="@container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-[#e7f3f0]">
                  <div className="flex flex-col gap-4 md:gap-6 text-left order-2 md:order-1">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-teal-800 uppercase tracking-wide">
                      <span className="material-symbols-outlined text-sm">
                        local_fire_department
                      </span>
                      Best Seller
                    </div>
                    <h1 className="text-text-main text-3xl md:text-5xl font-black leading-tight tracking-tight">
                      Học để ứng dụng <br />
                      <span className="text-primary text-4xl md:text-6xl font-serif italic">
                        学以致用
                      </span>
                    </h1>
                    <p className="text-text-muted text-base md:text-lg max-w-md">
                      Khám phá kho tàng sách, giáo trình và công cụ hỗ trợ học
                      tiếng Trung chất lượng cao giúp bạn chinh phục ngôn ngữ
                      nhanh chóng.
                    </p>
                    <div className="flex gap-4 pt-2">
                      <button className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-text-invert font-bold shadow-md hover:bg-primary/90 transition-all hover:shadow-lg hover:-translate-y-0.5">
                        Khám phá ngay
                      </button>
                      <button className="flex items-center justify-center rounded-lg h-12 px-6 bg-white border border-[#e7f3f0] text-text-main text-base font-medium hover:bg-[#f8fcfb] transition-all">
                        Tìm hiểu thêm
                      </button>
                    </div>
                  </div>
                  <div className="order-1 md:order-2 flex justify-center relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl transform scale-75"></div>
                    <img
                      className="relative z-10 w-full max-w-sm rounded-xl shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500 object-cover aspect-[4/3]"
                      data-alt="Stack of Chinese learning books with a cup of tea on a table"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtDgZmJTafnXR_oIqQ4kS5WawboHOzNdZ46WB1EWDj1SvItkdCx5PEIwrV9US_By5F0DwtRTIoB3M-mpG06FLANkuNPRnokuWCKuPLYTiDQIWTR9igUBvrhJC1KIEo8gMTEDboOsAdMjFb6beBNlyDDQzRESoyQ5AjoYwyrlvQxU1nNZbi0im48X2DVp858-SOUk4EmFx2XeGoWQj1xyXQJMF2yyfOlhZEGx58wRXvoE-XNkX4jo_W6sJPFAlrCM3V92pczNBzZ3E"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="layout-container flex flex-col grow py-8 px-4 md:px-10 lg:px-20 w-full max-w-[1600px] mx-auto">
          {/* Breadcrumbs & Headline */}
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex gap-2 text-sm text-text-muted items-center">
              <a href="#" className="hover:text-primary">
                Trang chủ
              </a>
              <span className="material-symbols-outlined text-[10px]">
                arrow_forward_ios
              </span>
              <span className="text-text-main font-medium">Cửa hàng</span>
            </div>

            <h2 className="text-text-main text-3xl font-bold">
              Danh mục sản phẩm / 产品目录
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filter */}
            <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
              {/* Mobile Filter Toggle */}
              <button className="lg:hidden flex items-center justify-between w-full p-4 bg-white rounded-xl border border-[#e7f3f0] shadow-sm">
                <span className="font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined">filter_list</span>
                  Bộ lọc tìm kiếm
                </span>
                <span className="material-symbols-outlined">expand_more</span>
              </button>

              {/* Filter Content */}
              <div className="hidden lg:flex flex-col gap-6 bg-white p-6 rounded-2xl border border-[#e7f3f0] shadow-sm sticky top-24">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#e7f3f0]">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      filter_alt
                    </span>
                    Bộ lọc / 筛选
                  </h3>
                </div>

                {/* Category Filter */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-text-muted">
                    Danh mục
                  </h4>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.length === 0}
                      onChange={() => setSelectedCategories([])}
                      className="form-checkbox rounded text-primary size-5"
                    />
                    <span className="text-text-main">Tất cả sản phẩm</span>
                  </label>

                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.name)}
                        onChange={() => {
                          setSelectedCategories((prev) =>
                            prev.includes(cat.name)
                              ? prev.filter((c) => c !== cat.name)
                              : [...prev, cat.name],
                          );
                        }}
                        className="form-checkbox rounded text-primary size-5"
                      />
                      <span className="text-text-main group-hover:text-primary transition-colors">
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Price Range */}
                <div className="flex flex-col gap-3 pt-4 border-t border-[#e7f3f0]">
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-text-muted">
                    Khoảng giá (VND)
                  </h4>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Từ"
                      value={formatCurrency(priceRange.min)}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: parseCurrency(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />

                    <span className="text-gray-400">-</span>

                    <input
                      type="text"
                      placeholder="Đến"
                      value={formatCurrency(priceRange.max)}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: parseCurrency(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <button
                    onClick={() => {
                      /* state already updated; filtering runs automatically */
                    }}
                    className="w-full mt-2 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold py-2 rounded-lg transition-colors text-sm"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            </aside>
            {/* Product Grid Area */}
            <div className="flex flex-col flex-1 min-w-0">
              {/* Quick Filters & Sort */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                {/* Chips */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar mask-gradient">
                  {QUICK_FILTERS.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedQuickFilter(filter.id)}
                      className={`whitespace-nowrap flex h-9 items-center justify-center px-4 rounded-full font-bold text-sm shadow-sm transition-transform ${
                        selectedQuickFilter === filter.id
                          ? "bg-primary text-background-dark hover:scale-105"
                          : "bg-white border border-[#e7f3f0] text-text-main hover:border-primary hover:text-primary font-medium"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <LoadingSpinner text="Dang tai san pham..." />
              ) : filteredProducts.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-center">
                    <p className="text-text-muted text-lg">
                      Không tìm thấy sản phẩm nào
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      selectedCategories={selectedCategories}
                      onAddToCart={handleAddProductToCart}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Grid (wrapper with absolute sort control at top-right) */}
            <div className="relative">
              {/* Absolute sort dropdown placed over the grid, right aligned */}
              <div className="absolute right-0 -top-10 md:-top-8 lg:-top-6 z-30">
                <div
                  ref={sortRef}
                  className="flex items-center gap-2 shrink-0 min-w-max"
                >
                  <span className="text-sm text-text-muted hidden md:inline shrink-0 whitespace-nowrap mr-2">
                    Sắp xếp theo:
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setSortOpen((s) => !s)}
                      aria-haspopup="menu"
                      aria-expanded={sortOpen}
                      className="flex items-center gap-2 pl-4 pr-3 py-2 bg-white border border-[#e7f3f0] rounded-lg text-sm font-medium text-text-main hover:border-primary transition-colors shadow-sm"
                    >
                      {SORT_OPTIONS.find((opt) => opt.id === sortBy)?.label ||
                        "Mới nhất"}
                      <span className="material-symbols-outlined text-lg">
                        expand_more
                      </span>
                    </button>

                    {sortOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-[#e7f3f0] z-50 overflow-hidden">
                        {SORT_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSortBy(option.id);
                              setSortOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-text-main hover:bg-[#f0f7f5] hover:text-primary"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-10">
            {/* Previous */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="flex items-center justify-center size-10 rounded-lg border border-[#e7f3f0] bg-white text-text-main hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back_ios_new
              </span>
            </button>

            {/* Page Number */}
            <span className="text-sm font-semibold text-text-main">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-primary text-white"
                      : "bg-white border"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </span>

            {/* Next */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="flex items-center justify-center size-10 rounded-lg border border-[#e7f3f0] bg-white text-text-main hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_forward_ios
              </span>
            </button>
          </div>
        </main>
      </div>
    </>
  );
}



