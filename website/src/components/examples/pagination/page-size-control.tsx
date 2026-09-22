import { createListCollection } from '@ark-ui/react/collection';
import {
  Pagination,
  PaginationContext,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/react/pagination';
import { Select } from '@moduix/react/select';
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
                <Select.Label>Items per page</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Page size" />
                  </Select.Trigger>
                  <Select.Indicator />
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    {pageSizes.items.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        <Select.ItemText>{item.label}</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
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
