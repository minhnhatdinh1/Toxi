import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  QuizSidebar,
  QuizPageHeader,
  QuizRightPanel,
  AnswerOptions,
  AudioUpload,
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
  { value: "dung-sai", label: "Dung / Sai" },
  { value: "abc-anh", label: "A B C anh" },
  { value: "gop-cau", label: "Gop cau" },
  { value: "abcd-vanban", label: "A B C D van ban" },
];

const DEFAULT_TRUE_FALSE = ["DUNG (doi)", "SAI (sai)"];
const DEFAULT_ABC_IMAGE = ["Anh A", "Anh B", "Anh C"];
const DEFAULT_SUB_QUESTIONS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  audio: null,
  answer: "A",
}));

const normalizeImageValue = (value) => {
  if (!value) return null;
  if (typeof value === "object" && (value.url || value.name)) return value;
  if (typeof value === "string") {
    return { name: value.split("/").pop(), url: value };
  }
  return value;
};

const normalizeStatus = (status) => String(status || "done").toLowerCase();

const toStoredFile = (value) => {
  if (!value) return null;
  if (value instanceof File) return value.name;
  if (typeof value === "string") return value.split("/").pop();
  if (typeof value === "object" && value.url) return value.url.split("/").pop();
  if (typeof value === "object" && value.name) return value.name;
  return null;
};

export default function AddNewListenQuiz() {
  const navigate = useNavigate();
  const { quizId, questionId } = useParams();
  const isEdit = !!questionId;

  const [activeType, setActiveType] = useState("dung-sai");
  const [audio, setAudio] = useState(null);
  const [content, setContent] = useState("");
  const [pinyin, setPinyin] = useState("");
  const [answers, setAnswers] = useState(DEFAULT_TRUE_FALSE);
  const [correct, setCorrect] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [images, setImages] = useState([null, null, null, null, null]);
  const [subQuestions, setSubQ] = useState(DEFAULT_SUB_QUESTIONS);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    hsk: "HSK 1",
    autoGrade: true,
    shuffle: false,
    pinyin: true,
    score: 1,
    seconds: 60,
    status: "done",
  });
  const [recentList] = useState([
    { id: 1, type: "Dung / Sai", status: "done" },
    { id: 2, type: "ABC anh", status: "done" },
  ]);

  function switchType(type) {
    setActiveType(type);
    setContent("");
    setPinyin("");
    setExplanation("");
    setAudio(null);
    setCorrect(0);
    setImages([null, null, null, null, null]);
    setSubQ(DEFAULT_SUB_QUESTIONS);

    if (type === "dung-sai") {
      setAnswers(DEFAULT_TRUE_FALSE);
    }

    if (type === "abc-anh") {
      setAnswers(DEFAULT_ABC_IMAGE);
    }

    if (type === "abcd-vanban") {
      setAnswers(["", "", "", ""]);
    }
  }

  function resetFormKeepType() {
    setAudio(null);
    setContent("");
    setPinyin("");
    setExplanation("");
    setCorrect(0);

    if (activeType === "dung-sai") {
      setAnswers(DEFAULT_TRUE_FALSE);
    }

    if (activeType === "abc-anh") {
      setAnswers(DEFAULT_ABC_IMAGE);
      setImages([null, null, null, null, null]);
    }

    if (activeType === "gop-cau") {
      setImages([null, null, null, null, null]);
      setSubQ(DEFAULT_SUB_QUESTIONS);
    }

    if (activeType === "abcd-vanban") {
      setAnswers(["", "", "", ""]);
    }
  }

  async function handleSave(andNext = false) {
    if (!quizId) {
      alert("Khong tim thay quizId.");
      return;
    }

    const hskLevel = parseInt(String(form.hsk).replace("HSK ", ""), 10) || 1;
    const status =
      form.status === "done"
        ? "DONE"
        : form.status === "draft"
        ? "DRAFT"
        : "HIDDEN";

    const payload = {
      questionType: activeType,
      skill: "nghe",
      hskLevel,
      content: content.trim(),
      pinyin: pinyin.trim(),
      explanation: explanation.trim(),
      audioUrl: toStoredFile(audio),
      imageUrl: null,
      score: Number(form.score) || 1,
      timeLimit: Number(form.seconds) || 60,
      status,
      quizOptions: [],
    };

    if (activeType === "dung-sai") {
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

    if (activeType === "abc-anh") {
      const optionImages = images.slice(0, 3);
      if (optionImages.some((image) => !image)) {
        alert("Vui long chon du 3 anh.");
        return;
      }

      payload.content = content.trim() || "Chon anh dung theo audio";
      payload.quizOptions = optionImages.map((image, index) => ({
        content: String.fromCharCode(65 + index),
        imageUrl: toStoredFile(image),
        isCorrect: index === correct,
      }));
    }

    if (activeType === "gop-cau") {
      const optionImages = images.slice(0, 5);
      if (optionImages.some((image) => !image)) {
        alert("Vui long chon du 5 anh.");
        return;
      }

      payload.content = content.trim() || "Gop cau voi anh phu hop";
      payload.quizOptions = optionImages.map((image, index) => ({
        content: String.fromCharCode(65 + index),
        imageUrl: toStoredFile(image),
        optionOrder: index + 1,
        isCorrect: false,
      }));
      payload.subQuestions = subQuestions.map((item, index) => ({
        content: `Cau ${index + 1}`,
        audioUrl: toStoredFile(item.audio),
        correctAnswer: item.answer,
        questionOrder: index + 1,
      }));
    }

    if (activeType === "abcd-vanban") {
      if (!content.trim()) {
        alert("Vui long nhap noi dung cau hoi.");
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

    try {
      setSaving(true);
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
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Luu cau hoi that bai.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    if (!isEdit) return;

    async function loadQuestion() {
      try {
        const res = await fetchQuestionDetail(questionId);
        const q = res.data;

        setActiveType(q.questionType || "dung-sai");
        setAudio(normalizeImageValue(q.audioUrl));
        setContent(q.content || "");
        setPinyin(q.pinyin || "");
        setExplanation(q.explanation || "");
        setForm((prev) => ({
          ...prev,
          hsk: `HSK ${q.hskLevel || 1}`,
          score: q.score || 1,
          seconds: q.timeLimit || 60,
          status: normalizeStatus(q.status),
        }));

        if (q.questionType === "dung-sai") {
          setAnswers(
            q.quizOptions?.length
              ? q.quizOptions.map((option) => option.content || "")
              : DEFAULT_TRUE_FALSE
          );
          setCorrect(
            Math.max(q.quizOptions?.findIndex((option) => option.isCorrect) ?? 0, 0)
          );
          setImages([null, null, null, null, null]);
          setSubQ(DEFAULT_SUB_QUESTIONS);
        }

        if (q.questionType === "abc-anh") {
          setAnswers(DEFAULT_ABC_IMAGE);
          setImages(
            Array.from({ length: 5 }, (_, index) =>
              normalizeImageValue(q.quizOptions?.[index]?.imageUrl || null)
            )
          );
          setCorrect(
            Math.max(q.quizOptions?.findIndex((option) => option.isCorrect) ?? 0, 0)
          );
          setSubQ(DEFAULT_SUB_QUESTIONS);
        }

        if (q.questionType === "gop-cau") {
          setImages(
            Array.from({ length: 5 }, (_, index) =>
              normalizeImageValue(q.quizOptions?.[index]?.imageUrl || null)
            )
          );
          setSubQ(
            Array.from({ length: 5 }, (_, index) => ({
              id: index + 1,
              audio: normalizeImageValue(q.subQuestions?.[index]?.audioUrl || null),
              answer: q.subQuestions?.[index]?.correctAnswer || "A",
            }))
          );
        }

        if (q.questionType === "abcd-vanban") {
          setAnswers(
            q.quizOptions?.length
              ? q.quizOptions.map((option) => option.content || "")
              : ["", "", "", ""]
          );
          setCorrect(
            Math.max(q.quizOptions?.findIndex((option) => option.isCorrect) ?? 0, 0)
          );
          setImages([null, null, null, null, null]);
          setSubQ(DEFAULT_SUB_QUESTIONS);
        }
      } catch (error) {
        console.error(error);
        alert("Khong tai duoc cau hoi de sua.");
      }
    }

    loadQuestion();
  }, [isEdit, questionId]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <QuizSidebar activeType={activeType} skill="nghe" quizId={quizId} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <QuizPageHeader
          title={`${isEdit ? "Chinh sua" : "Tao"} cau hoi Nghe - ${TYPES.find((t) => t.value === activeType)?.label}`}
          isEdit={isEdit}
          onCancel={() => navigate(`/adminEditQuiz/${quizId}`)}
          onSaveAndNext={() => handleSave(true)}
          onSaveAndClose={() => handleSave(false)}
        />

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-5 max-w-5xl mx-auto">
            <div className="flex-1 min-w-0 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex gap-1">
                {TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => switchType(type.value)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                      activeType === type.value
                        ? "bg-primary text-white shadow-sm"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <AudioUpload label="File audio cau hoi" value={audio} onChange={setAudio} />
              </div>

              {activeType === "dung-sai" ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Cau tran thuat (hoc vien danh gia Dung/Sai)</label>
                    <textarea
                      className={`${inputCls} resize-none`}
                      rows={2}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Nhap cau tran thuat bang tieng Trung..."
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Pinyin</label>
                    <input
                      className={inputCls}
                      value={pinyin}
                      onChange={(e) => setPinyin(e.target.value)}
                      placeholder="Phien am tu dong..."
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Dap an dung</label>
                    <div className="flex gap-3">
                      {DEFAULT_TRUE_FALSE.map((answer, index) => (
                        <button
                          key={index}
                          onClick={() => setCorrect(index)}
                          className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition flex items-center justify-center gap-2 ${
                            correct === index
                              ? index === 0
                                ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                                : "border-red-400 bg-red-50 text-red-700"
                              : "border-slate-200 text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          <span className="material-symbols-outlined">
                            {index === 0 ? "check_circle" : "cancel"}
                          </span>
                          {answer}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activeType === "abc-anh" ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>3 anh lua chon</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["A", "B", "C"].map((letter, index) => (
                        <div
                          key={index}
                          className={`rounded-2xl overflow-hidden border-2 transition ${
                            correct === index
                              ? "border-emerald-400"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <ImageSlot
                            value={images[index]}
                            onChange={(value) => {
                              const next = [...images];
                              next[index] = value;
                              setImages(next);
                            }}
                          />
                          <div className="bg-slate-50 py-1.5 flex items-center justify-between px-3">
                            <span className={`text-xs font-bold ${correct === index ? "text-emerald-600" : "text-slate-500"}`}>
                              {letter}
                            </span>
                            <button
                              onClick={() => setCorrect(index)}
                              className={`text-xs font-semibold transition ${
                                correct === index
                                  ? "text-emerald-600"
                                  : "text-slate-400 hover:text-emerald-500"
                              }`}
                            >
                              {correct === index ? "Da chon" : "Danh dau"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activeType === "gop-cau" ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>5 anh lua chon (A - E)</label>
                    <div className="grid grid-cols-5 gap-2">
                      {["A", "B", "C", "D", "E"].map((letter, index) => (
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
                            <span className="text-xs font-bold text-slate-500">{letter}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>5 cau hoi con (moi cau co audio rieng)</label>
                    <div className="space-y-3">
                      {subQuestions.map((item, index) => (
                        <div key={item.id} className="border border-slate-200 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {index + 1}
                            </div>
                            <input
                              className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                              placeholder={`Noi dung cau hoi ${index + 1}...`}
                              value={`Cau ${index + 1}`}
                              readOnly
                            />
                            <select
                              value={item.answer}
                              onChange={(e) => {
                                const next = [...subQuestions];
                                next[index] = { ...next[index], answer: e.target.value };
                                setSubQ(next);
                              }}
                              className="border border-slate-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-primary"
                            >
                              {["A", "B", "C", "D", "E"].map((letter) => (
                                <option key={letter}>{letter}</option>
                              ))}
                            </select>
                          </div>
                          <AudioUpload
                            label=""
                            value={item.audio}
                            onChange={(value) => {
                              const next = [...subQuestions];
                              next[index] = { ...next[index], audio: value };
                              setSubQ(next);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activeType === "abcd-vanban" ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <label className={labelCls}>Noi dung cau hoi</label>
                    <textarea
                      className={`${inputCls} resize-none`}
                      rows={3}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Nhap noi dung cau hoi..."
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Dap an</label>
                    <AnswerOptions
                      answers={answers}
                      correct={correct}
                      onChange={setAnswers}
                      onCorrect={setCorrect}
                      maxOptions={4}
                    />
                  </div>
                </div>
              ) : null}

              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <label className={labelCls}>Giai thich dap an</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Giai thich tai sao dap an dung..."
                />
                <div className="mt-3">
                  <label className={labelCls}>Pinyin tu dong</label>
                  <input
                    className={inputCls}
                    value={pinyin}
                    onChange={(e) => setPinyin(e.target.value)}
                    placeholder="Wo ba shu fang zai zhuozi shang"
                  />
                </div>
              </div>
            </div>

            <QuizRightPanel form={form} setForm={setForm} recentList={recentList} />
          </div>
        </div>
      </div>

      {saving ? (
        <div className="fixed inset-0 z-[100] bg-slate-950/20 backdrop-blur-[1px] flex items-center justify-center">
          <div className="rounded-2xl bg-white px-6 py-4 shadow-xl text-sm font-semibold text-slate-700">
            Dang luu cau hoi...
          </div>
        </div>
      ) : null}
    </div>
  );
}
