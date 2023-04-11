import React from 'react'
import { adaptItemsDailyData } from '../adapters';
import { getItemsDaily } from '../services';
interface ShopProviderProps {
  children: React.ReactNode;
}

export const ShopContext = React.createContext({} as any)

const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {

  const [vbucksIcon, setVbucksIcon] = React.useState<string>('');
  const [daily, setDaily] = React.useState<any>([]);
  const [featured, setFeatured] = React.useState<any>([]);
  const [specialFeatured, setSpecialFeatured] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [remainingTime, setRemainingTime] = React.useState<string>('');

  async function getItems() {
    const dailyData = await getItemsDaily();
    const dailyItems = adaptItemsDailyData(dailyData);
    setDaily(dailyItems);
  }

  function getTime() {
    const date = new Date();

    const nextHours = 23 - date.getUTCHours();;
    const nextMinutes = 59 - date.getUTCMinutes();
    const nextSeconds = 59 - date.getUTCSeconds();

    setRemainingTime(`${nextHours < 10 ? `0${nextHours}` : nextHours}:${nextMinutes < 10 ? `0${nextMinutes}` : nextMinutes}:${nextSeconds < 10 ? `0${nextSeconds}` : nextSeconds}`);
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      getTime();

      if (remainingTime === '00:00:00') {
        getItems();
      }

      if (remainingTime === '23:59:59') {
        setDaily([]);
        setLoading(true);
      }

      if (loading) {
        setLoading(false);
      }
    }, 1000);

    getItems();

    return () => {
      setDaily([]);
      clearInterval(interval);
    }
  }, [loading]);

  return (
    <ShopContext.Provider value={{
      vbucksIcon,
      daily,
      featured,
      specialFeatured,
      loading,
      remainingTime
    }}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopProvider