import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const SUBJECTS = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"];
const EXAM_SUBJECTS = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"];

const DOC_DATA = [
  {
    id: 1,
    level: "HSK 1",
    brand: "Tài liệu tổng hợp HSK 1",
    titleInner: "Từ vựng cơ bản và pinyin",
    subtitle: "Tài liệu ôn tập nhập môn dành cho người mới bắt đầu",
    author: "Biên soạn: Tổ chuyên môn TOXI",
    name: "HSK 1 tổng hợp từ vựng cơ bản, pinyin và mẫu câu giao tiếp hằng ngày",
    date: "05/04/2026",
    views: 2671,
    thumbColor: ["#e8f4fd", "#c3ddf5"],
  },
  {
    id: 2,
    level: "HSK 2",
    brand: "Tài liệu tổng hợp HSK 2",
    titleInner: "Hệ thống mẫu câu thông dụng",
    subtitle: "Mẫu câu tần suất cao và bài luyện hội thoại cơ bản",
    author: "Biên soạn: Tổ chuyên môn TOXI",
    name: "HSK 2 tổng hợp mẫu câu thông dụng, cấu trúc hỏi đáp và từ vựng theo chủ đề",
    date: "05/04/2026",
    views: 1840,
    thumbColor: ["#e8f4fd", "#c3ddf5"],
  },
  {
    id: 3,
    level: "HSK 3",
    brand: "Tài liệu tổng hợp HSK 3",
    titleInner: "Tổng hợp ngữ pháp trọng điểm",
    subtitle: "Hệ thống các điểm ngữ pháp thường gặp trong bài thi",
    author: "Biên soạn: Tổ chuyên môn TOXI",
    name: "HSK 3 tổng hợp ngữ pháp tần suất cao, từ nối và kỹ năng đọc hiểu",
    date: "25/03/2026",
    views: 2695,
    thumbColor: ["#e8f4fd", "#c3ddf5"],
  },
  {
    id: 4,
    level: "HSK 4",
    brand: "Tài liệu tổng hợp HSK 4",
    titleInner: "Chuyên đề đọc hiểu",
    subtitle: "Nâng cao tốc độ đọc và độ chính xác khi làm bài",
    author: "Biên soạn: Tổ chuyên môn TOXI",
    name: "HSK 4 tuyển tập bài đọc hiểu, cụm từ đi kèm và bài luyện chọn lọc",
    date: "02/02/2026",
    views: 5086,
    thumbColor: ["#e8f4fd", "#c3ddf5"],
  },
  {
    id: 5,
    level: "HSK 5",
    brand: "Tài liệu tổng hợp HSK 5",
    titleInner: "Chuyên sâu từ vựng nâng cao",
    subtitle: "Phân biệt từ khó và tích lũy cách diễn đạt trong đề thật",
    author: "Biên soạn: Tổ chuyên môn TOXI",
    name: "HSK 5 chuyên đề từ vựng nâng cao, diễn đạt viết và đọc hiểu chuyên sâu",
    date: "01/02/2026",
    views: 3243,
    thumbColor: ["#e8f4fd", "#c3ddf5"],
  },
  {
    id: 6,
    level: "HSK 6",
    brand: "Tài liệu tổng hợp HSK 6",
    titleInner: "Tổng hợp điểm khó đề thật",
    subtitle: "Phá vỡ các phần khó trong đọc hiểu và nghe hiểu nâng cao",
    author: "Biên soạn: Tổ chuyên môn TOXI",
    name: "HSK 6 tổng hợp điểm khó thường gặp, từ gần nghĩa và kỹ năng viết nâng cao",
    date: "15/01/2026",
    views: 3891,
    thumbColor: ["#fff8e1", "#ffe082"],
  },
];

const EXAM_DATA = [
  {
    id: 1,
    level: "HSK 1",
    brand: "Đề thi thử HSK 1",
    titleInner: "Đề mô phỏng HSK 1",
    subtitle: "Từ vựng - Nghe - Đọc",
    note: "Thời gian gợi ý: 40 phút",
    author: "Biên soạn: Tổ chuyên môn TOXI",
    name: "Đề thi thử HSK 1 số 1: luyện từ vựng cơ bản và nghe hiểu nhập môn",
    date: "03/04/2026",
    views: 4120,
  },
  {
    id: 2,
    level: "HSK 2",
    brand: "Đề thi thử HSK 2",
    titleInner: "Đề mô phỏng HSK 2",
    subtitle: "Mẫu câu - Ngữ pháp - Nghe",
    note: "Thời gian gợi ý: 55 phút",
    author: "Biên soạn: Tổ chuyên môn TOXI",
    name: "Đề thi thử HSK 2 số 2: luyện mẫu câu thường gặp và nghe hiểu cơ bản",
    date: "02/04/2026",
    views: 3870,
  },
  {
    id: 3,
    level: "HSK 3",
    brand: "Đề thi thử HSK 3",
    titleInner: "Đề mô phỏng HSK 3",
    subtitle: "Ngữ pháp - Đọc - Viết cơ bản",
    note: "Thời gian gợi ý: 90 phút",
    author: "Biên soạn: Tổ chuyên môn TOXI",
    name: "Đề thi thử HSK 3 số 3: kiểm tra tổng hợp ngữ pháp, đọc và viết cơ bản",
    date: "28/03/2026",
    views: 5201,
  },
  {
    id: 4,
    level: "HSK 4",
    brand: "Đề thi thử HSK 4",
    titleInner: "Đề mô phỏng HSK 4",
    subtitle: "Đọc - Nghe - Diễn đạt viết",
    note: "Thời gian gợi ý: 105 phút",
    author: "Biên soạn: Tổ chuyên môn TOXI",
    name: "Đề thi thử HSK 4 số 4: luyện tốc độ đọc và kỹ năng diễn đạt viết",
    date: "20/03/2026",
    views: 2984,
  },
  {
    id: 5,
    level: "HSK 5",
    brand: "Đề thi thử HSK 5",
    titleInner: "Đề mô phỏng HSK 5",
    subtitle: "Từ vựng nâng cao - Đọc - Nghe",
    note: "Thời gian gợi ý: 125 phút",
    author: "Biên soạn: Tổ chuyên môn TOXI",
    name: "Đề thi thử HSK 5 số 5: luyện tổng hợp đọc hiểu, nghe hiểu và từ vựng nâng cao",
    date: "12/03/2026",
    views: 3568,
  },
  {
    id: 6,
    level: "HSK 6",
    brand: "Đề thi thử HSK 6",
    titleInner: "Đề mô phỏng HSK 6",
    subtitle: "Hiểu tổng hợp - Viết - Nghe",
    note: "Thời gian gợi ý: 140 phút",
    author: "Biên soạn: Tổ chuyên môn TOXI",
    name: "Đề thi thử HSK 6 số 6: luyện hiểu tổng hợp và nâng cao kỹ năng viết",
    date: "05/03/2026",
    views: 4412,
  },
];

const heroImages = [
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
];

const styles = {
  page: {
    background: "#f5f5f0",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  section: {
    padding: "24px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: "#222",
    borderLeft: "4px solid #e8192c",
    paddingLeft: 12,
  },
  seeMoreBtn: {
    background: "#fff",
    border: "1.5px solid #e8192c",
    color: "#e8192c",
    borderRadius: 20,
    padding: "6px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  tabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 16,
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #eee",
    cursor: "pointer",
    transition: "box-shadow 0.2s",
  },
  cardInfo: {
    padding: "10px 12px",
  },
  cardName: {
    fontSize: 13,
    fontWeight: 600,
    color: "#222",
    lineHeight: 1.4,
    marginBottom: 6,
  },
  cardMeta: {
    display: "flex",
    gap: 10,
    fontSize: 11,
    color: "#888",
  },
  divider: {
    border: "none",
    borderTop: "6px solid #f5f5f0",
    margin: 0,
  },
};

function TabGroup({ subjects, activeTab, onTabChange }) {
  return (
    <div style={styles.tabs}>
      {subjects.map((subject) => (
        <button
          key={subject}
          onClick={() => onTabChange(subject)}
          style={{
            padding: "8px 20px",
            borderRadius: 24,
            border: activeTab === subject ? "1.5px solid #e8192c" : "1.5px solid #ddd",
            fontSize: 13,
            fontWeight: activeTab === subject ? 700 : 500,
            cursor: "pointer",
            background: "#fff",
            color: activeTab === subject ? "#e8192c" : "#555",
            transition: "all 0.2s",
          }}
        >
          {subject}
        </button>
      ))}
    </div>
  );
}

function DocCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ ...styles.card, boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.10)" : "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${item.thumbColor[0]}, ${item.thumbColor[1]})`,
          padding: 14,
          minHeight: 130,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ fontSize: 9, color: "#e8192c", fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>
          {item.brand}
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#c0392b", marginBottom: 4 }}>
          {item.titleInner}
        </div>
        <div style={{ fontSize: 11, color: "#1565c0", fontWeight: 700 }}>{item.subtitle}</div>
        <div style={{ fontSize: 10, color: "#555", marginTop: "auto", fontStyle: "italic" }}>
          {item.author}
        </div>
      </div>
      <div style={styles.cardInfo}>
        <div style={styles.cardName}>{item.name}</div>
        <div style={styles.cardMeta}>
          <span>📅 {item.date}</span>
          <span>👁 {item.views.toLocaleString("vi-VN")} lượt xem</span>
        </div>
      </div>
    </div>
  );
}

function ExamCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ ...styles.card, boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.10)" : "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
          padding: 14,
          minHeight: 130,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ fontSize: 9, color: "#e8192c", fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>
          {item.brand}
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#b71c1c", marginBottom: 4 }}>
          {item.titleInner}
        </div>
        <div style={{ fontSize: 11, color: "#1565c0", fontWeight: 700, whiteSpace: "pre-line" }}>
          {item.subtitle}
        </div>
        {item.note ? <div style={{ fontSize: 10, color: "#555", marginTop: 4 }}>{item.note}</div> : null}
        <div style={{ fontSize: 10, color: "#555", marginTop: "auto", fontStyle: "italic" }}>
          {item.author}
        </div>
      </div>
      <div style={styles.cardInfo}>
        <div style={styles.cardName}>{item.name}</div>
        <div style={styles.cardMeta}>
          <span>📅 {item.date}</span>
          <span>👁 {item.views.toLocaleString("vi-VN")} lượt xem</span>
        </div>
      </div>
    </div>
  );
}

export default function DocumentMain() {
  const navigate = useNavigate();
  const [docTab, setDocTab] = useState("HSK 1");
  const [examTab, setExamTab] = useState("HSK 1");
  const [activeHero, setActiveHero] = useState(0);

  const heroSlides = useMemo(
    () => [
      {
        id: "hero-doc-1",
        eyebrow: "TOXI Education",
        title: "Kho tài liệu học tiếng Trung từ HSK 1 đến HSK 6",
        subtitle: "Tổng hợp tài liệu, ngữ pháp, từ vựng và bài luyện theo từng cấp độ để bạn học rõ lộ trình hơn.",
        image: heroImages[0],
        accent: "Tài liệu chọn lọc",
        metric: "6 cấp độ HSK",
      },
      {
        id: "hero-doc-2",
        eyebrow: "Tài liệu tổng hợp",
        title: "Ôn tập có hệ thống với bộ tài liệu biên soạn riêng",
        subtitle: "Mỗi cấp độ đều có bộ tài liệu trọng tâm giúp bạn bám sát mục tiêu học và thi HSK.",
        image: heroImages[1],
        accent: "Ôn tập trọng điểm",
        metric: `${DOC_DATA.length} tài liệu mẫu`,
      },
      {
        id: "hero-doc-3",
        eyebrow: "Đề thi thử",
        title: "Luyện đề HSK theo từng cấp độ với nội dung thực tế",
        subtitle: "Thực hành cùng đề mô phỏng HSK 1 đến HSK 6 để làm quen cấu trúc bài thi và cải thiện tốc độ làm bài.",
        image: heroImages[2],
        accent: "Luyện đề ngay",
        metric: `${EXAM_DATA.length} đề thử`,
      },
    ],
    []
  );

  const filteredDocs = DOC_DATA.filter((item) => item.level === docTab);
  const filteredExams = EXAM_DATA.filter((item) => item.level === examTab);

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <>
      <section className="w-full bg-[#f4f7ff] pt-3 md:pt-5 lg:pt-6">
        <div className="bg-[#eef3ff]">
          <div className="mx-auto max-w-7xl px-4 pb-4 pt-3 sm:pb-5 md:px-6 md:pb-8 md:pt-5">
            <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_24px_80px_rgba(33,54,120,0.14)]">
              <div className="relative h-[260px] sm:h-[320px] lg:h-[410px]">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => {
                      if (String(slide.id).startsWith("hero-")) return;
                      navigate(`/courses/${slide.id}`);
                    }}
                    className={`absolute inset-0 cursor-default text-left transition-all duration-700 ${
                      activeHero === index
                        ? "opacity-100 translate-x-0"
                        : index < activeHero
                        ? "opacity-0 -translate-x-6"
                        : "opacity-0 translate-x-6"
                    }`}
                  >
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${slide.image}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#082b73]/96 via-[#1747d6]/84 to-[#173ec9]/50" />
                    <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#061b4f]/92 via-[#0a2872]/72 to-transparent sm:w-[58%]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_62%_100%,rgba(255,255,255,0.12),transparent_22%)]" />

                    <div className="relative z-10 flex h-full items-center justify-center px-4 py-6 sm:px-10 sm:py-8 lg:px-14">
                      <div className="mx-auto max-w-3xl text-center text-white">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white/90 backdrop-blur-md sm:mb-4 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.28em]">
                          <span className="h-2 w-2 rounded-full bg-secondary" />
                          {slide.eyebrow}
                        </div>
                        <h1 className="mx-auto max-w-2xl text-[28px] font-black leading-tight sm:text-4xl lg:text-[48px] xl:text-[56px]">
                          {slide.title}
                        </h1>
                        <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-white/85 sm:mt-4 sm:text-base sm:leading-7">
                          {slide.subtitle}
                        </p>
                        <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:mt-6 sm:flex-row sm:gap-4">
                          <span className="rounded-full bg-white/14 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.22em]">
                            {slide.accent}
                          </span>
                          <div className="text-xs font-semibold text-white/80 sm:text-sm">{slide.metric}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
                <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/14 px-3 py-2 backdrop-blur-md sm:bottom-5">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveHero(index)}
                      aria-label={`Hero slide ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        activeHero === index ? "w-8 bg-white" : "w-2.5 bg-white/45 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={styles.page}>
        <hr style={styles.divider} />

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle}>TÀI LIỆU TỔNG HỢP</div>
            <button style={styles.seeMoreBtn}>Xem thêm ›</button>
          </div>
          <TabGroup subjects={SUBJECTS} activeTab={docTab} onTabChange={setDocTab} />
          <div style={styles.grid}>
            {filteredDocs.map((item) => (
              <DocCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <hr style={styles.divider} />

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle}>ĐỀ THI THỬ</div>
            <button style={styles.seeMoreBtn}>Xem thêm ›</button>
          </div>
          <TabGroup subjects={EXAM_SUBJECTS} activeTab={examTab} onTabChange={setExamTab} />
          <div style={styles.grid}>
            {filteredExams.map((item) => (
              <ExamCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
