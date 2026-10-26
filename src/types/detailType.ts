import { Bundle } from "./bundleType"
import { Item } from "./itemType"

export type Detail =
    | { kind: "item"; item: Item }
    | { kind: "bundle"; bundle: Bundle }
