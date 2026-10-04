import { createListCollection } from '@ark-ui/vue/collection';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { defineComponent, nextTick, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
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
  useDialog,
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
  CommandPaletteRootProvider,
  CommandPaletteSearch,
  CommandPaletteTitle,
} as unknown as Record<string, Component>;

test('forwards a RootProvider exit event once', async () => {
  const exitComplete = rs.fn();
  render(
    defineComponent({
      components: commandPaletteComponents,
      setup() {
        return { dialog: useDialog({ defaultOpen: true }), exitComplete };
      },
      template: `
        <CommandPaletteRootProvider :value="dialog" :portalled="false" @exit-complete="exitComplete">
          <CommandPalettePanel>
            <CommandPaletteTitle>Provider events</CommandPaletteTitle>
            <button @click="dialog.setOpen(false)">Close provider</button>
          </CommandPalettePanel>
        </CommandPaletteRootProvider>
      `,
    }),
  );

  await fireEvent.click(await screen.findByRole('button', { name: 'Close provider' }));
  await waitFor(() => expect(exitComplete).toHaveBeenCalledTimes(1));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

// Verify the wrapper boundary; the real Ark select-emit gap remains covered by skipped tests.
test('handles select once and reacts to closeOnSelect changes', async () => {
  const closeOnSelect = ref(false);
  const onSelect = rs.fn();
  const details = { itemValue: 'settings', value: ['settings'] };
  const ComboboxStub = defineComponent({
    emits: ['select'],
    setup() {
      return { details };
    },
    template: '<button @click="$emit(\'select\', details)">Emit selection</button>',
  });

  render(
    defineComponent({
      components: commandPaletteComponents,
      setup() {
        return { collection: commands, closeOnSelect, onSelect };
      },
      template: `
        <CommandPalette default-open :portalled="false" aria-label="Selection events">
          <CommandPalettePanel>
            <CommandPaletteCombobox :collection="collection" :close-on-select="closeOnSelect" @select="onSelect" />
          </CommandPalettePanel>
        </CommandPalette>
      `,
    }),
    { global: { stubs: { 'combobox-root': ComboboxStub } } },
  );

  await fireEvent.click(screen.getByRole('button', { name: 'Emit selection' }));
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onSelect).toHaveBeenLastCalledWith(details);
  expect(screen.getByRole('dialog')).toBeVisible();

  closeOnSelect.value = true;
  await nextTick();
  await fireEvent.click(screen.getByRole('button', { name: 'Emit selection' }));
  expect(onSelect).toHaveBeenCalledTimes(2);
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('keeps combobox models, detail events, attrs, slots, and asChild refs transparent', async () => {
  const inputValue = ref('');
  const disabled = ref(false);
  const inputValueChange = rs.fn();
  const comboboxRef = ref<ComponentPublicInstance>();
  render(
    defineComponent({
      components: commandPaletteComponents,
      setup() {
        return { collection: commands, inputValue, disabled, inputValueChange, comboboxRef };
      },
      template: `
        <CommandPalette default-open :portalled="false" aria-label="Combobox contracts">
          <CommandPalettePanel>
            <CommandPaletteCombobox ref="comboboxRef" as-child :collection="collection"
              v-model:input-value="inputValue" :disabled="disabled"
              @input-value-change="inputValueChange" data-testid="combobox" class="consumer-combobox">
              <section><CommandPaletteSearch /><CommandPaletteList /></section>
            </CommandPaletteCombobox>
          </CommandPalettePanel>
        </CommandPalette>
      `,
    }),
  );

  const host = screen.getByTestId('combobox');
  const search = await screen.findByRole('combobox');
  expect(host.tagName).toBe('SECTION');
  expect(host).toHaveClass('consumer-combobox');
  expect(comboboxRef.value?.$el).toBe(host);
  expect(search).not.toBeDisabled();
  await fireEvent.update(search, 'settings');
  await waitFor(() => expect(inputValue.value).toBe('settings'));
  expect(inputValueChange).toHaveBeenCalledTimes(1);
  expect(inputValueChange).toHaveBeenCalledWith({ inputValue: 'settings', reason: 'input-change' });

  inputValue.value = 'external';
  disabled.value = true;
  await waitFor(() => {
    expect(search).toHaveValue('external');
    expect(search).toBeDisabled();
  });
  expect(comboboxRef.value?.$el).toBe(host);
});

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

// Ark Vue 5.39.2 does not emit Combobox `select` details for this interaction.
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

test('reacts to combobox prop updates after mount', async () => {
  const Harness = defineComponent({
    components: commandPaletteComponents,
    setup() {
      const comboboxOpen = ref(true);
      return { collection: commands, comboboxOpen };
    },
    template:
      '<CommandPalette default-open aria-label="Command palette" :portalled="false"><CommandPalettePanel><button type="button" @click="comboboxOpen = false">Close results</button><CommandPaletteCombobox :collection="collection" :open="comboboxOpen"><CommandPaletteSearch /><CommandPaletteList /></CommandPaletteCombobox></CommandPalettePanel></CommandPalette>',
  });

  render(Harness);
  const search = await screen.findByRole('combobox', { name: 'Search commands' });
  expect(search).toHaveAttribute('aria-expanded', 'true');
  await fireEvent.click(screen.getByRole('button', { name: 'Close results' }));
  await waitFor(() => expect(search).toHaveAttribute('aria-expanded', 'false'));
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