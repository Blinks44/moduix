import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/solid/pagination';
import { Ellipsis as EllipsisIcon } from 'lucide-solid';
import { For } from 'solid-js';

export default function BuildFromPartsPaginationDemo() {
  return (
    <Pagination count={200} pageSize={10} siblingCount={2}>
      <PaginationPrevTrigger />
      <PaginationContext>
        {(pagination) => (
          <For each={pagination().pages}>
            {(page, index) =>
              page.type === 'page' ? (
                <PaginationItem {...page}>{page.value}</PaginationItem>
              ) : (
                <PaginationEllipsis index={index()}>
                  <EllipsisIcon />
                </PaginationEllipsis>
              )
            }
          </For>
        )}
      </PaginationContext>
      <PaginationNextTrigger />
    </Pagination>
  );
}