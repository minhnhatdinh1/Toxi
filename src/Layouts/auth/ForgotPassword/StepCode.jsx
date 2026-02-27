import react, { useState, useEffect, useRef } from 'react';
import toxiLogo from "../../../assets/image/LOGO (1).png"
import { Link, useNavigate } from "react-router-dom";
import { verifyOtpApi, resendOtpApi } from "../api/authApi";

export default function StepCode({ code, setCode }) {
    const navigate = useNavigate();
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(59);
    const [canResend, setCanResend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState(localStorage.getItem('resetEmail') || '');
    const inputRefs = useRef([]);

    useEffect(() => {
      if (timer > 0 && !canResend) {
        const interval = setTimeout(() => setTimer(timer - 1), 1000);
        return () => clearTimeout(interval);
      } else if (timer === 0) {
        setCanResend(true);
      }
    }, [timer, canResend]);

    const handleInputChange = (index, value) => {
      if (!/^\d*$/.test(value)) return;
      
      const newValues = [...otpValues];
      newValues[index] = value.slice(-1);
      setOtpValues(newValues);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index, e) => {
      if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      
      try {
        const fullOtp = otpValues.join('');
        
        if (!email) {
          setError('Email không tìm thấy. Vui lòng quay lại và nhập email.');
          setLoading(false);
          return;
        }

        const response = await verifyOtpApi(email, fullOtp);
        
        if (response.data?.success) {
          // Lưu token/session để sử dụng ở bước reset password
          localStorage.setItem('otpToken', response.data?.token || 'verified');
          localStorage.setItem('verifiedEmail', email);
          
          // Chuyển sang trang reset password
          navigate('/reset-password');
        } else {
          setError(response.data?.message || 'Mã xác thực không hợp lệ');
          setOtpValues(['', '', '', '', '', '']);
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Xác thực OTP thất bại. Vui lòng thử lại.';
        setError(errorMsg);
        setOtpValues(['', '', '', '', '', '']);
      } finally {
        setLoading(false);
      }
    };

    const handleResend = async () => {
      setLoading(true);
      setError('');
      
      try {
        if (!email) {
          setError('Email không tìm thấy. Vui lòng quay lại và nhập email.');
          setLoading(false);
          return;
        }

        const response = await resendOtpApi(email);
        
        if (response.data?.success) {
          setTimer(59);
          setCanResend(false);
          setOtpValues(['', '', '', '', '', '']);
          inputRefs.current[0]?.focus();
          alert('Mã xác thực mới đã được gửi đến email của bạn');
        } else {
          setError(response.data?.message || 'Gửi lại OTP thất bại');
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Gỡi lại OTP không thành công. Vui lòng thử lại.';
        setError(errorMsg);
      } finally {
        setLoading(false);
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEE4ACSy_8D3F3acz2enodKsiKuBRE2kN21op5MA9cbj26Yy4V8RTRusff-Q_l_4TVcTG8b3Z8_eIDTnxKi9VvjZMFCGnRzS0hHcx2wwlJqSRWHf7ipu8BMo3o_sA2aKsurdoq8IwFBpXPDxQWkU10I1enmjFS9Cl9V_EEbjzC2qNXCnmlnCwC3AYqrLEeAm7FMI4qbMt4nOecFhlFC7yGvyPw3cA0AvzCsWy8oAxGEieZDASvONePzr-b4mYGyM3lIyLbe7F4dMg"
                />
              </div>
      
              {/* CARD */}
              <div className="relative w-full max-w-[900px] bg-[#fcfbf8] dark:bg-[#1a1a1a] rounded-2xl shadow-2xl flex flex-col md:flex-row-reverse overflow-hidden z-10">
                <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-between">
      {/* Close Button */}
      <button
        type="button"
        onClick={() => navigate("/home")}
        className="absolute top-5 right-5 text-slate-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-black/5 group z-20"
      >
        <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">
          close
        </span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <h3 className="text-secondary dark:text-white text-3xl font-bold leading-tight tracking-tight mb-3">
          Nhập mã xác thực
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Mã xác thực gồm 6 chữ số đã được gửi đến email của bạn.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-xl">error</span>
            <p className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 sm:gap-4">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              pattern="[0-9]*"
              value={otpValues[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 border-gray-300 dark:border-slate-600 rounded-xl shadow-sm hover:shadow-md hover:border-primary dark:hover:border-primary focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-600"
              placeholder="·"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={loading || otpValues.some(v => !v)}
            className="w-full h-12 bg-primary hover:bg-primary-hover disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-base rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group disabled:shadow-none"
          >
            {loading ? (
              <>
                <span className="animate-spin">
                  <span className="material-symbols-outlined text-lg">
                    loading
                  </span>
                </span>
                <span>Đang xác nhận...</span>
              </>
            ) : (
              <>
                <span>Xác nhận mã</span>
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                  verified_user
                </span>
              </>
            )}
          </button>

          {/* Resend */}
          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className="text-sm text-primary dark:text-amber-400 font-bold hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang gửi...' : 'Gửi lại mã xác thực'}
              </button>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Chưa nhận được mã?
                <span className="text-primary dark:text-amber-400 font-bold ml-1">
                  Gửi lại sau {timer}s
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Change email */}
        <div className="text-center">
          <Link
            to="/forgot-password"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-secondary dark:hover:text-primary transition-colors decoration-2 underline-offset-4"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Thay đổi email
          </Link>
        </div>

      </form>
    </div>

    {/* LEFT PANEL */}
    <div className="hidden md:flex md:w-2/5 bg-gradient-to-b from-orange-500 to-amber-600 text-white p-10 flex-col justify-center items-center relative">
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
              </div>
            </div>
        </>
    )
};