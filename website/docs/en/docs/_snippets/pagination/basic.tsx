import { Pagination } from '@moduix/react/pagination';

export default function PaginationDemo() {
  return (
    <Pagination className="pagination-demo" count={200} pageSize={10} siblingCount={2}>
      <Pagination.PrevTrigger />
      <Pagination.Items />
      <Pagination.NextTrigger />
    </Pagination>
  );
}