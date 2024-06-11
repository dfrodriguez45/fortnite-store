
export function adaptBundle(entry: any) {
    return {
        id: entry.offerId,
        name: entry.bundle.name,
        images: {
            items: entry.bundle.image,
            background: entry.layout.background ?? entry.newDisplayAsset.materialInstances[0].images.ImageBackground,
        },
        price: entry.finalPrice,
        items: []
    };
}