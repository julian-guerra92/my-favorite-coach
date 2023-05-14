
import { IUser, IExercise } from "./";

export interface IWorkout {
   _id?: string;
   creationDate?: string;
   executionDate: string;
   client: IUser;
   exercises: IExercise[];
   executed: boolean;
}