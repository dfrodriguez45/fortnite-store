import { useEffect, useState } from "react";

import BundleCard from "./components/BundleCard";
import ItemCard from "./components/ItemCard";
import { getBundles, getDay, getItems } from "./services";
import type { Bundle } from "./types/bundleType";
import type { Item } from "./types/itemType";

function App() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [itemsFiltered, setItemsFiltered] = useState<Item[]>([])
  const [day, setDay] = useState<string>("");

  const [currentSection, setCurrentSection] = useState("bundles");
  const [currentItemSection, setCurrentItemSection] = useState("all");

  function handleChangeSection(section: string) {
    setCurrentSection(section);
  }

  function handleChangeItemSection(section: string) {
    setCurrentItemSection(section);
  }

  function translateTo(itemSection: string) {
    switch (itemSection) {
      case "all":
        return "-translate-x-[0.6rem] w-[5rem]";
      case "outfit":
        return "translate-x-[5.7rem] w-[7rem]";
      case "emote":
        return "translate-x-[14rem] w-[5.5rem]";
      case "pickaxe":
        return "translate-x-[20.9rem] w-[4.2rem]";
      case "backpack":
        return "translate-x-[26.5rem] w-[6.8rem]";
      case "glider":
        return "translate-x-[34.8rem] w-[9rem]";
    }
  }

  function handleSectionContent() {
    switch (currentSection) {
      case "bundles":
        return bundles.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4 animate-slidein500 opacity-0">
            {bundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-1">
            <p className="text-3xl font-bold animate-pulse">Cargando...</p>
          </div>
        );
      case "items":
        return items.length > 0 ? (
          <>
            <div
              className="flex flex-nowrap items-center justify-start w-full md:w-auto overflow-x-auto gap-10 relative text-center p-3"
              style={{ scrollbarWidth: "none" }}
            >
              <button
                type="button"
                className={`${
                  currentItemSection == "all"
                    ? "text-black delay-300"
                    : "text-white"
                } font-bold w-full cursor-pointer transition-all`}
                onClick={() => handleChangeItemSection("all")}
              >
                TODOS
              </button>
              <button
                type="button"
                className={`${
                  currentItemSection == "outfit"
                    ? "text-black delay-300"
                    : "text-white"
                } font-bold w-full cursor-pointer transition-all`}
                onClick={() => handleChangeItemSection("outfit")}
              >
                ATUENDOS
              </button>
              <button
                type="button"
                className={`${
                  currentItemSection == "emote"
                    ? "text-black delay-300"
                    : "text-white"
                } font-bold w-full cursor-pointer transition-all`}
                onClick={() => handleChangeItemSection("emote")}
              >
                GESTOS
              </button>
              <button
                type="button"
                className={`${
                  currentItemSection == "pickaxe"
                    ? "text-black delay-300"
                    : "text-white"
                } font-bold w-full cursor-pointer transition-all`}
                onClick={() => handleChangeItemSection("pickaxe")}
              >
                PICOS
              </button>
              <button
                type="button"
                className={`${
                  currentItemSection == "backpack"
                    ? "text-black delay-300"
                    : "text-white"
                } font-bold w-full cursor-pointer transition-all`}
                onClick={() => handleChangeItemSection("backpack")}
              >
                MOCHILAS
              </button>
              <button
                type="button"
                className={`${
                  currentItemSection == "glider"
                    ? "text-black delay-300"
                    : "text-white"
                } font-bold w-full cursor-pointer transition-all`}
                onClick={() => handleChangeItemSection("glider")}
              >
                PLANEADORES
              </button>
              <span
                className={`absolute rounded-full bg-white h-6 w-24 -z-10 transform ${translateTo(
                  currentItemSection
                )} transition-all duration-500`}
              />
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 animate-slidein500 opacity-0">
              {itemsFiltered.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center flex-1">
            <p className="text-3xl font-bold animate-pulse">Cargando...</p>
          </div>
        );
    }
  }

  useEffect(() => {
    getBundles().then((bundles) => setBundles(bundles));
    getItems().then((items) => setItems(items));
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

  return (
    <div className="p-4 flex flex-col gap-4 items-center min-h-dvh overflow-hidden">
      <h1 className="flex flex-col">
        <span className="text-3xl text-center font-bold">Tienda</span>
        <span className="text-lg text-center animate-slidein700 opacity-0">
          {day}
        </span>
      </h1>
      <div className="flex gap-10 relative text-center">
        <button
          type="button"
          className={`${
            currentSection == "bundles" ? "text-black delay-300" : "text-white"
          } font-bold w-full cursor-pointer transition-all`}
          onClick={() => handleChangeSection("bundles")}
        >
          LOTES
        </button>
        <button
          type="button"
          className={`${
            currentSection == "items" ? "text-black delay-300" : "text-white"
          } font-bold w-full cursor-pointer transition-all`}
          onClick={() => handleChangeSection("items")}
        >
          ITEMS
        </button>
        <span
          className={`absolute rounded-full bg-white h-6 w-24 -z-10 transform ${
            currentSection == "bundles"
              ? "-translate-x-5"
              : "translate-x-[4.5rem]"
          } transition-all duration-500`}
        />
      </div>
      {handleSectionContent()}
    </div>
  );
}

export default App;
