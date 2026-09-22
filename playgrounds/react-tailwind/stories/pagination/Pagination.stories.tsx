import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationFirstTrigger,
  PaginationItem,
  PaginationItems,
  PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRootProvider,
  usePagination,
} from '@/components/pagination/Pagination';

type PaginationStoryArgs = {
  count?: number;
  defaultPage?: number;
  pageSize?: number;
  siblingCount?: number;
};

function PaginationPreview({
  count = 200,
  defaultPage = 5,
  pageSize = 10,
  siblingCount = 1,
}: PaginationStoryArgs) {
  return (
    <Pagination
      count={count}
      defaultPage={defaultPage}
      pageSize={pageSize}
      siblingCount={siblingCount}
    >
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </Pagination>
  );
}

function CustomPaginationItems() {
  return (
    <PaginationContext>
      {(pagination) =>
        pagination.pages.map((page, index) =>
          page.type === 'page' ? (
            <PaginationItem
              key={page.value}
              {...page}
              className="rounded-sm data-selected:border-primary data-selected:bg-primary data-selected:text-primary-foreground"
            >
              {page.value}
            </PaginationItem>
          ) : (
            <PaginationEllipsis key={`ellipsis-${index}`} index={index} className="rounded-sm" />
          ),
        )
      }
    </PaginationContext>
  );
}

const meta = {
  title: 'Components/Pagination',
  component: PaginationPreview,
  parameters: {
    layout: 'centered',
  },
  render: (args) => <PaginationPreview {...args} />,
} satisfies Meta<PaginationStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 200,
    defaultPage: 5,
    pageSize: 10,
  },
};

export const Start: Story = {
  args: {
    count: 200,
    defaultPage: 1,
    pageSize: 10,
  },
};

export const End: Story = {
  args: {
    count: 200,
    defaultPage: 20,
    pageSize: 10,
  },
};

export const NumericContent: Story = {
  args: {
    count: 120,
    defaultPage: 10,
    pageSize: 1,
    siblingCount: 2,
  },
};

export const Controlled: Story = {
  render: () => {
    const [page, setPage] = useState(5);

    return (
      <Pagination
        count={200}
        page={page}
        pageSize={10}
        onPageChange={(details) => setPage(details.page)}
      >
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </Pagination>
    );
  },
};

export const Link: Story = {
  render: () => (
    <Pagination
      count={200}
      defaultPage={5}
      pageSize={10}
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
              <PaginationItem key={page.value} asChild {...page}>
                <a>{page.value}</a>
              </PaginationItem>
            ) : (
              <PaginationEllipsis key={`ellipsis-${index}`} index={index} />
            ),
          )
        }
      </PaginationContext>
      <PaginationNextTrigger asChild>
        <a>Next</a>
      </PaginationNextTrigger>
    </Pagination>
  ),
};

export const WithEdges: Story = {
  render: () => (
    <Pagination count={400} pageSize={20} siblingCount={2}>
      <PaginationFirstTrigger />
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
      <PaginationLastTrigger />
    </Pagination>
  ),
};

export const RightToLeft: Story = {
  render: () => (
    <Pagination dir="rtl" count={200} defaultPage={5} pageSize={10} siblingCount={1}>
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </Pagination>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const pagination = usePagination({ count: 200, pageSize: 10, siblingCount: 2 });

    return (
      <div className="grid justify-items-center gap-3">
        <button type="button" onClick={() => pagination.goToNextPage()}>
          Next page
        </button>
        <PaginationRootProvider value={pagination}>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </PaginationRootProvider>
      </div>
    );
  },
};

export const CustomStyles: Story = {
  render: () => (
    <Pagination count={200} defaultPage={5} pageSize={10}>
      <PaginationPrevTrigger className="rounded-sm" />
      <CustomPaginationItems />
      <PaginationNextTrigger className="rounded-sm" />
    </Pagination>
  ),
};
