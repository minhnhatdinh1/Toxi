import react from "react";
import { useState, useRef } from "react";
import AdminSidebar from "./AdminSidebar";
export default function AdminEditCourses() {
    const [formData, setFormData] = useState({
    courseId: "TOXI-HSK1-001",
    title: "HSK 1 Standard Course",
    type: "HSK Preparation",
    price: 49.99,
    discountPrice: 39.99,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Updated Course:", formData);
    alert("Update thành công (chưa gọi API)");
  };
  const [description, setDescription] = useState(
    "A foundational course designed for absolute beginners. This course covers the first 150 essential Chinese characters and basic grammar structures required for the HSK 1 proficiency exam. Ideal for students starting their Mandarin journey."
  );

  const handleToolbarClick = (action) => {
    alert(`Clicked: ${action}`);
  };
    const [thumbnail, setThumbnail] = useState(
    "https://cdn.hanacademy.com/assets/hsk1_thumb.jpg"
  );
  /* bên trong component */

const fileInputRef = useRef(null);

const handleChangeImage = () => {
  fileInputRef.current.click();
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate < 2MB
  if (file.size > 2 * 1024 * 1024) {
    alert("File phải nhỏ hơn 2MB");
    return;
  }

  const previewUrl = URL.createObjectURL(file);
  setThumbnail(previewUrl);
};
 const [courseId] = useState("TOXI-HSK1-001");
  const [status, setStatus] = useState("Drafting");
  const [lastSaved, setLastSaved] = useState("2 mins ago");

  const handlePreview = () => {
    alert("Preview Course");
  };

  const handleSaveDraft = () => {
    setStatus("Drafting");
    setLastSaved("Just now");
    alert("Saved as Draft (chưa gọi API)");
  };
    return(
        <>
            <div className="flex h-screen overflow-hidden ">
                    <AdminSidebar />
             <main className="flex-1 mx-auto relative overflow-y-auto">
      {/* Top Navigation */}
      <header className="bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <span>Admin</span>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span>Courses</span>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="text-primary font-medium">Edit Course</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <span className="material-symbols-outlined">
              notifications
            </span>
          </button>

          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            Update Course
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-8  mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Edit Course
            </h1>
            <p className="text-slate-500 mt-1">
              Manage course content, HSK alignment, and pricing.
            </p>
          </div>

          <div className="flex gap-2">
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-full flex items-center gap-1 border border-amber-200 dark:border-amber-800">
              <span className="material-symbols-outlined text-[14px]">
                drafts
              </span>
              Draft Mode
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 space-y-6">
            {/* Course Details Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    info
                  </span>
                  <h3 className="font-bold text-lg">Course Details</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Course ID */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Course ID
                  </label>
                  <input
                    type="text"
                    name="courseId"
                    value={formData.courseId}
                    readOnly
                    className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 font-mono text-xs"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-2.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Type */}
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                      Course Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-2.5"
                    >
                      <option>Business Chinese</option>
                      <option>HSK Preparation</option>
                      <option>Conversational</option>
                      <option>Culture & History</option>
                    </select>
                  </div>

                  {/* Price + Discount */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                        Price (VND)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-2.5"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                        Discount Price (VND)
                      </label>
                      <input
                        type="number"
                        name="discountPrice"
                        value={formData.discountPrice}
                        onChange={handleChange}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-2.5"
                      />
                    </div>
                  </div>
                </div>
                  {/* Course Description */}
                  <div>
      <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
        Course Description
      </label>

      <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
        
        {/* Toolbar */}
        <div className="bg-slate-100 dark:bg-slate-800 p-2 flex gap-2 border-b border-slate-200 dark:border-slate-800">
          
          <button
            type="button"
            onClick={() => handleToolbarClick("bold")}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
          >
            <span className="material-symbols-outlined text-sm">
              format_bold
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleToolbarClick("italic")}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
          >
            <span className="material-symbols-outlined text-sm">
              format_italic
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleToolbarClick("bullet")}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
          >
            <span className="material-symbols-outlined text-sm">
              format_list_bulleted
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleToolbarClick("link")}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
          >
            <span className="material-symbols-outlined text-sm">
              link
            </span>
          </button>

        </div>

        {/* Textarea */}
        <textarea
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border-none bg-slate-50 dark:bg-slate-950 px-4 py-3 focus:ring-0 text-slate-600 dark:text-slate-400"
        />
      </div>
    </div>
      
              </div>
            </div>
           <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
      
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">
          image
        </span>
        Course Thumbnail
      </h3>

      <div className="grid grid-cols-2 gap-6">
        
       {/* Preview */}
<div className="aspect-video rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-center relative overflow-hidden group">
  
  {thumbnail && (
    <img
      src={thumbnail}
      alt="Course Thumbnail Preview"
      className="absolute inset-0 w-full h-full object-cover"
    />
  )}

  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
    <button
      type="button"
      onClick={handleChangeImage}
      className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
    >
      <span className="material-symbols-outlined">
        file_upload
      </span>
      Change Image
    </button>
  </div>

  {/* Hidden File Input */}
  <input
    type="file"
    accept="image/png, image/jpeg, image/webp"
    ref={fileInputRef}
    onChange={handleFileChange}
    className="hidden"
  />
</div>

        {/* URL Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Thumbnail URL
            </label>

            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 text-sm focus:ring-primary focus:border-primary"
            />
          </div>

          <p className="text-xs text-slate-500 italic">
            Recommended size: 1280x720px. Max size 2MB. Supports JPG, PNG, WEBP.
          </p>
        </div>

      </div>
    </div>
          </div>
            <div className="col-span-4 space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-100 dark:bg-slate-800 px-6 py-3 border-b border-slate-200 dark:border-slate-800">
          <h4 className="font-bold text-sm uppercase tracking-wider">
            Publishing Status
          </h4>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          {/* Course ID */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Course ID
            </label>
            <input
              type="text"
              value={courseId}
              readOnly
              className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 font-mono text-xs"
            />
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status:</span>
            <span className="text-amber-500 font-bold text-sm">
              {status}
            </span>
          </div>

          {/* Last Saved */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Last Saved:</span>
            <span className="text-slate-500 text-sm">
              {lastSaved}
            </span>
          </div>

          {/* Buttons */}
          <button
            type="button"
            onClick={handlePreview}
            className="w-full border border-primary text-primary hover:bg-primary/10 py-2.5 rounded-lg font-bold text-sm transition-colors"
          >
            Preview Course
          </button>

          <button
            type="button"
            onClick={handleSaveDraft}
            className="w-full bg-slate-900 dark:bg-black text-white py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Save as Draft
          </button>

        </div>
      </div>
      {/* HSK Alignment */}
<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
  
  <div className="bg-slate-100 dark:bg-slate-800 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
    <h4 className="font-bold text-sm uppercase tracking-wider">
      HSK Alignment
    </h4>
    <span className="material-symbols-outlined text-primary text-lg">
      verified
    </span>
  </div>

  <div className="p-6">
    <p className="text-xs text-slate-500 mb-4">
      Select the HSK proficiency levels this course targets.
    </p>

    <div className="grid grid-cols-3 gap-2">

      {/* HSK 1 */}
      <label className="flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 p-2 rounded-lg cursor-pointer hover:border-primary transition-colors bg-slate-50 dark:bg-slate-950">
        <span className="text-xs font-bold">HSK 1</span>
        <input
          type="checkbox"
          className="mt-1 text-primary rounded focus:ring-primary"
        />
      </label>

      {/* HSK 2 */}
      <label className="flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 p-2 rounded-lg cursor-pointer hover:border-primary transition-colors bg-slate-50 dark:bg-slate-950">
        <span className="text-xs font-bold">HSK 2</span>
        <input
          type="checkbox"
          className="mt-1 text-primary rounded focus:ring-primary"
        />
      </label>

      {/* HSK 3 */}
      <label className="flex flex-col items-center justify-center border border-primary p-2 rounded-lg cursor-pointer bg-primary/10">
        <span className="text-xs font-bold text-primary">HSK 3</span>
        <input
          type="checkbox"
          defaultChecked
          className="mt-1 text-primary rounded focus:ring-primary"
        />
      </label>

      {/* HSK 4 */}
      <label className="flex flex-col items-center justify-center border border-primary p-2 rounded-lg cursor-pointer bg-primary/10">
        <span className="text-xs font-bold text-primary">HSK 4</span>
        <input
          type="checkbox"
          defaultChecked
          className="mt-1 text-primary rounded focus:ring-primary"
        />
      </label>

      {/* HSK 5 */}
      <label className="flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 p-2 rounded-lg cursor-pointer hover:border-primary transition-colors bg-slate-50 dark:bg-slate-950">
        <span className="text-xs font-bold">HSK 5</span>
        <input
          type="checkbox"
          className="mt-1 text-primary rounded focus:ring-primary"
        />
      </label>

      {/* HSK 6 */}
      <label className="flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 p-2 rounded-lg cursor-pointer hover:border-primary transition-colors bg-slate-50 dark:bg-slate-950">
        <span className="text-xs font-bold">HSK 6</span>
        <input
          type="checkbox"
          className="mt-1 text-primary rounded focus:ring-primary"
        />
      </label>

    </div>
  </div>
</div>


{/* Administrative Audit */}
<div className="p-6 bg-slate-900 rounded-xl chinese-pattern border border-primary/30">
  
  <div className="flex items-center gap-3 mb-4">
    <div className="w-1 h-6 bg-primary rounded-full"></div>
    <h4 className="text-white font-bold text-sm">
      Administrative Audit
    </h4>
  </div>

  <ul className="space-y-3">
    <li className="flex items-center gap-2 text-xs text-slate-300">
      <span className="size-1.5 rounded-full bg-primary"></span>
      Content verified for HSK 1 compliance
    </li>

    <li className="flex items-center gap-2 text-xs text-slate-300">
      <span className="size-1.5 rounded-full bg-primary"></span>
      Audio tracks uploaded (45/45)
    </li>

    <li className="flex items-center gap-2 text-xs text-slate-300">
      <span className="size-1.5 rounded-full bg-primary"></span>
      Vocabulary list validated
    </li>
  </ul>

</div>
    </div>
        </div>
      </div>
    </main>
                    </div>
        </>
    )
};