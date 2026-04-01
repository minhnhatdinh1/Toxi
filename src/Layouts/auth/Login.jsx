
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toxiLogo from "../../assets/image/LOGO (1).png";

import { useCart } from "../../context/CartContext"; 
import { jwtDecode } from "jwt-decode";
import { loginApi } from "./api/authApi";
import { useToast } from '../common/ToastContext';
export default function Login() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
 const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
    const toast = useToast();
const { mergeCartAfterLogin } = useCart();


  const handleLogin = async (e) => {
    e.preventDefault();
  setError('');
    const errors = {};
    if (!userName.trim()) errors.userName = 'Vui lòng nhập tài khoản '
    if (!passWord) errors.passWord = 'Vui lòng nhập mật khẩu';

    if (passWord && passWord.length < 5) errors.passWord = 'Mật khẩu ít nhất 5 kí tự';


    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      const first = Object.values(errors)[0];
      setError(first);
      toast.addToast(first, 'error');
      return;
    }



    try {
      // replace with real API call
      const res = await loginApi({
        userName,
        passWord,
      });
      const token = res.data.accessToken;  
    localStorage.setItem("token", res.data.accessToken);
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("userId", res.data.userId);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("userName", res.data.userName);
    localStorage.setItem("email", res.data.email); 
       localStorage.setItem("phone", res.data.phone); 
       await mergeCartAfterLogin(token);


    // Decode token để lấy role
    const decoded = jwtDecode(token);
    const redirectFromState = location.state?.from;
    const redirectFromSession = sessionStorage.getItem("learnRedirectAfterLogin");

      console.log("Login success:", res.data);


    if (decoded.role === "ADMIN") {
      sessionStorage.removeItem("learnRedirectAfterLogin");
      navigate("/admin");
        toast.addToast('Đăng nhập thành công ', 'success');
    } else {
        toast.addToast('Đăng nhập thành công', 'success');
      const redirectTarget = redirectFromState || redirectFromSession || "/";
      sessionStorage.removeItem("learnRedirectAfterLogin");
      navigate(redirectTarget, { replace: true });

    } }catch (err) {
      const message = err.response?.data?.message || "Đăng nhập thất bại";
      setError(message);
      toast.addToast(message, 'error');

    }



};

  return (
    <>
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
        <img
  src="https://images.unsplash.com/photo-1583394838336-acd977736f90"
  alt="Chinese ink wash background"
  className="w-full h-full object-cover opacity-30 grayscale"
/>
        </div>

        {/* CARD */}
        <div className="relative w-full max-w-[900px] bg-[#fcfbf8] dark:bg-[#1a1a1a] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden z-10">
          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-secondary dark:text-white/80"
          >
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
                     autoComplete="off"
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 bg-background-light dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-gray-400 font-medium"
                  />
                  {fieldErrors.userName && (
                    <p className="text-sm text-red-600 mt-1">{fieldErrors.userName}</p>
                  )}
                </div>
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-secondary dark:text-white text-sm font-semibold">
                    Mật khẩu
                  </label>
                  <Link
                    to="/MissingPassword"
                    className="text-sm text-gray-500 hover:text-secondary dark:hover:text-primary transition-colors"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors">
                    lock
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                      autoComplete="new-password"
                    value={passWord}
                    onChange={(e) => setPassWord(e.target.value)}
                    className="w-full h-12 pl-12 pr-12 bg-background-light dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-gray-400 font-medium"
                  />
                  {fieldErrors.passWord && (
                    <p className="text-sm text-red-600 mt-1">{fieldErrors.passWord}</p>
                  )}
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary dark:hover:text-primary transition-colors flex items-center"
                  >
                   
                  </button>
                </div>
              </div>


              {/* SUBMIT */}
              <button
                type="submit"

              
                className="mt-2 w-full h-12 bg-primary hover:bg-primary-hover text-secondary font-bold text-base rounded-xl shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 transform active:scale-[0.98] flex items-center justify-center gap-2 group"


              >
                <span>Đăng nhập</span>
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
              {error && (
                <p className="text-red-600 text-sm mt-2">{error}</p>
              )}
        {/* PASSWORD */}
       
              {/* DIVIDER */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-wider">
                  Hoặc đăng nhập với
                </span>
                <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
              </div>

            
              {/* REGISTER */}
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Chưa có tài khoản?
                  <Link
                    to="/register"
                    className="font-bold text-secondary dark:text-primary hover:underline decoration-2 decoration-primary underline-offset-4 ml-1"
                  >
                    Đăng ký ngay
                  </Link>
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

