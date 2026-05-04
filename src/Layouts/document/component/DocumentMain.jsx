import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DOC_DATA, EXAM_DATA, EXAM_SUBJECTS, SUBJECTS } from "../documentData";

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
    transition: "box-shadow 0.2s, transform 0.2s",
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

function DocCard({ item, onOpen, gradient }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.10)" : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onClick={() => onOpen(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: gradient ?? `linear-gradient(135deg, ${item.thumbColor[0]}, ${item.thumbColor[1]})`,
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

  const openDocumentDetail = (item) => {
    navigate(`/documents/${item.type}/${item.id}`);
  };

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
              <DocCard key={item.id} item={item} onOpen={openDocumentDetail} />
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
              <DocCard
                key={item.id}
                item={item}
                onOpen={openDocumentDetail}
                gradient="linear-gradient(135deg, #fff3e0, #ffe0b2)"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
