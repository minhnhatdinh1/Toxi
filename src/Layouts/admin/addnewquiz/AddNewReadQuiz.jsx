import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  QuizSidebar,
  QuizPageHeader,
  QuizRightPanel,
  AnswerOptions,
  ImageSlot,
  inputCls,
  labelCls,
} from "./_QuizShared";
import {
  createQuestion,
  fetchQuestionDetail,
  updateQuestion,
} from "../api/apiquiz";

const TYPES = [
  { value: "dung-sai-anh", label: "Dung sai + anh" },
  { value: "gop-anh", label: "Gop cau anh" },
  { value: "gop-van", label: "Gop cau van" },
  { value: "abcd-doan", label: "A B C D doan" },

  { value: "dien-tu", label: "Dien tu" },
];

const DEFAULT_TRUE_FALSE = ["DUNG (对)", "SAI (错)"];
const DEFAULT_WORDS = ["我", "把", "书", "放在", "桌子", "上"];
const DEFAULT_HINTS = ["从来没有", "已经", "还没", "正在"];
const EMPTY_MATCHING_BY_IMAGE = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  text: "",
  answer: "A",
}));
const EMPTY_MATCHING_BY_TEXT = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  question: "",
  answer: "A",
}));
const EMPTY_MATCH_OPTIONS = ["", "", "", "", ""];

function toStoredFile(value) {
  if (!value) return null;
  if (value instanceof File) return value.name;
  if (typeof value === "string") return value.split("/").pop();
  if (typeof value === "object" && value.url) return value.url.split("/").pop();
  if (typeof value === "object" && value.name) return value.name;
  return null;
}

function normalizeImageValue(value) {
  if (!value) return null;
  if (typeof value === "object" && (value.url || value.name)) return value;
  if (typeof value === "string") {
    return { name: value.split("/").pop(), url: value };
  }
  return value;
}

function normalizeStatus(status) {
  return String(status || "done").toLowerCase();
}

export default function AddNewReadQuiz() {
  const navigate = useNavigate();
  const { quizId, questionId } = useParams();
  const isEdit = !!questionId;

  const [activeType, setActiveType] = useState("dung-sai-anh");
  const [content, setContent] = useState("");
  const [passage, setPassage] = useState("");
  const [pinyin, setPinyin] = useState("");
  const [meaning, setMeaning] = useState("");
  const [explanation, setExplanation] = useState("");
  const [answers, setAnswers] = useState(DEFAULT_TRUE_FALSE);
  const [correct, setCorrect] = useState(0);
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([null, null, null, null, null]);
  const [words, setWords] = useState(DEFAULT_WORDS);
  const [newWord, setNewWord] = useState("");
  const [correctOrder, setCorrectOrder] = useState("");
  const [hints, setHints] = useState(DEFAULT_HINTS);
  const [newHint, setNewHint] = useState("");
  const [fillAnswer, setFillAnswer] = useState("");
  const [form, setForm] = useState({
    hsk: "HSK 1",
    autoGrade: true,
    shuffle: false,
    pinyin: true,
    score: 1,
    seconds: 60,
    status: "done",
  });
  const [subSentences, setSubSentences] = useState(EMPTY_MATCHING_BY_IMAGE);
  const [matchSentences, setMatchSentences] = useState(EMPTY_MATCHING_BY_TEXT);
  const [matchOptions, setMatchOptions] = useState(EMPTY_MATCH_OPTIONS);

  function resetFormKeepType() {
    setContent("");
    setPassage("");
    setPinyin("");
    setMeaning("");
    setExplanation("");
    setAnswers(activeType === "abcd-doan" ? ["", "", "", ""] : DEFAULT_TRUE_FALSE);
    setCorrect(0);
    setMainImage(null);
    setImages([null, null, null, null, null]);
    setWords(DEFAULT_WORDS);
    setNewWord("");
    setCorrectOrder("");
    setHints(DEFAULT_HINTS);
    setNewHint("");
    setFillAnswer("");
    setSubSentences(EMPTY_MATCHING_BY_IMAGE);
    setMatchSentences(EMPTY_MATCHING_BY_TEXT);
    setMatchOptions(EMPTY_MATCH_OPTIONS);
    setForm((prev) => ({ ...prev, score: 1, seconds: 60, status: "done" }));
  }

  function switchType(type) {
    setActiveType(type);
    setContent("");
    setPassage("");
    setPinyin("");
    setMeaning("");
    setExplanation("");
    setMainImage(null);
    setImages([null, null, null, null, null]);
    setWords(DEFAULT_WORDS);
    setCorrectOrder("");
    setHints(DEFAULT_HINTS);
    setFillAnswer("");
    setSubSentences(EMPTY_MATCHING_BY_IMAGE);
    setMatchSentences(EMPTY_MATCHING_BY_TEXT);
    setMatchOptions(EMPTY_MATCH_OPTIONS);

    if (type === "dung-sai-anh") {
      setAnswers(DEFAULT_TRUE_FALSE);
      setCorrect(0);
      return;
    }

    if (type === "abcd-doan") {
      setAnswers(["", "", "", ""]);
      setCorrect(0);
      return;
    }

    setAnswers(DEFAULT_TRUE_FALSE);
    setCorrect(0);
  }

  async function handleSave(andNext = false) {
    const hskLevel = parseInt(String(form.hsk).replace("HSK ", ""), 10) || 1;
    let payload = {
      questionType: activeType,
      skill: "doc",
      hskLevel,
      content: content.trim(),
      passage: passage.trim(),
      pinyin: pinyin.trim(),
      meaning: meaning.trim() || null,
      explanation: explanation.trim(),
      imageUrl: toStoredFile(mainImage),
      correctOrder: correctOrder.trim() || null,
      score: Number(form.score) || 1,
      status: String(form.status || "done").toUpperCase(),
      quizOptions: [],
    };

    if (activeType === "dung-sai-anh") {
      if (!content.trim()) {
        alert("Vui long nhap cau tran thuat.");
        return;
      }

      payload.quizOptions = DEFAULT_TRUE_FALSE.map((option, index) => ({
        content: option,
        imageUrl: null,
        isCorrect: index === correct,
      }));
    }

    if (activeType === "gop-anh") {
      const hasMissingImage = images.some((image) => !image);
      const hasMissingQuestion = subSentences.some((item) => !item.text.trim());

      if (hasMissingImage || hasMissingQuestion) {
        alert("Vui long nhap du 5 anh va 5 cau hoi.");
        return;
      }

      payload.content = "Ghep cau voi anh phu hop";
      payload.quizOptions = images.map((image, index) => ({
        content: String.fromCharCode(65 + index),
        imageUrl: toStoredFile(image),
        optionOrder: index + 1,
        isCorrect: false,
      }));
      payload.subQuestions = subSentences.map((item, index) => ({
        content: item.text.trim(),
        correctAnswer: item.answer,
        questionOrder: index + 1,
      }));
    }

    if (activeType === "gop-van") {
      const hasMissingOption = matchOptions.some((option) => !option.trim());
      const hasMissingQuestion = matchSentences.some((item) => !item.question.trim());

      if (hasMissingOption || hasMissingQuestion) {
        alert("Vui long nhap du 5 cau lua chon va 5 cau hoi.");
        return;
      }

      payload.content = "Ghep cau voi cau phu hop";
      payload.quizOptions = matchOptions.map((option, index) => ({
        content: option.trim(),
        imageUrl: null,
        optionOrder: index + 1,
        isCorrect: false,
      }));
      payload.subQuestions = matchSentences.map((item, index) => ({
        content: item.question.trim(),
        correctAnswer: item.answer,
        questionOrder: index + 1,
      }));
    }

    if (activeType === "abcd-doan") {
      if (!passage.trim() || !content.trim()) {
        alert("Vui long nhap doan van va cau hoi.");
        return;
      }

      if (answers.some((answer) => !answer.trim())) {
        alert("Vui long nhap du 4 dap an.");
        return;
      }

      payload.quizOptions = answers.map((answer, index) => ({
        content: answer.trim(),
        imageUrl: null,
        isCorrect: index === correct,
      }));
    }



    if (activeType === "dien-tu") {
      const uniqueOptions = [...new Set([...hints, fillAnswer].map((item) => item.trim()).filter(Boolean))];

      if (!passage.trim() || !fillAnswer.trim()) {
        alert("Vui long nhap doan van va dap an dung.");
        return;
      }

      payload.content = fillAnswer.trim();
      payload.quizOptions = uniqueOptions.map((option) => ({
        content: option,
        imageUrl: null,
        isCorrect: option === fillAnswer.trim(),
      }));
    }

    try {
      if (isEdit) {
        await updateQuestion(questionId, payload);
      } else {
        await createQuestion(quizId, payload);
      }

      if (andNext && !isEdit) {
        resetFormKeepType();
      } else {
        navigate(`/adminEditQuiz/${quizId}`);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Loi luu cau hoi.");
    }
  }

  useEffect(() => {
    if (!isEdit) return;

    async function loadQuestion() {
      try {
        const res = await fetchQuestionDetail(questionId);
        const q = res.data;

        setActiveType(q.questionType || "dung-sai-anh");
        setContent(q.content || "");
        setPassage(q.passage || "");
        setPinyin(q.pinyin || "");
        setMeaning(q.meaning || "");
        setExplanation(q.explanation || "");
        setCorrectOrder(q.correctOrder || "");
        setForm((prev) => ({
          ...prev,
          hsk: `HSK ${q.hskLevel || 1}`,
          score: q.score || 1,
          status: normalizeStatus(q.status),
        }));

        if (q.questionType === "dung-sai-anh") {
          setMainImage(normalizeImageValue(q.imageUrl));
          if (q.quizOptions?.length) {
            setAnswers(q.quizOptions.map((option) => option.content));
            setCorrect(Math.max(q.quizOptions.findIndex((option) => option.isCorrect), 0));
          } else {
            setAnswers(DEFAULT_TRUE_FALSE);
            setCorrect(0);
          }
        }

        if (q.questionType === "gop-anh") {
          setImages(
            Array.from({ length: 5 }, (_, index) =>
              normalizeImageValue(q.quizOptions?.[index]?.imageUrl || null)
            )
          );
          setSubSentences(
            Array.from({ length: 5 }, (_, index) => ({
              id: index + 1,
              text: q.subQuestions?.[index]?.content || "",
              answer: q.subQuestions?.[index]?.correctAnswer || "A",
            }))
          );
        }

        if (q.questionType === "gop-van") {
          setMatchOptions(
            Array.from({ length: 5 }, (_, index) => q.quizOptions?.[index]?.content || "")
          );
          setMatchSentences(
            Array.from({ length: 5 }, (_, index) => ({
              id: index + 1,
              question: q.subQuestions?.[index]?.content || "",
              answer: q.subQuestions?.[index]?.correctAnswer || "A",
            }))
          );
        }

        if (q.questionType === "abcd-doan") {
          setAnswers(
            q.quizOptions?.length ? q.quizOptions.map((option) => option.content || "") : ["", "", "", ""]
          );
          setCorrect(Math.max(q.quizOptions?.findIndex((option) => option.isCorrect) ?? 0, 0));
        }

        if (q.questionType === "sap-xep") {
          const optionWords = q.quizOptions?.map((option) => option.content).filter(Boolean);
          setWords(optionWords?.length ? optionWords : DEFAULT_WORDS);
          setCorrectOrder(q.correctOrder || "");
        }

        if (q.questionType === "dien-tu") {
          const optionHints = q.quizOptions?.map((option) => option.content).filter(Boolean);
          setHints(optionHints?.length ? optionHints : DEFAULT_HINTS);
          const correctOption = q.quizOptions?.find((option) => option.isCorrect);
          setFillAnswer(correctOption?.content || q.content || "");
        }
      } catch (err) {
        console.error(err);
        alert("Khong tai duoc cau hoi de sua.");
      }
    }

    loadQuestion();
  }, [isEdit, questionId]);

  function addWord() {
    if (newWord.trim()) {
      setWords([...words, newWord.trim()]);
      setNewWord("");
    }
  }

  function removeWord(index) {
    setWords(words.filter((_, itemIndex) => itemIndex !== index));
  }

  function addHint() {
    if (newHint.trim()) {
      setHints([...hints, newHint.trim()]);
      setNewHint("");
    }
  }

  function removeHint(index) {
    setHints(hints.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <QuizSidebar activeType={activeType} skill="doc" quizId={quizId} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <QuizPageHeader
          title={`${isEdit ? "Chinh sua" : "Tao"} cau hoi Doc - ${
            TYPES.find((type) => type.value === activeType)?.label
          }`}
          isEdit={isEdit}
          onCancel={() => navigate(`/adminEditQuiz/${quizId}`)}
          onSaveAndNext={() => handleSave(true)}
          onSaveAndClose={() => handleSave(false)}
        />

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-5 max-w-5xl mx-auto">
            <div className="flex-1 min-w-0 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex gap-1 overflow-x-auto">
                {TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => switchType(type.value)}
                    className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition ${
                      activeType === type.value
                        ? "bg-primary text-white shadow-sm"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {activeType === "dung-sai-anh" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4 items-start">
                    <div>
                      <label className={labelCls}>Anh cau hoi</label>
                      <ImageSlot value={mainImage} onChange={setMainImage} />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className={labelCls}>Cau tran thuat</label>
                        <textarea
                          className={inputCls + " resize-none"}
                          rows={3}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Mo ta anh bang tieng Trung..."
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Pinyin</label>
                        <input
                          className={inputCls}
                          value={pinyin}
                          onChange={(e) => setPinyin(e.target.value)}
                          placeholder="Phien am..."
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Dap an dung</label>
                        <div className="flex gap-2">
                          {DEFAULT_TRUE_FALSE.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => setCorrect(index)}
                              className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                                correct === index
                                  ? index === 0
                                    ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                                    : "border-red-400 bg-red-50 text-red-700"
                                  : "border-slate-200 text-slate-500 hover:bg-slate-50"
                              }`}
                            >
                              <span className="material-symbols-outlined text-sm">
                                {index === 0 ? "check_circle" : "cancel"}
                              </span>
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeType === "gop-anh" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>5 anh lua chon (A - E)</label>
                    <div className="grid grid-cols-5 gap-2">
                      {["A", "B", "C", "D", "E"].map((label, index) => (
                        <div key={index} className="rounded-xl overflow-hidden border border-slate-200">
                          <ImageSlot
                            value={images[index]}
                            onChange={(value) => {
                              const next = [...images];
                              next[index] = value;
                              setImages(next);
                            }}
                          />
                          <div className="bg-slate-50 py-1 text-center">
                            <span className="text-xs font-bold text-slate-500">{label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>5 cau hoi - chon dap an tuong ung</label>
                    <div className="space-y-2">
                      {subSentences.map((sentence, index) => (
                        <div
                          key={sentence.id}
                          className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </div>
                          <input
                            className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                            placeholder={`Cau hoi ${index + 1}...`}
                            value={sentence.text}
                            onChange={(e) => {
                              const next = [...subSentences];
                              next[index] = { ...next[index], text: e.target.value };
                              setSubSentences(next);
                            }}
                          />
                          <select
                            value={sentence.answer}
                            onChange={(e) => {
                              const next = [...subSentences];
                              next[index] = { ...next[index], answer: e.target.value };
                              setSubSentences(next);
                            }}
                            className="border border-slate-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-primary"
                          >
                            {["A", "B", "C", "D", "E"].map((label) => (
                              <option key={label}>{label}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeType === "gop-van" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>5 cau lua chon (A - E)</label>
                    <div className="space-y-2">
                      {["A", "B", "C", "D", "E"].map((label, index) => (
                        <div
                          key={label}
                          className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl"
                        >
                          <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {label}
                          </span>
                          <input
                            className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                            placeholder={`Cau ${label}...`}
                            value={matchOptions[index]}
                            onChange={(e) => {
                              const next = [...matchOptions];
                              next[index] = e.target.value;
                              setMatchOptions(next);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>5 cau hoi - chon dap an A-E</label>
                    <div className="space-y-2">
                      {matchSentences.map((sentence, index) => (
                        <div
                          key={sentence.id}
                          className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </div>
                          <input
                            className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                            placeholder={`Cau hoi ${index + 1}...`}
                            value={sentence.question}
                            onChange={(e) => {
                              const next = [...matchSentences];
                              next[index] = { ...next[index], question: e.target.value };
                              setMatchSentences(next);
                            }}
                          />
                          <select
                            value={sentence.answer}
                            onChange={(e) => {
                              const next = [...matchSentences];
                              next[index] = { ...next[index], answer: e.target.value };
                              setMatchSentences(next);
                            }}
                            className="border border-slate-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-primary"
                          >
                            {["A", "B", "C", "D", "E"].map((label) => (
                              <option key={label}>{label}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeType === "abcd-doan" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Doan van doc hieu</label>
                    <textarea
                      className={inputCls + " resize-none"}
                      rows={5}
                      value={passage}
                      onChange={(e) => setPassage(e.target.value)}
                      placeholder="Nhap doan van tieng Trung..."
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Cau hoi</label>
                    <textarea
                      className={inputCls + " resize-none"}
                      rows={2}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Cau hoi cho doan van tren..."
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Dap an A B C D</label>
                    <AnswerOptions
                      answers={answers}
                      correct={correct}
                      onChange={setAnswers}
                      onCorrect={setCorrect}
                      maxOptions={4}
                    />
                  </div>
                </div>
              )}

              {activeType === "dien-tu" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Doan van (dung ___ danh dau cho trong)</label>
                    <textarea
                      className={inputCls + " resize-none"}
                      rows={4}
                      value={passage}
                      onChange={(e) => setPassage(e.target.value)}
                      placeholder="VD: 他___去过北京，所以对那里的景点非常熟悉。"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      Dung <code className="bg-slate-100 px-1 rounded">___</code> de danh dau cho can dien
                    </p>
                  </div>
                  <div>
                    <label className={labelCls}>Cac tu goi y de chon</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {hints.map((hint, index) => (
                        <span
                          key={`${hint}-${index}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-sm font-medium text-amber-800 group"
                        >
                          {hint}
                          <button
                            onClick={() => removeHint(index)}
                            className="text-amber-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                          >
                            <span className="material-symbols-outlined text-xs">close</span>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={newHint}
                        onChange={(e) => setNewHint(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addHint()}
                        className={inputCls}
                        placeholder="Them tu goi y + Enter"
                      />
                      <button
                        onClick={addHint}
                        className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition"
                      >
                        Them
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Dap an dung</label>
                    <input
                      className={inputCls}
                      value={fillAnswer}
                      onChange={(e) => setFillAnswer(e.target.value)}
                      placeholder="Nhap dap an chinh xac..."
                    />
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <label className={labelCls}>Giai thich dap an</label>
                <textarea
                  className={inputCls + " resize-none"}
                  rows={3}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Giai thich tai sao dap an dung..."
                />
              </div>
            </div>

            <QuizRightPanel form={form} setForm={setForm} />
          </div>
        </div>
      </div>
    </div>
  );
}
