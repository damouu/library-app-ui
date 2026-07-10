import type {SeriesPageDTO} from "@/types/series/SeriesPageDTO";
import type {SeriesPage} from "@/types/series/SeriesPage";
import {mapSeries} from "./SeriesMapper";

export function mapSeriesPage(dto: SeriesPageDTO): SeriesPage {
    return {
        ...dto,
        content: dto.content.map(mapSeries),
    };
}