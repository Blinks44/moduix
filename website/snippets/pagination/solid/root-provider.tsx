import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRootProvider,
  usePagination,
} from '@moduix/solid/pagination';
import styles from '@/components/examples/pagination/pagination-root-provider.module.css';

export default function RootProviderPaginationDemo() {
  const pagination = usePagination({
    count: 200,
    pageSize: 10,
    siblingCount: 2,
  });

  return (
    <div class={styles.stack}>
      <button type="button" onClick={() => pagination().goToNextPage()}>
        Next page
      </button>
      <PaginationRootProvider class={styles.root} value={pagination}>
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </PaginationRootProvider>
    </div>
  );
}
