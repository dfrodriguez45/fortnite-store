import { FaRedoAlt } from "react-icons/fa";

type Props = {
  status: "loading" | "error";
  onRetry: () => void;
};

export default function ShopStatus({ status, onRetry }: Props) {
  if (status === "error") {
    return (
      <div
        role="alert"
        className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl bg-panel px-6 py-10 text-center border border-transparent shadow-ring"
      >
        <p className="font-display text-5xl font-extrabold uppercase italic">
          Sin señal
        </p>
        <p className="text-white/75 text-balance">
          No pudimos cargar la tienda. Revisa tu conexión e inténtalo otra vez.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-2 rounded-xl bg-volt py-2.5 ps-5 pe-[18px] font-bold text-night transition-[background-color,scale] duration-150 ease-out hover:bg-volt-soft motion-safe:enabled:active:scale-[0.96]"
        >
          Reintentar
          <FaRedoAlt aria-hidden="true" className="size-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      role="status"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
    >
      <span className="sr-only">Cargando la tienda…</span>
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="aspect-3/4 rounded-2xl bg-panel border border-transparent shadow-ring motion-safe:animate-pulse"
        />
      ))}
    </div>
  );
}
