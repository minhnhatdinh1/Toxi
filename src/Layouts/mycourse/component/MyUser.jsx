import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function MyUser({ mobile = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    userName: localStorage.getItem("userName") || "Hoc vien",
    email: localStorage.getItem("email") || "",
    avatarUrl: localStorage.getItem("avatarUrl") || "",
  });

  useEffect(() => {
    const syncProfile = () => {
      setProfile({
        userName: localStorage.getItem("userName") || "Hoc vien",
        email: localStorage.getItem("email") || "",
        avatarUrl: localStorage.getItem("avatarUrl") || "",
      });
    };

    const handleAvatarUpdated = (event) => {
      setProfile((prev) => ({
        ...prev,
        avatarUrl: event.detail || localStorage.getItem("avatarUrl") || "",
      }));
    };

    window.addEventListener("storage", syncProfile);
    window.addEventListener("avatarUpdated", handleAvatarUpdated);

    return () => {
      window.removeEventListener("storage", syncProfile);
      window.removeEventListener("avatarUpdated", handleAvatarUpdated);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Home");
    window.location.reload();
  };

  const navItems = [
    { icon: "school", label: "Khoa hoc cua toi", to: "/MyCourse" },
    { icon: "person", label: "Thong tin ca nhan", to: "/Profile" },
    { icon: "bookmarks", label: "Tu vung da luu", to: "/MyVocabulary" },
    { icon: "receipt_long", label: "Lich su don hang", to: "/MyProduct" },
  ];

  return (
    <aside className={`${mobile ? "block" : "hidden lg:block"} sticky top-24 lg:col-span-3`}>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col items-center border-b border-slate-100 bg-slate-50/50 p-6">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.userName}
              className="mb-3 size-20 rounded-full border-4 border-white object-cover shadow-sm"
            />
          ) : (
            <div className="mb-3 flex size-20 items-center justify-center rounded-full border-4 border-white bg-primary text-3xl font-bold text-white shadow-sm">
              {profile.userName.charAt(0).toUpperCase()}
            </div>
          )}
          <h3 className="text-lg font-bold text-slate-900">{profile.userName}</h3>
          {profile.email ? (
            <p className="mt-0.5 max-w-full truncate px-2 text-xs text-slate-400">
              {profile.email}
            </p>
          ) : null}
          <p className="mt-1 text-sm text-slate-500">Hoc vien VIP</p>
        </div>

        <nav className="space-y-1 p-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 font-bold text-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[22px] transition-colors ${
                    isActive ? "text-primary" : "text-slate-400 group-hover:text-primary"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-2 border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <span className="material-symbols-outlined text-[22px]">logout</span>
            Dang xuat
          </button>
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-6 text-white shadow-lg">
        <div className="absolute -right-4 -top-4 text-white/10">
          <span className="material-symbols-outlined text-9xl">temple_buddhist</span>
        </div>
        <div className="relative z-10">
          <h4 className="mb-1 text-lg font-bold">Nang cap VIP</h4>
          <p className="mb-4 text-sm text-white/80">
            Mo khoa toan bo tai lieu va video bai giang doc quyen.
          </p>
          <button className="w-full rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-amber-500">
            Xem chi tiet
          </button>
        </div>
      </div>
    </aside>
  );
}
