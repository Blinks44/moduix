import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import TabsOverride from './TabsOverride.svelte';

test('merges consumer utilities after Tailwind defaults', async () => {
  render(TabsOverride);

  const root = screen.getByRole('tablist').parentElement;
  const list = screen.getByRole('tablist');
  const trigger = screen.getByRole('tab', { name: 'Overview' });
  const content = screen.getByText('Overview content');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['flex-row']));
  expect([...list.classList]).toEqual(expect.arrayContaining(['w-full', 'bg-card']));
  expect([...trigger.classList]).toEqual(expect.arrayContaining(['h-10']));
  expect([...content.classList]).toEqual(expect.arrayContaining(['p-6']));
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveCSS('height', '40px');
  await expect
    .element(page.getByText('Overview content', { exact: true }))
    .toHaveCSS('padding', '24px');
});