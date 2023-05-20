
import { FC, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { AuthContext, authReducer } from './';
import { IUser } from '../../interface';
import { myFavoriteCoachApi } from '../../api';

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
         const { data } = await myFavoriteCoachApi.post('/auth/login', { email, password });
         dispatch({ type: 'Auth - Login', payload: data });
         Cookies.set('userId', data.id); //TODO: Deberá ser con el token JWT
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
      const { data } = await myFavoriteCoachApi.get(`/user?id=${id}`);
      if (!data) {
         dispatch({ type: 'Auth - Logout' });
         router.replace('/');
         return;
      }
      dispatch({ type: 'Auth - Login', payload: data });
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