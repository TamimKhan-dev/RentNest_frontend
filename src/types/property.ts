export type Property = {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  isAvailable: boolean;
  image: string | null;
  categoryId: number;
  category: {id: number; name: string}, 
  ownerId: number;
  createdAt: string;
  updatedAt: string;
};

export type CreatePropertyPayload = {
  title: string;
  description: string;
  location: string;
  price: number;
  categoryId: number;
  isAvailable: boolean;
  amenities: string[];
  image: string | null;
};

export type UpdatePropertyPayload = {
  title?: string;
  description?: string;
  location?: string;
  price?: number;
  categoryId?: number;
  amenities?: string[];
};