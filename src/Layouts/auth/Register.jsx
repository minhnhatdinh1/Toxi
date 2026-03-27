import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { registerApi } from "./api/authApi";
import { useToast } from "../common/ToastContext";

const INITIAL_FORM = {
  userName: "",
  passWord: "",
  confirmPassword: "",
  fullName: "",
  email: "",
  phone: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(0|\+84)\d{9,10}$/;

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => !loading, [loading]);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.userName.trim()) nextErrors.userName = "Vui lòng nhập tên tài khoản";
    else if (formData.userName.trim().length < 4) nextErrors.userName = "Tên tài khoản phải có ít nhất 4 ký tự";

    if (!formData.passWord) nextErrors.passWord = "Vui lòng nhập mật khẩu";
    else if (formData.passWord.length < 5) nextErrors.passWord = "Mật khẩu phải có ít nhất 5 ký tự";

    if (!formData.confirmPassword) nextErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
    else if (formData.passWord !== formData.confirmPassword) nextErrors.confirmPassword = "Mật khẩu xác nhận không khớp";

    if (!formData.fullName.trim()) nextErrors.fullName = "Vui lòng nhập họ và tên";

    if (!formData.email.trim()) nextErrors.email = "Vui lòng nhập email";
    else if (!EMAIL_REGEX.test(formData.email.trim())) nextErrors.email = "Email không hợp lệ";

    if (!formData.phone.trim()) nextErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!PHONE_REGEX.test(formData.phone.trim())) nextErrors.phone = "Số điện thoại không hợp lệ";

    return nextErrors;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSuccessMessage("");
    setError("");

    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleRegister = async () => {
    const nextErrors = validateForm();
    setFieldErrors(nextErrors);
    setSuccessMessage("");

    if (Object.keys(nextErrors).length > 0) {
      const firstError = Object.values(nextErrors)[0];
      setError(firstError);
      toast.addToast(firstError, "error");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await registerApi({
        userName: formData.userName.trim(),
        passWord: formData.passWord,
        confirmPassword: formData.confirmPassword,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      });

      const message = "Đăng ký thành công. Bạn có thể đăng nhập ngay bây giờ.";
      setSuccessMessage(message);
      setFieldErrors({});
      setFormData(INITIAL_FORM);
      toast.addToast(message, "success");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (err) {
      const message = err.response?.data?.message || "Đăng ký thất bại";
      setError(message);
      setSuccessMessage("");
      toast.addToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const getInputClassName = (field) =>
    `w-full bg-white text-slate-800 placeholder:text-slate-400 border rounded-lg px-4 py-3 pl-11 focus:outline-none focus:ring-1 transition-all shadow-sm group-hover:border-primary/50 ${
      fieldErrors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500"
        : "border-slate-200 focus:border-primary focus:ring-primary"
    }`;

  return (
    <>
      <div className="font-display min-h-screen bg-surface text-slate-800 antialiased selection:bg-primary selection:text-white">
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Abstract artistic blurred background with red and dark tones resembling ink wash painting"
              className="h-full w-full object-cover opacity-30"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVb7we3aGH3IkrV7DFvD4zM7g9i4aAJWEEuTK-TpTtUA2gWXKs8uDxOuP0LYhrJ_t0fPe0_pXChtkqgTGcE"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/80"></div>
          </div>

          <div className="relative z-10 w-full max-w-[1000px] animate-in zoom-in p-4 fade-in duration-300">
            <div className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-secondary/40 bg-surface/95 shadow-2xl backdrop-blur-xl">
              <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-primary"></div>

              <button
                type="button"
                onClick={() => navigate("/home")}
                className="group absolute right-5 top-5 z-20 rounded-full p-2 text-slate-400 transition-colors hover:bg-black/5 hover:text-primary"
              >
                <span className="material-symbols-outlined text-2xl transition-transform duration-300 group-hover:rotate-90">
                  close
                </span>
              </button>

              <div className="flex h-full flex-col md:flex-row">
                <div className="relative flex-1 p-8 md:p-10 lg:p-12">
                  <div className="pointer-events-none absolute left-0 top-0 h-24 w-24 border-l-[6px] border-t-[6px] border-secondary/20 opacity-50"></div>
                  <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 border-r-[6px] border-t-[6px] border-secondary/20 opacity-50"></div>

                  <div className="relative mb-10 text-center">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-primary/5">
                      <span className="material-symbols-outlined text-9xl">temple_buddhist</span>
                    </div>

                    <h2 className="mb-2 text-3xl font-bold tracking-tight text-primary md:text-4xl">
                      Đăng ký tài khoản
                    </h2>

                    <p className="font-serif text-lg font-bold uppercase tracking-[0.3em] text-secondary opacity-90">
                      注册账户
                    </p>

                    <p className="mt-2 text-sm font-medium text-slate-500">
                      Chào mừng đến với TOXI - Học để ứng dụng (学以致用)
                    </p>
                  </div>

                  {(error || successMessage) && (
                    <div
                      className={`mb-6 rounded-xl border px-4 py-3 text-sm font-medium ${
                        successMessage
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-red-200 bg-red-50 text-red-600"
                      }`}
                    >
                      {successMessage || error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
                    <div className="flex flex-col gap-5">
                      <h3 className="mb-1 flex items-center gap-2 border-b border-primary/20 pb-2 text-xs font-bold uppercase tracking-wider text-primary">
                        <span className="material-symbols-outlined text-lg text-secondary">manage_accounts</span>
                        Thông tin tài khoản
                      </h3>

                      <label className="group flex flex-col">
                        <span className="mb-2 text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-primary">
                          Tên tài khoản
                        </span>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Nhập tên đăng nhập"
                            value={formData.userName}
                            onChange={handleChange("userName")}
                            className={getInputClassName("userName")}
                          />
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 transition-colors group-focus-within:text-primary">
                            person
                          </span>
                        </div>
                        {fieldErrors.userName && <p className="mt-1 text-sm text-red-600">{fieldErrors.userName}</p>}
                      </label>

                      <label className="group flex flex-col">
                        <span className="mb-2 text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-primary">
                          Mật khẩu
                        </span>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder="Tạo mật khẩu"
                            value={formData.passWord}
                            onChange={handleChange("passWord")}
                            className={getInputClassName("passWord")}
                          />
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 transition-colors group-focus-within:text-primary">
                            lock
                          </span>
                        </div>
                        {fieldErrors.passWord && <p className="mt-1 text-sm text-red-600">{fieldErrors.passWord}</p>}
                      </label>

                      <label className="group flex flex-col">
                        <span className="mb-2 text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-primary">
                          Xác nhận mật khẩu
                        </span>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={formData.confirmPassword}
                            onChange={handleChange("confirmPassword")}
                            className={getInputClassName("confirmPassword")}
                          />
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 transition-colors group-focus-within:text-primary">
                            lock_reset
                          </span>
                        </div>
                        {fieldErrors.confirmPassword && <p className="mt-1 text-sm text-red-600">{fieldErrors.confirmPassword}</p>}
                      </label>
                    </div>

                    <div className="flex flex-col gap-5">
                      <h3 className="mb-1 flex items-center gap-2 border-b border-primary/20 pb-2 text-xs font-bold uppercase tracking-wider text-primary">
                        <span className="material-symbols-outlined text-lg text-secondary">badge</span>
                        Thông tin cá nhân
                      </h3>

                      <label className="group flex flex-col">
                        <span className="mb-2 text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-primary">
                          Họ và tên
                        </span>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Nhập họ và tên đầy đủ"
                            value={formData.fullName}
                            onChange={handleChange("fullName")}
                            className={getInputClassName("fullName")}
                          />
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 transition-colors group-focus-within:text-primary">
                            id_card
                          </span>
                        </div>
                        {fieldErrors.fullName && <p className="mt-1 text-sm text-red-600">{fieldErrors.fullName}</p>}
                      </label>

                      <label className="group flex flex-col">
                        <span className="mb-2 text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-primary">
                          Email
                        </span>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={handleChange("email")}
                            className={getInputClassName("email")}
                          />
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 transition-colors group-focus-within:text-primary">
                            mail
                          </span>
                        </div>
                        {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>}
                      </label>

                      <label className="group flex flex-col">
                        <span className="mb-2 text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-primary">
                          Số điện thoại
                        </span>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="09xxxxxxxx"
                            value={formData.phone}
                            onChange={handleChange("phone")}
                            className={getInputClassName("phone")}
                          />
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 transition-colors group-focus-within:text-primary">
                            call
                          </span>
                        </div>
                        {fieldErrors.phone && <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>}
                      </label>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col items-center gap-4">
                    <button
                      type="button"
                      onClick={handleRegister}
                      disabled={!canSubmit}
                      className="group flex w-full items-center justify-center gap-3 rounded-xl border border-transparent bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-primary/40 disabled:cursor-not-allowed disabled:opacity-70 md:max-w-md"
                    >
                      <span className="text-lg tracking-wide">
                        {loading ? "Đang xử lý..." : "Đăng ký ngay"}
                      </span>
                      <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </button>

                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <span className="text-slate-500">Bạn đã có tài khoản?</span>
                      <Link
                        to="/login"
                        className="font-bold text-primary transition-colors hover:text-secondary hover:underline decoration-1 underline-offset-4"
                      >
                        Đăng nhập ngay
                      </Link>
                    </div>
                  </div>

                  <div className="mt-8 px-4 text-center">
                    <p className="text-xs leading-relaxed text-slate-400">
                      Bằng việc đăng ký, bạn đồng ý với{" "}
                      <a
                        href="#"
                        className="underline decoration-slate-300 underline-offset-2 transition-colors hover:text-primary"
                      >
                        Điều khoản dịch vụ
                      </a>{" "}
                      và{" "}
                      <a
                        href="#"
                        className="underline decoration-slate-300 underline-offset-2 transition-colors hover:text-primary"
                      >
                        Chính sách bảo mật
                      </a>{" "}
                      của TOXI.
                    </p>
                  </div>

                  <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 border-b-[6px] border-l-[6px] border-secondary/20 opacity-50"></div>
                  <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 border-b-[6px] border-r-[6px] border-secondary/20 opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
