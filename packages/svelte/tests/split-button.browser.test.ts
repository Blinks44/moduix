import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildHarness from './split-button/AsChildHarness.svelte';
import BasicHarness from './split-button/BasicHarness.svelte';
import FormHarness from './split-button/FormHarness.svelte';
import OpenBindingHarness from './split-button/OpenBindingHarness.svelte';
import PositionerAsChildHarness from './split-button/PositionerAsChildHarness.svelte';
import RefsHarness from './split-button/RefsHarness.svelte';
import SlotsHarness from './split-button/SlotsHarness.svelte';

test('preserves a native positioner asChild host and exposes it on its ref', async () => {
  const { component } = render(PositionerAsChildHarness);

  await expect.element(page.getByRole('menu')).toBeVisible();
  const menu = screen.getByRole('menu');
  const positionerHost = menu.parentElement;
  expect(positionerHost?.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('menu').locator('..'))
    .toHaveAttribute('data-slot', 'split-button-positioner');
  await expect
    .element(page.getByRole('menu').locator('..'))
    .toHaveAttribute('data-probe', 'positioner');
  expect(component.getRefs().positionerRef).toBe(positionerHost);
  await expect.element(page.getByRole('menu')).toBeFocused();
  await page.getByRole('menu').press('Escape');
});

test('preserves native form submission on the action while keeping the trigger a button', async () => {
  const submit = rs.fn();
  render(FormHarness, { props: { submit } });

  const action = page.getByRole('button', { name: 'Save' });
  await expect.element(action).toHaveAttribute('type', 'submit');
  await expect.element(action).toHaveAttribute('name', 'intent');
  await expect.element(action).toHaveAttribute('value', 'save');
  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveAttribute('type', 'button');
  await page.getByRole('button', { name: 'More actions' }).click();
  expect(submit).not.toHaveBeenCalled();
  await expect.element(page.getByRole('menu')).toBeFocused();
  await page.getByRole('menu').press('Escape');
  await action.click();
  expect(submit).toHaveBeenCalledTimes(1);
});

test('forwards persistent menu options and emits item selection once without closing', async () => {
  const select = rs.fn();
  render(BasicHarness, {
    props: {
      root: {
        portalled: false,
        closeOnSelect: false,
        lazyMount: false,
        unmountOnExit: false,
        onSelect: select,
      },
    },
  });
  const content = document.querySelector('[data-slot="split-button-content"]');
  await expect.element(page.locator('[data-slot="split-button-content"]')).toBeAttached();
  const menu = page.getByRole('menu');
  await expect.element(menu).toHaveCount(0);

  const trigger = page.getByRole('button', { name: 'More actions' });
  await trigger.click();

  await page.getByRole('menuitem', { name: 'Save as Draft' }).click();
  await expect.poll(() => select).toHaveBeenCalledTimes(1);
  expect(select).toHaveBeenCalledWith({
    value: 'save-draft',
    modifiers: { altKey: false, ctrlKey: false, metaKey: false, shiftKey: false },
  });
  expect(screen.getByRole('menu')).toBe(content);
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect.element(menu).toBeFocused();
  await menu.press('Escape');
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect.element(menu).toHaveCount(0);
  expect(document.querySelector('[data-slot="split-button-content"]')).toBe(content);
});

test('keeps the default trigger accessible and restores focus after Escape', async () => {
  const openChanges: boolean[] = [];
  render(BasicHarness, {
    props: {
      actionLabel: 'Save Changes',
      root: {
        'aria-label': 'Save actions',
        portalled: false,
        onOpenChange: (details: { open: boolean }) => openChanges.push(details.open),
      },
    },
  });
  await expect
    .element(page.getByRole('group', { name: 'Save actions' }))
    .toHaveAttribute('data-slot', 'split-button-root');

  const trigger = page.getByRole('button', { name: 'More actions' });
  await expect.element(trigger).toHaveAttribute('data-slot', 'split-button-trigger');
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');

  await trigger.click();
  const menu = page.getByRole('menu');
  await expect.element(menu).toBeVisible();

  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(openChanges).toEqual([true]);
  await expect.element(menu).toBeFocused();
  await menu.press('Escape');
  await expect.element(menu).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(openChanges).toEqual([true, false]);
});

test('keeps the menu trigger available when only the primary action is disabled', async () => {
  render(BasicHarness, {
    props: {
      actionLabel: 'Save Changes',
      action: { disabled: true },
      root: { 'aria-label': 'Save actions', portalled: false },
    },
  });
  await expect.element(page.getByRole('button', { name: 'Save Changes' })).toBeDisabled();

  await expect.element(page.getByRole('button', { name: 'More actions' })).not.toBeDisabled();
  await page.getByRole('button', { name: 'More actions' }).click();
  await expect.element(page.getByRole('menuitem', { name: 'Save as Draft' })).toBeVisible();
  await expect.element(page.getByRole('menu')).toBeFocused();
  await page.getByRole('menu').press('Escape');
});

test('keeps the menu closed when its trigger is disabled', async () => {
  render(BasicHarness, {
    props: {
      actionLabel: 'Save Changes',
      root: { 'aria-label': 'Save actions' },
      trigger: { disabled: true },
    },
  });

  await expect.element(page.getByRole('button', { name: 'More actions' })).toBeDisabled();

  await expect.element(page.getByRole('menu')).toHaveCount(0);
});

test('preserves native refs and reactive root and part size and variant defaults', async () => {
  const { component } = render(RefsHarness);

  const action = screen.getByRole('button', { name: 'Delete project' });
  const trigger = screen.getByRole('button', { name: 'More project actions' });
  const { rootRef, actionRef, triggerRef } = component.getRefs();
  expect(actionRef).toBe(action);
  expect(triggerRef).toBe(trigger);
  const root = screen.getByRole('group', { name: 'Project actions' });
  expect(rootRef).toBe(root);
  expect(root.getAttribute('data-scope')).toBe('split-button');
  for (const part of [action, trigger]) {
    expect(part?.getAttribute('data-size')).toBe('lg');
    expect(part?.getAttribute('data-variant')).toBe('destructive');
  }
  component.setSize('sm');
  for (const part of [action, trigger]) {
    await expect.poll(() => part?.getAttribute('data-size')).toBe('sm');
  }
});

test('keeps the primary action independent and exposes stable popup slots and selection details', async () => {
  const actions: string[] = [];
  render(SlotsHarness, { props: { actions } });
  await expect
    .element(page.getByRole('group', { name: 'Document actions' }))
    .toHaveAttribute('aria-labelledby', 'document-actions-label');

  await expect
    .element(page.getByRole('button', { name: 'Save' }))
    .toHaveAttribute('data-slot', 'split-button-action');
  await page.getByRole('button', { name: 'Save' }).click();
  expect(actions).toEqual(['save']);
  const menu = page.getByRole('menu');
  await expect.element(menu).toHaveCount(0);

  await expect
    .element(page.getByRole('button', { name: 'Options' }))
    .not.toHaveAttribute('aria-label');
  await page.getByRole('button', { name: 'Options' }).click();
  await expect.element(menu).toBeVisible();

  await expect.element(menu).toHaveAttribute('data-slot', 'split-button-content');
  await expect.element(menu.locator('..')).toHaveAttribute('data-slot', 'split-button-positioner');
  await expect
    .element(menu.locator(':scope > :first-child'))
    .toHaveAttribute('data-slot', 'menu-viewport');

  await page.getByRole('menuitem', { name: 'Duplicate' }).click();
  await expect.poll(() => actions).toEqual(['save', 'duplicate']);
  await expect.element(menu).toHaveCount(0);
});

test('preserves bind:open without local state and honours part overrides', async () => {
  const { component } = render(OpenBindingHarness);
  await expect
    .element(page.getByRole('button', { name: 'Save' }))
    .toHaveAttribute('data-size', 'xs');
  await expect
    .element(page.getByRole('button', { name: 'Save' }))
    .toHaveAttribute('data-variant', 'outline');
  await page.getByRole('button', { name: 'More actions' }).click();
  await expect.poll(() => component.getOpen()).toBe(true);
  await expect.element(page.getByRole('menu')).toBeFocused();
  await page.getByRole('menu').press('Escape');
  await expect.poll(() => component.getOpen()).toBe(false);
});

test('preserves action and content asChild hosts, attrs, listeners and native refs', async () => {
  const click = rs.fn();
  const { component } = render(AsChildHarness, { props: { click } });
  const action = screen.getByRole('link', { name: 'Docs' });
  expect(component.getRefs().actionRef).toBe(action);
  await expect
    .element(page.getByRole('link', { name: 'Docs' }))
    .toHaveAttribute('data-slot', 'split-button-action');
  await expect
    .element(page.getByRole('link', { name: 'Docs' }))
    .toHaveAttribute('data-probe', 'action');
  const menu = screen.getByRole('menu');
  expect(menu.tagName).toBe('SECTION');
  expect(component.getRefs().contentRef).toBe(menu);
  await expect.element(page.getByRole('menu')).toHaveAttribute('data-probe', 'content');
  expect(menu.querySelector('[data-slot="menu-viewport"]')).toBeNull();
  await page.getByRole('link', { name: 'Docs' }).click();
  expect(click).toHaveBeenCalledTimes(1);
  await expect.element(page.getByRole('menu')).toHaveCount(0);
});

test('portals by default and accepts a custom portal target', async () => {
  const target = document.createElement('div');
  document.body.append(target);
  const { container, unmount } = render(BasicHarness, {
    props: { root: { defaultOpen: true, portalRef: target } },
  });
  expect(container.querySelector('[role="menu"]')).toBeNull();
  await expect.poll(() => target.querySelector('[role="menu"]')?.isConnected ?? false).toBe(true);
  await expect.element(page.getByRole('menu')).toBeFocused();
  await page.getByRole('menu').press('Escape');
  unmount();
  target.remove();
});

test('forwards consumer classes to every styled part', () => {
  render(BasicHarness, {
    props: {
      root: { defaultOpen: true, portalled: false, class: 'consumer-root' },
      action: { class: 'consumer-action' },
      trigger: { class: 'consumer-trigger' },
      positioner: { class: 'consumer-positioner' },
      content: { class: 'consumer-content' },
    },
  });
  for (const part of ['root', 'action', 'trigger', 'positioner', 'content']) {
    const element = document.querySelector(`[data-slot="split-button-${part}"]`)!;
    expect(element.classList.contains(`consumer-${part}`)).toBe(true);
  }
});