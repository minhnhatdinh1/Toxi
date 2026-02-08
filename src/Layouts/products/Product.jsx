import react from 'react';
import logo from '../../assets/image/LOGO (1).png';
import toxiLogo from "../../assets/image/LOGO (1).png";
import { Link, useNavigate } from "react-router-dom";

export default function Product() {
    return (
        <>
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-chinese-pattern overflow-x-hidden">
      {/* Header */}
       <div className="w-full bg-white dark:bg-surface-dark shadow-sm z-50 sticky top-0">
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

        {/* Avatar */}
<div className="hidden sm:flex items-center">
  <div
    className="bg-center bg-no-repeat bg-cover rounded-full size-9 border-2 border-white shadow-sm cursor-pointer"
    style={{
      backgroundImage:
        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANadJSyOfDTclENxTAo2sw3Zjh7pnp9KKg6h2O4DPIjBYyTW71cyBejL6epjf4bncopuLtFsS_S28mcoEHv7h1zzA9eQlltIXtwDZfsYjCeMxjDdAPnQkvKLCnuYjrECMphza2dJScBgPHRGqoIUccTQUhZWLevuqN5gbt-Gdi0v_35rRW79Z__1-tjeWPfsTpAYBzqjrPwvrzKlKTY8K7uLo1-SOwA3-7T7eW-upJSD1KOVr7iIff5utR8-CjWJTlAFJYfsztm9s")',
    }}
  />
</div>

          {/* MOBILE MENU */}
          <button className="md:hidden text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
      </div>
<div className="w-full bg-[#f8fcfb] relative chinese-pattern-bg">
<div className="layout-container flex flex-col items-center py-10 px-4 md:px-10 lg:px-40">
<div className="layout-content-container flex flex-col w-full max-w-7xl">
<div className="@container">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-[#e7f3f0]">
<div className="flex flex-col gap-4 md:gap-6 text-left order-2 md:order-1">
<div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-teal-800 uppercase tracking-wide">
<span className="material-symbols-outlined text-sm">local_fire_department</span>
                                    Best Seller
                                </div>
<h1 className="text-text-main text-3xl md:text-5xl font-black leading-tight tracking-tight">
                                    Học để ứng dụng <br/>
<span className="text-primary text-4xl md:text-6xl font-serif italic">学以致用</span>
</h1>
<p className="text-text-muted text-base md:text-lg max-w-md">
                                    Khám phá kho tàng sách, giáo trình và công cụ hỗ trợ học tiếng Trung chất lượng cao giúp bạn chinh phục ngôn ngữ nhanh chóng.
                                </p>
<div className="flex gap-4 pt-2">
<button className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-text-invert font-bold shadow-md hover:bg-primary/90 transition-all hover:shadow-lg hover:-translate-y-0.5">
                                        Khám phá ngay
                                    </button>
<button className="flex items-center justify-center rounded-lg h-12 px-6 bg-white border border-[#e7f3f0] text-text-main text-base font-medium hover:bg-[#f8fcfb] transition-all">
                                        Tìm hiểu thêm
                                    </button>
</div>
</div>
<div className="order-1 md:order-2 flex justify-center relative">
<div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl transform scale-75"></div>
<img className="relative z-10 w-full max-w-sm rounded-xl shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500 object-cover aspect-[4/3]" data-alt="Stack of Chinese learning books with a cup of tea on a table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtDgZmJTafnXR_oIqQ4kS5WawboHOzNdZ46WB1EWDj1SvItkdCx5PEIwrV9US_By5F0DwtRTIoB3M-mpG06FLANkuNPRnokuWCKuPLYTiDQIWTR9igUBvrhJC1KIEo8gMTEDboOsAdMjFb6beBNlyDDQzRESoyQ5AjoYwyrlvQxU1nNZbi0im48X2DVp858-SOUk4EmFx2XeGoWQj1xyXQJMF2yyfOlhZEGx58wRXvoE-XNkX4jo_W6sJPFAlrCM3V92pczNBzZ3E"/>
</div>
</div>
</div>
</div>
</div>
</div>
  <div className="bg-surface text-slate-900 antialiased overflow-x-hidden">
      <div className="flex flex-col lg:flex-row ">
        {/* SIDEBAR */}
     <div className="bg-primary text-white flex flex-col z-50 shadow-2xl overflow-y-auto lg:border-r-4 border-secondary/20">
          {/* Logo */}
          <div className="p-4 flex flex-col items-center border-b border-white/10 relative">
            <div className="h-16 w-16 rounded-2xl  text-primary flex items-center ">
              <img src={toxiLogo} alt="TOXI Logo" className=" object-contain" />
            </div>

            <h1 className="text-3xl font-black tracking-tighter text-white">
              TOXI
            </h1>

            <div className="flex items-center gap-2 mt-1">
              <div className="h-[1px] w-4 bg-secondary"></div>
              <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">
                Education
              </p>
              <div className="h-[1px] w-4 bg-secondary"></div>
            </div>
          </div>

          {/* NAV */}
       <nav className="flex-1 px-4 py-6 space-y-2">
  {/* TRANG CHỦ */}
  <a
    href="/Home"
    className="group flex items-center gap-3 px-4 py-4 rounded-xl text-white bg-white/10 shadow-lg border border-secondary/30 transition-all"
  >
    <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">
      home_app_logo
    </span>
    <span className="font-bold">Trang chủ</span>
  </a>

  {[
    { icon: "self_improvement", label: "Khóa học", to: "/course" },
    { icon: "school", label: "Sản phẩm", to: "/store" },
    { icon: "storefront", label: "Tiếng Trung cơ bản", to: "/basic" },
    { icon: "auto_stories", label: "Tiếng Trung Nâng cao", to: "/advanced" },
  ].map((item) => (
    <Link
      key={item.label}
      to={item.to}
      className="group w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-all border border-transparent hover:border-secondary/30 text-left bg-transparent"
    >
      <span className="material-symbols-outlined text-secondary/70 group-hover:text-secondary group-hover:scale-110 transition-transform">
        {item.icon}
      </span>
      <span className="font-medium">{item.label}</span>
    </Link>
  ))}

  {/* QUICK LINKS */}
{/* QUICK LINKS */}
<div className="mt-4 pt-4 border-t border-white/10">
  <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
    Danh mục nhanh
  </p>

  {[
    { icon: "article", label: "Blog", to: "/blog" },
    { icon: "quiz", label: "Luyện thi HSK", to: "/Practice" },
    { icon: "chat", label: "Giao tiếp", to: "/giaotiep" },
  ].map((item) => (
    <Link
      key={item.label}
      to={item.to}
      className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-all border border-transparent hover:border-secondary/30"
    >
      <span className="material-symbols-outlined text-secondary/70 group-hover:text-secondary group-hover:scale-110 transition-transform">
        {item.icon}
      </span>
      <span className="font-medium">{item.label}</span>
    </Link>
  ))}
</div>
</nav>

        </div>
        <div className="px-8 mb-8">
  <div className="bg-white border border-gray-200 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-6 shadow-sm">
    {/* Filters */}
    <div className="flex flex-wrap items-center gap-4">
      {/* Loại sản phẩm */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] uppercase font-bold text-text-muted px-2">
          Loại sản phẩm
        </label>
        <select className="border-none bg-gray-50 rounded-lg text-sm font-semibold focus:ring-0 cursor-pointer min-w-[160px]">
          <option>Tất cả sản phẩm</option>
          <option>Sách giáo trình</option>
          <option>Flashcards</option>
          <option>Vở tập viết</option>
        </select>
      </div>

      <div className="h-10 w-[1px] bg-gray-200" />

      {/* Khoảng giá */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] uppercase font-bold text-text-muted px-2">
          Khoảng giá
        </label>
        <select className="border-none bg-gray-50 rounded-lg text-sm font-semibold focus:ring-0 cursor-pointer min-w-[160px]">
          <option>Mọi mức giá</option>
          <option>Dưới 100.000đ</option>
          <option>100k - 500k</option>
          <option>Trên 500.000đ</option>
        </select>
      </div>

      <div className="h-10 w-[1px] bg-gray-200" />

      {/* Chủ đề */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] uppercase font-bold text-text-muted px-2">
          Chủ đề
        </label>
        <select className="border-none bg-gray-50 rounded-lg text-sm font-semibold focus:ring-0 cursor-pointer min-w-[160px]">
          <option>Mọi chủ đề</option>
          <option>Luyện thi HSK</option>
          <option>Giao tiếp</option>
          <option>Kinh doanh</option>
        </select>
      </div>
    </div>

    {/* Sort */}
    <div className="flex items-center gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] uppercase font-bold text-text-muted px-2">
          Sắp xếp
        </label>
        <select className="border-none bg-gray-100 rounded-lg text-sm font-bold text-primary focus:ring-0 cursor-pointer">
          <option>Mới nhất</option>
          <option>Giá: Thấp đến Cao</option>
          <option>Giá: Cao đến Thấp</option>
          <option>Bán chạy nhất</option>
        </select>
      </div>
    </div>
    
  </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    {/* Product 1 */}
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLkssygY9e0zKKPqzgmtAUinbqDyua7hM76rZrRyFQaAwCoj-MQBfMIeEhp9c0RF9qlGkrIR5ifwZteusWIaKl1wqxpk626w1UBLqq8OsbSdTZdTcKjyyk2s8nnkFeCALnTkTpXlOjhHC1kuAxg8-_iZnEwyhWaM9YfeswJlrlWrf0YDmO3Mqbqts5B7pM9fRy99wr154lPi57aTrDi4Z51Vl0XFUrtLlVdkfOGBQIycEoc31s-h8bi-803bShoKwF-iR4rsrUaI0"
          alt="Product"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-lg">
          -20%
        </div>

        <button className="absolute bottom-4 right-4 size-10 rounded-full bg-white text-primary shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <span className="material-symbols-outlined">shopping_cart</span>
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-[10px] uppercase font-bold text-accent mb-1">
          Giáo trình
        </span>

        <h3 className="font-bold text-text-main group-hover:text-primary transition-colors line-clamp-2 mb-3">
          Giáo trình Hán ngữ Quyển 1 (Phiên bản mới)
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-black text-primary leading-none">
              120.000₫
            </span>
            <span className="text-xs text-gray-400 line-through">
              150.000₫
            </span>
          </div>

          <button className="p-2 rounded-lg bg-gray-50 text-primary border border-gray-100 hover:bg-primary hover:text-white transition-colors">
            <span className="material-symbols-outlined text-sm">
              visibility
            </span>
          </button>
        </div>
      </div>
    </div>

    {/* Product 2 */}
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuASxsccenr1DGjHq6xhB-urABDYrEuf9RCAHKzoawaJL_xNDwNzTBMskvRkBJ6Oh-MnfC6KCr1GxDAto8mU7TaZcfx31ijxje631C5GmdIEz7k7Y9mt1FogQ__us_9ezaug_CXDna-8iFfx2BIKwSLRXXPnd_tweb1Sb5bVMGWnxiEVibicCVfZOkGKmXGvjYz_J091Okjej7ptwM8NdLgCaC3ZeGdYaVbcxbLFDiQiO1Qqx9QnrYKzUBY3H8LVb6pTUNrXWMn9Yxg"
          alt="Product"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-lg">
          Mới
        </div>

        <button className="absolute bottom-4 right-4 size-10 rounded-full bg-white text-primary shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <span className="material-symbols-outlined">shopping_cart</span>
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-[10px] uppercase font-bold text-accent mb-1">
          Flashcards
        </span>

        <h3 className="font-bold text-text-main group-hover:text-primary transition-colors line-clamp-2 mb-3">
          Flashcard 3000 từ vựng HSK 1-6
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-black text-primary">
            250.000₫
          </span>

          <button className="p-2 rounded-lg bg-gray-50 text-primary border border-gray-100 hover:bg-primary hover:text-white transition-colors">
            <span className="material-symbols-outlined text-sm">
              visibility
            </span>
          </button>
        </div>
      </div>
    </div>

    {/* Product 3 */}
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxXQEh3uENc7Ow34GwuF8gN9R4erGSWyIOYcbkVeGCidIOkafnILrWOMGcleN8OfOirRkwE3EM0donlNS6ZFLtO91nT4KPK9lWIcB9yNVI3F7uoZ6CerSMzLYNsF0YKKaDCQJViQLUNv0H_zQBAqSXETBqNcMovlooiCJXAhi8Z6a7G1t0yH-Yjvlms4Fh0j-skFw9ZFt3ExpPZvcZAB-00AfBcvSceBSx_mICZrpVTueKsEZzSDgOCeg55DTwyD2YYgkH-H5cPCc"
          alt="Product"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <button className="absolute bottom-4 right-4 size-10 rounded-full bg-white text-primary shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <span className="material-symbols-outlined">shopping_cart</span>
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-[10px] uppercase font-bold text-accent mb-1">
          Dụng cụ
        </span>

        <h3 className="font-bold text-text-main group-hover:text-primary transition-colors line-clamp-2 mb-3">
          Bộ tập viết thư pháp căn bản
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-black text-primary">
            350.000₫
          </span>

          <button className="p-2 rounded-lg bg-gray-50 text-primary border border-gray-100 hover:bg-primary hover:text-white transition-colors">
            <span className="material-symbols-outlined text-sm">
              visibility
            </span>
          </button>
        </div>
      </div>
    </div>

  </div>
  
</div>

        </div>
        
        
        </div>
        
        </div>
        
        </>
    )
};