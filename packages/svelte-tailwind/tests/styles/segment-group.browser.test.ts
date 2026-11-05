import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import SegmentGroupOverride from './SegmentGroupOverride.svelte';

test('applies native utilities before consumer classes and forwards refs', async () => {
  const { component } = render(SegmentGroupOverride);
  const refs = component.getRefs();

  const root = refs.rootRef as HTMLElement;
  const item = screen.getByText('React').closest('[data-slot="segment-group-item"]') as HTMLElement;
  const indicator = screen
    .getByRole('radiogroup')
    .querySelector('[data-slot="segment-group-indicator"]');
  expect([...root.classList]).toEqual(expect.arrayContaining(['border-primary']));
  expect([...item.classList]).toEqual(
    expect.arrayContaining(['data-[state=checked]:text-primary-foreground']),
  );
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['bg-primary']));
  expect(refs.itemRef).toBe(item);
  await expect.element(page.getByRole('radiogroup')).toHaveCSS('gap', '16px');
});