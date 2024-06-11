import { useEffect, useState } from "react";

import BundleCard from "./components/BundleCard";
import ItemCard from "./components/ItemCard";
import { getBundles, getDay, getItems } from "./services";
import type { Bundle } from "./types/bundleType";
import type { Item } from "./types/itemType";

function App() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [day, setDay] = useState<String>("");

  const [currentSection, setCurrentSection] = useState("bundles");

  function handleChangeSection(section: string) {
    setCurrentSection(section);
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
          <div className="grid md:grid-cols-5 gap-4 animate-slidein500 opacity-0">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
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

  return (
    <div className="p-4 flex flex-col gap-4 items-center min-h-dvh">
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
