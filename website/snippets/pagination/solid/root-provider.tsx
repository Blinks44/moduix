import { Pagination } from '@moduix/solid/pagination';
import styles from '@/components/examples/pagination/pagination-root-provider.module.css';

export default function RootProviderPaginationDemo() {
  const pagination = Pagination.usePagination({
    count: 200,
    pageSize: 10,
    siblingCount: 2,
  });

  return (
    <div class={styles.stack}>
      <button type="button" onClick={() => pagination().goToNextPage()}>
        Next page
      </button>
      <Pagination.RootProvider class={styles.root} value={pagination}>
        <Pagination.PrevTrigger />
        <Pagination.Items />
        <Pagination.NextTrigger />
      </Pagination.RootProvider>
    </div>
  );
}