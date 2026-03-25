import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const TYPES = [
  { value: "dung-sai", label: "Dung / Sai" },
  { value: "abc-anh", label: "A B C anh" },
  { value: "gop-cau", label: "Gop cau" },
  { value: "abcd-vanban", label: "A B C D van ban" },
];

export default function AddNewListenQuiz() {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("dung-sai");
  const [audio, setAudio] = useState(null);
  const [content, setContent] = useState("");
  const [pinyin, setPinyin] = useState("");
  const [answers, setAnswers] = useState(["DUNG", "SAI"]);
  const [correct, setCorrect] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [images, setImages] = useState([null, null, null, null, null]);
  const [subQuestions, setSubQ] = useState(
    Array.from({ length: 5 }, (_, i) => ({ id: i + 1, audio: null, answer: "A" }))
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

  function switchType(type) {
    setActiveType(type);
    if (type === "dung-sai") {
      setAnswers(["DUNG", "SAI"]);
      setCorrect(0);
    }
    if (type === "abc-anh") {
      setAnswers(["Anh A", "Anh B", "Anh C"]);
      setCorrect(0);
    }
    if (type === "abcd-vanban") {
      setAnswers(["", "", "", ""]);
      setCorrect(0);
    }
  }

  function handleSave(andNext = false) {
    if (andNext) {
      setContent("");
      setAudio(null);
      setExplanation("");
      return;
    }
    navigate("/adminEditQuiz/1");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <QuizSidebar activeType={activeType} skill="nghe" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <QuizPageHeader
          title={`Tao cau hoi Nghe - ${TYPES.find((t) => t.value === activeType)?.label}`}
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
                      {["DUNG", "SAI"].map((answer, index) => (
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
                      {subQuestions.map((subQuestion, index) => (
                        <div key={subQuestion.id} className="rounded-xl border border-slate-200 p-4">
                          <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                              {index + 1}
                            </div>
                            <input
                              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              placeholder={`Noi dung cau hoi ${index + 1}...`}
                            />
                            <select
                              value={subQuestion.answer}
                              onChange={(e) => {
                                const next = [...subQuestions];
                                next[index] = { ...next[index], answer: e.target.value };
                                setSubQ(next);
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
                            value={subQuestion.audio}
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
