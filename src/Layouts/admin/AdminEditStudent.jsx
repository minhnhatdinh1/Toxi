import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { fetchAdminStudentById, updateAdminStudent } from "./api/apiStudent";

export default function AdminEditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const emptyForm = {
    username: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    status: true,
  };

  const [formData, setFormData] = useState(emptyForm);
  const [originalFormData, setOriginalFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStudent = async () => {
      try {
        setLoading(true);
        const student = await fetchAdminStudentById(id);
        const nextForm = {
          username: student.username || "",
          fullName: student.name || "",
          email: student.email || "",
          phone: student.phone || "",
          address: student.address || "",
          password: "",
          confirmPassword: "",
          status: student.status === "Active",
        };
        setFormData(nextForm);
        setOriginalFormData(nextForm);
      } catch (err) {
        console.error(err);
        setError("Không tải được thông tin học viên.");
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [id]);

  const hasChanges = useMemo(
    () => JSON.stringify(formData) !== JSON.stringify(originalFormData),
    [formData, originalFormData]
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username không được để trống.");
      return false;
    }
    if (!formData.fullName.trim()) {
      setError("Họ tên không được để trống.");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email không được để trống.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Email không đúng định dạng.");
      return false;
    }
    if (formData.password || formData.confirmPassword) {
      if (formData.password.length < 6) {
        setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu xác nhận không khớp.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    try {
      setSaving(true);
      const payload = {
        username: formData.username.trim(),
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        status: formData.status,
        ...(formData.password ? { password: formData.password } : {}),
      };

      const updated = await updateAdminStudent(id, payload);
      const nextForm = {
        username: updated.username || "",
        fullName: updated.name || "",
        email: updated.email || "",
        phone: updated.phone || "",
        address: formData.address.trim(),
        password: "",
        confirmPassword: "",
        status: updated.status === "Active",
      };
      setFormData(nextForm);
      setOriginalFormData(nextForm);
      window.alert("Cập nhật học viên thành công.");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Không thể lưu thay đổi.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges && !window.confirm("Bạn có thay đổi chưa lưu. Bỏ qua các thay đổi này?")) {
      return;
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
              <Link className="hover:underline" to="/adminStudent">
                Quản lý học viên
              </Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-slate-500">Chỉnh sửa học viên</span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Chỉnh sửa học viên
            </h2>
            <p className="text-slate-500">
              Cập nhật thông tin tài khoản học viên và trạng thái truy cập.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-2 bg-gradient-to-r from-primary via-yellow-400 to-primary" />

            <div className="p-8">
              {loading ? (
                <div className="py-24 text-center text-sm text-slate-500">
                  Đang tải thông tin học viên...
                </div>
              ) : (
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
                      <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary/30"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">Họ tên</label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary/30"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary/30"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">Số điện thoại</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary/30"
                      />
                    </div>

                    <div className="col-span-2 flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">Địa chỉ</label>
                      <textarea
                        rows={3}
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary/30"
                      />
                    </div>

                    <div className="col-span-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <label className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-900">Trạng thái tài khoản</p>
                          <p className="text-sm text-slate-500">
                            Bật để học viên có thể đăng nhập, tắt để khóa tài khoản.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          name="status"
                          checked={formData.status}
                          onChange={handleChange}
                          className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="col-span-2 flex items-center gap-2 border-b border-slate-100 pb-2">
                      <span className="material-symbols-outlined text-primary">lock</span>
                      <h3 className="text-lg font-bold text-slate-900">Đổi mật khẩu</h3>
                    </div>

                    <div className="relative flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">Mật khẩu mới</label>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Để trống nếu không đổi"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-primary/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute bottom-3 right-4 text-slate-400"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>

                    <div className="relative flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">Xác nhận mật khẩu</label>
                      <input
                        name="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Nhập lại mật khẩu mới"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-primary/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((prev) => !prev)}
                        className="absolute bottom-3 right-4 text-slate-400"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {showConfirm ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={saving}
                      className="rounded-xl px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                    >
                      Hủy
                    </button>

                    <button
                      type="submit"
                      disabled={saving || !hasChanges}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-3 font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-lg">save</span>
                      {saving ? "Đang lưu..." : "Lưu thay đổi"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
