import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import FilterSidebar from "../../components/FilterSidebar";
import StarRating from "../../components/StarRating";
import LoadingSpinner from "../common/LoadingSpinner";

const normalizeCourseStatus = (status) => {
  const normalized = String(status || "").trim().toUpperCase();
  if (["ACTIVE", "PUBLISHED", "PUBLIC"].includes(normalized)) return "PUBLISHED";
  if (["DRAFT", "DRAFTING"].includes(normalized)) return "DRAFT";
  if (["INACTIVE", "ARCHIVED", "HIDDEN"].includes(normalized)) return "INACTIVE";
  return normalized || "DRAFT";
};

const isVisibleCourse = (course) => normalizeCourseStatus(course?.status) === "PUBLISHED";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [sortType, setSortType] = useState("newest");
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myCourses, setMyCourses] = useState([]);
  const [courseProgressMap, setCourseProgressMap] = useState({});
  const [activeHero, setActiveHero] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = (searchParams.get("keyword") || "").trim().toLowerCase();

  const fallbackImages = [
    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
  ];

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const getOrderedLessons = (course) =>
    (course?.chapters || []).flatMap((chapter) =>
      [...(chapter?.contents || [])]
        .filter((content) => content.contentType === "LESSON" && content.lesson)
        .sort((a, b) => {
          const aOrder = a.orderIndex ?? a.order_index ?? a.lesson?.orderIndex ?? a.lesson?.order_index ?? Number.MAX_SAFE_INTEGER;
          const bOrder = b.orderIndex ?? b.order_index ?? b.lesson?.orderIndex ?? b.lesson?.order_index ?? Number.MAX_SAFE_INTEGER;
          if (aOrder !== bOrder) return aOrder - bOrder;
          return Number(a.lesson?.lessonId || 0) - Number(b.lesson?.lessonId || 0);
        })
        .map((content) => content.lesson)
    );

  const getFirstLessonId = (course) => {
    const orderedLessons = getOrderedLessons(course);
    return orderedLessons[0]?.lessonId || null;
  };

  const handleContinueLearning = async (course) => {
    if (!myCourses.includes(Number(course.courseId))) {
      navigate(`/courses/${course.courseId}`);
      return;
    }

    let firstLessonId = getFirstLessonId(course);

    if (!firstLessonId) {
      try {
        const res = await axios.get(`http://localhost:8080/api/courses/${course.courseId}`);
        firstLessonId = getFirstLessonId(res.data);
      } catch (err) {
        console.error("Khong lay duoc lesson dau tien:", err);
      }
    }

    if (firstLessonId) {
      navigate(`/learn/${course.courseId}/${firstLessonId}`);
      return;
    }

    navigate(`/courses/${course.courseId}`);
  };

  const formatCurrency = (number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number || 0);

  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((res) => res.json())
      .then((data) => {
        const courseList = Array.isArray(data) ? data : [];
        setCourses(courseList.filter(isVisibleCourse));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch courses error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    if (!token) {
      setMyCourses([]);
      setCourseProgressMap({});
      return;
    }

    fetch("http://localhost:8080/api/my-courses", {
      headers: getAuthHeaders(),
    })
      .then((res) => res.json())
      .then(async (data) => {
        const ownedCourses = Array.isArray(data) ? data : [];
        setMyCourses(ownedCourses.map((c) => Number(c.courseId)));

        const completedRes = await axios.get("http://localhost:8080/api/progress/user", {
          headers: getAuthHeaders(),
        });
        const completedIds = new Set((completedRes.data || []).map(Number));

        const courseDetails = await Promise.all(
          ownedCourses.map(async (course) => {
            if (course?.chapters?.length) return course;
            try {
              const detailRes = await axios.get(`http://localhost:8080/api/courses/${course.courseId}`);
              return detailRes.data;
            } catch (error) {
              return course;
            }
          })
        );

        return courseDetails.map((course) => {
          const lessons = getOrderedLessons(course);
          const totalLessons = lessons.length;
          const completedCount = lessons.filter((lesson) => completedIds.has(Number(lesson.lessonId))).length;
          return [course.courseId, totalLessons ? (completedCount / totalLessons) * 100 : 0];
        });
      })
      .then((progressEntries) => {
        if (progressEntries) {
          setCourseProgressMap(Object.fromEntries(progressEntries));
        }
      })
      .catch(() => {
        setMyCourses([]);
        setCourseProgressMap({});
      });
  }, []);

  const heroSlides = useMemo(() => {
    const source = courses
      .filter((course) => Number(course.courseId))
      .slice(0, 3)
      .map((course, index) => ({
        id: course.courseId,
        eyebrow: course.courseType || "TOXI Education",
        title: course.title || "Khoa hoc noi bat",
        subtitle:
          course.description ||
          "Lo trinh chinh phuc tieng Trung duoc cap nhat tu khoa hoc noi bat tren he thong.",
        image: course.thumbnailUrl || fallbackImages[index % fallbackImages.length],
        accent: course.level || course.hsklevel || "HSK Roadmap",
        metric:
          course.discountPrice && Number(course.discountPrice) > 0
            ? formatCurrency(course.discountPrice)
            : formatCurrency(course.price),
      }));

    if (source.length > 0) return source;

    return [
      {
        id: "hero-course-fallback",
        eyebrow: "TOXI Education",
        title: "Khoa hoc HSK noi bat",
        subtitle: "Banner se tu dong cap nhat theo khoa hoc noi bat khi backend tra du lieu day du.",
        image: fallbackImages[0],
        accent: "HSK Roadmap",
        metric: "10.000+ hoc vien",
      },
    ];
  }, [courses]);

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const sortedCourses = [...courses]
    .filter((course) => {
      const searchText = [course.title, course.description, course.courseType, course.level, course.hsklevel]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (keyword && !searchText.includes(keyword)) return false;
      if (selectedLevels.length > 0 && !selectedLevels.includes(course.level)) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(course.courseType)) return false;
      if (selectedRatings.length > 0 && !selectedRatings.includes(Math.round(course.rating || 0))) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortType === "price-low-to-high") return (a.price || 0) - (b.price || 0);
      if (sortType === "price-high-to-low") return (b.price || 0) - (a.price || 0);
      if (sortType === "rating-high-to-low") return (b.rating || 0) - (a.rating || 0);
      return (b.courseId || 0) - (a.courseId || 0);
    });

  return (
    <div className="w-full bg-surface relative">
      <section className="bg-[#f4f7ff] pt-4 md:pt-5 lg:pt-6 w-full">
        <div className="bg-[#eef3ff]">
          <div className="mx-auto max-w-7xl px-4 pb-6 pt-4 md:px-6 md:pb-8 md:pt-5">
            <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_24px_80px_rgba(33,54,120,0.14)]">
              <div className="relative h-[260px] sm:h-[320px] lg:h-[380px]">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => {
                      if (String(slide.id).startsWith("hero-")) return;
                      navigate(`/courses/${slide.id}`);
                    }}
                    className={`absolute inset-0 ${String(slide.id).startsWith("hero-") ? "cursor-default" : "cursor-pointer text-left"} transition-all duration-700 ${
                      activeHero === index
                        ? "opacity-100 translate-x-0"
                        : index < activeHero
                        ? "opacity-0 -translate-x-6"
                        : "opacity-0 translate-x-6"
                    }`}
                  >
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${slide.image}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#082b73]/94 via-[#1747d6]/82 to-[#173ec9]/50" />
                    <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#061b4f]/92 via-[#0a2872]/72 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_62%_100%,rgba(255,255,255,0.1),transparent_22%)]" />

                    <div className="relative z-10 flex h-full items-center justify-center px-6 py-8 sm:px-10 lg:px-14">
                      <div className="mx-auto max-w-3xl text-center text-white">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-white/90 backdrop-blur-md">
                          <span className="h-2 w-2 rounded-full bg-secondary" />
                          {slide.eyebrow}
                        </div>
                        <h1 className="mx-auto max-w-2xl text-3xl font-black leading-tight sm:text-4xl lg:text-[48px] xl:text-[56px]">
                          {slide.title}
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                          {slide.subtitle}
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-4">
                          <span className="rounded-full bg-white/14 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-secondary backdrop-blur-sm">
                            {slide.accent}
                          </span>
                          <div className="text-sm font-semibold text-white/80">{slide.metric}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
                <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/14 px-3 py-2 backdrop-blur-md">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveHero(index)}
                      aria-label={`Course hero slide ${index + 1}`}
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

      <section className="bg-white border-b border-primary/10 px-6 py-4">
        <div className="mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link to="/home" className="hover:text-primary transition-colors">Trang chu</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link to="/course" className="hover:text-primary transition-colors">Khoa hoc</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-bold">{keyword ? searchParams.get("keyword") : "HSK"}</span>
            </nav>

            {keyword ? (
              <div className="text-sm text-slate-500">
                Ket qua tim kiem cho <span className="font-bold text-primary">"{searchParams.get("keyword")}"</span>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <div className="text-sm text-slate-500">
              Hien thi <span className="font-bold text-primary">{sortedCourses.length}</span> khoa hoc
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sap xep:</label>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="bg-surface border border-primary/10 rounded-lg text-sm px-3 py-1.5 focus:ring-primary focus:border-primary text-slate-700 font-medium"
              >
                <option value="newest">Moi nhat</option>
                <option value="price-low-to-high">Gia: Thap den cao</option>
                <option value="price-high-to-low">Gia: Cao den thap</option>
                <option value="rating-high-to-low">Danh gia cao nhat</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12">
        <div className="mb-8">
          <FilterSidebar
            selectedLevels={selectedLevels}
            setSelectedLevels={setSelectedLevels}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedRatings={selectedRatings}
            setSelectedRatings={setSelectedRatings}
          />
        </div>

        {loading ? (
          <LoadingSpinner text="Dang tai khoa hoc..." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {sortedCourses.map((course) => {
              const isOwned = myCourses.includes(Number(course.courseId));
              const progressValue = Math.max(0, Math.min(100, Number(courseProgressMap[course.courseId] || 0)));

              return (
                <div
                  key={course.courseId}
                  className="chinese-border bg-white shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col border h-full border-slate-100 rounded-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={course.thumbnailUrl || "https://wisebusiness.vn/wp-content/uploads/2024/08/tao-hinh-anh-bang-ai-66c7f51ab6da5.webp"}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {course.level || course.hsklevel || "HSK"}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-primary transition">{course.title}</h3>
                    <h4 className="text-sm text-slate-500 mb-2">{course.description || "Khoa hoc tieng Trung duoc cap nhat lien tuc."}</h4>
                    <div className="text-xs text-slate-400 mb-3">{course.courseType}</div>

                    <div className="mt-auto">
                      <div className="flex items-center gap-1 mb-2">
                        <StarRating value={course.rating || 0} size="text-sm" />
                        {course.rating != null && (
                          <span className="text-xs text-slate-400">{Number(course.rating).toFixed(1)}</span>
                        )}
                      </div>

                      {course.discountPrice && course.discountPrice < course.price ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-black text-red-600">{formatCurrency(course.discountPrice)}</span>
                          <span className="text-sm text-slate-400 line-through">{formatCurrency(course.price)}</span>
                        </div>
                      ) : (
                        <span className="text-xl font-black text-secondary">{formatCurrency(course.price)}</span>
                      )}

                      {isOwned && (
                        <div className="mt-4 mb-1">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                            <span>Tien do khoa hoc</span>
                            <span className="font-bold text-primary">{progressValue.toFixed(0)}%</span>
                          </div>
                          <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-500 to-primary transition-all duration-500"
                              style={{ width: `${progressValue}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className={`mt-4 ${isOwned ? "" : "grid grid-cols-2 gap-2"}`}>
                        <button
                          onClick={() => handleContinueLearning(course)}
                          className={`py-2 text-xs font-bold rounded-lg transition-colors ${
                            isOwned ? "w-full bg-primary text-white hover:bg-primary/90" : "bg-slate-100 text-primary hover:bg-slate-200"
                          }`}
                        >
                          {isOwned ? "Tiep tuc hoc" : "Chi tiet"}
                        </button>

                        {!isOwned && (
                          <Link
                            to={`/checkout/${course.courseId}`}
                            className="py-2 text-xs font-bold bg-secondary text-primary rounded-lg hover:bg-yellow-400 flex justify-center"
                          >
                            Dang ky
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
