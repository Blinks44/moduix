import {
  Pagination,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/react/pagination';
import { useState } from 'react';
import styles from '@/components/examples/pagination/pagination-controlled.module.css';

export default function ControlledPaginationDemo() {
  const [page, setPage] = useState(5);
  return (
    <div className={styles.stack}>
      <Pagination
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
      <div data-preview-meta>
        <output>Current page: {page}</output>
      </div>
    </div>
  );
}