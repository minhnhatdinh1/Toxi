import { useEffect, useRef, useState } from "react";
import UserSidebar from "./UserSidebar";
import MyHeader from "./MyHeader";
import { fetchWithAuth } from "../../../utils/apiClient";

export default function MyInformation() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "male",
  });

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [toast, setToast] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchWithAuth("/user/me");
        if (!res || !res.ok) throw new Error();
        const data = await res.json();
        setForm({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          birthday: data.birthday || "",
          gender: data.gender || "male",
        });
        if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
      } catch {
        setForm((prev) => ({
          ...prev,
          fullName: localStorage.getItem("userName") || "",
          email: localStorage.getItem("email") || "",
        }));
      }
    };

    fetchUser();
  }, []);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("error", "Chi chap nhan file anh.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("error", "File khong duoc vuot qua 5MB.");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const uploadAvatarFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetchWithAuth("/user/avatar", {
      method: "POST",
      body: formData,
    });

    if (!res || !res.ok) {
      const err = await res?.json();
      throw new Error(err?.error || "Upload that bai");
    }

    const data = await res.json();
    setAvatarUrl(data.avatarUrl);
    setAvatarPreview(null);
    setAvatarFile(null);
    localStorage.setItem("avatarUrl", data.avatarUrl);
    window.dispatchEvent(new CustomEvent("avatarUpdated", { detail: data.avatarUrl }));

    return data.avatarUrl;
  };

  const handleUploadAvatar = async () => {
    if (!avatarFile) return;
    setUploadingAvatar(true);
    try {
      await uploadAvatarFile(avatarFile);
      showToast("success", "Cap nhat anh dai dien thanh cong.");
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!window.confirm("Ban co chac muon xoa anh dai dien?")) return;

    try {
      const res = await fetchWithAuth("/user/avatar", { method: "DELETE" });
      if (!res || !res.ok) {
        const err = await res?.json();
        throw new Error(err?.error || "Xoa that bai");
      }

      setAvatarUrl(null);
      setAvatarPreview(null);
      setAvatarFile(null);
      localStorage.removeItem("avatarUrl");
      window.dispatchEvent(new CustomEvent("avatarUpdated", { detail: null }));
      showToast("success", "Da xoa anh dai dien.");
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const handleSave = async () => {
    if (!form.fullName.trim()) {
      showToast("error", "Ho va ten khong duoc de trong.");
      return;
    }

    setSaving(true);
    try {
      if (avatarFile) {
        await uploadAvatarFile(avatarFile);
      }

      const res = await fetchWithAuth("/user/update", {
        method: "PUT",
        body: JSON.stringify(form),
      });

      if (!res || !res.ok) {
        const err = await res?.json();
        throw new Error(err?.error || "Luu that bai");
      }

      const data = await res.json();
      if (data.fullName) localStorage.setItem("userName", data.fullName);
      if (data.email) localStorage.setItem("email", data.email);

      showToast("success", "Luu thong tin thanh cong.");
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setSaving(false);
    }
  };

  const displayName = form.fullName || localStorage.getItem("userName") || "Hoc vien";
  const displayAvatar = avatarPreview || avatarUrl;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-chinese-pattern">
      {toast ? (
        <div
          className={`fixed right-6 top-6 z-[99999] flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-xl ${
            toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          {toast.msg}
        </div>
      ) : null}

      <MyHeader />

      <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <UserSidebar />

          <div className="lg:col-span-9 space-y-6">
            <div className="flex flex-col gap-1">
              <span className="block text-xs font-bold uppercase tracking-wider text-primary">
                Hoc de ung dung - 学以致用
              </span>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">
                Thong tin ca nhan
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col items-center gap-8 border-b border-slate-100 bg-slate-50/30 p-8 md:flex-row">
                <div className="relative shrink-0">
                  {displayAvatar ? (
                    <img
                      src={displayAvatar}
                      alt="avatar"
                      className="size-32 rounded-full border-4 border-white object-cover shadow-md"
                    />
                  ) : (
                    <div className="flex size-32 items-center justify-center rounded-full border-4 border-white bg-primary text-5xl font-bold text-white shadow-md">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  {avatarFile ? (
                    <span className="absolute -right-1 -top-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white shadow">
                      Moi
                    </span>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-1 right-1 flex size-9 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-sm transition-all hover:bg-primary-dark"
                  >
                    <span className="material-symbols-outlined text-lg">photo_camera</span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h4 className="mb-1 text-xl font-bold text-slate-900">{displayName}</h4>
                  <p className="mb-4 text-sm text-slate-500">
                    Anh dai dien se hien thi tren he thong va cac khu vuc hoc tap cua ban.
                    {avatarFile ? (
                      <span className="ml-1 font-semibold text-accent">· Co anh moi chua luu</span>
                    ) : null}
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <span className="material-symbols-outlined text-[18px]">upload</span>
                      Thay doi anh
                    </button>

                    {avatarFile ? (
                      <button
                        type="button"
                        onClick={handleUploadAvatar}
                        disabled={uploadingAvatar}
                        className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
                      >
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            uploadingAvatar ? "animate-spin" : ""
                          }`}
                        >
                          {uploadingAvatar ? "progress_activity" : "cloud_upload"}
                        </span>
                        {uploadingAvatar ? "Dang tai..." : "Luu anh ngay"}
                      </button>
                    ) : null}

                    {avatarUrl || avatarPreview ? (
                      <button
                        type="button"
                        onClick={handleDeleteAvatar}
                        className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:text-red-600"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        Xoa anh
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h5 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
                  <span className="material-symbols-outlined text-primary">badge</span>
                  Thong tin co ban
                </h5>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Ho va ten
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                      placeholder="Nhap ho va ten"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      placeholder="email@domain.com"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      So dien thoai
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) => setForm({ ...form, phone: event.target.value })}
                      placeholder="Nhap so dien thoai"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Ngay sinh
                    </label>
                    <input
                      type="date"
                      value={form.birthday}
                      onChange={(event) => setForm({ ...form, birthday: event.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Gioi tinh
                    </label>
                    <select
                      value={form.gender}
                      onChange={(event) => setForm({ ...form, gender: event.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="male">Nam</option>
                      <option value="female">Nu</option>
                      <option value="other">Khac</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-white p-8 md:flex-row">
                <p className="text-sm italic text-slate-500">
                  Nhan "Luu thay doi" de cap nhat tat ca thong tin.
                </p>
                <div className="flex w-full gap-4 md:w-auto">
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="flex-1 rounded-xl bg-slate-100 px-8 py-3 font-bold text-slate-600 transition-colors hover:bg-slate-200 md:flex-none"
                  >
                    Huy bo
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary px-8 py-3 font-bold text-white shadow-lg shadow-secondary/20 transition-all hover:bg-secondary-dark disabled:opacity-60 md:flex-none"
                  >
                    {saving ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-lg">
                          progress_activity
                        </span>
                        Dang luu...
                      </>
                    ) : (
                      <>
                        <span>Luu thay doi</span>
                        <span className="material-symbols-outlined text-lg">save</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 rounded-2xl border border-primary/10 bg-primary/5 p-6 md:flex-row">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <div className="flex-1">
                <h5 className="mb-1 font-bold text-slate-900">Bao mat tai khoan</h5>
                <p className="text-sm leading-relaxed text-slate-600">
                  Tai khoan cua ban da duoc xac minh. Hay dat mat khau manh va giu thong
                  tin dang nhap an toan de bao ve du lieu hoc tap cua ban.
                </p>
              </div>
              <button type="button" className="text-sm font-bold text-primary underline hover:text-primary-dark">
                Tim hieu them
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
