import react from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function BlogIntrodution() {

    return (
     <>
       <div className="w-full bg-slate-50 dark:bg-slate-900/50">
<section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 z-10"></div>

        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7Aal0RY3eFFsVX4Q67f9ilELfYt1RJKPilINebh5LbFIKNCzloROCfeTjVAQ2sc9fTmH1mdielrDic2fDCX4n_R88T60GuNTb120hJ4Cmz0XgnQ_lh0ZwkHaASjb51fqveEsYeSHSDt04x1G6wb9_u4unFqea1iZFi_vDRmaAkEzmW-J9ygmxwFLdZwU6O8c4LguYqHT2vAMcOiohVlGQbmNm03quBQYcR6lAbpzBiTWsH88yn3YbqXRNmoShaV1EoO_C996W_x8"
          alt="Modern classroom environment"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white">
        
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          Học để ứng dụng <br />
          <span className="text-accent italic text-3xl md:text-5xl">
            (学以致用)
          </span>
        </h1>

        <p className="text-lg md:text-xl mb-8">
          Kết nối ngôn ngữ, mở rộng tương lai. Tại TOXI, chúng tôi không chỉ dạy
          tiếng Trung, chúng tôi kiến tạo cơ hội.
        </p>

        <div className="flex justify-center gap-4">
      <Link
  to="/courses"
  className="bg-accent hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl inline-block"
>
  Tìm hiểu khóa học
</Link>

<Link
  to="/contact"
  className="bg-white/10 border border-white/30 py-3 px-8 rounded-xl inline-block"
>
  Liên hệ tư vấn
</Link>
        </div>


      </div>
    </section>
     <section className="py-20 bg-chinese-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image */}
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

          {/* Text */}
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
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-[#0e121b] text-3xl font-bold mb-4">
            Tầm nhìn &amp; Sứ mệnh
          </h2>
          <p className="text-[#4e6797] max-w-2xl mx-auto">
            Kim chỉ nam cho mọi hoạt động giảng dạy và phát triển tại TOXI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="group p-8 rounded-2xl bg-[#f8f9fc] border border-[#e7ebf3] hover:border-accent hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-8xl text-primary">
                visibility
              </span>
            </div>

            <div className="w-14 h-14 bg-blue-100 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">
                visibility
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#0e121b] mb-3">
              Tầm nhìn
            </h3>

            <p className="text-[#4e6797]">
              Trở thành hệ thống giáo dục tiếng Trung ứng dụng hàng đầu tại Việt Nam,
              nơi ươm mầm cho những tài năng ngôn ngữ vươn ra thế giới.
            </p>

          </div>

          {/* Card 2 */}
          <div className="group p-8 rounded-2xl bg-[#f8f9fc] border border-[#e7ebf3] hover:border-accent hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-8xl text-accent">
                ads_click
              </span>
            </div>

            <div className="w-14 h-14 bg-amber-100 text-accent rounded-full flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">
                ads_click
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#0e121b] mb-3">
              Sứ mệnh
            </h3>

            <p className="text-[#4e6797]">
              Trao quyền cho học viên thông qua ngôn ngữ. Chúng tôi cung cấp
              công cụ để bạn mở rộng sự nghiệp và hiểu sâu sắc văn hóa Trung Hoa.
            </p>

          </div>

          {/* Card 3 */}
          <div className="group p-8 rounded-2xl bg-[#f8f9fc] border border-[#e7ebf3] hover:border-accent hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-8xl text-red-500">
                favorite
              </span>
            </div>

            <div className="w-14 h-14 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">
                favorite
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#0e121b] mb-3">
              Giá trị cốt lõi
            </h3>

            <p className="text-[#4e6797]">
              Tận tâm trong giảng dạy - Thực tế trong nội dung - Hiệu quả trong
              kết quả. Học viên là trung tâm của mọi sự phát triển.
            </p>

          </div>

        </div>
      </div>
    </section>
      <section className="py-20 bg-[#f0f4fa] relative overflow-hidden">

      {/* Decorative background */}
      <div className="absolute -left-20 top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -right-20 bottom-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">

        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-accent font-bold tracking-widest uppercase text-sm">
            Phương pháp TOXI
          </span>
          <h2 className="text-primary text-3xl md:text-4xl font-black mt-2">
            Lộ trình đi đến thành công
          </h2>
        </div>

        <div className="grid grid-cols-[60px_1fr] gap-x-6 sm:gap-x-10">

          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center shadow-md z-10">
              <span className="material-symbols-outlined">hourglass_top</span>
            </div>
            <div className="w-0.5 bg-gray-300 h-full"></div>
          </div>

          <div className="pb-12 pt-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-[#0e121b]">
                  Tiếp cận thực tế (Bước 1)
                </h3>
                <span className="bg-blue-100 text-primary text-xs font-bold px-2 py-1 rounded">
                  Cơ bản
                </span>
              </div>
              <p className="text-[#4e6797]">
                Xây dựng nền tảng vững chắc với phát âm chuẩn và từ vựng thông dụng nhất. 
                Loại bỏ lý thuyết rườm rà.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-accent text-accent flex items-center justify-center shadow-md z-10">
              <span className="material-symbols-outlined">record_voice_over</span>
            </div>
            <div className="w-0.5 bg-gray-300 h-full"></div>
          </div>

          <div className="pb-12 pt-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-accent">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-[#0e121b]">
                  Giao tiếp phản xạ (Bước 2)
                </h3>
                <span className="bg-amber-100 text-accent text-xs font-bold px-2 py-1 rounded">
                  Tăng tốc
                </span>
              </div>
              <p className="text-[#4e6797]">
                Luyện tập phản xạ nghe nói liên tục thông qua các tình huống giả lập:
                mua sắm, du lịch, công sở.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center shadow-md z-10">
              <span className="material-symbols-outlined">temple_buddhist</span>
            </div>
            <div className="w-0.5 bg-gray-300 h-full"></div>
          </div>

          <div className="pb-12 pt-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-[#0e121b]">
                  Văn hóa ứng dụng (Bước 3)
                </h3>
                <span className="bg-blue-100 text-primary text-xs font-bold px-2 py-1 rounded">
                  Chuyên sâu
                </span>
              </div>
              <p className="text-[#4e6797]">
                Hiểu sâu về văn hóa, phong tục kinh doanh và tư duy người bản xứ
                để giao tiếp tinh tế và hiệu quả hơn.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 z-10">
              <span className="material-symbols-outlined">auto_stories</span>
            </div>
          </div>

          <div className="pt-1">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-[#0e121b]">
                  Thực hành liên tục (Bước 4)
                </h3>
                <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded">
                  Thành thạo
                </span>
              </div>
              <p className="text-[#4e6797]">
                Môi trường thực hành 24/7 với cộng đồng học viên và giảng viên,
                biến tiếng Trung thành ngôn ngữ thứ hai.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
     <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-[#0e121b] text-3xl font-bold mb-4">
            Đội ngũ giảng viên
          </h2>
          <p className="text-[#4e6797] max-w-2xl mx-auto">
            Những người truyền lửa đầy tâm huyết với trình độ chuyên môn cao
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Teacher 1 */}
          <div className="group bg-[#f8f9fc] rounded-2xl overflow-hidden hover:shadow-xl transition-all border border-transparent hover:border-[#e7ebf3]">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_1wfe6N9RdU8CzskjjX2zKqObUcuWTU-PY5Q2ry1yxNafa1hiBzl7ZVYMKx04ZFZZf-hyzAMOqd5Zl2p5el_Z0TcPzworRICWEpUJ2W2ZwVTSENiPBmkK8WSPHH5NYVoirHm7EjjaGBFL0k9BzH49z7XTKL7D8cUcdaq6ySJW7w44p2qHFOofVZj0hVmRIfiYqcyOkzgmcYzLWHJvqHjmjyk4nPhcwMdYDS9bub-IME-3Yl9Btr2Yg2GGNWZN91TejZogCqcTwUA"
                alt="Teacher Nguyen Thu Ha"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-[#0e121b]">
                Ths. Nguyễn Thu Hà
              </h3>
              <p className="text-accent text-sm font-medium mb-3">
                Giám đốc đào tạo
              </p>
              <p className="text-[#4e6797] text-sm line-clamp-3 italic">
                "Học tiếng Trung là hành trình khám phá bản thân qua lăng kính văn hóa mới."
              </p>
            </div>
          </div>

          {/* Teacher 2 */}
          <div className="group bg-[#f8f9fc] rounded-2xl overflow-hidden hover:shadow-xl transition-all border border-transparent hover:border-[#e7ebf3]">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQke4N_RrAH4vKUsgm3zVwBhR2HT3NULTorthWDhxLoVh9uHv4M61AVM_DW1C3J56GkFNJ7b0N8imNdJPHIIEONzVeIXdIH5DXfg8HqF7FvSDw1bGnjD_1BUSLwBrVfRxEiXMyVMT5MhFUMdNoJbpMy38o3U80DJi1Q_13ihrbI3fv9mBUjhwDTlDQjOJWI3QeE38mYUhpvFNK2xO4SMOYSuaevN1_FjwIzX3pn7oWRrBAkrHxzIhXPC0z51l9A1MXcY114RBsWbM"
                alt="Teacher Tran Van Minh"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-[#0e121b]">
                Ths. Trần Văn Minh
              </h3>
              <p className="text-accent text-sm font-medium mb-3">
                Giảng viên cao cấp
              </p>
              <p className="text-[#4e6797] text-sm line-clamp-3 italic">
                "Đừng học vẹt, hãy học để hiểu và cảm nhận ngôn ngữ."
              </p>
            </div>
          </div>

          {/* Teacher 3 */}
          <div className="group bg-[#f8f9fc] rounded-2xl overflow-hidden hover:shadow-xl transition-all border border-transparent hover:border-[#e7ebf3]">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfYiLrUBwCW-Rnoi49b1rW9ejyDpiGUArCbZDMMdQy2tCQjSVI3qoGoKAl1WtIbZ3IOS-nn8j4eNaAtYcMiyioK3kJcHBLN5IxrceQdA3lPah2guR285QGv7ahq4yZWRQf-xJsAZXYi4HKkiMX7Qo23m_ptYHphJ1EbP1-kAVUT5nSWmdkrv_2bYd5_RP2FD4Kpp-hmyAAbjMOHOMXGEFH6ush3Yz702FheZx_SP4Qm2zi4us-TmcgmD8muwAru2n9LdBWlY6F_B8"
                alt="Teacher Li Wei"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-[#0e121b]">
                Cô Li Wei
              </h3>
              <p className="text-accent text-sm font-medium mb-3">
                Chuyên gia bản ngữ
              </p>
              <p className="text-[#4e6797] text-sm line-clamp-3 italic">
                "Phát âm chuẩn là chìa khóa vàng để mở mọi cánh cửa giao tiếp."
              </p>
            </div>
          </div>

          {/* Teacher 4 */}
          <div className="group bg-[#f8f9fc] rounded-2xl overflow-hidden hover:shadow-xl transition-all border border-transparent hover:border-[#e7ebf3]">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfJRjDKNpkSA5Qf6_9PmJkeTi47SjKJ1pMBe7pn3bitDSfmbHp_SCHmj0PNFvCd3MTqXcVbjxXB8hOOH86qlNXC6kL5-wH0qK04lxaSBYKd6MUiS0xI5RF9JURH-e2JAwLtksaeCCRXUz3L7mMp2xat1ujKtM3oOuv72ZsCgqOioieCaCJRVEBcY253wrV3wacHhFjK13Z0TLEpYVb7WTuWSDH3Dhv8dmBk7eC6OJjZcc8W8IIj6kJM16Vw_TIZjzqGrzY97NEbU4"
                alt="Teacher Le Tuan Anh"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-[#0e121b]">
                Ths. Lê Tuấn Anh
              </h3>
              <p className="text-accent text-sm font-medium mb-3">
                Giảng viên HSK
              </p>
              <p className="text-[#4e6797] text-sm line-clamp-3 italic">
                "Chinh phục HSK không khó nếu bạn có phương pháp đúng đắn."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
     <section className="py-20 bg-primary text-white relative">
      
      {/* Background */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMoloWtwdby3Xv3mHSFfpDB0I_EPht7xydJYMML2vtlxq3IXMp2-PbMLqTf35haOiAyQSiPAZSFi0qzkxvUO3blp-B8r-jXjTccQpWMTF8rHVpn39rzHzGorvmzpLMyBshtLQpxX_Wk1dCwKguHKmMwYD1EdyMSldvp_le29FeVXlhD2SBJjptLq9Ma5avkVu9TmsST4HjNQRWjwwmwwT82vU1XuAx3FR5OBTB5PqMQLcYnx01JCV62HKNHCPWQtF91ZVinwuFiBs")',
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Title */}
        <h2 className="text-3xl font-bold mb-12 text-center">
          Câu chuyện thành công
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Testimonial 1 */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKCKMWb6SCkBAEHB0N0H3TpYlQ7HaP1PpE3Jq3TmdZ5-_zt5KjDVP88qB3fzHJYzqTy25KSglA7qFgvajcZgSbFRqAkZ2_Hp_L5uxqsCATM_a5Okdsubke2j5VF6YBaRfXxLfNWLvHeEMeIrCOK9WLsup7n_rFDnWkMCOVFKYGkzBL3lIqoHMfHfY3QMlvfml32oPimKMJJHliuhtNCgpWn4NmJXb1dq90kqQlbm5A1utAUe9UQ2FAmJZJbcclBg1GHtdSvzlKLKM"
                alt="Mai Anh"
                className="w-16 h-16 rounded-full object-cover border-2 border-accent"
              />

              <div>
                <h4 className="font-bold text-lg">Mai Anh</h4>
                <p className="text-sm opacity-80">
                  Du học sinh tại Thượng Hải
                </p>
              </div>

              <span className="material-symbols-outlined ml-auto text-4xl opacity-20">
                format_quote
              </span>
            </div>

            <p className="text-lg leading-relaxed italic opacity-90">
              "Nhờ TOXI, mình đã tự tin apply học bổng toàn phần tại Thượng Hải.
              Phương pháp học thực tế giúp mình hòa nhập rất nhanh với cuộc
              sống bên này."
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFvhKAb2L7dTHYzGMoj2iKVwuZgXYYjrIBH12EABIq7CvgfzRMwG_ZxiKKklryqC2YTQ0mzVEwvwvz9CanZ5ZtoCT5hd0oqFD0mvii3j_XddtkXUa9ICFtRev0kAyapDQFd-MVxXduWcbDgZXXnDFH5Q9yw9F3Iy6cKENbXe-nHppxjNJKakQ4ij-I38uqorL78S94wYleoqmPJOFjpXrdluTftV3GlDg5a0Jfp-lAIB-l3jZ-H_-E6eTaSNvhYfekdXirOo-BjNo"
                alt="Hoang Nam"
                className="w-16 h-16 rounded-full object-cover border-2 border-accent"
              />

              <div>
                <h4 className="font-bold text-lg">Hoàng Nam</h4>
                <p className="text-sm opacity-80">
                  Trợ lý giám đốc công ty Logistic
                </p>
              </div>

              <span className="material-symbols-outlined ml-auto text-4xl opacity-20">
                format_quote
              </span>
            </div>

            <p className="text-lg leading-relaxed italic opacity-90">
              "Khóa học tiếng Trung thương mại tại TOXI rất sát với thực tế công
              việc. Giờ đây mình có thể đàm phán trực tiếp với đối tác Trung
              Quốc mà không cần phiên dịch."
            </p>
          </div>

        </div>


      </div>
    </section>
    </div>
     </>
    )
}
