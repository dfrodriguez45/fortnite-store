import axios from 'axios';

import { bundleExists } from '../utils';
import { adaptBundle } from '../adapters/bundleAdapter';

const API_URL = 'https://fortnite-api.com/v2/shop/br?language=es-419';

async function getData() {
  const response = await axios.get(API_URL);
  return response.data.data;
}

export async function getDay() {
  const data = await getData();
  return data.date;
}


export async function getBundles() {
  const data = await getData();
  return data.featured.entries
    .map((entry: any) => {
      if (!bundleExists(entry.bundle)) return null;
      return adaptBundle(entry);
      })
    .filter((bundle: any) => bundle !== null);
}