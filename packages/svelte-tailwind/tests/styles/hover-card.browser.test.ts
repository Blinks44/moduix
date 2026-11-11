import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import HoverCardOverride from './HoverCardOverride.svelte';

test('lets consumer Tailwind utilities win on every styled part', async () => {
  render(HoverCardOverride);
  const trigger = document.querySelector('button[data-slot="hover-card-trigger"]')!;
  const content = document.querySelector('[data-testid="content"]')!;
  expect(Array.from(trigger.classList)).toEqual(
    expect.arrayContaining(['gap-2', 'text-destructive']),
  );
  expect(Array.from(content.classList)).toEqual(expect.arrayContaining(['bg-card', 'p-4']));
  expect(
    Array.from(document.querySelector('[data-slot="hover-card-positioner"]')!.classList),
  ).toContain('max-w-none');
  expect(Array.from(document.querySelector('[data-slot="hover-card-arrow"]')!.classList)).toContain(
    '[--arrow-size:1rem]',
  );
  expect(
    Array.from(document.querySelector('[data-slot="hover-card-arrow-tip"]')!.classList),
  ).toContain('border-primary');
  await expect.element(page.getByRole('button', { name: 'Profile' })).toHaveCSS('gap', '8px');
  await expect.element(page.getByTestId('content')).toHaveCSS('padding', '16px');
});