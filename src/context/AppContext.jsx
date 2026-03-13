import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('EN');
  const [theme, setTheme] = useState('light');

  return (
    <AppContext.Provider value={{ currency, setCurrency, language, setLanguage, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
