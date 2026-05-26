import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  usePagination,
} from './Pagination';

function PaginationDemo({
  currentPage = 5,
  pageCount = 10,
}: {
  currentPage?: number;
  pageCount?: number;
}) {
  const [page, setPage] = React.useState(currentPage);
  const pagination = usePagination({ count: pageCount, page });

  React.useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            render={<button type="button" />}
            aria-disabled={!pagination.canPreviousPage || undefined}
            onClick={() => {
              if (pagination.canPreviousPage) {
                setPage(pagination.previousPage);
              }
            }}
          />
        </PaginationItem>
        {pagination.items.map((item, index) => (
          <PaginationItem key={`${item}-${index}`}>
            {typeof item !== 'number' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                render={<button type="button" />}
                isActive={item === pagination.page}
                onClick={() => setPage(item)}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            render={<button type="button" />}
            aria-disabled={!pagination.canNextPage || undefined}
            onClick={() => {
              if (pagination.canNextPage) {
                setPage(pagination.nextPage);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

const meta = {
  title: 'Components/Pagination',
  component: PaginationDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PaginationDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Start: Story = {
  args: {
    currentPage: 1,
  },
};

export const End: Story = {
  args: {
    currentPage: 10,
  },
};

export const Controlled: Story = {
  render: () => {
    const [page, setPage] = React.useState(5);
    const pagination = usePagination({ count: 10, page });

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              render={<button type="button" />}
              aria-disabled={!pagination.canPreviousPage || undefined}
              onClick={() => {
                if (pagination.canPreviousPage) {
                  setPage(pagination.previousPage);
                }
              }}
            />
          </PaginationItem>
          {pagination.items.map((item, index) => (
            <PaginationItem key={`${item}-${index}`}>
              {typeof item !== 'number' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  render={<button type="button" />}
                  isActive={item === pagination.page}
                  onClick={() => setPage(item)}
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              render={<button type="button" />}
              aria-disabled={!pagination.canNextPage || undefined}
              onClick={() => {
                if (pagination.canNextPage) {
                  setPage(pagination.nextPage);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

export const CustomStyles: Story = {
  render: () => (
    <div
      style={
        {
          '--pagination-item-bg-active': 'var(--color-primary)',
          '--pagination-item-border-color-active': 'var(--color-primary)',
          '--pagination-item-color-active': 'var(--color-primary-foreground)',
          '--pagination-item-radius': 'var(--radius-sm)',
        } as React.CSSProperties
      }
    >
      <PaginationDemo />
    </div>
  ),
};