import react from 'react'
import { Link } from "react-router-dom";
export default function Course() {
  
    return (
        <>
         <main className="flex-1 lg:ml-72 bg-surface relative">
      {/* HEADER */}

      {/* HERO */}
      <section className="relative h-64 md:h-80 w-full bg-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwsBsZIsyCmtSVufrnW8IQ3OcNeGQO6uv5_S2x_YweK8CwOgxS_j8F_1UlAP1CKu-MJ4a6fHrmJFtzUUcb_X4KSq8qWpLna00jvHLg7DEjci3_9aaWB-JPpLO0hbOLKlLYbtXWV_1gq2dYp2AdtNDqJHNF-j2XA-3y-JFm721_M16loDAuswddRMrVB91_VS9Tc0bFgo4Ft74lY4nteoQG2dIzPct6KXEEJ9A_vnNS8l55l5dzg3f46GB6CxSZ1N3nNlKt4Oc23S0')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
        <div className="absolute inset-0 bg-chinese-pattern opacity-10"></div>

        <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none opacity-20 flex items-center justify-end pr-10">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhvprHGL6K93pHFVHLPVSFyKTZaBgwoiNwoZ6rufaP3po7sqtplcZ0ZwYV2GwP_0zun0jre0uIAbdySGtu4jG-uSCgC3yAEj_a49Fjunnm7lnluUwzOxT5LJN2DlK-mV7HEw8F0s7lXu7lzThvMEwBhVv1qGxDMQ0k589zZgj_A5-D1zb3exuWfXZ6VvlypTc_EcokCIn_ffDJPT0UKVdGasZVPsKRp-8BZ6p0Ng55-0HMo1e1E5gT-rBRAduNNVBO0Z1AhRqdGH8"
            alt="Chinese clouds"
            className="h-full object-contain invert"
          />
        </div>

        <div className="relative h-full flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            KHÓA HỌC <span className="text-secondary">HSK</span>
          </h2>

          <div className="flex items-center gap-4 text-slate-200">
            <p className="text-lg font-light max-w-lg leading-relaxed">
              Chinh phục chứng chỉ tiếng Trung quốc tế với lộ trình bài bản, tinh
              gọn và hiệu quả nhất.
            </p>
          </div>

          <div className="absolute bottom-6 right-10 flex gap-4 opacity-30">
            <span className="text-secondary font-serif text-6xl">學</span>
            <span className="text-secondary font-serif text-6xl">習</span>
          </div>
        </div>
      </section>
       {/* FILTER / BREADCRUMB */}
      <section className="bg-white border-b border-primary/10 px-6 py-4">
        <div className=" mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <a href="#" className="hover:text-primary transition-colors">
              Trang chủ
            </a>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
            <a href="#" className="hover:text-primary transition-colors">
              Khóa học
            </a>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
            <span className="text-primary font-bold">HSK</span>
          </nav>

          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <div className="text-sm text-slate-500">
              Hiển thị <span className="font-bold text-primary">12</span> khóa học
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sắp xếp:
              </label>
              <select className="bg-surface border border-primary/10 rounded-lg text-sm px-3 py-1.5 focus:ring-primary focus:border-primary text-slate-700 font-medium">
                <option>Mới nhất</option>
                <option>Giá: Thấp đến cao</option>
                <option>Giá: Cao đến thấp</option>
                <option>Phổ biến nhất</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE GRID */}
      <section className="py-12 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* CARD 1 */}
          <div className="chinese-border bg-white shadow-sm hover:shadow-2xl transition-all group overflow-hidden flex flex-col h-full border border-slate-100">
            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="absolute top-4 left-4 bg-primary text-secondary text-[10px] font-bold px-3 py-1 z-20 rounded-full shadow-lg border border-secondary/30">
                NỀN TẢNG
              </div>
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwxb7nc6Y1agbpHftxTY_o4gDjVVkTrjthWCSr5aBCwYASNCDteRUBSCZszZPjpyC_ojHXMdIfsGFN2TxXG-ynM7Ys8vjpEEM7SYFsxEap7wqxiraLyfoPwKZ_gct2jA74qnO8XM_x9Jc6aeaDM2oQwgSFd1HOfrukFmrN2vDgUOmaNV-a2e7z1IkWP6mUG0NVibB_lY0a0S0Rh34s8N6VIua_DB_UF5NXrbv8oiRT8CsANH17Kx7-D2oDZk8IoCqgcI_r32IbgF0')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-tight">
                Khóa học HSK 1 - Làm quen Tiếng Trung
              </h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-2">
                Lộ trình học tập trung vào phát âm chuẩn, nhận diện 150 từ vựng và
                cấu trúc ngữ pháp cơ bản nhất cho người mới bắt đầu.
              </p>

              <div className="mt-auto pt-4 border-t border-dashed border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">
                      Học phí trọn gói
                    </span>
                    <span className="text-2xl font-black text-secondary">
                      2.500.000đ
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="material-symbols-outlined text-primary/30">
                      event_note
                    </span>
                    <span className="text-xs text-slate-400 block">
                      24 buổi học
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link to="/courses/1" className="py-2 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center">
                    Xem chi tiết
                  </Link>
                  <Link to="/checkout" className="py-2 text-xs font-bold text-primary bg-secondary rounded-lg hover:bg-yellow-400 transition-colors shadow-sm flex items-center justify-center">
                    Đăng ký ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="chinese-border bg-white shadow-sm hover:shadow-2xl transition-all group overflow-hidden flex flex-col h-full border border-slate-100">
            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="absolute top-4 left-4 bg-primary text-secondary text-[10px] font-bold px-3 py-1 z-20 rounded-full shadow-lg border border-secondary/30">
                TRUNG CẤP
              </div>
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtVRXFknS_grfTIrQVmQmdLwKAo1xNkkJKHW9CWahlijN4S8g3c0dmeCe5bV8E30creqG7NGrK0vS-RqXB1c9BKVHSkm661aw6RxOaH6LnzJ5LOh5-kOsvC_rqeQeBvBsyq8ce_PfK4HNiiu9DjKUTlrAQsSa-kQPnlwUAB5bi92qJ5VaHA11lIkRCEs7cg_77QBKQI5xotjUgDwQ3FgNXXqXvuQ_Ot4cR6xUv0e_WO-iCBYQ9IAfbxrtjcchMQhOXdKRGJi5zG4I')",
                }}
              />
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-tight">
                Combo Khóa học HSK 3 - HSK 4
              </h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-2">
                Nâng cao vốn từ vựng lên 1200 từ, giao tiếp tự tin các chủ đề đời
                sống và công việc văn phòng cơ bản.
              </p>

              <div className="mt-auto pt-4 border-t border-dashed border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">
                      Học phí trọn gói
                    </span>
                    <span className="text-2xl font-black text-secondary">
                      4.200.000đ
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="material-symbols-outlined text-primary/30">
                      event_note
                    </span>
                    <span className="text-xs text-slate-400 block">
                      48 buổi học
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link to="/courses/2" className="py-2 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center">
                    Xem chi tiết
                  </Link>
                  <Link to="/checkout" className="py-2 text-xs font-bold text-primary bg-secondary rounded-lg hover:bg-yellow-400 transition-colors shadow-sm flex items-center justify-center">
                    Đăng ký ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
       {/* CARD: CAO CẤP */}
  <div className="chinese-border bg-white shadow-sm hover:shadow-2xl transition-all group overflow-hidden flex flex-col h-full border border-slate-100">
    <div className="relative aspect-[16/10] overflow-hidden">
      <div className="absolute top-4 left-4 bg-accent-red text-white text-[10px] font-bold px-3 py-1 z-20 rounded-full shadow-lg">
        CAO CẤP
      </div>

      <div
        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFLYj59afdVrP74z9TI2skZU5rLCp33u4OROr59CQ8-n9_zr5jjF0D11cetdShmgGOw_0Wrn9ZfPFEwi4nbNhPXUgMTZKGB-WcB3RTvRyBaHBkF_3BMkjjhsIO9T89kGL_VxLgur7WLuxLkSseZsAMVEvhf3QK8myEY52RUeB-RnNmEof1Scr_B5lhuO8-B1tdpKMz8Se3qGLIIiYU4PnK7fN7hT37ttWTLW7XsBeiUHSU9kLzY9TI4Mc9hoYJSewdZDOcT0Vky0w')",
        }}
      />
    </div>

    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-tight">
        Chinh phục HSK 5 - HSK 6
      </h3>

      <p className="text-sm text-slate-500 mb-6 line-clamp-2">
        Luyện kỹ năng đọc hiểu báo chí, viết luận chuyên sâu và đạt trình độ ngôn
        ngữ chuyên nghiệp như người bản xứ.
      </p>

      <div className="mt-auto pt-4 border-t border-dashed border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs text-slate-400 block mb-1">
              Học phí trọn gói
            </span>
            <span className="text-2xl font-black text-secondary">
              6.500.000đ
            </span>
          </div>

          <div className="text-right">
            <span className="material-symbols-outlined text-primary/30">
              event_note
            </span>
            <span className="text-xs text-slate-400 block">
              60 buổi học
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to="/courses/2" className="py-2 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center">
            Xem chi tiết
          </Link>
          <Link to="/checkout" className="py-2 text-xs font-bold text-primary bg-secondary rounded-lg hover:bg-yellow-400 transition-colors shadow-sm flex items-center justify-center">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  </div>

  {/* CARD: LUYỆN CẤP TỐC */}
  <div className="chinese-border bg-white shadow-sm hover:shadow-2xl transition-all group overflow-hidden flex flex-col h-full border border-slate-100">
    <div className="relative aspect-[16/10] overflow-hidden">
      <div className="absolute top-4 left-4 bg-primary text-secondary text-[10px] font-bold px-3 py-1 z-20 rounded-full shadow-lg border border-secondary/30">
        LUYỆN CẤP TỐC
      </div>

      <div
        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwxb7nc6Y1agbpHftxTY_o4gDjVVkTrjthWCSr5aBCwYASNCDteRUBSCZszZPjpyC_ojHXMdIfsGFN2TxXG-ynM7Ys8vjpEEM7SYFsxEap7wqxiraLyfoPwKZ_gct2jA74qnO8XM_x9Jc6aeaDM2oQwgSFd1HOfrukFmrN2vDgUOmaNV-a2e7z1IkWP6mUG0NVibB_lY0a0S0Rh34s8N6VIua_DB_UF5NXrbv8oiRT8CsANH17Kx7-D2oDZk8IoCqgcI_r32IbgF0')",
        }}
      />
    </div>

    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-tight">
        Luyện thi HSK 4 Cấp tốc (2 tháng)
      </h3>

      <p className="text-sm text-slate-500 mb-6 line-clamp-2">
        Dành cho học viên cần bằng gấp để xin học bổng hoặc yêu cầu công việc.
        Tập trung giải đề và mẹo thi.
      </p>

      <div className="mt-auto pt-4 border-t border-dashed border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs text-slate-400 block mb-1">
              Học phí trọn gói
            </span>
            <span className="text-2xl font-black text-secondary">
              3.800.000đ
            </span>
          </div>

          <div className="text-right">
            <span className="material-symbols-outlined text-primary/30">
              event_note
            </span>
            <span className="text-xs text-slate-400 block">
              32 buổi học
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to="/courses/3" className="py-2 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center">
            Xem chi tiết
          </Link>
          <Link to="/checkout" className="py-2 text-xs font-bold text-primary bg-secondary rounded-lg hover:bg-yellow-400 transition-colors shadow-sm flex items-center justify-center">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  </div>
    {/* COURSE 1 */}
  <div className="chinese-border bg-white shadow-sm hover:shadow-2xl transition-all group overflow-hidden flex flex-col h-full border border-slate-100">
    <div className="relative aspect-[16/10] overflow-hidden">
      <div className="absolute top-4 left-4 bg-primary text-secondary text-[10px] font-bold px-3 py-1 z-20 rounded-full shadow-lg border border-secondary/30">
        TOÀN DIỆN
      </div>
      <div
        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtVRXFknS_grfTIrQVmQmdLwKAo1xNkkJKHW9CWahlijN4S8g3c0dmeCe5bV8E30creqG7NGrK0vS-RqXB1c9BKVHSkm661aw6RxOaH6LnzJ5LOh5-kOsvC_rqeQeBvBsyq8ce_PfK4HNiiu9DjKUTlrAQsSa-kQPnlwUAB5bi92qJ5VaHA11lIkRCEs7cg_77QBKQI5xotjUgDwQ3FgNXXqXvuQ_Ot4cR6xUv0e_WO-iCBYQ9IAfbxrtjcchMQhOXdKRGJi5zG4I')",
        }}
      />
    </div>

    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-tight">
        Khóa học HSK 2 - Giao tiếp Sơ cấp
      </h3>
      <p className="text-sm text-slate-500 mb-6 line-clamp-2">
        Củng cố nền tảng, mở rộng cấu trúc câu và thực hành hội thoại thực tế trong
        các tình huống mua sắm, du lịch.
      </p>

      <div className="mt-auto pt-4 border-t border-dashed border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs text-slate-400 block mb-1">
              Học phí trọn gói
            </span>
            <span className="text-2xl font-black text-secondary">
              2.800.000đ
            </span>
          </div>
          <div className="text-right">
            <span className="material-symbols-outlined text-primary/30">
              event_note
            </span>
            <span className="text-xs text-slate-400 block">
              24 buổi học
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to="/courseds/2" className="py-2 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center">
            Xem chi tiết
          </Link>
          <Link to="/checkout" className="py-2 text-xs font-bold text-primary bg-secondary rounded-lg hover:bg-yellow-400 transition-colors shadow-sm flex items-center justify-center">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  </div>

  {/* COURSE 2 */}
  <div className="chinese-border bg-white shadow-sm hover:shadow-2xl transition-all group overflow-hidden flex flex-col h-full border border-slate-100">
    <div className="relative aspect-[16/10] overflow-hidden">
      <div className="absolute top-4 left-4 bg-primary text-secondary text-[10px] font-bold px-3 py-1 z-20 rounded-full shadow-lg border border-secondary/30">
        TIÊU CHUẨN
      </div>
      <div
        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwxb7nc6Y1agbpHftxTY_o4gDjVVkTrjthWCSr5aBCwYASNCDteRUBSCZszZPjpyC_ojHXMdIfsGFN2TxXG-ynM7Ys8vjpEEM7SYFsxEap7wqxiraLyfoPwKZ_gct2jA74qnO8XM_x9Jc6aeaDM2oQwgSFd1HOfrukFmrN2vDgUOmaNV-a2e7z1IkWP6mUG0NVibB_lY0a0S0Rh34s8N6VIua_DB_UF5NXrbv8oiRT8CsANH17Kx7-D2oDZk8IoCqgcI_r32IbgF0')",
        }}
      />
    </div>

    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-tight">
        HSK 3 - Chinh phục Ngữ pháp
      </h3>
      <p className="text-sm text-slate-500 mb-6 line-clamp-2">
        Hệ thống hóa toàn bộ ngữ pháp trung cấp, học cách sử dụng các hư từ và bổ
        ngữ phức tạp trong câu.
      </p>

      <div className="mt-auto pt-4 border-t border-dashed border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs text-slate-400 block mb-1">
              Học phí trọn gói
            </span>
            <span className="text-2xl font-black text-secondary">
              3.200.000đ
            </span>
          </div>
          <div className="text-right">
            <span className="material-symbols-outlined text-primary/30">
              event_note
            </span>
            <span className="text-xs text-slate-400 block">
              30 buổi học
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to="/courses/2" className="py-2 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center">
            Xem chi tiết
          </Link>
          <Link to="/checkout" className="py-2 text-xs font-bold text-primary bg-secondary rounded-lg hover:bg-yellow-400 transition-colors shadow-sm flex items-center justify-center">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  </div>
        </div>

        {/* PAGINATION */}
        <div className="mt-16 flex justify-center items-center gap-2">
          <button className="w-10 h-10 rounded-lg border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="w-10 h-10 rounded-lg bg-primary text-secondary font-bold">
            1
          </button>
          <button className="w-10 h-10 rounded-lg border border-primary/10 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all">
            2
          </button>
          <button className="w-10 h-10 rounded-lg border border-primary/10 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all">
            3
          </button>
          <button className="w-10 h-10 rounded-lg border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </section>
    </main>
    </>
    )
};