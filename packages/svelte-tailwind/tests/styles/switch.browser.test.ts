import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
// The shared harness resolves `@/` to this package's source.
import RefsSwitch from '../../../svelte/tests/switch/RefsSwitch.svelte';
import SwitchOverride from './SwitchOverride.svelte';

test('forwards Svelte refs and exposes stable slots on public parts', () => {
  const { component } = render(RefsSwitch);
  const refs = component.getRefs();

  expect(refs.root?.getAttribute('data-slot')).toBe('switch-root');
  expect(refs.root?.getAttribute('data-size')).toBe('lg');
  expect(refs.control?.getAttribute('data-slot')).toBe('switch-control');
  expect(refs.thumb?.getAttribute('data-slot')).toBe('switch-thumb');
  expect(refs.label?.getAttribute('data-slot')).toBe('switch-label');
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(SwitchOverride);

  const root = screen.getByTestId('root');
  const control = root.querySelector('[data-slot="switch-control"]')!;
  const thumb = root.querySelector('[data-slot="switch-thumb"]')!;
  const label = screen.getByText('Notifications');
  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-4']));
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['w-10', 'rounded-md', 'bg-background']),
  );
  expect([...thumb.classList]).toEqual(expect.arrayContaining(['size-4', 'bg-muted-foreground']));
  expect([...label.classList]).toEqual(expect.arrayContaining(['text-lg']));
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect.element(page.locator('[data-slot="switch-control"]')).toHaveCSS('width', '40px');
  await expect.element(page.locator('[data-slot="switch-thumb"]')).toHaveCSS('width', '16px');
});