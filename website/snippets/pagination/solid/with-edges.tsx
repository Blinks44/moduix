import {
  Pagination,
  PaginationFirstTrigger,
  PaginationItems,
  PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/solid/pagination';
import styles from '@/components/examples/pagination/pagination-with-edges.module.css';

export default function PaginationWithEdgesDemo() {
  return (
    <Pagination class={styles.root} count={400} pageSize={20} siblingCount={2}>
      <PaginationFirstTrigger />
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
      <PaginationLastTrigger />
    </Pagination>
  );
}