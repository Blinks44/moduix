import { Pagination } from '@moduix/react/pagination';

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
      <Pagination.PrevTrigger asChild>
        <a>Previous</a>
      </Pagination.PrevTrigger>
      <Pagination.Context>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <Pagination.Item key={index} asChild {...page}>
                <a>{page.value}</a>
              </Pagination.Item>
            ) : (
              <Pagination.Ellipsis key={index} index={index} />
            ),
          )
        }
      </Pagination.Context>
      <Pagination.NextTrigger asChild>
        <a>Next</a>
      </Pagination.NextTrigger>
    </Pagination>
  );
}