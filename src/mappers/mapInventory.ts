import {Inventory} from "@/models/Inventory";
import type {InventoryDTO} from "@/types/inventory/InventoryDTO";

export function mapInventory(dto: InventoryDTO): Inventory {

    return new Inventory(
        dto.book_uuid,
        dto.chapter_uuid,
        dto.currently_borrowed
    );
}