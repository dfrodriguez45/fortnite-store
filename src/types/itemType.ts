import { ShopLayout } from "./layoutType"

export type Item = ShopLayout & {
    id: string
    name: string
    type: string
    typeLabel: string
    images: {
        item: string
        background: string
    }
    price: number
    banner?: string
    description: string
    rarity: string
    holo: boolean
    set?: string
    introduction?: {
        chapter: string
        season: string
    }
    styles: number
    video?: string
    outDate: string
    cosmeticIds: string[]
}
