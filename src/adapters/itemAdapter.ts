import { Item } from "../models";

export const adaptItemsDailyData = (data: any): Item[] => {
  return data.map((item: any) => {
    return {
      id: item.offerId,
      name: item.items[0].name,
      price: item.finalPrice,
      rarity: item.items[0].rarity.value,
      images: {
        icon: item.items[0].images.icon,
        featured: item.items[0].images.featured,
      },
    };
  });
}