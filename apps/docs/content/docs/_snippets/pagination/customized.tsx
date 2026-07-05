/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Pagination } from '@moduix/react';

const siblingCount = 3;

export function CustomizedPaginationDemo() {
  return (
    <Pagination
      className="pagination-demo"
      count={400}
      pageSize={20}
      siblingCount={3}
      translations={{
        nextTriggerLabel: 'Next page',
        prevTriggerLabel: 'Previous page',
        itemLabel: (details) => `Page ${details.page}`,
      }}
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