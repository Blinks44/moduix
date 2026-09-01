import { Pagination } from '@moduix/react/pagination';
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
        <Pagination.PrevTrigger />
        <Pagination.Items />
        <Pagination.NextTrigger />
      </Pagination>
      <PreviewMeta>
        <output>Current page: {page}</output>
      </PreviewMeta>
    </div>
  );
}