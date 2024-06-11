export function adaptItem(entry: any) {
    return {
        id: entry.offerId,
        name: entry.items[0].name,
        type: entry.items[0].type.value,
        images: {
            item: entry.items[0].images.icon ?? "",
            background: entry.layout?.background ?? "",
        },
        price: entry.finalPrice,
    };
}