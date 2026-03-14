import API from '../../service/ApiService';

const RESOURCE = '/exams';

export const createExam = (exam) => API.post(RESOURCE, exam);
export const updateExam = (id, exam) => API.put(`${RESOURCE}/${id}`, exam);
export const getExam = (id) => API.get(`${RESOURCE}/${id}`);
export const getAllExams = () => API.get(RESOURCE);
export const deleteExam = (id) => API.delete(`${RESOURCE}/${id}`);
