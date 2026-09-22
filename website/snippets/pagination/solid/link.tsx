import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/solid/pagination';
import { For } from 'solid-js';
import styles from '@/components/examples/pagination/pagination-link.module.css';

export default function LinkPaginationDemo() {
  return (
    <Pagination
      class={styles.root}
      count={200}
      pageSize={10}
      siblingCount={2}
      type="link"
      getPageUrl={(details) => `?page=${details.page}`}
    >
      <PaginationPrevTrigger asChild={(props) => <a {...props()}>Previous</a>} />
      <PaginationContext>
        {(pagination) => (
          <For each={pagination().pages}>
            {(page, index) =>
              page.type === 'page' ? (
                <PaginationItem asChild={(props) => <a {...props()}>{page.value}</a>} {...page} />
              ) : (
                <PaginationEllipsis index={index()} />
              )
            }
          </For>
        )}
      </PaginationContext>
      <PaginationNextTrigger asChild={(props) => <a {...props()}>Next</a>} />
    </Pagination>
  );
}
