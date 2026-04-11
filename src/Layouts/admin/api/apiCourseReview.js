import API from "../../service/ApiService";

export const getAdminCourses = async () => {
  const response = await API.get("/admin/courses");
  return response.data;
};

export const getCourseReviews = async (params = {}) => {
  const response = await API.get("/admin/course-reviews", { params });
  return response.data;
};

export const getCourseReviewStats = async () => {
  const response = await API.get("/admin/course-reviews/stats");
  return response.data;
};

export const replyCourseReview = async (reviewId, payload) => {
  const response = await API.put(`/admin/course-reviews/${reviewId}/reply`, payload);
  return response.data;
};

export const updateCourseReviewStatus = async (reviewId, payload) => {
  const response = await API.patch(`/admin/course-reviews/${reviewId}/status`, payload);
  return response.data;
};
