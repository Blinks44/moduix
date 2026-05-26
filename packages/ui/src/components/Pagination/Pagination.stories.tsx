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
} from './Pagination';

function getPaginationItems(currentPage: number, pageCount: number) {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'end', pageCount];
  }

  if (currentPage >= pageCount - 3) {
    return [1, 'start', pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
  }

  return [1, 'start', currentPage - 1, currentPage, currentPage + 1, 'end', pageCount];
}

function PaginationDemo({
  currentPage = 5,
  pageCount = 10,
}: {
  currentPage?: number;
  pageCount?: number;
}) {
  const [page, setPage] = React.useState(currentPage);

  React.useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            render={<button type="button" />}
            aria-disabled={page === 1 || undefined}
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          />
        </PaginationItem>
        {getPaginationItems(page, pageCount).map((item, index) => (
          <PaginationItem key={`${item}-${index}`}>
            {typeof item !== 'number' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                render={<button type="button" />}
                isActive={item === page}
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
            aria-disabled={page === pageCount || undefined}
            onClick={() => {
              if (page < pageCount) {
                setPage(page + 1);
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
    const previousPage = Math.max(page - 1, 1);
    const nextPage = Math.min(page + 1, 10);

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              render={<button type="button" />}
              aria-disabled={page === 1 || undefined}
              onClick={() => {
                if (page > 1) {
                  setPage(previousPage);
                }
              }}
            />
          </PaginationItem>
          {getPaginationItems(page, 10).map((item, index) => (
            <PaginationItem key={`${item}-${index}`}>
              {typeof item !== 'number' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  render={<button type="button" />}
                  isActive={item === page}
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
              aria-disabled={page === 10 || undefined}
              onClick={() => {
                if (page < 10) {
                  setPage(nextPage);
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