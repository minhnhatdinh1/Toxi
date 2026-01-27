import react from 'react';
export default function CheckOutMain() {
    return (
     <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-surface-light/95 dark:bg-background-dark/95 backdrop-blur supports-[backdrop-filter]:bg-surface-light/60">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="size-8 text-primary flex items-center justify-center rounded-lg bg-primary/10">
              <span className="material-symbols-outlined text-2xl">
                school
              </span>
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                TOXI
              </h1>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Học để ứng dụng
              </span>
            </div>

            <div className="hidden md:flex h-6 w-px bg-slate-200 dark:bg-slate-700 mx-4"></div>

            <div className="hidden md:flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[20px]">
                lock
              </span>
              <span className="text-sm font-medium">
                Thanh toán an toàn
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
              Trợ giúp
            </button>

            <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTQGx7FvBWhpLdwFpHcSkqi3QIy0CT-QG_kUMQBwmoSnwZnBhelHAEvjVPSIFDNN81tRrSb4_TCOB_x3TIP7R4nuX0McUwnkO0HOvhK1ibTxCsLK0KD6y1LEVhcKlPkHMxgOvPhOY2p8_Zih9fZeQnBroksp1E5lXPtUo-22bWnMYGHEmFPOlxdmyandEZZYiuhpXF3ZSCHpGaWr8NSN6gfSki3YG9xN6rXU62USqQ_ojVluztPvwm_7fJpqt8CW4PtTYFnl72a7A"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
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
<section className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
  <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-white/5 flex items-center justify-between">
    <h3 className="text-lg font-bold flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
        2
      </span>
      Phương thức thanh toán
    </h3>

    <div className="flex gap-1 opacity-60 grayscale hover:grayscale-0 transition-all">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuARolOop9r64I8GbdFqPz1pYPzlQGf8A4hwcr0K0SV8DyybZkDpLFyuhVhpnVX-3lSvroIP51joVZxB0sjr_lGh1fBeHKfEje_Hk15EVNZC10UEw8_0RfOjtOUOVqF5ZoSyXx96RvPFGrK7pROjfaIKn4lx41Q6PfQ5rR3VzxvRUhWXBqDfn1ifTyVY53pJVn7t5qtVpPDnCwMGx0c6GOG3ZT0_khjO5QHOqO4p6jfFdNEs-8ioPuyiVGTh9EQltUgHngf_it1tgbw"
        alt="Mastercard"
        className="h-5 object-contain"
      />
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuByibKhe_ydvnyB8JaWqexzFEjL0TgyugvTQ75KjtBsuvrpvc7FOaJfTHte3RmK9kZbFFeumswq7gJFIBcXAtZbr0ooydvm75IZh74lvxkoFKx35c2_bNIzD7HqukIYb5EgK-t7lvtV22h1VqA1-_0N2FD65DULQ4FYB5q2vkFAeKnH4lJrBdDZucHMxSu7iJB0A48U_gsNbBjbwcRJigoi9y5gJ7LD9gU30aWlNMXy8ZM25ur9LnFfow-dNL5VvkUHXtSZLCYEZqg"
        alt="Visa"
        className="h-5 object-contain"
      />
    </div>
  </div>

  <div className="p-6 space-y-4">
    {/* VNPay */}
    <label className="relative flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 group border-slate-200 dark:border-slate-700 has-[:checked]:border-secondary has-[:checked]:bg-secondary/5 has-[:checked]:ring-1 has-[:checked]:ring-secondary">
      <input
        type="radio"
        name="payment_method"
        className="sr-only peer"
      />

      <div className="flex items-center justify-center size-5 rounded-full border border-slate-300 dark:border-slate-600 peer-checked:bg-secondary peer-checked:border-secondary mr-4 transition-colors">
        <div className="size-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 dark:text-white">
            VNPay QR / Thẻ ATM / Visa
          </span>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmtCCK5nDZwS4ZOsTZmtk7ROSvGCpudR3hEoKVxJpM30oKc6MnBVkqygwwO-rpoHUoL_5N87GglGBcE6H6ssvobuXW35Ti4KaD6grUeUN81dpMyteIOngjh6dkQ2LfCWyrpiSh28RtV0JjvHLvy3p0f2s8cIeL7ebJ93jNJ29xZPvysrXRTedaONx5BIHW4VH9PfZBOFZZtoo9LrzPiZMASz7nDkVESNO1n65YnZRytfaTmDAIqYt_CBmVScJ0hFIUKWm0ti0yGZI"
            alt="VNPay"
            className="h-6 object-contain"
          />
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Quét mã QR hoặc nhập thẻ ngân hàng. Miễn phí giao dịch.
        </p>
      </div>
    </label>

    {/* MoMo (default) */}
    <label className="relative flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 group border-slate-200 dark:border-slate-700 has-[:checked]:border-secondary has-[:checked]:bg-secondary/5 has-[:checked]:ring-1 has-[:checked]:ring-secondary">
      <input
        type="radio"
        name="payment_method"
        defaultChecked
        className="sr-only peer"
      />

      <div className="flex items-center justify-center size-5 rounded-full border border-slate-300 dark:border-slate-600 peer-checked:bg-secondary peer-checked:border-secondary mr-4 transition-colors">
        <div className="size-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 dark:text-white">
            Ví MoMo
          </span>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtIyGkhGvDHyXxeK35ek1L6tFGw8_Vz4ONgr9rQowXVNBuuBx7YOJ_Ua2dDx-l7Zex_wgHbtPa_4gXSf2ssiMBWwdHefvJBVVFHRXi4KfGKCD5Jnfjyyqt44obD5J0ihBB8lZxWUm8ePgKfvyUsHA4G4qvICxEbBlgS-ilKW7UWgwbz61HYDo3UlR9rtMutLyuN9hqiEHVprpwDuFw0M4dbW7kWCJEIOFKRvJjts2xwnrjsLhrh7kY2Gi7cVkkStuB-9LS4nJRcFI"
            alt="MoMo"
            className="h-8 w-8 object-contain rounded-md"
          />
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Thanh toán siêu tốc qua ứng dụng MoMo.
        </p>
      </div>
    </label>

    {/* Bank transfer */}
    <label className="relative flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 group border-slate-200 dark:border-slate-700 has-[:checked]:border-secondary has-[:checked]:bg-secondary/5 has-[:checked]:ring-1 has-[:checked]:ring-secondary">
      <input
        type="radio"
        name="payment_method"
        className="sr-only peer"
      />

      <div className="flex items-center justify-center size-5 rounded-full border border-slate-300 dark:border-slate-600 peer-checked:bg-secondary peer-checked:border-secondary mr-4 transition-colors">
        <div className="size-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 dark:text-white">
            Chuyển khoản Ngân hàng
          </span>
          <span className="material-symbols-outlined text-slate-400 text-3xl">
            account_balance
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Chuyển khoản trực tiếp tới VietinBank. Nội dung tự động.
        </p>
      </div>
    </label>
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