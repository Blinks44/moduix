import { createListCollection } from '@ark-ui/react/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import {
  CommandPalette,
  CommandPaletteCombobox,
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
} from '@/index';

const commands = createListCollection({
  items: [{ label: 'Open settings', value: 'settings' }],
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

  expect([...content.classList]).toEqual(expect.arrayContaining(['max-h-96']));
  expect([...list.classList]).toEqual(expect.arrayContaining(['p-0']));
  expect([...item.classList]).toEqual(expect.arrayContaining(['rounded-none', 'px-0']));

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