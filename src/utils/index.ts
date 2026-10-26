export function bundleExists(bundle: any) {
    let exists = true;
    if (!bundle) {
        exists = false;
    }
    return exists;
}

// Los colores llegan como RRGGBBAA sin "#"
export function tileBackground(colors: any) {
    const from = colors?.color1 ?? "3b82f6ff";
    const to = colors?.color2 ?? colors?.color3 ?? "1e3a8aff";
    return `radial-gradient(circle at 50% 35%, #${from}, #${to})`;
}

export function renderImage(entry: any) {
    const images = entry.newDisplayAsset?.renderImages ?? [];
    const image = images.find((image: any) => image.productTag === "Product.BR") ?? images[0];
    return image?.image;
}

const HOUR = 60 * 60 * 1000;

export function isLastDay(outDate: string) {
    return new Date(outDate).getTime() - Date.now() < 24 * HOUR;
}

export function timeLeft(outDate: string) {
    const ms = new Date(outDate).getTime() - Date.now();
    if (ms <= 0) return "Ya salió de la tienda";
    const hours = Math.floor(ms / HOUR);
    if (hours < 1) return `Se va en ${Math.ceil(ms / 60000)} min`;
    if (hours < 48) return `Se va en ${hours} h`;
    return `Se va en ${Math.floor(hours / 24)} días`;
}

// Sirve para no proponer un objeto suelto que ya viene dentro de un lote elegido
export function cosmeticIds(entry: any): string[] {
    return ["brItems", "instruments", "cars", "tracks"].flatMap((key) =>
        (entry[key] ?? []).map((cosmetic: any) => cosmetic.id)
    );
}

export function adaptLayout(entry: any) {
    return {
        section: {
            name: entry.layout?.name?.trim() || "Más ofertas",
            order: entry.layout?.index ?? Number.MAX_SAFE_INTEGER,
        },
        accent: `#${(entry.colors?.color1 ?? "7b5cffff").slice(0, 6)}`,
        // "Size_3_x_1" son 3 casillas de ancho, como en la tienda del juego
        tileSize: Number(/Size_(\d)_x_/.exec(entry.tileSize ?? "")?.[1] ?? 1),
        sortPriority: entry.sortPriority ?? 0,
    };
}

export function slugify(text: string) {
    return text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

// Columnas que ocupa una casilla según su tamaño en la tienda del juego, sin pasarse de las que caben
export const TILE_SPANS: Record<number, string> = {
    1: "",
    2: "col-span-2",
    3: "col-span-2 @xl:col-span-3",
    4: "col-span-2 @xl:col-span-3 @3xl:col-span-4",
};
