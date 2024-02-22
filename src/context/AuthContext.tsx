// AuthContext.js
import React, { createContext, useContext } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query'
interface User {
  firstname: string,
  lastname: string,
  iconurl: string,
  userId: number,
  accesstype: string
  email: string
}
import { fetchUsers } from '../api/auth';
interface AuthContextType {
  user: User | null; 
}

const AuthContext = createContext<AuthContextType>({ user: null});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {


  const jwtToken = Cookies.get('jwt_token');
  const { data, status } = useQuery({queryKey:["userMe"], queryFn: ()=>fetchUsers(jwtToken)})
  console.log(status);
  
  // useEffect(() => {
  //   if (jwtToken) {
  //     fetch('http://localhost:3000/auth/user/me', {
  //       method: 'GET',
  //       headers: { "Authorization": `Bearer ${jwtToken}` }
  //     })
  //     .then(response => response.json())
  //     .then(data => setUser(data))
  //     .catch(error => setUser(null));
  //   }
  // }, [jwtToken]);

  return (
    <AuthContext.Provider value={{  user:data }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
