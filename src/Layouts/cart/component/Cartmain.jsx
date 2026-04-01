import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import StoreTopHeader from "../../common/StoreTopHeader";

const getEffectiveItemPrice = (item) => {
  const discountPrice = Number(item.discountPrice ?? item.finalPrice ?? 0);
  const basePrice = Number(item.price ?? 0);
  if (discountPrice > 0 && (basePrice <= 0 || discountPrice < basePrice)) {
    return discountPrice;
  }
  return basePrice;
};

export default function Cartmain() {
  const navigate = useNavigate();
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + getEffectiveItemPrice(item) * item.quantity,
        0
      ),
    [cartItems]
  );

  const shipping = 30000;
  const finalTotal = total + shipping;

  return (
    <>
      <StoreTopHeader />

      <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 md:px-6 lg:px-10 py-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                      <th className="px-6 py-4 min-w-[300px]">Sản phẩm</th>
                      <th className="px-6 py-4 text-center">Đơn giá</th>
                      <th className="px-6 py-4 text-center">Số lượng</th>
                      <th className="px-6 py-4 text-right">Tổng tiền</th>
                      <th className="px-4 py-4 text-center w-10"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {cartItems.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-16 text-slate-400">
                          <span className="material-symbols-outlined text-5xl block mb-2">shopping_cart</span>
                          Giỏ hàng trống
                        </td>
                      </tr>
                    ) : (
                      cartItems.map((item) => {
                        const unitPrice = getEffectiveItemPrice(item);

                        return (
                          <tr key={item.cartItemId} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-start gap-4">
                                <div className="shrink-0 w-20 h-28 bg-slate-100 rounded-md overflow-hidden border border-slate-200">
                                  <img
                                    src={item.imageUrl || "/placeholder.png"}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="font-semibold text-slate-900 line-clamp-2">
                                    {item.title}
                                  </span>
                                  <span className="text-xs text-slate-400 uppercase">{item.itemType}</span>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-center text-sm font-medium text-slate-600">
                              {unitPrice.toLocaleString("vi-VN")}đ
                            </td>

                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => decreaseQuantity(item.cartItemId)}
                                  className="w-8 h-8 flex items-center justify-center border rounded hover:bg-slate-100 font-bold text-lg"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <button
                                  onClick={() => increaseQuantity(item.cartItemId)}
                                  className="w-8 h-8 flex items-center justify-center border rounded hover:bg-slate-100 font-bold text-lg"
                                >
                                  +
                                </button>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-right font-bold text-primary text-base">
                              {(unitPrice * item.quantity).toLocaleString("vi-VN")}đ
                            </td>

                            <td className="px-4 py-4 text-center">
                              <button
                                onClick={() => removeFromCart(item.cartItemId)}
                                className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                              >
                                <span className="material-symbols-outlined text-xl">delete</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold text-primary mb-4">Thường được mua cùng</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Bút gel nước mực đen (Hộp 10)", price: "45.000đ", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4vLroPUWDDL98SD3xgR5bU8vNIYkpKNt2vVmhSnTluAUCCj6AF-9fORAYZiYFzBZF6cuE1h2ZQBp9B_q95NQpUvMBeEaZnTeQ0Ti6resVjlLWIckQ8-DetGfkFWj0cRUQ6QoXGHvRctpxeWGumuXFM1xaeUpOIKJBRd9--Mmgc5xk0zORhPYsjSxCN0Qtf0lm8EDa5lblZbo6JyxhIYaVDEjh1OL0XHSZnpZbiA9ELCPlAAdHHCxHPja6QxxXcEDhBeeR2OLKpVs" },
                  { name: "Từ điển Hán Việt hiện đại", price: "120.000đ", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMxfADuad7GrBW0ezOStIHDwbqU_zJpMVnTSGzUmxK0VpA1_oVx1iuoPiWhtUI1VTQkMSew5TUaye-grRKs_ODfT7a0tEhvror9Pz9ZTC7uFzA4lvR1Cubl_heJv7AJuqQX4Ejio5bJabB8kVpWN6HQIYDZbECLvjnv53WCVbqjrvzj2oYR3YK-ts27J5oGzRn25FQIiQg-bN4O_jmeRgvJR4KqWD45QVvIDDjjjNLS-ut2u74lYZTHWtFLhikmhGgVC6hRITZAJw" },
                ].map((prod) => (
                  <div key={prod.name} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:border-primary/50 transition-colors">
                    <img src={prod.img} alt={prod.name} className="w-16 h-16 rounded object-cover bg-slate-100" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-slate-900 truncate">{prod.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-bold text-primary">{prod.price}</span>
                        <button className="text-slate-500 hover:text-secondary p-1.5 rounded-full hover:bg-secondary/10 transition-colors">
                          <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6">
              <h2 className="text-xl font-bold text-primary">Tóm tắt đơn hàng</h2>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Mã giảm giá"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
                <button className="px-4 py-2 bg-slate-100 text-slate-600 font-medium text-sm rounded-lg hover:bg-slate-200 transition-colors">
                  Áp dụng
                </button>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                  <span className="font-medium text-slate-900">{total.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Phí vận chuyển (Dự kiến)</span>
                  <span className="font-medium text-slate-900">30.000đ</span>
                </div>
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span>Giảm giá</span>
                  <span className="font-medium">-0đ</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-base font-bold text-slate-900">Tổng cộng</span>
                  <span className="text-2xl font-bold text-primary">
                    {finalTotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <p className="text-xs text-right text-slate-400">(Đã bao gồm VAT nếu có)</p>
              </div>

              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      cartItems,
                      total,
                      shipping,
                      finalTotal,
                    },
                  })
                }
                className="w-full bg-secondary hover:bg-yellow-400 text-slate-900 font-bold py-3.5 px-4 rounded-lg shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Tiến hành thanh toán
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="material-symbols-outlined text-slate-400 text-2xl">verified_user</span>
                  <span className="text-[10px] text-slate-500">Bảo mật thanh toán</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="material-symbols-outlined text-slate-400 text-2xl">local_shipping</span>
                  <span className="text-[10px] text-slate-500">Đổi trả dễ dàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 bg-white border-t border-slate-200">
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
  );
}
