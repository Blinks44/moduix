import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/react/pagination';

export default function AdvancedCustomizationPaginationDemo() {
  return (
    <Pagination count={200} pageSize={10} siblingCount={2}>
      <PaginationPrevTrigger />
      <PaginationContext>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <PaginationItem key={index} {...page}>
                Page {page.value}
              </PaginationItem>
            ) : (
              <PaginationEllipsis key={index} index={index} />
            ),
          )
        }
      </PaginationContext>
      <PaginationNextTrigger />
    </Pagination>
  );
}