// QueryContext.js
import React, { createContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const bodyClass = theme === 'light' ? 'bg-light' : 'bg-dark';
    document.body.classList.add(bodyClass);

    // Remover a classe do tema anterior ao mudar
    return () => {
      document.body.classList.remove('bg-light');
      document.body.classList.remove('bg-dark');
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
