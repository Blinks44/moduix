import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AccordionOverride from './AccordionOverride.svelte';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(AccordionOverride);
  const body = screen.getByText('First content');
  expect([...body.classList]).toEqual(expect.arrayContaining(['p-0']));
  await expect
    .element(page.getByText('First content', { exact: true }))
    .toHaveCSS('padding', '0px');
});