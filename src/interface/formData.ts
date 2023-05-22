
export interface FormDataExercise {
   title: string;
   description: string;
   calories: Number;
   intensity: string;
   referenceImage?: string;
}

export interface FormDataClient {
   identificationNumber: string;
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   phoneNumber: string;
   gender: string;
   age: Number;
   weight?: Number;
   height?: Number;
   profilePicture?: string;
}