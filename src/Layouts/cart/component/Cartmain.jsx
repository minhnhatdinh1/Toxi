import react from 'react';
import { useNavigate } from 'react-router-dom';
export default function CartpageMain() {
  const navigate = useNavigate();
    return (
        <>
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex text-sm text-slate-500 mb-4">
          <a href="/Home" className="hover:text-primary transition-colors">
            Trang chủ
          </a>
          <span className="mx-2">/</span>
          <span className="text-slate-900 dark:text-slate-200 font-medium">
            Giỏ hàng
          </span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-white tracking-tight flex items-center gap-3">
              Giỏ hàng của bạn
              <span className="text-slate-400 font-normal text-xl md:text-2xl">
                / 购物车
              </span>
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Bạn có{" "}
              <span className="font-bold text-secondary-hover dark:text-secondary">
                3
              </span>{" "}
              sản phẩm trong giỏ hàng
            </p>
          </div>

          <a
            href="#"
            className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 group"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Tiếp tục mua sắm
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                    <th className="px-6 py-4 min-w-[300px]">
                      Sản phẩm / 产品
                    </th>
                    <th className="px-6 py-4 text-center">Đơn giá</th>
                    <th className="px-6 py-4 text-center">Số lượng</th>
                    <th className="px-6 py-4 text-right">Tổng tiền</th>
                    <th className="px-4 py-4 text-center w-10"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-20 h-28 bg-slate-100 dark:bg-slate-700 rounded-md overflow-hidden border border-slate-200 dark:border-slate-600">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvqNaoLfIfdXwGjg4vxASs488OnhYbOaL56CRMW_LGRT7HEenfcMi1oh5ZkyBI45PLRgnHP9VDKPhKN9CTKY_-2oKqd0wjHfre54-g6WUbYhLGqvLWG9u6rWm4xSfJDOpFebYaqrWZcV9SjPpGP3fXXcK3jGNaCDMkTkjQQdXF__EeUU9E87tcmvFnNgwNCehk7tDGJ2E5ak5PGHeWGneUBf5PuxfsB6G_SqB4iQUk_QD0w9rmo-tgTF2iogjdnGUWhkep0UbGAZw"
                            alt="Cover of Chinese textbook Hanyu Jiaocheng"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <div className="flex gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                              Sách
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                              Còn hàng
                            </span>
                          </div>

                          <a
                            href="#"
                            className="font-semibold text-slate-900 dark:text-white hover:text-primary transition-colors line-clamp-2"
                          >
                            Giáo trình Hán ngữ Quyển 1 - Phiên bản mới
                          </a>

                          <p className="text-xs text-slate-500">
                            Tác giả: Dương Ký Châu
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
                      150.000đ
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg h-9">
                          <button className="px-2 h-full text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg transition-colors">
                            <span className="material-symbols-outlined text-lg">
                              remove
                            </span>
                          </button>

                          <input
                            type="text"
                            value="1"
                            readOnly
                            className="w-10 h-full border-none p-0 text-center text-sm font-medium bg-transparent focus:ring-0 text-slate-900 dark:text-white"
                          />

                          <button className="px-2 h-full text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg transition-colors">
                            <span className="material-symbols-outlined text-lg">
                              add
                            </span>
                          </button>
                        </div>
                      </div>
                    </td>
                      <td className="px-6 py-4 text-right font-bold text-primary text-base">
    150.000đ
  </td>

  <td className="px-4 py-4 text-center">
    <button
      title="Xóa sản phẩm"
      className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 tooltip"
    >
      <span className="material-symbols-outlined text-xl">
        delete
      </span>
    </button>
  </td>
</tr>

<tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
  <td className="px-6 py-4">
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-20 h-28 bg-slate-100 dark:bg-slate-700 rounded-md overflow-hidden border border-slate-200 dark:border-slate-600">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAujl-AQXfmESPTpVH9Su8UY5bNH_LYDA-QNqIEre6i-GzYW2S7KduoG5cBaIJZTx_Zj-WyXa16bPpzDFJiLSRk3uAfcvdpBH8miK_1_8isJs2T2QDkX6KyAC0CttGO4nSKOTOkuD9SToTSflIbpz96CkqqA9YjOYawbCJqks4qrLlRD6gzV0ZumWzofGi1w8PhPwrmYSfBXLzcA8qlYXR8vFsWLSejb6VeGBzW66-KWF8IlL_9DG_7dAkGkhwTHd3cwKcVcRGictM"
          alt="Grid paper notebook for Chinese characters"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex gap-2 mb-1">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
            Vở viết
          </span>
        </div>

        <a
          href="#"
          className="font-semibold text-slate-900 dark:text-white hover:text-primary transition-colors line-clamp-2"
        >
          Vở tập viết chữ Hán kẻ ô (Mễ Tự)
        </a>

        <p className="text-xs text-slate-500">
          Loại: 100 trang
        </p>
      </div>
    </div>
  </td>
  <td className="px-6 py-4 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
                                        25.000đ
                                    </td>
                        <td className="px-6 py-4">
  <div className="flex items-center justify-center">
    <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg h-9">
      <button
        type="button"
        className="px-2 h-full text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg transition-colors"
      >
        <span className="material-symbols-outlined text-lg">
          remove
        </span>
      </button>

      <input
        type="text"
        value={2}
        readOnly
        className="w-10 h-full border-none p-0 text-center text-sm font-medium bg-transparent focus:ring-0 text-slate-900 dark:text-white"
      />

      <button
        type="button"
        className="px-2 h-full text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg transition-colors"
      >
        <span className="material-symbols-outlined text-lg">
          add
        </span>
      </button>
    </div>
  </div>
</td>

<td className="px-6 py-4 text-right font-bold text-primary text-base">
  50.000đ
</td>
            <td className="px-4 py-4 text-center">
  <button
    type="button"
    title="Xóa sản phẩm"
    className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
  >
    <span className="material-symbols-outlined text-xl">
      delete
    </span>
  </button>
</td>
</tr>

<tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
  <td className="px-6 py-4">
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-20 h-28 bg-slate-100 dark:bg-slate-700 rounded-md overflow-hidden border border-slate-200 dark:border-slate-600">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuJg6l0_UNV4LxiyA6RTEJjZQrDB8TXxLFaC1RzHvCXjFZ-yVrS3utL313fs--ELgk-1mEytTt2ngxdOMwDSliMzo5ApW_ES5keH5Ly85uiovThytZH43oy0rYJqUSCglorGdV0QWAV1maRyvxnGUp9dG2CnaXz_47X6nQNjZgnmDIr8-Jgo08be84AyiO5x8ex3uMFzQH2dvjR-sOM0f642hlb436gwNFZc2koEc7rJIdJm_Axh8inK7QW_GqZavKXtUA_AEbVqg"
          alt="Flashcards box set"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex gap-2 mb-1">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
            Công cụ
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary/20 text-yellow-700 dark:bg-secondary/30 dark:text-secondary border border-secondary/20">
            Hot
          </span>
        </div>

        <a
          href="#"
          className="font-semibold text-slate-900 dark:text-white hover:text-primary transition-colors line-clamp-2"
        >
          Flashcard HSK 1-3 (Bộ 300 thẻ)
        </a>

        <p className="text-xs text-slate-500">
          Kèm khoen tròn
        </p>
      </div>
    </div>
  </td>

  <td className="px-6 py-4 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
    99.000đ
  </td>
  <td className="px-6 py-4">
  <div className="flex items-center justify-center">
    <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg h-9">
      <button
        type="button"
        className="px-2 h-full text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg transition-colors"
      >
        <span className="material-symbols-outlined text-lg">
          remove
        </span>
      </button>

      <input
        type="text"
        value="1"
        readOnly
        className="w-10 h-full border-none p-0 text-center text-sm font-medium bg-transparent focus:ring-0 text-slate-900 dark:text-white"
      />

      <button
        type="button"
        className="px-2 h-full text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg transition-colors"
      >
        <span className="material-symbols-outlined text-lg">
          add
        </span>
      </button>
    </div>
  </div>
</td>

<td className="px-6 py-4 text-right font-bold text-primary text-base">
  99.000đ
</td>
<td className="px-4 py-4 text-center">
  <button
    type="button"
    title="Xóa sản phẩm"
    className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
  >
    <span className="material-symbols-outlined text-xl">
      delete
    </span>
  </button>
</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="block md:hidden p-4 space-y-4">
              <p className="text-xs text-center text-slate-400 italic">Vuốt ngang bảng ở trên để xem chi tiết</p>
            </div>
          </div>
          <div className="mt-4">
  <h3 className="text-lg font-bold text-primary dark:text-white mb-4">
    Thường được mua cùng
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 hover:border-primary/50 transition-colors">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4vLroPUWDDL98SD3xgR5bU8vNIYkpKNt2vVmhSnTluAUCCj6AF-9fORAYZiYFzBZF6cuE1h2ZQBp9B_q95NQpUvMBeEaZnTeQ0Ti6resVjlLWIckQ8-DetGfkFWj0cRUQ6QoXGHvRctpxeWGumuXFM1xaeUpOIKJBRd9--Mmgc5xk0zORhPYsjSxCN0Qtf0lm8EDa5lblZbo6JyxhIYaVDEjh1OL0XHSZnpZbiA9ELCPlAAdHHCxHPja6QxxXcEDhBeeR2OLKpVs"
        alt="Set of black ink calligraphy pens"
        className="w-16 h-16 rounded object-cover bg-slate-100"
      />

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">
          Bút gel nước mực đen (Hộp 10)
        </h4>

        <div className="flex items-center justify-between mt-1">
          <span className="text-sm font-bold text-primary">
            45.000đ
          </span>

          <button
            type="button"
            className="text-slate-500 hover:text-secondary hover:bg-secondary/10 p-1.5 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-xl">
              add_shopping_cart
            </span>
          </button>
        </div>
      </div>
    </div>
        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 hover:border-primary/50 transition-colors">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMxfADuad7GrBW0ezOStIHDwbqU_zJpMVnTSGzUmxK0VpA1_oVx1iuoPiWhtUI1VTQkMSew5TUaye-grRKs_ODfT7a0tEhvror9Pz9ZTC7uFzA4lvR1Cubl_heJv7AJuqQX4Ejio5bJabB8kVpWN6HQIYDZbECLvjnv53WCVbqjrvzj2oYR3YK-ts27J5oGzRn25FQIiQg-bN4O_jmeRgvJR4KqWD45QVvIDDjjjNLS-ut2u74lYZTHWtFLhikmhGgVC6hRITZAJw"
        alt="Cover of Chinese Characters Dictionary"
        className="w-16 h-16 rounded object-cover bg-slate-100"
      />

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">
          Từ điển Hán Việt hiện đại
        </h4>

        <div className="flex items-center justify-between mt-1">
          <span className="text-sm font-bold text-primary">
            120.000đ
          </span>

          <button
            className="text-slate-500 hover:text-secondary hover:bg-secondary/10 p-1.5 rounded-full transition-colors"
            title="Thêm vào giỏ hàng"
          >
            <span className="material-symbols-outlined text-xl">
              add_shopping_cart
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
          <div className="lg:col-span-4 sticky top-24">
      <div className="bg-white dark:bg-slate-850 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-6">
        <h2 className="text-xl font-bold text-primary dark:text-white">
          Tóm tắt đơn hàng
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Mã giảm giá"
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all dark:text-white"
          />

          <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            Áp dụng
          </button>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
            <span>Tạm tính (3 sản phẩm)</span>
            <span className="font-medium text-slate-900 dark:text-white">
              299.000đ
            </span>
          </div>

          <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
            <span>Phí vận chuyển (Dự kiến)</span>
            <span className="font-medium text-slate-900 dark:text-white">
              30.000đ
            </span>
          </div>

          <div className="flex justify-between items-center text-sm text-green-600 dark:text-green-400">
            <span>Giảm giá</span>
            <span className="font-medium">-0đ</span>
          </div>
        </div>
         <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-end mb-1">
          <span className="text-base font-bold text-slate-900 dark:text-white">
            Tổng cộng
          </span>
          <span className="text-2xl font-bold text-primary">
            329.000đ
          </span>
        </div>
        <p className="text-xs text-right text-slate-400">
          (Đã bao gồm VAT nếu có)
        </p>
      </div>

      <button
  onClick={() => navigate("/checkout")}
  className="w-full bg-secondary hover:bg-secondary-hover text-slate-900 font-bold py-3.5 px-4 rounded-lg shadow-lg shadow-secondary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
>
  Tiến hành thanh toán
  <span className="material-symbols-outlined text-sm">
    arrow_forward
  </span>
</button>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="material-symbols-outlined text-slate-400 text-2xl">
            verified_user
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            Bảo mật thanh toán
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <span className="material-symbols-outlined text-slate-400 text-2xl">
            local_shipping
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            Đổi trả dễ dàng
          </span>
        </div>
      </div>
      </div>
    </div>
      </div>
    </main>
    <footer className="mt-auto py-8 bg-white dark:bg-slate-850 border-t border-slate-200 dark:border-slate-700">
<div className="max-w-[1440px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
<p>© 2024 TOXI Store. All rights reserved.</p>
<div className="flex gap-4">
<a className="hover:text-primary" href="#">Điều khoản</a>
<a className="hover:text-primary" href="#">Chính sách bảo mật</a>
<a className="hover:text-primary" href="#">Hỗ trợ</a>
</div>
</div>
</footer>
        </>
    )
};