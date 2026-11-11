import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import BasicHoverCard from './hover-card/BasicHoverCard.svelte';
import ControlledHoverCard from './hover-card/ControlledHoverCard.svelte';
import PortalTargetHoverCard from './hover-card/PortalTargetHoverCard.svelte';
import ProviderHoverCard from './hover-card/ProviderHoverCard.svelte';
import RefsHoverCard from './hover-card/RefsHoverCard.svelte';
import ScrollHoverCard from './hover-card/ScrollHoverCard.svelte';
import TriggerValueHoverCard from './hover-card/TriggerValueHoverCard.svelte';

test('opens from a focused trigger, reports open changes, and preserves Ark state', async () => {
  const events: boolean[] = [];
  render(BasicHoverCard, {
    props: {
      openDelay: 0,
      portalled: false,
      onOpenChange: (details) => events.push(details.open),
    },
  });
  await page.getByRole('button', { name: 'Profile' }).focus();
  await expect.element(page.getByText('open', { exact: true })).toBeVisible();
  await expect.element(page.getByTestId('content')).toHaveAttribute('data-state', 'open');
  expect(events).toEqual([true]);
});

test('keeps disabled and default lazy mounting behavior', async () => {
  const disabled = render(BasicHoverCard, {
    props: { disabled: true, openDelay: 0, portalled: false },
  });
  await page.getByRole('button', { name: 'Profile' }).focus();
  await expect.element(page.getByTestId('content')).toHaveCount(0);
  disabled.unmount();

  render(BasicHoverCard, { props: { portalled: false } });
  await expect.element(page.getByTestId('content')).toHaveCount(0);
});

test('portals the positioner by default and supports a custom target or inline mode', async () => {
  const target = document.createElement('div');
  document.body.append(target);
  const portalled = render(PortalTargetHoverCard, { props: { target } });
  await expect.element(page.getByTestId('content')).toBeVisible();
  expect(portalled.container.querySelector('[data-testid="content"]')).toBeNull();
  expect(target.contains(document.querySelector('[data-testid="content"]'))).toBe(true);
  portalled.unmount();
  target.remove();

  const inline = render(BasicHoverCard, { props: { open: true, portalled: false } });
  await expect.element(page.getByTestId('content')).toBeVisible();
  const content = document.querySelector('[data-testid="content"]')!;
  expect(inline.container.contains(content)).toBe(true);
  await expect.element(page.locator('[data-slot="hover-card-arrow-tip"]')).toBeAttached();
  await expect.element(page.locator('[data-slot="hover-card-body"]')).toBeAttached();
  expect(document.querySelector('[data-slot="hover-card-arrow"]')?.parentElement).toBe(content);
});

test('keeps RootProvider state and Context snippet composition connected', async () => {
  render(ProviderHoverCard);
  await page.getByRole('button', { name: 'Profile' }).focus();
  await expect.element(page.getByText('Slot: open')).toBeVisible();
  await expect.element(page.getByText('Hook: open')).toBeVisible();
});

test('reports the active value when moving between triggers', async () => {
  render(TriggerValueHoverCard);
  await page.getByRole('button', { name: 'Alex' }).focus();
  await expect.element(page.getByText('alex', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Sarah' }).hover();
  await expect.element(page.getByText('sarah', { exact: true })).toBeVisible();
  await expect.element(page.getByTestId('content')).toBeVisible();
});

test('forwards refs, attrs, classes, and semantic asChild hosts', async () => {
  const { component } = render(RefsHoverCard);
  const refs = component.getRefs();
  const trigger = document.querySelector('button[data-slot="hover-card-trigger"]')!;
  const composedTrigger = page.getByRole('link', { name: 'Composed profile' });
  const content = document.querySelector('[data-testid="content"]')!;
  expect(refs.trigger).toBe(trigger);
  expect(refs.positioner?.getAttribute('data-slot')).toBe('hover-card-positioner');
  expect(refs.content).toBe(content);
  expect(refs.arrow?.getAttribute('data-slot')).toBe('hover-card-arrow');
  expect(refs.arrowTip?.getAttribute('data-slot')).toBe('hover-card-arrow-tip');
  expect(refs.body?.getAttribute('data-slot')).toBe('hover-card-body');
  await expect.element(composedTrigger).toHaveAttribute('data-slot', 'hover-card-trigger');
  expect(Array.from(trigger.classList)).toContain('trigger-class');
  expect(Array.from(refs.positioner!.classList)).toContain('positioner-class');
  expect(Array.from(content.classList)).toContain('content-class');
  expect(Array.from(refs.arrow!.classList)).toContain('arrow-class');
  expect(Array.from(refs.arrowTip!.classList)).toContain('tip-class');
  expect(Array.from(refs.body!.classList)).toContain('body-class');
});

test('unmounts content after it closes by default', async () => {
  render(ControlledHoverCard);
  await expect.element(page.getByTestId('content')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect.element(page.getByTestId('content')).toHaveCount(0);
});

test('scrolls long body content inside the content height and uses shared popup motion', async () => {
  render(ScrollHoverCard);
  await expect.element(page.getByTestId('content')).toBeVisible();
  const content = document.querySelector<HTMLElement>('[data-slot="hover-card-content"]')!;
  const body = document.querySelector<HTMLElement>('[data-slot="hover-card-body"]')!;
  expect(content.offsetHeight).toBeLessThanOrEqual(120);
  expect(body.offsetHeight).toBeLessThan(content.offsetHeight);
  expect(body.scrollHeight).toBeGreaterThan(body.clientHeight);
  expect(getComputedStyle(content).animationName).toBe('moduix-popup-in');
});