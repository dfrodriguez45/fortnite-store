import { useMemo, useState } from "react";

import Header from "./components/Header";
import PavosMachine, { type Offer } from "./components/PavosMachine";
import ScrollTopButton from "./components/ScrollTopButton";
import SectionIndex from "./components/SectionIndex";
import ShopDetail from "./components/ShopDetail";
import ShopSection from "./components/ShopSection";
import ShopStatus from "./components/ShopStatus";
import useActiveSection from "./hooks/useActiveSection";
import useCountdown from "./hooks/useCountdown";
import useFetch from "./hooks/useFetch";
import useFilter from "./hooks/useFilter";
import type { Detail } from "./types/detailType";
import { isLastDay } from "./utils";

function App() {
  const { bundles, items, day, status, reload } = useFetch();
  const { sections, handleChangeFilter, currentFilter, categories } = useFilter(
    bundles,
    items
  );
  const countdown = useCountdown(reload);
  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);
  const activeSection = useActiveSection(sectionIds);

  const [currentView, setCurrentView] = useState("shop");
  const [detail, setDetail] = useState<Detail | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const all = useMemo(() => [...bundles, ...items], [bundles, items]);
  const stats = useMemo(
    () => ({
      offers: all.length,
      sections: new Set(all.map((offer) => offer.section.name)).size,
      lastDay: all.filter((offer) => isLastDay(offer.outDate)).length,
    }),
    [all]
  );

  const views = [
    { value: "shop", label: "Tienda", count: stats.offers },
    { value: "machine", label: "Tragapavos" },
  ];

  const offers = useMemo<Offer[]>(
    () => [
      ...bundles.map((bundle) => ({
        id: bundle.id,
        name: bundle.name,
        price: bundle.price,
        image: bundle.images.items,
        background: bundle.images.background,
        cosmeticIds: bundle.cosmeticIds,
        detail: { kind: "bundle" as const, bundle },
      })),
      ...items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.images.item,
        background: item.images.background,
        cosmeticIds: item.cosmeticIds,
        detail: { kind: "item" as const, item },
      })),
    ],
    [bundles, items]
  );

  function handleSelect(selected: Detail) {
    setDetail(selected);
    setDetailOpen(true);
  }

  function handleViewContent() {
    switch (currentView) {
      case "shop":
        return (
          <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[17rem_minmax(0,1fr)]">
            {/* En móvil es una barra fija arriba; en escritorio, un índice lateral que acompaña el scroll */}
            <aside className="sticky top-0 z-20 -mx-4 mb-6 bg-night/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:top-8 lg:mx-0 lg:mb-0 lg:max-h-[calc(100dvh-4rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:bg-transparent lg:[scrollbar-width:thin] lg:p-0 lg:backdrop-blur-none">
              <SectionIndex sections={sections} active={activeSection} />
            </aside>
            <div className="flex min-w-0 flex-col gap-14">
              <div
                role="group"
                aria-label="Filtrar por tipo"
                className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0"
              >
                {categories.map((category) => {
                  const active = currentFilter === category.value;
                  return (
                    <button
                      key={category.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => handleChangeFilter(category.value)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-full border border-transparent px-3.5 py-1.5 text-sm font-semibold transition-[background-color,color,scale] duration-150 ease-out motion-safe:enabled:active:scale-[0.96] ${
                        active
                          ? "bg-white text-night"
                          : "bg-panel text-white/85 shadow-ring hover:bg-panel-2"
                      }`}
                    >
                      {category.label}
                      <span
                        className={`tabular-nums ${active ? "text-night/60" : "text-white/60"}`}
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
              {sections.map((section, index) => (
                <ShopSection
                  key={section.id}
                  section={section}
                  index={index}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </div>
        );
      case "machine":
        return <PavosMachine offers={offers} onSelect={handleSelect} />;
    }
  }

  return (
    <div className="flex min-h-dvh flex-col gap-8 px-4 sm:gap-10 sm:px-6 lg:px-10">
      <Header
        day={day}
        countdown={countdown}
        stats={status === "ready" ? stats : undefined}
      />
      {/* Radio exterior = 10px de cada pestaña + 6px de padding */}
      <nav
        aria-label="Vistas"
        className="animate-enter flex w-full gap-1 rounded-2xl border border-transparent bg-panel p-1.5 shadow-ring [animation-delay:300ms] sm:w-fit"
      >
        {views.map((view) => {
          const active = currentView === view.value;
          return (
            <button
              key={view.value}
              type="button"
              aria-pressed={active}
              onClick={() => setCurrentView(view.value)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-[10px] px-4 py-2.5 font-display text-xl font-extrabold uppercase italic transition-[background-color,color,scale] duration-150 ease-out motion-safe:enabled:active:scale-[0.96] sm:flex-none sm:px-6 ${
                active ? "bg-volt text-night" : "text-white/75 hover:bg-panel-2 hover:text-white"
              }`}
            >
              {view.label}
              {status === "ready" && view.count !== undefined && (
                <span
                  className={`rounded-full px-1.5 font-sans text-xs font-bold tabular-nums not-italic ${
                    active ? "bg-night/15" : "bg-white/10"
                  }`}
                >
                  {view.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <main className="flex flex-1 flex-col">
        {status === "ready" ? (
          <div className="animate-enter [animation-delay:400ms]">{handleViewContent()}</div>
        ) : (
          <ShopStatus status={status} onRetry={reload} />
        )}
      </main>
      <footer className="pb-10 text-center text-sm text-white/60">
        Datos de{" "}
        <a
          href="https://fortnite-api.com"
          className="underline decoration-white/30 underline-offset-2 transition-[text-decoration-color] duration-150 ease-out hover:decoration-white"
        >
          fortnite-api.com
        </a>
        . Sitio de fans sin relación con Epic Games.
      </footer>
      <ScrollTopButton />
      <ShopDetail
        detail={detail}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}

export default App;
