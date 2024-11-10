import axios from "axios";

const api = axios.create({
  baseURL: "https://deep-translate1.p.rapidapi.com/",
  headers: {
    "x-rapidapi-key": "62daa3f4d8msh4434cd1c8d199dep18ef4cjsn7c0a81d180ca",
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
