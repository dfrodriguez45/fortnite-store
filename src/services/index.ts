import { bundleExists } from '../utils';
import { adaptBundle } from '../adapters/bundleAdapter';
import { adaptItem } from '../adapters/itemAdapter';

const API_URL = 'https://fortnite-api.com/v2/shop?language=es-419';

export async function getShop() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`La API de la tienda respondió ${response.status}`);
  const { data } = await response.json();

  return {
    date: data.date as string,
    bundles: data.entries
      .filter((entry: any) => bundleExists(entry.bundle))
      .map(adaptBundle),
    // La tienda también trae pistas de improvisación y piezas de coches; aquí solo van los objetos de Battle Royale
    items: data.entries
      .filter((entry: any) => !bundleExists(entry.bundle) && entry.brItems?.length > 0)
      .map(adaptItem),
  };
}
