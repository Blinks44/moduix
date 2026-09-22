import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/react/pagination';
import styles from '@/components/examples/pagination/pagination-advanced-customization.module.css';

export default function AdvancedCustomizationPaginationDemo() {
  return (
    <Pagination className={styles.root} count={200} pageSize={10} siblingCount={2}>
      <PaginationPrevTrigger />
      <PaginationContext>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <PaginationItem key={index} {...page}>
                Page {page.value}
              </PaginationItem>
            ) : (
              <PaginationEllipsis key={index} index={index} />
            ),
          )
        }
      </PaginationContext>
      <PaginationNextTrigger />
    </Pagination>
  );
}