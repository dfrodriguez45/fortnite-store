import { useEffect, useState } from "react";

import { Bundle } from "../types/bundleType";
import { Item } from "../types/itemType";
import { getBundles, getDay, getItems } from "../services";

const useFetch = () => {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [day, setDay] = useState<string>("");

  useEffect(() => {
    getBundles().then((bundles: Bundle[]) => setBundles(bundles));
    getItems().then((items: Item[]) => setItems(items));
    getDay().then((day) =>
      setDay(
        new Date(day).toLocaleDateString("es-419", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      )
    );
  }, []);

  return { bundles, items, day };
};

export default useFetch;
