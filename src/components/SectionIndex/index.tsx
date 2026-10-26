import { useEffect, useRef } from "react";

import type { ShopSection } from "../../hooks/useFilter";

type Props = {
  sections: ShopSection[];
  active: string | null;
};

export default function SectionIndex({ sections, active }: Props) {
  const listRef = useRef<HTMLOListElement>(null);

  // En móvil la barra es horizontal: centra la sección activa sin animar, porque cambia al hacer scroll
  useEffect(() => {
    const list = listRef.current;
    const current = list?.querySelector<HTMLElement>("[data-active]");
    if (!list || !current || list.scrollWidth <= list.clientWidth) return;
    list.scrollLeft = current.offsetLeft - list.clientWidth / 2 + current.clientWidth / 2;
  }, [active]);

  return (
    <nav aria-label="Secciones de la tienda">
      <p className="mb-3 hidden text-xs font-semibold tracking-wide text-white/60 uppercase lg:block">
        {sections.length} secciones
      </p>
      <ol
        ref={listRef}
        className="no-scrollbar flex gap-1.5 overflow-x-auto lg:flex-col lg:gap-0.5 lg:overflow-visible"
      >
        {sections.map((section, index) => (
          <li key={section.id} className="shrink-0">
            <a
              href={`#${section.id}`}
              data-active={active === section.id || undefined}
              aria-current={active === section.id ? "location" : undefined}
              className="flex items-center gap-2.5 rounded-full px-3 py-1.5 text-sm font-semibold text-white/70 transition-[background-color,color] duration-150 ease-out hover:bg-panel-2 hover:text-white data-active:bg-white data-active:text-night lg:rounded-lg lg:py-2 lg:data-active:bg-panel-2 lg:data-active:text-white"
            >
              <span
                aria-hidden="true"
                className="hidden w-5 font-display text-base font-extrabold text-white/40 tabular-nums italic lg:inline"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: section.accent }}
              />
              <span className="truncate lg:max-w-44">{section.name}</span>
              <span className="ms-auto hidden ps-2 text-xs text-white/50 tabular-nums lg:inline">
                {section.entries.length}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
