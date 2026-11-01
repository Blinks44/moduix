import { createListCollection } from '@ark-ui/vue/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent } from 'vue';
import type { Component } from 'vue';
import {
  CommandPalette,
  CommandPaletteCombobox,
  CommandPaletteDescription,
  CommandPaletteItem,
  CommandPaletteItemDescription,
  CommandPaletteItemIcon,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
  CommandPaletteKbd,
  CommandPaletteList,
  CommandPalettePanel,
  CommandPaletteRootProvider,
  CommandPaletteSearch,
  CommandPaletteTitle,
  CommandPaletteTrigger,
} from '@/index';

const commands = createListCollection({
  items: [{ label: 'Open settings', value: 'settings' }],
});

const commandPaletteComponents = {
  CommandPalette,
  CommandPaletteCombobox,
  CommandPaletteDescription,
  CommandPaletteItem,
  CommandPaletteKbd,
  CommandPaletteList,
  CommandPalettePanel,
  CommandPaletteRootProvider,
  CommandPaletteSearch,
  CommandPaletteTitle,
  CommandPaletteTrigger,
  CommandPaletteItemDescription,
  CommandPaletteItemIcon,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
} as unknown as Record<string, Component>;

test('opens and closes from the shortcut while ignoring editable targets and repeats', async () => {
  render(
    defineComponent({
      components: commandPaletteComponents,
      setup() {
        return { collection: commands, itemValue: commands.items[0] };
      },
      template:
        '<div><input aria-label="Editable target" /><button type="button">Shortcut target</button><CommandPalette aria-label="Command palette" :portalled="false" shortcut="alt+k"><CommandPalettePanel><CommandPaletteCombobox :collection="collection"><CommandPaletteSearch /><CommandPaletteList><CommandPaletteItem :item="itemValue">Open settings</CommandPaletteItem></CommandPaletteList></CommandPaletteCombobox></CommandPalettePanel></CommandPalette></div>',
    }),
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

test('provides accessible search and consumer utilities override Tailwind defaults', async () => {
  const Harness = defineComponent({
    components: commandPaletteComponents,
    setup() {
      return { collection: commands, itemValue: commands.items[0] };
    },
    template:
      '<CommandPalette default-open aria-label="Command palette" :portalled="false"><CommandPalettePanel class="max-h-96"><CommandPaletteCombobox :collection="collection"><CommandPaletteSearch /><CommandPaletteList class="p-0"><CommandPaletteItem class="rounded-none px-0" :item="itemValue"><CommandPaletteItemIcon /><CommandPaletteItemText><CommandPaletteItemLabel>Open settings</CommandPaletteItemLabel><CommandPaletteItemDescription>Open app settings</CommandPaletteItemDescription></CommandPaletteItemText><CommandPaletteItemMeta>⌘K</CommandPaletteItemMeta></CommandPaletteItem></CommandPaletteList><CommandPaletteKbd data-testid="command-kbd">Enter</CommandPaletteKbd></CommandPaletteCombobox></CommandPalettePanel></CommandPalette>',
  });

  render(Harness);

  await page.getByRole('combobox', { name: 'Search commands', exact: true }).fill('open');

  await page.getByRole('button', { name: 'Clear search', exact: true }).click();
  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toHaveValue('');
  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toBeFocused();

  const content = screen.getByRole('dialog', { name: 'Command palette' });
  const list = screen.getByRole('listbox');
  const item = screen.getByRole('option', { name: /Open settings/ });
  expect([...content!.classList]).toEqual(expect.arrayContaining(['max-h-96']));
  expect([...list!.classList]).toEqual(expect.arrayContaining(['p-0']));
  expect([...item!.classList]).toEqual(expect.arrayContaining(['rounded-none', 'px-0']));
  await expect.element(page.getByText('⌘K')).toBeAttached();
  await expect.element(page.getByText('Enter')).toBeAttached();
  const kbd = screen.getByTestId('command-kbd');
  expect(kbd.tagName).toBe('KBD');
  await expect.element(page.getByTestId('command-kbd')).toHaveAttribute('data-scope', 'kbd');
  await expect.element(page.getByTestId('command-kbd')).toHaveAttribute('data-part', 'root');

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