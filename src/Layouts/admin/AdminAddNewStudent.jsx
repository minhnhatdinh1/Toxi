import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";
export default function AdminAddNewStudent() {
  const navigate = useNavigate();
  const initialForm = {
    username: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    setSaving(true);
    try {
      // api call placeholder
      await new Promise((r) => setTimeout(r, 1000));
      setSuccessMessage("Student created successfully!");
      setFormData(initialForm);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create student");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (Object.values(formData).some((v) => v)) {
      if (!window.confirm("Discard entered information?")) return;
    }
    navigate("/adminStudent");
  };

  return (
        <>
         <div className="flex h-screen overflow-hidden ">
                    <AdminSidebar />
           <main className="flex-1 relative overflow-y-auto">
      
      {/* Subtle Background Pattern */}
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
              Students
            </a>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span className="text-slate-500">Add New</span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-toxi-blue dark:text-white">
            Add New Student
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            Register a new student account to the TOXI educational platform.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
          
          {/* Card Header Decoration */}
          <div className="h-2 bg-gradient-to-r from-primary via-toxi-gold to-primary"></div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">

              {/* Section: Account Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="col-span-2 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-primary">
                    account_circle
                  </span>
                  <h3 className="text-lg font-bold text-toxi-blue dark:text-white">
                    Account Information
                  </h3>
                </div>

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

                <div className="col-span-2 flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Home Address
                  </label>
                  <textarea
                    rows="2"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Blossom Lane, District 5, Shanghai"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  ></textarea>
                </div>

              </div>
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
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg flex items-start gap-2">
          <span className="material-symbols-outlined text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5">
            error
          </span>
          <span className="text-sm">{error}</span>
        </div>
      )}
      {successMessage && (
        <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg flex items-start gap-2">
          <span className="material-symbols-outlined text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5">
            check_circle
          </span>
          <span className="text-sm">{successMessage}</span>
        </div>
      )}
      <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
        
        <button
          type="button"
          onClick={handleCancel}
          disabled={saving}
          className="px-6 py-3 rounded-xl text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="px-10 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving && (
            <span className="material-symbols-outlined text-lg animate-spin">
              sync
            </span>
          )}
          <span className="material-symbols-outlined text-lg">
            person_add
          </span>
          {saving ? "Saving..." : "Save Student"}
        </button>
      </div>

            </form>
          </div>
        </div>

      </div>
    </main>
                    </div>
        </>
    )
};