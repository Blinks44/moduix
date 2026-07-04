/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Pagination } from '@moduix/react';
import { useState } from 'react';

export function ControlledPaginationDemo() {
  const [page, setPage] = useState(5);
  return (
    <div className="pagination-stack">
      <Pagination
        className="pagination-demo"
        count={200}
        page={page}
        pageSize={10}
        siblingCount={2}
        onPageChange={(details) => setPage(details.page)}
      >
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
      </Pagination>
      <p className="pagination-muted">Current page: {page}</p>
    </div>
  );
}

//#endregion