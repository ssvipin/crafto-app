import axios from "axios";

const API_BASE_URL = "https://assignment.stage.crafto.app";

export const login = async (username, otp) => {
  return await axios.post(`${API_BASE_URL}/login`, { username, otp });
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return await axios.post(
    "https://crafto.app/crafto/v1.0/media/assignment/upload",
    formData
  );
};

export const createQuote = async (token, text, mediaUrl) => {
  return await axios.post(
    `${API_BASE_URL}/postQuote`,
    { text, mediaUrl },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const getQuotes = async (token,limit,offset) => {
    return await axios.get(`${API_BASE_URL}/getQuotes?limit=${limit}&offset=${offset}`, {
        headers:{
            Authorization:token
        }
    })
}

export const formatCreatedAt = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);

  const diffTime = now - postDate; // Difference in milliseconds
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // If the post is created today, return the time in AM/PM format
    const hours = postDate.getHours();
    const minutes = postDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0-23 to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    return `${diffDays} days ago`;
  }
};
