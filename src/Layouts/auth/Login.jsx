import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toxiLogo from "../../assets/image/LOGO (1).png";
import { loginApi } from "./api/authApi";
export default function Login() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault(); // chặn reload form

    try {
      const res = await loginApi({
        userName: userName,
        passWord: passWord,
      });

      console.log("Login success:", res.data);
      alert("Đăng nhập thành công");

      // tạm thời chỉ redirect, CHƯA cần token
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Đăng nhập thất bại";
      alert(message);
    }
  };
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
          <img
            alt="Abstract ink wash painting style background representing Chinese culture"
            className="w-full h-full object-cover opacity-30 grayscale"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEE4ACS…FC7yGvyPw3cA0AvzCsWy8oAxGEieZDASvONePzr-b4mYGyM3lIyLbe7F4dMg"
          />
        </div>

        {/* CARD */}
        <div className="relative w-full max-w-[900px] bg-[#fcfbf8] dark:bg-[#1a1a1a] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden z-10">
          {/* CLOSE BUTTON */}
          <button className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-secondary dark:text-white/80">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* LEFT PANEL */}
          <div className="hidden md:flex md:w-5/12 bg-secondary relative flex-col items-center justify-center p-8 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-chinese-pattern"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-dark/50 to-secondary/80 z-0"></div>

            <div className="relative z-10 flex flex-col items-center h-full justify-center">
              <div className="mb-6 flex flex-col items-center">
                <div className="w-32 h-16 relative mb-2">
                  <img
                    src={toxiLogo}
                    alt="TOXI Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-white font-black text-2xl tracking-tighter leading-tight">
                  TIẾNG TRUNG
                </h2>
                <h1 className="text-white font-black text-5xl tracking-tight -mt-1">
                  TOXI
                </h1>
              </div>

              <p className="text-primary font-bold text-lg mb-4 tracking-[0.2em]">
                学以致用
              </p>

              <div className="w-16 h-1 bg-primary/30 rounded-full mb-6"></div>

              <p className="text-white/80 text-sm font-light leading-relaxed max-w-[220px]">
                Khám phá văn hóa, chinh phục ngôn ngữ cùng hàng ngàn học viên
                khác.
              </p>
            </div>

            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-14 flex flex-col justify-center relative bg-white dark:bg-[#222110]">
            {/* MOBILE LOGO */}
            <div className="md:hidden flex flex-col items-center mb-6">
              <div className="w-24 h-12 relative mb-1">
                <img
                  src={toxiLogo}
                  alt="TOXI Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <h2 className="text-secondary dark:text-white font-bold text-xl leading-none">
                TIẾNG TRUNG TOXI
              </h2>
              <p className="text-secondary/60 dark:text-white/60 text-[10px] mt-1">
                学以致用
              </p>
            </div>

            {/* TITLE */}
            <div className="mb-8">
              <h3 className="text-secondary dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-2">
                Đăng nhập / 登录
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
                Tiếp tục hành trình học tiếng Trung của bạn.
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleLogin}>
              {/* UserName */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary dark:text-white text-sm font-semibold">
                  Tài khoản
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors">
                    person
                  </span>
                  <input
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 bg-background-light dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-gray-400 font-medium"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-secondary dark:text-white text-sm font-semibold">
                    Mật khẩu
                  </label>
                  <a
                    href="#"
                    className="text-sm text-gray-500 hover:text-secondary dark:hover:text-primary transition-colors"
                  >
                    Quên mật khẩu?
                  </a>
                </div>

                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors">
                    lock
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passWord}
                    onChange={(e) => setPassWord(e.target.value)}
                    className="w-full h-12 pl-12 pr-12 bg-background-light dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-gray-400 font-medium"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary dark:hover:text-primary transition-colors flex items-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      visibility
                    </span>
                  </button>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                onClick={handleLogin}
                className="mt-2 w-full h-12 bg-primary hover:bg-primary-hover text-secondary font-bold text-base rounded-xl shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 transform active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <span>Đăng nhập</span>
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>

              {/* DIVIDER */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-wider">
                  Hoặc đăng nhập với
                </span>
                <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
              </div>

              {/* SOCIAL LOGIN */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 h-11 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBriWEOO…st6oPZt2v2oLFBUCWCDhzJcAcn_NC2W0Ddj1ANwpf-dRIV8oSgEbpY8h6sOU"
                    alt="Google"
                    className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Google
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 h-11 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc4JXfe…1F7MrtfcbjDzwIcDhs5Wv6hpfcviUCAVsb0AWI1L6dsdw5xma0jvqEkF7COo"
                    alt="Facebook"
                    className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Facebook
                  </span>
                </button>
              </div>

              {/* REGISTER */}
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Chưa có tài khoản?
                  <a
                    href="/register"
                    className="font-bold text-secondary dark:text-primary hover:underline decoration-2 decoration-primary underline-offset-4 ml-1"
                  >
                    Đăng ký ngay
                  </a>
                </p>
              </div>
            </form>

            {/* DECORATION */}
            <div className="absolute bottom-4 right-4 pointer-events-none opacity-[0.03]">
              <span className="text-9xl font-serif text-secondary dark:text-white">
                文
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
