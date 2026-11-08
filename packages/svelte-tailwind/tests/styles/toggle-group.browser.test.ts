import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import ToggleGroupAnatomy from './ToggleGroupAnatomy.svelte';
import ToggleGroupOverride from './ToggleGroupOverride.svelte';

test('preserves Ark selection details, anatomy, attrs, refs, and keyboard navigation', async () => {
  const changes: string[][] = [];
  const { component } = render(ToggleGroupAnatomy, { props: { changes } });
  const root = screen.getByRole('radiogroup');
  const left = screen.getByRole('radio', { name: 'Left' });

  expect(component.getRefs().rootRef).toBe(root);
  expect(component.getRefs().itemRef).toBe(left);
  expect(root.dataset).toMatchObject({
    scope: 'toggle-group',
    part: 'root',
    slot: 'toggle-group-root',
    probe: 'root',
  });
  expect(left.dataset).toMatchObject({ scope: 'toggle-group', part: 'item' });
  await expect
    .element(page.getByRole('radio', { name: 'Left' }))
    .toHaveAttribute('data-state', 'on');

  const center = page.getByRole('radio', { name: 'Center' });

  await center.click();
  await expect.element(center).toHaveAttribute('data-state', 'on');
  await center.click();
  await expect.element(center).toHaveAttribute('data-state', 'off');
  expect(changes).toEqual([['center'], []]);

  await expect.element(center).toBeFocused();
  await center.press('ArrowRight');
  await expect.element(page.getByRole('radio', { name: 'Right' })).toBeFocused();
});

test('applies native utilities and keeps consumer classes last', () => {
  render(ToggleGroupOverride);

  const root = screen.getByRole('radiogroup');
  const item = screen.getByRole('radio', { name: 'Left' });

  expect(getComputedStyle(root)).toMatchObject({
    gap: '16px',
    borderRadius: '0px',
    paddingTop: '16px',
  });
  expect(getComputedStyle(item)).toMatchObject({
    minHeight: '40px',
    paddingTop: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    fontSize: '12px',
  });
});