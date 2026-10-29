import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRootProvider,
  usePagination,
} from '@moduix/solid/pagination';
import { Stack } from '@moduix/solid/stack';

export default function RootProviderPaginationDemo() {
  const pagination = usePagination({
    count: 200,
    pageSize: 10,
    siblingCount: 2,
  });

  return (
    <Stack align="flex-start" gap="3">
      <button type="button" onClick={() => pagination().goToNextPage()}>
        Next page
      </button>
      <PaginationRootProvider value={pagination}>
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </PaginationRootProvider>
    </Stack>
  );
}