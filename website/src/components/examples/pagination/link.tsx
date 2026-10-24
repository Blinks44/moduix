import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/react/pagination';

export default function LinkPaginationDemo() {
  return (
    <Pagination
      count={200}
      pageSize={10}
      siblingCount={2}
      type="link"
      getPageUrl={(details) => `?page=${details.page}`}
    >
      <PaginationPrevTrigger asChild>
        <a>Previous</a>
      </PaginationPrevTrigger>
      <PaginationContext>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <PaginationItem key={index} asChild {...page}>
                <a>{page.value}</a>
              </PaginationItem>
            ) : (
              <PaginationEllipsis key={index} index={index} />
            ),
          )
        }
      </PaginationContext>
      <PaginationNextTrigger asChild>
        <a>Next</a>
      </PaginationNextTrigger>
    </Pagination>
  );
}