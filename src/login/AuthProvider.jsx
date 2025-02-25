import { createContext, useContext } from 'react';
import UseStorageState from '../servicios/UseStorageState';
import { useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = UseStorageState('usuario', null);

  const [administrador, setAdministrador] = useState(false);

  const login = (userData, esAdmin) => {
    setUser(userData);
    setAdministrador(esAdmin)
  }

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, administrador }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);