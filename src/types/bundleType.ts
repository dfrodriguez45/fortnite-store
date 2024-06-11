import { Item } from "./itemType"

export type Bundle = {
    id: string
    name: string
    images: {
        items: string
        background: string
    }
    price: number
    items: Item[]
}