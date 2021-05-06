export interface Item {
  name: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: Boolean;
}

export interface User {
  name: string;
  role: string;
  email: string;
  password: string;
}