import { Pagination } from '@moduix/react';

export default function LinkPaginationDemo() {
  return (
    <Pagination
      className="pagination-demo"
      count={200}
      pageSize={10}
      siblingCount={2}
      type="link"
      getPageUrl={(details) => `?page=${details.page}`}
    >
      <Pagination.PrevTrigger />
      <Pagination.Items />
      <Pagination.NextTrigger />
    </Pagination>
  );
}