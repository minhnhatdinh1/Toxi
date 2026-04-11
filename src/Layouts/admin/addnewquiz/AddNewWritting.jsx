import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  QuizSidebar,
  QuizPageHeader,
  QuizRightPanel,
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
  { value: "sap-xep-viet", label: "Sap xep tu", desc: "HSK 3" },
  { value: "viet-doan", label: "Viet doan van", desc: "HSK 4" },
];

const DEFAULT_WORDS = ["wo", "xuexi", "Hanyu", "meitian", "zaijia"];

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
  if (typeof value === "string") return { name: value.split("/").pop(), url: value };
  return value;
}

function normalizeStatus(status) {
  return String(status || "done").toLowerCase();
}

export default function AddNewWritting() {
  const navigate = useNavigate();
  const { quizId, questionId } = useParams();
  const isEdit = !!questionId;

  const [activeType, setActiveType] = useState("sap-xep-viet");
  const [words, setWords] = useState(DEFAULT_WORDS);
  const [newWord, setNewWord] = useState("");
  const [correctOrder, setCorrectOrder] = useState("");
  const [pinyin, setPinyin] = useState("");
  const [meaning, setMeaning] = useState("");
  const [explanation, setExplanation] = useState("");
  const [promptImage, setPromptImage] = useState(null);
  const [promptText, setPromptText] = useState("");
  const [sampleText, setSampleText] = useState("");
  const [minWords, setMinWords] = useState(80);
  const [form, setForm] = useState({
    hsk: "HSK 3",
    autoGrade: false,
    shuffle: false,
    pinyin: true,
    score: 1,
    seconds: 120,
    status: "done",
  });

  function addWord() {
    if (!newWord.trim()) return;
    setWords((prev) => [...prev, newWord.trim()]);
    setNewWord("");
  }

  function removeWord(index) {
    setWords((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  }

  function switchType(type) {
    setActiveType(type);

    if (type === "sap-xep-viet") {
      setPromptImage(null);
      setPromptText("");
      setSampleText("");
      setMinWords(80);
      setWords(DEFAULT_WORDS);
      setCorrectOrder("");
      return;
    }

    setWords(DEFAULT_WORDS);
    setCorrectOrder("");
    setPinyin("");
    setMeaning("");
    setExplanation("");
  }

  async function handleSave(andNext = false) {
    const hskLevel = parseInt(String(form.hsk).replace("HSK ", ""), 10) || 3;

    let payload = {
      questionType: activeType,
      skill: "viet",
      hskLevel,
      content: promptText.trim(),
      pinyin: pinyin.trim() || null,
      meaning: meaning.trim() || null,
      correctOrder: correctOrder.trim() || null,
      imageUrl: toStoredFile(promptImage),
      explanation: explanation.trim() || null,
      score: Number(form.score) || 1,
      status: String(form.status || "done").toUpperCase(),
      quizOptions: [],
    };

    if (activeType === "sap-xep-viet") {
      const cleanedWords = words.map((word) => word.trim()).filter(Boolean);

      if (cleanedWords.length < 2 || !correctOrder.trim()) {
        alert("Vui long nhap du cac tu va thu tu dung.");
        return;
      }

      payload.content = correctOrder.trim();
      payload.quizOptions = cleanedWords.map((word, index) => ({
        content: word,
        imageUrl: null,
        optionOrder: index + 1,
        isCorrect: false,
      }));
    }

    if (activeType === "viet-doan") {
      if (!promptText.trim()) {
        alert("Vui long nhap de bai viet.");
        return;
      }

      payload.content = promptText.trim();
      payload.explanation = [explanation.trim(), sampleText.trim()].filter(Boolean).join("\n\n") || null;
      payload.meaning = meaning.trim() || (minWords ? `Toi thieu ${minWords} tu` : null);
      payload.correctOrder = null;
      payload.quizOptions = [];
    }

    try {
      if (isEdit) {
        await updateQuestion(questionId, payload);
      } else {
        await createQuestion(quizId, payload);
      }

      if (isEdit && andNext) {
        alert("Da luu thay doi.");
      } else if (andNext) {
        setWords(DEFAULT_WORDS);
        setNewWord("");
        setCorrectOrder("");
        setPinyin("");
        setMeaning("");
        setExplanation("");
        setPromptImage(null);
        setPromptText("");
        setSampleText("");
      } else {
        navigate(`/adminEditQuiz/${quizId}`);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Khong luu duoc cau hoi viet.");
    }
  }

  useEffect(() => {
    if (!isEdit) return;

    async function loadQuestion() {
      try {
        const res = await fetchQuestionDetail(questionId);
        const q = res.data || {};

        setActiveType(q.questionType || "sap-xep-viet");
        setPinyin(q.pinyin || "");
        setMeaning(q.meaning || "");
        setExplanation(q.explanation || "");
        setCorrectOrder(q.correctOrder || "");
        setPromptText(q.content || "");
        setPromptImage(normalizeImageValue(q.imageUrl));
        setForm((prev) => ({
          ...prev,
          hsk: `HSK ${q.hskLevel || 3}`,
          score: q.score || 1,
          status: normalizeStatus(q.status),
        }));

        if (q.questionType === "sap-xep-viet") {
          setWords((q.quizOptions || []).map((option) => option.content).filter(Boolean));
        }

        if (q.questionType === "viet-doan") {
          const explanationParts = String(q.explanation || "").split("\n\n");
          setExplanation(explanationParts[0] || "");
          setSampleText(explanationParts.slice(1).join("\n\n"));
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadQuestion();
  }, [isEdit, questionId]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <QuizSidebar activeType={activeType} skill="viet" quizId={quizId} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <QuizPageHeader
          title={`${isEdit ? "Chinh sua" : "Tao"} cau hoi Viet - ${TYPES.find((item) => item.value === activeType)?.label}`}
          isEdit={isEdit}
          onCancel={() => navigate(`/adminEditQuiz/${quizId}`)}
          onSaveAndNext={() => handleSave(true)}
          onSaveAndClose={() => handleSave(false)}
        />

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-5 max-w-5xl mx-auto">
            <div className="flex-1 min-w-0 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex gap-2">
                {TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => switchType(type.value)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition flex flex-col items-center gap-0.5 ${
                      activeType === type.value ? "bg-primary text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <span>{type.label}</span>
                    <span className={`text-[10px] font-normal ${activeType === type.value ? "text-white/70" : "text-slate-400"}`}>
                      {type.desc}
                    </span>
                  </button>
                ))}
              </div>

              {activeType === "sap-xep-viet" && (
                <>
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                    <div>
                      <label className={labelCls}>Cac tu can sap xep</label>
                      <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 min-h-16 mb-2">
                        {words.map((word, index) => (
                          <span
                            key={`${word}-${index}`}
                            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm group"
                          >
                            <span className="material-symbols-outlined text-slate-300 text-sm">drag_indicator</span>
                            {word}
                            <button
                              onClick={() => removeWord(index)}
                              className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition ml-0.5"
                            >
                              <span className="material-symbols-outlined text-xs">close</span>
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          value={newWord}
                          onChange={(e) => setNewWord(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addWord()}
                          className={inputCls}
                          placeholder="Nhap tu + Enter de them"
                        />
                        <button
                          onClick={addWord}
                          className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition"
                        >
                          Them
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Thu tu dung</label>
                      <input
                        className={inputCls}
                        value={correctOrder}
                        onChange={(e) => setCorrectOrder(e.target.value)}
                        placeholder="VD: Wo meitian zaijia xuexi Hanyu"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Nghia tieng Viet</label>
                        <input
                          className={inputCls}
                          value={meaning}
                          onChange={(e) => setMeaning(e.target.value)}
                          placeholder="Toi hoc tieng Trung o nha moi ngay"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Pinyin</label>
                        <input
                          className={inputCls}
                          value={pinyin}
                          onChange={(e) => setPinyin(e.target.value)}
                          placeholder="Wo meitian zaijia xuexi Hanyu"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <label className={labelCls}>Giai thich cau truc</label>
                    <textarea
                      className={`${inputCls} resize-none`}
                      rows={3}
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      placeholder="Giai thich thu tu tu va ngu phap lien quan..."
                    />
                  </div>
                </>
              )}

              {activeType === "viet-doan" && (
                <>
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                    <div>
                      <label className={labelCls}>Anh goi y</label>
                      <div className="max-w-xs">
                        <ImageSlot value={promptImage} onChange={setPromptImage} />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>De bai viet</label>
                      <textarea
                        className={`${inputCls} resize-none`}
                        rows={3}
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                        placeholder="Nhap de bai, tu khoa hoac yeu cau viet..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Pinyin / chu de</label>
                        <input
                          className={inputCls}
                          value={pinyin}
                          onChange={(e) => setPinyin(e.target.value)}
                          placeholder="Chu de hoac pinyin neu can"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Yeu cau so tu toi thieu</label>
                        <input
                          type="number"
                          min="1"
                          value={minWords}
                          onChange={(e) => setMinWords(Number(e.target.value) || 0)}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Goi y / tieu chi cham</label>
                      <textarea
                        className={`${inputCls} resize-none`}
                        rows={3}
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                        placeholder="Noi dung phu hop, dung ngu phap, tu vung..."
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                    <div>
                      <label className={labelCls}>Bai mau tham khao</label>
                      <textarea
                        className={`${inputCls} resize-none`}
                        rows={4}
                        value={sampleText}
                        onChange={(e) => setSampleText(e.target.value)}
                        placeholder="Nhap bai viet mau neu muon luu kem..."
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Ghi chu bo sung</label>
                      <input
                        className={inputCls}
                        value={meaning}
                        onChange={(e) => setMeaning(e.target.value)}
                        placeholder="VD: Toi thieu 80 tu, viet ve gia dinh..."
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <QuizRightPanel form={form} setForm={setForm} />
          </div>
        </div>
      </div>
    </div>
  );
}
