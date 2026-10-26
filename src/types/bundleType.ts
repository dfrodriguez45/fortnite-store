import { ShopLayout } from "./layoutType"

export type BundleContent = {
    id: string
    name: string
    typeLabel: string
    image: string
}

export type Bundle = ShopLayout & {
    id: string
    name: string
    images: {
        items: string
        background: string
    }
    price: number
    regularPrice: number
    outDate: string
    contents: BundleContent[]
    cosmeticIds: string[]
}
