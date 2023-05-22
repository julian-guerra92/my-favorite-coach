
import { FormDataClient, IUser } from '../interface';
import { myFavoriteCoachApi } from '../api';

export const getUserById = async (id: string): Promise<IUser> => {
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

export const getTotalUsersByRole = async (role: string): Promise<Number> => {
   const { data } = await myFavoriteCoachApi.get(`/user/count-by-description?description=${role}`);
   return data;
}

export const createClient = async (formData: FormDataClient): Promise<IUser> => {
   const { data } = await myFavoriteCoachApi({
      url: '/user/create-client',
      method: 'post',
      data: formData
   })
   return data;
}

export const updateClient = async (user: IUser): Promise<IUser> => {
   const { data } = await myFavoriteCoachApi({
      url: '/user/update-client',
      method: 'put',
      data: user
   })
   return data;
}