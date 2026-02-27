import react from "react";
import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
export default function AdminEditStudent() {
    
  const [formData, setFormData] = useState({
    username: "li_wei88",
    fullName: "Li Wei",
    email: "li.wei@example.com",
    phone: "+86 123 4567 8901",
    address: "123 Blossom Lane, District 5, Shanghai",
    password: "password123",
    confirmPassword: "password123",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

    return(
        <>
          <div className="flex h-screen overflow-hidden ">
                    <AdminSidebar />
<main className="flex-1 relative overflow-y-auto">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 chinese-pattern pointer-events-none"></div>

      {/* Corner Motif */}
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <span className="material-symbols-outlined text-9xl text-toxi-gold">
          cloud
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <a className="hover:underline" href="/adminStudent">
              Quản lý học viên
            </a>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span className="text-slate-500">
              Chỉnh sửa học viên
            </span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-toxi-blue dark:text-white">
            Chỉnh sửa học viên
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            Cập nhật thông tin tài khoản học viên trên nền tảng giáo dục TOXI.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
          
          <div className="h-2 bg-gradient-to-r from-primary via-toxi-gold to-primary"></div>

          <div className="p-8">
            <form className="flex flex-col gap-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Section Title */}
                <div className="col-span-2 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-primary">
                    account_circle
                  </span>
                  <h3 className="text-lg font-bold text-toxi-blue dark:text-white">
                    Account Information
                  </h3>
                </div>

                {/* Username */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="e.g. li_wei88"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>

                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Li Wei"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="li.wei@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+86 123 4567 8901"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>

                {/* Address */}
                <div className="col-span-2 flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Home Address
                  </label>
                  <textarea
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Blossom Lane, District 5, Shanghai"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>

              </div>
       <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Section: Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <span className="material-symbols-outlined text-primary">
            lock
          </span>
          <h3 className="text-lg font-bold text-toxi-blue dark:text-white">
            Security
          </h3>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Password
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 bottom-3 text-slate-400"
          >
            <span className="material-symbols-outlined text-sm">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 bottom-3 text-slate-400"
          >
            <span className="material-symbols-outlined text-sm">
              {showConfirm ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-3 rounded-xl text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-10 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">save</span>
          Lưu thay đổi
        </button>
      </div>
    </form>
            </form>
          </div>
        </div>

      </div>
    </main>
                    </div>
                    </>
    )
};