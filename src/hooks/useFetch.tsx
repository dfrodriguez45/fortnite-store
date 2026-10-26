import { useCallback, useEffect, useState } from "react";

import { Bundle } from "../types/bundleType";
import { Item } from "../types/itemType";
import { getShop } from "../services";

const useFetch = () => {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [day, setDay] = useState<string>("");
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    getShop()
      .then(({ date, bundles, items }) => {
        if (ignore) return;
        setBundles(bundles);
        setItems(items);
        setDay(
          new Date(date).toLocaleDateString("es-419", {
            weekday: "long",
            month: "long",
            day: "numeric",
            // La fecha de la tienda es medianoche UTC; sin esto sale el día anterior en América
            timeZone: "UTC",
          })
        );
        setStatus("ready");
      })
      .catch(() => {
        if (!ignore) setStatus("error");
      });
    return () => {
      ignore = true;
    };
  }, [attempt]);

  // Tras un error vuelve a mostrar la carga; si ya hay tienda, la cambia sin parpadeo
  const reload = useCallback(() => {
    setStatus((current) => (current === "error" ? "loading" : current));
    setAttempt((current) => current + 1);
  }, []);

  return { bundles, items, day, status, reload };
};

export default useFetch;
