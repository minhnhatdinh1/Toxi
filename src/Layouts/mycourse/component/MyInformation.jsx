import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/image/LOGO (1).png';
import UserSidebar from './UserSidebar';
import { fetchWithAuth } from "../../../utils/apiClient";

const API = "http://localhost:8080/api";

export default function MyInformation() {
  const [form, setForm] = useState({
    fullName: "",
    email:    "",
    phone:    "",
    birthday: "",
    gender:   "male",
  });

  const [avatarUrl,       setAvatarUrl]       = useState(null);
  const [avatarPreview,   setAvatarPreview]   = useState(null);
  const [avatarFile,      setAvatarFile]      = useState(null);
  const [saving,          setSaving]          = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [toast,           setToast]           = useState(null);

  const fileInputRef = useRef(null);

  // ─────────────────────────────────────────
  // Load thông tin user khi mount
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ Dùng fetchWithAuth thay vì fetch thủ công
        const res = await fetchWithAuth("/user/me");
        if (!res || !res.ok) throw new Error();
        const data = await res.json();
        setForm({
          fullName: data.fullName || "",
          email:    data.email    || "",
          phone:    data.phone    || "",
          birthday: data.birthday || "",
          gender:   data.gender   || "male",
        });
        if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
      } catch {
        // Fallback từ localStorage nếu API lỗi
        setForm(f => ({
          ...f,
          fullName: localStorage.getItem("userName") || "",
          email:    localStorage.getItem("email")    || "",
        }));
      }
    };
    fetchUser();
  }, []);

  // ─────────────────────────────────────────
  // Toast helper
  // ─────────────────────────────────────────
  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  // ─────────────────────────────────────────
  // Chọn file → preview ngay, chưa upload
  // ─────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("error", "Chỉ chấp nhận file ảnh (jpg, png, webp...)!");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("error", "File không được vượt quá 5MB!");
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // ─────────────────────────────────────────
  // Hàm upload avatar dùng chung
  // ─────────────────────────────────────────
  const uploadAvatarFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // ✅ fetchWithAuth xử lý FormData (không set Content-Type thủ công)
    const res = await fetchWithAuth("/user/avatar", {
      method: "POST",
      body:   formData,
    });

    if (!res || !res.ok) {
      const err = await res?.json();
      throw new Error(err?.error || "Upload thất bại");
    }

    const data = await res.json();

    setAvatarUrl(data.avatarUrl);
    setAvatarPreview(null);
    setAvatarFile(null);
    localStorage.setItem("avatarUrl", data.avatarUrl);
    window.dispatchEvent(new CustomEvent("avatarUpdated", { detail: data.avatarUrl }));

    return data.avatarUrl;
  };

  // ─────────────────────────────────────────
  // Upload avatar ngay (nút "Lưu ảnh ngay")
  // ─────────────────────────────────────────
  const handleUploadAvatar = async () => {
    if (!avatarFile) return;
    setUploadingAvatar(true);
    try {
      await uploadAvatarFile(avatarFile);
      showToast("success", "Cập nhật ảnh đại diện thành công!");
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  // ─────────────────────────────────────────
  // Xóa avatar
  // ─────────────────────────────────────────
  const handleDeleteAvatar = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa ảnh đại diện?")) return;
    try {
      // ✅ Dùng fetchWithAuth
      const res = await fetchWithAuth("/user/avatar", { method: "DELETE" });
      if (!res || !res.ok) {
        const err = await res?.json();
        throw new Error(err?.error || "Xóa thất bại");
      }
      setAvatarUrl(null);
      setAvatarPreview(null);
      setAvatarFile(null);
      localStorage.removeItem("avatarUrl");
      window.dispatchEvent(new CustomEvent("avatarUpdated", { detail: null }));
      showToast("success", "Đã xóa ảnh đại diện!");
    } catch (err) {
      showToast("error", err.message);
    }
  };

  // ─────────────────────────────────────────
  // Lưu tất cả: avatar (nếu có) + thông tin
  // ─────────────────────────────────────────
  const handleSave = async () => {
    if (!form.fullName.trim()) {
      showToast("error", "Họ và tên không được để trống!");
      return;
    }
    setSaving(true);
    try {
      // 1. Upload avatar nếu có file mới chưa lưu
      if (avatarFile) {
        await uploadAvatarFile(avatarFile); // ✅ dùng hàm chung
      }

      // 2. Lưu thông tin cơ bản
      const res = await fetchWithAuth("/user/update", {
        method: "PUT",
        body:   JSON.stringify(form),
      });

      if (!res || !res.ok) {
        const err = await res?.json();
        throw new Error(err?.error || "Lưu thất bại");
      }

      const data = await res.json();

      // 3. Cập nhật localStorage
      if (data.fullName) localStorage.setItem("userName", data.fullName);
      if (data.email)    localStorage.setItem("email",    data.email);

      showToast("success", "Lưu thông tin thành công!");
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const displayName   = form.fullName || localStorage.getItem("userName") || "Học viên";
  const displayAvatar = avatarPreview || avatarUrl;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-chinese-pattern">

      {/* ─── TOAST ─── */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[99999] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-semibold transition-all
            ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
          <span className="material-symbols-outlined text-[20px]">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          {toast.msg}
        </div>
      )}

      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-[100] bg-primary text-white shadow-xl">
        <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none" />
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">

          <Link to="/Home" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
            <div>
              <h1 className="text-2xl font-black tracking-tighter leading-none">TOXI</h1>
              <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">学以致用</p>
            </div>
          </Link>

          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative group">
              <input type="text" placeholder="Tìm kiếm sản phẩm, giáo trình, dụng cụ..."
                className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm
                  focus:ring-2 focus:ring-secondary focus:bg-white focus:text-primary transition-all placeholder-white/60" />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">
                search
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-white/80 hover:text-white p-2">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/20">
              {displayAvatar ? (
                <img src={displayAvatar} alt="avatar"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white/30" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white">{displayName}</p>
                <p className="text-xs text-white/70">Học viên</p>
              </div>
            </div>
            <button className="md:hidden text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN ─── */}
      <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <UserSidebar />

          <div className="lg:col-span-9 space-y-6">

            <div className="flex flex-col gap-1">
              <span className="text-primary font-bold tracking-wider text-xs uppercase block">
                Học để ứng dụng - 学以致用
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Thông tin cá nhân</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

              {/* ── AVATAR ── */}
              <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row items-center gap-8 bg-slate-50/30">
                <div className="relative shrink-0">
                  {displayAvatar ? (
                    <img src={displayAvatar} alt="avatar"
                      className="size-32 rounded-full object-cover border-4 border-white shadow-md" />
                  ) : (
                    <div className="size-32 rounded-full bg-primary flex items-center justify-center
                        text-white text-5xl font-bold border-4 border-white shadow-md">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  {avatarFile && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px]
                        font-bold px-2 py-0.5 rounded-full shadow">
                      Mới
                    </span>
                  )}

                  <button onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-1 right-1 size-9 bg-primary text-white rounded-full
                      flex items-center justify-center border-2 border-white hover:bg-primary-dark
                      transition-all shadow-sm">
                    <span className="material-symbols-outlined text-lg">photo_camera</span>
                  </button>

                  <input ref={fileInputRef} type="file" accept="image/*"
                    className="hidden" onChange={handleFileChange} />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-xl font-bold text-slate-900 mb-1">{displayName}</h4>
                  <p className="text-slate-500 text-sm mb-4">
                    Ảnh đại diện sẽ hiển thị công khai trên hệ thống và các chứng chỉ học tập.
                    {avatarFile && (
                      <span className="text-accent font-semibold ml-1">· Có ảnh mới chưa lưu</span>
                    )}
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <button onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm
                        font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">upload</span>
                      Thay đổi ảnh
                    </button>

                    {avatarFile && (
                      <button onClick={handleUploadAvatar} disabled={uploadingAvatar}
                        className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl
                          hover:bg-primary-dark transition-colors flex items-center gap-2 disabled:opacity-60">
                        <span className={`material-symbols-outlined text-[18px] ${uploadingAvatar ? "animate-spin" : ""}`}>
                          {uploadingAvatar ? "progress_activity" : "cloud_upload"}
                        </span>
                        {uploadingAvatar ? "Đang tải..." : "Lưu ảnh ngay"}
                      </button>
                    )}

                    {(avatarUrl || avatarPreview) && (
                      <button onClick={handleDeleteAvatar}
                        className="px-4 py-2 text-red-500 text-sm font-semibold hover:text-red-600
                          transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        Xóa ảnh
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* ── FORM ── */}
              <div className="p-8">
                <h5 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">badge</span>
                  Thông tin cơ bản
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Họ và tên</label>
                    <input type="text" placeholder="Nhập họ và tên"
                      value={form.fullName}
                      onChange={e => setForm({ ...form, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                    <input type="email" placeholder="email@domain.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Số điện thoại</label>
                    <input type="tel" placeholder="Nhập số điện thoại"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ngày sinh</label>
                    <input type="date"
                      value={form.birthday}
                      onChange={e => setForm({ ...form, birthday: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Giới tính</label>
                    <select value={form.gender}
                      onChange={e => setForm({ ...form, gender: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                        transition-all bg-white">
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ── ACTIONS ── */}
              <div className="p-8 border-t border-slate-100 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-500 italic">
                  Nhấn "Lưu thay đổi" để cập nhật tất cả thông tin.
                </p>
                <div className="flex gap-4 w-full md:w-auto">
                  <button onClick={() => window.location.reload()}
                    className="flex-1 md:flex-none px-8 py-3 bg-slate-100 text-slate-600 font-bold
                      rounded-xl hover:bg-slate-200 transition-colors">
                    Hủy bỏ
                  </button>
                  <button onClick={handleSave} disabled={saving}
                    className="flex-1 md:flex-none px-8 py-3 bg-secondary hover:bg-secondary-dark
                      text-white font-bold rounded-xl shadow-lg shadow-secondary/20 transition-all
                      flex items-center justify-center gap-2 disabled:opacity-60">
                    {saving ? (
                      <>
                        <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <span>Lưu thay đổi</span>
                        <span className="material-symbols-outlined text-lg">save</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* SECURITY */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-slate-900 mb-1">Bảo mật tài khoản</h5>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Tài khoản của bạn đã được xác minh. Hãy đảm bảo mật khẩu có cả chữ hoa,
                  chữ thường, số và ký tự đặc biệt để bảo vệ thông tin học tập của bạn.
                </p>
              </div>
              <button className="text-primary font-bold text-sm underline hover:text-primary-dark">
                Tìm hiểu thêm
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
