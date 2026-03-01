import react from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/image/LOGO (1).png';
export default function CheckOutMain() {
    return (
     <>
       <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">
        {/* LOGO */}
       <Link to="/Home" className="flex items-center gap-3 shrink-0">
                 <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
                 <div>
                   <h1 className="text-2xl font-black tracking-tighter leading-none">
                     TOXI
                   </h1>
                   <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">
                     学以致用
                   </p>
                 </div>
               </Link>

        {/* SEARCH */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative group">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, giáo trình, dụng cụ..."
              className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm focus:ring-2 focus:ring-secondary focus:bg-white focus:text-primary transition-all placeholder-white/60"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">
              search
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-6 shrink-0">
          {/* CART */}
          <div className="relative group cursor-pointer">
          <button className="flex-[1.5] px-8 py-5 bg-primary text-secondary font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 group">
      
      <span
        className="material-symbols-outlined group-hover:scale-110 transition-transform cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // không trigger click của button
          navigate("/cart");
        }}
      >
        shopping_cart
      </span>
      </button>
          </div>

          {/* AUTH BUTTONS */}
          <div className="hidden sm:flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold hover:text-secondary transition-colors">
              Đăng nhập
            </Link>
            <Link to="/register" className="bg-secondary text-primary px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:bg-secondary-dark transition-all transform hover:scale-105">
              Đăng ký tư vấn
            </Link>
          </div>

          {/* MOBILE MENU */}
          <button className="md:hidden text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-8">
  <nav className="flex mb-8 text-sm font-medium">
    <ol className="flex items-center gap-2">
      <li>
        <a
          href="/cart"
          className="text-slate-500 hover:text-primary transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[18px]">
            shopping_cart
          </span>
          Giỏ hàng
        </a>
      </li>

      <li className="text-slate-400">/</li>

      <li className="text-primary flex items-center gap-1">
        <span className="material-symbols-outlined text-[18px]">
          payment
        </span>
        Thanh toán
      </li>

      <li className="text-slate-400">/</li>

      <li className="text-slate-400">Hoàn tất</li>
    </ol>
  </nav>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    <div className="lg:col-span-7 xl:col-span-8 space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Thanh toán đơn hàng
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Hoàn tất thông tin để bắt đầu hành trình chinh phục tiếng Trung.
        </p>
      </div>
      <section className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
  <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-white/5 flex items-center justify-between">
    <h3 className="text-lg font-bold flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
        1
      </span>
      Thông tin giao hàng
    </h3>

    <button
      type="button"
      className="text-sm text-primary font-medium hover:underline"
    >
      Đăng nhập để tự động điền
    </button>
  </div>

  <div className="p-6 space-y-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Họ và tên <span className="text-red-500">*</span>
        </span>
        <input
          type="text"
          placeholder="Nguyễn Văn A"
          className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Số điện thoại <span className="text-red-500">*</span>
        </span>
        <input
          type="tel"
          placeholder="0912 xxx xxx"
          className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
        />
      </label>
    </div>

    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Email nhận tài liệu <span className="text-red-500">*</span>
      </span>
      <input
        type="email"
        placeholder="example@email.com"
        className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
      />
    </label>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Tỉnh / Thành phố
        </span>
        <select
          defaultValue=""
          className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
        >
          <option value="" disabled>
            Chọn Tỉnh/Thành
          </option>
          <option value="HN">Hà Nội</option>
          <option value="HCM">Hồ Chí Minh</option>
          <option value="DN">Đà Nẵng</option>
        </select>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Quận / Huyện
        </span>
        <select
          disabled
          defaultValue=""
          className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
        >
          <option value="" disabled>
            Chọn Quận/Huyện
          </option>
        </select>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Phường / Xã
        </span>
        <select
          disabled
          defaultValue=""
          className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
        >
          <option value="" disabled>
            Chọn Phường/Xã
          </option>
        </select>
      </label>
    </div>

    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Địa chỉ cụ thể
      </span>
      <input
        type="text"
        placeholder="Số nhà, tên đường, tòa nhà..."
        className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
      />
    </label>

    <div className="flex items-center gap-2 pt-2">
      <input
        id="save-info"
        type="checkbox"
        className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
      />
      <label
        htmlFor="save-info"
        className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none"
      >
        Lưu thông tin cho lần thanh toán sau
      </label>
    </div>
  </div>
</section>

    </div>
    <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
  <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
    
    {/* Header */}
    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        Tóm tắt đơn hàng
      </h3>
    </div>

    {/* List items */}
    <div className="p-6 max-h-[300px] overflow-y-auto space-y-4">
      
      {/* Item 1 */}
      <div className="flex gap-3">
        <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-600">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk0dPys2cKUb6lnhJJg3VXH4wdG6Ju7WhX3B_VBokihVE8hY43wOo2SeK_cRKJcIlKyZBGXfZdxvsbwhWDt9XK94iChfomOCLVD7tenxxOiQa3WgAZUDJR3WpZdG7YI5fiQau-ZaS7A21nhkUWDFxMEdp_2CP9g2lWCrW-ZjuOmHO1cgFCJzn_DpEviUm6FkT_19M09UtFHuHAN92How71LHCiyUTA-zUqr2aa_u8tCDAf61tMnIZzoTzb4ukQ0Ru36-WvrfdE8nc"
            alt="Sách tiếng Trung"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">
            Combo Giáo trình Hán ngữ (6 Quyển) + Audio
          </h4>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Số lượng: 1
            </span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              450.000đ
            </span>
          </div>
        </div>
      </div>

      {/* Item 2 */}
      <div className="flex gap-3">
        <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-600">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl6bOrE9cPDxpIjgxZE7TMqCLbTX8_0oAd3oEfL8mOGqZ9-UThZrFgmRu34lkE6trZVx01nLxrlcsR_YJrRvl1-0aspwQichRQ6ycS4UZmWBiTXIbZpLqECw9IzySvkE8hi8OTB082Dcp8dQkw7devdfrKpvD8bCq7KLXsz5k4d-GImuixKjJe33F5rCWcsAJ9t8v9g9TPDf0c-hI_thcrk3n4ATSTzybys4UpW1wzvvtaDnl9WiIVP8lNeNU6hw6sGRDNwUERjEo"
            alt="Khóa học online"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">
            Khóa học Online: Tiếng Trung Giao tiếp Cơ bản
          </h4>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Khóa học trọn đời
            </span>
            <div className="text-right">
              <span className="text-xs text-slate-400 line-through block">
                1.200.000đ
              </span>
              <span className="text-sm font-medium text-primary">
                899.000đ
              </span>
            </div>
          </div>
        </div>
      </div>

    </div> {/* Voucher */}
  <div className="px-6 py-4 bg-slate-50/50 dark:bg-white/5 border-t border-b border-slate-200 dark:border-slate-700">
    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
      Mã giảm giá / Voucher
    </label>

    <div className="flex gap-2">
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <span className="material-symbols-outlined text-[20px]">sell</span>
        </span>

        <input
          type="text"
          placeholder="Nhập mã TOXI..."
          className="w-full pl-9 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm h-10 focus:border-primary focus:ring-primary uppercase placeholder:normal-case"
        />
      </div>

      <button className="px-4 h-10 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-sm font-semibold rounded-lg transition-colors">
        Áp dụng
      </button>
    </div>
  </div>

  {/* Price summary */}
  <div className="p-6 space-y-3">
    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
      <span>Tạm tính</span>
      <span>1.349.000đ</span>
    </div>

    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
      <span>Phí vận chuyển</span>
      <span>30.000đ</span>
    </div>

    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
      <span>Giảm giá</span>
      <span>-50.000đ</span>
    </div>

    <div className="border-t border-slate-200 dark:border-slate-700 my-4 pt-4 flex justify-between items-end">
      <span className="text-base font-bold text-slate-900 dark:text-white">
        Tổng cộng
      </span>

      <div className="text-right">
        <span className="block text-2xl font-bold text-primary">
          1.329.000đ
        </span>
        <span className="text-xs text-slate-400">(Đã bao gồm VAT)</span>
      </div>
    </div>

    <button className="w-full bg-secondary hover:bg-secondary/90 text-slate-900 font-bold py-4 rounded-xl shadow-lg shadow-secondary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-4">
      <span>Thanh toán ngay</span>
      <span className="material-symbols-outlined text-[20px]">
        arrow_forward
      </span>
    </button>

    <div className="flex items-center justify-center gap-2 pt-4 text-xs text-slate-400">
      <span className="material-symbols-outlined text-[16px]">
        verified_user
      </span>
      <span>Bảo mật SSL 256-bit</span>
    </div>
  </div>

  {/* Support box */}
  <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-900/50 flex items-start gap-3">
    <span className="material-symbols-outlined text-primary text-xl mt-0.5">
      headset_mic
    </span>

    <div>
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        Cần hỗ trợ?
      </p>
      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
        Liên hệ hotline <strong>1900 xxxx</strong> hoặc chat trực tiếp để được tư vấn về đơn hàng.
      </p>
    </div>
  </div>

  </div>
</div>
  </div>
</main>
     </>
    )
};