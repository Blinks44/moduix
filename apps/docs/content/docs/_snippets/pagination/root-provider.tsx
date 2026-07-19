/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Pagination } from '@moduix/react';

export function RootProviderPaginationDemo() {
  const pagination = Pagination.usePagination({
    count: 200,
    pageSize: 10,
    siblingCount: 2,
  });
  return (
    <div className="pagination-stack">
      <button type="button" onClick={() => pagination.goToNextPage()}>
        Next page
      </button>
      <Pagination.RootProvider className="pagination-demo" value={pagination}>
        <Pagination.PrevTrigger />
        <Pagination.Items />
        <Pagination.NextTrigger />
      </Pagination.RootProvider>
    </div>
  );
}

//#endregion