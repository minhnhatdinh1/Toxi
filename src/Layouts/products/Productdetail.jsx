import react from 'react'
import { useParams, Link } from 'react-router-dom'
import logo from '../../assets/image/LOGO (1).png'
import { useNavigate } from "react-router-dom";
const productsData = [
  {
    id: 1,
    name: "Vở tập viết Thượng Hải",
    price: "89.000đ",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbkVSFExNteE9CGGXL4Qv8mk3Gt2EkENVuguiwfR2-T3GqYfUywrHFjc0RbL0juSTVR_ajo2oxbi9kreWP7qevea_-wD6AIC6d9Olp-8l2L53EJMwT0SVmAlAlrHTfeMO1IEa0d-MDfprIGo-0tMBWdsmgxrXQ88bXPgmzEiHg9Yj-cjf-HicH8czfkj0tRY8SfJq4y4LzurOHyh5nSDXAMbyIkwa8nL6bcZN0ao5v-juwqPnwuyaKfXjKCk1LENhUYPOpKg0S3Qk",
    badge: null
  },
  {
    id: 2,
    name: "Flashcard HSK 1-3",
    price: "250.000đ",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfeAdxPhgksrY8QFJ91EbYKlV9XXR2QamdXeEVsRakGCtbRskwOI2HO_kz8NPpRGVYESEgKuqTTa4-XczvNtRXaUWCjwN5FQEi7uPd6DU6kaJmRLgT0DiWNbgKOxl8kSAYSn2NrPqfGXBBdUVgoXHrTsjsfg6XgtVVFT14WdrNWWPPGeLvF1oQGXrP55PYQxLu5wRYzlHWNukZnIDCAoUxxfIsYVTGQW386LQtSZrjXVFP7hrwfy2EWORQQHW6ulcHTPdO9rJjStg",
    badge: null
  },
  {
    id: 3,
    name: "Giáo trình Hán ngữ Q1",
    price: "115.000đ",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb82Zl7_ZBUA4rQzh4vB3sSP9JJO06Rt2JATxjYWCrL_foyOJa5aXMMOrx-GJXj5tdiUqwz1VxxTuobg5iGAmC6f7YJU7T9voeVQuDTubrjH5mnlEtGifQVUhSqm4_dSMchhJBGoL8JT6a4Bpj10H-oQhPjIuELIUoI_-rjgxfvqIVzE5w5a9zmOAirMRZ1YU0msADojGz8NUnBZCb3JjgKZB9GzH77twiaE8DLzS8O_clnlLHmJgm2EXRXMQWPoA22Mvsj6tLVOw",
    badge: null
  },
  {
    id: 4,
    name: "Bộ bút lông thư pháp",
    price: "145.000đ",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh8Xr_PUz4IDYThA1TyDnkPT4BmJKLwhscu7FK-ySx4Kt2TTbRDod_9E_gpQ46epTfzi1k6QCNtXpm_ahEwyA8av66aj2PZ_nvmllqqP7fBMiosCgY5nUIq1E66J5bxV9mbxX_oOeoA46M-u2VXCLiaU6SRGbBTIPpgRz27skgwzo8h4rIMba5I_0GsL1fD4hSca5kIpGHkCuRnaGo0czuNYYQXQM3SzLiz0bomvuH4ZyFRuMvo26QM7rW4AOdgNearO3Cqofys3c",
    badge: "Best Seller"
  }
]
 const images = [
    "https://picsum.photos/600/800?random=1",
    "https://picsum.photos/600/800?random=2",
    "https://picsum.photos/600/800?random=3",
    "https://picsum.photos/600/800?random=4",
  ];

export default function Productdetail() {
    const { id } = useParams()
    const products = productsData
    const product = products.find(p => p.id === parseInt(id))
      const navigate = useNavigate();
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
     <main className="min-h-screen">
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <a
              href="/Home"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-lg">home</span>
              Trang chủ
            </a>
            <span className="material-symbols-outlined text-xs">
              arrow_forward_ios
            </span>
            <a href="#" className="hover:text-primary transition-colors">
              TOXI Store
            </a>
            <span className="material-symbols-outlined text-xs">
              arrow_forward_ios
            </span>
            <span className="text-primary font-bold">
              {product?.name || "Sản phẩm"}
            </span>
          </nav>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* IMAGE */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center group overflow-hidden">
              <div className="chinese-border w-full">
                <img
                  src={product?.image}
                  alt="Product Main"
                  className="w-full h-auto aspect-square object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* THUMBNAILS */}
          <div className="grid grid-cols-4 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveImage(img)}
            className="border border-slate-200 rounded-xl p-1 aspect-square overflow-hidden hover:border-secondary transition-colors"
          >
            <img
              src={img}
              alt={`Thumb ${i + 1}`}
              className="w-full h-full object-cover rounded-md block"
            />
          </button>
        ))}
      </div>
    </div>

          {/* INFO */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="inline-flex items-center gap-2 mb-4 bg-accent-red/10 border border-accent-red/20 text-accent-red px-3 py-1 rounded-full w-fit">
              <span className="material-symbols-outlined text-sm">stars</span>
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Sản phẩm bán chạy
              </span>
            </div>

            <h2 className="text-4xl font-black text-primary mb-2 leading-tight">
              {product?.name}
            </h2>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-secondary fill-1"
                  >
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined text-secondary fill-1">
                  star_half
                </span>
                <span className="ml-2 text-sm font-bold text-slate-700">
                  4.8 (124 đánh giá)
                </span>
              </div>

              <div className="h-4 w-px bg-slate-300"></div>
              <p className="text-sm text-slate-500 font-medium">
                Đã bán 1.250 sản phẩm
              </p>
            </div>

            {/* PRICE */}
            <div className="bg-white p-8 rounded-2xl mb-8 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-black text-primary">
                  {product?.price}
                </span>
                <span className="text-xl text-slate-400 line-through">
                  1.890.000đ
                </span>
                <span className="bg-accent-red text-white text-xs font-bold px-2 py-1 rounded">
                  -25%
                </span>
              </div>
              <p className="text-accent-red text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  timer
                </span>
                Tiết kiệm 440.000đ khi mua hôm nay
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                Mô tả ngắn
              </h4>
              <p className="text-slate-600 leading-relaxed text-lg italic">
                "Sự kết hợp hoàn hảo giữa kỹ thuật thủ công truyền thống và chất
                liệu cao cấp, mang đến trải nghiệm viết thư pháp mượt mà, định
                hình phong cách riêng cho người học tiếng Trung."
              </p>
            </div>
            <div className="space-y-8 mb-10">
<div className="flex items-center gap-6">
<span className="text-sm font-bold text-slate-900 w-24">Số lượng:</span>
<div className="flex items-center border-2 border-slate-200 rounded-xl bg-white overflow-hidden">
<button className="px-5 py-3 hover:bg-slate-50 text-xl font-bold transition-colors">-</button>
<input className="w-16 text-center border-none focus:ring-0 font-black text-primary text-xl" type="number" value="1"/>
<button className="px-5 py-3 hover:bg-slate-50 text-xl font-bold transition-colors">+</button>
</div>
</div>
</div>
<div className="flex flex-col sm:flex-row gap-5">
  <button className="flex-[1.5] px-8 py-5 bg-primary text-secondary font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 group">
    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
      shopping_cart
    </span>
    <span className="text-lg">Thêm vào giỏ hàng</span>
  </button>

  <button className="flex-1 px-8 py-5 bg-secondary text-primary font-bold rounded-2xl shadow-xl shadow-secondary/20 hover:bg-secondary-dark transition-all flex items-center justify-center text-lg">
    Mua ngay
  </button>
</div>

<div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
      <span className="material-symbols-outlined text-green-600">
        verified
      </span>
    </div>
    <span className="text-xs font-bold text-slate-600">
      Hàng chính hãng TOXI
    </span>
  </div>

  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
      <span className="material-symbols-outlined text-blue-600">
        local_shipping
      </span>
    </div>
    <span className="text-xs font-bold text-slate-600">
      Giao nhanh toàn quốc
    </span>
  </div>

  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
      <span className="material-symbols-outlined text-orange-600">
        history
      </span>
    </div>
    <span className="text-xs font-bold text-slate-600">
      Đổi trả 7 ngày
    </span>
  </div>
</div>
          </div>
        </div>
        <div className="mt-20">
  {/* Tabs */}
  <div className="bg-white rounded-t-2xl px-6 py-4 border-b border-slate-200 mb-10">
    <div className="flex items-center gap-2">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors">
        <span className="material-symbols-outlined text-[16px]">
          description
        </span>
        Mô tả sản phẩm
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-500 hover:text-primary text-sm font-medium uppercase tracking-widest whitespace-nowrap transition-colors">
        <span className="material-symbols-outlined text-[16px]">
          settings
        </span>
        Thông số kỹ thuật
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-500 hover:text-primary text-sm font-medium uppercase tracking-widest whitespace-nowrap transition-colors">
        <span className="material-symbols-outlined text-[16px]">
          star
        </span>
        Đánh giá học viên (124)
      </button>
    </div>
  </div>

  <div className="grid lg:grid-cols-3 gap-16">
    {/* LEFT CONTENT */}
    <div className="lg:col-span-2 space-y-8 text-slate-600 leading-relaxed">
      <h4 className="text-2xl font-bold text-primary">
        Khám phá tinh hoa văn hóa qua từng nét chữ
      </h4>

      <p className="text-lg">
        Bộ bút lông "Cửu Phẩm" được TOXI tuyển chọn gắt gao từ các xưởng thủ công
        mỹ nghệ danh tiếng tại Chiết Giang, Trung Quốc. Mỗi cây bút không chỉ là
        một dụng cụ viết, mà còn là một tác phẩm nghệ thuật mang đậm hơi thở cổ
        xưa.
      </p>

      <div className="bg-white p-8 rounded-3xl border border-secondary/20 shadow-sm relative overflow-hidden group">
        <div className="absolute -right-12 -bottom-12 text-secondary/10 font-serif text-[180px] select-none group-hover:scale-110 transition-transform">
          艺
        </div>

        <ul className="space-y-6 relative z-10">
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-secondary bg-primary/5 p-1 rounded-lg">
              check_circle
            </span>
            <span>
              <strong className="text-primary">Chất liệu tuyển chọn:</strong>{" "}
              Lông sói và lông cừu tự nhiên có độ đàn hồi và khả năng ngậm mực vượt trội.
            </span>
          </li>

          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-secondary bg-primary/5 p-1 rounded-lg">
              check_circle
            </span>
            <span>
              <strong className="text-primary">Thân bút tre già:</strong>{" "}
              Được đánh bóng và xử lý chống ẩm mốc, tạo cảm giác cầm nắm đầm tay.
            </span>
          </li>

          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-secondary bg-primary/5 p-1 rounded-lg">
              check_circle
            </span>
            <span>
              <strong className="text-primary">Hộp lót lụa cao cấp:</strong>{" "}
              Phù hợp trưng bày hoặc làm quà tặng.
            </span>
          </li>
        </ul>
      </div>

      <p className="text-lg">
        Dành cho cả người mới bắt đầu lẫn các bậc thầy, bộ bút giúp bạn kiểm soát
        lực tay tốt hơn, từ đó tạo ra những nét chữ{" "}
        <span className="text-primary font-bold">学以致用</span> thanh thoát.
      </p>

      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb82Zl7_ZBUA4rQzh4vB3sSP9JJO06Rt2JATxjYWCrL_foyOJa5aXMMOrx-GJXj5tdiUqwz1VxxTuobg5iGAmC6f7YJU7T9voeVQuDTubrjH5mnlEtGifQVUhSqm4_dSMchhJBGoL8JT6a4Bpj10H-oQhPjIuELIUoI_-rjgxfvqIVzE5w5a9zmOAirMRZ1YU0msADojGz8NUnBZCb3JjgKZB9GzH77twiaE8DLzS8O_clnlLHmJgm2EXRXMQWPoA22Mvsj6tLVOw"
        alt="Lifestyle"
        className="w-full rounded-3xl shadow-lg"
      />
    </div>

    {/* RIGHT SIDEBAR */}
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl h-fit sticky top-32">
        <h4 className="font-bold text-primary mb-6 border-b border-slate-100 pb-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary">info</span>
          Thông tin chi tiết
        </h4>

        <dl className="space-y-5 text-sm">
          {[
            ["Chất liệu lông", "Lông sói, Lông cừu"],
            ["Thân bút", "Tre sơn mài"],
            ["Xuất xứ", "Chiết Giang, Trung Quốc"],
            ["Số lượng", "9 cây/bộ"],
            ["Trọng lượng", "650g (cả hộp)"],
            ["Kích thước hộp", "38cm x 18cm"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between border-b border-dashed border-slate-100 pb-3 last:border-none"
            >
              <dt className="text-slate-500">{label}</dt>
              <dd className="font-bold text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 bg-gold-light/20 p-5 rounded-2xl border border-secondary/30">
          <p className="text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-primary block mb-1">
              Lưu ý sử dụng:
            </span>
            Lần đầu dùng nên ngâm đầu bút trong nước ấm 10 phút. Luôn treo bút sau
            khi rửa sạch để giữ form dáng.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
  <section className="bg-white py-20 border-t border-slate-100">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-primary">
              Sản phẩm liên quan
            </h2>
            <div className="h-1 w-20 bg-secondary rounded-full"></div>
          </div>

          <a
            href="#"
            className="text-sm font-bold text-primary hover:text-accent-red flex items-center gap-1 transition-colors group"
          >
            Xem tất cả cửa hàng
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-2xl bg-slate-100 overflow-hidden mb-5 relative shadow-sm border border-slate-200">
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-accent-red text-white text-[11px] font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                    {product.badge}
                  </div>
                )}

                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>

                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-primary p-4 rounded-full shadow-2xl hover:bg-secondary transition-colors">
                    <span className="material-symbols-outlined">
                      shopping_cart
                    </span>
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 mb-2 truncate group-hover:text-primary transition-colors text-lg">
                {product.name}
              </h3>
              <p className="text-accent-red font-black text-xl">
                {product.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
      </div>
    </main>

       </>
    )
};