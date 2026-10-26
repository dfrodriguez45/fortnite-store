// Dónde y cómo coloca la tienda del juego cada oferta
export type ShopLayout = {
    section: {
        name: string
        order: number
    }
    accent: string
    tileSize: number
    sortPriority: number
}
