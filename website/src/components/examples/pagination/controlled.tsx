import {
  Pagination,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/react/pagination';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/pagination/pagination-controlled.module.css';

export default function ControlledPaginationDemo() {
  const [page, setPage] = useState(5);
  return (
    <div className={styles.stack}>
      <Pagination
        className={styles.root}
        count={200}
        page={page}
        pageSize={10}
        siblingCount={2}
        onPageChange={(details) => setPage(details.page)}
      >
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </Pagination>
      <PreviewMeta>
        <output>Current page: {page}</output>
      </PreviewMeta>
    </div>
  );
}