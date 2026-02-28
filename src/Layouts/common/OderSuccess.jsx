import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  // giả lập mã đơn hàng
  const orderId = Math.floor(Math.random() * 1000000);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">

        {/* Icon success */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-green-600 text-4xl">
              check_circle
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Đặt hàng thành công 🎉
        </h1>

        <p className="text-slate-500 mb-6">
          Cảm ơn bạn đã mua hàng tại <strong>TOXI</strong>.
        </p>

        {/* Order ID */}
        <div className="bg-slate-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-slate-500">Mã đơn hàng</p>
          <p className="text-lg font-bold text-primary">#{orderId}</p>
        </div>

        {/* Message */}
        <p className="text-sm text-slate-600 mb-8">
          Chúng tôi đã gửi thông tin đơn hàng tới email của bạn.
          Bạn có thể theo dõi trạng thái đơn hàng trong mục đơn hàng.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={() => navigate("/orders")}
            className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Xem đơn hàng
          </button>

          <Link
            to="/home"
            className="flex-1 bg-slate-200 py-3 rounded-lg font-semibold hover:bg-slate-300 transition"
          >
            Tiếp tục mua
          </Link>

        </div>
      </div>
    </div>
  );
}