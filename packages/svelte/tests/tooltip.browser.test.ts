import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import type {
  TooltipOpenChangeDetails,
  TooltipTriggerValueChangeDetails,
} from '@/components/tooltip';
import AsChildTooltip from './tooltip/AsChildTooltip.svelte';
import BasicTooltip from './tooltip/BasicTooltip.svelte';
import BodyTooltip from './tooltip/BodyTooltip.svelte';
import DisabledTooltip from './tooltip/DisabledTooltip.svelte';
import LazyTooltip from './tooltip/LazyTooltip.svelte';
import LongTooltip from './tooltip/LongTooltip.svelte';
import PortalTargetTooltip from './tooltip/PortalTargetTooltip.svelte';
import ProviderTooltip from './tooltip/ProviderTooltip.svelte';
import RefsTooltip from './tooltip/RefsTooltip.svelte';
import TriggerValueTooltip from './tooltip/TriggerValueTooltip.svelte';

test('preserves Ark open-change details and keeps trigger focus after Escape', async () => {
  const details: TooltipOpenChangeDetails[] = [];
  render(BasicTooltip, { props: { details } });
  const trigger = page.getByRole('button', { name: 'Save' });
  await trigger.focus();
  await trigger.hover();
  await expect.element(page.getByRole('tooltip')).toHaveText('Save changes');
  await expect.element(page.getByText('Bound open: true')).toBeAttached();
  expect(details).toEqual([{ open: true }]);
  await trigger.press('Escape');
  await expect.element(page.getByRole('tooltip')).toHaveCount(0);
  await expect.element(page.getByText('Bound open: false')).toBeAttached();
  await expect.element(trigger).toBeFocused();
  expect(details).toEqual([{ open: true }, { open: false }]);
});

test('keeps a disabled control keyboard discoverable and reacts to native tabindex changes', async () => {
  const { rerender } = render(DisabledTooltip);
  const trigger = page.getByLabel('Create project is unavailable');
  await expect.element(trigger).toHaveAttribute('data-slot', 'tooltip-disabled-trigger');
  await expect.element(trigger).toHaveAttribute('tabindex', '0');
  await expect.element(page.getByRole('button', { name: 'Create project' })).toBeDisabled();
  await page.getByRole('button', { name: 'Before tooltip' }).press('Tab');
  await expect.element(trigger).toBeFocused();
  await expect
    .element(page.getByRole('tooltip'))
    .toHaveText('Projects are unavailable while offline.');
  await rerender({ tabindex: -1 });
  await expect.element(trigger).toHaveAttribute('tabindex', '-1');
  await rerender({ tabindex: 2 });
  await expect.element(trigger).toHaveAttribute('tabindex', '2');
});

test('preserves Body content/ref, default portal, inline rendering and fallback arrow', async () => {
  const portalled = render(BodyTooltip);
  await expect.element(page.getByRole('tooltip')).toHaveText('Save changes');
  const portalledContent = document.querySelector('[role="tooltip"]');
  expect(portalled.container.contains(portalledContent)).toBe(false);
  expect(portalled.component.getBodyRef()).toBe(portalledContent);
  expect(portalled.component.getBodyRef()?.getAttribute('data-slot')).toBe('tooltip-content');
  portalled.unmount();

  const inline = render(BodyTooltip, { props: { portalled: false } });
  await expect.element(page.getByRole('tooltip')).toHaveText('Save changes');
  expect(inline.container.contains(document.querySelector('[role="tooltip"]'))).toBe(true);
  await expect.element(page.locator('[data-slot="tooltip-arrow-tip"]')).toHaveCount(1);
});

test('keeps provider state reactive through the context hook and snippet', async () => {
  render(ProviderTooltip);
  await expect.element(page.getByText('closed', { exact: true })).toBeVisible();
  await expect.element(page.getByText('Open slot: false')).toBeVisible();
  await page.getByRole('button', { name: 'Before tooltip' }).press('Tab');
  await expect.element(page.getByRole('button', { name: 'Save' })).toBeFocused();
  await expect.element(page.getByText('open', { exact: true })).toBeVisible();
  await expect.element(page.getByText('Open slot: true')).toBeVisible();
  await expect.element(page.getByRole('tooltip')).toHaveText('Save changes');
});

test('forwards refs on native parts and keeps asChild composition native', () => {
  const { component } = render(RefsTooltip);
  const refs = component.getRefs();
  expect(refs.trigger?.getAttribute('data-slot')).toBe('tooltip-trigger');
  expect(refs.disabledTrigger?.getAttribute('data-slot')).toBe('tooltip-disabled-trigger');
  expect(refs.positioner?.getAttribute('data-slot')).toBe('tooltip-positioner');
  expect(refs.content?.getAttribute('data-slot')).toBe('tooltip-content');
  expect(refs.arrow?.getAttribute('data-slot')).toBe('tooltip-arrow');
  expect(refs.arrowTip?.getAttribute('data-slot')).toBe('tooltip-arrow-tip');
  expect(document.querySelector('a[href="#save"]')).not.toBeNull();
});

test('forwards attrs, styles, listeners and refs to every asChild host', async () => {
  const calls: string[] = [];
  const { component } = render(AsChildTooltip, { props: { calls } });
  const refs = component.getRefs();
  const trigger = document.querySelector('[data-testid="custom-trigger"]')!;
  const positioner = document.querySelector('[data-testid="custom-positioner"]')!;
  const content = document.querySelector('[data-testid="custom-content"]')!;
  const arrow = document.querySelector('[data-testid="custom-arrow"]')!;
  const tip = document.querySelector('[data-testid="custom-tip"]')!;
  const body = document.querySelector('[data-testid="custom-body"]')!;
  expect(trigger.tagName).toBe('A');
  expect([...trigger.classList]).toContain('consumer-trigger');
  expect(positioner.tagName).toBe('SECTION');
  expect(positioner.getAttribute('data-slot')).toBe('tooltip-positioner');
  expect(content.tagName).toBe('ARTICLE');
  expect([...content.classList]).toContain('consumer-content');
  await expect.element(page.getByTestId('custom-content')).toHaveCSS('color', 'rgb(255, 0, 0)');
  expect(content.getAttribute('role')).toBe('tooltip');
  expect(arrow.tagName).toBe('ASIDE');
  expect(arrow.getAttribute('data-slot')).toBe('tooltip-arrow');
  expect(tip.tagName).toBe('SPAN');
  expect([...tip.classList]).toContain('consumer-tip');
  expect(tip.getAttribute('data-slot')).toBe('tooltip-arrow-tip');
  expect(refs.arrowTipRef).toBe(tip);
  expect(body.tagName).toBe('P');
  expect(refs.bodyRef).toBe(body);
  expect(body.parentElement?.getAttribute('data-slot')).toBe('tooltip-positioner');
  await page.getByTestId('custom-trigger').click();
  expect(calls).toEqual(['trigger']);
});

test('preserves lazy mounting, retained content and explicit eager presence', async () => {
  render(LazyTooltip);
  const content = page.getByTestId('content');
  await expect.element(content).toHaveCount(0);
  await expect.element(page.getByTestId('eager')).not.toBeVisible();
  await page.getByRole('button', { name: 'Open hint' }).click();
  await expect.element(content).toBeVisible();
  const firstContent = document.querySelector('[data-testid="content"]');
  await page.getByRole('button', { name: 'Close hint' }).click();
  await expect.element(content).toHaveCount(0);
  await page.getByRole('button', { name: 'Retain content' }).click();
  await page.getByRole('button', { name: 'Open hint' }).click();
  await expect.element(content).toBeVisible();
  const retainedContent = document.querySelector('[data-testid="content"]');
  expect(retainedContent).not.toBe(firstContent);
  await page.getByRole('button', { name: 'Close hint' }).click();
  await expect.element(content).not.toBeVisible();
  expect(document.querySelector('[data-testid="content"]')).toBe(retainedContent);
});

test('keeps trigger-value bindings, complete details and accessible descriptions connected', async () => {
  // Park the pointer before mounting triggers so only deliberate hovers emit callbacks.
  const park = document.createElement('button');
  park.textContent = 'Before tooltip';
  document.body.append(park);
  await page.getByRole('button', { name: 'Before tooltip' }).hover();
  park.remove();
  const details: TooltipTriggerValueChangeDetails[] = [];
  render(TriggerValueTooltip, { props: { details } });
  const save = document.querySelector('[data-value="save"]');
  const share = document.querySelector('[data-value="share"]');
  await page.getByRole('button', { name: 'Save' }).hover();
  await expect.element(page.getByRole('tooltip')).toBeVisible();
  const content = document.querySelector('[role="tooltip"]')!;
  await expect
    .element(page.getByRole('button', { name: 'Save' }))
    .toHaveAttribute('aria-describedby', content.id);
  expect(details).toEqual([{ value: 'save', triggerElement: save }]);
  await page.getByRole('button', { name: 'Share' }).hover();
  await expect.element(page.getByText('share', { exact: true })).toBeVisible();
  expect(document.querySelector('[role="tooltip"]')).toBe(content);
  expect(details).toEqual([
    { value: 'save', triggerElement: save },
    { value: 'share', triggerElement: share },
  ]);
  await expect
    .element(page.getByRole('button', { name: 'Share' }))
    .toHaveAttribute('aria-describedby', content.id);
});

test('renders into a custom portal target through RootProvider', async () => {
  const target = document.createElement('div');
  document.body.append(target);
  const { container, unmount } = render(PortalTargetTooltip, { props: { target } });
  try {
    await expect.element(page.getByRole('tooltip')).toHaveText('Save changes');
    const content = document.querySelector('[role="tooltip"]');
    expect(target.contains(content)).toBe(true);
    expect(container.contains(content)).toBe(false);
  } finally {
    unmount();
    target.remove();
  }
});

test('lets long content grow instead of spilling past the surface', async () => {
  render(LongTooltip);
  await expect.element(page.getByRole('tooltip')).toBeVisible();
  const content = document.querySelector<HTMLElement>('[data-slot="tooltip-content"]')!;
  expect(content.scrollHeight).toBeLessThanOrEqual(content.clientHeight + 1);
});