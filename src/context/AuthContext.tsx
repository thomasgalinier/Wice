// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
  firstname: string,
  lastname: string,
  iconurl: string,
  userId: number,
  accesstype: string
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken) {
      fetch('http://localhost:3000/auth/user/me', {
        method: 'GET',
        headers: { "Authorization": `Bearer ${jwtToken}` }
      })
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error(error));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
