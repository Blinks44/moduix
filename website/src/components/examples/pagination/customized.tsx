import {
  Pagination,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/react/pagination';
import styles from '@/components/examples/pagination/pagination-customized.module.css';

export default function CustomizedPaginationDemo() {
  return (
    <Pagination
      className={styles.root}
      count={400}
      pageSize={20}
      siblingCount={3}
      translations={{
        nextTriggerLabel: 'Next page',
        prevTriggerLabel: 'Previous page',
        itemLabel: (details) => `Page ${details.page}`,
      }}
    >
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </Pagination>
  );
}