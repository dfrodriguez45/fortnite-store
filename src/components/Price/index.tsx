const VBUCK_ICON = "https://fortnite-api.com/images/vbuck.png";

type Props = {
  price: number;
  regularPrice?: number;
  size?: "md" | "lg";
};

function format(value: number) {
  return value.toLocaleString("es-419");
}

export default function Price({ price, regularPrice, size = "md" }: Props) {
  const discounted = regularPrice !== undefined && regularPrice > price;

  return (
    <p className="flex items-center gap-1.5">
      <img
        src={VBUCK_ICON}
        alt=""
        width={24}
        height={24}
        className={size === "lg" ? "size-7" : "size-5"}
      />
      <span
        className={`font-bold tabular-nums ${size === "lg" ? "text-2xl" : "text-base"}`}
      >
        {format(price)}
      </span>
      <span className="sr-only"> monedas V</span>
      {discounted && (
        <s className="text-sm font-semibold text-white/60 tabular-nums">
          <span className="sr-only">Antes </span>
          {format(regularPrice)}
        </s>
      )}
    </p>
  );
}
