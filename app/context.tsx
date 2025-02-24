import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext({
  userId: null,
  setUserId: () => {},
});

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext); 