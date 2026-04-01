import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
        const price = Number(
          course?.discountPrice && course.discountPrice < course.price
            ? course.discountPrice
            : course?.price || 0
        );

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
      (sum, item) => sum + getEffectiveItemPrice(item) * item.quantity,
      0
    );
  }, [checkoutItems]);

  const finalTotal = total + shipping;
  const primaryItem = checkoutItems[0] || null;
  const isCourseOrder =
    checkoutItems.length > 0 &&
    checkoutItems.every((item) => String(item.itemType || "").toUpperCase() === "COURSE");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (checkoutItems.length === 0) {
      alert("Chua co san pham nao de thanh toan");
      return;
    }

    if (!form.fullName || !form.phone || !form.email) {
      alert("Vui long nhap day du thong tin");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui long dang nhap lai");
      navigate("/login");
      return;
    }

    const decoded = JSON.parse(atob(token.split(".")[1]));
    if (decoded.exp * 1000 < Date.now()) {
      alert("Phien dang nhap het han, vui long dang nhap lai");
      localStorage.clear();
      navigate("/login");
      return;
    }

    const payload = {
      ...form,
      items: checkoutItems.map((item) => ({
        itemId: item.itemId,
        itemType: item.itemType,
        price: getEffectiveItemPrice(item),
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetch("http://localhost:8080/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        const orderMeta = {
          orderCode: data.orderCode,
          itemType: isCourseOrder ? "COURSE" : String(primaryItem?.itemType || "BOOK").toUpperCase(),
          itemTitle: primaryItem?.title || "San pham TOXI",
          itemImage: primaryItem?.imageUrl || "",
          quantity: checkoutItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
          items: checkoutItems.map((item) => ({
            itemId: item.itemId,
            itemType: String(item.itemType || "").toUpperCase(),
            title: item.title,
            imageUrl: item.imageUrl || "",
            quantity: Number(item.quantity || 1),
            price: getEffectiveItemPrice(item),
          })),
        };

        localStorage.setItem("paymentOrderMeta", JSON.stringify(orderMeta));

        if (cartItems.length > 0) {
          await clearCart();
        }

        navigate("/payment/qr", {
          state: {
            order: {
              orderCode: data.orderCode,
              amount: finalTotal,
              ...orderMeta,
              bankInfo: {
                ...data.bankInfo,
                transferContent: data.orderCode,
              },
            },
          },
        });
      } else {
        alert("Loi: " + (data.message || "Khong xac dinh"));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Loi ket noi: " + error.message);
    }
  };

  return (
    <>
      <StoreTopHeader />

      <main className="container mx-auto flex-grow px-4 py-8 lg:px-8">
        <nav className="mb-8 flex text-sm font-medium">
          <ol className="flex items-center gap-2">
            <li>
              <Link
                to="/cart"
                className="flex items-center gap-1 text-slate-500 transition-colors hover:text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                Gio hang
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[18px]">payment</span>
              Thanh toan
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-400">Hoan tat</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7 xl:col-span-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Thanh toan don hang
              </h2>
              <p className="text-slate-500">
                Hoan tat thong tin de bat dau hanh trinh chinh phuc tieng Trung.
              </p>
            </div>

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-surface-light shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-6 py-4">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
                    1
                  </span>
                  Thong tin giao hang
                </h3>

                <button type="button" className="text-sm font-medium text-primary hover:underline">
                  Dang nhap de tu dong dien
                </button>
              </div>

              <div className="space-y-5 p-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">
                      Ho va ten <span className="text-red-500">*</span>
                    </span>
                    <input
                      name="fullName"
                      onChange={handleChange}
                      value={form.fullName}
                      type="text"
                      placeholder="Nguyen Van A"
                      className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 focus:border-primary focus:ring-primary"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">
                      So dien thoai <span className="text-red-500">*</span>
                    </span>
                    <input
                      name="phone"
                      onChange={handleChange}
                      value={form.phone}
                      type="tel"
                      placeholder="0912 xxx xxx"
                      className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 focus:border-primary focus:ring-primary"
                    />
                  </label>
                </div>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Email nhan tai lieu <span className="text-red-500">*</span>
                  </span>
                  <input
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                    type="email"
                    placeholder="example@email.com"
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 focus:border-primary focus:ring-primary"
                  />
                </label>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">Tinh / Thanh pho</span>
                    <input
                      type="text"
                      name="province"
                      value={form.province}
                      onChange={handleChange}
                      placeholder="Tinh / Thanh pho"
                      className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 focus:border-primary focus:ring-primary"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">Quan / Huyen</span>
                    <input
                      type="text"
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      placeholder="Quan / Huyen"
                      className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 focus:border-primary focus:ring-primary"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">Phuong / Xa</span>
                    <input
                      type="text"
                      name="ward"
                      value={form.ward}
                      onChange={handleChange}
                      placeholder="Phuong / Xa"
                      className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 focus:border-primary focus:ring-primary"
                    />
                  </label>
                </div>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">Dia chi cu the</span>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="So nha, ten duong, toa nha..."
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 focus:border-primary focus:ring-primary"
                  />
                </label>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    id="save-info"
                    type="checkbox"
                    className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="save-info" className="cursor-pointer select-none text-sm text-slate-600">
                    Luu thong tin cho lan thanh toan sau
                  </label>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-24 lg:col-span-5 xl:col-span-4">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-surface-light shadow-lg">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h3 className="text-lg font-bold text-slate-900">Tom tat don hang</h3>
              </div>

              <div className="max-h-[300px] space-y-4 overflow-y-auto p-6">
                {checkoutItems.length === 0 ? (
                  <div className="text-sm text-slate-500">Chua co san pham nao de thanh toan.</div>
                ) : (
                  checkoutItems.map((item) => (
                    <div key={item.cartItemId} className="flex gap-3">
                      <div className="h-16 w-16 overflow-hidden rounded-lg border">
                        <img
                          src={item.imageUrl || "/placeholder.png"}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="line-clamp-2 text-sm font-semibold">{item.title}</h4>
                        <div className="mt-1 flex justify-between">
                          <span className="text-xs">So luong: {item.quantity}</span>
                          <span className="text-sm font-medium">
                            {(getEffectiveItemPrice(item) * item.quantity).toLocaleString()}d
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-y border-slate-200 bg-slate-50/50 px-6 py-4">
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Ma giam gia / Voucher
                </label>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <span className="material-symbols-outlined text-[20px]">sell</span>
                    </span>
                    <input
                      type="text"
                      placeholder="Nhap ma TOXI..."
                      className="h-10 w-full rounded-lg border-slate-300 bg-white pl-9 text-sm uppercase placeholder:normal-case focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <button className="h-10 rounded-lg bg-slate-200 px-4 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300">
                    Ap dung
                  </button>
                </div>
              </div>

              <div className="space-y-3 p-6">
                <div className="flex justify-between text-sm">
                  <span>Tam tinh</span>
                  <span>{total.toLocaleString()}d</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Phi van chuyen</span>
                  <span>{shipping.toLocaleString()}d</span>
                </div>

                <div className="my-4 flex items-end justify-between border-t pt-4">
                  <span className="font-bold">Tong cong</span>
                  <span className="text-2xl font-bold text-primary">
                    {finalTotal.toLocaleString()}d
                  </span>
                </div>

                <button
                  onClick={handleSubmit}
                  className="mt-4 w-full rounded-xl bg-secondary py-4 font-bold hover:bg-secondary/90"
                >
                  Thanh toan ngay
                </button>

                <div className="flex items-center justify-center gap-2 pt-4 text-xs text-slate-400">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  <span>Bao mat SSL 256-bit</span>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 border border-blue-100 bg-blue-50 p-4">
                <span className="material-symbols-outlined mt-0.5 text-xl text-primary">
                  headset_mic
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Can ho tro?</p>
                  <p className="mt-1 text-xs text-slate-600">
                    Lien he hotline <strong>1900 xxxx</strong> hoac chat truc tiep de duoc tu
                    van ve don hang.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
