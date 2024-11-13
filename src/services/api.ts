import axios from "axios";
import { RAPID_API_KEY } from "@env";

const api = axios.create({
  baseURL: "https://deep-translate1.p.rapidapi.com/",
  headers: {
    "x-rapidapi-key": RAPID_API_KEY,
    "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
    "Content-Type": "application/json",
  },
});

export const getLanguages = async () => {
  const options = {
    method: "GET",
    url: "language/translate/v2/languages",
  };

  try {
    const response = await api.request(options);
    return response.data.languages;
  } catch (error) {
    console.log(error);
  }
};

export const translateQuery = async (
  query: string,
  source: string,
  target: string
) => {
  try {
    const response = await api.post("language/translate/v2", {
      q: query,
      source,
      target,
    });

    return response.data.data.translations.translatedText;
  } catch (error) {
    console.error("Translation API Error:", error);
    throw error;
  }
};
