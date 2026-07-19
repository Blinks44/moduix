/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Pagination } from '@moduix/react';

const getPageUrl = ({ page }: { page: number }) => `?page=${page}`;

export function LinkPaginationDemo() {
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

//#endregion