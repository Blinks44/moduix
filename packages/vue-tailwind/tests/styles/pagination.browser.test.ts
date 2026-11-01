import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
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
} from '@/index';

const paginationComponents = {
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
};

test('applies Tailwind utilities to the owned visual parts', () => {
  const { container } = render({
    components: paginationComponents,
    template:
      '<Pagination :count="200" :default-page="10" :page-size="10" :sibling-count="1"><PaginationFirstTrigger /><PaginationPrevTrigger /><PaginationItems /><PaginationNextTrigger /><PaginationLastTrigger /></Pagination>',
  });

  expect(container.querySelectorAll('[data-slot="pagination-first-trigger"] svg')).toHaveLength(2);
});

test('merges consumer Tailwind classes after component defaults', async () => {
  render({
    components: paginationComponents,
    template:
      '<Pagination :count="20" :page-size="10"><PaginationPrevTrigger class="rounded-none px-0" /><PaginationItems /><PaginationNextTrigger /></Pagination>',
  });

  const previousTrigger = screen.getByRole('button', { name: /previous page/i });
  expect([...previousTrigger.classList]).toEqual(expect.arrayContaining(['rounded-none', 'px-0']));
  await expect
    .element(page.getByRole('button', { name: /previous page/i }))
    .toHaveCSS('border-radius', '0px');
  await expect
    .element(page.getByRole('button', { name: /previous page/i }))
    .toHaveCSS('padding-left', '0px');
});