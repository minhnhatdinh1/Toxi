import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { createAdminStudent } from "./api/apiStudent";

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
    status: true,
  };

  const [formData, setFormData] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.username.trim()) return setError("Username không được để trống."), false;
    if (!formData.fullName.trim()) return setError("Họ tên không được để trống."), false;
    if (!formData.email.trim()) return setError("Email không được để trống."), false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return setError("Email không đúng định dạng."), false;
    if (formData.password.length < 6) return setError("Mật khẩu phải có ít nhất 6 ký tự."), false;
    if (formData.password !== formData.confirmPassword) return setError("Mật khẩu xác nhận không khớp."), false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    try {
      setSaving(true);
      await createAdminStudent({
        username: formData.username.trim(),
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        password: formData.password,
        status: formData.status,
      });
      window.alert("Tạo học viên thành công.");
      navigate("/adminStudent");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Không thể tạo học viên.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (Object.values(formData).some((value) => value && value !== true)) {
      if (!window.confirm("Bạn muốn hủy và bỏ dữ liệu đã nhập?")) return;
    }
    navigate("/adminStudent");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto bg-slate-50">
        <div className="mx-auto max-w-5xl px-8 py-10">
          <div className="mb-10 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <button type="button" onClick={() => navigate("/adminStudent")} className="hover:underline">
                Quản lý học viên
              </button>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-slate-500">Thêm học viên</span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-900">Thêm học viên mới</h2>
            <p className="text-slate-500">Tạo tài khoản học viên mới và mặc định kích hoạt truy cập.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-2 bg-gradient-to-r from-primary via-yellow-400 to-primary" />

            <div className="p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="col-span-2 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="material-symbols-outlined text-primary">account_circle</span>
                    <h3 className="text-lg font-bold text-slate-900">Thông tin tài khoản</h3>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Username</label>
                    <input name="username" value={formData.username} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary/30" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Họ tên</label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary/30" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Email</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary/30" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Số điện thoại</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary/30" />
                  </div>

                  <div className="col-span-2 flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Địa chỉ</label>
                    <textarea rows={3} name="address" value={formData.address} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary/30" />
                  </div>

                  <div className="col-span-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <label className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">Kích hoạt ngay sau khi tạo</p>
                        <p className="text-sm text-slate-500">Tài khoản mới mặc định hoạt động.</p>
                      </div>
                      <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary" />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="col-span-2 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="material-symbols-outlined text-primary">lock</span>
                    <h3 className="text-lg font-bold text-slate-900">Mật khẩu</h3>
                  </div>

                  <div className="relative flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Mật khẩu</label>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-primary/30"
                    />
                    <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute bottom-3 right-4 text-slate-400">
                      <span className="material-symbols-outlined text-sm">{showPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>

                  <div className="relative flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Xác nhận mật khẩu</label>
                    <input
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-primary/30"
                    />
                    <button type="button" onClick={() => setShowConfirm((prev) => !prev)} className="absolute bottom-3 right-4 text-slate-400">
                      <span className="material-symbols-outlined text-sm">{showConfirm ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
                  <button type="button" onClick={handleCancel} disabled={saving} className="rounded-xl px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50">
                    Hủy
                  </button>

                  <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-3 font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 disabled:opacity-50">
                    <span className="material-symbols-outlined text-lg">person_add</span>
                    {saving ? "Đang lưu..." : "Lưu học viên"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
