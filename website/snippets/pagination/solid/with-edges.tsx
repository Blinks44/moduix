import {
  Pagination,
  PaginationFirstTrigger,
  PaginationItems,
  PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/solid/pagination';

export default function PaginationWithEdgesDemo() {
  return (
    <Pagination count={400} pageSize={20} siblingCount={2}>
      <PaginationFirstTrigger />
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
      <PaginationLastTrigger />
    </Pagination>
  );
}