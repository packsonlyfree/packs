// QueryContext.js
import React, { createContext, useState } from "react";
import lS from "manager-local-storage";

const preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const autoTheme = preferDark ? "dark" : "light";
const initialState = lS.get("only-free-theme") ?? autoTheme;

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialState);


  const handleSetTheme = () => {
    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
  }

  return (
    <ThemeContext.Provider value={{ theme, handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
