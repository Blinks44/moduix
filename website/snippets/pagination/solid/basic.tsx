import { Pagination } from '@moduix/solid/pagination';
import styles from '@/components/examples/pagination/pagination-basic.module.css';

export default function PaginationDemo() {
  return (
    <Pagination class={styles.root} count={200} pageSize={10} siblingCount={2}>
      <Pagination.PrevTrigger />
      <Pagination.Items />
      <Pagination.NextTrigger />
    </Pagination>
  );
}