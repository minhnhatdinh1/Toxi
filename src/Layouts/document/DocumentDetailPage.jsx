import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ALL_DOCUMENTS } from "./documentData";

const pageStyles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f5f7ff 0%, #f8f4f1 100%)",
    padding: "24px 16px 40px",
  },
  container: {
    maxWidth: 1320,
    margin: "0 auto",
  },
  breadcrumb: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
    borderRadius: 999,
    background: "#efe8f1",
    color: "#6b7280",
    padding: "14px 18px",
    fontSize: 14,
    marginBottom: 24,
  },
  hero: {
    background: "#fff",
    borderRadius: 28,
    padding: "24px",
    boxShadow: "0 18px 60px rgba(39, 54, 108, 0.08)",
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 800,
    lineHeight: 1.2,
    color: "#0f172a",
    marginBottom: 14,
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 18,
    color: "#64748b",
    fontSize: 16,
    marginBottom: 18,
  },
  date: {
    color: "#ef4444",
    fontStyle: "italic",
    fontWeight: 600,
  },
  actionRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center",
    marginTop: 14,
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: "linear-gradient(135deg, #e11d48, #ef4444)",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: 999,
    fontWeight: 700,
    textDecoration: "none",
    boxShadow: "0 12px 30px rgba(225, 29, 72, 0.22)",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: "#fff",
    color: "#0f172a",
    padding: "12px 18px",
    borderRadius: 999,
    fontWeight: 700,
    textDecoration: "none",
    border: "1px solid #dbe4f0",
  },
  viewerCard: {
    background: "#fff",
    borderRadius: 28,
    padding: 20,
    boxShadow: "0 18px 60px rgba(39, 54, 108, 0.08)",
  },
  viewerToolbar: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
    marginBottom: 16,
    color: "#2563eb",
    fontSize: 16,
    fontWeight: 700,
  },
  iframe: {
    width: "100%",
    height: "78vh",
    minHeight: 620,
    border: "1px solid #dbe4f0",
    borderRadius: 18,
    background: "#f8fafc",
  },
};

function formatTypeLabel(type) {
  return type === "exam" ? "Đề thi thử" : "Tài liệu";
}

export default function DocumentDetailPage() {
  const params = useParams();

  const item = useMemo(
    () => ALL_DOCUMENTS.find((entry) => entry.type === params.type && String(entry.id) === params.id),
    [params.id, params.type]
  );

  if (!item) {
    return <Navigate to="/documents" replace />;
  }

  const viewerUrl = `${item.pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`;

  return (
    <div style={pageStyles.wrapper}>
      <div style={pageStyles.container}>
        <div style={pageStyles.breadcrumb}>
          <Link to="/" className="font-semibold text-slate-500 no-underline">Trang chủ</Link>
          <span>›</span>
          <Link to="/documents" className="font-semibold text-slate-500 no-underline">Tài liệu</Link>
          <span>›</span>
          <span className="font-semibold text-slate-700">{formatTypeLabel(item.type)}</span>
          <span>›</span>
          <span className="font-semibold text-rose-500">{item.name}</span>
        </div>

        <section style={pageStyles.hero}>
          <div className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-rose-500">
            {item.level} • {formatTypeLabel(item.type)}
          </div>
          <h1 style={pageStyles.title}>{item.name}</h1>
          <div style={pageStyles.metaRow}>
            <span style={pageStyles.date}>Ngày: {item.date}</span>
            <span>👁 {item.views.toLocaleString("vi-VN")} lượt xem</span>
            <span>⬇ {item.downloads.toLocaleString("vi-VN")} lượt tải</span>
          </div>
          <p className="max-w-4xl text-base leading-7 text-slate-600">{item.description}</p>
          <div style={pageStyles.actionRow}>
            <a
              href={item.pdfUrl}
              download={item.fileName}
              target="_blank"
              rel="noreferrer"
              style={pageStyles.primaryButton}
            >
              <span className="material-symbols-outlined text-xl">download</span>
              Tải tài liệu
            </a>
            <a href={item.pdfUrl} target="_blank" rel="noreferrer" style={pageStyles.secondaryButton}>
              <span className="material-symbols-outlined text-xl">open_in_new</span>
              Mở file riêng
            </a>
          </div>
        </section>

        <section style={pageStyles.viewerCard}>
          <div style={pageStyles.viewerToolbar}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">picture_as_pdf</span>
              Xem trước tài liệu PDF
            </div>
            <span className="text-sm font-semibold text-slate-500">{item.fileName}</span>
          </div>
          <iframe title={item.name} src={viewerUrl} style={pageStyles.iframe} />
        </section>
      </div>
    </div>
  );
}
