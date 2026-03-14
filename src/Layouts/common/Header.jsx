
import { Link,useNavigate  } from "react-router-dom";
import { useState,useRef, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

import toxiLogo from "../../assets/image/LOGO (1).png";

 import { useCart } from "../../context/CartContext";
const Header = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    try {
      return typeof window !== "undefined" ? localStorage.getItem("language") || "VN" : "VN";
    } catch (e) {
      return "VN";
    }
  });


 // Thêm state avatar (đặt cạnh các useState khác)
const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem("avatarUrl") || null);
 const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
const { cartCount } = useCart();

 const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "User";
  const isLoggedIn = !!token;

useEffect(() => {
  const handleAvatarUpdated = (e) => {
      setAvatarUrl(e.detail); // null nếu xóa, URL nếu upload mới
    };
  window.addEventListener("avatarUpdated", handleAvatarUpdated);
  return () => window.removeEventListener("avatarUpdated", handleAvatarUpdated);
}, []);
 useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("guestId");
     localStorage.removeItem("avatarUrl");
    setMenuOpen(false);
    navigate("/Home");
    window.location.reload();
  };
  
    const AvatarDisplay = ({ size = "w-9 h-9", textSize = "text-sm" }) => (
    avatarUrl ? (
      <img
        src={avatarUrl}
        alt="avatar"
        className={`${size} rounded-full object-cover border-2 border-white/30`}
      />
    ) : (
      <div className={`${size} rounded-full bg-primary flex items-center justify-center text-white font-bold ${textSize} shadow-md`}>
        {userName.charAt(0).toUpperCase()}
      </div>
    )
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const q = (searchQuery || "").trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="bg-surface text-slate-900 antialiased ">
      <div className="flex flex-col lg:flex-row ">
        {/* SIDEBAR */}
     <aside
  className={`
    fixed top-0 bottom-0 left-0
    lg:w-64 w-64
    bg-primary dark:bg-slate-950 
    text-white
    flex flex-col
    z-50 shadow-xl
    overflow-y-auto
    lg:border-r border-secondary/20 dark:border-slate-800/50
    bg-chinese-pattern
    transition-all duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
>
          {/* Logo */}
          <div className="px-3 py-2.5 flex flex-col items-center border-b border-white/10 relative">
            <div className="h-16 w-16 rounded-2xl  text-primary flex items-center ">
              <img src={toxiLogo} alt="TOXI Logo" className=" object-contain" />
            </div>

            <h1 className="text-3xl font-black tracking-tighter text-white">
              TOXI
            </h1>

            <div className="flex items-center gap-2 mt-1">
              <div className="h-[1px] w-4 bg-secondary"></div>
              <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">
                Education
              </p>
              <div className="h-[1px] w-4 bg-secondary"></div>
            </div>
          </div>

          {/* NAV */}
       <nav className="flex-1 px-4 py-6 space-y-2">
  {/* TRANG CHỦ */}
  <a
    href="/Home"
    className="group flex items-center gap-3 px-4 py-4 rounded-xl text-white bg-white/10 shadow-lg border border-secondary/30 transition-all"
  >
    <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">
      home_app_logo
    </span>
    <span className="font-bold">Trang chủ</span>
  </a>

  {[
    { icon: "self_improvement", label: "Khóa học", to: "/course" },
    { icon: "school", label: "Sản phẩm", to: "/store" },
     { icon: "article", label: "Tiếng Trung Cơ Bản", to: "#" },
    { icon: "chat", label: "Tiếng Trung Nâng Cao", to: "#" },
   
  ].map((item) => (
    <Link
      key={item.label}
      to={item.to}
      className="group w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-300 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-slate-800/50 hover:text-white dark:hover:text-white transition-all border border-transparent hover:border-secondary/30 dark:hover:border-slate-700 text-left bg-transparent"
    >
      <span className="material-symbols-outlined text-secondary/70 group-hover:text-secondary group-hover:scale-110 transition-transform">
        {item.icon}
      </span>
      <span className="font-medium">{item.label}</span>
    </Link>
  ))}

  {/* QUICK LINKS */}
{/* QUICK LINKS */}
<div className="mt-4 pt-4 border-t border-white/10">
  <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
    Danh mục nhanh
  </p>

  {[
    { icon: "article", label: "Blog", to: "/blog" },
    { icon: "quiz", label: "Luyện thi HSK", to: "/Practice" },
    { icon: "chat", label: "Giao tiếp", to: "/giaotiep" },
    
  ].map((item) => (
    <Link
      key={item.label}
      to={item.to}
      className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-all border border-transparent hover:border-secondary/30"
    >
      <span className="material-symbols-outlined text-secondary/70 group-hover:text-secondary group-hover:scale-110 transition-transform">
        {item.icon}
      </span>
      <span className="font-medium">{item.label}</span>
    </Link>
  ))}
</div>
</nav>

          {/* SUPPORT */}
          <div className="p-6 bg-primary-dark/50 border-t border-white/10 text-center relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-white/5 pointer-events-none">
              <span className="material-symbols-outlined text-6xl">
                support_agent
              </span>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-secondary/50 text-secondary mb-3 bg-primary/50">
                <span className="material-symbols-outlined">
                  headset_mic
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-1">Cần tư vấn ngay?</p>
              <p className="text-lg font-bold text-white tracking-wide">
                0987 654 321
              </p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-white hover:bg-white/10 p-2 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* MAIN */}

        <main className="flex-1 lg:ml-72 bg-slate-50 relative">
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-6 py-3 flex justify-between items-center overflow-visible">


            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-primary"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>

              <form
                onSubmit={handleSearch}
                className="hidden md:flex relative max-w-md w-80"
                role="search"
                aria-label="Tìm kiếm"
              >
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                  search
                </span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="Tìm kiếm khóa học, tài liệu..."
                  aria-label="Tìm kiếm khóa học, tài liệu"
                 className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-primary text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                />
                <button type="submit" className="sr-only">Tìm</button>
              </form>
            </div>


      <div className="flex items-center gap-4">
     <Link to="/cart" className="relative cursor-pointer">
  <span className="material-symbols-outlined text-[28px] text-yellow-400 hover:text-secondary transition-colors">
    shopping_cart
  </span>
  {cartCount > 0 && (
    <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
      {cartCount}
    </span>
  )}
</Link>

     <div className="hidden sm:flex items-center bg-slate-100 rounded-full p-1 text-xs font-bold text-slate-600">

                <button className="px-3 py-1 bg-white shadow-sm rounded-full text-primary">

                  VN
                </button>
                <button
                  onClick={() => setLanguage("CN")}
                  title="中文"
                  aria-pressed={language === "CN"}
                  className={`px-3 py-1 rounded-full ${language === "CN" ? "bg-white shadow-sm text-primary" : "hover:text-primary"}`}
                >
                  CN
                </button>
              </div>
              <ThemeToggle />
              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

              {isLoggedIn ? (
  <div className="relative z-[9999]" ref={menuRef}>
    {/* Avatar button */}
      <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 hover:bg-slate-100 rounded-full px-2 py-1 transition-all"
                  >
                    <AvatarDisplay />
                    <span className="hidden sm:block text-sm font-semibold text-slate-700 max-w-[100px] truncate">
                      {userName}
                    </span>
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">
                      {menuOpen ? "expand_less" : "expand_more"}
                    </span>
                  </button>


    {/* Dropdown */}
    {menuOpen && (
  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100   "
 style={{ 
      zIndex: 99999,
      boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
    }}
 >
    {/* ⭐ User info header */}
    <div className="px-4 py-4 border-b border-slate-100">
      <div className="flex items-center gap-3">
       <AvatarDisplay size="w-11 h-11" textSize="text-lg" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-slate-800 text-sm truncate">{userName}</p>
          </div>
          <p className="text-xs text-slate-400 truncate">
            {localStorage.getItem("email") || "Học viên TOXI"}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Tiến độ tuần này</span>
          <span className="font-bold text-primary">65%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div className="bg-primary h-1.5 rounded-full" style={{ width: "65%" }}></div>
        </div>
      </div>
    </div>

    {/* ⭐ Menu items */}
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
          <span className="material-symbols-outlined text-slate-400 text-[20px]">
            {item.icon}
          </span>
          {item.label}
        </Link>
      ))}
    </div>

    {/* ⭐ Logout */}
    <div className="border-t border-slate-100 py-2">
      <button
        onClick={handleLogout}
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
  <>
    <Link to="/login">
      <button className="hidden sm:block text-slate-600 font-bold text-sm hover:text-primary transition-colors">
        Đăng nhập
      </button>
    </Link>
    <Link to="/register">
      <button className="bg-primary text-secondary px-5 py-2 rounded-full font-bold text-sm shadow-lg shadow-primary/20 border-b-2 border-primary-dark hover:bg-primary-dark transition-all">
        Đăng ký ngay
      </button>
    </Link>
  </>
)}
            </div>
          </header>

          <div className="p-0">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Header;