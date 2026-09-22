import {
  Pagination,
  PaginationContext,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/solid/pagination';
import styles from '@/components/examples/pagination/pagination-page-range.module.css';

export default function PaginationPageRangeDemo() {
  return (
    <Pagination count={200} pageSize={10}>
      <PaginationContext>
        {(pagination) => (
          <div class={styles.stack}>
            <div class={styles.row}>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </div>
            <output>
              Showing {pagination().pageRange.start + 1}-{pagination().pageRange.end} of{' '}
              {pagination().count} results
            </output>
          </div>
        )}
      </PaginationContext>
    </Pagination>
  );
}
