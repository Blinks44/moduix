/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Pagination } from '@moduix/react';

export function PaginationWithEdgesDemo() {
  return (
    <Pagination className="pagination-demo" count={400} pageSize={20} siblingCount={2}>
      <Pagination.FirstTrigger />
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
      <Pagination.LastTrigger />
    </Pagination>
  );
}

//#endregion