import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toxiLogo from "../assets/image/LOGO (1).png";
import { useCart } from "../context/CartContext";
import { useToast } from "../Layouts/common/ToastContext";
import { loginApi } from "../Layouts/auth/api/authApi";

export default function LoginModal({
  isOpen,
  onClose,
  onSuccess,
  title = "Dang nhap",
  description = "Dang nhap de tiep tuc hoc va mo noi dung khoa hoc.",
}) {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { mergeCartAfterLogin } = useCart();

  useEffect(() => {
    if (!isOpen) {
      setUserName("");
      setPassWord("");
      setFieldErrors({});
      setError("");
      setShowPassword(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    const errors = {};
    if (!userName.trim()) errors.userName = "Vui long nhap tai khoan";
    if (!passWord) errors.passWord = "Vui long nhap mat khau";
    if (passWord && passWord.length < 5) {
      errors.passWord = "Mat khau phai co it nhat 5 ky tu";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      setError(firstError);
      toast.addToast(firstError, "error");
      return;
    }

    try {
      setSubmitting(true);

      const res = await loginApi({ userName, passWord });
      const token = res.data.accessToken;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("userName", res.data.userName);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("phone", res.data.phone);

      await mergeCartAfterLogin(token);

      const decoded = jwtDecode(token);
      toast.addToast("Dang nhap thanh cong", "success");

      if (decoded?.role === "ADMIN") {
        onClose?.();
        navigate("/admin");
        return;
      }

      onSuccess?.(res.data);
    } catch (err) {
      const message = err.response?.data?.message || "Dang nhap that bai";
      setError(message);
      toast.addToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          aria-label="Dong form dang nhap"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="relative hidden w-5/12 overflow-hidden bg-primary md:flex md:flex-col md:items-center md:justify-center md:p-10">
          <div className="absolute inset-0 bg-chinese-pattern opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary to-[#172a92]" />

          <div className="relative z-10 text-center text-white">
            <img
              src={toxiLogo}
              alt="TOXI Logo"
              className="mx-auto mb-5 h-20 w-auto object-contain"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-secondary">
              TOXI
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight">
              Hoc tiep khong bi gian doan
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/80">
              Dang nhap de vao bai hoc, theo doi tien do va dong bo du lieu cua
              ban.
            </p>
          </div>
        </div>

        <div className="w-full p-6 sm:p-8 md:w-7/12 md:p-10">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary/70">
              TOXI
            </p>
            <h3 className="text-3xl font-black text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Tai khoan
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  person
                </span>
                <input
                  type="text"
                  value={userName}
                  autoComplete="username"
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Nhap ten dang nhap"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
              </div>
              {fieldErrors.userName && (
                <p className="mt-2 text-sm text-red-600">{fieldErrors.userName}</p>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">
                  Mat khau
                </label>
                <Link
                  to="/MissingPassword"
                  onClick={onClose}
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-primary"
                >
                  Quen mat khau?
                </Link>
              </div>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={passWord}
                  autoComplete="current-password"
                  onChange={(e) => setPassWord(e.target.value)}
                  placeholder="Nhap mat khau"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-slate-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-primary"
                  aria-label={showPassword ? "An mat khau" : "Hien mat khau"}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {fieldErrors.passWord && (
                <p className="mt-2 text-sm text-red-600">{fieldErrors.passWord}</p>
              )}
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-secondary px-4 font-bold text-primary transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Dang xu ly..." : "Dang nhap"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Chua co tai khoan?{" "}
            <Link
              to="/register"
              onClick={onClose}
              className="font-bold text-primary hover:underline"
            >
              Dang ky ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
