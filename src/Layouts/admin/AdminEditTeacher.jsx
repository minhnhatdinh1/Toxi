import react from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
export default function AdminEditTeacher({onSave}){
 const navigate = useNavigate();

  // ===== FORM DATA =====
  const [formData, setFormData] = useState({
    username: "chen_laoshi",
    fullName: "Lao Shi Chen",
    email: "chen.laoshi@toxi.edu.vn",
    phone: "+86 123 4567 8901",
    bio: "Experienced Chinese instructor...",
    specialty: "HSK Preparation",
    experience: 12,
    password: "",
    confirmPassword: "",
  });

  // ===== IMAGE PREVIEW =====
  const [preview, setPreview] = useState(
    "https://lh3.googleusercontent.com/..."
  );

  // ===== PASSWORD STATE =====
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // ===== HANDLE INPUT CHANGE =====
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "experience" ? Number(value) : value,
    }));
  };

  // ===== HANDLE IMAGE =====
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ảnh vượt quá 2MB!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ===== SUBMIT =====
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setError("");
    console.log("Submit:", formData);
  };

  // ===== CANCEL =====
  const handleCancel = () => {
    navigate("/admin/teachers");
  };


    <form onSubmit={handleSubmit}>
      {/* form ở đây */}
    </form>


  
    return(
        <>
            <div className="flex h-screen overflow-hidden ">
                        <AdminSidebar />
       <main className="flex-1 relative bg-background-light dark:bg-background-dark min-w-0 p-8 overflow-y-auto">
      
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 chinese-pattern-bg pointer-events-none"></div>

      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-8 py-6 border-b border-slate-200 dark:border-slate-800">
        
        <div className=" mx-auto flex flex-col gap-2">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/instructors");
              }}
              className="hover:text-primary transition-colors"
            >
              Instructors
            </a>

            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>

            <span className="text-slate-900 dark:text-slate-100 font-medium">
              Chỉnh sửa
            </span>
          </nav>

          {/* Title + Buttons */}
          <div className="flex justify-between items-end mt-2">
            
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Chỉnh sửa giáo viên
              </h2>

              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Cập nhật thông tin hồ sơ và thông tin chuyên môn của giáo viên.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={onSave}
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">
                  save
                </span>
                Lưu thay đổi
              </button>

            </div>
          </div>

        </div>
      </div>
      <div className=" mx-auto px-8 py-10">
      <form className="flex flex-col gap-8">
        
        {/* Section 1: Account Information */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
              person
            </span>
            <h3 className="text-xl font-bold">Account Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g. jdoe_toxi"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="j.doe@toxi.edu"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

          </div>
        </div>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Professional Details Card */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
        
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
            badge
          </span>
          <h3 className="text-xl font-bold">Professional Details</h3>
        </div>

        <div className="space-y-6">

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Bio / Introduction
            </label>

            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about the instructor's background and teaching philosophy..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* Specialty + Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Specialties */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Specialties
              </label>

              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all"
              >
                <option>HSK Preparation</option>
                <option>Business Chinese</option>
                <option>Chinese for Kids</option>
                <option>Conversational Mandarin</option>
                <option>Cantonese Basics</option>
              </select>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Experience (Years)
              </label>

              <input
                type="number"
                name="experience"
                min="0"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 5"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

          </div>
        </div>
      </div>
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 w-full">
        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
          photo_camera
        </span>
        <h3 className="text-xl font-bold">Photo</h3>
      </div>

      {/* Image Upload Area */}
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        
        <div className="relative w-40 h-40 rounded-full border-2 border-primary overflow-hidden group cursor-pointer mb-4">
          
          <img
            src={preview}
            alt="Instructor"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-white text-3xl">
              photo_camera
            </span>
          </div>

          {/* File Input */}
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        <p className="text-xs text-center text-slate-400 leading-relaxed px-4">
          Recommended: JPG or PNG <br />
          1000 x 1000px (Max 2MB)
        </p>
      </div>

    </div>
    </div>
     <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
        
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
            lock
          </span>
          <h3 className="text-xl font-bold">Security</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Password */}
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-slate-400"
            >
              <span className="material-symbols-outlined text-lg">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-4">{error}</p>
        )}
      </div>

      {/* Final Action */}
      <div className="flex justify-end gap-4 pb-12 mt-8">
        <button
          type="button"
          onClick={handleCancel}
          className="px-8 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="px-10 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all"
        >
          Lưu thay đổi
        </button>
      </div>

      {/* Chinese Decoration */}
      <div className="fixed bottom-10 right-10 opacity-5 dark:opacity-10 pointer-events-none">
        <span className="material-symbols-outlined text-[120px] text-primary">
          spa
        </span>
      </div>
      </form>
    </div>
    </main>
                        </div>
        </>
    )
}