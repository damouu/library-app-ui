import type {SeriesPageDTO} from "@/types/SeriesPageDTO";
import type {SeriesPage} from "@/types/SeriesPage";
import {mapSeries} from "./SeriesMapper";

export function mapSeriesPage(dto: SeriesPageDTO): SeriesPage {
    return {
        ...dto,
        content: dto.content.map(mapSeries),
    };
}