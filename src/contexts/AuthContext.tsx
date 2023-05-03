import { ReactNode, createContext, useState } from "react";
import { setCookie } from 'nookies';
import Router from "next/router";
import { api } from "@/services/api";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
 
}
type AuthContextData = {

  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;

};

type AuthProviderProps = {
  children: ReactNode;
}



export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps){
  
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  //const router = useRouter();

  async function signIn({email, password}: SignInCredentials){
 try {
  const response = await api.post('sessions', {
    email,password
   })

   //sessionStorage - Somente enquanto navegador aberto
   //localStorage - Valido enquanto token válido
   //cookies - 
 
   const{token, refreshToken,permissions, roles} = response.data;
   
   //Recebe 4 parametros: contexto da requsição, nome do cookie, token, informações adicionais do token
   setCookie(undefined, 'nextauth.token', token,{
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: '/'
   })

   setCookie(undefined, 'nextauth.refreshToken', refreshToken,{
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: '/'
   })

   setUser({
    email,
    permissions,
    roles,
   })

   Router.push('/dashboard')
 }catch(error){
  console.log(error);
 }
   
  }
  return(
    <AuthContext.Provider value={{signIn, user, isAuthenticated, }}>
      {children}
    </AuthContext.Provider>
  )
}