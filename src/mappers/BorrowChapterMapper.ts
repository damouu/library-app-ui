import type {BorrowChapterDTO} from "@/types/chapter/BorrowChapterDTO";

export function mapBorrowChapter(dto: BorrowChapterDTO): BorrowChapterDTO {
    return {
        chapterUuid: dto.chapterUuid,
        seriesUuid: dto.seriesUuid,
        title: dto.title,
        secondTitle: dto.secondTitle,
        chapterNumber: dto.chapterNumber,
        coverArtworkUrl: dto.coverArtworkUrl,
        publicationDate: dto.publicationDate,
    };
}