import { useRef, type PointerEvent } from "react";

// Solo con ratón y sin movimiento reducido: en táctil la tarjeta se queda quieta
const tiltQuery =
  typeof window === "undefined"
    ? null
    : window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
      );

const useTilt = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const frame = useRef(0);

  function onPointerMove(event: PointerEvent<T>) {
    const element = ref.current;
    if (!element || event.pointerType !== "mouse" || !tiltQuery?.matches) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
      element.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
      element.style.setProperty("--mx", `${x * 100}%`);
      element.style.setProperty("--my", `${y * 100}%`);
      element.dataset.tilting = "";
    });
  }

  function onPointerLeave() {
    const element = ref.current;
    if (!element) return;
    cancelAnimationFrame(frame.current);
    for (const property of ["--rx", "--ry", "--mx", "--my"]) {
      element.style.removeProperty(property);
    }
    delete element.dataset.tilting;
  }

  return { ref, onPointerMove, onPointerLeave };
};

export default useTilt;
