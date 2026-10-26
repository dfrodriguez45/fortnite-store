import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 800);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      inert={!visible}
      onClick={handleScrollToTop}
      className={`fixed right-5 bottom-5 grid size-14 place-items-center rounded-full bg-volt text-night shadow-lg shadow-night/60 transition-[opacity,translate,scale,background-color] duration-150 ease-out hover:bg-volt-soft motion-safe:enabled:active:scale-[0.96] ${
        visible ? "opacity-100" : "pointer-events-none opacity-0 motion-safe:translate-y-3"
      }`}
    >
      <FaArrowUp aria-hidden="true" className="size-5" />
    </button>
  );
}
