export interface PaginationResult<T> {
  currentPage: number;
  entities: T[];
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
