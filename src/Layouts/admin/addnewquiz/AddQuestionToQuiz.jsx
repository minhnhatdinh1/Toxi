import { useParams } from "react-router-dom";

export default function AddQuestionToQuiz() {
  const { id } = useParams();

  return (
    <div>
      <h2>Thêm câu hỏi vào đề {id}</h2>

      <button onClick={() => navigate(`/adminQuiz/${id}/add-question/listen`)}>
        Câu hỏi nghe
      </button>

      <button onClick={() => navigate(`/adminQuiz/${id}/add-question/read`)}>
        Câu hỏi đọc
      </button>

      <button onClick={() => navigate(`/adminQuiz/${id}/add-question/write`)}>
        Câu hỏi viết
      </button>
    </div>
  );
}