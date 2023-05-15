
interface SeedUser {
   id: string;
   identificationNumber: string;
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   phoneNumber: string;
   role?: 'coach' | 'client';
   gender: 'masculino' | 'femenino';
   age: Number;
   weight?: Number;
   height?: Number;
   profilePicture?: string;
   active?: boolean;
   workouts?: SeedWorkout[];
}

interface SeedExercise {
   title: string;
   description: string;
   calories: Number;
   intensity: string;
   video: string;
}

interface SeedWorkout {
   creationDate?: string;
   executionDate: string;
   client: SeedUser;
   exercises: SeedExercise[];
   executed: boolean;
}

interface SeedData {
   users: SeedUser[];
}

export const initialData: SeedData = {
   users: [
      // {
      //    _id: '1094931275',
      //    identificationNumber: '1094931275',
      //    firstName: 'Julián Andrés',
      //    lastName: 'Rodríguez Guerra',
      //    email: 'julian@google.com',
      //    password: '123456',
      //    role: 'coach',
      //    gender: 'masculino',
      //    age: 30,
      // },
      {
         id: '1',
         identificationNumber: '1',
         firstName: 'Darshan',
         lastName: 'Patel',
         email: 'darshan@google.com',
         password: '123456',
         phoneNumber: '3207668532',
         role: 'client',
         gender: 'masculino',
         age: 25,
         weight: 80,
         height: 1.70,
         profilePicture: '1.jpg',
         active: true
      },
      {
         id: '2',
         identificationNumber: '2',
         firstName: 'Evelin',
         lastName: 'Ciseneros',
         email: 'evelin@google.com',
         password: '123456',
         phoneNumber: '3207668532',
         role: 'client',
         gender: 'femenino',
         age: 50,
         weight: 80,
         height: 1.70,
         profilePicture: '2.jpg',
         active: true
      },
      {
         id: '3',
         identificationNumber: '3',
         firstName: 'Bladimir',
         lastName: 'Strong',
         email: 'bladimir@google.com',
         phoneNumber: '3207668532',
         password: '123456',
         role: 'client',
         gender: 'masculino',
         age: 38,
         weight: 80,
         height: 1.70,
         profilePicture: '3.jpg',
         active: false
      },
      {
         id: '4',
         identificationNumber: '4',
         firstName: 'Luis',
         lastName: 'Villamil',
         email: 'luis@google.com',
         password: '123456',
         phoneNumber: '3207668532',
         role: 'client',
         gender: 'masculino',
         age: 32,
         weight: 80,
         height: 1.70,
         profilePicture: '4.jpg',
         active: false
      },
      {
         id: '5',
         identificationNumber: '5',
         firstName: 'Stephanie',
         lastName: 'Liverani',
         email: 'stephani@google.com',
         password: '123456',
         phoneNumber: '3207668532',
         role: 'client',
         gender: 'femenino',
         age: 36,
         weight: 80,
         height: 1.70,
         profilePicture: '5.jpg',
         active: true
      },
      {
         id: '6',
         identificationNumber: '6',
         firstName: 'Albert',
         lastName: 'Buitrago',
         email: 'albert@google.com',
         password: '123456',
         phoneNumber: '3207668532',
         role: 'client',
         gender: 'masculino',
         age: 28,
         weight: 80,
         height: 1.70,
         profilePicture: '6.jpg',
         active: true
      }
   ]
}