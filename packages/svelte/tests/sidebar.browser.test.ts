import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import AnatomyHarness from './sidebar/AnatomyHarness.svelte';
import AsChildHarness from './sidebar/AsChildHarness.svelte';
import AttrsHarness from './sidebar/AttrsHarness.svelte';
import CollapsedHarness from './sidebar/CollapsedHarness.svelte';
import ControlledHarness from './sidebar/ControlledHarness.svelte';
import DefaultsHarness from './sidebar/DefaultsHarness.svelte';
import InputHarness from './sidebar/InputHarness.svelte';
import Layout from './sidebar/Layout.svelte';
import NativeHarness from './sidebar/NativeHarness.svelte';
import NavigationHarness from './sidebar/NavigationHarness.svelte';
import RightHarness from './sidebar/RightHarness.svelte';
import SelectHarness from './sidebar/SelectHarness.svelte';
import TooltipHarness from './sidebar/TooltipHarness.svelte';

test('keeps the default panel, inset, and resize ids aligned', async () => {
  render(DefaultsHarness);

  const panel = document.querySelector<HTMLElement>('[data-testid="panel"]')!;
  const inset = document.querySelector<HTMLElement>('[data-testid="inset"]')!;
  const resize = document.querySelector<HTMLElement>('[data-testid="resize"]')!;

  await expect.element(page.getByTestId('sidebar')).toHaveAttribute('data-side', 'left');
  expect(panel.id).toMatch(/:panel:navigation$/);
  await expect.element(page.getByTestId('constraints')).toContainText('3rem:3rem');
  expect(inset.id).toMatch(/:panel:content$/);
  expect(resize.id).toMatch(/:splitter:navigation:content$/);
  expect(resize?.getAttribute('aria-controls')).toBe(panel.id + ' ' + inset.id);
  expect(resize?.getAttribute('aria-label')).toBe('Resize sidebar');
  expect(resize?.getAttribute('type')).toBe('button');
  await expect
    .element(page.getByRole('button', { name: 'Toggle sidebar' }))
    .toHaveAttribute('aria-expanded', 'true');
});

test('reverses the resize pair for a right sidebar', async () => {
  render(RightHarness);
  const resize = document.querySelector<HTMLElement>('[data-testid="resize"]')!;

  expect(resize.id).toMatch(/:splitter:content:inspector$/);
  expect(resize?.getAttribute('data-side')).toBe('right');
});

test('lets consumer click handlers cancel the default toggle', async () => {
  render(Layout, {
    props: { trigger: { onclick: (event: MouseEvent) => event.preventDefault() } },
  });
  const trigger = page.getByRole('button', { name: 'Toggle sidebar' });

  await trigger.click();

  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
});

test.each([false, true])(
  'runs the trigger listener before toggling and honors cancellation (cancel=%s)',
  async (cancel) => {
    const calls: string[] = [];
    render(Layout, {
      props: {
        root: { defaultSize: [25, 75], style: 'width: 800px; height: 400px' },
        trigger: {
          onclick: (event: MouseEvent) => {
            calls.push('first');
            if (cancel) event.preventDefault();
          },
        },
      },
    });

    const host = page.getByRole('button', { name: 'Toggle sidebar' });
    await expect
      .element(page.getByRole('separator', { name: 'Resize sidebar' }))
      .toHaveAttribute('aria-valuenow', '25');
    await host.click();
    expect(calls).toEqual(['first']);
    await expect.element(host).toHaveAttribute('aria-expanded', cancel ? 'true' : 'false');
  },
);

test('preserves active link composition for primary and nested navigation', async () => {
  render(NavigationHarness);

  const overview = page.getByRole('link', { name: 'Overview' });
  const details = page.getByRole('link', { name: 'Details' });

  await expect.element(overview).toHaveAttribute('aria-current', 'page');
  await expect.element(overview).toHaveAttribute('data-slot', 'sidebar-navigation-button');
  await expect.element(overview).toHaveAttribute('data-active');
  await expect.element(overview).toHaveAttribute('data-size', 'sm');
  await expect.element(details).toHaveAttribute('aria-current', 'page');
  await expect.element(details).toHaveAttribute('data-slot', 'sidebar-navigation-sub-button');
  await expect.element(details).toHaveAttribute('data-active');
  await expect
    .element(page.getByTestId('primary-badge'))
    .toHaveAttribute('data-slot', 'sidebar-navigation-badge');
  await expect.element(page.getByTestId('nested-badge')).toContainText('3');
  await expect
    .element(page.getByText('A very long nested navigation item'))
    .toHaveAttribute('data-slot', 'sidebar-label');
  expect(
    document.querySelector('[data-testid="nested-icon"]')?.parentElement?.getAttribute('data-slot'),
  ).toBe('sidebar-navigation-sub-button');
});

test('preserves direct Select indicator composition in a navigation button', async () => {
  const { container } = render(SelectHarness);
  const indicator = document.querySelector<HTMLElement>('[data-testid="select-indicator"]')!;

  await page.getByRole('button', { name: 'Toggle sidebar' }).click();
  await expect
    .element(page.getByRole('button', { name: 'Toggle sidebar' }))
    .toHaveAttribute('aria-expanded', 'false');

  expect(indicator).toBe(container.querySelector('[data-scope="select"][data-part="indicator"]'));
});

test('marks collapsed navigation content as hidden by default', async () => {
  render(CollapsedHarness);

  await expect
    .element(page.getByTestId('expanded-projects'))
    .toHaveAttribute('data-slot', 'sidebar-expanded-content');
  await expect.element(page.getByTestId('expanded-projects')).not.toHaveAttribute('hidden');
  await expect
    .element(page.getByTestId('collapsed-projects'))
    .toHaveAttribute('data-slot', 'sidebar-collapsed-content');
  await expect.element(page.getByTestId('collapsed-projects')).toHaveAttribute('hidden');
});

test('composes the explicit group, input, separator, and footer anatomy', async () => {
  const { component } = render(AnatomyHarness);

  await expect
    .element(page.getByRole('list'))
    .toHaveAttribute('data-slot', 'sidebar-navigation-list');
  await expect
    .element(page.getByRole('button', { name: 'Overview' }))
    .toHaveAttribute('data-slot', 'sidebar-navigation-button');
  expect(component.getRefs().inputRef?.getAttribute('data-slot')).toBe('input-root');
  expect(component.getRefs().separatorRef?.getAttribute('data-slot')).toBe('separator-root');
});

test('preserves Svelte refs, fallthrough attrs, and asChild hosts', async () => {
  const { component } = render(AsChildHarness);

  const { rootRef, panelRef, resizeRef } = component.getRefs();
  const panel = document.querySelector<HTMLElement>('[data-testid="panel-host"]')!;
  const resize = document.querySelector<HTMLElement>('[data-slot="sidebar-resize-trigger"]')!;

  expect(rootRef?.getAttribute('data-slot')).toBe('sidebar-root');
  expect(rootRef?.getAttribute('data-probe')).toBe('root');
  expect(panel?.getAttribute('data-slot')).toBe('sidebar-panel');
  expect(resize.tagName).toBe('BUTTON');
  expect(resize?.getAttribute('data-slot')).toBe('sidebar-resize-trigger');
  expect(panelRef).toBe(panel);
  expect(resizeRef).toBe(resize);
});

test('forwards input sizing, bindings, separator variants, and snippets', async () => {
  const { component } = render(InputHarness);

  const input = page.getByRole('textbox', { name: 'Search' });
  await expect.element(input).toHaveAttribute('data-size', 'sm');
  await expect.element(input).toHaveAttribute('size', '24');
  await input.fill('updated');
  expect(component.getValue()).toBe('updated');
  const separator = document.querySelector<HTMLElement>('[data-testid="sidebar-separator"]')!;
  expect(separator.tagName).toBe('HR');
  expect(separator?.getAttribute('data-orientation')).toBe('vertical');
  expect(separator?.getAttribute('data-size')).toBe('lg');
  expect(separator?.getAttribute('data-variant')).toBe('dotted');
});

test('updates consumer attrs on every public composition path', async () => {
  const { component } = render(AttrsHarness);
  component.update();

  await expect
    .element(page.getByRole('button', { name: 'Navigation' }))
    .toHaveAttribute('aria-current', 'location');
  await expect
    .element(page.getByRole('link', { name: 'Nested' }))
    .toHaveAttribute('aria-current', 'location');
  await expect.element(page.getByRole('separator', { name: 'Updated label' })).toBeAttached();
  await expect.element(page.getByRole('button', { name: 'Updated label' })).toBeAttached();
  await expect.element(page.getByTestId('root')).toHaveAttribute('data-probe', 'updated');
});

test('controls CSS-length sizes, emits resize details once, and enables collapsed tooltips', async () => {
  const resized: (number | string)[][] = [];
  const collapsed: string[] = [];
  const { component, container } = render(ControlledHarness, { props: { resized, collapsed } });
  expect(container.querySelector('[data-slot="tooltip-content"]')).toBeNull();
  const toggle = page.getByRole('button', { name: 'Toggle sidebar' });
  await expect
    .element(page.getByRole('separator', { name: 'Resize sidebar' }))
    .toHaveAttribute('aria-valuenow', '32');
  await toggle.click();
  await expect.element(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect.element(page.getByTestId('panel')).toHaveAttribute('data-state', 'collapsed');
  await expect.element(page.getByTestId('expanded')).toHaveAttribute('hidden');
  await expect.element(page.getByTestId('collapsed')).not.toHaveAttribute('hidden');
  expect(component.getSize()).toEqual([6, 94]);
  expect(resized).toEqual([[6, 94]]);
  expect(collapsed).toEqual(['sidebar']);

  await page.getByRole('button', { name: 'Overview' }).hover();
  await expect.element(page.getByRole('tooltip')).toContainText('Overview');
  await expect.element(page.getByRole('tooltip')).toHaveAttribute('data-slot', 'tooltip-content');
  await expect
    .element(
      page.locator('[data-slot="tooltip-positioner"]').filter({ has: page.getByRole('tooltip') }),
    )
    .toHaveAttribute('data-slot', 'tooltip-positioner');
  await page.getByRole('button', { name: 'Toggle sidebar' }).hover();
  await toggle.click();
  await expect.element(toggle).toHaveAttribute('aria-expanded', 'true');
  await toggle.click();
  expect(collapsed).toEqual(['sidebar', 'sidebar']);
  await toggle.click();
  await expect.element(toggle).toHaveAttribute('aria-expanded', 'true');
});

test.each([false, true])(
  'preserves sidebar tooltip snippets and portal scope (portalled=%s)',
  async (portalled) => {
    const { component } = render(TooltipHarness, { props: { portalled } });

    await expect
      .element(page.getByRole('separator', { name: 'Resize sidebar' }))
      .toHaveAttribute('aria-valuenow', '32');
    await page.getByRole('button', { name: 'Toggle sidebar' }).click();
    await page.getByRole('button', { name: 'Overview' }).hover();
    const tooltip = page.getByRole('tooltip');
    await expect.element(tooltip).toHaveText('Initial overview');
    expect(component.getPortal()?.querySelector('[role="tooltip"]') !== null).toBe(portalled);
    component.setContent('Updated overview');
    await expect.element(tooltip).toHaveText('Updated overview');
  },
);

test('emits collapse on the first controlled transition in direct Ark', async () => {
  const events: string[] = [];
  const { component } = render(NativeHarness, { props: { events } });

  await expect.element(page.getByText('32,68')).toBeAttached();
  await page.getByRole('button', { name: 'Native collapse' }).click();
  expect(component.getSize()).toEqual([6, 94]);
  expect(events).toEqual(['sidebar']);
});