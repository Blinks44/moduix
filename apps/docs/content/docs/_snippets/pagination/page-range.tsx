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
              <Pagination.Items />
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