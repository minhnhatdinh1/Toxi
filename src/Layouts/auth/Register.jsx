import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { registerApi } from "./api/authApi";
export default function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    passWord: "",
    confirmPassword: "",
    fullName: "",
    email: "",
    phone: "",
  });
  const handleRegister = async () => {
    if (formData.passWord !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }
=======
import * as api from "../service/ApiService";
export default function Register() {
 const handleRegister = async () => {
  if (formData.password !== formData.confirmPassword) {
    setError("Mật khẩu xác nhận không khớp");
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const payload = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      full_name: formData.full_name,
      phone: formData.phone,
      address: formData.address || "",
      avatar_url: formData.avatar_url || "",
      status: 1,
    };

    await api.register(payload);
    navigate("/login");
  } catch (err) {
    setError("Đăng ký thất bại");
  } finally {
    setLoading(false);
  }
};
>>>>>>> f0ebb05027f3fe9bb7ea2a5fa9b50504ed64224f

    try {
      await registerApi({
        userName: formData.userName,
        passWord: formData.passWord,
        confirmPassword: formData.confirmPassword,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });

      alert("Đăng ký thành công");
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Đăng ký thất bại";
      alert(message);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="font-display bg-surface text-slate-800 antialiased selection:bg-primary selection:text-white min-h-screen">
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              alt="Abstract artistic blurred background with   red and dark tones resembling ink wash painting"
              className="w-full h-full object-cover opacity-30"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVb7we3…-g9i4aAJWEEuTK-TpTtUA2gWXKs8uDxOuP0LYhrJ_t0fPe0_pXChtkqgTGcE"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/80"></div>
          </div>

          {/* Modal */}
          <div className="relative z-10 w-full max-w-[1000px] p-4 animate-in fade-in zoom-in duration-300">
            <div className="relative flex flex-col w-full bg-surface/95 backdrop-blur-xl border border-secondary/40 rounded-2xl shadow-2xl overflow-hidden">
              {/* Top gradient */}
              <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-primary"></div>

              {/* Close button */}
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="absolute top-5 right-5 text-slate-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-black/5 group z-20"
              >
                <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">
                  close
                </span>
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Left content */}
                <div className="flex-1 p-8 md:p-10 lg:p-12 relative">
                  <div className="absolute top-0 left-0 w-24 h-24 border-t-[6px] border-l-[6px] border-secondary/20 pointer-events-none opacity-50"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 border-t-[6px] border-r-[6px] border-secondary/20 pointer-events-none opacity-50"></div>

                  <div className="text-center mb-10 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/5 pointer-events-none select-none">
                      <span className="material-symbols-outlined text-9xl">
                        temple_buddhist
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">
                      Đăng ký tài khoản
                    </h2>

                    <p className="text-secondary font-bold text-lg uppercase tracking-[0.3em] opacity-90 font-serif">
                      注册账户
                    </p>

                    <p className="text-slate-500 mt-2 text-sm font-medium">
                      Chào mừng đến với TOXI - Học để ứng dụng (学以致用)
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    <div className="flex flex-col gap-5">
                      <h3 className="text-primary text-xs font-bold uppercase tracking-wider border-b border-primary/20 pb-2 mb-1 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg text-secondary">
                          manage_accounts
                        </span>
                        Thông tin tài khoản
                      </h3>

                      <label className="flex flex-col group">
                        <span className="text-slate-700 text-sm font-semibold mb-2 group-focus-within:text-primary transition-colors">
                          Tên tài khoản
                        </span>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Nhập tên đăng nhập"
                            value={formData.userName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                userName: e.target.value,
                              })
                            }
                            className="w-full bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm group-hover:border-primary/50"
                          />
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                            person
                          </span>
                        </div>
                      </label>

                      <label className="flex flex-col group">
                        <span className="text-slate-700 text-sm font-semibold mb-2 group-focus-within:text-primary transition-colors">
                          Mật khẩu
                        </span>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder="Tạo mật khẩu"
                            value={formData.passWord}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                passWord: e.target.value,
                              })
                            }
                            className="w-full bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm group-hover:border-primary/50"
                          />
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                            lock
                          </span>
                        </div>
                      </label>

                      <label className="flex flex-col group">
                        <span className="text-slate-700 text-sm font-semibold mb-2 group-focus-within:text-primary transition-colors">
                          Xác nhận mật khẩu
                        </span>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="w-full bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm group-hover:border-primary/50"
                          />
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                            lock_reset
                          </span>
                        </div>
                      </label>
                    </div>
                    <div className="flex flex-col gap-5">
                      <h3 className="text-primary text-xs font-bold uppercase tracking-wider border-b border-primary/20 pb-2 mb-1 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg text-secondary">
                          badge
                        </span>
                        Thông tin cá nhân
                      </h3>

                      <label className="flex flex-col group">
                        <span className="text-slate-700 text-sm font-semibold mb-2 group-focus-within:text-primary transition-colors">
                          Họ và tên
                        </span>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Nhập họ và tên đầy đủ"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                fullName: e.target.value,
                              })
                            }
                            className="w-full bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm group-hover:border-primary/50"
                          />
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                            id_card
                          </span>
                        </div>
                      </label>

                      <label className="flex flex-col group">
                        <span className="text-slate-700 text-sm font-semibold mb-2 group-focus-within:text-primary transition-colors">
                          Email
                        </span>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm group-hover:border-primary/50"
                          />
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                            mail
                          </span>
                        </div>
                      </label>

                      <label className="flex flex-col group">
                        <span className="text-slate-700 text-sm font-semibold mb-2 group-focus-within:text-primary transition-colors">
                          Số điện thoại
                        </span>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="09xxxxxxxx"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm group-hover:border-primary/50"
                          />
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                            call
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col items-center gap-4">
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="w-full md:max-w-md bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 group border border-transparent"
                    >
                      <span className="tracking-wide text-lg">
                        Đăng ký ngay
                      </span>

                      <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </button>

                    <div className="flex items-center gap-2 text-sm mt-2">
                      <span className="text-slate-500">
                        Bạn đã có tài khoản?
                      </span>
                      <a
                        href="/login"
                        className="text-primary hover:text-secondary font-bold hover:underline decoration-1 underline-offset-4 transition-colors"
                      >
                        Đăng nhập ngay
                      </a>
                    </div>
                  </div>

                  <div className="mt-8 text-center px-4">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Bằng việc đăng ký, bạn đồng ý với{" "}
                      <a
                        href="#"
                        className="hover:text-primary transition-colors underline decoration-slate-300 underline-offset-2"
                      >
                        Điều khoản dịch vụ
                      </a>{" "}
                      và{" "}
                      <a
                        href="#"
                        className="hover:text-primary transition-colors underline decoration-slate-300 underline-offset-2"
                      >
                        Chính sách bảo mật
                      </a>{" "}
                      của TOXI.
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-[6px] border-l-[6px] border-secondary/20 pointer-events-none opacity-50"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-[6px] border-r-[6px] border-secondary/20 pointer-events-none opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
