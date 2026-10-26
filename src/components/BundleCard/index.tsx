import Price from "../Price";
import useTilt from "../../hooks/useTilt";
import type { Bundle } from "../../types/bundleType";
import { isLastDay, TILE_SPANS } from "../../utils";

type Props = {
  bundle: Bundle;
  onSelect: () => void;
};

export default function BundleCard({ bundle, onSelect }: Props) {
  const tilt = useTilt<HTMLElement>();
  const wide = bundle.tileSize > 1;
  const discount = Math.round((1 - bundle.price / bundle.regularPrice) * 100);

  return (
    <article
      {...tilt}
      className={`tilt relative isolate h-full overflow-hidden rounded-2xl border border-transparent shadow-ring hover:shadow-ring-strong has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-volt ${TILE_SPANS[bundle.tileSize] ?? ""}`}
      style={{ backgroundImage: bundle.images.background }}
    >
      <img
        src={bundle.images.items}
        alt=""
        width={512}
        height={512}
        loading="lazy"
        decoding="async"
        className={`absolute aspect-square object-contain ${
          wide ? "inset-y-0 right-0 h-full" : "inset-x-0 top-0 w-full"
        }`}
      />
      <div aria-hidden="true" className="tilt-foil absolute inset-0" />
      <div aria-hidden="true" className="tilt-glare absolute inset-0" />

      <div className="absolute inset-x-2 top-2 flex flex-wrap items-start justify-between gap-1">
        {discount > 0 && <span className="tag bg-volt text-night">-{discount}%</span>}
        {isLastDay(bundle.outDate) && (
          <span className="tag ms-auto bg-white text-night">Último día</span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-linear-to-t from-night/95 via-night/80 to-transparent px-3 pt-10 pb-3">
        <p className="text-xs font-semibold tracking-wide text-white/75 uppercase">
          Lote · incluye {bundle.contents.length}
        </p>
        <h3
          className={`font-display leading-[0.95] font-extrabold italic ${
            wide ? "max-w-[60%] text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {/* El botón se estira sobre toda la tarjeta para que sea clicable entera */}
          <button
            type="button"
            onClick={onSelect}
            className="block w-full cursor-pointer text-start text-balance outline-none after:absolute after:inset-0"
          >
            <span className="line-clamp-3">{bundle.name}</span>
          </button>
        </h3>
        <Price
          price={bundle.price}
          regularPrice={bundle.regularPrice}
          size={wide ? "lg" : "md"}
        />
      </div>
    </article>
  );
}
