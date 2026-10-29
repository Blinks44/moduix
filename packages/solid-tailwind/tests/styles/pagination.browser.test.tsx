import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  Pagination,
  PaginationFirstTrigger,
  PaginationItems,
  PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@/index';

test('applies Tailwind utilities to owned visual parts', () => {
  const { container } = render(() => (
    <Pagination count={200} defaultPage={10} pageSize={10} siblingCount={1}>
      <PaginationFirstTrigger />
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
      <PaginationLastTrigger />
    </Pagination>
  ));

  expect(container.querySelectorAll('[data-slot="pagination-first-trigger"] svg')).toHaveLength(2);
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(() => (
    <Pagination count={20} pageSize={10}>
      <PaginationPrevTrigger class="rounded-none px-0" />
      <PaginationItems />
      <PaginationNextTrigger />
    </Pagination>
  ));

  const previousTrigger = screen.getByRole('button', { name: /previous page/i });
  expect([...previousTrigger.classList]).toEqual(expect.arrayContaining(['rounded-none', 'px-0']));
  await expect
    .element(page.getByRole('button', { name: /previous page/i }))
    .toHaveCSS('border-radius', '0px');
  await expect
    .element(page.getByRole('button', { name: /previous page/i }))
    .toHaveCSS('padding-left', '0px');
});