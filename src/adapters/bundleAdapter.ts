import { adaptLayout, cosmeticIds, renderImage, tileBackground } from "../utils";

function adaptContents(entry: any) {
    const instruments = entry.instruments ?? [];
    // Cada instrumento llega repetido en brItems como mochila y pico
    const instrumentNames = new Set(instruments.map((instrument: any) => instrument.name));

    return [
        ...(entry.brItems ?? [])
            .filter((item: any) => !instrumentNames.has(item.name))
            .map((item: any) => ({
                id: item.id,
                name: item.name,
                typeLabel: item.type.displayValue,
                image: item.images.smallIcon ?? item.images.icon ?? "",
            })),
        ...[...instruments, ...(entry.cars ?? [])].map((cosmetic: any) => ({
            id: cosmetic.id,
            name: cosmetic.name,
            typeLabel: cosmetic.type.displayValue,
            image: cosmetic.images.small ?? cosmetic.images.large ?? "",
        })),
        ...(entry.tracks ?? []).map((track: any) => ({
            id: track.id,
            name: `${track.title} · ${track.artist}`,
            typeLabel: "Pista de improvisación",
            image: track.albumArt ?? "",
        })),
    ];
}

export function adaptBundle(entry: any) {
    return {
        id: entry.offerId,
        name: entry.bundle.name,
        images: {
            items: entry.bundle.image ?? renderImage(entry) ?? "",
            background: tileBackground(entry.colors),
        },
        price: entry.finalPrice,
        regularPrice: entry.regularPrice,
        outDate: entry.outDate,
        contents: adaptContents(entry),
        cosmeticIds: cosmeticIds(entry),
        ...adaptLayout(entry),
    };
}
