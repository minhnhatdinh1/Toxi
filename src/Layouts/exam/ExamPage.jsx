import { useEffect, useState } from 'react';
import ExamMain from "./component/ExamMain";

export default function ExamPage() {
    const [selectedExam, setSelectedExam] = useState(null);

    useEffect(() => {
        // Lấy dữ liệu exam từ sessionStorage
        const examData = sessionStorage.getItem('selectedExam');
        if (examData) {
            setSelectedExam(JSON.parse(examData));
        }
    }, []);

    return(
        <>
            <ExamMain selectedExam={selectedExam} />
        </>
    )
};