import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toxiLogo from "../../../assets/image/LOGO (1).png";

const EXAM_INFO = {
  title: "De thi HSK",
  hsk: "HSK",
  totalTime: 105 * 60,
  sections: [
    { id: "nghe", label: "Nghe (听)", icon: "hearing" },
    { id: "doc", label: "Doc (读)", icon: "menu_book" },
    { id: "viet", label: "Viet (写)", icon: "edit_note" },
  ],
};

const SECTION_STYLES = {
  nghe: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-800",
    dot: "bg-blue-500",
    header: "bg-blue-600",
  },
  doc: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-800",
    dot: "bg-violet-500",
    header: "bg-violet-600",
  },
  viet: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-800",
    dot: "bg-orange-500",
    header: "bg-orange-600",
  },
};

function buildFileUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `http://localhost:8080/api/files/${encodeURIComponent(path)}`;
}

function sectionLabel(skill) {
  if (skill === "nghe") return "Nghe (听)";
  if (skill === "doc") return "Doc (读)";
  if (skill === "viet") return "Viet (写)";
  return skill;
}

function mapQuestion(raw, index) {
  const questionType = raw.questionType || "abcd-doan";
  const quizOptions = raw.quizOptions || [];
  const subQuestions = raw.subQuestions || [];
  const correctOption = quizOptions.find((option) => option.isCorrect);

  return {
    id: raw.quizQuestionId,
    order: index + 1,
    type: questionType,
    content: raw.content || "",
    pinyin: raw.pinyin || "",
    section: raw.skill?.toLowerCase() || "doc",
    sectionLabel: sectionLabel(raw.skill?.toLowerCase()),
    passage: raw.passage || "",
    image: buildFileUrl(raw.imageUrl),
    audio: buildFileUrl(raw.audioUrl),
    meaning: raw.meaning || "",
    explanation: raw.explanation || "",
    correctOrder: raw.correctOrder || "",
    hints: questionType === "dien-tu" ? quizOptions.map((option) => option.content).filter(Boolean) : [],
    words:
      questionType === "sap-xep" || questionType === "sap-xep-viet"
        ? quizOptions.map((option) => option.content).filter(Boolean)
        : [],
    answers: quizOptions.map((option, optionIndex) => ({
      id: option.quizOptionId ?? `${raw.quizQuestionId}-${optionIndex}`,
      content: option.content || "",
      imageUrl: buildFileUrl(option.imageUrl),
      isCorrect: !!option.isCorrect,
      optionOrder: option.optionOrder ?? optionIndex + 1,
      letter: String.fromCharCode(65 + optionIndex),
    })),
    subQuestions: subQuestions.map((item, subIndex) => ({
      id: item.subQuestionId ?? `${raw.quizQuestionId}-sub-${subIndex}`,
      content: item.content || "",
      audioUrl: buildFileUrl(item.audioUrl),
      correctAnswer: item.correctAnswer || "",
      questionOrder: item.questionOrder ?? subIndex + 1,
    })),
    fillAnswer: correctOption?.content || "",
  };
}

function getQuestionSpan(question) {
  if (question.type === "gop-anh" || question.type === "gop-cau" || question.type === "gop-van") {
    return question.subQuestions?.length || 1;
  }
  return 1;
}

function getQuestionAnsweredCount(question, answers, textAnswers) {
  if (question.type === "gop-anh" || question.type === "gop-cau" || question.type === "gop-van") {
    const selectedMap = answers[question.id];
    if (!selectedMap || typeof selectedMap !== "object") return 0;
    return question.subQuestions.filter((item) => selectedMap[item.id]).length;
  }

  if (textAnswers[question.id]?.trim()) return 1;
  if (answers[question.id] !== undefined) return 1;
  return 0;
}

function buildQuestionNavItems(question) {
  const span = getQuestionSpan(question);
  return Array.from({ length: span }, (_, index) => ({
    id: `${question.id}-${index}`,
    questionId: question.id,
    number: (question.displayStart || question.order) + index,
  }));
}

function AudioBar({ src }) {
  if (!src) return null;
  return (
    <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <audio controls className="w-full">
        <source src={src} />
      </audio>
    </div>
  );
}

function AnswerOpt({ label, text, selected, onClick, isImage, imageSrc }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-3 p-3 rounded-xl border-2 transition group ${
        selected ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/40 hover:bg-slate-50"
      }`}
    >
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition ${
          selected ? "bg-primary text-white" : "bg-slate-100 text-slate-600 group-hover:bg-primary/10"
        }`}
      >
        {label}
      </div>
      {isImage ? (
        <div className={`flex-1 overflow-hidden rounded-lg border ${selected ? "border-primary/30" : "border-slate-200"}`}>
          <img src={imageSrc} alt={label} className="w-full h-28 object-cover" />
        </div>
      ) : (
        <div className="flex-1">
          <span className={`text-sm ${selected ? "text-primary font-semibold" : "text-slate-700"}`}>{text}</span>
        </div>
      )}
      {selected && <span className="material-symbols-outlined text-primary text-base ml-auto flex-shrink-0">check_circle</span>}
    </button>
  );
}

function MatchingBlock({ question, answers, value, onChange }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
      <p className="text-sm font-semibold text-slate-800 mb-3">{question.content}</p>
      {question.audioUrl && <AudioBar src={question.audioUrl} />}
      <div className="grid grid-cols-5 gap-2">
        {answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => onChange(answer.letter)}
            className={`rounded-lg border px-3 py-2 text-sm font-bold transition ${
              value === answer.letter
                ? "border-primary bg-primary text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-primary/40"
            }`}
          >
            {answer.letter}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReadTrueFalseCard({ question, answerValue, setAnswer }) {
  const imageAnswer = question.answers.find((answer) => answer.isCorrect || answer.imageUrl) || question.answers[0];

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-4 md:p-5">
      <div className="grid gap-4 md:grid-cols-[320px_minmax(0,1fr)] md:items-center">
        <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-slate-50">
          {question.image || imageAnswer?.imageUrl ? (
            <img
              src={question.image || imageAnswer?.imageUrl}
              alt="question"
              className="h-[220px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[220px] items-center justify-center text-sm text-slate-400">Khong co anh</div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-[24px] bg-slate-50 px-5 py-4">
            <p className="text-base font-semibold leading-relaxed text-slate-900">{question.content}</p>
            {question.pinyin && <p className="mt-1 text-sm italic text-slate-400">{question.pinyin}</p>}
          </div>

          <div className="grid gap-3">
            {question.answers.map((answer, index) => {
              const isSelected = answerValue === answer.id;
              const isTrue = index === 0;
              return (
                <button
                  key={answer.id}
                  onClick={() => setAnswer(question.id, answer.id)}
                  className={`flex items-center justify-between rounded-[20px] border px-5 py-4 text-left transition ${
                    isSelected
                      ? isTrue
                        ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                        : "border-red-400 bg-red-50 text-red-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl text-xl ${
                        isSelected ? "bg-white/80" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {isTrue ? "✓" : "✕"}
                    </span>
                    <div>
                      <p className="text-base font-bold">{answer.content}</p>
                    </div>
                  </div>
                  {isSelected && <span className="material-symbols-outlined">check_circle</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SortWritingCard({ question, textAnswer, setTextAnswer }) {
  const selectedWords = (textAnswer || "")
    .split("|||")
    .map((item) => item.trim())
    .filter(Boolean);

  function addWord(word, index) {
    const nextWords = [...selectedWords, `${word}__IDX__${index}`];
    setTextAnswer(question.id, nextWords.join("|||"));
  }

  function removeWord(indexToRemove) {
    const nextWords = selectedWords.filter((_, index) => index !== indexToRemove);
    setTextAnswer(question.id, nextWords.join("|||"));
  }

  function resetWords() {
    setTextAnswer(question.id, "");
  }

  const usedIndexes = selectedWords
    .map((item) => {
      const parts = item.split("__IDX__");
      return Number(parts[1]);
    })
    .filter((value) => !Number.isNaN(value));

  const selectedLabels = selectedWords.map((item) => item.split("__IDX__")[0]);
  const previewSentence = selectedLabels.join(" ");

  return (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-slate-800">Sap xep cac tu thanh cau dung</p>
            <p className="text-xs text-slate-500">Bam vao tung tu de ghep cau, bam vao tu da chon de xoa.</p>
          </div>
          <button
            type="button"
            onClick={resetWords}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-primary/30 hover:text-primary"
          >
            Lam lai
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {question.words.map((word, index) => {
            const disabled = usedIndexes.includes(index);
            return (
              <button
                key={`${word}-${index}`}
                type="button"
                disabled={disabled}
                onClick={() => addWord(word, index)}
                className={`rounded-2xl border px-4 py-2 text-sm font-bold transition ${
                  disabled
                    ? "cursor-not-allowed border-slate-100 bg-slate-100 text-slate-300"
                    : "border-slate-200 bg-white text-slate-700 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[24px] border border-dashed border-primary/30 bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">edit_note</span>
          <p className="text-sm font-bold text-slate-800">Cau ban dang ghep</p>
        </div>

        {selectedLabels.length > 0 ? (
          <>
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedLabels.map((word, index) => (
                <button
                  key={`${word}-${index}`}
                  type="button"
                  onClick={() => removeWord(index)}
                  className="rounded-2xl bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary/90"
                >
                  {word}
                </button>
              ))}
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-base font-semibold text-slate-800">{previewSentence}</div>
          </>
        ) : (
          <div className="rounded-2xl bg-slate-50 px-4 py-6 text-sm text-slate-400">Chua co tu nao duoc chon.</div>
        )}
      </div>

    </div>
  );
}

function ReadImageMatching({ question, answerValue, setAnswer }) {
  const selectedMap = answerValue || {};

  return (
    <div className="space-y-5">
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 md:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-slate-900">Cau {question.order}</p>
            <p className="text-sm text-slate-500">Chon anh phu hop voi tung cau ben duoi</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {question.answers.map((answer) => (
            <div key={answer.id} className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700">
                  {answer.letter}
                </span>
              </div>
              <div className="overflow-hidden rounded-2xl bg-slate-50">
                {answer.imageUrl ? (
                  <img src={answer.imageUrl} alt={answer.letter} className="h-36 w-full object-cover" />
                ) : (
                  <div className="flex h-36 items-center justify-center text-sm text-slate-400">Khong co anh</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-4 md:p-5">
        <div className="space-y-3">
          {question.subQuestions.map((item, index) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-[22px] border border-slate-200 p-4 md:grid-cols-[52px_minmax(0,1fr)_320px] md:items-center"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-black text-white">
                {index + 1}
              </div>

              <div className="min-w-0">
                <p className="text-base font-medium leading-relaxed text-slate-900">{item.content}</p>
                {item.audioUrl && <div className="mt-2"><AudioBar src={item.audioUrl} /></div>}
              </div>

              <div className="grid grid-cols-5 gap-2">
                {question.answers.map((answer) => {
                  const isSelected = selectedMap[item.id] === answer.letter;
                  return (
                    <button
                      key={`${item.id}-${answer.letter}`}
                      onClick={() => setAnswer(question.id, { ...selectedMap, [item.id]: answer.letter })}
                      className={`h-12 rounded-2xl text-base font-black transition ${
                        isSelected
                          ? "bg-primary text-white shadow-md"
                          : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-primary/40 hover:bg-white"
                      }`}
                    >
                      {answer.letter}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MatchingExamBlock({ question, answerValue, setAnswer, title }) {
  const selectedMap = answerValue || {};
  const hasImageAnswers = question.answers.some((answer) => answer.imageUrl);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xl font-bold text-slate-900">{title}</p>
          <p className="text-sm text-slate-500">Chon dap an A-E cho tung cau ben duoi</p>
        </div>
      </div>

      <div className="mb-5 rounded-[24px] border border-slate-100 bg-slate-50/70 px-4 py-4">
        {hasImageAnswers ? (
          <div className="grid gap-4 md:grid-cols-5">
            {question.answers.map((answer) => (
              <div key={answer.id} className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700">
                    {answer.letter}
                  </span>
                </div>
                <div className="overflow-hidden rounded-2xl bg-slate-50">
                  {answer.imageUrl ? (
                    <img src={answer.imageUrl} alt={answer.letter} className="h-36 w-full object-cover" />
                  ) : (
                    <div className="flex h-36 items-center justify-center text-sm text-slate-400">Khong co anh</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-5">
            {question.answers.map((answer) => (
              <div key={answer.id} className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700">
                    {answer.letter}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-800">{answer.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        {question.subQuestions.map((item, index) => (
          <div
            key={item.id}
            className="grid gap-3 rounded-[20px] border border-slate-200 px-4 py-3 md:grid-cols-[minmax(0,1fr)_280px] md:items-center"
          >
            <div className="min-w-0">
              <p className="text-base leading-relaxed text-slate-900">
                <span className="mr-2 font-black text-slate-700">{(question.displayStart || question.order) + index}.</span>
                {item.content}
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {question.answers.map((answer) => {
                const isSelected = selectedMap[item.id] === answer.letter;
                return (
                  <button
                    key={`${item.id}-${answer.letter}`}
                    onClick={() => setAnswer(question.id, { ...selectedMap, [item.id]: answer.letter })}
                    className={`h-12 rounded-2xl text-base font-black transition ${
                      isSelected
                        ? "bg-primary text-white shadow-md"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    }`}
                  >
                    {answer.letter}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderQuestionBody(question, answerValue, setAnswer, textAnswer, setTextAnswer) {
  const hasImageAnswers = question.answers.some((answer) => answer.imageUrl);

  if (question.type === "dung-sai-anh") {
    return <ReadTrueFalseCard question={question} answerValue={answerValue} setAnswer={setAnswer} />;
  }

  if (question.type === "gop-anh") {
    return (
      <MatchingExamBlock
        question={question}
        answerValue={answerValue}
        setAnswer={setAnswer}
        title={`Cau ${question.displayStart || question.order} - ${question.displayEnd || question.order}`}
      />
    );
  }

  if (question.type === "gop-cau") {
    return (
      <MatchingExamBlock
        question={question}
        answerValue={answerValue}
        setAnswer={setAnswer}
        title={`Cau ${question.displayStart || question.order} - ${question.displayEnd || question.order}`}
      />
    );
  }

  if (question.type === "gop-van") {
    return (
      <MatchingExamBlock
        question={question}
        answerValue={answerValue}
        setAnswer={setAnswer}
        title={`Cau ${question.displayStart || question.order} - ${question.displayEnd || question.order}`}
      />
    );
  }

  if (question.type === "viet-doan") {
    return (
      <div>
        <textarea
          value={textAnswer || ""}
          onChange={(e) => setTextAnswer(question.id, e.target.value)}
          placeholder="Viet cau tra loi cua ban tai day..."
          rows={5}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
        />
      </div>
    );
  }

  if (question.type === "sap-xep-viet" || question.type === "sap-xep") {
    return <SortWritingCard question={question} textAnswer={textAnswer} setTextAnswer={setTextAnswer} />;
  }

  if (question.answers.length > 0) {
    return (
      <div className={`space-y-2 ${hasImageAnswers ? "grid grid-cols-1 md:grid-cols-3 gap-3" : ""}`}>
        {question.answers.map((answer) => (
          <AnswerOpt
            key={answer.id}
            label={answer.letter}
            text={answer.content}
            isImage={!!answer.imageUrl}
            imageSrc={answer.imageUrl}
            selected={answerValue === answer.id}
            onClick={() => setAnswer(question.id, answer.id)}
          />
        ))}
      </div>
    );
  }

  return <p className="text-sm text-slate-500">Dang cau hoi nay chua du du lieu de hien thi dap an.</p>;
}

export default function ExamMain() {
  const navigate = useNavigate();
  const { id } = useParams();
  const questionRefs = useRef({});
  const [answers, setAnswers] = useState({});
  const [textAnswers, setTextAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_INFO.totalTime);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeSection, setActiveSection] = useState("nghe");
  const [quizMeta, setQuizMeta] = useState({ title: EXAM_INFO.title, hsk: EXAM_INFO.hsk, timeLimit: 105 });
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/quizzes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("API loi");
        return res.json();
      })
      .then((data) => {
        const source = data.data || {};
        const rawQuestions = source.questions || [];
        const mappedQuestions = rawQuestions.map(mapQuestion);
        let runningNumber = 1;
        const numberedQuestions = mappedQuestions.map((question) => {
          const span = getQuestionSpan(question);
          const displayStart = runningNumber;
          const displayEnd = runningNumber + span - 1;
          runningNumber += span;

          return {
            ...question,
            displayStart,
            displayEnd,
          };
        });

        setQuizMeta({
          title: source.title || EXAM_INFO.title,
          hsk: source.hsklevel ? `HSK ${source.hsklevel}` : EXAM_INFO.hsk,
          timeLimit: source.timeLimit || 105,
        });
        setTimeLeft((source.timeLimit || 105) * 60);
        setQuestions(numberedQuestions);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((seconds) => (seconds > 0 ? seconds - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const answered = useMemo(
    () => questions.reduce((sum, question) => sum + getQuestionAnsweredCount(question, answers, textAnswers), 0),
    [questions, answers, textAnswers]
  );
  const total = useMemo(() => questions.reduce((sum, question) => sum + getQuestionSpan(question), 0), [questions]);
  const fmtTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const timeColor = timeLeft < 300 ? "text-red-500" : timeLeft < 600 ? "text-amber-500" : "text-primary";

  const questionsBySection = useMemo(
    () =>
      EXAM_INFO.sections.map((section) => ({
        ...section,
        questions: questions.filter((question) => question.section === section.id),
      })),
    [questions]
  );

  function setAnswer(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function setTextAnswer(questionId, value) {
    setTextAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function scrollTo(questionId) {
    questionRefs.current[questionId]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const question = questions.find((item) => item.id === Number(entry.target.dataset.qid));
          if (question) setActiveSection(question.section);
        }),
      { threshold: 0.45 }
    );

    Object.values(questionRefs.current).forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, [questions]);

  async function handleSubmit() {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        quizId: Number(id),
        answers: Object.entries(answers)
          .filter(([, value]) => typeof value !== "object")
          .map(([questionId, selectedOptionId]) => ({
            quizQuestionId: Number(questionId),
            selectedOptionId,
          })),
        timeSpent: Math.max(0, quizMeta.timeLimit * 60 - timeLeft),
      };

      const res = await fetch("http://localhost:8080/api/exam/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("API ERROR:", text);
        throw new Error("Submit loi");
      }

      const data = await res.json();
      alert("Nop bai thanh cong!");
      navigate(`/result/${data.data.quizResultsId}`);
    } catch (err) {
      console.error(err);
      alert("Nop bai that bai!");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <header className="sticky top-0 z-50 bg-primary text-white shadow-xl flex-shrink-0">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 h-14 flex items-center gap-4">
          <Link to="/home" className="flex items-center gap-2.5 flex-shrink-0">
            <img src={toxiLogo} alt="TOXI" className="h-9 w-9 rounded-xl" />
            <div>
              <p className="text-sm font-black tracking-tight leading-none">TOXI</p>
              <p className="text-[8px] text-secondary uppercase tracking-widest leading-none">学以致用</p>
            </div>
          </Link>

          <div className="h-5 w-px bg-white/20" />

          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white/80 truncate">{quizMeta.title}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-secondary/30 text-secondary rounded-md">{quizMeta.hsk}</span>
              <span className="text-[10px] text-white/60">{total} cau hoi</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-[10px] text-white/60">Tien do</p>
              <p className="text-xs font-bold">
                {answered}/{total} cau
              </p>
            </div>
            <div className="w-28 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full transition-all" style={{ width: total ? `${Math.round((answered / total) * 100)}%` : "0%" }} />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-1.5 flex-shrink-0">
            <span className="material-symbols-outlined text-base text-secondary">timer</span>
            <span className={`font-mono font-black text-lg ${timeLeft < 300 ? "text-red-300" : timeLeft < 600 ? "text-amber-300" : "text-white"}`}>
              {fmtTime(timeLeft)}
            </span>
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary font-black text-sm rounded-xl hover:bg-secondary/90 transition shadow-lg flex-shrink-0"
          >
            <span className="material-symbols-outlined text-base">send</span>Nop bai
          </button>

          <button onClick={() => navigate("/Practice")} className="p-2 rounded-xl hover:bg-white/10 transition text-white/70 hover:text-white flex-shrink-0">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </header>

      <div className="sticky top-14 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-0">
            {questionsBySection.map((section) => {
              const count = section.questions.reduce((sum, question) => sum + getQuestionSpan(question), 0);
              const done = section.questions.reduce((sum, question) => sum + getQuestionAnsweredCount(question, answers, textAnswers), 0);
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    scrollTo(section.questions[0]?.id);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition ${
                    isActive ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <span className={`material-symbols-outlined text-base ${isActive ? "text-primary" : ""}`}>{section.icon}</span>
                  {section.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-md font-bold ${isActive ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"}`}>
                    {done}/{count}
                  </span>
                </button>
              );
            })}
            <div className="flex-1" />
            <span className="text-xs text-slate-400 px-4">Cuon xuong de xem tat ca cau hoi</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-screen-2xl mx-auto w-full px-4 md:px-6 py-5 grid grid-cols-12 gap-5 items-start">
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {questionsBySection.map((section) => {
            const styles = SECTION_STYLES[section.id];
            const doneCount = section.questions.reduce((sum, question) => sum + getQuestionAnsweredCount(question, answers, textAnswers), 0);
            const sectionTotal = section.questions.reduce((sum, question) => sum + getQuestionSpan(question), 0);

            return (
              <div key={section.id}>
                <div className={`flex items-center gap-3 px-5 py-3 ${styles.bg} border ${styles.border} rounded-2xl mb-3`}>
                  <div className={`w-8 h-8 ${styles.header} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <span className="material-symbols-outlined text-white text-base">{section.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{section.label}</p>
                    <p className="text-xs text-slate-500">{sectionTotal} cau hoi</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      {doneCount}/{sectionTotal} da lam
                    </span>
                    <div className="w-20 h-1.5 bg-white/60 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${styles.dot} rounded-full transition-all`}
                        style={{ width: sectionTotal ? `${Math.round((doneCount / sectionTotal) * 100)}%` : "0%" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {section.questions.map((question) => {
                    const answerValue = answers[question.id];
                    const isDone = getQuestionAnsweredCount(question, answers, textAnswers) >= getQuestionSpan(question);

                    return (
                      <div
                        key={question.id}
                        data-qid={question.id}
                        ref={(element) => {
                          questionRefs.current[question.id] = element;
                        }}
                        className={`bg-white rounded-2xl border-2 overflow-hidden transition ${isDone ? styles.border : "border-slate-200"}`}
                      >
                        <div className={`flex items-center justify-between px-5 py-3 ${isDone ? styles.bg : "bg-slate-50"} border-b ${isDone ? styles.border : "border-slate-200"}`}>
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${isDone ? `${styles.header} text-white` : "bg-slate-200 text-slate-600"}`}>
                              {question.displayStart || question.order}
                            </div>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${styles.badge}`}>{question.sectionLabel}</span>
                            <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-500">{question.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {isDone ? <span className={`material-symbols-outlined text-base ${styles.dot.replace("bg-", "text-")}`}>check_circle</span> : <span className="text-xs text-slate-400">Chua lam</span>}
                          </div>
                        </div>

                        <div className="p-5">
                          {question.audio && <AudioBar src={question.audio} />}

                          {question.passage && (
                            <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                              <p className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line">{question.passage}</p>
                            </div>
                          )}

                       {question.image && question.type !== "dung-sai-anh" && (
  <div className="mb-4 flex justify-center">
    <img
      src={question.image}
      alt="question"
      className="rounded-xl max-h-60 object-cover border border-slate-200"
    />
  </div>
)}


                          {question.words.length > 0 && question.type !== "sap-xep-viet" && question.type !== "sap-xep" && (
                            <div className="mb-4 flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                              {question.words.map((word, index) => (
                                <span key={`${word}-${index}`} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm">
                                  {word}
                                </span>
                              ))}
                            </div>
                          )}

                          {question.hints.length > 0 && (
                            <div className="mb-4 flex gap-2 flex-wrap">
                              <span className="text-xs text-slate-500 font-semibold self-center">Goi y:</span>
                              {question.hints.map((hint, index) => (
                                <span key={`${hint}-${index}`} className="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs font-medium text-amber-800">
                                  {hint}
                                </span>
                              ))}
                            </div>
                          )}

                          {question.type !== "sap-xep-viet" && question.type !== "sap-xep" && (
                            <p className="text-sm font-semibold text-slate-800 mb-4 leading-relaxed whitespace-pre-line">
                              {question.content}
                              {question.pinyin && <span className="block text-xs text-slate-400 font-normal italic mt-0.5">{question.pinyin}</span>}
                              {question.meaning && <span className="block text-xs text-slate-500 font-normal mt-1">{question.meaning}</span>}
                            </p>
                          )}

                          {renderQuestionBody(question, answerValue, setAnswer, textAnswers[question.id], setTextAnswer)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
            <p className="text-sm text-slate-600 mb-1">
              Da lam <strong className="text-primary">{answered}/{total}</strong> cau hoi
            </p>
            {answered < total && <p className="text-xs text-amber-600 mb-3">Con {total - answered} cau chua tra loi</p>}
            <button onClick={() => setShowConfirm(true)} className="px-8 py-3 bg-secondary text-primary font-black text-base rounded-2xl hover:bg-secondary/90 transition shadow-lg shadow-secondary/20">
              NOP BAI / 提交
            </button>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-4 sticky top-28 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Thoi gian con lai</p>
            <p className={`font-mono font-black text-4xl ${timeColor}`}>{fmtTime(timeLeft)}</p>
            <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${timeLeft < 300 ? "bg-red-500" : timeLeft < 600 ? "bg-amber-500" : "bg-emerald-500"}`}
                style={{ width: `${Math.round((timeLeft / (quizMeta.timeLimit * 60 || 1)) * 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Danh sach cau hoi</p>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg font-semibold">
                {answered}/{total}
              </span>
            </div>

            <div className="flex gap-3 mb-3 text-[10px] text-slate-500 font-semibold">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-primary inline-block" />
                Dang xem
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
                Da lam
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full border border-slate-300 inline-block" />
                Chua lam
              </span>
            </div>

            {questionsBySection.map((section) => {
              const styles = SECTION_STYLES[section.id];
              const doneCount = section.questions.reduce((sum, question) => sum + getQuestionAnsweredCount(question, answers, textAnswers), 0);
              const sectionTotal = section.questions.reduce((sum, question) => sum + getQuestionSpan(question), 0);
              const navItems = section.questions.flatMap(buildQuestionNavItems);

              return (
                <div key={section.id} className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
                    <p className="text-[11px] font-bold text-slate-600">{section.label}</p>
                    <span className="text-[10px] text-slate-400 ml-auto">
                      {doneCount}/{sectionTotal}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {navItems.map((item) => {
                      const parentQuestion = section.questions.find((question) => question.id === item.questionId);
                      const span = getQuestionSpan(parentQuestion);
                      const answeredCount = getQuestionAnsweredCount(parentQuestion, answers, textAnswers);
                      const isDone =
                        span === 1
                          ? answeredCount >= 1
                          : answeredCount >= item.number - (parentQuestion.displayStart || parentQuestion.order) + 1;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollTo(item.questionId)}
                          className={`h-9 rounded-lg text-xs font-bold transition border ${
                            isDone ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600" : "border-slate-200 text-slate-500 hover:border-primary hover:text-primary"
                          }`}
                        >
                          {item.number}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex gap-2">
              <span className="material-symbols-outlined text-blue-500 flex-shrink-0 text-base">lightbulb</span>
              <p className="text-xs text-blue-700 leading-relaxed">
                <strong>Meo:</strong> Cuon xuong de xem tat ca cau hoi. Bam so cau o bang ben phai de nhay den cau muon lam.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-[pop_.18s_ease]">
            <div className="text-center mb-5">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-amber-600 text-2xl">send</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Xac nhan nop bai</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Ban da hoan thanh <strong className="text-primary">{answered}/{total}</strong> cau hoi.
                {answered < total && (
                  <>
                    <br />
                    <span className="text-amber-600 font-semibold">Con {total - answered} cau chua tra loi!</span>
                  </>
                )}
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 mb-5 text-center">
              <p className="text-xs text-slate-500">Thoi gian con lai</p>
              <p className="font-mono font-black text-xl text-primary">{fmtTime(timeLeft)}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Lam tiep
              </button>
              <button onClick={handleSubmit} className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition">
                Nop bai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
