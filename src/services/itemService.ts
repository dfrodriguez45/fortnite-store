import axios from 'axios';

const API_URL = 'https://fortnite-api.com/v2/shop/br?language=es-419';

const getItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getItemsDaily = async () => {
  const response = await getItems();
  console.log(response.data.daily.entries);
  return response.data.daily.entries.sort((a: any, b: any) => b.sortPriority - a.sortPriority);
};