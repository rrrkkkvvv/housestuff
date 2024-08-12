export type IPaginationProps = {
    itemsPerPage: number,
    totalItems: number,
    paginateFn: (pageNumber: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    prevPage: () => void,
    nextPage: () => void,
    currentPage: number,
}