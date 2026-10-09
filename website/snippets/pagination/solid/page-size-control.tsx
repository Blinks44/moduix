import { createListCollection } from '@ark-ui/solid/collection';
import {
  Pagination,
  PaginationContext,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/solid/pagination';
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
} from '@moduix/solid/select';
import { For } from 'solid-js';
import styles from '@/components/examples/pagination/pagination-page-size-control.module.css';

const pageSizes = createListCollection({
  items: [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
  ],
});

export default function PaginationPageSizeControlDemo() {
  return (
    <Pagination count={200} defaultPageSize={10}>
      <PaginationContext>
        {(pagination) => (
          <div class={styles.stack}>
            <div class={styles.row}>
              <Select
                class={styles.pageSizeSelect}
                collection={pageSizes}
                value={[String(pagination().pageSize)]}
                positioning={{ sameWidth: true }}
                onValueChange={(details) => {
                  const nextValue = details.value[0];
                  if (nextValue) pagination().setPageSize(Number(nextValue));
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
                    <For each={pageSizes.items}>
                      {(item) => (
                        <SelectItem item={item}>
                          <SelectItemText>{item.label}</SelectItemText>
                          <SelectItemIndicator />
                        </SelectItem>
                      )}
                    </For>
                  </SelectContent>
                </SelectPositioner>
              </Select>
            </div>
            <div class={styles.row}>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </div>
            <output>
              Page {pagination().page} of {pagination().totalPages}
            </output>
          </div>
        )}
      </PaginationContext>
    </Pagination>
  );
}