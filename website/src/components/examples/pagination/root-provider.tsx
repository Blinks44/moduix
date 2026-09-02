import { Pagination } from '@moduix/react/pagination';
import styles from '@/components/examples/pagination/pagination-root-provider.module.css';

export default function RootProviderPaginationDemo() {
  const pagination = Pagination.usePagination({
    count: 200,
    pageSize: 10,
    siblingCount: 2,
  });
  return (
    <div className={styles.stack}>
      <button type="button" onClick={() => pagination.goToNextPage()}>
        Next page
      </button>
      <Pagination.RootProvider className={styles.root} value={pagination}>
        <Pagination.PrevTrigger />
        <Pagination.Items />
        <Pagination.NextTrigger />
      </Pagination.RootProvider>
    </div>
  );
}