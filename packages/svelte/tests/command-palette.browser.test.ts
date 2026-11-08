import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import * as commandPaletteEntry from '@/components/command-palette';
import { CommandPalette } from '@/components/command-palette';
import CloseResultsHarness from './command-palette/CloseResultsHarness.svelte';
import ComboboxContractHarness from './command-palette/ComboboxContractHarness.svelte';
import ControlledHarness from './command-palette/ControlledHarness.svelte';
import KbdHarness from './command-palette/KbdHarness.svelte';
import MetaHarness from './command-palette/MetaHarness.svelte';
import PaletteHarness from './command-palette/PaletteHarness.svelte';
import ProviderHarness from './command-palette/ProviderHarness.svelte';
import SearchIconHarness from './command-palette/SearchIconHarness.svelte';
import SelectionHarness from './command-palette/SelectionHarness.svelte';

function measureItemRow() {
  const item = document.querySelector<HTMLElement>('[data-slot="command-palette-item"]')!;
  const text = document.querySelector('[data-slot="command-palette-item-text"]')!;
  const meta = document.querySelector('[data-slot="command-palette-item-meta"]')!;
  // The content may still be scaling in, so measure in the item's own coordinates.
  const box = item.getBoundingClientRect();
  const scale = box.width / item.offsetWidth;
  const offset = (x: number) => (x - box.left) / scale;
  const contentEnd = item.offsetWidth - Number.parseFloat(getComputedStyle(item).paddingRight);

  return {
    overlap: offset(text.getBoundingClientRect().right) > offset(meta.getBoundingClientRect().left),
    metaAtEnd: Math.abs(offset(meta.getBoundingClientRect().right) - contentEnd) <= 1,
  };
}

test('keeps the flat API, dialog semantics, anatomy, and refs', async () => {
  const { component } = render(PaletteHarness, {
    props: {
      title: 'Command palette',
      description: 'Select a command to continue.',
    },
  });

  const dialog = screen.getByRole('dialog', { name: 'Command palette' });
  expect(
    screen.getByRole('dialog', {
      name: 'Command palette',
      description: 'Select a command to continue.',
    }),
  ).toBe(dialog);
  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toBeAttached();
  await expect
    .element(page.getByRole('option', { name: 'Open settings', exact: true }))
    .toBeAttached();
  expect('CommandPaletteRoot' in commandPaletteEntry).toBe(false);
  expect(typeof CommandPalette).toBe('function');
  const refs = component.getRefs();
  expect(refs.panelRef!.getAttribute('data-slot')).toBe('command-palette-content');
  expect(refs.searchRef!.getAttribute('data-slot')).toBe('command-palette-input');
  expect(refs.itemRef!.getAttribute('data-slot')).toBe('command-palette-item');
});

test('composes the shared Kbd anatomy and command-palette styles', async () => {
  render(KbdHarness);

  const kbd = screen.getByTestId('kbd');
  expect(kbd.tagName).toBe('KBD');
  await expect.element(page.getByTestId('kbd')).toHaveAttribute('data-scope', 'kbd');
  await expect.element(page.getByTestId('kbd')).toHaveAttribute('data-part', 'root');
  await expect.element(page.getByTestId('kbd')).toHaveAttribute('data-slot', 'kbd-root');
});

test('clears the search without losing focus', async () => {
  render(PaletteHarness);

  await page.getByRole('combobox', { name: 'Search commands', exact: true }).fill('open');

  await page.getByRole('button', { name: 'Clear search', exact: true }).click();
  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toHaveValue('');
  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toBeFocused();
});

test('forwards selection details and respects closeOnSelect', async () => {
  const onSelect = rs.fn();
  render(PaletteHarness, { props: { combobox: { closeOnSelect: false, onSelect } } });

  await page.getByRole('option', { name: 'Open settings', exact: true }).click();
  await expect
    .poll(() => onSelect)
    .toHaveBeenCalledWith(expect.objectContaining({ itemValue: 'settings', value: ['settings'] }));
  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toBeVisible();
});

test('supports controlled open state and RootProvider state', async () => {
  const details: Array<{ open: boolean }> = [];
  const controlled = render(ControlledHarness, { props: { details } });

  await page.getByRole('button', { name: 'Open palette', exact: true }).click();
  await screen.findByRole('dialog', { name: 'Controlled palette' });
  expect(controlled.component.getOpen()).toBe(true);
  await page.getByRole('dialog').press('Escape');
  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);
  expect(controlled.component.getOpen()).toBe(false);
  controlled.unmount();

  render(ProviderHarness);
  await page.getByRole('button', { name: 'Open through provider', exact: true }).click();
  await expect
    .element(page.getByRole('dialog', { name: 'Provider palette', exact: true }))
    .toBeAttached();
});

test('reacts to combobox prop updates after mount', async () => {
  render(CloseResultsHarness);

  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('button', { name: 'Close results', exact: true }).click();
  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toHaveAttribute('aria-expanded', 'false');
});

test('forwards a RootProvider exit event once', async () => {
  const exitComplete = rs.fn();
  render(ProviderHarness, { props: { defaultOpen: true, closeButton: true, exitComplete } });

  await page.getByRole('button', { name: 'Close provider', exact: true }).click();
  await expect.poll(() => exitComplete).toHaveBeenCalledTimes(1);
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
});

test('handles native selection once and reacts to closeOnSelect changes', async () => {
  const onSelect = rs.fn();
  const { component } = render(SelectionHarness, { props: { onSelect } });

  await page.getByRole('option', { name: 'Open settings', exact: true }).click();
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onSelect).toHaveBeenLastCalledWith(
    expect.objectContaining({ itemValue: 'settings', value: ['settings'] }),
  );
  await expect.element(page.getByRole('dialog')).toBeVisible();

  component.setCloseOnSelect(true);
  await page.getByRole('option', { name: 'Open files', exact: true }).click();
  expect(onSelect).toHaveBeenCalledTimes(2);
  expect(onSelect).toHaveBeenLastCalledWith(
    expect.objectContaining({ itemValue: 'files', value: ['files'] }),
  );
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
});

test('keeps combobox bindings, detail callbacks, attrs, snippets, and asChild refs transparent', async () => {
  const inputValueChange = rs.fn();
  const { component } = render(ComboboxContractHarness, { props: { inputValueChange } });

  const host = screen.getByTestId('combobox');

  expect(host.tagName).toBe('SECTION');
  expect([...host!.classList]).toEqual(expect.arrayContaining(['consumer-combobox']));
  expect(component.getRef()).toBe(host);
  await expect.element(page.getByRole('combobox')).not.toBeDisabled();
  await page.getByRole('combobox').fill('settings');
  await expect.poll(() => component.getInputValue()).toBe('settings');
  expect(inputValueChange).toHaveBeenCalledTimes(1);
  expect(inputValueChange).toHaveBeenCalledWith({ inputValue: 'settings', reason: 'input-change' });

  component.update();
  await expect.element(page.getByRole('combobox')).toHaveValue('external');
  await expect.element(page.getByRole('combobox')).toBeDisabled();
  expect(component.getRef()).toBe(host);
});

test('keeps item meta at the row end without overlapping a long label when there is no icon', async () => {
  render(MetaHarness);

  await expect.element(page.getByRole('option')).toBeVisible();
  expect(measureItemRow()).toEqual({ overlap: false, metaAtEnd: true });
});

test('toggles a RootProvider palette from the shortcut', async () => {
  render(ProviderHarness, { props: { shortcut: 'alt+k' } });

  await page.getByRole('button', { name: 'Shortcut target', exact: true }).press('Alt+k');
  await expect
    .element(page.getByRole('dialog', { name: 'Provider palette', exact: true }))
    .toBeVisible();

  await page.getByRole('dialog').press('Alt+k');
  await expect
    .element(page.getByRole('dialog', { name: 'Provider palette', exact: true }))
    .toHaveCount(0);
});

test('renders a decorative search icon before the input', async () => {
  render(SearchIconHarness);
  await screen.findByRole('dialog', { name: 'Command palette' });

  const icon = document.querySelector('[data-slot="command-palette-search-icon"]');
  expect(icon?.getAttribute('aria-hidden')).toBe('true');
  expect(icon?.nextElementSibling?.getAttribute('data-slot')).toBe('command-palette-input');
});

test('forwards selection details and keeps the palette open when closeOnSelect is false', async () => {
  const onSelect = rs.fn();
  render(PaletteHarness, { props: { combobox: { closeOnSelect: false, onSelect } } });

  await page.getByRole('option', { name: 'Open settings', exact: true }).click();
  await expect
    .poll(() => onSelect)
    .toHaveBeenCalledWith(expect.objectContaining({ itemValue: 'settings', value: ['settings'] }));
  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toBeVisible();
});

test('uses dialog title and description semantics', () => {
  render(PaletteHarness, {
    props: {
      root: { defaultOpen: true, portalled: false },
      title: 'Command palette',
      description: 'Select a command to continue.',
    },
  });
  expect(
    screen.getByRole('dialog', {
      name: 'Command palette',
      description: 'Select a command to continue.',
    }).isConnected,
  ).toBe(true);
});

test('closes after selection by default', async () => {
  render(PaletteHarness, {
    props: { root: { defaultOpen: true, portalled: false }, title: 'Command palette' },
  });

  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toBeVisible();
  await page.getByRole('option', { name: 'Open settings', exact: true }).click();
  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toHaveCount(0);
});