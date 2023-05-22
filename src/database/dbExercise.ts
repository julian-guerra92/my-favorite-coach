
import { FormDataExercise, IExercise } from "../interface";
import { myFavoriteCoachApi } from "../api";


export const getAll = async (): Promise<IExercise[]> => {
   const { data } = await myFavoriteCoachApi.get('/exercise');
   return data;
}

export const getById = async (id: string): Promise<IExercise> => {
   const { data } = await myFavoriteCoachApi.get(`/exercise/find-by-id?id=${id}`);
   return data;
}

export const getTotalExercises = async (): Promise<Number> => {
   const { data } = await myFavoriteCoachApi.get('/exercise/total-exercises');
   return data;
}

export const create = async (formData: FormDataExercise): Promise<IExercise> => {
   const { data } = await myFavoriteCoachApi({
      url: '/exercise/create-exercise',
      method: 'post',
      data: formData
   })
   return data;
}

export const update = async (exercise: IExercise): Promise<IExercise> => {
   const { data } = await myFavoriteCoachApi({
      url: '/exercise/update-exercise',
      method: 'put',
      data: exercise
   })
   return data;
}