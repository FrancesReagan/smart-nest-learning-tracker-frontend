import { backendClient } from "../client/backendClient";  
// course API//
export const getCourses = async () => {
  const response = await backendClient.get("/courses");
  return response.data;
};


export const createCourses = async (courseData) => {
  const response = await backendClient.post("/courses", courseData);
  return response.data;
};


