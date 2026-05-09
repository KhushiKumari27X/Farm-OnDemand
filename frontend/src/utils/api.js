import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Connects to local Node server
});

// Add a request interceptor to attach the JWT token to every request
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://images.unsplash.com/photo-1592982537447-6f23f66299b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  if (imagePath.startsWith("http")) return imagePath;
  
  // Normalize Windows paths by replacing backslashes with forward slashes
  const normalizedPath = imagePath.replace(/\\/g, "/");
  
  // Ensure it starts with a slash
  const finalPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
  
  return `http://localhost:5000${finalPath}`;
};

export default API;
