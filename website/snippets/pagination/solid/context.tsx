import { Button } from '@moduix/solid/button';
import { Pagination, PaginationContext } from '@moduix/solid/pagination';

export default function PaginationContextDemo() {
  return (
    <Pagination count={200} pageSize={10}>
      <PaginationContext>
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
      </PaginationContext>
    </Pagination>
  );
}