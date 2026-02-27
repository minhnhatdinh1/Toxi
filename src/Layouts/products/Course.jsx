import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [sortType, setSortType] = useState("newest");
  const [loading, setLoading] = useState(true);

  const formatCurrency = (number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number || 0);
  };
  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch courses error:", err);
        setLoading(false);
      });
  }, []);

  const sortedCourses = [...courses].sort((a, b) => {
    if (sortType === "price-low-to-high") return a.price - b.price;
    if (sortType === "price-high-to-low") return b.price - a.price;
    return b.courseId - a.courseId; // newest
  });

  return (
    <>
      <main className="flex-1 lg:ml-72 bg-surface relative">
        {/* HEADER */}

        {/* HERO */}
        <section className="relative h-64 md:h-80 w-full bg-primary overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwsBsZIsyCmtSVufrnW8IQ3OcNeGQO6uv5_S2x_YweK8CwOgxS_j8F_1UlAP1CKu-MJ4a6fHrmJFtzUUcb_X4KSq8qWpLna00jvHLg7DEjci3_9aaWB-JPpLO0hbOLKlLYbtXWV_1gq2dYp2AdtNDqJHNF-j2XA-3y-JFm721_M16loDAuswddRMrVB91_VS9Tc0bFgo4Ft74lY4nteoQG2dIzPct6KXEEJ9A_vnNS8l55l5dzg3f46GB6CxSZ1N3nNlKt4Oc23S0')",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
          <div className="absolute inset-0 bg-chinese-pattern opacity-10"></div>

          <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none opacity-20 flex items-center justify-end pr-10">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhvprHGL6K93pHFVHLPVSFyKTZaBgwoiNwoZ6rufaP3po7sqtplcZ0ZwYV2GwP_0zun0jre0uIAbdySGtu4jG-uSCgC3yAEj_a49Fjunnm7lnluUwzOxT5LJN2DlK-mV7HEw8F0s7lXu7lzThvMEwBhVv1qGxDMQ0k589zZgj_A5-D1zb3exuWfXZ6VvlypTc_EcokCIn_ffDJPT0UKVdGasZVPsKRp-8BZ6p0Ng55-0HMo1e1E5gT-rBRAduNNVBO0Z1AhRqdGH8"
              alt="Chinese clouds"
              className="h-full object-contain invert"
            />
          </div>

          <div className="relative h-full flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              KHÓA HỌC <span className="text-secondary">HSK</span>
            </h2>

            <div className="flex items-center gap-4 text-slate-200">
              <p className="text-lg font-light max-w-lg leading-relaxed">
                Chinh phục chứng chỉ tiếng Trung quốc tế với lộ trình bài bản,
                tinh gọn và hiệu quả nhất.
              </p>
            </div>

            <div className="absolute bottom-6 right-10 flex gap-4 opacity-30">
              <span className="text-secondary font-serif text-6xl">學</span>
              <span className="text-secondary font-serif text-6xl">習</span>
            </div>
          </div>
        </section>
        {/* FILTER / BREADCRUMB */}
        <section className="bg-white border-b border-primary/10 px-6 py-4">
          <div className=" mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <a href="#" className="hover:text-primary transition-colors">
                Trang chủ
              </a>
              <span className="material-symbols-outlined text-[14px]">
                chevron_right
              </span>
              <a href="#" className="hover:text-primary transition-colors">
                Khóa học
              </a>
              <span className="material-symbols-outlined text-[14px]">
                chevron_right
              </span>
              <span className="text-primary font-bold">HSK</span>
            </nav>

            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <div className="text-sm text-slate-500">
                Hiển thị{" "}
                <span className="font-bold text-primary">{courses.length}</span>{" "}
                khóa học
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Sắp xếp:
                </label>
                <select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="bg-surface border border-primary/10 rounded-lg text-sm px-3 py-1.5 focus:ring-primary focus:border-primary text-slate-700 font-medium"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-low-to-high">Giá: Thấp đến cao</option>
                  <option value="price-high-to-low">Giá: Cao đến thấp</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* COURSE GRID */}
        <section className="py-12 px-6 md:px-12">
          {loading ? (
            <div className="text-center text-primary font-bold">
              Đang tải khóa học...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sortedCourses.map((course) => (
                <div
                  key={course.courseId}
                  className=" chinese-border bg-white shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col border h-full border border-slate-100 rounded-xl"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={
                        course.thumbnailUrl ||
                        "https://wisebusiness.vn/wp-content/uploads/2024/08/tao-hinh-anh-bang-ai-66c7f51ab6da5.webp"
                      }
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />

                    {/* LEVEL BADGE */}
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {course.level || "HSK"}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-primary transition">
                      {course.title}
                    </h3>
                      <h4 className="text-sm text-slate-500 mb-2">{course.description}</h4>
                    <div className="text-xs text-slate-400 mb-3">
                      {course.courseType}
                    </div>

                    <div className="mt-auto"> 
                      
                      {/* PRICE */}
                      {course.discountPrice &&
                      course.discountPrice < course.price ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-black text-red-600">
                            {formatCurrency(course.discountPrice)}
                          </span>
                          <span className="text-sm text-slate-400 line-through">
                            {formatCurrency(course.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xl font-black text-secondary">
                          {formatCurrency(course.price)}
                        </span>
                      )}

                      {/* BUTTONS */}
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <Link
                          to={`/courses/${course.courseId}`}
                          className="py-2 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 flex justify-center"
                        >
                          Chi tiết
                        </Link>

                        <Link
                          to={`/checkout/${course.courseId}`}
                          className="py-2 text-xs font-bold bg-secondary  transition-colors text-primary rounded-lg hover:bg-yellow-400 flex justify-center"
                        >
                          Đăng ký
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
