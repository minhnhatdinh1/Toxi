import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/image/LOGO (1).png";
import { useCart } from "../../../context/CartContext";
import NotificationBell from "../../../components/NotificationBell";

export default function MyHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem("avatarUrl") || "");
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  const userName = localStorage.getItem("userName") || "Hoc vien";
  const email = localStorage.getItem("email") || "Hoc vien TOXI";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleAvatarUpdated = (event) => {
      setAvatarUrl(event.detail || localStorage.getItem("avatarUrl") || "");
    };

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("avatarUpdated", handleAvatarUpdated);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("avatarUpdated", handleAvatarUpdated);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Home");
    window.location.reload();
  };

  const menuItems = [
    { icon: "school", label: "Khoa hoc cua toi", to: "/MyCourse" },
    { icon: "shopping_bag", label: "Don hang", to: "/MyProduct" },
    { icon: "bookmarks", label: "Tu vung da luu", to: "/MyVocabulary" },
    { icon: "person", label: "Thong tin ca nhan", to: "/Profile" },
  ];

  return (
    <header className="sticky top-0 z-[100] bg-primary text-white shadow-xl">
      <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none" />
      <div className="relative z-10 mx-auto flex max-w-[1920px] items-center justify-between gap-4 px-4 py-4 md:px-8">
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
          <div className="group relative">
            <input
              type="text"
              placeholder="Tim kiem san pham, giao trinh, dung cu..."
              className="w-full rounded-full border border-white/20 bg-white/10 py-2.5 pl-12 pr-4 text-sm text-white placeholder-white/60 transition-all focus:bg-white focus:text-primary focus:ring-2 focus:ring-secondary"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">
              search
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <NotificationBell audience="user" />

          <Link to="/cart" className="relative cursor-pointer p-2">
            <span className="material-symbols-outlined text-[28px] text-secondary transition-colors hover:text-white">
              shopping_cart
            </span>
            {cartCount > 0 ? (
              <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-red-500 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex items-center gap-2 rounded-full px-2 py-1 transition-all hover:bg-white/10"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="h-9 w-9 rounded-full border-2 border-white/20 object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="hidden text-sm font-semibold sm:block">{userName}</span>
              <span className="material-symbols-outlined text-[18px] text-white/60">
                {menuOpen ? "expand_less" : "expand_more"}
              </span>
            </button>

            {menuOpen ? (
              <div
                className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-slate-100 bg-white shadow-xl"
                style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
              >
                <div className="border-b border-slate-100 px-4 py-4">
                  <div className="flex items-center gap-3">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={userName}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-slate-800">{userName}</p>
                      <p className="text-xs text-slate-400">{email}</p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
                          isActive
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px] text-slate-400">
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    );
                  })}
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
        </div>
      </div>
    </header>
  );
}
