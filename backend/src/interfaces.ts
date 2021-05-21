export interface Item {
  id?: number;
  name: string;
  price: number;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  is_published: Boolean;
}

export interface User {
  id?: number;
  name: string;
  role: string;
  email: string;
  password: string;
  token?: string;
}

export interface Image {
  id?: number;
  size: string;
  itemId: number;
  imageUrl: string;
}
