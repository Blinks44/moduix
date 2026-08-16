import type { Meta, StoryObj } from '@storybook/react';
import { useState, type CSSProperties } from 'react';
import { Pagination } from '@/components/pagination/Pagination';

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
      <Pagination.PrevTrigger />
      <Pagination.Items />
      <Pagination.NextTrigger />
    </Pagination>
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
        <Pagination.PrevTrigger />
        <Pagination.Items />
        <Pagination.NextTrigger />
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
      <Pagination.PrevTrigger asChild>
        <a>Previous</a>
      </Pagination.PrevTrigger>
      <Pagination.Context>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <Pagination.Item key={page.value} asChild {...page}>
                <a>{page.value}</a>
              </Pagination.Item>
            ) : (
              <Pagination.Ellipsis key={`ellipsis-${index}`} index={index} />
            ),
          )
        }
      </Pagination.Context>
      <Pagination.NextTrigger asChild>
        <a>Next</a>
      </Pagination.NextTrigger>
    </Pagination>
  ),
};

export const WithEdges: Story = {
  render: () => (
    <Pagination count={400} pageSize={20} siblingCount={2}>
      <Pagination.FirstTrigger />
      <Pagination.PrevTrigger />
      <Pagination.Items />
      <Pagination.NextTrigger />
      <Pagination.LastTrigger />
    </Pagination>
  ),
};

export const RightToLeft: Story = {
  render: () => (
    <Pagination dir="rtl" count={200} defaultPage={5} pageSize={10} siblingCount={1}>
      <Pagination.PrevTrigger />
      <Pagination.Items />
      <Pagination.NextTrigger />
    </Pagination>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const pagination = Pagination.usePagination({ count: 200, pageSize: 10, siblingCount: 2 });

    return (
      <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)', justifyItems: 'center' }}>
        <button type="button" onClick={() => pagination.goToNextPage()}>
          Next page
        </button>
        <Pagination.RootProvider value={pagination}>
          <Pagination.PrevTrigger />
          <Pagination.Items />
          <Pagination.NextTrigger />
        </Pagination.RootProvider>
      </div>
    );
  },
};

export const CustomStyles: Story = {
  render: () => (
    <Pagination
      count={200}
      defaultPage={5}
      pageSize={10}
      style={
        {
          '--moduix-pagination-item-bg-selected': 'var(--moduix-color-primary)',
          '--moduix-pagination-item-border-color-selected': 'var(--moduix-color-primary)',
          '--moduix-pagination-item-color-selected': 'var(--moduix-color-primary-foreground)',
          '--moduix-pagination-item-radius': 'var(--moduix-radius-sm)',
        } as CSSProperties
      }
    >
      <Pagination.PrevTrigger />
      <Pagination.Items />
      <Pagination.NextTrigger />
    </Pagination>
  ),
};