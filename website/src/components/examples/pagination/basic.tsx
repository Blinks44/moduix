import {
  Pagination,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/react/pagination';

export default function PaginationDemo() {
  return (
    <Pagination count={200} pageSize={10} siblingCount={2}>
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </Pagination>
  );
}