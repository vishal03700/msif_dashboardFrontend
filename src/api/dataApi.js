import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";
const assetBaseUrl = apiBaseUrl.replace(/\/api\/?$/, "");

const api = axios.create({
  baseURL: apiBaseUrl
});

export const fetchIntelligenceData = async (type) => {
  const response = await api.get("/data", {
    params: type && type !== "ALL" ? { type } : {}
  });

  return response.data.data.map((point) => ({
    ...point,
    imageUrl: point.imageUrl // Now directly from Cloudinary
  }));
};

export const uploadIntelligenceFile = async ({ file, metadata }) => {
  const formData = new FormData();
  formData.append("file", file);

  if (metadata) {
    Object.entries(metadata).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    });
  }

  const response = await api.post("/upload", formData);

  return response.data;
};

export default api;
