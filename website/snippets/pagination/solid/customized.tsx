import {
  Pagination,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/solid/pagination';

export default function CustomizedPaginationDemo() {
  return (
    <Pagination
      count={400}
      pageSize={20}
      siblingCount={3}
      translations={{
        nextTriggerLabel: 'Next page',
        prevTriggerLabel: 'Previous page',
        itemLabel: (details) => `Page ${details.page}`,
      }}
    >
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </Pagination>
  );
}