import React, { createContext, useState, useContext } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState('Interval Monitoring'); 

  const updateMode = (mode) => {
    setMode(mode);
  };

  return (
    <ModeContext.Provider value={{ mode, updateMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);
