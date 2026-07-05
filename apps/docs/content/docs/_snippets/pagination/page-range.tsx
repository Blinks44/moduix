/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Pagination } from '@moduix/react';

export function PaginationPageRangeDemo() {
  return (
    <Pagination count={200} pageSize={10}>
      <Pagination.Context>
        {(pagination) => (
          <div className="pagination-stack">
            <div className="pagination-row">
              <Pagination.PrevTrigger />
              {pagination.pages.map((page, index) =>
                page.type === 'page' ? (
                  <Pagination.Item key={index} {...page}>
                    {page.value}
                  </Pagination.Item>
                ) : (
                  <Pagination.Ellipsis key={index} index={index} />
                ),
              )}
              <Pagination.NextTrigger />
            </div>
            <p className="pagination-muted">
              Showing {pagination.pageRange.start + 1}-{pagination.pageRange.end} of{' '}
              {pagination.count} results
            </p>
          </div>
        )}
      </Pagination.Context>
    </Pagination>
  );
}

//#endregion