import { Button } from '@moduix/react/button';
import { Pagination, PaginationContext } from '@moduix/react/pagination';

export default function PaginationContextDemo() {
  return (
    <Pagination count={200} pageSize={10}>
      <PaginationContext>
        {(pagination) => (
          <div data-preview-meta>
            <output>
              Page {pagination.page} of {pagination.totalPages}
            </output>
            <Button size="sm" onClick={() => pagination.goToFirstPage()}>
              First
            </Button>
            <Button size="sm" onClick={() => pagination.goToPrevPage()}>
              Prev
            </Button>
            <Button size="sm" onClick={() => pagination.goToNextPage()}>
              Next
            </Button>
            <Button size="sm" onClick={() => pagination.goToLastPage()}>
              Last
            </Button>
          </div>
        )}
      </PaginationContext>
    </Pagination>
  );
}