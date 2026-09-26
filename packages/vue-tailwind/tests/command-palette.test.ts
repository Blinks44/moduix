import { createListCollection } from '@ark-ui/vue/collection';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
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
  CommandPaletteSearch,
  CommandPaletteTitle,
} from '../src';

const commands = createListCollection({
  items: [{ label: 'Open settings', value: 'settings' }],
});

const commandPaletteComponents = {
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
  CommandPaletteSearch,
  CommandPaletteTitle,
} as unknown as Record<string, Component>;

test('opens and closes from the shortcut while ignoring editable targets and repeats', async () => {
  render(
    defineComponent({
      components: commandPaletteComponents,
      setup() {
        return { collection: commands, itemValue: commands.items[0] };
      },
      template:
        '<div><input aria-label="Editable target" /><CommandPalette aria-label="Command palette" :portalled="false" shortcut="alt+k"><CommandPalettePanel><CommandPaletteCombobox :collection="collection"><CommandPaletteSearch /><CommandPaletteList><CommandPaletteItem :item="itemValue">Open settings</CommandPaletteItem></CommandPaletteList></CommandPaletteCombobox></CommandPalettePanel></CommandPalette></div>',
    }),
  );

  await fireEvent.keyDown(screen.getByRole('textbox', { name: 'Editable target' }), {
    altKey: true,
    code: 'KeyK',
    key: 'k',
  });
  expect(screen.queryByRole('dialog', { name: 'Command palette' })).not.toBeInTheDocument();

  await fireEvent.keyDown(document, { altKey: true, code: 'KeyK', key: 'k' });
  expect(await screen.findByRole('dialog', { name: 'Command palette' })).toBeVisible();
  await fireEvent.keyDown(document, { altKey: true, code: 'KeyK', key: 'k', repeat: true });
  expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeVisible();
  await fireEvent.keyDown(document, { altKey: true, code: 'KeyK', key: 'k' });
  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: 'Command palette' })).not.toBeInTheDocument(),
  );
});

test.skip('forwards selection details and keeps the palette open when closeOnSelect is false', async () => {
  const onSelect = rs.fn();
  const Harness = defineComponent({
    components: commandPaletteComponents,
    setup() {
      return { collection: commands, itemValue: commands.items[0], onSelect };
    },
    template:
      '<CommandPalette default-open aria-label="Command palette" :portalled="false"><CommandPalettePanel><CommandPaletteCombobox :collection="collection" :close-on-select="false" @select="onSelect"><CommandPaletteSearch /><CommandPaletteList><CommandPaletteItem :item="itemValue">Open settings</CommandPaletteItem></CommandPaletteList></CommandPaletteCombobox></CommandPalettePanel></CommandPalette>',
  });

  render(Harness);
  await fireEvent.click(await screen.findByRole('option', { name: 'Open settings' }));
  await waitFor(() =>
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ itemValue: 'settings', value: ['settings'] }),
    ),
  );
  expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeVisible();
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
  const search = await screen.findByRole('combobox', { name: 'Search commands' });
  await fireEvent.update(search, 'open');
  const clear = await screen.findByRole('button', { name: 'Clear search' });
  search.focus();
  await fireEvent.pointerDown(clear, { button: 0 });
  await fireEvent.click(clear);
  await waitFor(() => expect(search).toHaveValue(''));
  expect(search).toHaveFocus();

  const content = screen.getByRole('dialog', { name: 'Command palette' });
  const list = screen.getByRole('listbox');
  const item = screen.getByRole('option', { name: /Open settings/ });
  expect(content).toHaveClass('max-h-96');
  expect(content).not.toHaveClass('max-h-[min(34rem,calc(100dvh-5rem))]');
  expect(list).toHaveClass('p-0');
  expect(item).toHaveClass('rounded-none', 'px-0');
  expect(item).not.toHaveClass('rounded-md', 'px-3');
  expect(screen.getByText('⌘K')).toBeInTheDocument();
  expect(screen.getByText('Enter')).toBeInTheDocument();
  const kbd = screen.getByTestId('command-kbd');
  expect(kbd.tagName).toBe('KBD');
  expect(kbd).toHaveAttribute('data-scope', 'kbd');
  expect(kbd).toHaveAttribute('data-part', 'root');
  expect(kbd).toHaveClass('min-h-5', 'min-w-5', 'px-1');
});

test('uses dialog title and description semantics', async () => {
  const Harness = defineComponent({
    components: commandPaletteComponents,
    setup() {
      return { collection: commands, itemValue: commands.items[0] };
    },
    template:
      '<CommandPalette default-open :portalled="false"><CommandPalettePanel><CommandPaletteTitle>Command palette</CommandPaletteTitle><CommandPaletteDescription>Select a command to continue.</CommandPaletteDescription><CommandPaletteCombobox :collection="collection"><CommandPaletteSearch /><CommandPaletteList><CommandPaletteItem :item="itemValue">Open settings</CommandPaletteItem></CommandPaletteList></CommandPaletteCombobox></CommandPalettePanel></CommandPalette>',
  });

  render(Harness);
  expect(
    await screen.findByRole('dialog', { name: 'Command palette' }),
  ).toHaveAccessibleDescription('Select a command to continue.');
});

test.skip('closes after selection by default (blocked by the Ark Vue select emit gap)', async () => {
  const Harness = defineComponent({
    components: commandPaletteComponents,
    setup() {
      return { collection: commands, itemValue: commands.items[0] };
    },
    template:
      '<CommandPalette default-open :portalled="false"><CommandPalettePanel><CommandPaletteCombobox :collection="collection"><CommandPaletteSearch /><CommandPaletteList><CommandPaletteItem :item="itemValue">Open settings</CommandPaletteItem></CommandPaletteList></CommandPaletteCombobox></CommandPalettePanel></CommandPalette>',
  });

  render(Harness);
  await fireEvent.click(screen.getByRole('option', { name: 'Open settings' }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: 'Command palette' })).not.toBeInTheDocument(),
  );
});