import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/react/pagination';
import styles from '@/components/examples/pagination/pagination-link.module.css';

export default function LinkPaginationDemo() {
  return (
    <Pagination
      className={styles.root}
      count={200}
      pageSize={10}
      siblingCount={2}
      type="link"
      getPageUrl={(details) => `?page=${details.page}`}
    >
      <PaginationPrevTrigger asChild>
        <a>Previous</a>
      </PaginationPrevTrigger>
      <PaginationContext>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <PaginationItem key={index} asChild {...page}>
                <a>{page.value}</a>
              </PaginationItem>
            ) : (
              <PaginationEllipsis key={index} index={index} />
            ),
          )
        }
      </PaginationContext>
      <PaginationNextTrigger asChild>
        <a>Next</a>
      </PaginationNextTrigger>
    </Pagination>
  );
}