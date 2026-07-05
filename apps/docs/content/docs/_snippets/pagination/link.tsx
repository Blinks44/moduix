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
  );
}

//#endregion