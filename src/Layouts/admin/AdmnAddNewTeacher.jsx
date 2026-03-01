import react from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
export default function AdminAddNewExample() {
  // ================= STATE =================
const [formData, setFormData] = useState({
  bio: "",
  specialty: "HSK Preparation",
  experience: "",
  password: "",
  confirmPassword: "",
});

const [preview, setPreview] = useState(null);
const [error, setError] = useState("");
const [showPassword, setShowPassword] = useState(false);


// ================= HANDLE INPUT CHANGE =================
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setError(""); // clear error khi gõ
};


// ================= HANDLE FILE UPLOAD =================
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate size (2MB)
  if (file.size > 2 * 1024 * 1024) {
    setError("File must be smaller than 2MB.");
    return;
  }

  // Validate type
  if (!["image/jpeg", "image/png"].includes(file.type)) {
    setError("Only JPG or PNG files are allowed.");
    return;
  }

  setError("");
  setPreview(URL.createObjectURL(file));
};


// ================= HANDLE SUBMIT =================
const handleSubmit = (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (formData.password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  // Submit success
  console.log("Form submitted:", formData);
  setError("");
};

    return (
        <>
            <div className="flex h-screen overflow-hidden ">
                <AdminSidebar />
                {/* Main Content Area */}
<main className="flex-1 flex flex-col bg-background-light dark:bg-background-dark/50 overflow-y-auto">
  
  {/* Subtle Background Texture */}
  <div className="absolute inset-0 chinese-pattern-bg pointer-events-none"></div>

  {/* Header Section (đã đổi từ header → div) */}
  <div className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-8 py-6 border-b border-slate-200 dark:border-slate-800">
    
    <div className="flex flex-col gap-2">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <a
          href="#"
          className="hover:text-primary transition-colors"
        >
          Instructors
        </a>

        <span className="material-symbols-outlined text-xs">
          chevron_right
        </span>

        <span className="text-slate-900 dark:text-slate-100 font-medium">
          Add New
        </span>
      </nav>

      {/* Title + Actions */}
      <div className="flex justify-between items-end mt-2">
        
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Add New Teacher
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Register a new instructor to the TOXI educational platform.
          </p>
        </div>

        <div className="flex gap-3">
          
          <button
            type="button"
            className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>

          <button
            type="button"
            className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">
              save
            </span>
            Save Teacher
          </button>

        </div>

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
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about the instructor's background and teaching philosophy..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* Specialty + Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
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

      <div className="w-full flex-1 flex flex-col items-center justify-center">
        
        {/* Upload Circle */}
        <label className="relative w-40 h-40 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden group hover:border-primary transition-colors cursor-pointer mb-4">
          
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary mb-2">
                cloud_upload
              </span>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">
                Upload Photo
              </p>
            </>
          )}

          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>

        {/* Error Message */}
        {error && (
          <p className="text-xs text-red-500 mb-2 text-center">{error}</p>
        )}

        {/* Note */}
        <p className="text-xs text-center text-slate-400 leading-relaxed px-4">
          Recommended: JPG or PNG, <br />
          1000 x 1000px (Max 2MB)
        </p>
      </div>
    </div>
    </div>
<form onSubmit={handleSubmit}>
      
      {/* Security Card */}
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
          <div className="space-y-2 relative">
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

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 mt-4">{error}</p>
        )}
      </div>

      {/* Final Actions */}
      <div className="flex justify-end gap-4 pb-12 mt-8">
        <button
          type="button"
          className="px-8 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-10 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all"
        >
          Create Instructor Account
        </button>
      </div>

    </form>
</main>
</div>
        </>
    )
};