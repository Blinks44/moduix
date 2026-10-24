import { createListCollection } from '@ark-ui/react/collection';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import {
  CommandPalette,
  CommandPaletteCombobox,
  CommandPaletteDescription,
  CommandPaletteItem,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
  CommandPaletteList,
  CommandPalettePanel,
  CommandPaletteRootProvider,
  CommandPaletteSearch,
  CommandPaletteTitle,
  useDialog,
} from '../src';

const commands = createListCollection({
  items: [{ label: 'Open settings', value: 'settings' }],
});
const longLabel =
  'A long command label that has to be truncated before the trailing shortcut. '.repeat(3);

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

test('opens and closes from the Ark shortcut while suppressing repeated events', async () => {
  render(
    <>
      <input aria-label="Editable target" />
      <button type="button">Shortcut target</button>
      <CommandPalette aria-label="Command palette" portalled={false} shortcut="alt+k">
        <CommandPalettePanel>
          <CommandPaletteCombobox collection={commands}>
            <CommandPaletteSearch />
            <CommandPaletteList>
              <CommandPaletteItem item={commands.items[0]}>Open settings</CommandPaletteItem>
            </CommandPaletteList>
          </CommandPaletteCombobox>
        </CommandPalettePanel>
      </CommandPalette>
    </>,
  );

  await page.getByRole('textbox', { name: 'Editable target', exact: true }).press('Alt+k');
  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toHaveCount(0);

  await page.getByRole('button', { name: 'Shortcut target', exact: true }).press('Alt+k');

  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toBeVisible();

  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      altKey: true,
      code: 'KeyK',
      key: 'k',
      repeat: true,
    }),
  );

  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toBeVisible();

  await page.getByRole('dialog').press('Alt+k');

  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toHaveCount(0);
});

test('forwards selection details and respects closeOnSelect=false', async () => {
  const onSelect = rs.fn();

  render(
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalettePanel>
        <CommandPaletteCombobox closeOnSelect={false} collection={commands} onSelect={onSelect}>
          <CommandPaletteSearch />
          <CommandPaletteList>
            <CommandPaletteItem item={commands.items[0]}>Open settings</CommandPaletteItem>
          </CommandPaletteList>
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>,
  );

  await page.getByRole('option', { name: 'Open settings', exact: true }).click();

  await expect
    .poll(() => onSelect)
    .toHaveBeenCalledWith(expect.objectContaining({ itemValue: 'settings', value: ['settings'] }));
  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toBeVisible();
});

test('uses dialog title and description semantics and closes after selection by default', async () => {
  render(
    <CommandPalette defaultOpen portalled={false}>
      <CommandPalettePanel>
        <CommandPaletteTitle>Command palette</CommandPaletteTitle>
        <CommandPaletteDescription>Select a command to continue.</CommandPaletteDescription>
        <CommandPaletteCombobox collection={commands}>
          <CommandPaletteSearch />
          <CommandPaletteList>
            <CommandPaletteItem item={commands.items[0]}>Open settings</CommandPaletteItem>
          </CommandPaletteList>
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>,
  );

  expect(
    screen.getByRole('dialog', {
      name: 'Command palette',
      description: 'Select a command to continue.',
    }).isConnected,
  ).toBe(true);

  await page.getByRole('option', { name: 'Open settings', exact: true }).click();

  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toHaveCount(0);
});

test('provides an accessible search control that clears without losing focus', async () => {
  render(
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalettePanel>
        <CommandPaletteCombobox collection={commands}>
          <CommandPaletteSearch />
          <CommandPaletteList>
            <CommandPaletteItem item={commands.items[0]}>Open settings</CommandPaletteItem>
          </CommandPaletteList>
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>,
  );

  await page.getByRole('combobox', { name: 'Search commands', exact: true }).fill('open');

  await page.getByRole('button', { name: 'Clear search', exact: true }).click();

  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toHaveValue('');
  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toBeFocused();
});

test('keeps item meta at the row end without overlapping a long label when there is no icon', async () => {
  render(
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalettePanel>
        <CommandPaletteCombobox collection={commands}>
          <CommandPaletteList>
            <CommandPaletteItem item={commands.items[0]}>
              <CommandPaletteItemText>
                <CommandPaletteItemLabel>{longLabel}</CommandPaletteItemLabel>
              </CommandPaletteItemText>
              <CommandPaletteItemMeta>Ctrl K</CommandPaletteItemMeta>
            </CommandPaletteItem>
          </CommandPaletteList>
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>,
  );

  await expect.element(page.getByRole('option')).toBeVisible();
  expect(measureItemRow()).toEqual({ overlap: false, metaAtEnd: true });
});

test('toggles a RootProvider palette from the shortcut', async () => {
  function ProviderPalette() {
    const dialog = useDialog();

    return (
      <CommandPaletteRootProvider value={dialog} portalled={false} shortcut="alt+k">
        <CommandPalettePanel>
          <CommandPaletteTitle>Provider palette</CommandPaletteTitle>
        </CommandPalettePanel>
      </CommandPaletteRootProvider>
    );
  }

  render(
    <>
      <button type="button">Shortcut target</button>
      <ProviderPalette />
    </>,
  );

  await page.getByRole('button', { name: 'Shortcut target', exact: true }).press('Alt+k');
  await expect
    .element(page.getByRole('dialog', { name: 'Provider palette', exact: true }))
    .toBeVisible();

  await page.getByRole('dialog').press('Alt+k');
  await expect
    .element(page.getByRole('dialog', { name: 'Provider palette', exact: true }))
    .toHaveCount(0);
});

test('renders a decorative search icon before the input', () => {
  render(
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalettePanel>
        <CommandPaletteCombobox collection={commands}>
          <CommandPaletteSearch />
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>,
  );

  const icon = document.querySelector('[data-slot="command-palette-search-icon"]');
  expect(icon?.getAttribute('aria-hidden')).toBe('true');
  expect(icon?.nextElementSibling?.getAttribute('data-slot')).toBe('command-palette-input');
});