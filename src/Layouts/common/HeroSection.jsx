import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function HeroSection({ heroSlides, activeHero, setActiveHero }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [heroSlides.length, setActiveHero]);

  return (
    <>
      {/* ==============================================
          1. HERO SECTION (upgraded)
      ============================================== */}
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
                  className={`absolute inset-0 ${String(slide.id).startsWith("hero-") ? "cursor-default" : "cursor-pointer text-left"} transition-all duration-700 ${
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
                        <span className="rounded-full bg-white/14 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.22em]">{slide.accent}</span>
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
    </>
  );
}