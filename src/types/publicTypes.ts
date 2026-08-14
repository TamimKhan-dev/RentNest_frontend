
export type PublicProperty = {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  isAvailable: boolean;
  image: string | null;
  categoryId: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
  };
};
