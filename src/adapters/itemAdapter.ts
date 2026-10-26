import { adaptLayout, cosmeticIds, renderImage, tileBackground } from "../utils";

// Las rarezas básicas no llevan brillo tornasol; las legendarias y las series sí
const PLAIN_RARITIES = new Set(["common", "uncommon", "rare", "epic"]);

export function adaptItem(entry: any) {
    const item = entry.brItems[0];
    // Los instrumentos también llegan como mochila y pico en brItems; se agrupan aparte
    const instrument = entry.instruments?.[0];
    const cosmetic = instrument ?? item;
    return {
        id: entry.offerId,
        name: cosmetic.name,
        type: instrument ? "instrument" : item.type.value,
        typeLabel: cosmetic.type.displayValue,
        images: {
            item: renderImage(entry) ?? item.images.featured ?? item.images.icon ?? "",
            background: tileBackground(entry.colors),
        },
        price: entry.finalPrice,
        banner: entry.banner?.value,
        description: cosmetic.description ?? "",
        rarity: cosmetic.rarity?.displayValue ?? "",
        holo: !PLAIN_RARITIES.has(cosmetic.rarity?.value),
        set: item.set?.value,
        introduction: item.introduction && {
            chapter: item.introduction.chapter,
            season: item.introduction.season,
        },
        styles: (item.variants ?? []).reduce(
            (total: number, variant: any) => total + variant.options.length,
            0
        ),
        video: item.showcaseVideo,
        outDate: entry.outDate,
        cosmeticIds: cosmeticIds(entry),
        ...adaptLayout(entry),
    };
}
