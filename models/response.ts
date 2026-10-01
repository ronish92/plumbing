export type ResponseModel<T = unknown> = {
  status: boolean;
  message: string;
  data: T;
  pagination: pagination | null;
};

export interface pagination {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  currentPageSize: number;
}