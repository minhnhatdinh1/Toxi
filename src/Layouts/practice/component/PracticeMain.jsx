import react from 'react';
import { useNavigate } from 'react-router-dom';

export default function FlashcardMain() {
    const navigate = useNavigate();
    
    // Dữ liệu các bài thi
    const examData = [
        {
            id: 1,
            title: 'Đề thi HSK 1 - Mã đề 101',
            level: 'HSK 1 • Sơ cấp',
            description: 'Khởi đầu hành trình với 150 từ vựng căn bản và các cấu trúc giao tiếp hằng ngày.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcZYi4iWQj7LDhIxYWvRnqIbWknLgO_-cjF6r3iw8JS2LxhmUGpvgLi4cDWWPLM7szb8vgG4kqqrATxkcqsYG80baGK32RWXAvdqoTm-XkCKi-FnYzsAxfhLw3deZ17P6JOHGylnO09eeXWxMld19_5A0KJ72jKG-pS6qygetOBpIKl1P1ZqP2hA5VARNGl-IsOzTTFAA1JI3AdO_ULMq5yVSQ08y8X4iTyyMVNQLIFkiMhDBZbFKrLvLb2h7ExlodpKFfC9g_HzM',
            duration: '35 Phút',
            questions: '40 Câu',
            attempts: '1.2k Lượt',
            badge: 'primary'
        },
        {
            id: 4,
            title: 'Đề HSK 4 - Chuyên sâu',
            level: 'HSK 4 • Trung cấp',
            description: 'Mở rộng vốn từ lên 1200 từ và làm quen với các chủ đề thảo luận xã hội phức tạp.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChVVwENFyaMtxcqMdQ50jnZhlR-oR3OQ-anvGnZzYY05g8GgY9CvGz5gQLqAm11WS1K8ySwDFPrwjlS-Fm2cesUXHT9B801LhS736VAhWHYvIO7DxFUhIthDZ6FzPrNg-uG3JhBY7vYd7sLjSjTCAMjOpYHlRU5Qja45htNVMEsWG0dz1OO6_L653ZqYB3MRXyPSYc6yKK5EXsC6isgcvCE1AsaMv3KrJ0Cg8ZS5XRfCkbxelgstJm6iKhDHoEzlcBUs96zE7HWUg',
            duration: '105 Phút',
            questions: '100 Câu',
            attempts: '3.5k Lượt',
            badge: 'primary'
        },
        {
            id: 6,
            title: 'Mock-test HSK 6 Toàn diện',
            level: 'HSK 6 • Cao cấp',
            description: 'Thử thách đỉnh cao với 5000 từ vựng và các văn bản học thuật, thời sự chuyên sâu.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo3rfHu6dYIHk2CLOl2wy0nSXRkS9iejaVXU3EF91disyV3juO0NxV7WzXvXJACqBlyE8E25vHySxbXdYyaf4KC3FX4LnJ4WB4cZ_vehOfkLUvho-oweTMOewnbim5pYUWr8iS2Rz33QEBz6rPe_BMghSOt5BBb_nzT1ZIzjBBmXLzA4PPj9jXUdCFqpHjRwdwiQbkTjj1JMQqXaQ8DA4wVmjXXzOQGK_caXcB0ikFpscjnDSyqh6RBhYzInbwciYsYUgjzoWqFFI',
            duration: '140 Phút',
            questions: '101 Câu',
            attempts: '850 Lượt',
            badge: 'accent-red'
        }
    ];

    // Hàm xử lý click card
    const handleCardClick = (exam) => {
        // Lưu dữ liệu exam vào sessionStorage để truyền sang trang ExamPage
        sessionStorage.setItem('selectedExam', JSON.stringify(exam));
        navigate('/Exam');
    };

    return(
        <>
        <section className="relative px-8 pt-20 pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUVBMmZTqB5ybemlPvHqHTvylCyKtS1vMFPajE9Rs-XiSDcA8YQmpQJEDSPwQrr2bDdOkyRzVu93DVfM581UNXLVCw5GuPYXTSb4fZOqS6gRzhB6U5EW6QIvjuc9EdXupYIQHT37zeOWWN7KFzcJ0c--HmFJIaofJGJ91vjabc6UUbWo1rI36SgH43-iEXzyVssUaqLdeeuuFnZJ5-WZTiZCPMcPspBorFGUk6iF7eZ_iuVNXwMJr80Y1V_SnsoN_wm10rHnAFonE"
          alt="Landscape"
          className="w-full h-full object-cover opacity-10 blur-sm ink-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-surface" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="h-[2px] w-8 bg-secondary" />
          <span className="text-secondary font-bold text-xs uppercase tracking-[0.4em]">
            HSK Preparation
          </span>
          <div className="h-[2px] w-8 bg-secondary" />
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-primary mb-6 tracking-tight">
          Ngân hàng đề thi{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-secondary to-secondary-dark">
            HSK
          </span>
        </h1>

        <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light leading-relaxed">
          Khám phá kho tàng đề thi được biên soạn kỹ lưỡng bởi đội ngũ chuyên gia,
          giúp bạn vững bước chinh phục kỳ thi năng lực Hán ngữ.
        </p>
      </div>
    </section>
    <section className="px-8 pb-24 max-w-7xl w-full mx-auto relative z-10">

      {/* Filter */}
      <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border border-white shadow-xl -mt-10 mb-16 flex flex-col lg:flex-row gap-10 items-center">

        {/* HSK Level */}
        <div className="flex-1 w-full">
          <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-3 block text-center lg:text-left">
            Cấp độ HSK
          </label>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            <div className="flex p-1 bg-slate-100/50 rounded-2xl">
              <button className="px-6 py-2.5 rounded-xl bg-primary text-secondary font-bold text-xs shadow-lg">
                HSK 1-3
              </button>
              <button className="px-6 py-2.5 rounded-xl text-slate-500 hover:text-primary font-bold text-xs transition-all">
                HSK 4
              </button>
              <button className="px-6 py-2.5 rounded-xl text-slate-500 hover:text-primary font-bold text-xs transition-all">
                HSK 5
              </button>
              <button className="px-6 py-2.5 rounded-xl text-slate-500 hover:text-primary font-bold text-xs transition-all">
                HSK 6
              </button>
            </div>
          </div>
        </div>

        {/* Select box */}
        <div className="w-full lg:w-auto flex gap-4">
          <div className="flex-1 lg:w-56">
            <select className="w-full bg-slate-100/50 border-none rounded-2xl text-xs font-bold text-primary focus:ring-secondary py-3">
              <option>Tất cả loại đề</option>
              <option>Đề chính thức</option>
              <option>Đề thi thử TOXI</option>
            </select>
          </div>

          <div className="flex-1 lg:w-56">
            <select className="w-full bg-slate-100/50 border-none rounded-2xl text-xs font-bold text-primary focus:ring-secondary py-3">
              <option>Sắp xếp: Mới nhất</option>
              <option>Lượt làm cao nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {examData.map((exam) => (
          <div 
            key={exam.id}
            onClick={() => handleCardClick(exam)}
            className="chinese-border-card bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl group flex flex-col cursor-pointer transition-all duration-300"
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src={exam.image}
                alt={exam.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

              <div className={`absolute top-4 left-4 ${exam.badge === 'accent-red' ? 'bg-accent-red/90 text-white' : 'bg-primary/90 text-secondary'} backdrop-blur-md text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border ${exam.badge === 'accent-red' ? 'border-white/20' : 'border-secondary/20'}`}>
                {exam.level}
              </div>
            </div>

            <div className="p-8 pt-2 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                {exam.title}
              </h3>

              <p className="text-sm text-slate-500 mb-8 font-light leading-relaxed">
                {exam.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-secondary text-2xl mb-1">
                    schedule
                  </span>
                  <p className="text-[10px] font-bold text-primary">{exam.duration}</p>
                </div>

                <div className="flex flex-col items-center border-x border-slate-100">
                  <span className="material-symbols-outlined text-secondary text-2xl mb-1">
                    list_alt
                  </span>
                  <p className="text-[10px] font-bold text-primary">{exam.questions}</p>
                </div>

                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-secondary text-2xl mb-1">
                    person_play
                  </span>
                  <p className="text-[10px] font-bold text-primary">{exam.attempts}</p>
                </div>
              </div>

              <button className="w-full py-4 gradient-btn text-primary font-black rounded-2xl text-sm tracking-widest flex items-center justify-center gap-3 group-hover:shadow-lg transition-shadow">
                LÀM BÀI NGAY
                <span className="material-symbols-outlined text-lg">
                  arrow_right_alt
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
       {/* Pagination */}
      <div className="mt-24 flex items-center justify-center gap-3">
        <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:border-secondary hover:text-secondary transition-all group shadow-sm">
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
            chevron_left
          </span>
        </button>

        <button className="w-12 h-12 rounded-2xl bg-primary text-secondary flex items-center justify-center font-bold shadow-lg">
          1
        </button>

        <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-secondary hover:text-secondary transition-all font-bold shadow-sm">
          2
        </button>

        <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-secondary hover:text-secondary transition-all font-bold shadow-sm">
          3
        </button>

        <span className="px-2 text-slate-300 font-bold">...</span>

        <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-secondary hover:text-secondary transition-all font-bold shadow-sm">
          12
        </button>

        <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:border-secondary hover:text-secondary transition-all group shadow-sm">
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </button>
      </div>

    </section>

      {/* CTA Section */}
      <div className="mt-auto py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-chinese-pattern opacity-10" />
        <div className="absolute inset-0 bg-cloud-pattern opacity-[0.05]" />

        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between relative z-10 gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4 tracking-tight">
              Bạn chưa xác định được trình độ?
            </h3>
            <p className="text-slate-300 max-w-lg font-light text-lg">
              Tham gia bài kiểm tra nhanh miễn phí để TOXI giúp bạn xây dựng lộ
              trình chinh phục HSK hiệu quả nhất.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="px-10 py-4 bg-transparent border-2 border-secondary/30 text-secondary font-bold rounded-2xl hover:bg-secondary/10 hover:border-secondary transition-all text-sm tracking-widest">
              TƯ VẤN LỘ TRÌNH
            </button>

            <button className="px-10 py-4 gradient-btn text-primary font-bold rounded-2xl shadow-xl text-sm tracking-widest">
              THI THỬ NHANH
            </button>
          </div>
        </div>
    </div>
        </>
    )
};