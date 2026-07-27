export type Gender = 'male' | 'female';

export interface Hero {
  name: string;
  age: number;
  gender: Gender;
  location: string;
}