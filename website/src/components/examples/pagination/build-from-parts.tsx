import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/react/pagination';
import { Ellipsis as EllipsisIcon } from 'lucide-react';

export default function BuildFromPartsPaginationDemo() {
  return (
    <Pagination count={200} pageSize={10} siblingCount={2}>
      <PaginationPrevTrigger />
      <PaginationContext>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <PaginationItem key={page.value} {...page}>
                {page.value}
              </PaginationItem>
            ) : (
              <PaginationEllipsis key={`ellipsis-${index}`} index={index}>
                <EllipsisIcon />
              </PaginationEllipsis>
            ),
          )
        }
      </PaginationContext>
      <PaginationNextTrigger />
    </Pagination>
  );
}