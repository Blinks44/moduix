import { Pagination } from '@moduix/react';

export default function PaginationWithEdgesDemo() {
  return (
    <Pagination className="pagination-demo" count={400} pageSize={20} siblingCount={2}>
      <Pagination.FirstTrigger />
      <Pagination.PrevTrigger />
      <Pagination.Items />
      <Pagination.NextTrigger />
      <Pagination.LastTrigger />
    </Pagination>
  );
}