import Price from "../Price";
import useTilt from "../../hooks/useTilt";
import type { Item } from "../../types/itemType";
import { isLastDay, TILE_SPANS } from "../../utils";

type Props = {
  item: Item;
  onSelect: () => void;
};

export default function ItemCard({ item, onSelect }: Props) {
  const tilt = useTilt<HTMLElement>();
  const wide = item.tileSize > 1;

  return (
    <article
      {...tilt}
      className={`tilt relative isolate h-full overflow-hidden rounded-2xl border border-transparent shadow-ring hover:shadow-ring-strong has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-volt ${TILE_SPANS[item.tileSize] ?? ""}`}
      style={{ backgroundImage: item.images.background }}
    >
      <img
        src={item.images.item}
        alt=""
        width={512}
        height={512}
        loading="lazy"
        decoding="async"
        className={`absolute aspect-square object-contain ${
          wide ? "inset-y-0 right-0 h-full" : "inset-x-0 top-0 w-full"
        }`}
      />
      {item.holo && <div aria-hidden="true" className="tilt-foil absolute inset-0" />}
      <div aria-hidden="true" className="tilt-glare absolute inset-0" />

      <div className="absolute inset-x-2 top-2 flex flex-wrap items-start justify-between gap-1">
        {item.banner && <span className="tag bg-volt text-night">{item.banner}</span>}
        {isLastDay(item.outDate) && (
          <span className="tag ms-auto bg-white text-night">Último día</span>
        )}
      </div>

      {/* Degradado inferior para que el nombre y el precio se lean sobre cualquier color */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 bg-linear-to-t from-night/95 via-night/80 to-transparent px-3 pt-10 pb-3">
        <p className="text-xs font-semibold tracking-wide text-white/75 uppercase">
          {item.typeLabel}
          {item.introduction?.chapter === "1" && (
            <span className="ms-1.5 text-volt">· OG</span>
          )}
        </p>
        <h3
          className={`font-display leading-[0.95] font-extrabold italic ${
            wide ? "max-w-[60%] text-3xl" : "text-2xl"
          }`}
        >
          {/* El botón se estira sobre toda la tarjeta para que sea clicable entera */}
          <button
            type="button"
            onClick={onSelect}
            className="block w-full cursor-pointer text-start outline-none after:absolute after:inset-0"
          >
            <span className="line-clamp-2 text-balance">{item.name}</span>
          </button>
        </h3>
        <Price price={item.price} />
      </div>
    </article>
  );
}
