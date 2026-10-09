import { createListCollection } from '@ark-ui/react/collection';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import {
  CommandPalette,
  CommandPaletteCombobox,
  CommandPaletteDescription,
  CommandPaletteFooter,
  CommandPaletteItem,
  CommandPaletteItemDescription,
  CommandPaletteItemIcon,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
  CommandPaletteKbd,
  CommandPaletteList,
  CommandPalettePanel,
  CommandPaletteSearch,
  CommandPaletteTitle,
} from '../src';

const commands = createListCollection({
  items: [{ label: 'Open settings', value: 'settings' }],
});

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

test('lets consumer utilities replace conflicting defaults and keeps visual parts styled', async () => {
  const { container } = render(
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalettePanel className="max-h-96">
        <CommandPaletteCombobox collection={commands}>
          <CommandPaletteSearch />
          <CommandPaletteList className="p-0">
            <CommandPaletteItem item={commands.items[0]} className="rounded-none px-0">
              <CommandPaletteItemIcon />
              <CommandPaletteItemText>
                <CommandPaletteItemLabel>Open settings</CommandPaletteItemLabel>
                <CommandPaletteItemDescription>Open app settings</CommandPaletteItemDescription>
              </CommandPaletteItemText>
              <CommandPaletteItemMeta>⌘K</CommandPaletteItemMeta>
            </CommandPaletteItem>
          </CommandPaletteList>
          <CommandPaletteFooter>
            <CommandPaletteKbd>Enter</CommandPaletteKbd>
          </CommandPaletteFooter>
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>,
  );

  const content = container.querySelector('[data-slot="command-palette-content"]')!;
  const list = container.querySelector('[data-slot="command-palette-list"]')!;
  const item = container.querySelector('[data-slot="command-palette-item"]')!;
  const icon = container.querySelector('[data-slot="command-palette-item-icon"]')!;
  const footer = container.querySelector('[data-slot="command-palette-footer"]')!;

  expect([...content.classList]).toEqual(expect.arrayContaining(['max-h-96']));
  expect(content!.classList.contains('max-h-[min(34rem,calc(100dvh-5rem))]')).toBe(false);
  expect([...list.classList]).toEqual(expect.arrayContaining(['p-0']));
  expect([...item.classList]).toEqual(expect.arrayContaining(['rounded-none', 'px-0']));
  expect(['rounded-md', 'px-3'].some((name) => item.classList.contains(name))).toBe(false);
  expect([...icon.classList]).toEqual(
    expect.arrayContaining(['size-8', 'border-border', 'bg-muted']),
  );
  expect([...footer.classList]).toEqual(expect.arrayContaining(['border-t', 'px-4', 'py-2']));

  await expect
    .element(page.locator('[data-slot="command-palette-content"]'))
    .toHaveCSS('max-height', '384px');
  await expect
    .element(page.locator('[data-slot="command-palette-list"]'))
    .toHaveCSS('padding', '0px');
  await expect
    .element(page.locator('[data-slot="command-palette-item"]'))
    .toHaveCSS('border-radius', '0px');
  await expect
    .element(page.locator('[data-slot="command-palette-item"]'))
    .toHaveCSS('padding-left', '0px');
});