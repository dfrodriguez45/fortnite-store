import { FaClock } from "react-icons/fa";

type Props = {
  day: string;
  countdown: string;
  stats?: {
    offers: number;
    sections: number;
    lastDay: number;
  };
};

export default function Header({ day, countdown, stats }: Props) {
  const cards = [
    { label: "Ofertas", value: stats?.offers },
    { label: "Secciones", value: stats?.sections },
    { label: "Último día", value: stats?.lastDay },
  ];

  return (
    <header className="flex flex-col gap-6 pt-6 lg:flex-row lg:items-end lg:justify-between lg:pt-10">
      <div className="flex flex-col gap-3">
        <span className="animate-enter tag w-fit bg-volt text-night">
          Tienda de Fortnite
        </span>
        <h1 className="animate-enter font-display text-6xl leading-[0.85] font-extrabold uppercase italic [animation-delay:100ms] sm:text-8xl">
          La tienda
          <br />
          <span className="text-volt">de hoy</span>
        </h1>
        {day && (
          <p className="animate-enter text-lg font-semibold text-white/75 [animation-delay:200ms]">
            <span className="inline-block first-letter:uppercase">{day}</span>
          </p>
        )}
      </div>

      <dl className="animate-enter grid grid-cols-3 gap-2 [animation-delay:200ms] sm:grid-cols-4">
        <div className="col-span-3 flex items-center gap-3 rounded-2xl border border-transparent bg-panel px-4 py-3 shadow-ring sm:col-span-1">
          <FaClock aria-hidden="true" className="size-5 shrink-0 text-volt" />
          <div>
            <dt className="text-xs font-semibold tracking-wide text-white/70 uppercase">
              Se renueva en
            </dt>
            <dd className="font-display text-3xl leading-none font-extrabold tabular-nums italic">
              <time>{countdown}</time>
            </dd>
          </div>
        </div>
        {stats &&
          cards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-transparent bg-panel px-4 py-3 shadow-ring"
            >
              <dt className="text-xs font-semibold tracking-wide text-white/70 uppercase">
                {card.label}
              </dt>
              <dd className="font-display text-3xl leading-none font-extrabold tabular-nums italic">
                {card.value}
              </dd>
            </div>
          ))}
      </dl>
    </header>
  );
}
