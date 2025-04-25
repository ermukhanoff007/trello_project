import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  
  return (
    <AppContext.Provider value={{ boards, setBoards, activeBoardId, setActiveBoardId }}>
      {children}
    </AppContext.Provider>
  );
};
