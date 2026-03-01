import React, { useState, useEffect } from "react";
import toxiLogo from "../../../assets/image/LOGO (1).png"
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../api/authApi";

export default function StepReset(){
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [otpToken, setOtpToken] = useState('');

  useEffect(() => {
    // Lấy email đã verified từ localStorage
    const email = localStorage.getItem('verifiedEmail');
    const token = localStorage.getItem('otpToken');
    
    if (!email || !token) {
      setError('Phiên làm việc hết hạn. Vui lòng quay lại và xác thực OTP lại.');
      setTimeout(() => navigate('/MissingPassword'), 2000);
      return;
    }
    
    setVerifiedEmail(email);
    setOtpToken(token);
  }, [navigate]);

  const getPasswordStrength = (pwd) => {
    if (pwd.length < 8) return 0;
    if (pwd.length < 10) return 1;
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pwd)) return 1;
    return pwd.length >= 12 && /[!@#$%^&*]/.test(pwd) ? 3 : 2;
  };

  const strengthText = ['Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'];
  const strengthColor = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const strength = getPasswordStrength(passwords.new);

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (passwords.new.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }
    
    if (passwords.new !== passwords.confirm) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (!verifiedEmail) {
      setError('Email không tìm thấy. Vui lòng quay lại và xác thực lại.');
      return;
    }

    setLoading(true);

    try {
      // Gọi API reset password
      // Lưu ý: Backend sẽ cần endpoint này để xử lý
      const response = await resetPasswordApi(verifiedEmail, otpToken, passwords.new);
      
      if (response.data?.success) {
        // Xoá tokens từ localStorage
        localStorage.removeItem('verifiedEmail');
        localStorage.removeItem('otpToken');
        localStorage.removeItem('resetEmail');

        alert('Mật khẩu đã được cập nhật thành công!');
        navigate('/login');
      } else {
        setError(response.data?.message || 'Cập nhật mật khẩu thất bại');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Cập nhật mật khẩu không thành công. Vui lòng thử lại.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };
    return(
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
                 <button
                   type="button"
                   onClick={() => navigate("/home")}
                   className="absolute top-5 right-5 text-slate-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-black/5 group z-20"
                 >
                   <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">
                     close
                   </span>
                 </button>
       
                 {/* FORM SECTION - RIGHT */}
                 <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-between">

      {/* Header */}
      <div className="mb-8">
        <h3 className="text-secondary dark:text-white text-3xl font-bold leading-tight tracking-tight mb-3">
          Đặt lại mật khẩu
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Sử dụng ít nhất 8 ký tự, bao gồm chữ cái và chữ số để bảo mật tốt nhất.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* New Password */}
        <div className="flex flex-col gap-3">
          <label className="text-secondary dark:text-white text-sm font-semibold">
            Mật khẩu mới
          </label>

          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              lock
            </span>

            <input
              type={showPassword ? "text" : "password"}
              value={passwords.new}
              onChange={(e) => handlePasswordChange('new', e.target.value)}
              placeholder="••••••••"
              required
              className="w-full h-12 pl-12 pr-12 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 border-gray-300 dark:border-slate-600 rounded-xl text-text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400 font-medium hover:border-primary"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>

          {/* Password Strength */}
          {passwords.new && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strengthColor[strength]}`}
                  style={{ width: `${(strength + 1) * 25}%` }}
                ></div>
              </div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {strengthText[strength]}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-3">
          <label className="text-secondary dark:text-white text-sm font-semibold">
            Xác nhận mật khẩu mới
          </label>

          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              check_circle
            </span>

            <input
              type={showConfirm ? "text" : "password"}
              value={passwords.confirm}
              onChange={(e) => handlePasswordChange('confirm', e.target.value)}
              placeholder="••••••••"
              required
              className="w-full h-12 pl-12 pr-12 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 border-gray-300 dark:border-slate-600 rounded-xl text-text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400 font-medium hover:border-primary"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                {showConfirm ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>

          {/* Match Indicator */}
          {passwords.confirm && passwords.new && (
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className={`material-symbols-outlined text-sm ${passwords.new === passwords.confirm ? 'text-green-500' : 'text-red-500'}`}>
                {passwords.new === passwords.confirm ? 'check_circle' : 'cancel'}
              </span>
              <span className={passwords.new === passwords.confirm ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                {passwords.new === passwords.confirm ? 'Mật khẩu khớp' : 'Mật khẩu không khớp'}
              </span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-lg">error</span>
            <p className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !passwords.new || !passwords.confirm || passwords.new !== passwords.confirm}
          className="mt-4 w-full h-12 bg-primary hover:bg-primary-hover disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-base rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group disabled:shadow-none"
        >
          {loading ? (
            <>
              <span className="animate-spin">
                <span className="material-symbols-outlined text-lg">
                  loading
                </span>
              </span>
              <span>Đang cập nhật...</span>
            </>
          ) : (
            <>
              <span>Cập nhật mật khẩu</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                check_circle
              </span>
            </>
          )}
        </button>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-secondary dark:hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Quay lại đăng nhập
          </Link>
        </div>

      </form>
    </div>

    {/* LEFT PANEL - LOGO */}
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