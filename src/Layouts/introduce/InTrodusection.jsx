import React from "react";
import { useState, useEffect } from "react";
export default function IntroSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  const [time, setTime] = useState({
    days: 0,
    hours: 11,
    mins: 59,
    secs: 33,
  });

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { days, hours, mins, secs } = prev;

        if (secs > 0) {
          secs--;
        } else {
          secs = 59;
          if (mins > 0) {
            mins--;
          } else {
            mins = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, mins, secs };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
  };
  return (
    <main className=" ml-64 flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/50">
      
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-8 py-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Welcome to TOXI
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Experience the art of Mandarin
          </p>
        </div>

        <div className="flex items-center gap-4">

          <div className="w-10 h-10 rounded-full bg-chinese-gold flex items-center justify-center text-chinese-blue font-bold">
            JD
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Column */}
          <div className="space-y-8">

            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-chinese-gold/5 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 bg-chinese-gold/10 text-chinese-gold text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                  Giới thiệu khóa học tiếng Trung TOXI
                </span>

                <h3 className="text-4xl font-extrabold text-chinese-blue dark:text-white mb-4 leading-tight">
                  Trở thành chuyên gia tiếng Trung với{" "}
                  <span className="text-primary">TOXI Experts</span>
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                  Unlock a world of opportunities. Watch our quick orientation
                  video to see how our unique immersive method can help you
                  speak Chinese confidently in just 3 months.
                </p>

                {/* Video */}
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeaSIVR9nmOVHKV67XxGMZEvGgR0jzngEAE2OfvhAaKewPWZhIn0xB29CezarbZ8DgvFzt0eI9M3y0TiHsfmIjerfDYpVghDs20PD_7mOq5T7bpvV4hQEXRIflFokfOl3yJjURjwzbgX8mofssjaBbK0zs5WzRfFYLVrm4_2IlGpgCqV_sOLezCfF1uagbXf5kvQEANqCQBwrKfiWu2HVGaE5dXYaHusrhgn8-h08cB_qVlFIRmsltbv2JC1bNrl6wjOZw3PEyThw"
                    alt="Instructional Video"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group">
                      <span className="material-symbols-outlined text-5xl fill-1 group-hover:scale-110 transition-transform">
                        play_arrow
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-4">

              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <span className="material-symbols-outlined text-chinese-gold mb-2">
                  group
                </span>

                <h4 className="font-bold text-chinese-blue dark:text-white">
                  1-on-1 Coaching
                </h4>

                <p className="text-xs text-slate-500">
                  Personalized attention for every student.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <span className="material-symbols-outlined text-chinese-gold mb-2">
                  verified
                </span>

                <h4 className="font-bold text-chinese-blue dark:text-white">
                  HSK Certified
                </h4>

                <p className="text-xs text-slate-500">
                  Curriculum aligned with global standards.
                </p>
              </div>

            </div>

          </div>
           <div className="relative">
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="bg-white dark:bg-slate-800 rounded-[32px] shadow-2xl p-8 lg:p-10 border border-slate-100 dark:border-slate-700 relative z-10">

        {/* Title */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-chinese-blue dark:text-chinese-gold uppercase tracking-tight">
            Đăng ký tư vấn miễn phí
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            Sẵn sàng bắt đầu hành trình mới
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 text-xs font-bold uppercase mb-1.5 ml-1">
              Họ và Tên
            </label>

            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              type="text"
              className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl py-3.5 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 text-xs font-bold uppercase mb-1.5 ml-1">
              Số điện thoại
            </label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+84 ..."
              type="tel"
              className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl py-3.5 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 text-xs font-bold uppercase mb-1.5 ml-1">
              Địa chỉ Email
            </label>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              type="email"
              className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl py-3.5 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all uppercase tracking-widest text-lg mt-6"
          >
            Đăng ký ngay
          </button>

        </form>

        {/* Countdown */}
        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-700 text-center">

          <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-widest mb-4">
            Thời gian còn lại để nhận ưu đãi tư vấn miễn phí
          </p>

          <div className="flex justify-center gap-2">

            <TimeBox value={time.days} label="Days" />

            <Colon />

            <TimeBox value={time.hours} label="Hours" />

            <Colon />

            <TimeBox value={time.mins} label="Mins" />

            <Colon />

            <TimeBox value={time.secs} label="Secs" primary />

          </div>

        </div>

      </div>
    </div>
    </div>
      </div>

    </main>
  );
}

// Component hiển thị thời gian
function TimeBox({ value, label, primary }) {
  return (
    <div className="flex flex-col items-center min-w-[56px]">
      <div
        className={`w-full py-2 rounded-lg text-xl font-black ${
          primary ? "bg-primary text-white" : "bg-chinese-blue text-white"
        }`}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[10px] text-slate-400 mt-1 uppercase">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <div className="text-chinese-blue font-bold text-xl pt-2">:</div>

       
  );
}