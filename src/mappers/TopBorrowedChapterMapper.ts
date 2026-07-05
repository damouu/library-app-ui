import type {TopBorrowedChapterDTO} from "@/types/analytics/TopBorrowedChapterDTO";
import type {TopBorrowedChapter} from "@/types/chapter/TopBorrowedChapter";

export function mapTopBorrowedChapter(dto: TopBorrowedChapterDTO): TopBorrowedChapter {
    return {
        chapterUuid: dto.chapterUuid,
        borrowCount: dto.borrowCount,
        title: dto.title,
        secondTitle: dto.secondTitle,
        chapterNumber: dto.chapterNumber,
        coverArtworkUrl: dto.coverArtworkUrl,
    };
}