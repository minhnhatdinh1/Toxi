import { Link } from 'react-router-dom';

export function HomePage()  {
    return (
      <>
       {/* HERO SECTION */}
      <section className="relative h-[500px] md:h-[600px] w-full bg-primary group overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwsBsZIsyCmtSVufrnW8IQ3OcNeGQO6uv5_S2x_YweK8CwOgxS_j8F_1UlAP1CKu-MJ4a6fHrmJFtzUUcb_X4KSq8qWpLna00jvHLg7DEjci3_9aaWB-JPpLO0hbOLKlLYbtXWV_1gq2dYp2AdtNDqJHNF-j2XA-3y-JFm721_M16loDAuswddRMrVB91_VS9Tc0bFgo4Ft74lY4nteoQG2dIzPct6KXEEJ9A_vnNS8l55l5dzg3f46GB6CxSZ1N3nNlKt4Oc23S0')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/30"></div>
          <div className="absolute inset-0 bg-chinese-pattern opacity-10"></div>
        </div>

        <div className="absolute top-10 right-10 text-secondary/20 font-serif text-[120px] leading-none select-none pointer-events-none rotate-12">
          福
        </div>

        <div className="relative h-full flex items-center px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 mb-6 border border-secondary/50 bg-primary/60 backdrop-blur-md text-secondary px-5 py-2 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.2)]">
              <span className="material-symbols-outlined text-[18px] animate-pulse">
                festival
              </span>
              <span className="text-xs font-bold tracking-wider uppercase">
                Khai giảng khóa mới tháng 11
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] mb-6 drop-shadow-xl">
              Tinh hoa ngôn ngữ <br />
              <span className="text-secondary relative inline-block">
                Trung Hoa
                <img
                  alt=""
                  className="absolute -top-8 -right-12 w-20 opacity-40 invert rotate-12"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhvprHGL6K93pHFVHLPVSFyKTZaBgwoiNwoZ6rufaP3po7sqtplcZ0ZwYV2GwP_0zun0jre0uIAbdySGtu4jG-uSCgC3yAEj_a49Fjunnm7lnluUwzOxT5LJN2DlK-mV7HEw8F0s7lXu7lzThvMEwBhVv1qGxDMQ0k589zZgj_A5-D1zb3exuWfXZ6VvlypTc_EcokCIn_ffDJPT0UKVdGasZVPsKRp-8BZ6p0Ng55-0HMo1e1E5gT-rBRAduNNVBO0Z1AhRqdGH8"
                />
              </span>
            </h2>

            <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed max-w-xl font-light">
              Hệ thống đào tạo tiếng Trung chuẩn HSK, tập trung vào trải nghiệm học
              viên và văn hóa Á Đông. Học để ứng dụng –{" "}
              <span className="font-serif">学以致用</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-secondary text-primary font-bold rounded-lg shadow-[0_4px_0_#b8860b] active:shadow-none active:translate-y-1 hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 text-lg">
                <span>Kiểm tra trình độ</span>
                <span className="material-symbols-outlined">quiz</span>
              </button>

              <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-lg">
                <span className="material-symbols-outlined">play_circle</span>
                <span>Video giới thiệu</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-[15%] w-1 h-32 bg-accent-red/80 shadow-sm hidden lg:block"></div>

        <div className="absolute top-32 right-[15%] -translate-x-1/2 w-24 h-28 bg-accent-red rounded-xl shadow-[0_10px_30px_rgba(200,16,46,0.5)] flex items-center justify-center border-t-8 border-b-8 border-secondary hidden lg:flex">
          <div className="text-secondary font-serif text-4xl font-bold bg-accent-red p-2 rounded border border-secondary/30">
            春
          </div>
        </div>
      </section>

      {/* CORE VALUE SECTION */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-white relative overflow-hidden">
        <div className="absolute -left-20 top-20 text-slate-50 font-serif text-[300px] leading-none select-none pointer-events-none">
          道
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="order-2 lg:order-1">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded mb-4 font-bold text-xs uppercase tracking-widest border-l-4 border-secondary">
              Giá trị cốt lõi
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8">
              Tại sao hàng ngàn học viên chọn{" "}
              <span className="text-primary">TOXI</span>?
            </h2>

            <div className="space-y-8">
              {[
                {
                  icon: "verified_user",
                  title: "Cam kết đầu ra bằng văn bản",
                  desc: "Hợp đồng đào tạo minh bạch. Học viên được học lại miễn phí 100% nếu không đạt kết quả như cam kết ban đầu.",
                  color: "text-primary",
                },
                {
                  icon: "record_voice_over",
                  title: "Phương pháp Nhúng (Immersion)",
                  desc: "Xây dựng môi trường giao tiếp 100% tiếng Trung, giúp hình thành phản xạ tự nhiên như người bản xứ.",
                  color: "text-accent-red",
                },
                {
                  icon: "auto_stories",
                  title: "Giáo trình độc quyền",
                  desc: "Biên soạn dựa trên HSK chuẩn mới nhất, kết hợp văn hóa và thực tế đời sống Trung Quốc hiện đại.",
                  color: "text-yellow-600",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 group">
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-xl bg-surface border border-slate-200 ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-secondary transition-all duration-300`}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xl mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/5] rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl border-[8px] border-white relative z-10">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwxb7nc6Y1agbpHftxTY_o4gDjVVkTrjthWCSr5aBCwYASNCDteRUBSCZszZPjpyC_ojHXMdIfsGFN2TxXG-ynM7Ys8vjpEEM7SYFsxEap7wqxiraLyfoPwKZ_gct2jA74qnO8XM_x9Jc6aeaDM2oQwgSFd1HOfrukFmrN2vDgUOmaNV-a2e7z1IkWP6mUG0NVibB_lY0a0S0Rh34s8N6VIua_DB_UF5NXrbv8oiRT8CsANH17Kx7-D2oDZk8IoCqgcI_r32IbgF0')",
                }}
              ></div>

              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                <p className="text-white font-serif text-2xl italic text-center w-full">
                  "Ngôn ngữ là cầu nối văn hóa"
                </p>
              </div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-chinese-pattern opacity-10 rounded-full z-0"></div>
            <div className="absolute top-10 -left-10 w-20 h-20 border-4 border-secondary rounded-full opacity-30 z-0"></div>
          </div>
        </div>
      </section>
      <section
      className="py-20 px-6 md:px-12 lg:px-16 bg-surface border-t border-slate-100"
      id="hsk"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-accent-red">
                school
              </span>
              <h2 className="text-3xl font-black text-primary">
                Lộ trình HSK Bài bản
              </h2>
            </div>
            <p className="text-slate-500 max-w-lg">
              Từ con số 0 đến HSK 6, trang bị đầy đủ 4 kỹ năng Nghe - Nói - Đọc -
              Viết để chinh phục chứng chỉ quốc tế.
            </p>
          </div>

          <a
            href="#"
            className="text-primary font-bold hover:text-secondary transition-colors flex items-center gap-1 mt-4 md:mt-0"
          >
            Xem chi tiết
            <span className="material-symbols-outlined text-sm">
              arrow_forward_ios
            </span>
          </a>
        </div>
{/* Grid */}
<div className="grid md:grid-cols-3 gap-8">
  {/* HSK 1-2 */}
  <Link
    to="/courses/1"
    className="block chinese-border bg-white p-1 shadow-sm hover:shadow-2xl transition-all group"
  >
    <div className="relative h-56 overflow-hidden">
      <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 z-10 rounded">
        NỀN TẢNG
      </div>

      <div
        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwxb7nc6Y1agbpHftxTY_o4gDjVVkTrjthWCSr5aBCwYASNCDteRUBSCZszZPjpyC_ojHXMdIfsGFN2TxXG-ynM7Ys8vjpEEM7SYFsxEap7wqxiraLyfoPwKZ_gct2jA74qnO8XM_x9Jc6aeaDM2oQwgSFd1HOfrukFmrN2vDgUOmaNV-a2e7z1IkWP6mUG0NVibB_lY0a0S0Rh34s8N6VIua_DB_UF5NXrbv8oiRT8CsANH17Kx7-D2oDZk8IoCqgcI_r32IbgF0')",
        }}
      />
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
        Tiếng Trung Cơ bản
      </h3>

      <p className="text-sm text-slate-500 mb-4 line-clamp-2">
        Làm quen với ngữ âm, bộ thủ và cấu trúc câu cơ bản. Đủ khả năng giao tiếp
        chào hỏi thông thường.
      </p>

      <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4">
        <span className="text-lg font-bold text-accent-red">
          2.500.000đ
        </span>
        <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded">
          24 Buổi
        </span>
      </div>
    </div>
  </Link>

          {/* HSK 3-4 */}
<Link
  to="/courses/2"
  className="block chinese-border bg-white p-1 shadow-sm hover:shadow-2xl transition-all group"
>
  <div className="relative h-56 overflow-hidden">
    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 z-10 rounded">
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

  <div className="p-6">
    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
      HSK 3 - HSK 4 (Tiếng Trung Phổ Thông)
    </h3>
    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
      Mở rộng vốn từ vựng lên 1200 từ. Giao tiếp trôi chảy các chủ đề đời sống,
      công việc và học tập.
    </p>
    <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4">
      <span className="text-lg font-bold text-accent-red">3.800.000đ</span>
      <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded">
        36 Buổi
      </span>
    </div>
  </div>
</Link>

         {/* HSK 5-6 */}
<Link
  to="/courses/3"
  className="block chinese-border bg-white p-1 shadow-sm hover:shadow-2xl transition-all group"
>
  <div className="relative h-56 overflow-hidden">
    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 z-10 rounded">
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

  <div className="p-6">
    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
      HSK 5 - HSK 6
    </h3>
    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
      Đạt trình độ cao cấp, có thể đọc báo, xem tin tức và làm việc chuyên nghiệp
      bằng tiếng Trung.
    </p>
    <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4">
      <span className="text-lg font-bold text-accent-red">5.200.000đ</span>
      <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded">
        48 Buổi
      </span>
    </div>
  </div>
</Link>
        </div>
      </div>
    </section>
     <section
      className="py-20 px-6 md:px-12 lg:px-16 bg-white relative"
      id="giaotiep"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-chinese-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary">
                translate
              </span>
              <h2 className="text-3xl font-black text-primary">
                Tiếng Trung Giao tiếp
              </h2>
            </div>
            <p className="text-slate-500 max-w-lg">
              Tập trung tối đa vào kỹ năng Nghe - Nói. Phản xạ nhanh, phát âm
              chuẩn Bắc Kinh.
            </p>
          </div>

          <a
            href="#"
            className="text-primary font-bold hover:text-secondary transition-colors flex items-center gap-1 mt-4 md:mt-0"
          >
            Xem chi tiết
            <span className="material-symbols-outlined text-sm">
              arrow_forward_ios
            </span>
          </a>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-secondary/50 hover:shadow-lg transition-all">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">
                record_voice_over
              </span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">
              Giao tiếp Cơ bản
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Dành cho người mới bắt đầu. Học phát âm chuẩn và các mẫu câu thông
              dụng hàng ngày.
            </p>
            <a
              href="#"
              className="text-sm font-bold text-primary flex items-center gap-1"
            >
              Khám phá
              <span className="material-symbols-outlined text-xs">
                arrow_forward
              </span>
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-secondary/50 hover:shadow-lg transition-all">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">forum</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">
              Giao tiếp Nâng cao
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Thảo luận các chủ đề xã hội, văn hóa sâu sắc. Tăng cường khả năng
              biện luận.
            </p>
            <a
              href="#"
              className="text-sm font-bold text-primary flex items-center gap-1"
            >
              Khám phá
              <span className="material-symbols-outlined text-xs">
                arrow_forward
              </span>
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-surface rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-secondary/50 hover:shadow-lg transition-all">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">
                travel_explore
              </span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">
              Tiếng Trung Du lịch
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Các tình huống thực tế khi đi du lịch: đặt phòng, hỏi đường, mua
              sắm, ăn uống.
            </p>
            <a
              href="#"
              className="text-sm font-bold text-primary flex items-center gap-1"
            >
              Khám phá
              <span className="material-symbols-outlined text-xs">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section
      className="py-20 px-6 md:px-12 lg:px-16 bg-primary text-white relative"
      id="dilam"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-chinese-pattern opacity-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary">
                work
              </span>
              <h2 className="text-3xl font-black text-white">
                Cho Người Đi Làm
              </h2>
            </div>
            <p className="text-slate-300 max-w-lg">
              Nội dung thực tế, bám sát chuyên ngành. Giúp bạn thăng tiến trong
              công việc.
            </p>
          </div>

          <a
            href="#"
            className="text-secondary font-bold hover:text-white transition-colors flex items-center gap-1 mt-4 md:mt-0"
          >
            Xem chi tiết
            <span className="material-symbols-outlined text-sm">
              arrow_forward_ios
            </span>
          </a>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 flex flex-col md:flex-row gap-6 hover:bg-white/20 transition-all">
            <div
              className="w-full md:w-1/3 aspect-video md:aspect-square rounded-lg bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFLYj59afdVrP74z9TI2skZU5rLCp33u4OROr59CQ8-n9_zr5jjF0D11cetdShmgGOw_0Wrn9ZfPFEwi4nbNhPXUgMTZKGB-WcB3RTvRyBaHBkF_3BMkjjhsIO9T89kGL_VxLgur7WLuxLkSseZsAMVEvhf3QK8myEY52RUeB-RnNmEof1Scr_B5lhuO8-B1tdpKMz8Se3qGLIIiYU4PnK7fN7hT37ttWTLW7XsBeiUHSU9kLzY9TI4Mc9hoYJSewdZDOcT0Vky0w')",
              }}
            ></div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-secondary mb-2">
                Tiếng Trung Văn phòng &amp; Thương mại
              </h3>
              <ul className="space-y-2 mb-6 text-sm text-slate-200">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Soạn thảo email, hợp đồng
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Kỹ năng đàm phán, thuyết trình
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Văn hóa doanh nghiệp Trung Quốc
                </li>
              </ul>
              <button className="px-5 py-2 bg-secondary text-primary font-bold rounded-full text-sm">
                Đăng ký ngay
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 flex flex-col md:flex-row gap-6 hover:bg-white/20 transition-all">
            <div
              className="w-full md:w-1/3 aspect-video md:aspect-square rounded-lg bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtVRXFknS_grfTIrQVmQmdLwKAo1xNkkJKHW9CWahlijN4S8g3c0dmeCe5bV8E30creqG7NGrK0vS-RqXB1c9BKVHSkm661aw6RxOaH6LnzJ5LOh5-kOsvC_rqeQeBvBsyq8ce_PfK4HNiiu9DjKUTlrAQsSa-kQPnlwUAB5bi92qJ5VaHA11lIkRCEs7cg_77QBKQI5xotjUgDwQ3FgNXXqXvuQ_Ot4cR6xUv0e_WO-iCBYQ9IAfbxrtjcchMQhOXdKRGJi5zG4I')",
              }}
            ></div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-secondary mb-2">
                Tiếng Trung Công xưởng &amp; Kỹ thuật
              </h3>
              <ul className="space-y-2 mb-6 text-sm text-slate-200">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Từ vựng chuyên ngành kỹ thuật
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Giao tiếp với quản lý, đồng nghiệp
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Quy trình sản xuất, an toàn
                </li>
              </ul>
              <button className="px-5 py-2 bg-secondary text-primary font-bold rounded-full text-sm">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
     <section id="store" className="py-20 px-6 md:px-12 lg:px-16 bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Toxi Store  */}
        <div className="flex items-center gap-4 mb-10 justify-center">
          <div className="h-px bg-slate-200 flex-1"></div>

          <div className="text-center">
            <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
              Dụng cụ học tập
            </div>
            <h2 className="text-3xl font-black text-slate-900">
              TOXI Store
            </h2>
          </div>

          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {/* Item 1 */}
<Link to="/products/1" className="group cursor-pointer">
  <div className="aspect-[3/4] rounded-xl bg-slate-100 overflow-hidden mb-4 relative shadow-sm border border-slate-200">
    <div
      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
      style={{
        backgroundImage:
          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbkVSFExNteE9CGGXL4Qv8mk3Gt2EkENVuguiwfR2-T3GqYfUywrHFjc0RbL0juSTVR_ajo2oxbi9kreWP7qevea_-wD6AIC6d9Olp-8l2L53EJMwT0SVmAlAlrHTfeMO1IEa0d-MDfprIGo-0tMBWdsmgxrXQ88bXPgmzEiHg9Yj-cjf-HicH8czfkj0tRY8SfJq4y4LzurOHyh5nSDXAMbyIkwa8nL6bcZN0ao5v-juwqPnwuyaKfXjKCk1LENhUYPOpKg0S3Qk')",
      }}
    />
    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <button className="bg-white text-primary p-3 rounded-full shadow-lg hover:bg-secondary transition-colors">
        <span className="material-symbols-outlined">
          shopping_cart
        </span>
      </button>
    </div>
  </div>
  <h3 className="font-bold text-slate-900 mb-1 truncate text-center">
    Vở tập viết Thượng Hải
  </h3>
  <p className="text-accent-red font-bold text-center">
    89.000đ
  </p>
</Link>

          {/* Item 2 */}
          <Link to="/products/2" className="group cursor-pointer">
            <div className="aspect-[3/4] rounded-xl bg-slate-100 overflow-hidden mb-4 relative shadow-sm border border-slate-200">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfeAdxPhgksrY8QFJ91EbYKlV9XXR2QamdXeEVsRakGCtbRskwOI2HO_kz8NPpRGVYESEgKuqTTa4-XczvNtRXaUWCjwN5FQEi7uPd6DU6kaJmRLgT0DiWNbgKOxl8kSAYSn2NrPqfGXBBdUVgoXHrTsjsfg6XgtVVFT14WdrNWWPPGeLvF1oQGXrP55PYQxLu5wRYzlHWNukZnIDCAoUxxfIsYVTGQW386LQtSZrjXVFP7hrwfy2EWORQQHW6ulcHTPdO9rJjStg')",
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white text-primary p-3 rounded-full shadow-lg hover:bg-secondary transition-colors">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </button>
              </div>
            </div>
            <h3 className="font-bold text-slate-900 mb-1 truncate text-center">
              Flashcard HSK 1-3
            </h3>
            <p className="text-accent-red font-bold text-center">
              250.000đ
            </p>
          </Link>

          {/* Item 3 */}
          <Link to="/products/3" className="group cursor-pointer">
            <div className="aspect-[3/4] rounded-xl bg-slate-100 overflow-hidden mb-4 relative shadow-sm border border-slate-200">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAb82Zl7_ZBUA4rQzh4vB3sSP9JJO06Rt2JATxjYWCrL_foyOJa5aXMMOrx-GJXj5tdiUqwz1VxxTuobg5iGAmC6f7YJU7T9voeVQuDTubrjH5mnlEtGifQVUhSqm4_dSMchhJBGoL8JT6a4Bpj10H-oQhPjIuELIUoI_-rjgxfvqIVzE5w5a9zmOAirMRZ1YU0msADojGz8NUnBZCb3JjgKZB9GzH77twiaE8DLzS8O_clnlLHmJgm2EXRXMQWPoA22Mvsj6tLVOw')",
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white text-primary p-3 rounded-full shadow-lg hover:bg-secondary transition-colors">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </button>
              </div>
            </div>
            <h3 className="font-bold text-slate-900 mb-1 truncate text-center">
              Giáo trình Hán ngữ Q1
            </h3>
            <p className="text-accent-red font-bold text-center">
              115.000đ
            </p>
          </Link>

          {/* Item 4 */}
          <Link to="/products/4" className="group cursor-pointer">
            <div className="aspect-[3/4] rounded-xl bg-slate-100 overflow-hidden mb-4 relative shadow-sm border border-slate-200">
              <div className="absolute top-2 left-2 bg-accent-red text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
                Best Seller
              </div>
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCh8Xr_PUz4IDYThA1TyDnkPT4BmJKLwhscu7FK-ySx4Kt2TTbRDod_9E_gpQ46epTfzi1k6QCNtXpm_ahEwyA8av66aj2PZ_nvmllqqP7fBMiosCgY5nUIq1E66J5bxV9mbxX_oOeoA46M-u2VXCLiaU6SRGbBTIPpgRz27skgwzo8h4rIMba5I_0GsL1fD4hSca5kIpGHkCuRnaGo0czuNYYQXQM3SzLiz0bomvuH4ZyFRuMvo26QM7rW4AOdgNearO3Cqofys3c')",
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white text-primary p-3 rounded-full shadow-lg hover:bg-secondary transition-colors">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </button>
              </div>
            </div>
            <h3 className="font-bold text-slate-900 mb-1 truncate text-center">
              Bộ bút lông thư pháp
            </h3>
            <p className="text-accent-red font-bold text-center">
              145.000đ
            </p>
          </Link>
        </div>
      </div>
    </section>
     <div className="bg-slate-50 py-20 px-6 md:px-12 lg:px-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">

        {/* BẢNG VÀNG */}
        <div className="lg:col-span-1" id="vinhdanh">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-secondary text-3xl">
              emoji_events
            </span>
            <h2 className="text-2xl font-black text-primary">
              Bảng Vàng Thành Tích
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-secondary/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary to-accent-red"></div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="h-12 w-12 rounded-full bg-primary text-secondary flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Nguyễn Thu Hà
                  </h4>
                  <p className="text-xs text-slate-500">
                    Đạt HSK 6 - 280 điểm
                  </p>
                </div>
                <span className="ml-auto text-accent-red font-bold text-sm">
                  Xuất sắc
                </span>
              </div>

              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Trần Minh Tuấn
                  </h4>
                  <p className="text-xs text-slate-500">
                    Đạt HSK 5 - 265 điểm
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Lê Ngọc Anh
                  </h4>
                  <p className="text-xs text-slate-500">
                    Học bổng Khổng Tử 2023
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-2 rounded-lg bg-primary/5 text-primary text-sm font-bold hover:bg-primary hover:text-white transition-colors">
              Xem tất cả
            </button>
          </div>
        </div>

        {/* BLOG */}
        <div className="lg:col-span-2" id="blog">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-3xl">
                history_edu
              </span>
              <h2 className="text-2xl font-black text-primary">
                Góc Văn Hóa &amp; Blog
              </h2>
            </div>
            <a
              href="#"
              className="text-sm font-bold text-slate-500 hover:text-primary"
            >
              Xem thêm →
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Blog 1 */}
            <article className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-lg transition-all">
              <div className="h-40 bg-slate-200 relative overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwsBsZIsyCmtSVufrnW8IQ3OcNeGQO6uv5_S2x_YweK8CwOgxS_j8F_1UlAP1CKu-MJ4a6fHrmJFtzUUcb_X4KSq8qWpLna00jvHLg7DEjci3_9aaWB-JPpLO0hbOLKlLYbtXWV_1gq2dYp2AdtNDqJHNF-j2XA-3y-JFm721_M16loDAuswddRMrVB91_VS9Tc0bFgo4Ft74lY4nteoQG2dIzPct6KXEEJ9A_vnNS8l55l5dzg3f46GB6CxSZ1N3nNlKt4Oc23S0')",
                  }}
                />
                <div className="absolute top-3 left-3 bg-secondary text-primary text-[10px] font-bold px-2 py-1 rounded">
                  Văn hóa
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  Ý nghĩa của màu đỏ trong văn hóa Trung Hoa ngày Tết
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Ngày 10/11/2023 • Bởi Admin
                </p>
                <p className="text-sm text-slate-600 line-clamp-2">
                  Tại sao người Trung Quốc lại thích màu đỏ? Tìm hiểu nguồn gốc và ý nghĩa tâm linh...
                </p>
              </div>
            </article>

            {/* Blog 2 */}
            <article className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-lg transition-all">
              <div className="h-40 bg-slate-200 relative overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhvprHGL6K93pHFVHLPVSFyKTZaBgwoiNwoZ6rufaP3po7sqtplcZ0ZwYV2GwP_0zun0jre0uIAbdySGtu4jG-uSCgC3yAEj_a49Fjunnm7lnluUwzOxT5LJN2DlK-mV7HEw8F0s7lXu7lzThvMEwBhVv1qGxDMQ0k589zZgj_A5-D1zb3exuWfXZ6VvlypTc_EcokCIn_ffDJPT0UKVdGasZVPsKRp-8BZ6p0Ng55-0HMo1e1E5gT-rBRAduNNVBO0Z1AhRqdGH8')",
                  }}
                />
                <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
                  Kinh nghiệm học
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  5 sai lầm phổ biến khi mới bắt đầu học Hán ngữ
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Ngày 08/11/2023 • Bởi Admin
                </p>
                <p className="text-sm text-slate-600 line-clamp-2">
                  Phát âm thanh mẫu, vận mẫu và cách nhớ chữ Hán hiệu quả cho người mới...
                </p>
              </div>
            </article>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};