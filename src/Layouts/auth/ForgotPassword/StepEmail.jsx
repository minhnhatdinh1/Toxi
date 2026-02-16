import react from 'react';
import toxiLogo from "../../../assets/image/LOGO (1).png"
import { Link } from "react-router-dom";
export default function StepEmail({ email, setEmail }) {
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
          <img
            alt="Abstract ink wash painting style background representing Chinese culture"
            className="w-full h-full object-cover opacity-30 grayscale"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEE4ACSy_8D3F3acz2enodKsiKuBRE2kN21op5MA9cbj26Yy4V8RTRusff-Q_l_4TVcTG8b3Z8_eIDTnxKi9VvjZMFCGnRzS0hHcx2wwlJqSRWHf7ipu8BMo3o_sA2aKsurdoq8IwFBpXPDxQWkU10I1enmjFS9Cl9V_EEbjzC2qNXCnmlnCwC3AYqrLEeAm7FMI4qbMt4nOecFhlFC7yGvyPw3cA0AvzCsWy8oAxGEieZDASvONePzr-b4mYGyM3lIyLbe7F4dMg"
          />
        </div>

        {/* CARD */}
        <div className="relative w-full max-w-[900px] bg-[#fcfbf8] dark:bg-[#1a1a1a] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden z-10">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="absolute top-5 right-5 text-slate-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-black/5 group z-20"
          >
            <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">
              close
            </span>
          </button>

          {/* LEFT PANEL */}
          <div className="hidden md:flex md:w-5/12 bg-secondary relative flex-col items-center justify-center p-8 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-chinese-pattern"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-dark/50 to-secondary/80 z-0"></div>

            <div className="relative z-10 flex flex-col items-center h-full justify-center">
              <div className="mb-6 flex flex-col items-center">
                <div className="w-32 h-16 relative mb-2">
                  <img src={toxiLogo} alt="TOXI Logo" className="w-full h-full object-contain" />
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
                Khám phá văn hóa, chinh phục ngôn ngữ cùng hàng ngàn học viên khác.
              </p>
            </div>

            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col items-center justify-center relative">
            <div className="w-full max-w-md">
              <div className="mb-10">
                <h3 className="text-secondary dark:text-white text-3xl font-bold leading-tight tracking-tight mb-3">
                  Quên mật khẩu?
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Vui lòng nhập email đã đăng ký. Chúng tôi sẽ gửi một liên kết để bạn đặt lại mật khẩu mới.
                </p>
              </div>

              <form className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary dark:text-white text-sm font-semibold">
                    Email khôi phục
                  </label>

                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors">
                      mail
                    </span>

                    <input
                      type="email"
                      required
                      placeholder="example@email.com"
                      className="w-full h-12 pl-12 pr-4 bg-background-light dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-gray-400 font-medium"
                    />
                  </div>
                </div>

                <Link
                  to="/MissingPasswordStepCode"
                  className="mt-2 w-full h-12 bg-primary hover:bg-primary-hover text-secondary font-bold text-base rounded-xl shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 transform active:scale-[0.98] flex items-center justify-center gap-2 group"
                >
                  <span>Gửi liên kết khôi phục</span>
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </Link>

                <div className="mt-6 text-center">
                  <a
                    href="/Login"
                    className="inline-flex items-center gap-2 text-sm font-bold text-secondary dark:text-primary hover:underline decoration-2 underline-offset-4"
                  >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Quay lại Đăng nhập
                  </a>
                </div>
              </form>

              <div className="absolute bottom-4 right-6 pointer-events-none opacity-[0.02]">
                <span className="text-9xl font-serif text-secondary dark:text-white">信</span>
              </div>

              <div className="absolute bottom-[-10px] right-[-10px] w-32 h-32 peach-blossom transform rotate-45">
                <svg
                  className="fill-secondary/10 dark:fill-primary/10"
                  viewBox="0 0 100 100"
                >
                  <path d="M50 50 C60 20 90 20 50 50 C20 60 20 90 50 50 Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
