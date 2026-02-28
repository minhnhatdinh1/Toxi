import react from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Blog() {
      // ===== 1. STATE =====
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 3; // số bài mỗi trang


  // ===== 2. DATA =====

  const posts = [
    {
    id: 1,
    title: "Nghệ thuật trà đạo Trung Hoa: Tinh hoa truyền thống",
    category: "Culture",
    date: "20 Tháng 10, 2023",
    author: "Nguyễn Văn A",
    authorRole: "Chuyên gia văn hóa",
    authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBc1GK_FWBfb_0zTJ-AP1IPbRmcBRO7on-n4fSkUetOcyUZtwocw0NuJhENzO46-I964WTIT9Sw63TIyLwi1ysbOXM1b5ZWL9KTggErP-OQzf8zCqw5ycVOuzSPjJ-AWd8ZLApx_SMmUW9sR0AB17EmCjtMLGaF2m2rwKchH8OhYue6JW5K7JHaLwqjnQbf9FRqW8Frv1gtqLYUDCShS6OF1XZnxHdvpEX05l8ch_huF4q0XIhU1iIPFJf3C3V6hwODR4yhxkAbCxQ",
    readTime: "6 phút đọc",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmQzIx-gqDWKbF3hBR5Tou2hyKZoWc6lBf5-vYanuncuCYTuPZoh62ZP-vHAONMdjbqmGxFLnreocoOtQdKym27pBvqAOFGcyH5JJhajZ1y6wKbFbBgwHff2SE9puzb2an3ddyrYkBOrs1sM7j_3zT2BVPPYuYkI9GjuAyJTPjuf2QQjWTIPNdNpuIUqWFecG2rluPqcWEKcX-4uCt7OLuSyEpMGVthPi9WRNLlFfel7eDQ8iiXM0bLs4j5msFr5tKLCVdALdMVpc",
    description:
      "Khám phá nét đẹp truyền thống trong từng chén trà, từ cách chọn lá đến nghi thức pha trà cầu kỳ của người Trung Hoa...",
    content: "Trong bài viết này, chúng ta tìm hiểu lịch sử của trà đạo Trung Hoa... (nội dung chi tiết ở đây).",
  },
  {
    id: 2,
    title: "Bí quyết luyện thi HSK 6 hiệu quả trong 3 tháng",
    category: "Learning Tips",
    date: "18 Tháng 10, 2023",
    author: "Lê Thị B",
    authorRole: "Giảng viên HSK",
    authorImage: "",
    readTime: "7 phút đọc",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbSl2xGjJS3uEsDp51tEljl3hy_Fgae038Hk5QTHtJtbKzjDF1n-cRfAuYeHAnaNTfZK4JkmbbYSb43VLe6ZbbAOUEOqjnb51FFLUAtD_1CtmQHaXk6kipYvmZtA9sKw3cltOSbowxdRPKXAlttXtfluEH2l5pVuzTkaK8sxIyzDEmFWeNc-96f0InbB7do272hRdFZcnDXNSPQsZXpMmqT_TqaS82bLcFFeQVkYN0-pYgAeNiknPAlvOXTBPOK0M_R0X29tbLTx0",
    description:
      "Lộ trình ôn tập chi tiết giúp bạn chinh phục điểm số cao trong kỳ thi HSK 6 đầy thử thách với các mẹo ghi nhớ từ vựng...",
    content: "Nội dung hướng dẫn học HSK 6 chi tiết, chia theo từng bước...",
  },
  {
    id: 3,
    title: "Ứng dụng AI trong học tiếng Trung hiện đại",
    category: "AI in Learning",
    date: "15 Tháng 10, 2023",
    author: "Team TOXI",
    authorRole: "",
    authorImage: "",
    readTime: "5 phút đọc",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMwV8JAu5LOdbNg64VaAplo3Hw0RF0IJ7KLzUA-CayjyRDPeSOq4qe-t9auAVkkz0xMsPcH6jWh3jhnxD5hqI5aEDQSjLb759A1lFUXqvJqIcetYuUcEKu5tcBZnKBE2PyjpUB3WWykwnTm5z5ytc4rYOX2uCvVsetgVFdmZuqbVdQNSGRMieT4HBkWmX9n-_8d-Ll9NoiZPvmyFfcw9WICk5KGsaYwZYi2kOMVrScdhSOt_x_ac_viwMOmzh2quwE1f4E1ysM5T8",
    description:
      "Cách tận dụng trí tuệ nhân tạo để sửa phát âm, dịch thuật ngữ cảnh và cá nhân hóa lộ trình học tiếng Trung tại nhà...",
    content: "Bài viết thảo luận về các công cụ AI như ChatGPT, Anki, ...",
  },
  {
    id: 4,
    title: "Lễ hội Thuyền rồng và sự kiện đặc sắc 2024",
    category: "HSK News",
    date: "12 Tháng 10, 2023",
    author: "Thư ký sự kiện",
    authorRole: "",
    authorImage: "",
    readTime: "4 phút đọc",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2Ht6bALRMirJTc7YncnPPRrTI4PvfpuvC83KoZ89Rc0scCa0gSwQmwi5UhllBUg_I_MHvWWjHveKChJYq0S5in7JsxQOPUU6aPp5MWAULdTq0jNXszpidcaPznruvI77aKM06qYMo6sj7aw1vgJP76T-Q4MjbVdR3MMdVkjFXU0YWtD-UZwM8rv6PmRBU252C-zVtN_R1AvRY1ZpnHl0W_oi1X17jkSbIaKyadtLrl5hcpjj1P9AHtfomzbiF67vzEo3xYiynGoQ",
    description:
      "Những hoạt động không thể bỏ qua trong mùa lễ hội năm nay cùng những câu chuyện lịch sử đằng sau ngày Tết Đoan Ngọ...",
    content: "Thông tin chi tiết về lễ hội Thuyền rồng 2024...",
  },
  {
    id: 5,
    title: "Thư pháp: Tâm hồn trong từng nét bút",
    category: "Culture",
    date: "10 Tháng 10, 2023",
    author: "Họa sĩ Tài",
    authorRole: "",
    authorImage: "",
    readTime: "5 phút đọc",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsCMeUh1QIN6E8QVzF0FnYmLGD1n90Lscvo6ZWo61s_J8808VJ2PhhhW-6APxIwDZTO5hBo7wBqugCry8GjzlVolFg7V3qoPybS6ddJr_g5_6j_Oz-RvuE_6_ecyEBUvq-98nFIpHcz5eYoeU4GiCfN90nquhx73pncjOvseZ4MmAnedXrO37IRZZP_qq8XmlkF4FyuOS4QByfyE4QLmufzE68qGXSVLp9djmhFJOsIcgdCemMW-MssnXRdnMqZEl4H150Q33Jfg8",
    description:
      'Tìm hiểu về "Văn phòng tứ bảo" và tầm quan trọng của thư pháp trong việc rèn luyện tính kiên nhẫn và thẩm mỹ...',
    content: "Giới thiệu về thư pháp và các kỹ thuật cơ bản...",
  },
    
  ];
  
const categories = [
    "All",
    "Culture",
    "Learning Tips",
    "AI in Learning",
    "HSK News",
  ];


  // ===== 3. FILTER =====
  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);


  // ===== 4. RESET PAGE khi đổi category =====
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);


  // ===== 5. PAGINATION =====
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = filteredPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);


  // ===== 6. UI =====

    return (
        <>
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto relative lg:ml-64">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <a className="hover:text-primary transition-colors" href="/Home">
          Home
        </a>
        <span className="material-symbols-outlined text-xs">
          chevron_right
        </span>
        <span className="text-primary font-medium">Blog</span>
      </nav>

      {/* Header */}
      <div className="flex justify-between items-end mb-10 relative">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1 w-8 bg-accent rounded-full"></span>
            <span className="text-accent font-bold uppercase tracking-widest text-xs">
              Knowledge Base
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
            Blog & Tin tức <br />
            <span className="text-primary underline decoration-accent/30 decoration-4 underline-offset-8">
              Văn hóa Trung Hoa
            </span>
          </h1>
        </div>

        <div className="hidden lg:block text-accent opacity-20 transform -translate-y-4">
          <span className="material-symbols-outlined text-8xl">
            festival
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-slate-200 dark:border-slate-800">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
              activeCategory === cat
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <article
            key={post.id}
           onClick={() => navigate(`/blog/${post.id}`, { state: post })}
            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                <span className="material-symbols-outlined text-sm">
                  calendar_today
                </span>
                <span>{post.date}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-5 mb-6">
                {post.description}
              </p>

              <button
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/blog/${post.id}`, { state: post });
  }}
                className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
              >
                Read More
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </button>
            </div>
          </article>
          
        ))}
   
     </div>
        <div className="mt-16 flex justify-center items-center gap-4 flex-wrap">
  {/* Prev */}
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => prev - 1)}
    className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-colors disabled:opacity-40"
  >
    <span className="material-symbols-outlined">
      chevron_left
    </span>
  </button>

  {/* Page Numbers */}
  {[...Array(totalPages)].map((_, index) => {
    const pageNumber = index + 1;
    return (
      <button
        key={pageNumber}
        onClick={() => setCurrentPage(pageNumber)}
        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors ${
          currentPage === pageNumber
            ? "bg-primary text-white"
            : "border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary"
        }`}
      >
        {pageNumber}
      </button>
    );
  })}

  {/* Next */}
  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((prev) => prev + 1)}
    className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-colors disabled:opacity-40"
  >
    <span className="material-symbols-outlined">
      chevron_right
    </span>
  </button>
</div>
    </main>
    
        </>
    )
}
