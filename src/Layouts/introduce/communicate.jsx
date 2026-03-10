import react from 'react';
import { useParams } from "react-router-dom";
export default function Communicate() {
 const { type } = useParams();
const lessons = {
  basic: {
    title: "Tiếng Trung Giao tiếp Cơ bản",
    description: "Học phát âm chuẩn và các mẫu câu thông dụng.",
    videoTitle: "Intro: Tầm quan trọng của giao tiếp",
    videoTime: "08:45",
    tips: [
      "Lắng nghe chủ động (Shadowing)",
      "Xây dựng môi trường giả lập",
      "Không sợ sai khi giao tiếp"
    ]
  },

  advanced: {
    title: "Tiếng Trung Giao tiếp Nâng cao",
    description: "Thảo luận các chủ đề xã hội và tăng khả năng biện luận.",
    videoTitle: "Thảo luận chủ đề xã hội",
    videoTime: "12:30",
    tips: [
      "Phản xạ nhanh trong hội thoại",
      "Sử dụng thành ngữ Trung Quốc",
      "Tăng khả năng tranh luận"
    ]
  },

  travel: {
    title: "Tiếng Trung Du lịch",
    description: "Học các tình huống thực tế khi đi du lịch.",
    videoTitle: "Giao tiếp khi đi du lịch Trung Quốc",
    videoTime: "10:20",
    tips: [
      "Hỏi đường",
      "Đặt phòng khách sạn",
      "Mua sắm và mặc cả"
    ]
  }
};
  
  const lesson = lessons[type] || lessons.basic;
    return(
        <>
         <main className="flex-1 ml-64 overflow-y-auto bg-white dark:bg-background-dark">
 <div
  className="relative h-72 w-full overflow-hidden bg-cover bg-center lg:h-96"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1508804185872-d7badad00f7d')",
  }}
>

  {/* overlay tối */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

  {/* content */}
  <div className="relative z-10 flex h-full items-center">
    
    <div className="max-w-6xl px-8 lg:px-12">

      <div className="mb-4 flex flex-wrap gap-3">
       <span className="rounded-full bg-white/10 px-4 py-1 text-xs font-bold text-white border border-white/30 backdrop-blur">
  KIẾN THỨC MIỄN PHÍ
</span>

        <span className="rounded-full bg-primary px-4 py-1 text-xs font-bold text-white">
          XU HƯỚNG
        </span>
      </div>

      <h1 className="text-3xl font-black leading-tight text-white drop-shadow-lg lg:text-5xl">
        {lesson.title}
      </h1>

      <p className="mt-4 max-w-xl text-slate-200 text-lg">
        {lesson.description}
      </p>

    </div>

  </div>
</div>
      <div className="mx-auto max-w-4xl px-6 py-10 lg:px-12">

        {/* VIDEO */}
        <div className="mb-12 overflow-hidden rounded-2xl bg-black shadow-2xl shadow-brand-blue/20">
          <div
            className="group relative aspect-video w-full bg-slate-900 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDbf1WyJe_PXjvlo3rCbdNhd6Yk2HufBaPjOT4CPOccmyBTMEXJMww4AV3CQbt_VNG-wCpGVmxNCHMf0NH5z3InSSEyWex7rh9L1Ml6JpIHUKmxqJgNiNVyIZa8D3XQ6KGr5Wc6WfDBK45UAVGDY4xUCTHSj2KpvrLzrABeDpD3F53E8Ew07IzKPy2Q125V-peyJ-9HQwteaI5fYEBj8iPfZSK184JJ_clyPEXic_NWQ6ppgzymJx5kvS_-5fb4mTd8DSTm-vFIHbE")',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <button className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110">
                <span className="material-symbols-outlined text-4xl fill-1">
                  play_arrow
                </span>
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="mb-2 flex justify-between text-xs font-bold text-white">
                 <span>{lesson.videoTitle}</span>
  <span>{lesson.videoTime}</span>
              </div>

              <div className="h-1.5 w-full rounded-full bg-white/20">
                <div className="h-full w-1/3 rounded-full bg-primary"></div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <article className="prose prose-slate max-w-none dark:prose-invert lg:prose-lg">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-blue dark:text-brand-gold">
            <span className="material-symbols-outlined text-primary">
              verified_user
            </span>
            Tại sao nên ưu tiên học giao tiếp?
          </h2>

          <p>
            Trong kỷ nguyên hội nhập, việc sở hữu khả năng ngôn ngữ không chỉ
            dừng lại ở việc đọc hiểu hay vượt qua các kỳ thi chứng chỉ.
          </p>

          {/* FEATURES */}
          <div className="my-10 grid gap-6 sm:grid-cols-2">

            <div className="rounded-xl border border-slate-200 bg-background-light p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-gold/10 text-brand-gold">
                <span className="material-symbols-outlined">psychology</span>
              </div>

              <h3 className="mb-2 text-lg font-bold">Phá bỏ rào cản tâm lý</h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Nhiều người học tiếng Trung rất tốt về ngữ pháp nhưng lại ngại
                nói.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-background-light p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined">
                  language_chinese_dayi
                </span>
              </div>

              <h3 className="mb-2 text-lg font-bold">Ngôn ngữ đời thường</h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Học cách người bản xứ nói chuyện thay vì những mẫu câu cứng
                nhắc trong sách.
              </p>
            </div>

          </div>
     <h2 className="text-2xl font-bold">
  3 Bí quyết để nói tiếng Trung tự nhiên
</h2>

<ol className="list-decimal ml-6 space-y-2">
  {lesson.tips.map((tip, index) => (
    <li key={index}>{tip}</li>
  ))}
</ol>

<div className="my-8 rounded-2xl border-l-4 border-brand-gold bg-brand-blue p-8 text-white shadow-xl">
  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-brand-gold/30">
      <img
        alt="Lantern"
        className="h-full w-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwOslwViRqYr3J2f9vP3Hhh3d8ACLUo--f3kdUCC9HWyWNVtVbsAgpDdBE_-5A7HQvfTKmrfGP7rOu6nGzMadXwYOc6f1MBT7LYJ_VYvRx-48fR5ecvcQ5i-x92EKjUiKHexMM4fQD4FdFJ2reBAd-blC3c0QltkyWE_2pdCCXN_KYzQm1VOCr-Cm1DI92ODaCW7VhIrBeWvwUOJzwnrzX7vUikd5hH2R5iXfHF2tzwyZlXIdlSPdzjFTj1aLYQ5G_PWZFZboRGGo"
      />
    </div>

    <div>
      <p className="mb-2 text-lg italic text-slate-200">
        "Học một ngoại ngữ là có thêm một tâm hồn thứ hai. Đừng học vẹt,
        hãy học để sống với nó."
      </p>

      <p className="font-bold text-brand-gold">
        — Lão sư Trần (Cố vấn học thuật TOXI)
      </p>
    </div>

  </div>
</div>

<h2 className="text-2xl font-bold">
  Các tình huống giao tiếp phổ biến
</h2>

<p>
  Dưới đây là danh sách các chủ đề bạn sẽ được khám phá trong chuỗi bài viết miễn phí này:
</p>

<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">

  <li className="flex items-center gap-2">
    <span className="material-symbols-outlined text-brand-gold">
      check_circle
    </span>
    Làm quen và giới thiệu bản thân
  </li>

  <li className="flex items-center gap-2">
    <span className="material-symbols-outlined text-brand-gold">
      check_circle
    </span>
    Mua sắm và mặc cả giá
  </li>

  <li className="flex items-center gap-2">
    <span className="material-symbols-outlined text-brand-gold">
      check_circle
    </span>
    Đặt bàn tại nhà hàng
  </li>

  <li className="flex items-center gap-2">
    <span className="material-symbols-outlined text-brand-gold">
      check_circle
    </span>
    Giao tiếp trong công việc văn phòng
  </li>

  <li className="flex items-center gap-2">
    <span className="material-symbols-outlined text-brand-gold">
      check_circle
    </span>
    Hỏi đường và phương tiện công cộng
  </li>

  <li className="flex items-center gap-2">
    <span className="material-symbols-outlined text-brand-gold">
      check_circle
    </span>
    Khám bệnh và sức khỏe
  </li>

</ul>




        </article>
      </div>
    </main>
        </>
    )
};