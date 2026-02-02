import React  from "preact/hooks";
import "./pagination.scss"; // Import CSS file for Pagination
import { FunctionalComponent } from "preact";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: FunctionalComponent<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
}) => {
  const getPages = (): (number | string)[] => {
    let pages: (number | string)[] = [];
    const maxPagesToShow = 4;
    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to the max pages to show
      pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      // If total pages exceed the max pages to show
      if (currentPage <= 2) {
        pages = [1, 2, 3, "...", totalPages];
      } else if (currentPage >= totalPages - 1) {
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", currentPage, "...", totalPages];
      }
    }
    return pages;
  };

  return (
    <div class='container-pagination'>
      <div class='pagination'>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {getPages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && paginate(page)}
            class={page === currentPage ? "active" : ""}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
