// why separate API functions:

// separation - it is good to have API logic separate from the components//
// reusable - can use this across different components//
// testing made easier - test API functions without interaction//
// consistent - API calls follow the same kind of pattern//
// error handling -  error handling is in one central place//

import { backendClient } from "../client/backendClient";  
// course API//

export const createCourses = async (courseData) => {
  const response = await backendClient.post("/courses", courseData);
  return response.data;
};


export const getCourses = async () => {
  const response = await backendClient.get("/courses");
  return response.data;
};


// sessions API//

export const createSession = async (courseId, sessionData) => {
  const response = await backendClient.post(`/courses/${courseId}/sessions`, sessionData);
  return response.data;
};

export const getSessions = async (courseId) => {
  const response = await backendClient.get(`/courses/${courseId}/sessions`);
  return response.data;
};

export const getSession = async (courseId, sessionId) => {
  const response = await backendClient.get(`/courses/${courseId}/sessions/${sessionId}`);
  return response.data;
};

export const updateSession = async (courseId, sessionId, sessionData) => {
  const response = await backendClient.put(`/courses/${courseId}/sessions/${sessionId}`, sessionData);
  return response.data;
};

export const deleteSession = async (courseId, sessionId) => {
  const response = await backendClient.delete(`/courses/${courseId}/sessions/${sessionId}`);
  return response.data;
};
