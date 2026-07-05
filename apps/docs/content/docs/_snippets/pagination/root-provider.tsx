/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { usePagination } from '@ark-ui/react/pagination';
import { Pagination } from '@moduix/react';

export function RootProviderPaginationDemo() {
  const pagination = usePagination({
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
        <Pagination.Context>
          {(pagination) =>
            pagination.pages.map((page, index) =>
              page.type === 'page' ? (
                <Pagination.Item key={index} {...page}>
                  {page.value}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={index} index={index} />
              ),
            )
          }
        </Pagination.Context>
        <Pagination.NextTrigger />
      </Pagination.RootProvider>
    </div>
  );
}

//#endregion