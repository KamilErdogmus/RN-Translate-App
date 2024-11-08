import { useRecoilState } from "recoil";
import { themeState, lightTheme, darkTheme } from "../atoms/themeAtom";

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const getCurrentTheme = () => {
    return theme === "light" ? lightTheme : darkTheme;
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    getCurrentTheme,
    isDarkMode: theme === "dark",
  };
};
