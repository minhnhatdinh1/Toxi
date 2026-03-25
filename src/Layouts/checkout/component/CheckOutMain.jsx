import React ,{ useEffect, useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from "../../../context/CartContext";
import logo from '../../../assets/image/LOGO (1).png';
import axios from "axios";
export default function CheckOutMain() {
    const navigate = useNavigate();
    const { courseId } = useParams();
 
const { cartItems, clearCart } = useCart();
  const [directCourse, setDirectCourse] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    ward: "",
    address: "",
  });

  useEffect(() => {
    const fetchDirectCourse = async () => {
      if (!courseId || cartItems.length > 0) {
        setDirectCourse(null);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
        const course = res.data;
        const price = Number(course?.discountPrice && course.discountPrice < course.price
          ? course.discountPrice
          : course?.price || 0);

        setDirectCourse({
          cartItemId: `course-${course.courseId}`,
          itemId: course.courseId,
          itemType: "COURSE",
          quantity: 1,
          price,
          title: course.title,
          imageUrl: course.thumbnailUrl || "/placeholder.png",
        });
      } catch (error) {
        console.error("Load checkout course error:", error);
        setDirectCourse(null);
      }
    };

    fetchDirectCourse();
  }, [courseId, cartItems]);

  const checkoutItems = useMemo(() => {
    if (cartItems.length > 0) return cartItems;
    return directCourse ? [directCourse] : [];
  }, [cartItems, directCourse]);

  const shipping = directCourse && cartItems.length === 0 ? 0 : 30000;

  const total = useMemo(() => {
    return checkoutItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
  }, [checkoutItems]);

  const finalTotal = total + shipping;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
  if (checkoutItems.length === 0) {
    alert("Chưa có sản phẩm nào để thanh toán");
    return;
  }
  if (!form.fullName || !form.phone || !form.email) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
 const token = localStorage.getItem("token");
  if (!token) {
    alert("Vui lòng đăng nhập lại");
    navigate("/login");
    return;
  }

    const decoded = JSON.parse(atob(token.split('.')[1]));
  if (decoded.exp * 1000 < Date.now()) {
    alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
    localStorage.clear();
    navigate("/login");
    return;
  }
  const payload = {
    ...form,
    items: checkoutItems.map((item) => ({
      itemId: item.itemId,
      itemType: item.itemType,
      price: item.price,
      quantity: item.quantity,
    })),
  };

  try {
    const res = await fetch("http://localhost:8080/api/payment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, 
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
        if (cartItems.length > 0) {
          await clearCart();
        }
      navigate("/payment/qr", {
      state: {
  order: {                     // bọc trong "order"
    orderCode: data.orderCode,
    amount: finalTotal,        // dùng finalTotal từ frontend
    bankInfo: {
      ...data.bankInfo,
      transferContent: data.orderCode,  // fix double TOXI
    }
  }
}
      });
    } else {
       alert("Lỗi: " + (data.message || "Không xác định"));
    }
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Lỗi kết nối: " + err.message);
  }
};

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
           name="fullName"
  onChange={handleChange}
  value={form.fullName}
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
          name="phone"
  onChange={handleChange}
  value={form.phone}
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
        name="email"
  onChange={handleChange}
  value={form.email}
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
      <input
        type="text"
    name="province"
    value={form.province}
    onChange={handleChange}
          placeholder="Số nhà, tên đường, tòa nhà..."
          className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Quận / Huyện
        </span>
         <input
        type="text"
    name="district"
    value={form.district}
    onChange={handleChange}
          placeholder="Số nhà, tên đường, tòa nhà..."
          className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Phường / Xã
        </span>
          <input
        type="text"
    name="ward"
    value={form.ward}
    onChange={handleChange}
          placeholder="Số nhà, tên đường, tòa nhà..."
          className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
        />
      </label>
    </div>

    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Địa chỉ cụ thể
      </span>
      <input
      type="text"
  name="address"
  value={form.address}
  onChange={handleChange}
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

 <div className="p-6 max-h-[300px] overflow-y-auto space-y-4">
  {checkoutItems.length === 0 ? (
    <div className="text-sm text-slate-500">
      Chưa có sản phẩm nào để thanh toán.
    </div>
  ) : checkoutItems.map((item) => (
    <div key={item.cartItemId} className="flex gap-3">
      <div className="w-16 h-16 rounded-lg overflow-hidden border">
        <img
          src={item.imageUrl || "/placeholder.png"}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-semibold line-clamp-2">
          {item.title}
        </h4>

        <div className="flex justify-between mt-1">
          <span className="text-xs">
            Số lượng: {item.quantity}
          </span>

          <span className="text-sm font-medium">
            {(item.price * item.quantity).toLocaleString()}đ
          </span>
        </div>
      </div>
    </div>
  ))}
</div>
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
    <div className="flex justify-between text-sm">
  <span>Tạm tính</span>
  <span>{total.toLocaleString()}đ</span>
</div>

<div className="flex justify-between text-sm">
  <span>Phí vận chuyển</span>
  <span>{shipping.toLocaleString()}đ</span>
</div>

<div className="border-t my-4 pt-4 flex justify-between items-end">
  <span className="font-bold">Tổng cộng</span>

  <span className="text-2xl font-bold text-primary">
    {finalTotal.toLocaleString()}đ
  </span>
</div>

 <button
  onClick={handleSubmit}
  className="w-full bg-secondary hover:bg-secondary/90 font-bold py-4 rounded-xl mt-4"
>
  Thanh toán ngay
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
