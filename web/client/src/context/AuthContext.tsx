// context/AuthContext.tsx

import React, {  useState,  }  from "preact/hooks";
import {  createContext, FunctionalComponent, ComponentChildren } from "preact";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
  setUsername: (username: string | null) => void; // Ensure this is correct
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FunctionalComponent<{ children: ComponentChildren }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  const login = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, login, logout, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
