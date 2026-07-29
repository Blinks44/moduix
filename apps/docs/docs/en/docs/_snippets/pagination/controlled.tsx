import { Pagination } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ControlledPaginationDemo() {
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
        <Pagination.Items />
        <Pagination.NextTrigger />
      </Pagination>
      <PreviewMeta>
        <output>Current page: {page}</output>
      </PreviewMeta>
    </div>
  );
}