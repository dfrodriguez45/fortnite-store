import { useEffect, useState } from "react";
import { Item } from "../types/itemType";

const useFilter = (items: Item[]) => {
  const [itemsFiltered, setItemsFiltered] = useState<Item[]>([]);
  const [currentItemSection, setCurrentItemSection] = useState("all");
  const [countItems, setCountItems] = useState<{
    all: number;
    outfit: number;
    emote: number;
    pickaxe: number;
    backpack: number;
    glider: number;
  }>({
    all: 0,
    outfit: 0,
    emote: 0,
    pickaxe: 0,
    backpack: 0,
    glider: 0,
  });

  function handleChangeItemSection(section: string) {
    setCurrentItemSection(section);
  }

  useEffect(() => {
    switch (currentItemSection) {
      case "all":
        setItemsFiltered(items);
        break;
      case "outfit":
        setItemsFiltered(items.filter((item) => item.type === "outfit"));
        break;
      case "emote":
        setItemsFiltered(items.filter((item) => item.type === "emote"));
        break;
      case "pickaxe":
        setItemsFiltered(items.filter((item) => item.type === "pickaxe"));
        break;
      case "backpack":
        setItemsFiltered(items.filter((item) => item.type === "backpack"));
        break;
      case "glider":
        setItemsFiltered(items.filter((item) => item.type === "glider"));
        break;
    }
  }, [currentItemSection, items]);

  useEffect(() => {
    setCountItems({
      all: items.length,
      outfit: items.filter((item) => item.type === "outfit").length,
      emote: items.filter((item) => item.type === "emote").length,
      pickaxe: items.filter((item) => item.type === "pickaxe").length,
      backpack: items.filter((item) => item.type === "backpack").length,
      glider: items.filter((item) => item.type === "glider").length,
    });
  }, [items]);

  return {
    itemsFiltered,
    handleChangeItemSection,
    currentItemSection,
    countItems,
  };
};

export default useFilter;
