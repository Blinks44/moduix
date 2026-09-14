import { Pagination } from '@moduix/solid/pagination';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/pagination/pagination-controlled.module.css';

export default function ControlledPaginationDemo() {
  const [page, setPage] = createSignal(5);

  return (
    <div class={styles.stack}>
      <Pagination
        class={styles.root}
        count={200}
        page={page()}
        pageSize={10}
        siblingCount={2}
        onPageChange={(details) => setPage(details.page)}
      >
        <Pagination.PrevTrigger />
        <Pagination.Items />
        <Pagination.NextTrigger />
      </Pagination>
      <output>Current page: {page()}</output>
    </div>
  );
}