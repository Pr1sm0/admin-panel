export interface Item {
  id?: number;
  name: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: Boolean;
}

export interface User {
  id?: number;
  name: string;
  role: string;
  email: string;
  password: string;
  token: string;
}