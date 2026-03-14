import API from '../../service/ApiService';

const RESOURCE = '/courses';

// note: auth header is injected by ApiService interceptor

export const getAllCourses = async () => {
  const response = await API.get(RESOURCE);
  return response.data;
};  

export const getCourseById = async (id) => {
  const response = await API.get(`${RESOURCE}/${id}`);
  return response.data;
};

export const createCourse = async (course) => {
  const response = await API.post(RESOURCE, course);
  return response.data;
};

export const updateCourse = async (id, course) => {
  const response = await API.put(`${RESOURCE}/${id}`, course);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await API.delete(`${RESOURCE}/${id}`);
  return response.data;
};
