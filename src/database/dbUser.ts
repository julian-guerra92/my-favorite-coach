
import { IUser } from '../interface';
import { myFavoriteCoachApi } from '../api';

export const getUserById = async (id: string) => {
   const { data } = await myFavoriteCoachApi.get(`/user/find-by-id?id=${id}`);
   return data;

}

export const getUsersByRole = async (role: string): Promise<IUser[]> => {
   const { data } = await myFavoriteCoachApi.get(`/user/find-by-role?description=${role}`);
   return data;
}

export const validateCredentials = async (email: string, password: string): Promise<IUser> => {
   const { data } = await myFavoriteCoachApi.post('/auth/login', { email, password });
   return data;
}