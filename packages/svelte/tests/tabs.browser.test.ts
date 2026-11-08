import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildHarness from './tabs/AsChildHarness.svelte';
import BindHarness from './tabs/BindHarness.svelte';
import FittedHarness from './tabs/FittedHarness.svelte';
import ProviderAsChildHarness from './tabs/ProviderAsChildHarness.svelte';
import ProviderHarness from './tabs/ProviderHarness.svelte';
import RefsHarness from './tabs/RefsHarness.svelte';
import TestTabs from './tabs/TestTabs.svelte';

test('preserves Ark semantics, Svelte refs, anatomy, attributes, and moduix hooks', async () => {
  const { component } = render(RefsHarness);

  const root = screen.getByRole('tablist').parentElement;
  const list = screen.getByRole('tablist');
  const trigger = screen.getByRole('tab', { name: 'Overview' });
  const indicator = list.querySelector('[data-slot="tabs-indicator"]');
  const content = screen.getByText('Overview content');
  const refs = component.getRefs();

  expect(refs.rootRef).toBe(root);
  expect(root!.getAttribute('data-slot')).toBe('tabs-root');
  expect(root!.getAttribute('data-scope')).toBe('tabs');
  expect(root!.getAttribute('data-probe')).toBe('root');
  expect(refs.listRef).toBe(list);
  await expect.element(page.getByRole('tablist')).toHaveAttribute('data-slot', 'tabs-list');
  expect(refs.triggerRef).toBe(trigger);
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('data-slot', 'tabs-trigger');
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  expect(refs.indicatorRef).toBe(indicator);
  expect(indicator!.getAttribute('data-slot')).toBe('tabs-indicator');
  expect(refs.contentRef).toBe(content);
  await expect
    .element(page.getByText('Overview content'))
    .toHaveAttribute('data-slot', 'tabs-content');
});

test('preserves keyboard navigation, disabled triggers, and Ark callback details', async () => {
  const changes: string[] = [];
  render(TestTabs, {
    props: {
      disabled: true,
      onValueChange: (details: { value?: string }) => changes.push(details.value ?? ''),
    },
  });

  await expect.element(page.getByRole('tab', { name: 'Projects', exact: true })).toBeDisabled();
  await page.getByRole('tab', { name: 'Overview', exact: true }).click();
  await page.getByRole('tab', { name: 'Overview', exact: true }).press('ArrowRight');
  await expect.element(page.getByRole('tab', { name: 'Account', exact: true })).toBeFocused();
  await expect.poll(() => changes).toEqual(['account']);
});

test('uses vertical keyboard navigation and mounts inactive content lazily', async () => {
  render(TestTabs, { props: { lazyMount: true, orientation: 'vertical' } });

  const overview = screen.getByRole('tab', { name: 'Overview' });

  await expect.element(page.getByText('Projects content')).toHaveCount(0);
  expect(overview.closest('[data-slot="tabs-root"]')!.getAttribute('data-variant')).toBe('default');
  await page.getByRole('tab', { name: 'Overview', exact: true }).click();
  await page.getByRole('tab', { name: 'Overview', exact: true }).press('ArrowDown');
  await expect.element(page.getByRole('tab', { name: 'Projects', exact: true })).toBeFocused();
  await expect.element(page.getByText('Projects content')).toBeVisible();
});

test('keeps manual activation focused until Enter selects the tab', async () => {
  const changes: string[] = [];
  render(TestTabs, {
    props: {
      activationMode: 'manual',
      onValueChange: (details: { value?: string }) => changes.push(details.value ?? ''),
    },
  });

  const overviewLocator = page.getByRole('tab', { name: 'Overview', exact: true });
  await overviewLocator.click();
  await overviewLocator.press('ArrowRight');
  const projectsLocator = page.getByRole('tab', { name: 'Projects', exact: true });
  await expect.element(projectsLocator).toBeFocused();
  await expect.element(overviewLocator).toHaveAttribute('aria-selected', 'true');
  expect(changes).toEqual([]);

  await projectsLocator.press('Enter');

  await expect.element(projectsLocator).toHaveAttribute('aria-selected', 'true');
  expect(changes).toEqual(['projects']);
});

test('supports bind:value and notifies each listener once', async () => {
  const details: string[] = [];
  render(BindHarness, { props: { details } });

  await page.getByRole('tab', { name: 'Projects', exact: true }).click();

  await expect.element(page.getByText('Selected: projects')).toBeAttached();
  expect(details).toEqual(['projects']);
});

test('preserves semantic hosts and refs with asChild', async () => {
  const { component } = render(AsChildHarness);

  const root = screen.getByRole('region', { name: 'Account sections' });
  const trigger = screen.getByRole('tab', { name: 'Overview' });

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Account sections', exact: true }))
    .toHaveAttribute('data-slot', 'tabs-root');
  expect(trigger.tagName).toBe('A');
  expect(component.getRefs().triggerRef).toBe(trigger);
});

test('keeps provider and context composition connected', async () => {
  render(ProviderHarness);

  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  await expect.element(page.getByTestId('tabs-context-hook')).toContainText('overview');
  await expect.element(page.getByTestId('tabs-context-slot')).toContainText('overview');

  await page.getByRole('button', { name: 'Select projects', exact: true }).click();

  await expect
    .element(page.getByRole('tab', { name: 'Projects', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  await expect.element(page.getByTestId('tabs-context-hook')).toContainText('projects');
  await expect.element(page.getByTestId('tabs-context-slot')).toContainText('projects');
});

test('keeps omitted loopFocus enabled and removes lazy panels on exit', async () => {
  render(TestTabs, { props: { lazyMount: true } });

  await page.getByRole('tab', { name: 'Account', exact: true }).click();
  await expect.element(page.getByText('Account content')).toBeVisible();
  await expect.element(page.getByText('Overview content')).toHaveCount(0);

  await page.getByRole('tab', { name: 'Account', exact: true }).press('ArrowRight');

  await expect.element(page.getByRole('tab', { name: 'Overview', exact: true })).toBeFocused();
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  await expect.element(page.getByText('Account content')).toHaveCount(0);
  await expect.element(page.getByText('Overview content')).toBeVisible();
});

test('updates provider orientation and preserves every asChild host ref', async () => {
  const { component } = render(ProviderAsChildHarness);

  const root = screen.getByRole('region', { name: 'Project sections' });
  const list = screen.getByRole('tablist');
  const indicator = root.querySelector('[data-slot="tabs-indicator"]');
  const content = screen.getByRole('tabpanel');
  const refs = component.getRefs();

  expect(refs.rootRef).toBe(root);
  expect(refs.listRef).toBe(list);
  expect(list.tagName).toBe('NAV');
  expect(refs.indicatorRef).toBe(indicator);
  expect(indicator?.tagName).toBe('SPAN');
  expect(refs.contentRef).toBe(content);
  expect(content.tagName).toBe('ARTICLE');
  await expect.element(page.getByRole('tablist')).toHaveAttribute('aria-label', 'Project views');
  await expect
    .element(page.getByRole('tabpanel'))
    .toHaveAttribute('aria-labelledby', screen.getByRole('tab').id);
  const rootLocator = page.getByRole('region', { name: 'Project sections', exact: true });
  await expect.element(rootLocator).toHaveAttribute('data-variant', 'line');

  component.setOrientation('vertical');

  await expect.element(rootLocator).toHaveAttribute('data-orientation', 'vertical');
  await expect.element(page.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');

  component.setOrientation('horizontal');

  await expect.element(rootLocator).toHaveAttribute('data-orientation', 'horizontal');
});

test('stretches horizontal triggers across the root when fitted', () => {
  const { container } = render(FittedHarness);

  const [horizontal, vertical] = container.querySelectorAll<HTMLElement>('[data-slot="tabs-root"]');
  const list = horizontal!.querySelector<HTMLElement>('[data-slot="tabs-list"]')!;
  const widths = [...list.querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"]')].map(
    (trigger) => trigger.offsetWidth,
  );

  expect(horizontal!.hasAttribute('data-fitted')).toBe(true);
  expect(list.offsetWidth).toBe(480);
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThanOrEqual(1);
  for (const trigger of vertical!.querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"]')) {
    expect(trigger.offsetHeight).toBe(26);
  }
});