import { Button } from '@moduix/react/button';
import { Pagination } from '@moduix/react/pagination';
import { PreviewMeta } from '@/components/mdx/Components';

export default function PaginationContextDemo() {
  return (
    <Pagination count={200} pageSize={10}>
      <Pagination.Context>
        {(pagination) => (
          <PreviewMeta>
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
          </PreviewMeta>
        )}
      </Pagination.Context>
    </Pagination>
  );
}