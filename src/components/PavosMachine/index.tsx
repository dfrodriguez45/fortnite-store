import { useEffect, useState } from "react";
import { FaDice } from "react-icons/fa";

import Price from "../Price";
import type { Detail } from "../../types/detailType";

export type Offer = {
  id: string;
  name: string;
  price: number;
  image: string;
  background: string;
  cosmeticIds: string[];
  detail: Detail;
};

type Props = {
  offers: Offer[];
  onSelect: (detail: Detail) => void;
};

const VBUCK_ICON = "https://fortnite-api.com/images/vbuck.png";
const PRESETS = [1000, 2800, 5000, 13500];
const MAX_BUDGET = 100000;
const REEL_COLORS = ["bg-volt", "bg-pulse", "bg-sky", "bg-white"];

function format(value: number) {
  return value.toLocaleString("es-419");
}

function shuffle<T>(list: T[]) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

// Mochila 0/1: la combinación que más pavos gasta sin pasarse. Barajar antes da otra distinta en cada tirada
function knapsack(pool: Offer[], budget: number) {
  const unit = pool.reduce((acc, offer) => gcd(acc, offer.price), 0);
  const capacity = Math.floor(budget / unit);
  const best = new Int32Array(capacity + 1);
  const taken = pool.map(() => new Uint8Array(capacity + 1));

  pool.forEach((offer, index) => {
    const weight = offer.price / unit;
    for (let c = capacity; c >= weight; c--) {
      if (best[c - weight] + weight > best[c]) {
        best[c] = best[c - weight] + weight;
        taken[index][c] = 1;
      }
    }
  });

  const combo: Offer[] = [];
  let c = capacity;
  for (let index = pool.length - 1; index >= 0; index--) {
    if (taken[index][c]) {
      combo.push(pool[index]);
      c -= pool[index].price / unit;
    }
  }
  return combo;
}

function pickCombo(offers: Offer[], budget: number) {
  let pool = shuffle(offers.filter((offer) => offer.price > 0 && offer.price <= budget));

  // Si sale un lote junto a un objeto suelto que ya incluye, se descarta el suelto y se repite
  for (let attempt = 0; attempt < 10 && pool.length > 0; attempt++) {
    const combo = knapsack(pool, budget);
    const owned = new Set<string>();
    const repeated = new Set<string>();
    // Los lotes primero, así el repetido que se marca es siempre el suelto
    const byContents = [...combo].sort((a, b) => b.cosmeticIds.length - a.cosmeticIds.length);
    for (const offer of byContents) {
      for (const id of offer.cosmeticIds) {
        if (owned.has(id)) repeated.add(offer.id);
        owned.add(id);
      }
    }
    if (repeated.size === 0) return combo.sort((a, b) => b.price - a.price);
    pool = pool.filter((offer) => !repeated.has(offer.id));
  }
  return [];
}

function Reel({ offer, delay }: { offer: Offer; delay: number }) {
  const [stopped, setStopped] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) return;
    const id = setTimeout(() => setStopped(true), delay);
    return () => clearTimeout(id);
  }, [delay]);

  return (
    <div className="relative aspect-square w-[calc((100%-1.5rem)/3)] overflow-hidden rounded-xl bg-panel-2 border border-transparent shadow-ring sm:w-32">
      {stopped ? (
        <div
          className="absolute inset-0 animate-enter"
          style={{ backgroundImage: offer.background }}
        >
          <img
            src={offer.image}
            alt=""
            width={256}
            height={256}
            className="size-full object-contain"
          />
        </div>
      ) : (
        <div aria-hidden="true" className="absolute inset-x-0 top-0 animate-reel blur-[1px]">
          {[...REEL_COLORS, ...REEL_COLORS].map((color, index) => (
            <div
              key={index}
              className={`grid aspect-square place-items-center ${color} font-display text-5xl font-extrabold text-night italic`}
            >
              ?
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PavosMachine({ offers, onSelect }: Props) {
  const [budget, setBudget] = useState("2800");
  const [combo, setCombo] = useState<Offer[] | null>(null);
  const [spin, setSpin] = useState(0);
  const [done, setDone] = useState(false);

  const amount = Math.min(Math.max(Number(budget) || 0, 0), MAX_BUDGET);
  const cheapest = Math.min(...offers.map((offer) => offer.price));
  const total = combo?.reduce((sum, offer) => sum + offer.price, 0) ?? 0;

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Los rodillos paran uno tras otro; con movimiento reducido salen ya parados
  const delayFor = (index: number) => (reduceMotion ? 0 : 700 + Math.min(index, 8) * 150);

  function handleSpin() {
    const result = pickCombo(offers, amount);
    // Se precargan las imágenes mientras giran los rodillos
    for (const offer of result) new Image().src = offer.image;
    setCombo(result);
    setDone(false);
    setSpin((current) => current + 1);
  }

  useEffect(() => {
    if (!combo) return;
    const id = setTimeout(
      () => setDone(true),
      combo.length > 0 ? delayFor(combo.length - 1) + 300 : 0
    );
    return () => clearTimeout(id);
  }, [combo, spin]);

  return (
    <section
      aria-labelledby="machine-title"
      className="mx-auto flex w-full max-w-4xl flex-col gap-5"
    >
      {/* Radio exterior = 16px de la ventana + padding (16px, o 24px desde sm) */}
      <div className="flex flex-col gap-6 rounded-[32px] bg-panel p-4 sm:rounded-[40px] border border-transparent shadow-ring sm:p-6">
        <div className="flex flex-col gap-2 pt-2 sm:px-2">
          <span className="tag w-fit bg-volt text-night">Nuevo</span>
          <h2
            id="machine-title"
            className="font-display text-6xl leading-[0.85] font-extrabold uppercase italic sm:text-7xl"
          >
            Tragapavos
          </h2>
          <p className="max-w-md text-white/75 text-balance">
            Dinos cuántos pavos tienes y la máquina arma la compra que gasta lo
            máximo sin pasarse. Cada tirada sale distinta.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-panel-2 p-4 sm:flex-row sm:items-end sm:p-5">
          <div className="flex flex-1 flex-col gap-3">
            <label
              htmlFor="budget"
              className="text-sm font-semibold tracking-wide text-white/75 uppercase"
            >
              ¿Cuántos pavos tienes?
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-white/40 bg-night px-3 py-2 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-volt">
              <img src={VBUCK_ICON} alt="" width={28} height={28} className="size-7" />
              <input
                id="budget"
                type="number"
                inputMode="numeric"
                min={0}
                max={MAX_BUDGET}
                step={100}
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSpin();
                }}
                className="w-full bg-transparent font-display text-3xl font-extrabold tabular-nums italic outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  aria-pressed={amount === preset}
                  onClick={() => setBudget(String(preset))}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold tabular-nums transition-[background-color,color,scale] duration-150 ease-out motion-safe:enabled:active:scale-[0.96] ${
                    amount === preset
                      ? "bg-white text-night"
                      : "bg-night/60 text-white/85 hover:bg-night"
                  }`}
                >
                  {format(preset)}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={handleSpin}
            className="flex items-center justify-center gap-3 rounded-xl bg-volt py-4 ps-6 pe-[22px] font-display text-4xl font-extrabold text-night uppercase italic transition-[background-color,scale] duration-150 ease-out hover:bg-volt-soft motion-safe:enabled:active:scale-[0.96]"
          >
            ¡Tirar!
            <FaDice aria-hidden="true" className="size-7" />
          </button>
        </div>

        {combo && combo.length > 0 && (
          <div
            key={spin}
            className="flex flex-wrap justify-center gap-3 rounded-3xl bg-night p-3 border border-transparent shadow-ring"
          >
            {combo.map((offer, index) => (
              <Reel key={offer.id} offer={offer} delay={delayFor(index)} />
            ))}
          </div>
        )}
      </div>

      <div aria-live="polite">
        {done && combo && combo.length === 0 && (
          <p className="animate-enter rounded-2xl bg-panel px-5 py-4 text-center text-white/85 border border-transparent shadow-ring">
            Con {format(amount)} pavos no alcanza: lo más barato de hoy cuesta{" "}
            {format(cheapest)}.
          </p>
        )}
        {done && combo && combo.length > 0 && (
          <div className="animate-enter flex flex-col gap-4 rounded-3xl bg-panel p-5 border border-transparent shadow-ring sm:p-6">
            <p
              className={`font-display text-4xl leading-none font-extrabold uppercase italic text-balance ${
                total === amount ? "text-volt" : ""
              }`}
            >
              {total === amount
                ? "¡Ni un pavo desperdiciado!"
                : `Te sobran ${format(amount - total)} pavos`}
            </p>
            <ul className="flex flex-col divide-y divide-white/10">
              {combo.map((offer) => (
                <li key={offer.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(offer.detail)}
                    className="-mx-2 flex w-[calc(100%+1rem)] cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2.5 text-start transition-[background-color] duration-150 ease-out hover:bg-panel-2"
                  >
                    <span className="font-semibold">{offer.name}</span>
                    <span className="shrink-0 font-bold tabular-nums">
                      {format(offer.price)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              <p className="font-semibold text-white/75">
                Total de {combo.length} {combo.length === 1 ? "cosa" : "cosas"}
              </p>
              <Price price={total} size="lg" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
