import react from "react";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
export default function AdminAddNewCourses() {
    const handleCancel = () => {
    console.log("Cancel clicked");
  };

  const handleSave = () => {
    console.log("Save Course clicked");
  };
      const [files, setFiles] = useState([]);

  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setThumbnailUrl(previewUrl);
    }
  };
   const [description, setDescription] = useState("");

  const handleDiscard = () => {
    setDescription("");
  };

  const handlePublish = () => {
    console.log("Publish course:", description);
  };

    return (
        
        <>
        <div className="flex h-screen overflow-hidden ">
            <AdminSidebar />
     <main className="flex-1 flex flex-col bg-background-light dark:bg-background-dark/50 overflow-y-auto">
      {/* Breadcrumbs & Header */}
      <div className="px-6 py-6 lg:px-10">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-500 mb-2">
          <Link
            to="/courses"
            className="hover:text-primary transition-colors"
          >
            Courses
          </Link>
          <span>/</span>
          <span className="text-primary">Add New Course</span>
        </div>

        {/* Title + Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Add New Course
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Populate the form below to create a new learning module.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 rounded-xl border border-primary/20 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
            >
              Save Course
            </button>
          </div>
        </div>

      </div>
       <div className="px-6 pb-12 lg:px-10">
      <div className="bg-white dark:bg-[#1a0c0e] rounded-2xl border border-primary/10 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 lg:p-8 border-b border-primary/10 bg-primary/5">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              info
            </span>
            Course Details
          </h3>
        </div>

        {/* Form Content */}
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
           {/* Left Column */}
<div className="space-y-6">

  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
      Mã khóa học (Course ID)
    </label>
    <input
      type="text"
      placeholder="e.g. TOXI-HSK1-001"
      className="w-full rounded-xl border-primary/10 bg-slate-50 dark:bg-primary/5 focus:border-primary focus:ring-primary dark:text-white transition-all"
    />
  </div>

  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
      Course Title
    </label>
    <input
      type="text"
      placeholder="e.g. Master Business Chinese Level 1"
      className="w-full rounded-xl border-primary/10 bg-slate-50 dark:bg-primary/5 focus:border-primary focus:ring-primary dark:text-white transition-all"
    />
  </div>

  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
      Course Type
    </label>
    <select className="w-full rounded-xl border-primary/10 bg-slate-50 dark:bg-primary/5 focus:border-primary focus:ring-primary dark:text-white transition-all">
      <option value="">Select a category</option>
      <option value="hsk">HSK Preparation</option>
      <option value="business">Business Chinese</option>
      <option value="conversational">Conversational Chinese</option>
      <option value="kids">Chinese for Kids</option>
      <option value="culture">Culture &amp; Etiquette</option>
    </select>
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
        Price ($)
      </label>
      <input
        type="number"
        placeholder="99.99"
        className="w-full rounded-xl border-primary/10 bg-slate-50 dark:bg-primary/5 focus:border-primary focus:ring-primary dark:text-white transition-all"
      />
    </div>

    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
        Discount Price ($)
      </label>
      <input
        type="number"
        placeholder="79.99"
        className="w-full rounded-xl border-primary/10 bg-slate-50 dark:bg-primary/5 focus:border-primary focus:ring-primary dark:text-white transition-all"
      />
    </div>
  </div>

</div>
 <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Course Thumbnail URL
        </label>

        <div className="flex flex-col gap-3">
          {/* URL Input */}
          <input
            type="url"
            placeholder="https://example.com/thumbnail.jpg"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="w-full rounded-xl border border-primary/10 bg-slate-50 dark:bg-primary/5 focus:border-primary focus:ring-primary dark:text-white transition-all p-3"
          />

          {/* Upload Area */}
          <label className="aspect-video w-full rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center bg-slate-50 dark:bg-primary/5 group cursor-pointer hover:border-primary hover:bg-primary/10 transition-all overflow-hidden">
            
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt="Thumbnail Preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <>
                <span className="material-symbols-outlined text-4xl text-primary/40 group-hover:text-primary transition-colors">
                  image
                </span>
                <p className="text-sm text-slate-400 mt-2 font-medium">
                  Click to upload or drag image
                </p>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
            
          </div>
           {/* Bottom Full Width */}
      <div className="col-span-1 md:col-span-2 space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Course Description
        </label>

        <div className="rounded-xl border border-primary/10 bg-slate-50 dark:bg-primary/5 overflow-hidden">
          
          {/* Toolbar */}
          <div className="bg-slate-200 dark:bg-primary/10 p-2 flex gap-2 border-b border-primary/10">
            
            <button
              type="button"
              className="p-1 hover:bg-primary/20 rounded transition-colors"
              title="Bold"
            >
              <span className="material-symbols-outlined text-base">
                format_bold
              </span>
            </button>

            <button
              type="button"
              className="p-1 hover:bg-primary/20 rounded transition-colors"
              title="Italic"
            >
              <span className="material-symbols-outlined text-base">
                format_italic
              </span>
            </button>

            <button
              type="button"
              className="p-1 hover:bg-primary/20 rounded transition-colors"
              title="List"
            >
              <span className="material-symbols-outlined text-base">
                format_list_bulleted
              </span>
            </button>

            <button
              type="button"
              className="p-1 hover:bg-primary/20 rounded transition-colors"
              title="Link"
            >
              <span className="material-symbols-outlined text-base">
                link
              </span>
            </button>

            <div className="w-px bg-primary/20 mx-1"></div>

            <button
              type="button"
              className="p-1 hover:bg-primary/20 rounded transition-colors"
              title="Heading"
            >
              <span className="material-symbols-outlined text-base">
                format_size
              </span>
            </button>
          </div>

          {/* Textarea */}
          <textarea
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter full course curriculum and learning outcomes..."
            className="w-full border-none bg-transparent focus:ring-0 dark:text-white p-4 resize-none outline-none"
          />
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="mt-12 flex items-center justify-end gap-4 border-t border-primary/10 pt-8">
        
        <button
          type="button"
          onClick={handleDiscard}
          className="px-8 py-3 rounded-xl border border-primary/20 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-primary/10 transition-all"
        >
          Discard Changes
        </button>

        <button
          type="button"
          onClick={handlePublish}
          className="px-10 py-3 rounded-xl bg-primary text-white font-bold shadow-xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined">
            publish
          </span>
          Publish Course
        </button>
      </div>
        </div>

      </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      
      {/* Card 1 */}
      <div className="p-6 bg-brand-blue rounded-2xl border border-white/10 text-white relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined text-8xl">
            lightbulb
          </span>
        </div>

        <h4 className="font-bold mb-2">Pro Tip</h4>
        <p className="text-sm text-white/80 leading-relaxed">
          Courses with high-quality thumbnails and detailed descriptions see
          40% more engagement.
        </p>
      </div>

      {/* Card 2 */}
      <div className="p-6 bg-accent rounded-2xl border border-white/10 text-slate-900 relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-20 -rotate-12 transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined text-8xl">
            verified
          </span>
        </div>

        <h4 className="font-bold mb-2">HSK Alignment</h4>
        <p className="text-sm text-slate-800 leading-relaxed">
          Ensure all vocabulary matches the updated 2024 HSK standard for
          better certification results.
        </p>
      </div>

      {/* Card 3 */}
      <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 text-slate-900 dark:text-white relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-10 rotate-45 transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined text-8xl">
            schedule
          </span>
        </div>

        <h4 className="font-bold mb-2">Draft Status</h4>
        <p className="text-sm text-slate-500 dark:text-primary/60 leading-relaxed">
          Your progress is automatically saved to your drafts every 2 minutes.
        </p>
      </div>

    </div>
    </div>
    </main>
        </div>
        </>
    )
};