import {
  Pagination,
  PaginationContext,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/react/pagination';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/pagination/pagination-page-range.module.css';

export default function PaginationPageRangeDemo() {
  return (
    <Pagination count={200} pageSize={10}>
      <PaginationContext>
        {(pagination) => (
          <div className={styles.stack}>
            <div className={styles.row}>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </div>
            <PreviewMeta>
              <output>
                Showing {pagination.pageRange.start + 1}-{pagination.pageRange.end} of{' '}
                {pagination.count} results
              </output>
            </PreviewMeta>
          </div>
        )}
      </PaginationContext>
    </Pagination>
  );
}
