import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import PaginationOverride from './PaginationOverride.svelte';

test('applies Tailwind utilities to the owned visual parts', () => {
  const { container } = render(PaginationOverride, { props: { edges: true } });

  expect(container.querySelectorAll('[data-slot="pagination-first-trigger"] svg')).toHaveLength(2);
});

test('merges consumer Tailwind classes after component defaults', async () => {
  render(PaginationOverride);

  const previousTrigger = screen.getByRole('button', { name: /previous page/i });
  expect([...previousTrigger.classList]).toEqual(expect.arrayContaining(['rounded-none', 'px-0']));
  await expect
    .element(page.getByRole('button', { name: /previous page/i }))
    .toHaveCSS('border-radius', '0px');
  await expect
    .element(page.getByRole('button', { name: /previous page/i }))
    .toHaveCSS('padding-left', '0px');
});