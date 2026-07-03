import type {RecordResponse} from "@/types/records/RecordResponse";
import {mapBorrow} from "@/mappers/BorrowMapper";

export function mapRecords(dto: RecordResponse): RecordResponse {
    return {
        ...dto,
        content: dto.content.map(mapBorrow)
    };
}
