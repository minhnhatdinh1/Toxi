
import { useNavigate } from 'react-router-dom';
import React, { useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import logo from '../../../assets/image/LOGO (1).png';

import { useCart } from "../../../context/CartContext";

export default function Cartmain() {
  const navigate = useNavigate();

  // ⭐ Thêm đủ các hàm từ context
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity, 0
    );
  }, [cartItems]);

  const shipping = 30000;
  const finalTotal = total + shipping;

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
        <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">
          <Link to="/Home" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
            <div>
              <h1 className="text-2xl font-black tracking-tighter leading-none">TOXI</h1>
              <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">学以致用</p>
            </div>
          </Link>

          <div className="flex-1 max-w-6xl hidden md:block">
            <div className="relative group">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm, giáo trình, dụng cụ..."
                className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm focus:ring-2 focus:ring-secondary focus:bg-white focus:text-primary transition-all placeholder-white/60"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">search</span>
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            {/* ⭐ Cart icon đơn giản */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <span className="material-symbols-outlined text-[28px] text-white hover:text-secondary transition-colors">
                shopping_cart
              </span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold hover:text-secondary transition-colors">Đăng nhập</Link>
              <Link to="/register" className="bg-secondary text-primary px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:bg-secondary-dark transition-all transform hover:scale-105">Đăng ký tư vấn</Link>
            </div>

            <button className="md:hidden text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 md:px-6 lg:px-10 py-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT - Danh sách sản phẩm */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-850 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                      <th className="px-6 py-4 min-w-[300px]">Sản phẩm / 产品</th>
                      <th className="px-6 py-4 text-center">Đơn giá</th>
                      <th className="px-6 py-4 text-center">Số lượng</th>
                      <th className="px-6 py-4 text-right">Tổng tiền</th>
                      <th className="px-4 py-4 text-center w-10"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {cartItems.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-16 text-slate-400">
                          <span className="material-symbols-outlined text-5xl block mb-2">shopping_cart</span>
                          Giỏ hàng trống
                        </td>
                      </tr>
                    ) : (
                      cartItems.map((item) => (
                        <tr key={item.cartItemId} className="group hover:bg-slate-50/50 transition-colors">
                          {/* PRODUCT */}
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

                          {/* PRICE */}
                          <td className="px-6 py-4 text-center text-sm font-medium text-slate-600">
                            {Number(item.price).toLocaleString()}đ
                          </td>

                          {/* QUANTITY */}
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => decreaseQuantity(item.cartItemId)}
                                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-slate-100 font-bold text-lg"
                              >
                                −
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

                          {/* TOTAL */}
                          <td className="px-6 py-4 text-right font-bold text-primary text-base">
                            {(Number(item.price) * item.quantity).toLocaleString()}đ
                          </td>

                          {/* DELETE */}
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() => removeFromCart(item.cartItemId)}
                              className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                            >
                              <span className="material-symbols-outlined text-xl">delete</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Thường được mua cùng */}
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

          {/* RIGHT - Tóm tắt đơn hàng */}
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
                  <span className="font-medium text-slate-900">{total.toLocaleString()}đ</span>
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
                  <span className="text-2xl font-bold text-primary">{finalTotal.toLocaleString()}đ</span>
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
