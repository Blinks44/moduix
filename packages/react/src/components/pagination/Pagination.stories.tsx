import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { Pagination } from './Pagination';

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

export const RootProvider: Story = {
  render: () => {
    const pagination = Pagination.usePagination({ count: 200, pageSize: 10, siblingCount: 2 });

    return (
      <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'center' }}>
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
          '--pagination-item-bg-selected': 'var(--color-primary)',
          '--pagination-item-border-color-selected': 'var(--color-primary)',
          '--pagination-item-color-selected': 'var(--color-primary-foreground)',
          '--pagination-item-radius': 'var(--radius-sm)',
        } as CSSProperties
      }
    >
      <Pagination.PrevTrigger />
      <Pagination.Items />
      <Pagination.NextTrigger />
    </Pagination>
  ),
};