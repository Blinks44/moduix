import { createListCollection } from '@ark-ui/react/collection';
import {
  Pagination,
  PaginationContext,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/react/pagination';
import {
  Select,
  SelectLabel,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from '@moduix/react/select';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/pagination/pagination-page-size-control.module.css';

const pageSizes = createListCollection({
  items: [
    {
      label: '5',
      value: '5',
    },
    {
      label: '10',
      value: '10',
    },
    {
      label: '20',
      value: '20',
    },
    {
      label: '50',
      value: '50',
    },
  ],
});

export default function PaginationPageSizeControlDemo() {
  return (
    <Pagination count={200} defaultPageSize={10}>
      <PaginationContext>
        {(pagination) => (
          <div className={styles.stack}>
            <div className={styles.row}>
              <Select
                className={styles.pageSizeSelect}
                collection={pageSizes}
                value={[String(pagination.pageSize)]}
                positioning={{
                  sameWidth: true,
                }}
                onValueChange={(details) => {
                  const nextValue = details.value[0];
                  if (nextValue) pagination.setPageSize(Number(nextValue));
                }}
              >
                <SelectLabel>Items per page</SelectLabel>
                <SelectControl>
                  <SelectTrigger>
                    <SelectValueText placeholder="Page size" />
                  </SelectTrigger>
                  <SelectIndicator />
                </SelectControl>
                <SelectPositioner>
                  <SelectContent>
                    {pageSizes.items.map((item) => (
                      <SelectItem key={item.value} item={item}>
                        <SelectItemText>{item.label}</SelectItemText>
                        <SelectItemIndicator />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectPositioner>
              </Select>
            </div>
            <div className={styles.row}>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </div>
            <PreviewMeta>
              <output>
                Page {pagination.page} of {pagination.totalPages}
              </output>
            </PreviewMeta>
          </div>
        )}
      </PaginationContext>
    </Pagination>
  );
}