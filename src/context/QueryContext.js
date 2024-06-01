// QueryContext.js
import React, { createContext, useState } from "react";

export const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
  const [query, setQuery] = useState("");

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};
