import { createListCollection } from '@ark-ui/react/collection';
import { Pagination, Select } from '@moduix/react';

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
      <Pagination.Context>
        {(pagination) => (
          <div className="pagination-stack">
            <div className="pagination-row">
              <Select
                className="pagination-page-size-select"
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
                  <Select.Indicators>
                    <Select.Indicator />
                  </Select.Indicators>
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
            <div className="pagination-row">
              <Pagination.PrevTrigger />
              <Pagination.Items />
              <Pagination.NextTrigger />
            </div>
            <p className="pagination-muted">
              Page {pagination.page} of {pagination.totalPages}
            </p>
          </div>
        )}
      </Pagination.Context>
    </Pagination>
  );
}