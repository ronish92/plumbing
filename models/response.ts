export type ResponseModel = {
  status: boolean;
  message: string;
  data: any;
  pagination: pagination | null
};

export interface pagination {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  currentPageSize: number;
}