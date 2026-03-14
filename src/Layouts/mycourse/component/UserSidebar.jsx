import { Link, useNavigate, useLocation } from "react-router-dom";

export default function UserSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = localStorage.getItem("userName") || "Học viên";
  const email = localStorage.getItem("email") || "";
  const firstLetter = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Home");
    window.location.reload();
  };

  const navItems = [
    { icon: "school", label: "Khóa học của tôi", to: "/MyCourse" },
    { icon: "person", label: "Thông tin cá nhân", to: "/Profile" },
    { icon: "bookmarks", label: "Từ vựng đã lưu", to: "/MyVocabulary" },
    { icon: "receipt_long", label: "Lịch sử đơn hàng", to: "/MyProduct" },
  ];

  return (
    <aside className="hidden lg:block lg:col-span-3 sticky top-24">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* USER INFO */}
        <div className="p-6 flex flex-col items-center border-b border-slate-100 bg-slate-50/50">
          <div className="size-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-sm mb-3">
            {firstLetter}
          </div>
          <h3 className="font-bold text-slate-900 text-lg">{userName}</h3>
          {email && <p className="text-slate-400 text-xs mt-0.5 truncate max-w-full px-2">{email}</p>}
          <p className="text-slate-500 text-sm mt-1">Học viên</p>
        </div>

        {/* NAV */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium group
                  ${isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                <span className={`material-symbols-outlined text-[22px] transition-colors
                  ${isActive ? "text-primary" : "text-slate-400 group-hover:text-primary"}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-3 border-t border-slate-100 mt-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 font-medium rounded-xl transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">logout</span>
            Đăng xuất
          </button>
        </div>
      </div>

   
     
    </aside>
  );
}
