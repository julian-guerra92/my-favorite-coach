
import { FC, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { AuthContext, authReducer } from './';
import { IUser } from '../../interface';
import { dbUsers } from '../../database';

export interface AuthState {
   isLoggedIn: boolean;
   user?: IUser
}

interface Props {
   children: JSX.Element | JSX.Element[];
}

const Auth_INITIAL_STATE: AuthState = {
   isLoggedIn: false,
   user: undefined
}

export const AuthProvider = ({ children }: Props) => {

   const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

   const router = useRouter();

   useEffect(() => {
      checkLogin();
   }, [])


   const loginUser = async (email: string, password: string): Promise<boolean> => {
      try {
         const user = await dbUsers.validateCredentials(email, password);
         dispatch({ type: 'Auth - Login', payload: user });
         Cookies.set('userId', user.id || ''); //TODO: Deberá ser con el token JWT
         return true;
      } catch (error) {
         return false;
      }
   }

   const logout = () => {
      Cookies.remove('userId');
      dispatch({ type: 'Auth - Logout' });
   }


   //TODO: Todo este método debe ser sustituido por validación de JWT
   const checkLogin = async () => {
      const id = Cookies.get('userId');
      if (!id) {
         router.replace('/');
         return;
      }
      try {
         const user = await dbUsers.getUserById(id);
         dispatch({ type: 'Auth - Login', payload: user });
      } catch (error) {
         dispatch({ type: 'Auth - Logout' });
         router.replace('/');
      }
   }

   return (
      <AuthContext.Provider value={{
         ...state,
         loginUser,
         logout
      }}>
         {children}
      </AuthContext.Provider>
   )
}