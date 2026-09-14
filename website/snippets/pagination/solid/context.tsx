import { Button } from '@moduix/solid/button';
import { Pagination } from '@moduix/solid/pagination';

export default function PaginationContextDemo() {
  return (
    <Pagination count={200} pageSize={10}>
      <Pagination.Context>
        {(pagination) => (
          <div>
            <output>
              Page {pagination().page} of {pagination().totalPages}
            </output>
            <Button size="sm" onClick={() => pagination().goToFirstPage()}>
              First
            </Button>
            <Button size="sm" onClick={() => pagination().goToPrevPage()}>
              Prev
            </Button>
            <Button size="sm" onClick={() => pagination().goToNextPage()}>
              Next
            </Button>
            <Button size="sm" onClick={() => pagination().goToLastPage()}>
              Last
            </Button>
          </div>
        )}
      </Pagination.Context>
    </Pagination>
  );
}