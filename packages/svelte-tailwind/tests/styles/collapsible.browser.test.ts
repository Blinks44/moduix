import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import CollapsibleOverride from './CollapsibleOverride.svelte';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(CollapsibleOverride);

  const root = screen.getByTestId('collapsible-root');
  const trigger = screen.getByRole('button', { name: 'Recovery details' });
  const indicator = root.querySelector('[data-slot="collapsible-indicator"]');
  const content = root.querySelector('[data-slot="collapsible-content"]');
  const body = root.querySelector('[data-slot="collapsible-body"]');

  expect([...root.classList]).toEqual(expect.arrayContaining(['w-1/2', 'text-primary']));
  expect([...trigger.classList]).toEqual(expect.arrayContaining(['gap-6', 'py-4', 'text-lg']));
  expect(indicator?.classList.contains('size-5')).toBe(true);
  expect(content?.classList.contains('text-lg')).toBe(true);
  expect([...body!.classList]).toEqual(expect.arrayContaining(['gap-6', 'p-6']));
});