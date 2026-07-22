import { Pagination } from '@moduix/react';

export default function PaginationContextDemo() {
  return (
    <Pagination count={200} pageSize={10}>
      <Pagination.Context>
        {(pagination) => (
          <div className="pagination-row">
            <button type="button" onClick={() => pagination.goToFirstPage()}>
              First
            </button>
            <button type="button" onClick={() => pagination.goToPrevPage()}>
              Prev
            </button>
            <span className="pagination-muted">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button type="button" onClick={() => pagination.goToNextPage()}>
              Next
            </button>
            <button type="button" onClick={() => pagination.goToLastPage()}>
              Last
            </button>
          </div>
        )}
      </Pagination.Context>
    </Pagination>
  );
}