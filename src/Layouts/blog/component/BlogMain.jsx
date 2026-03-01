import React from "react";
import { Link } from "react-router-dom";
export const BlogMain = () => {
  const missionData = [
  {
    title: "Tầm nhìn",
    description:
      "Trở thành hệ thống giáo dục tiếng Trung ứng dụng hàng đầu tại Việt Nam, nơi ươm mầm cho những tài năng ngôn ngữ vươn ra thế giới.",
    icon: "visibility",
    iconColor: "text-primary",
    bgColor: "bg-blue-100",
    hoverBg: "group-hover:bg-primary",
    hoverText: "group-hover:text-white",
  },
  {
    title: "Sứ mệnh",
    description:
      "Trao quyền cho học viên thông qua ngôn ngữ. Chúng tôi cung cấp công cụ để bạn mở rộng sự nghiệp và hiểu sâu sắc văn hóa Trung Hoa.",
    icon: "ads_click",
    iconColor: "text-accent",
    bgColor: "bg-amber-100",
    hoverBg: "group-hover:bg-accent",
    hoverText: "group-hover:text-white",
  },
  {
    title: "Giá trị cốt lõi",
    description:
      "Tận tâm trong giảng dạy - Thực tế trong nội dung - Hiệu quả trong kết quả. Học viên là trung tâm của mọi sự phát triển.",
    icon: "favorite",
    iconColor: "text-red-500",
    bgColor: "bg-red-100",
    hoverBg: "group-hover:bg-red-500",
    hoverText: "group-hover:text-white",
  },
];
const methodologySteps = [
  {
    step: 1,
    title: "Tiếp cận thực tế",
    level: "Cơ bản",
    description:
      "Xây dựng nền tảng vững chắc với phát âm chuẩn và từ vựng thông dụng nhất. Loại bỏ lý thuyết rườm rà.",
    icon: "hourglass_top",
    color: "primary",
    badgeBg: "bg-blue-100",
    badgeText: "text-primary",
    border: "border-primary",
    iconBorder: "border-primary text-primary",
  },
  {
    step: 2,
    title: "Giao tiếp phản xạ",
    level: "Tăng tốc",
    description:
      "Luyện tập phản xạ nghe nói liên tục thông qua các tình huống giả lập: mua sắm, du lịch, công sở.",
    icon: "record_voice_over",
    color: "accent",
    badgeBg: "bg-amber-100",
    badgeText: "text-accent",
    border: "border-accent",
    iconBorder: "border-accent text-accent",
  },
  {
    step: 3,
    title: "Văn hóa ứng dụng",
    level: "Chuyên sâu",
    description:
      "Hiểu sâu về văn hóa, phong tục kinh doanh và tư duy người bản xứ để giao tiếp tinh tế và hiệu quả hơn.",
    icon: "temple_buddhist",
    color: "primary",
    badgeBg: "bg-blue-100",
    badgeText: "text-primary",
    border: "border-primary",
    iconBorder: "border-primary text-primary",
  },
  {
    step: 4,
    title: "Thực hành liên tục",
    level: "Thành thạo",
    description:
      "Môi trường thực hành 24/7 với cộng đồng học viên và giảng viên, biến tiếng Trung thành ngôn ngữ thứ hai.",
    icon: "auto_stories",
    color: "accent",
    badgeBg: "bg-green-100",
    badgeText: "text-green-600",
    border: "border-accent",
    iconBorder: "bg-primary text-white shadow-lg shadow-primary/30",
    isLast: true,
  },
];
const teachers = [
  {
    name: "Ths. Nguyễn Thu Hà",
    role: "Giám đốc đào tạo",
    quote:
      "Học tiếng Trung là hành trình khám phá bản thân qua lăng kính văn hóa mới.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_1wfe6N9RdU8CzskjjX2zKqObUcuWTU-PY5Q2ry1yxNafa1hiBzl7ZVYMKx04ZFZZf-hyzAMOqd5Zl2p5el_Z0TcPzworRICWEpUJ2W2ZwVTSENiPBmkK8WSPHH5NYVoirHm7EjjaGBFL0k9BzH49z7XTKL7D8cUcdaq6ySJW7w44p2qHFOofVZj0hVmRIfiYqcyOkzgmcYzLWHJvqHjmjyk4nPhcwMdYDS9bub-IME-3Yl9Btr2Yg2GGNWZN91TejZogCqcTwUA",
  },
  {
    name: "Ths. Trần Văn Minh",
    role: "Giảng viên cao cấp",
    quote: "Đừng học vẹt, hãy học để hiểu và cảm nhận ngôn ngữ.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQke4N_RrAH4vKUsgm3zVwBhR2HT3NULTorthWDhxLoVh9uHv4M61AVM_DW1C3J56GkFNJ7b0N8imNdJPHIIEONzVeIXdIH5DXfg8HqF7FvSDw1bGnjD_1BUSLwBrVfRxEiXMyVMT5MhFUMdNoJbpMy38o3U80DJi1Q_13ihrbI3fv9mBUjhwDTlDQjOJWI3QeE38mYUhpvFNK2xO4SMOYSuaevN1_FjwIzX3pn7oWRrBAkrHxzIhXPC0z51l9A1MXcY114RBsWbM",
  },
  {
    name: "Cô Li Wei",
    role: "Chuyên gia bản ngữ",
    quote:
      "Phát âm chuẩn là chìa khóa vàng để mở mọi cánh cửa giao tiếp.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfYiLrUBwCW-Rnoi49b1rW9ejyDpiGUArCbZDMMdQy2tCQjSVI3qoGoKAl1WtIbZ3IOS-nn8j4eNaAtYcMiyioK3kJcHBLN5IxrceQdA3lPah2guR285QGv7ahq4yZWRQf-xJsAZXYi4HKkiMX7Qo23m_ptYHphJ1EbP1-kAVUT5nSWmdkrv_2bYd5_RP2FD4Kpp-hmyAAbjMOHOMXGEFH6ush3Yz702FheZx_SP4Qm2zi4us-TmcgmD8muwAru2n9LdBWlY6F_B8",
  },
  {
    name: "Ths. Lê Tuấn Anh",
    role: "Giảng viên HSK",
    quote:
      "Chinh phục HSK không khó nếu bạn có phương pháp đúng đắn.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfJRjDKNpkSA5Qf6_9PmJkeTi47SjKJ1pMBe7pn3bitDSfmbHp_SCHmj0PNFvCd3MTqXcVbjxXB8hOOH86qlNXC6kL5-wH0qK04lxaSBYKd6MUiS0xI5RF9JURH-e2JAwLtksaeCCRXUz3L7mMp2xat1ujKtM3oOuv72ZsCgqOioieCaCJRVEBcY253wrV3wacHhFjK13Z0TLEpYVb7WTuWSDH3Dhv8dmBk7eC6OJjZcc8W8IIj6kJM16Vw_TIZjzqGrzY97NEbU4",
  },
];

    return (
      <>
       <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 z-10"></div>

        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7Aal0RY3eFFsVX4Q67f9ilELfYt1RJKPilINebh5LbFIKNCzloROCfeTjVAQ2sc9fTmH1mdielrDic2fDCX4n_R88T60GuNTb120hJ4Cmz0XgnQ_lh0ZwkHaASjb51fqveEsYeSHSDt04x1G6wb9_u4unFqea1iZFi_vDRmaAkEzmW-J9ygmxwFLdZwU6O8c4LguYqHT2vAMcOiohVlGQbmNm03quBQYcR6lAbpzBiTWsH88yn3YbqXRNmoShaV1EoO_C996W_x8"
          alt="Modern classroom environment with students learning"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-md">
          <span className="text-accent text-xs font-bold tracking-widest uppercase">
            Giới thiệu về TOXI
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
          Học để ứng dụng <br />
          <span className="text-accent font-serif italic text-3xl md:text-5xl block mt-2 opacity-90">
            (学以致用)
          </span>
        </h1>

        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto text-white/90 leading-relaxed mb-8">
          Kết nối ngôn ngữ, mở rộng tương lai. Tại TOXI, chúng tôi không chỉ dạy
          tiếng Trung, chúng tôi kiến tạo cơ hội.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() =>
              document
                .getElementById("courses")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-accent hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
          >
            Tìm hiểu khóa học
          </button>

          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-3 px-8 rounded-xl transition-all"
          >
            Liên hệ tư vấn
          </button>
        </div>
      </div>
    </section>
    {/* Introduction Split Section */}
<section className="py-20 bg-chinese-pattern">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      
      {/* IMAGE */}
      <div className="flex-1 order-2 lg:order-1">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTNvArTTRcsskW67z3xkFb4SdRHVHxgi-F1CXqCBFZANUUXXQb1a3038gJDRimtXGE00ulZmcRcdEAj1FVhmHc5JjPziXr_AS5SSfgAuIWbDBE8PVcJyBWtl_kDn1gzZRo8owvLa0qtNsObkq_OqGovG0SnM1yiyCPWu7Fia1jNSsaKt2CEIbaulwBeCic2rsjDwpKAA-BZlzFU3N04yoh2alvu9X_yyqPFi5mMj9nfrBvazGGUxMkER5N6YE3bkPzBzJEOeBA3iw"
            alt="Asian students studying together in a modern library"
            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute bottom-0 left-0 bg-primary/90 text-white p-6 backdrop-blur-sm rounded-tr-2xl">
            <p className="text-2xl font-bold">5000+</p>
            <p className="text-sm opacity-80">Học viên tốt nghiệp</p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 order-1 lg:order-2">
        <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6 relative inline-block">
          Câu chuyện của TOXI
          <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-accent rounded-full"></span>
        </h2>

        <p className="text-[#4e6797] text-lg mb-6 leading-relaxed">
          Được thành lập với niềm đam mê cháy bỏng về ngôn ngữ và văn hóa Trung Hoa,
          TOXI ra đời với mục tiêu xóa bỏ rào cản giao tiếp. Chúng tôi hiểu rằng học
          ngoại ngữ không chỉ là học từ vựng, mà là học cách tư duy và văn hóa ứng xử.
        </p>

        <p className="text-[#4e6797] text-lg mb-8 leading-relaxed">
          Với phương châm{" "}
          <strong className="text-primary">
            "Thực tế - Hiệu quả - Tận tâm"
          </strong>
          , TOXI cam kết mang lại giá trị thực tiễn, giúp học viên tự tin sử dụng
          tiếng Trung trong công việc và cuộc sống ngay từ những buổi học đầu tiên.
        </p>

        <div className="flex items-center gap-4">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="material-symbols-outlined text-accent">
            local_florist
          </span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>
      </div>

    </div>
  </div>
</section>
 <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-[#0e121b] text-3xl font-bold mb-4">
            Tầm nhìn &amp; Sứ mệnh
          </h2>
          <p className="text-[#4e6797] max-w-2xl mx-auto">
            Kim chỉ nam cho mọi hoạt động giảng dạy và phát triển tại TOXI
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionData.map((item, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-[#f8f9fc] border border-[#e7ebf3]
                         hover:border-accent hover:shadow-xl transition-all duration-300
                         relative overflow-hidden"
            >
              {/* BACKGROUND ICON */}
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span
                  className={`material-symbols-outlined text-8xl ${item.iconColor}`}
                >
                  {item.icon}
                </span>
              </div>

              {/* ICON */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-6
                            ${item.bgColor} ${item.iconColor}
                            ${item.hoverBg} ${item.hoverText} transition-colors`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {item.icon}
                </span>
              </div>

              {/* CONTENT */}
              <h3 className="text-xl font-bold text-[#0e121b] mb-3">
                {item.title}
              </h3>
              <p className="text-[#4e6797]">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
     <section className="py-20 bg-[#f0f4fa] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -left-20 top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -right-20 bottom-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-accent font-bold tracking-widest uppercase text-sm">
            Phương pháp TOXI
          </span>
          <h2 className="text-primary text-3xl md:text-4xl font-black mt-2">
            Lộ trình đi đến thành công
          </h2>
        </div>

        {/* TIMELINE */}
        <div className="grid grid-cols-[60px_1fr] gap-x-6 sm:gap-x-10">
          {methodologySteps.map((item, index) => (
            <React.Fragment key={index}>
              {/* LEFT ICON */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center z-10
                    ${
                      item.isLast
                        ? item.iconBorder
                        : `bg-white border-2 ${item.iconBorder} shadow-md`
                    }`}
                >
                  <span className="material-symbols-outlined">
                    {item.icon}
                  </span>
                </div>

                {!item.isLast && (
                  <div className="w-0.5 bg-gray-300 h-full"></div>
                )}
              </div>

              {/* CONTENT */}
              <div className={`${item.isLast ? "pt-1" : "pb-12 pt-1"}`}>
                <div
                  className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${item.border}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#0e121b]">
                      {item.title} (Bước {item.step})
                    </h3>
                    <span
                      className={`${item.badgeBg} ${item.badgeText} text-xs font-bold px-2 py-1 rounded`}
                    >
                      {item.level}
                    </span>
                  </div>
                  <p className="text-[#4e6797]">{item.description}</p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
     <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[#0e121b] text-3xl font-bold mb-4">
            Đội ngũ giảng viên
          </h2>
          <p className="text-[#4e6797] max-w-2xl mx-auto">
            Những người truyền lửa đầy tâm huyết với trình độ chuyên môn cao
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="group bg-[#f8f9fc] rounded-2xl overflow-hidden hover:shadow-xl transition-all border border-transparent hover:border-[#e7ebf3]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-[#0e121b]">
                  {teacher.name}
                </h3>
                <p className="text-accent text-sm font-medium mb-3">
                  {teacher.role}
                </p>
                <p className="text-[#4e6797] text-sm line-clamp-3 italic">
                  “{teacher.quote}”
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
      </>
    )
};