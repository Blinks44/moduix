import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildHarness from './swap/AsChildHarness.svelte';
import LazyHarness from './swap/LazyHarness.svelte';
import ProviderHarness from './swap/ProviderHarness.svelte';
import ReactiveHarness from './swap/ReactiveHarness.svelte';
import ReactiveProviderHarness from './swap/ReactiveProviderHarness.svelte';
import RefsHarness from './swap/RefsHarness.svelte';

test('preserves Ark semantics, Svelte refs, anatomy, attributes, and moduix hooks', () => {
  const { component } = render(RefsHarness);

  const refs = component.getRefs();
  const root = refs.rootRef as HTMLElement;
  const off = screen.getByText('Off');
  const on = screen.getByText('On');

  expect(root.getAttribute('data-scope')).toBe('swap');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-slot')).toBe('swap-root');
  expect(root.getAttribute('data-animation')).toBe('scale');
  expect(root.getAttribute('data-swap')).toBe('off');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(refs.offRef).toBe(off);
  expect(refs.onRef).toBe(on);
  expect(off.getAttribute('data-scope')).toBe('swap');
  expect(off.getAttribute('data-part')).toBe('indicator');
  expect(off.getAttribute('data-slot')).toBe('swap-indicator');
  expect(off.getAttribute('data-type')).toBe('off');
  expect(off.hasAttribute('hidden')).toBe(false);
  expect(on.getAttribute('data-type')).toBe('on');
  expect(on.hasAttribute('hidden')).toBe(true);
});

test('reactively applies animation and state while wrapper-owned attributes win', async () => {
  const { component } = render(ReactiveHarness);

  const root = screen.getByTestId('swap');
  expect(root.getAttribute('data-animation')).toBe('scale');
  expect(root.getAttribute('data-swap')).toBe('off');

  component.update('flip', true);

  await expect.element(page.getByTestId('swap')).toHaveAttribute('data-animation', 'flip');
  await expect.element(page.getByTestId('swap')).toHaveAttribute('data-swap', 'on');

  component.update('bounce', true);

  await expect.element(page.getByTestId('swap')).toHaveAttribute('data-animation', 'bounce');
});

test('preserves Ark lazy mounting and exit unmounting', async () => {
  render(LazyHarness);

  await expect.element(page.getByText('Off', { exact: true })).toBeVisible();
  await expect.element(page.getByText('On', { exact: true })).toHaveCount(0);

  await page.getByRole('button', { name: 'Toggle' }).click();

  await expect.element(page.getByText('On', { exact: true })).toHaveAttribute('data-state', 'open');
  await expect.element(page.getByText('Off', { exact: true })).toHaveCount(0);
});

test('keeps provider, context, fallthrough listeners, refs, and asChild composition connected', async () => {
  let clicks = 0;
  const { component } = render(ProviderHarness, { props: { onclick: () => (clicks += 1) } });

  const root = screen.getByTestId('provider-root');

  expect(screen.getByText('Swap: true').isConnected).toBe(true);
  expect(root.getAttribute('data-animation')).toBe('fade');
  expect(root.getAttribute('data-slot')).toBe('swap-root-provider');
  expect(component.getRefs().providerRootRef).toBe(root);

  await page.getByTestId('provider-root').click();

  expect(clicks).toBe(1);
});

test('preserves asChild hosts and refs for roots and indicators', () => {
  const { component } = render(AsChildHarness);

  const root = screen.getByTestId('custom-root');
  const indicator = screen.getByTestId('custom-indicator');
  const refs = component.getRefs();

  expect(root.getAttribute('data-animation')).toBe('rotate');
  expect(refs.rootRef).toBe(root);
  expect(indicator.getAttribute('data-slot')).toBe('swap-indicator');
  expect(indicator.getAttribute('data-type')).toBe('on');
  expect(refs.indicatorRef).toBe(indicator);
});

test('keeps a reactive provider store reactive', async () => {
  render(ReactiveProviderHarness);

  await page.getByRole('button', { name: 'Toggle provider' }).click();

  await expect.element(page.getByText('On', { exact: true })).toHaveAttribute('data-state', 'open');
  await expect
    .element(page.getByText('Off', { exact: true }))
    .toHaveAttribute('data-state', 'closed');
});