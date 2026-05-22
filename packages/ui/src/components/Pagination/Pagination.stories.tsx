import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    count: 10,
    defaultPage: 1,
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Middle: Story = {
  args: {
    defaultPage: 5,
  },
};

export const End: Story = {
  args: {
    defaultPage: 8,
  },
};

export const NumbersOnly: Story = {
  args: {
    withArrows: false,
  },
};

export const ArrowsOnly: Story = {
  args: {
    withPages: false,
  },
};

export const OutlineToolbar: Story = {
  args: {
    toolbarVariant: 'outline',
  },
};

export const AsLinks: Story = {
  render: () => {
    const [page, setPage] = React.useState(5);

    return (
      <Pagination
        count={10}
        page={page}
        onPageChange={setPage}
        getPageHref={(nextPage) => `?page=${nextPage}`}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Pagination count={10} defaultPage={4} size="xs" />
      <Pagination count={10} defaultPage={4} size="sm" />
      <Pagination count={10} defaultPage={4} size="md" />
      <Pagination count={10} defaultPage={4} size="lg" />
      <Pagination count={10} defaultPage={4} size="xl" />
    </div>
  ),
};