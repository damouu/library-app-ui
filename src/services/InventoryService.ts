import {api} from "@/plugins/gateway";
import {Inventory} from "@/models/Inventory";
import type {InventoryDTO} from "@/types/inventory/InventoryDTO";
import {mapInventory} from "@/mappers/mapInventory";

export class InventoryService {

    static async checkAvailability(chapterUuid: string): Promise<Inventory> {

        const response = await api.get<InventoryDTO>(
            `/api/inventory/public/${chapterUuid}`
        );

        return mapInventory(response.data);
    }
}