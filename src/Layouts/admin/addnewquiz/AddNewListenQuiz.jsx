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
const DEFAULT_ABC = ["A", "B", "C"];

function toStoredFile(value) {
  if (!value) return null;
  if (value instanceof File) return value.name;
  if (typeof value === "string") return value.split("/").pop();
  if (typeof value === "object" && value.url) return value.url.split("/").pop();
  if (typeof value === "object" && value.name) return value.name;
  return null;
}

function normalizeFileValue(value) {
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
  const [subQuestions, setSubQuestions] = useState(
    Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      content: "",
      audio: null,
      answer: "A",
    }))
  );
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

  function resetFormKeepType() {
    setAudio(null);
    setContent("");
    setPinyin("");
    setExplanation("");
    setImages([null, null, null, null, null]);
    setSubQuestions(
      Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        content: "",
        audio: null,
        answer: "A",
      }))
    );

    if (activeType === "dung-sai") setAnswers(DEFAULT_TRUE_FALSE);
    if (activeType === "abc-anh") setAnswers(DEFAULT_ABC);
    if (activeType === "abcd-vanban") setAnswers(["", "", "", ""]);
    if (activeType === "gop-cau") setAnswers(DEFAULT_TRUE_FALSE);

    setCorrect(0);
    setForm((prev) => ({ ...prev, score: 1, seconds: 60, status: "done" }));
  }

  function switchType(type) {
    setActiveType(type);
    setCorrect(0);

    if (type === "dung-sai") {
      setAnswers(DEFAULT_TRUE_FALSE);
    }
    if (type === "abc-anh") {
      setAnswers(DEFAULT_ABC);
    }
    if (type === "abcd-vanban") {
      setAnswers(["", "", "", ""]);
    }
  }

  async function handleSave(andNext = false) {
    let quizOptions = [];
    let payloadSubQuestions = [];

    if (!audio && !isEdit) {
      alert("Vui long chon file audio.");
      return;
    }

    if (activeType === "dung-sai") {
      if (!content.trim()) {
        alert("Vui long nhap noi dung cau hoi.");
        return;
      }

      quizOptions = DEFAULT_TRUE_FALSE.map((answer, index) => ({
        content: answer,
        imageUrl: null,
        isCorrect: index === correct,
      }));
    }

    if (activeType === "abc-anh") {
      if (!content.trim()) {
        alert("Vui long nhap noi dung cau hoi.");
        return;
      }

      if (images.slice(0, 3).some((image) => !image)) {
        alert("Vui long tai du 3 anh lua chon.");
        return;
      }

      quizOptions = images.slice(0, 3).map((image, index) => ({
        content: String.fromCharCode(65 + index),
        imageUrl: toStoredFile(image),
        isCorrect: index === correct,
      }));
    }

    if (activeType === "abcd-vanban") {
      if (!content.trim()) {
        alert("Vui long nhap cau hoi.");
        return;
      }

      if (answers.some((answer) => !answer.trim())) {
        alert("Vui long nhap day du 4 dap an.");
        return;
      }

      quizOptions = answers.map((answer, index) => ({
        content: answer.trim(),
        imageUrl: null,
        isCorrect: index === correct,
      }));
    }

    if (activeType === "gop-cau") {
      if (!content.trim()) {
        alert("Vui long nhap noi dung cau hoi.");
        return;
      }

      if (images.slice(0, 5).some((image) => !image)) {
        alert("Vui long tai du 5 anh.");
        return;
      }

      if (subQuestions.some((item) => !item.content?.trim())) {
        alert("Vui long nhap day du noi dung 5 cau hoi con.");
        return;
      }

      quizOptions = images.slice(0, 5).map((image, index) => ({
        content: String.fromCharCode(65 + index),
        imageUrl: toStoredFile(image),
        optionOrder: index + 1,
        isCorrect: false,
      }));

      payloadSubQuestions = subQuestions.map((item, index) => ({
        content: item.content || "",
        audioUrl: toStoredFile(item.audio),
        correctAnswer: item.answer,
        questionOrder: index + 1,
      }));
    }

    if (!["done", "draft"].includes(form.status)) {
      alert("Trang thai cau hoi chi ho tro Xong hoac Nhap.");
      return;
    }

    const payload = {
      questionType: activeType,
      skill: "nghe",
      hskLevel: parseInt(String(form.hsk).replace("HSK ", ""), 10),
      content: content.trim(),
      pinyin,
      explanation,
      audioUrl: toStoredFile(audio),
      status: form.status === "done" ? "DONE" : "DRAFT",
      score: form.score,
      quizOptions,
      ...(activeType === "gop-cau" ? { subQuestions: payloadSubQuestions } : {}),
    };

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

        setActiveType(q.questionType || "dung-sai");
        setContent(q.content || "");
        setPinyin(q.pinyin || "");
        setExplanation(q.explanation || "");
        setForm((prev) => ({
          ...prev,
          hsk: `HSK ${q.hskLevel || 1}`,
          score: q.score || 1,
          status: normalizeStatus(q.status),
        }));

        if (q.audioUrl) {
          setAudio(normalizeFileValue(q.audioUrl));
        }

        if (q.questionType === "dung-sai") {
          if (q.quizOptions?.length) {
            setAnswers(q.quizOptions.map((option) => option.content));
            setCorrect(Math.max(q.quizOptions.findIndex((option) => option.isCorrect), 0));
          } else {
            setAnswers(DEFAULT_TRUE_FALSE);
            setCorrect(0);
          }
        }

        if (q.questionType === "abc-anh") {
          setAnswers(DEFAULT_ABC);
          setCorrect(Math.max(q.quizOptions?.findIndex((option) => option.isCorrect) ?? 0, 0));
          setImages(
            Array.from({ length: 5 }, (_, index) =>
              normalizeFileValue(q.quizOptions?.[index]?.imageUrl || null)
            )
          );
        }

        if (q.questionType === "abcd-vanban") {
          setAnswers(
            q.quizOptions?.length ? q.quizOptions.map((option) => option.content || "") : ["", "", "", ""]
          );
          setCorrect(Math.max(q.quizOptions?.findIndex((option) => option.isCorrect) ?? 0, 0));
        }

        if (q.questionType === "gop-cau") {
          setImages(
            Array.from({ length: 5 }, (_, index) =>
              normalizeFileValue(q.quizOptions?.[index]?.imageUrl || null)
            )
          );
          setSubQuestions(
            Array.from({ length: 5 }, (_, index) => ({
              id: index + 1,
              content: q.subQuestions?.[index]?.content || "",
              audio: normalizeFileValue(q.subQuestions?.[index]?.audioUrl || null),
              answer: q.subQuestions?.[index]?.correctAnswer || "A",
            }))
          );
        }
      } catch (err) {
        console.error(err);
        alert("Khong tai duoc chi tiet cau hoi.");
      }
    }

    loadQuestion();
  }, [isEdit, questionId]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <QuizSidebar activeType={activeType} skill="nghe" quizId={quizId} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <QuizPageHeader
          title={`${isEdit ? "Chinh sua" : "Tao"} cau hoi Nghe - ${
            TYPES.find((type) => type.value === activeType)?.label
          }`}
          isEdit={isEdit}
          onCancel={() => navigate(`/adminEditQuiz/${quizId}`)}
          onSaveAndNext={() => handleSave(true)}
          onSaveAndClose={() => handleSave(false)}
        />

        <div className="flex-1 overflow-y-auto p-5">
          <div className="mx-auto flex max-w-5xl gap-5">
            <div className="min-w-0 flex-1 space-y-4">
              <div className="flex gap-1 rounded-2xl border border-slate-200 bg-white p-1.5">
                {TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => switchType(type.value)}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                      activeType === type.value
                        ? "bg-primary text-white shadow-sm"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <AudioUpload label="File audio cau hoi" value={audio} onChange={setAudio} />
              </div>

              {activeType === "dung-sai" && (
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div>
                    <label className={labelCls}>Cau tran thuat</label>
                    <textarea
                      className={`${inputCls} resize-none`}
                      rows={2}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Nhap cau tieng Trung..."
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
                    <div className="flex gap-3">
                      {DEFAULT_TRUE_FALSE.map((answer, index) => (
                        <button
                          key={answer}
                          onClick={() => setCorrect(index)}
                          className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-bold transition ${
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
              )}

              {activeType === "abc-anh" && (
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div>
                    <label className={labelCls}>Noi dung cau hoi</label>
                    <textarea
                      className={`${inputCls} resize-none`}
                      rows={2}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Nhap noi dung cau hoi..."
                    />
                  </div>
                  <div>
                    <label className={labelCls}>3 anh lua chon</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["A", "B", "C"].map((label, index) => (
                        <div
                          key={label}
                          className={`overflow-hidden rounded-2xl border-2 transition ${
                            correct === index
                              ? "border-emerald-400"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <ImageSlot
                            label={`Anh lua chon ${index + 1}`}
                            value={images[index]}
                            onChange={(value) => {
                              const next = [...images];
                              next[index] = value;
                              setImages(next);
                            }}
                          />
                          <div className="flex items-center justify-between bg-slate-50 px-3 py-1.5">
                            <span
                              className={`text-xs font-bold ${
                                correct === index ? "text-emerald-600" : "text-slate-500"
                              }`}
                            >
                              {label}
                            </span>
                            <button
                              onClick={() => setCorrect(index)}
                              className={`text-xs font-semibold transition ${
                                correct === index
                                  ? "text-emerald-600"
                                  : "text-slate-400 hover:text-emerald-500"
                              }`}
                            >
                              {correct === index ? "Dung" : "Danh dau"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeType === "gop-cau" && (
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div>
                    <label className={labelCls}>Noi dung cau hoi</label>
                    <textarea
                      className={`${inputCls} resize-none`}
                      rows={2}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Nhap noi dung tong quat cho nhom cau hoi..."
                    />
                  </div>
                  <div>
                    <label className={labelCls}>5 anh lua chon (A - E)</label>
                    <div className="grid grid-cols-5 gap-2">
                      {["A", "B", "C", "D", "E"].map((label, index) => (
                        <div key={label} className="overflow-hidden rounded-xl border border-slate-200">
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
                    <label className={labelCls}>5 cau hoi con</label>
                    <div className="space-y-3">
                      {subQuestions.map((item, index) => (
                        <div key={item.id} className="rounded-xl border border-slate-200 p-4">
                          <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                              {index + 1}
                            </div>
                            <input
                              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              placeholder={`Noi dung cau hoi ${index + 1}...`}
                              value={item.content}
                              onChange={(e) => {
                                const next = [...subQuestions];
                                next[index] = { ...next[index], content: e.target.value };
                                setSubQuestions(next);
                              }}
                            />
                            <select
                              value={item.answer}
                              onChange={(e) => {
                                const next = [...subQuestions];
                                next[index] = { ...next[index], answer: e.target.value };
                                setSubQuestions(next);
                              }}
                              className="rounded-lg border border-slate-200 px-2 py-2 text-sm focus:border-primary focus:outline-none"
                            >
                              {["A", "B", "C", "D", "E"].map((label) => (
                                <option key={label}>{label}</option>
                              ))}
                            </select>
                          </div>
                          <AudioUpload
                            label=""
                            value={item.audio}
                            onChange={(value) => {
                              const next = [...subQuestions];
                              next[index] = { ...next[index], audio: value };
                              setSubQuestions(next);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeType === "abcd-vanban" && (
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div>
                    <label className={labelCls}>Cau hoi</label>
                    <textarea
                      className={`${inputCls} resize-none`}
                      rows={3}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Nhap cau hoi hoac doan hoi thoai..."
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

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
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
    </div>
  );
}
