export interface Item {
  id: string;
  name: string;
  price: number;
  rarity: string;
  images: {
    icon: string;
    featured: string;
  };
}