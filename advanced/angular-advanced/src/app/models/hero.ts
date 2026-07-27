export type Gender = 'male' | 'female';

export interface GenderOption {
  id: string;
  text: string;
  value: Gender;
}

export interface Hero {
  name: string;
  age: number;
  gender: Gender;
  location: string;
}