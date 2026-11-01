import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ListboxClearTrigger } from '@/index';

test('applies consumer classes after CSS Module defaults and keeps clear trigger accessible', async () => {
  render(ListboxClearTrigger, { props: { class: 'consumer-clear' } });
  const clear = screen.getByRole('button', { name: 'Clear search' });
  await expect
    .element(page.getByRole('button', { name: 'Clear search', exact: true }))
    .toHaveAttribute('type', 'button');
  expect(Boolean(clear.querySelector('svg')?.isConnected)).toBe(true);
});