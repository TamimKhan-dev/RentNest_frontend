
export type Review = {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  property: {
    id: number;
    title: string;
    location: string;
    image: string | null;
  };
};