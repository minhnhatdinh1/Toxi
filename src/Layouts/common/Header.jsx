import { Link,useNavigate, useLocation  } from "react-router-dom";
import { useState,useRef, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import NotificationBell from "../../components/NotificationBell";

import toxiLogo from "../../assets/image/LOGO (1).png";

 import { useCart } from "../../context/CartContext";
const BASE_URL = import.meta.env.VITE_API_URL;

const Header = ({ children }) => {
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/tiengtrungtoxi",
      label: "Mở Facebook TOXI",
      className: "border-[#1877F2]/20 bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4H16V5.5c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.2v1.8H9V14h2.3v7h2.2z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@toxi_loveyou?fbclid=IwY2xjawQzfN9leHRuA2FlbQIxMABicmlkETFIYmlVUWRkU0pTT3hsa0I3c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHvdx93FCq6texWCVCTLMCBrhYscj6BLZrffClcBCUrop-yWWdZ5zaxd7nTKG_aem_fedYlW9LNEhwZ64U8weIMg",
      label: "Mở TikTok TOXI",
      className: "border-slate-300 bg-black text-white hover:bg-slate-900 hover:text-white",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M16.6 3c.3 1.8 1.4 3.1 3.1 3.6v2.6c-1.2 0-2.4-.4-3.4-1.1v5.2c0 3-2.2 5.3-5.3 5.3S5.7 16.3 5.7 13.3 8 8 11 8c.3 0 .6 0 .8.1v2.7c-.3-.1-.5-.1-.8-.1-1.4 0-2.5 1.1-2.5 2.6S9.6 16 11 16s2.6-1.1 2.6-2.6V3h3z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#",
      label: "Mở YouTube TOXI",
      className: "border-[#FF0000]/20 bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2c-1.8-.5-7.6-.5-7.6-.5s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2C2 9 2 12 2 12s0 3 .4 4.8a2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2c.4-1.8.4-4.8.4-4.8s0-3-.4-4.8zM10 15.2V8.8L15.5 12 10 15.2z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      label: "Mở Instagram TOXI",
      className: "border-fuchsia-200 bg-gradient-to-br from-[#F58529]/15 via-[#DD2A7B]/15 to-[#515BD4]/15 text-[#DD2A7B] hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#515BD4] hover:text-white",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9zm9.6 1.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z" />
        </svg>
      ),
    },
  ];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    try {
      return typeof window !== "undefined" ? localStorage.getItem("language") || "VN" : "VN";
    } catch (e) {
      return "VN";
    }
  });


 // Them state avatar (dat canh cac useState khac)
const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem("avatarUrl") || null);
 const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
const { cartCount } = useCart();

 const [searchQuery, setSearchQuery] = useState("");
 const [courseSuggestions, setCourseSuggestions] = useState([]);
 const [suggestionsOpen, setSuggestionsOpen] = useState(false);
 const [courseIndex, setCourseIndex] = useState([]);
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "User";
  const isLoggedIn = !!token;

useEffect(() => {
  const handleAvatarUpdated = (e) => {
      setAvatarUrl(e.detail); // null neu xoa, URL neu upload moi
    };
  window.addEventListener("avatarUpdated", handleAvatarUpdated);
  return () => window.removeEventListener("avatarUpdated", handleAvatarUpdated);
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
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/courses`);
        const payload = await response.json();
        const rawCourses = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.content)
          ? payload.content
          : [];

        const normalizedCourses = rawCourses
          .map((course) => ({
            id: course.courseId || course.id,
            title: course.title || course.courseTitle || "",
            description: course.description || course.shortDescription || "",
            courseType: course.courseType || course.type || "",
            level: course.level || course.hsklevel || "",
          }))
          .filter((course) => course.id && course.title);

        if (isMounted) {
          setCourseIndex(normalizedCourses);
        }
      } catch (error) {
        if (isMounted) {
          setCourseIndex([]);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);
 useEffect(() => {
    const keyword = (searchQuery || "").trim().toLowerCase();

    if (!keyword) {
      setCourseSuggestions([]);
      return;
    }

    const suggestions = courseIndex
      .filter((course) => {
        const searchText = [
          course.title,
          course.description,
          course.courseType,
          course.level,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchText.includes(keyword);
      })
      .sort((a, b) => {
        const aStarts = a.title.toLowerCase().startsWith(keyword) ? 0 : 1;
        const bStarts = b.title.toLowerCase().startsWith(keyword) ? 0 : 1;
        return aStarts - bStarts || a.title.length - b.title.length;
      })
      .slice(0, 6);

    setCourseSuggestions(suggestions);
  }, [courseIndex, searchQuery]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("role");
    localStorage.removeItem("guestId");
    localStorage.removeItem("avatarUrl");
    setMenuOpen(false);
    navigate("/home");
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
    setSuggestionsOpen(false);
    navigate(`/course?keyword=${encodeURIComponent(q)}`);
    setSidebarOpen(false);
  };
  const handleSuggestionSelect = (course) => {
    if (!course?.id) return;
    setSearchQuery(course.title || "");
    setSuggestionsOpen(false);
    setSidebarOpen(false);
    navigate(`/courses/${course.id}`);
  };

  const navItems = [
    { icon: "home_app_logo", label: "Trang chủ", to: "/home" },
    { icon: "self_improvement", label: "Khóa học", to: "/course" },
    { icon: "school", label: "Sản phẩm", to: "/store" },
    { icon: "school", label: "Sản phẩm", to: "/store" },
  ];

  const quickLinks = [
    { icon: "article", label: "Blog", to: "/blog" },
    { icon: "quiz", label: "Luyện thi HSK", to: "/Practice" },
    { icon: "chat", label: "Giới thiệu", to: "/blogintroduce" },
  ];

  const isActiveLink = (to) => {
    const pathname = location.pathname.toLowerCase();
    const target = String(to).toLowerCase();
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  return (
    <div className="overflow-x-hidden bg-surface text-slate-900 antialiased">
      <div className="lg:flex">
        {/* SIDEBAR */}
     <aside
  className={`
    fixed top-0 bottom-0 left-0
    w-64
    bg-white
    text-slate-900
    flex flex-col
    z-50 shadow-xl
    overflow-y-auto
    lg:border-r border-slate-200
    transition-all duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
>
          {/* Logo */}
          <div className="px-3 py-2.5 flex flex-col items-center border-b border-slate-200 relative bg-white">
            <div className="h-16 w-16 rounded-2xl  text-primary flex items-center ">
              <img src={toxiLogo} alt="TOXI Logo" className=" object-contain" />
            </div>

            <h1 className="text-3xl font-black tracking-tighter text-primary">
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
       <nav className="flex-1 px-5 py-6 space-y-2.5 bg-white">
  {/* TRANG CHU */}
  <a
    href="/home"
    className={`group flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all ${
      isActiveLink("/home")
        ? "text-white bg-primary shadow-lg border-primary"
        : "text-slate-600 bg-transparent border-transparent hover:bg-blue-50 hover:text-primary hover:border-blue-100"
    }`}
  >
    <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${
      isActiveLink("/home") ? "text-secondary" : "text-slate-400 group-hover:text-primary"
    }`}>
      home_app_logo
    </span>
    <span className="font-bold">Trang chủ</span>
  </a>

  {[
    { icon: "self_improvement", label: "Khóa học", to: "/course" },
    { icon: "school", label: "Sản phẩm", to: "/store" },
     
   
  ].map((item) => (
    <Link
      key={item.label}
      to={item.to}
      className={`group w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all border text-left ${
        isActiveLink(item.to)
          ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
          : "text-slate-600 bg-transparent hover:bg-blue-50 hover:text-primary border-transparent hover:border-blue-100"
      }`}
    >
      <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${
        isActiveLink(item.to) ? "text-secondary" : "text-slate-400 group-hover:text-primary"
      }`}>
        {item.icon}
      </span>
      <span className="font-medium">{item.label}</span>
    </Link>
  ))}

  {/* QUICK LINKS */}
{/* QUICK LINKS */}
<div className="mt-5 pt-4 border-t border-slate-200">
  <p className="px-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em] mb-2.5">
    Danh mục nhanh
  </p>

  {[
    { icon: "article", label: "Blog", to: "/blog" },
    { icon: "quiz", label: "Luyện thi HSK", to: "/Practice" },
    { icon: "chat", label: "Giới thiệu", to: "/blogintroduce" },
    
  ].map((item) => (
    <Link
      key={item.label}
      to={item.to}
      className={`group flex items-center gap-3 px-5 py-3 rounded-2xl transition-all border ${
        isActiveLink(item.to)
          ? "bg-blue-50 text-primary border-blue-100"
          : "text-slate-600 hover:bg-blue-50 hover:text-primary border-transparent hover:border-blue-100"
      }`}
    >
      <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${
        isActiveLink(item.to) ? "text-primary" : "text-slate-400 group-hover:text-primary"
      }`}>
        {item.icon}
      </span>
      <span className="font-medium">{item.label}</span>
    </Link>
  ))}
</div>
</nav>

          {/* SUPPORT */}
          <div className="p-6 bg-white border-t border-slate-200 text-center relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-primary/5 pointer-events-none">
              <span className="material-symbols-outlined text-6xl">
                support_agent
              </span>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-primary/10 text-primary mb-3 bg-slate-50 shadow-sm">
                <span className="material-symbols-outlined">
                  headset_mic
                </span>
              </div>

              <p className="text-xs text-slate-500 mb-1">Cần tư vấn ngay?</p>
              <p className="text-lg font-bold text-primary tracking-wide">
                0987 654 321
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition hover:-translate-y-0.5 ${item.className}`}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-4 top-4 rounded-lg p-2 text-slate-500 transition-all hover:bg-slate-100 hover:text-primary lg:hidden"
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

     <main className="relative min-h-screen w-full overflow-x-hidden bg-slate-50 lg:ml-64 lg:flex-1">
          <header className="sticky top-0 z-[60] flex items-center justify-between overflow-visible border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-md sm:px-6">


            <div className="relative flex min-w-0 items-center gap-3 sm:gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-primary"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>

              <form
                ref={searchRef}
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
                  onFocus={() => setSuggestionsOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSuggestionsOpen(true);
                  }}
                  type="text"
                  placeholder="Tìm kiếm khóa học, tài liệu..."
                  aria-label="Tìm kiếm khóa học, tài liệu"
                 className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-primary text-slate-700 placeholder-slate-400"
                />
                <button type="submit" className="sr-only">Tìm</button>
              </form>
              {suggestionsOpen && searchQuery.trim() ? (
                <div className="absolute left-0 top-[calc(100%+10px)] z-[90] hidden w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl md:block">
                  {courseSuggestions.length > 0 ? (
                    <>
                      <div className="border-b border-slate-100 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        Gợi ý khóa học
                      </div>
                      {courseSuggestions.map((course) => (
                        <button
                          key={course.id}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSuggestionSelect(course);
                          }}
                          className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50"
                        >
                          <span className="material-symbols-outlined mt-0.5 text-[18px] text-slate-400">
                            school
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-slate-700">
                              {course.title}
                            </span>
                            <span className="block truncate text-xs text-slate-400">
                              {[course.courseType, course.level].filter(Boolean).join(" - ") || "Khóa học TOXI"}
                            </span>
                          </span>
                        </button>
                      ))}
                    </>
                  ) : (
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSuggestionsOpen(false);
                        navigate(`/course?keyword=${encodeURIComponent(searchQuery.trim())}`);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-slate-50"
                    >
                      <span className="material-symbols-outlined text-[18px] text-slate-400">
                        search
                      </span>
                      <span className="text-sm text-slate-600">
                        Tìm khóa học với từ khóa <span className="font-bold text-primary">"{searchQuery.trim()}"</span>
                      </span>
                    </button>
                  )}
                </div>
              ) : null}
            </div>


      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
     {isLoggedIn ? <NotificationBell audience="user" className="hidden sm:block" panelClassName="right-0" /> : null}
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
                  title="ä¸­æ–‡"
                  aria-pressed={language === "CN"}
                  className={`px-3 py-1 rounded-full ${language === "CN" ? "bg-white shadow-sm text-primary" : "hover:text-primary"}`}
                >
                  CN
                </button>
              </div>
              <div className="scale-90 sm:scale-100">
                <ThemeToggle />
              </div>
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
    {/* User info header */}
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
          <span className="material-symbols-outlined text-slate-400 text-[20px]">
            {item.icon}
          </span>
          {item.label}
        </Link>
      ))}
    </div>

    {/* Logout */}
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

          <div className="pt-0">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Header;



