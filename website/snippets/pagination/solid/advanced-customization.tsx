import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/solid/pagination';
import { For } from 'solid-js';
import styles from '@/components/examples/pagination/pagination-advanced-customization.module.css';

export default function AdvancedCustomizationPaginationDemo() {
  return (
    <Pagination class={styles.root} count={200} pageSize={10} siblingCount={2}>
      <PaginationPrevTrigger />
      <PaginationContext>
        {(pagination) => (
          <For each={pagination().pages}>
            {(page, index) =>
              page.type === 'page' ? (
                <PaginationItem {...page}>Page {page.value}</PaginationItem>
              ) : (
                <PaginationEllipsis index={index()} />
              )
            }
          </For>
        )}
      </PaginationContext>
      <PaginationNextTrigger />
    </Pagination>
  );
}
