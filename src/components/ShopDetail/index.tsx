import { useEffect, useRef, useState } from "react";
import { FaClock, FaPlay, FaTimes } from "react-icons/fa";

import Price from "../Price";
import type { Detail } from "../../types/detailType";
import { isLastDay, timeLeft } from "../../utils";

type Props = {
  detail: Detail | null;
  open: boolean;
  onClose: () => void;
};

export default function ShopDetail({ detail, open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleClose() {
    setPlaying(false);
    onClose();
  }

  // Quita el iframe en el mismo gesto de cerrar para que el video no siga sonando
  function requestClose() {
    setPlaying(false);
    dialogRef.current?.close();
  }

  const item = detail?.kind === "item" ? detail.item : undefined;
  const bundle = detail?.kind === "bundle" ? detail.bundle : undefined;
  const base = item ?? bundle;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="detail-title"
      onClose={handleClose}
      onCancel={() => setPlaying(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
      className="detail-dialog m-auto max-h-[90dvh] w-[min(92vw,60rem)] overflow-y-auto overscroll-contain rounded-3xl bg-panel p-0 text-white border border-transparent shadow-ring"
    >
      {base && (
        <div className="grid md:grid-cols-2">
          <div
            className="relative grid min-h-72 place-items-center overflow-hidden p-6"
            style={{ backgroundImage: base.images.background }}
          >
            {playing && item?.video ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${item.video}?autoplay=1&rel=0`}
                title={`Video de ${item.name}`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="relative aspect-video w-full rounded-xl bg-night"
              />
            ) : (
              <img
                src={item?.images.item ?? bundle?.images.items}
                alt=""
                width={512}
                height={512}
                className="relative aspect-square w-full max-w-sm object-contain"
              />
            )}
          </div>

          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <div className="flex flex-col gap-2 md:pe-10">
              <p className="text-xs font-semibold tracking-wide text-white/75 uppercase">
                {item ? [item.typeLabel, item.rarity].filter(Boolean).join(" · ") : "Lote"}
              </p>
              <h2
                id="detail-title"
                className="font-display text-5xl leading-[0.9] font-extrabold uppercase italic text-balance"
              >
                {base.name}
              </h2>
            </div>

            {item?.description && (
              <blockquote className="font-display text-2xl leading-tight font-bold text-volt italic text-balance">
                «{item.description}»
              </blockquote>
            )}

            <ul className="flex flex-wrap gap-2">
              <li className={`chip ${isLastDay(base.outDate) ? "bg-volt text-night" : ""}`}>
                <FaClock aria-hidden="true" className="size-3.5" />
                {timeLeft(base.outDate)}
              </li>
              {item?.introduction?.chapter === "1" && (
                <li className="chip">OG del Capítulo 1</li>
              )}
              {item?.introduction && item.introduction.chapter !== "1" && (
                <li className="chip">
                  Debutó en Cap. {item.introduction.chapter} · T{item.introduction.season}
                </li>
              )}
              {item?.set && <li className="chip">Conjunto {item.set}</li>}
              {item && item.styles > 0 && (
                <li className="chip">{item.styles} opciones de estilo</li>
              )}
            </ul>

            {item?.video && !playing && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="flex w-fit items-center gap-2 rounded-xl bg-white py-2.5 ps-[18px] pe-5 font-bold text-night transition-[background-color,scale] duration-150 ease-out hover:bg-volt-soft motion-safe:enabled:active:scale-[0.96]"
              >
                <FaPlay aria-hidden="true" className="size-3.5 translate-x-px" />
                Ver en acción
              </button>
            )}

            {bundle && bundle.contents.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-2xl font-extrabold uppercase italic">
                  Incluye {bundle.contents.length}
                </h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {bundle.contents.map((content) => (
                    // Radio exterior = 6px de la imagen + 6px de padding
                    <li
                      key={content.id}
                      className="flex items-center gap-2.5 rounded-xl bg-panel-2 p-1.5 pe-3"
                    >
                      <img
                        src={content.image}
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        className="size-10 shrink-0 rounded-md bg-night object-cover outline-1 -outline-offset-1 outline-white/10"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{content.name}</p>
                        <p className="text-xs text-white/70">{content.typeLabel}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto border-t border-white/10 pt-5">
              <Price price={base.price} regularPrice={bundle?.regularPrice} size="lg" />
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={requestClose}
        className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-night/70 text-white border border-transparent shadow-ring transition-[background-color,scale] duration-150 ease-out hover:bg-night motion-safe:enabled:active:scale-[0.96]"
      >
        <FaTimes aria-hidden="true" className="size-4" />
      </button>
    </dialog>
  );
}
