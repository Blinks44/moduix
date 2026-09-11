import { createListCollection } from '@ark-ui/solid/collection';
import { Pagination } from '@moduix/solid/pagination';
import { Select } from '@moduix/solid/select';
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
      <Pagination.Context>
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
                <Select.Label>Items per page</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Page size" />
                  </Select.Trigger>
                  <Select.Indicator />
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    <For each={pageSizes.items}>
                      {(item) => (
                        <Select.Item item={item}>
                          <Select.ItemText>{item.label}</Select.ItemText>
                          <Select.ItemIndicator />
                        </Select.Item>
                      )}
                    </For>
                  </Select.Content>
                </Select.Positioner>
              </Select>
            </div>
            <div class={styles.row}>
              <Pagination.PrevTrigger />
              <Pagination.Items />
              <Pagination.NextTrigger />
            </div>
            <output>
              Page {pagination().page} of {pagination().totalPages}
            </output>
          </div>
        )}
      </Pagination.Context>
    </Pagination>
  );
}