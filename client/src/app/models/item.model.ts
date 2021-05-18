export interface Item {
  id?: number;
  name: string;
  price?: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  isPublished: Boolean;
}