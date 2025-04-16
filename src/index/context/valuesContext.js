// contexts/ValuesContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const ValuesContext = createContext();

// Create a custom hook to use the context
export const useValues = () => {
  const context = useContext(ValuesContext);
  if (!context) {
    throw new Error('useValues must be used within a ValuesProvider');
  }
  return context;
};

// Create the provider component
export const ValuesProvider = ({ children }) => {
  const [valueStatus, setValueStatus] = useState('saldo');
  const [isHovering, setIsHovering] = useState(false);
  
  // Value object to be provided to consumers
  const value = {
    valueStatus,
    setValueStatus,
    isHovering,
    setIsHovering
  };
  
  return (
    <ValuesContext.Provider value={value}>
      {children}
    </ValuesContext.Provider>
  );
};