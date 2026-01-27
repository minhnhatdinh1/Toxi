const Footer = () => {
  return (
    <footer className="bg-[#0b1117] text-slate-400 py-16 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
                <span className="material-symbols-outlined text-[20px]">
                  school
                </span>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                TOXI
              </span>
            </div>

            <p className="text-sm leading-relaxed">
              TOXI - Nền tảng học tiếng Trung ứng dụng hàng đầu Việt Nam. Chúng tôi
              cam kết chất lượng đào tạo và hỗ trợ trọn đời.
            </p>

            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <span className="text-xs">FB</span>
              </a>
              <a
                href="#"
                className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <span className="text-xs">YT</span>
              </a>
              <a
                href="#"
                className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <span className="text-xs">TK</span>
              </a>
            </div>
          </div>

          {/* Links - About */}
          <div>
            <h3 className="text-white font-bold mb-4">Về TOXI</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Giới thiệu chung
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Đội ngũ giảng viên
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Cảm nhận học viên
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Tuyển dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Links - Courses */}
          <div>
            <h3 className="text-white font-bold mb-4">Khóa học</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Tiếng Trung Giao Tiếp
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Luyện thi HSK/HSKK
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Tiếng Trung Thương Mại
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Tiếng Trung Trẻ Em
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[18px] mt-0.5 text-primary">
                  location_on
                </span>
                <span>
                  Tầng 3, Tòa nhà TechHub, Số 123 Đường Cầu Giấy, Hà Nội
                </span>
              </li>

              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  phone
                </span>
                <span>0987 654 321</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  mail
                </span>
                <span>support@toxi.edu.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2023 TOXI Education. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-white transition-colors" href="#">
              Điều khoản sử dụng
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Chính sách bảo mật
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;