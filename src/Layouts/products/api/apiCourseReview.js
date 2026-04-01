import API from "../../service/ApiService";

export const getCourseReviews = async (courseId) => {
  const response = await API.get(`/courses/${courseId}/reviews`);
  return response.data;
};

export const createCourseReview = async (payload) => {
  const response = await API.post("/course-reviews", payload);
  return response.data;
};
