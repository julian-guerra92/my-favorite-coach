
import { IWorkout } from ".";

export interface IUser {
   _id?: string;
   identificationNumber: string;
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   phoneNumber: string;
   role?: string;
   gender: string;
   age: Number;
   weight?: Number;
   height?: Number;
   profilePicture?: string;
   active?: boolean;
   workouts?: IWorkout[];
}