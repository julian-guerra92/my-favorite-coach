
import { IWorkout } from ".";
import { IRole } from "./role";

export interface IUser {
   id?: string;
   identificationNumber: string;
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   phoneNumber: string;
   role?: IRole;
   gender: string;
   age: Number;
   weight?: Number;
   height?: Number;
   profilePicture?: string;
   active?: boolean;
   workouts?: IWorkout[];
}