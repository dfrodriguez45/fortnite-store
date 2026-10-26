import { useMemo, useState } from "react";

import { Bundle } from "../types/bundleType";
import { Detail } from "../types/detailType";
import { Item } from "../types/itemType";
import { slugify } from "../utils";

// Orden fijo para que los filtros no bailen de un día a otro
const CATEGORY_LABELS: Record<string, string> = {
  outfit: "Atuendos",
  emote: "Gestos",
  pickaxe: "Picos",
  backpack: "Mochilas",
  glider: "Planeadores",
  wrap: "Papeles",
  shoe: "Calzado",
  sidekick: "Compañeros",
  instrument: "Instrumentos",
  emoji: "Emoticonos",
  spray: "Aerosoles",
  contrail: "Estelas",
  loadingscreen: "Pantallas de carga",
  music: "Música",
};
const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS);

export type ShopSection = {
  id: string;
  name: string;
  order: number;
  accent: string;
  entries: Detail[];
};

function layoutOf(entry: Detail) {
  return entry.kind === "bundle" ? entry.bundle : entry.item;
}

const useFilter = (bundles: Bundle[], items: Item[]) => {
  const [currentFilter, setCurrentFilter] = useState("all");

  const categories = useMemo(() => {
    const counts = new Map<string, { label: string; count: number }>();
    for (const item of items) {
      const category = counts.get(item.type);
      if (category) category.count++;
      else
        counts.set(item.type, {
          label: CATEGORY_LABELS[item.type] ?? item.typeLabel,
          count: 1,
        });
    }

    const rank = (type: string) => {
      const index = CATEGORY_ORDER.indexOf(type);
      return index === -1 ? CATEGORY_ORDER.length : index;
    };

    return [
      { value: "all", label: "Todo", count: bundles.length + items.length },
      { value: "bundle", label: "Lotes", count: bundles.length },
      ...[...counts]
        .sort(([a], [b]) => rank(a) - rank(b))
        .map(([value, { label, count }]) => ({ value, label, count })),
    ].filter((category) => category.count > 0);
  }, [bundles, items]);

  // Agrupa como la tienda del juego: una sección por colección, en el orden que da la API
  const sections = useMemo(() => {
    const entries: Detail[] = [
      ...(currentFilter === "all" || currentFilter === "bundle"
        ? bundles.map((bundle) => ({ kind: "bundle" as const, bundle }))
        : []),
      ...items
        .filter((item) => currentFilter === "all" || item.type === currentFilter)
        .map((item) => ({ kind: "item" as const, item })),
    ];

    const groups = new Map<string, ShopSection>();
    for (const entry of entries) {
      const { section, accent } = layoutOf(entry);
      const group = groups.get(section.name) ?? {
        id: `seccion-${slugify(section.name)}`,
        name: section.name,
        order: section.order,
        accent,
        entries: [],
      };
      group.entries.push(entry);
      groups.set(section.name, group);
    }

    for (const group of groups.values()) {
      group.entries.sort(
        (a, b) =>
          layoutOf(b).sortPriority - layoutOf(a).sortPriority ||
          layoutOf(b).tileSize - layoutOf(a).tileSize
      );
    }
    return [...groups.values()].sort((a, b) => a.order - b.order);
  }, [bundles, items, currentFilter]);

  return {
    sections,
    handleChangeFilter: setCurrentFilter,
    currentFilter,
    categories,
  };
};

export default useFilter;
