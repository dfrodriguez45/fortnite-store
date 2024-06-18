import { useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

import BundleCard from "./components/BundleCard";
import ItemCard from "./components/ItemCard";
import useFetch from "./hooks/useFetch";
import useFilter from "./hooks/useFilter";

function App() {
  const { bundles, items, day } = useFetch();
  const {
    itemsFiltered,
    handleChangeItemSection,
    currentItemSection,
    countItems,
  } = useFilter(items);

  const topRef = useRef<HTMLHeadingElement>(null);

  const [currentSection, setCurrentSection] = useState("bundles");

  function handleChangeSection(section: string) {
    setCurrentSection(section);
  }

  function translateTo(itemSection: string) {
    switch (itemSection) {
      case "all":
        return "-translate-x-[0.6rem] w-[7rem]";
      case "outfit":
        return "translate-x-[7.7rem] w-[9.5rem]";
      case "emote":
        return "translate-x-[18.5rem] w-[6.9rem]";
      case "pickaxe":
        return "translate-x-[26.9rem] w-[6.5rem]";
      case "backpack":
        return "translate-x-[34.8rem] w-[8.2rem]";
      case "glider":
        return "translate-x-[44.4rem] w-[10.8rem]";
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
              className="flex flex-nowrap items-center justify-start w-full lg:w-auto overflow-x-auto gap-10 relative text-center p-3"
              style={{ scrollbarWidth: "none" }}
            >
              <button
                type="button"
                className={`${
                  currentItemSection == "all"
                    ? "text-black delay-300"
                    : "text-white"
                } font-bold text-nowrap w-full cursor-pointer transition-all`}
                onClick={() => handleChangeItemSection("all")}
              >
                TODOS ({countItems.all})
              </button>
              <button
                type="button"
                className={`${
                  currentItemSection == "outfit"
                    ? "text-black delay-300"
                    : "text-white"
                } font-bold text-nowrap w-full cursor-pointer transition-all`}
                onClick={() => handleChangeItemSection("outfit")}
              >
                ATUENDOS ({countItems.outfit})
              </button>
              <button
                type="button"
                className={`${
                  currentItemSection == "emote"
                    ? "text-black delay-300"
                    : "text-white"
                } font-bold text-nowrap w-full cursor-pointer transition-all`}
                onClick={() => handleChangeItemSection("emote")}
              >
                GESTOS ({countItems.emote})
              </button>
              <button
                type="button"
                className={`${
                  currentItemSection == "pickaxe"
                    ? "text-black delay-300"
                    : "text-white"
                } font-bold text-nowrap w-full cursor-pointer transition-all`}
                onClick={() => handleChangeItemSection("pickaxe")}
              >
                PICOS ({countItems.pickaxe})
              </button>
              <button
                type="button"
                className={`${
                  currentItemSection == "backpack"
                    ? "text-black delay-300"
                    : "text-white"
                } font-bold text-nowrap w-full cursor-pointer transition-all`}
                onClick={() => handleChangeItemSection("backpack")}
              >
                MOCHILAS ({countItems.backpack})
              </button>
              <button
                type="button"
                className={`${
                  currentItemSection == "glider"
                    ? "text-black delay-300"
                    : "text-white"
                } font-bold text-nowrap w-full cursor-pointer transition-all`}
                onClick={() => handleChangeItemSection("glider")}
              >
                PLANEADORES ({countItems.glider})
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

  function handleScrollToTop() {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="p-4 flex flex-col gap-4 items-center min-h-dvh overflow-hidden">
      <h1 ref={topRef} className="flex flex-col">
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
      <button
        type="button"
        onClick={handleScrollToTop}
        className="fixed bottom-4 right-4 p-4 rounded-full bg-blue-500 text-white shadow-md shadow-gray-800 animate-bounce"
      >
        <FaArrowUp size={24} />
      </button>
    </div>
  );
}

export default App;
