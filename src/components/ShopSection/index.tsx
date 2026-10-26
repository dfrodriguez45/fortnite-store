import type { CSSProperties } from "react";

import BundleCard from "../BundleCard";
import ItemCard from "../ItemCard";
import type { ShopSection as Section } from "../../hooks/useFilter";
import type { Detail } from "../../types/detailType";
import { timeLeft } from "../../utils";

type Props = {
  section: Section;
  index: number;
  onSelect: (detail: Detail) => void;
};

export default function ShopSection({ section, index, onSelect }: Props) {
  const firstToLeave = section.entries
    .map((entry) => (entry.kind === "bundle" ? entry.bundle : entry.item).outDate)
    .sort()[0];

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="@container relative isolate scroll-mt-20 lg:scroll-mt-8"
      style={{ "--accent": section.accent } as CSSProperties}
    >
      {/* Resplandor con el color de la colección: cada sección se ve distinta */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-10 -z-10 h-56 w-[min(40rem,90%)] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_40%,transparent),transparent)]"
      />
      <header className="mb-5 flex items-end gap-4">
        <span
          aria-hidden="true"
          className="font-display text-6xl leading-[0.8] font-extrabold text-transparent tabular-nums italic [-webkit-text-stroke:1.5px_rgb(255_255_255/0.35)] sm:text-7xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex min-w-0 flex-col gap-2">
          <span aria-hidden="true" className="h-1.5 w-14 -skew-x-12 rounded-sm bg-(--accent)" />
          <h2
            id={`${section.id}-title`}
            className="font-display text-4xl leading-[0.9] font-extrabold uppercase italic text-balance sm:text-5xl"
          >
            {section.name}
          </h2>
          <p className="text-sm font-semibold text-white/70">
            {section.entries.length} {section.entries.length === 1 ? "oferta" : "ofertas"}
            {firstToLeave && <> · {timeLeft(firstToLeave)}</>}
          </p>
        </div>
      </header>

      <div className="shelf @xl:[--cols:3] @3xl:[--cols:4] @3xl:[--gap:1rem] @5xl:[--cols:5] @7xl:[--cols:6] @min-[100rem]:[--cols:7]">
        {section.entries.map((entry) =>
          entry.kind === "bundle" ? (
            <BundleCard
              key={entry.bundle.id}
              bundle={entry.bundle}
              onSelect={() => onSelect(entry)}
            />
          ) : (
            <ItemCard key={entry.item.id} item={entry.item} onSelect={() => onSelect(entry)} />
          )
        )}
      </div>
    </section>
  );
}
