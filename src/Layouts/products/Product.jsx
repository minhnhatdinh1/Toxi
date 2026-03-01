import react, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/image/LOGO (1).png';
import toxiLogo from "../../assets/image/LOGO (1).png";
import { Link, useNavigate } from "react-router-dom";

// Product data
const PRODUCTS_DATA = [
  {
    id: 1,
    category: "Giáo trình",
    name: "Giáo trình Hán ngữ Quyển 1 (Phiên bản mới)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLkssygY9e0zKKPqzgmtAUinbqDyua7hM76rZrRyFQaAwCoj-MQBfMIeEhp9c0RF9qlGkrIR5ifwZteusWIaKl1wqxpk626w1UBLqq8OsbSdTZdTcKjyyk2s8nnkFeCALnTkTpXlOjhHC1kuAxg8-_iZnEwyhWaM9YfeswJlrlWrf0YDmO3Mqbqts5B7pM9fRy99wr154lPi57aTrDi4Z51Vl0XFUrtLlVdkfOGBQIycEoc31s-h8bi-803bShoKwF-iR4rsrUaI0",
    price: 120000,
    originalPrice: 150000,
    discount: "-20%",
    badge: "discount",
    description: "Cuốn sách nhập môn hoàn hảo cho người mới bắt đầu, kèm Audio nghe.",
    topics: ["Luyện thi HSK", "Giao tiếp công sở"]
  },
  {
    id: 2,
    category: "Flashcards",
    name: "Flashcard 3000 từ vựng HSK 1-6",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASxsccenr1DGjHq6xhB-urABDYrEuf9RCAHKzoawaJL_xNDwNzTBMskvRkBJ6Oh-MnfC6KCr1GxDAto8mU7TaZcfx31ijxje631C5GmdIEz7k7Y9mt1FogQ__us_9ezaug_CXDna-8iFfx2BIKwSLRXXPnd_tweb1Sb5bVMGWnxiEVibicCVfZOkGKmXGvjYz_J091Okjej7ptwM8NdLgCaC3ZeGdYaVbcxbLFDiQiO1Qqx9QnrYKzUBY3H8LVb6pTUNrXWMn9Yxg",
    price: 250000,
    originalPrice: null,
    badge: "new",
    description: "Bộ thẻ học từ vựng nhỏ gọn, tiện lợi, in màu sắc nét.",
    topics: ["Tiếng Trung du lịch"]
  },
  {
    id: 3,
    category: "Dụng cụ",
    name: "Bộ tập viết thư pháp căn bản",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxXQEh3uENc7Ow34GwuF8gN9R4erGSWyIOYcbkVeGCidIOkafnILrWOMGcleN8OfOirRkwE3EM0donlNS6ZFLtO91nT4KPK9lWIcB9yNVI3F7uoZ6CerSMzLYNsF0YKKaDCQJViQLUNv0H_zQBAqSXETBqNcMovlooiCJXAhi8Z6a7G1t0yH-Yjvlms4Fh0j-skFw9ZFt3ExpPZvcZAB-00AfBcvSceBSx_mICZrpVTueKsEZzSDgOCeg55DTwyD2YYgkH-H5cPCc",
    price: 350000,
    originalPrice: null,
    description: "Đầy đủ bút lông, mực, giấy và hướng dẫn chi tiết.",
    topics: ["Giao tiếp công sở"]
  },
  {
    id: 4,
    category: "Sách tham khảo",
    name: "Từ điển Hán Việt Hiện Đại",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgm9W3saf-1OfkDghA5ZDjH3H5ZQQ1Ss5827ks_KmawljKB-hcHwJW4g5CgJgiwaLp7hLgklekw0H_KWqn1CTvHIbszvKRnnjfOY5oiWWKfPKYGsMC6R5Pe5DIWuhVxc1kxrwmmTW5USIN9DwKp4wf8Od3lV61tV9Pplv0nprUBi6cdb0kLoN3N7eOlXRLRp-XcD3O1g8NSGdAzkx55NL9I2-kNFJilnVGGp2hPOoULsu6IAl6-les6NGuXDIQgstfC85NZhIBTyw",
    price: 180000,
    originalPrice: null,
    description: "Tra cứu nhanh chóng 50.000 từ vựng thông dụng.",
    topics: ["Luyện thi HSK"]
  },
  {
    id: 5,
    category: "Vở viết",
    name: "Vở tập viết chữ Hán kẻ ô vuông",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDm1Ik0zNR8jb04orcmpz2UB0wFPXtMwXyxcgsMlBUZZh7tZTltsglVPHcUjxDxnQ3IjJh8Pv5kz_SFHBvzGw4kIUVrKRLDUcNZKN9bNiBUv9AYzl1ZyR5SuwCBqNaNHrmsDtZlDr7qOmQMB63oCvEqTG9cX8Ax_Q3D8CmyLa8IOUnnjB5TxlL7YttblHSiQIB1ucQ5qqvInbs8soA38Pe5y8B3gSGAOWvXjfcdW6J8A2QdRxKzf1N1oebCV1gwYaW9bS9uTf2ZCdc",
    price: 15000,
    originalPrice: null,
    description: "Giấy chất lượng cao, không lem mực, chuẩn ô chữ điền.",
    topics: []
  },
  {
    id: 6,
    category: "Giáo trình",
    name: "301 Câu Đàm Thoại Tiếng Hoa",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwJfdfeC-_1yfVR9Dd-Q8RdlxXxGsPDHfAaKQ5vTc9OdjOMCZ93WpI2jCw2X7dzNQyJhZEdBx_xkyGt4xi3lpGINBSV9xY6-oExegPLcujqE7VkBKp_KdXRaRMLmJk5RvFIzzcJumr2bQmJ0sONyf-7OBXgGxUQabIUfxaJYZCSTz9neny-xiF7ItVR5-fww1S0g5DM2Nzn0sdCQBTs_-x3W2DKU9UjRLLrQZPAy9kZjRWQf48nVlGQM9jw4IcqscGndknyHAxPG0",
    price: 95000,
    originalPrice: null,
    badge: "bestseller",
    description: "Sách học giao tiếp cấp tốc hiệu quả nhất.",
    topics: ["Giao tiếp công sở"]
  }
];

// Filter categories (derived from product data)
const FILTER_CATEGORIES = [
  "Tất cả sản phẩm",
  ...Array.from(new Set(PRODUCTS_DATA.map((p) => p.category)))
];

// Quick filter chips
const QUICK_FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "new", label: "Sách mới" },
  { id: "bestseller", label: "Best Seller" },
  { id: "promotion", label: "Khuyến mãi" }
];

// Sort options
const SORT_OPTIONS = [
  { id: "newest", label: "Mới nhất" },
  { id: "price-asc", label: "Giá: Thấp đến Cao" },
  { id: "price-desc", label: "Giá: Cao đến Thấp" },
  { id: "bestselling", label: "Bán chạy nhất" }
];

// Product Card Component
function ProductCard({ product }) {
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
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {getBadgeContent() && (
          <div className={`absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded ${getBadgeStyle()}`}>
            {getBadgeContent()}
          </div>
        )}
        <button className="absolute bottom-3 right-3 size-10 rounded-full bg-white/90 backdrop-blur text-text-main shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-colors translate-y-14 group-hover:translate-y-0 duration-300">
          <span className="material-symbols-outlined">shopping_cart</span>
        </button>
      </div>

      <div className="flex flex-col p-4 gap-2 grow">
        <div className="text-xs text-text-muted font-medium uppercase">
          {product.category}
        </div>
        <Link to={`/products/${product.id}`} className="text-lg font-bold text-text-main leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </Link>
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="text-xl font-black text-primary">
            {product.price.toLocaleString('vi-VN')}₫
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.originalPrice.toLocaleString('vi-VN')}₫
            </span>
          )}
        </div>
        <p className="text-sm text-text-muted line-clamp-2 mt-1">
          {product.description}
        </p>
        <Link to={`/products/${product.id}`} className="mt-3 block w-full py-2.5 rounded-lg border border-[#e7f3f0] text-text-main font-bold text-sm hover:border-primary hover:text-primary transition-colors bg-transparent text-center">
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}

export default function Product() {
  const [selectedQuickFilter, setSelectedQuickFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);
  const [checkedCategories, setCheckedCategories] = useState(['Tất cả sản phẩm']);
  const MIN_PRICE = 1000; // minimum price filter (always applied)
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') setSortOpen(false);
    }
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  // Filter and sort products
  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    // always enforce base minimum
    if (p.price < MIN_PRICE) return false;

    // category
    if (!checkedCategories.includes('Tất cả sản phẩm') && !checkedCategories.includes(p.category)) {
      return false;
    }

    // price range input
    const minVal = priceRange.min !== '' ? Number(priceRange.min) : null;
    const maxVal = priceRange.max !== '' ? Number(priceRange.max) : null;
    if (minVal !== null && p.price < minVal) return false;
    if (maxVal !== null && p.price > maxVal) return false;

    // topic filtering (product must have at least one selected topic)
    if (selectedTopics.length > 0) {
      if (!p.topics || !p.topics.some((t) => selectedTopics.includes(t))) {
        return false;
      }
    }

    // search term matches name or category
    if (searchTerm.trim() !== '') {
      const term = searchTerm.trim().toLowerCase();
      if (!p.name.toLowerCase().includes(term) && !p.category.toLowerCase().includes(term)) {
        return false;
      }
    }

    return true;
  });

  return (
        <>
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-chinese-pattern overflow-x-hidden">
      {/* Header */}
       <div className="w-full bg-white dark:bg-surface-dark shadow-sm z-50 sticky top-0">
       <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">
        {/* LOGO */}
        <Link to="/Home" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none">
              TOXI
            </h1>
            <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">
              学以致用
            </p>
          </div>
        </Link>

        {/* SEARCH */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm sản phẩm, giáo trình, dụng cụ..."
              className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm focus:ring-2 focus:ring-secondary focus:bg-white focus:text-primary transition-all placeholder-white/60"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">
              search
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-6 shrink-0">
          {/* CART */}
          <div className="relative group cursor-pointer">
          <button className="flex-[1.5] px-8 py-5 bg-primary text-secondary font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 group">
      
      <span
        className="material-symbols-outlined group-hover:scale-110 transition-transform cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // không trigger click của button
          navigate("/cart");
        }}
      >
        shopping_cart
      </span>
      </button>
          </div>

        {/* Avatar */}
<div className="hidden sm:flex items-center">
  <div
    className="bg-center bg-no-repeat bg-cover rounded-full size-9 border-2 border-white shadow-sm cursor-pointer"
    style={{
      backgroundImage:
        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANadJSyOfDTclENxTAo2sw3Zjh7pnp9KKg6h2O4DPIjBYyTW71cyBejL6epjf4bncopuLtFsS_S28mcoEHv7h1zzA9eQlltIXtwDZfsYjCeMxjDdAPnQkvKLCnuYjrECMphza2dJScBgPHRGqoIUccTQUhZWLevuqN5gbt-Gdi0v_35rRW79Z__1-tjeWPfsTpAYBzqjrPwvrzKlKTY8K7uLo1-SOwA3-7T7eW-upJSD1KOVr7iIff5utR8-CjWJTlAFJYfsztm9s")',
    }}
  />
</div>

          {/* MOBILE MENU */}
          <button className="md:hidden text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
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
<span className="material-symbols-outlined text-sm">local_fire_department</span>
                                    Best Seller
                                </div>
<h1 className="text-text-main text-3xl md:text-5xl font-black leading-tight tracking-tight">
                                    Học để ứng dụng <br/>
<span className="text-primary text-4xl md:text-6xl font-serif italic">学以致用</span>
</h1>
<p className="text-text-muted text-base md:text-lg max-w-md">
                                    Khám phá kho tàng sách, giáo trình và công cụ hỗ trợ học tiếng Trung chất lượng cao giúp bạn chinh phục ngôn ngữ nhanh chóng.
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
<img className="relative z-10 w-full max-w-sm rounded-xl shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500 object-cover aspect-[4/3]" data-alt="Stack of Chinese learning books with a cup of tea on a table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtDgZmJTafnXR_oIqQ4kS5WawboHOzNdZ46WB1EWDj1SvItkdCx5PEIwrV9US_By5F0DwtRTIoB3M-mpG06FLANkuNPRnokuWCKuPLYTiDQIWTR9igUBvrhJC1KIEo8gMTEDboOsAdMjFb6beBNlyDDQzRESoyQ5AjoYwyrlvQxU1nNZbi0im48X2DVp858-SOUk4EmFx2XeGoWQj1xyXQJMF2yyfOlhZEGx58wRXvoE-XNkX4jo_W6sJPFAlrCM3V92pczNBzZ3E"/>
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
              <button className="text-xs text-text-muted hover:text-primary underline">
                Xóa tất cả
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-text-muted">
                Danh mục
              </h4>

              {FILTER_CATEGORIES.map((category, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={checkedCategories.includes(category)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (checked) {
                        if (category === 'Tất cả sản phẩm') {
                          // select all, clear others
                          setCheckedCategories(['Tất cả sản phẩm']);
                        } else {
                          // add category and remove "all" if present
                          setCheckedCategories(prev => [
                            ...prev.filter(c => c !== 'Tất cả sản phẩm'),
                            category,
                          ]);
                        }
                      } else {
                        // uncheck
                        setCheckedCategories(prev => prev.filter(c => c !== category));
                      }
                    }}
                    defaultChecked={category === "Tất cả sản phẩm"}
                    className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary/50 size-5"
                  />
                  <span className="text-text-main group-hover:text-primary transition-colors">
                    {category}
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
                  type="number"
                  placeholder="Từ"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Đến"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
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

            {/* Topics */}
            <div className="flex flex-col gap-3 pt-4 border-t border-[#e7f3f0]">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-text-muted">
                Chủ đề
              </h4>

              {[
                "Luyện thi HSK",
                "Giao tiếp công sở",
                "Tiếng Trung du lịch",
              ].map((topic, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(topic)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedTopics(prev => {
                        if (checked) return [...prev, topic];
                        return prev.filter(t => t !== topic);
                      });
                    }}
                    className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary/50 size-5"
                  />
                  <span className="text-text-main group-hover:text-primary transition-colors">
                    {topic}
                  </span>
                </label>
              ))}
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
                    ? 'bg-primary text-background-dark hover:scale-105'
                    : 'bg-white border border-[#e7f3f0] text-text-main hover:border-primary hover:text-primary font-medium'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown moved to top-right of the product grid (see wrapper below) */}
        </div>
      </div>

      {/* Grid (wrapper with absolute sort control at top-right) */}
      <div className="relative">
        {/* Absolute sort dropdown placed over the grid, right aligned */}
        <div className="absolute right-0 -top-10 md:-top-8 lg:-top-6 z-30">
          <div ref={sortRef} className="flex items-center gap-2 shrink-0 min-w-max">
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
                {SORT_OPTIONS.find((opt) => opt.id === sortBy)?.label || 'Mới nhất'}
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

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      </div>
{/* Pagination */}
<div className="flex items-center justify-center gap-2 mt-10">
  <button className="flex items-center justify-center size-10 rounded-lg border border-[#e7f3f0] bg-white text-text-main hover:border-primary hover:text-primary transition-colors disabled:opacity-50">
    <span className="material-symbols-outlined text-sm">
      arrow_back_ios_new
    </span>
  </button>

  <button className="flex items-center justify-center size-10 rounded-lg bg-primary text-background-dark font-bold shadow-md">
    1
  </button>

  <button className="flex items-center justify-center size-10 rounded-lg border border-[#e7f3f0] bg-white text-text-main hover:border-primary hover:text-primary transition-colors font-medium">
    2
  </button>

  <button className="flex items-center justify-center size-10 rounded-lg border border-[#e7f3f0] bg-white text-text-main hover:border-primary hover:text-primary transition-colors font-medium">
    3
  </button>

  <span className="flex items-center justify-center size-10 text-text-muted">
    ...
  </span>

  <button className="flex items-center justify-center size-10 rounded-lg border border-[#e7f3f0] bg-white text-text-main hover:border-primary hover:text-primary transition-colors font-medium">
    8
  </button>

  <button className="flex items-center justify-center size-10 rounded-lg border border-[#e7f3f0] bg-white text-text-main hover:border-primary hover:text-primary transition-colors disabled:opacity-50">
    <span className="material-symbols-outlined text-sm">
      arrow_forward_ios
    </span>
  </button>
</div>


    </main>
    </div>
        </>
    )
};
