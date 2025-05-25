import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cargar usuario desde localStorage al iniciar
    const storedUser = localStorage.getItem('loveGiftsUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    // Validación simple (en producción usaría bcrypt)
    const users = JSON.parse(localStorage.getItem('loveGiftsUsers') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { ...foundUser, password: undefined };
      localStorage.setItem('loveGiftsUser', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('loveGiftsUsers') || '[]');
    
    if (users.some(u => u.email === email)) {
      return false; // Usuario ya existe
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('loveGiftsUsers', JSON.stringify([...users, newUser]));
    return true;
  };

  const logout = () => {
    localStorage.removeItem('loveGiftsUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};