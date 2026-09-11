import { Pagination } from '@moduix/solid/pagination';
import styles from '@/components/examples/pagination/pagination-with-edges.module.css';

export default function PaginationWithEdgesDemo() {
  return (
    <Pagination class={styles.root} count={400} pageSize={20} siblingCount={2}>
      <Pagination.FirstTrigger />
      <Pagination.PrevTrigger />
      <Pagination.Items />
      <Pagination.NextTrigger />
      <Pagination.LastTrigger />
    </Pagination>
  );
}