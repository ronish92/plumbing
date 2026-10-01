import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface DynamicPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}
export default function DynamicPagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: DynamicPaginationProps) {
  return (
    <Pagination>
      <PaginationContent className="w-full flex justify-between items-center">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              const newPage = Math.max(currentPage - 1, 1); // Calculate new page
              setCurrentPage(newPage); // Set current page directly
            }} // Decrease page
            className={`cursor-pointer ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`} // Disable if on first page
          />
        </PaginationItem>
        <div className="text-sm">
          Page {currentPage} of {totalPages} {/* Display current page info */}
        </div>
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              const newPage = Math.min(currentPage + 1, totalPages); // Calculate new page
              setCurrentPage(newPage); // Set current page directly
            }} // Increase page
            className={`cursor-pointer ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`} // Disable if on last page
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
