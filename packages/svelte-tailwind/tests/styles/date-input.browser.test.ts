import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import DateInputAsChild from './DateInputAsChild.svelte';
import DateInputOverride from './DateInputOverride.svelte';

test('keeps explicit inputs inside an asChild root and forwards refs', async () => {
  const { component, container } = render(DateInputAsChild);

  const root = container.querySelector('[data-slot="date-input-root"]')!;
  expect(root.tagName).toBe('FIELDSET');
  expect(component.getRefs().rootRef).toBe(root);
  await expect
    .element(page.locator('[data-slot="date-input-root"]'))
    .toHaveAttribute('data-slot', 'date-input-root');
  expect(root.querySelector('input[type="hidden"]')!.getAttribute('name')).toBe('release-date');
});

test('applies native utilities to owned parts and lets consumer utilities win', async () => {
  const { container } = render(DateInputOverride);

  const control = container.querySelector('[data-slot="date-input-control"]');
  const segmentGroup = container.querySelector('[data-slot="date-input-segment-group"]');
  const segment = container.querySelector('[data-slot="date-input-segment"]');

  expect([...control!.classList]).toEqual(
    expect.arrayContaining(['w-80', 'rounded-lg', 'bg-muted', 'px-0', 'text-primary']),
  );
  expect(segmentGroup!.classList.contains('gap-2')).toBe(true);
  expect([...segment!.classList]).toEqual(expect.arrayContaining(['min-w-0', 'px-0']));
});