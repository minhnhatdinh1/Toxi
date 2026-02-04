import ExamResultMain from "./component/ExamResultMain";
import { useLocation } from "react-router-dom";
export default function ExamResultPage() {
  const location = useLocation();
  const selectedExamResult = location.state?.selectedExam || null;
  return <ExamResultMain selectedExamResult={selectedExamResult} />;
};