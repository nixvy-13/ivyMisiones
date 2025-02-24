import { createContext, useContext } from 'react';
import UseStorageState from '../servicios/UseStorageState';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = UseStorageState('usuario', null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);