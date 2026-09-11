import { Pagination } from '@moduix/solid/pagination';
import styles from '@/components/examples/pagination/pagination-customized.module.css';

export default function CustomizedPaginationDemo() {
  return (
    <Pagination
      class={styles.root}
      count={400}
      pageSize={20}
      siblingCount={3}
      translations={{
        nextTriggerLabel: 'Next page',
        prevTriggerLabel: 'Previous page',
        itemLabel: (details) => `Page ${details.page}`,
      }}
    >
      <Pagination.PrevTrigger />
      <Pagination.Items />
      <Pagination.NextTrigger />
    </Pagination>
  );
}