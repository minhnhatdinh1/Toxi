import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/LOGO (1).png";
import { useCart } from "../../context/CartContext";
import NotificationBell from "../../components/NotificationBell";

export default function StoreTopHeader() {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem("avatarUrl") || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseIndex, setCourseIndex] = useState([]);
  const [courseSuggestions, setCourseSuggestions] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName") || "User";
  const email = localStorage.getItem("email") || "Hoc vien TOXI";
  const isLoggedIn = !!token;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestionsOpen(false);
      }
    };

    const handleAvatarUpdated = (event) => {
      setAvatarUrl(event.detail || localStorage.getItem("avatarUrl") || "");
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("avatarUpdated", handleAvatarUpdated);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("avatarUpdated", handleAvatarUpdated);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/courses");
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
    const keyword = searchQuery.trim().toLowerCase();

    if (!keyword) {
      setCourseSuggestions([]);
      return;
    }

    const suggestions = courseIndex
      .filter((course) =>
        [course.title, course.description, course.courseType, course.level]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(keyword)
      )
      .sort((a, b) => {
        const aStarts = a.title.toLowerCase().startsWith(keyword) ? 0 : 1;
        const bStarts = b.title.toLowerCase().startsWith(keyword) ? 0 : 1;
        return aStarts - bStarts || a.title.length - b.title.length;
      })
      .slice(0, 6);

    setCourseSuggestions(suggestions);
  }, [courseIndex, searchQuery]);

  const handleLogout = () => {
    localStorage.clear();
    setMenuOpen(false);
    navigate("/Home");
    window.location.reload();
  };

  const AvatarDisplay = ({ size = "h-9 w-9", textSize = "text-sm" }) =>
    avatarUrl ? (
      <img
        src={avatarUrl}
        alt={userName}
        className={`${size} rounded-full border-2 border-white/20 object-cover`}
      />
    ) : (
      <div
        className={`${size} flex items-center justify-center rounded-full bg-secondary font-bold text-primary ${textSize}`}
      >
        {userName.charAt(0).toUpperCase()}
      </div>
    );

  const handleSearch = (event) => {
    event.preventDefault();
    const keyword = searchQuery.trim();
    if (!keyword) return;
    setSuggestionsOpen(false);
    navigate(`/course?keyword=${encodeURIComponent(keyword)}`);
  };

  const handleSuggestionSelect = (course) => {
    if (!course?.id) return;
    setSearchQuery(course.title || "");
    setSuggestionsOpen(false);
    navigate(`/courses/${course.id}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
      <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none" />
      <div className="relative z-10 mx-auto flex max-w-[1920px] items-center justify-between gap-8 px-4 py-4 md:px-8">
        <Link to="/Home" className="flex shrink-0 items-center gap-3">
          <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
          <div>
            <h1 className="text-2xl font-black leading-none tracking-tighter">TOXI</h1>
            <p className="text-[8px] font-bold uppercase tracking-widest text-secondary">
              学以致用
            </p>
          </div>
        </Link>

        <div className="hidden max-w-2xl flex-1 md:block">
          <div ref={searchRef} className="group relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSuggestionsOpen(true)}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSuggestionsOpen(true);
                }}
                placeholder="Tim kiem khoa hoc, giao trinh, dung cu..."
                className="w-full rounded-full border border-white/20 bg-white/10 py-2.5 pl-12 pr-4 text-sm text-white placeholder-white/60 transition-all focus:bg-white focus:text-primary focus:ring-2 focus:ring-secondary"
              />
              <button type="submit" className="sr-only">
                Tim
              </button>
            </form>
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">
              search
            </span>
            {suggestionsOpen && searchQuery.trim() ? (
              <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-[80] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                {courseSuggestions.length > 0 ? (
                  <>
                    <div className="border-b border-slate-100 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Goi y khoa hoc
                    </div>
                    {courseSuggestions.map((course) => (
                      <button
                        key={course.id}
                        type="button"
                        onMouseDown={(event) => {
                          event.preventDefault();
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
                            {[course.courseType, course.level].filter(Boolean).join(" - ") || "Khoa hoc TOXI"}
                          </span>
                        </span>
                      </button>
                    ))}
                  </>
                ) : (
                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      setSuggestionsOpen(false);
                      navigate(`/course?keyword=${encodeURIComponent(searchQuery.trim())}`);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-slate-50"
                  >
                    <span className="material-symbols-outlined text-[18px] text-slate-400">
                      search
                    </span>
                    <span className="text-sm text-slate-600">
                      Tim khoa hoc voi tu khoa <span className="font-bold text-primary">"{searchQuery.trim()}"</span>
                    </span>
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-6">
          {isLoggedIn ? <NotificationBell audience="user" /> : null}
          <Link to="/cart" className="relative cursor-pointer p-1">
            <span className="material-symbols-outlined text-[28px] text-secondary transition-colors hover:text-white">
              shopping_cart
            </span>
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>

          {isLoggedIn ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full px-2 py-1 transition-all hover:bg-white/10"
              >
                <AvatarDisplay />
                <span className="hidden text-sm font-semibold sm:block">{userName}</span>
                <span className="material-symbols-outlined text-[18px] text-white/60">
                  {menuOpen ? "expand_less" : "expand_more"}
                </span>
              </button>

              {menuOpen ? (
                <div
                  className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-slate-100 bg-white shadow-xl"
                  style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
                >
                  <div className="border-b border-slate-100 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <AvatarDisplay size="h-11 w-11" textSize="text-lg" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-slate-800">{userName}</p>
                        <p className="truncate text-xs text-slate-400">{email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    {[
                      { icon: "person", label: "Trang ca nhan", to: "/Profile" },
                      { icon: "school", label: "Khoa hoc cua toi", to: "/MyCourse" },
                      { icon: "shopping_bag", label: "Don hang", to: "/MyProduct" },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                      >
                        <span className="material-symbols-outlined text-[20px] text-slate-400">
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 py-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                    >
                      <span className="material-symbols-outlined text-[20px]">logout</span>
                      Dang xuat
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="hidden items-center gap-4 sm:flex">
              <Link to="/login" className="text-sm font-bold transition-colors hover:text-secondary">
                Dang nhap
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-secondary px-6 py-2.5 text-sm font-bold text-primary shadow-lg transition-all hover:bg-secondary-dark"
              >
                Dang ky tu van
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
