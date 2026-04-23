import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const DECKS = [
  {
    id: 1,
    title: "Chao hoi cho be",
    subtitle: "Tu vung HSK 1 · Mau cau de nho",
    level: "HSK 1",
    icon: "front_hand",
    coverClass: "from-emerald-100 via-lime-50 to-cyan-50",
    accentClass: "bg-emerald-600",
    textClass: "text-emerald-700",
    cards: [
      { hanzi: "你好", pinyin: "Ni hao", vietnamese: "Xin chao", example: "你好，我是 Na Na。", exampleVi: "Xin chao, minh la Na Na.", strokes: 5, radical: "你", tip: "Cau chao de nhat cho be khi gap ban moi." },
      { hanzi: "您好", pinyin: "Nin hao", vietnamese: "Con chao a / ba / co", example: "您好，老师！", exampleVi: "Con chao co a!", strokes: 11, radical: "您", tip: "Dung khi be chao ong ba, thay co hoac nguoi lon." },
      { hanzi: "谢谢", pinyin: "Xie xie", vietnamese: "Cam on", example: "谢谢妈妈。", exampleVi: "Con cam on me.", strokes: 17, radical: "言", tip: "Day be noi loi cam on khi duoc giup do." },
      { hanzi: "再见", pinyin: "Zai jian", vietnamese: "Tam biet", example: "再见，明天见！", exampleVi: "Tam biet nhe, mai gap lai!", strokes: 7, radical: "见", tip: "Dung khi tan hoc hoac chao tam biet ban be." },
      { hanzi: "对不起", pinyin: "Dui bu qi", vietnamese: "Xin loi", example: "对不起，我来晚了。", exampleVi: "Xin loi, con den tre.", strokes: 14, radical: "对", tip: "Cau xin loi de be tap le phep moi ngay." },
    ],
  },
  {
    id: 2,
    title: "Gia dinh cho be",
    subtitle: "Tu vung HSK 1 · Nguoi than quen thuoc",
    level: "HSK 1",
    icon: "diversity_3",
    coverClass: "from-amber-100 via-orange-50 to-yellow-50",
    accentClass: "bg-amber-500",
    textClass: "text-amber-700",
    cards: [
      { hanzi: "爸爸", pinyin: "Ba ba", vietnamese: "Bo / Ba", example: "我爸爸爱我。", exampleVi: "Bo rat yeu con.", strokes: 13, radical: "父", tip: "Tu de be goi ba that than thuong." },
      { hanzi: "妈妈", pinyin: "Ma ma", vietnamese: "Me / Ma", example: "我妈妈很温柔。", exampleVi: "Me rat diu dang.", strokes: 13, radical: "女", tip: "Be thuong hoc tu nay rat nhanh vi gan gui moi ngay." },
      { hanzi: "哥哥", pinyin: "Ge ge", vietnamese: "Anh trai", example: "我哥哥和我一起玩。", exampleVi: "Anh trai choi cung con.", strokes: 20, radical: "口", tip: "Dung khi goi anh trai lon hon minh." },
      { hanzi: "妹妹", pinyin: "Mei mei", vietnamese: "Em gai", example: "我妹妹很可爱。", exampleVi: "Em be rat dang yeu.", strokes: 16, radical: "女", tip: "Tu nay giup be goi dung thanh vien trong nha." },
    ],
  },
  {
    id: 3,
    title: "Mau sac",
    subtitle: "Tu vung HSK 2 · Mieu ta",
    level: "HSK 2",
    icon: "palette",
    coverClass: "from-sky-100 via-cyan-50 to-blue-50",
    accentClass: "bg-sky-600",
    textClass: "text-sky-700",
    cards: [
      { hanzi: "红色", pinyin: "Hong se", vietnamese: "Mau do", example: "她穿了一件红色的裙子。", exampleVi: "Co ay mac mot chiec vay mau do.", strokes: 15, radical: "红", tip: "Mau may man trong van hoa Trung Hoa." },
      { hanzi: "蓝色", pinyin: "Lan se", vietnamese: "Mau xanh duong", example: "天空是蓝色的。", exampleVi: "Bau troi mau xanh duong.", strokes: 21, radical: "蓝", tip: "Nghi den bau troi de nho." },
      { hanzi: "黄色", pinyin: "Huang se", vietnamese: "Mau vang", example: "这朵花是黄色的。", exampleVi: "Bong hoa nay mau vang.", strokes: 17, radical: "黄", tip: "Mau sac de nhan dien nhanh." },
      { hanzi: "绿色", pinyin: "Lu se", vietnamese: "Mau xanh la", example: "树叶是绿色的。", exampleVi: "La cay co mau xanh la.", strokes: 17, radical: "绿", tip: "Lien tuong toi cay co." },
    ],
  },
  {
    id: 4,
    title: "Mua sam",
    subtitle: "Tu vung HSK 2 · Thuong mai",
    level: "HSK 2",
    icon: "shopping_bag",
    coverClass: "from-indigo-100 via-violet-50 to-indigo-50",
    accentClass: "bg-indigo-600",
    textClass: "text-indigo-700",
    cards: [
      { hanzi: "多少钱", pinyin: "Duo shao qian", vietnamese: "Bao nhieu tien?", example: "这件衣服多少钱？", exampleVi: "Cai ao nay bao nhieu tien?", strokes: 0, radical: "钱", tip: "Cau hoi quan trong khi di mua sam." },
      { hanzi: "便宜", pinyin: "Pian yi", vietnamese: "Re", example: "这里的东西很便宜。", exampleVi: "Do o day rat re.", strokes: 14, radical: "便", tip: "Chi muc gia de chiu." },
      { hanzi: "贵", pinyin: "Gui", vietnamese: "Dat", example: "这个包太贵了。", exampleVi: "Cai tui nay qua dat.", strokes: 12, radical: "贝", tip: "Lien quan den tien bac." },
      { hanzi: "买", pinyin: "Mai", vietnamese: "Mua", example: "我想买一本书。", exampleVi: "Toi muon mua mot quyen sach.", strokes: 6, radical: "乙", tip: "Dong tu chi hanh dong mua hang." },
    ],
  },
  {
    id: 5,
    title: "Thanh ngu HSK 4",
    subtitle: "Thanh ngu · Nang cao",
    level: "HSK 4",
    icon: "auto_stories",
    coverClass: "from-rose-100 via-pink-50 to-rose-50",
    accentClass: "bg-rose-600",
    textClass: "text-rose-700",
    cards: [
      { hanzi: "一石二鸟", pinyin: "Yi shi er niao", vietnamese: "Mot mui ten trung hai dich", example: "这个计划真是一石二鸟。", exampleVi: "Ke hoach nay that la mot mui ten trung hai dich.", strokes: 0, radical: "石", tip: "Lam mot viec dat hai ket qua." },
      { hanzi: "马到成功", pinyin: "Ma dao cheng gong", vietnamese: "Thanh cong ngay lap tuc", example: "祝你马到成功！", exampleVi: "Chuc ban thanh cong ngay lap tuc!", strokes: 0, radical: "马", tip: "Loi chuc pho bien." },
      { hanzi: "半途而废", pinyin: "Ban tu er fei", vietnamese: "Bo cuoc giua chung", example: "做事不能半途而废。", exampleVi: "Lam viec khong duoc bo cuoc giua chung.", strokes: 0, radical: "途", tip: "Nho kien tri den cuoi." },
    ],
  },
  {
    id: 6,
    title: "Han tu HSK 6",
    subtitle: "Han tu nang cao · Cap do 6",
    level: "HSK 6",
    icon: "workspace_premium",
    coverClass: "from-slate-800 via-indigo-800 to-blue-800",
    accentClass: "bg-slate-900",
    textClass: "text-slate-100",
    cards: [
      { hanzi: "瞬息万变", pinyin: "Shun xi wan bian", vietnamese: "Thay doi chop nhoang", example: "市场瞬息万变，我们要随机应变。", exampleVi: "Thi truong thay doi rat nhanh, ta phai linh hoat.", strokes: 0, radical: "瞬", tip: "Dien ta su thay doi rat nhanh." },
      { hanzi: "举足轻重", pinyin: "Ju zu qing zhong", vietnamese: "Co tam anh huong lon", example: "他在公司里举足轻重。", exampleVi: "Anh ay co anh huong lon trong cong ty.", strokes: 0, radical: "举", tip: "Chi vi tri quan trong." },
      { hanzi: "叹为观止", pinyin: "Tan wei guan zhi", vietnamese: "Tuyet voi den muc than phuc", example: "这幅画真是叹为观止。", exampleVi: "Buc tranh nay that su rat an tuong.", strokes: 0, radical: "叹", tip: "Dung de khen dieu rat xuat sac." },
    ],
  },
];

const FILTERS = ["Tat ca", "HSK 1", "HSK 2", "HSK 4", "HSK 6"];

function DeckCard({ deck, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full max-w-[520px] overflow-hidden rounded-[22px] border border-slate-200 bg-white text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${deck.coverClass} px-4 py-3`}>
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/25" />
        <div className="absolute bottom-2 right-4 h-16 w-16 rounded-full border border-white/20" />
        <div className="relative z-10 flex items-start justify-between">
          <span className={`rounded-full border border-white/70 bg-white/60 px-2.5 py-1 text-[11px] font-bold ${deck.textClass}`}>{deck.level}</span>
          <span className="rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-bold text-white">{deck.cards.length} the</span>
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/40 text-slate-800 shadow-lg backdrop-blur-sm">
            <span className="material-symbols-outlined text-[30px]">{deck.icon}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[1.45rem] font-black leading-tight tracking-tight text-slate-900">{deck.title}</h3>
            <p className="mt-1 text-sm leading-5 text-slate-500">{deck.subtitle}</p>
          </div>
          <span className={`mt-1 h-2.5 w-2.5 rounded-full ${deck.accentClass}`} />
        </div>

        <div className="mt-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[13px] text-slate-500">
            <span className="material-symbols-outlined text-[16px] text-primary">style</span>
            {deck.cards.length} flashcard
          </div>
          <span className="text-[15px] font-bold text-primary transition group-hover:translate-x-1">Hoc ngay</span>
        </div>
      </div>
    </button>
  );
}

export default function FlashCard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tat ca");

  const filteredDecks = useMemo(() => {
    return DECKS.filter((deck) => {
      const bySearch = `${deck.title} ${deck.subtitle}`.toLowerCase().includes(search.toLowerCase());
      const byFilter = filter === "Tat ca" || deck.level === filter;
      return bySearch && byFilter;
    });
  }, [filter, search]);

  const groupedDecks = useMemo(() => {
    if (filter !== "Tat ca") return [{ label: filter, decks: filteredDecks }];

    return ["HSK 1", "HSK 2", "HSK 4", "HSK 6"]
      .map((level) => ({ label: level, decks: filteredDecks.filter((deck) => deck.level === level) }))
      .filter((group) => group.decks.length > 0);
  }, [filter, filteredDecks]);

  const totalCards = DECKS.reduce((sum, deck) => sum + deck.cards.length, 0);

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 xl:px-8">
          <main className="min-w-0">
            <section className="overflow-hidden rounded-[36px] bg-gradient-to-br from-primary via-[#313ea0] to-[#4150b8] text-white shadow-[0_20px_80px_rgba(49,62,160,0.25)]">
              <div className="relative overflow-hidden px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
                <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-white/5" />
                <div className="absolute right-14 top-8 h-48 w-48 rounded-full bg-white/5" />
                <div className="absolute bottom-0 left-1/4 h-44 w-44 rounded-full bg-white/5" />
                <div className="absolute bottom-8 right-1/4 h-52 w-52 rounded-full bg-white/5" />

                <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-secondary backdrop-blur-sm">
                    <span className="material-symbols-outlined text-base">style</span>
                    Flashcard tieng Trung
                  </div>
                  <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    Hoc tu vung hieu qua,
                    <span className="block text-secondary">nho lau hon</span>
                  </h1>
                  <p className="mt-5 text-lg text-white/70">
                    {DECKS.length} bo the · {totalCards} flashcard · Phu het HSK 1-6
                  </p>

                  <div className="mt-10 w-full max-w-xl">
                    <label className="group flex items-center gap-3 rounded-[22px] bg-white px-5 py-4 shadow-2xl shadow-slate-950/15">
                      <span className="material-symbols-outlined text-slate-400 transition group-focus-within:text-primary">search</span>
                      <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Tim bo the theo ten..."
                        className="w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <section className="sticky top-24 z-30 mt-6 rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {FILTERS.map((item) => {
                    const isActive = item === filter;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setFilter(item)}
                        className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                          isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-primary"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
                <p className="text-sm font-medium text-slate-400">{filteredDecks.length} bo the</p>
              </div>

              <div className="grid gap-4 border-t border-slate-100 px-6 py-5 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { icon: "style", value: DECKS.length, label: "Tong bo the" },
                  { icon: "layers", value: totalCards, label: "Tong flashcard" },
                  { icon: "workspace_premium", value: "HSK 1-6", label: "Cap do" },
                  { icon: "auto_awesome", value: "100%", label: "Mien phi" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-2xl font-black tracking-tight text-slate-900">{item.value}</p>
                      <p className="text-sm text-slate-400">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8 space-y-10">
              {filteredDecks.length === 0 ? (
                <div className="rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <span className="material-symbols-outlined text-[32px]">search_off</span>
                  </div>
                  <h2 className="mt-5 text-2xl font-black text-slate-900">Khong tim thay bo the nao</h2>
                  <p className="mt-2 text-slate-500">Thu doi tu khoa tim kiem hoac chuyen bo loc HSK.</p>
                </div>
              ) : (
                groupedDecks.map((group) => (
                  <div key={group.label}>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-8 w-1.5 rounded-full bg-primary" />
                      <h2 className="text-3xl font-black tracking-tight text-slate-900">{group.label}</h2>
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                        {group.decks.length} bo
                      </span>
                    </div>

                      <div className="grid max-w-[980px] justify-start gap-6 md:grid-cols-[repeat(2,minmax(0,300px))]">
                      {group.decks.map((deck) => (
                        <DeckCard
                          key={deck.id}
                          deck={deck}
                          onClick={() => navigate(`/flashcard/session?deck=${deck.id}`)}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
