import { createListCollection } from '@ark-ui/vue/collection';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
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
  useDialog,
} from '../src';
import styles from '../src/components/command-palette/CommandPalette.module.css';

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
} as unknown as Record<string, Component>;

test('keeps the flat API, dialog semantics, anatomy, and refs', () => {
  const refs = {
    root: ref<ComponentPublicInstance>(),
    panel: ref<ComponentPublicInstance>(),
    search: ref<ComponentPublicInstance>(),
    item: ref<ComponentPublicInstance>(),
  };
  const Harness = defineComponent({
    components: commandPaletteComponents,
    setup() {
      return { ...refs, collection: commands, itemValue: commands.items[0] };
    },
    template:
      '<CommandPalette ref="root" default-open aria-label="Command palette" :portalled="false"><CommandPalettePanel ref="panel"><CommandPaletteTitle>Command palette</CommandPaletteTitle><CommandPaletteDescription>Select a command to continue.</CommandPaletteDescription><CommandPaletteCombobox :collection="collection"><CommandPaletteSearch ref="search" /><CommandPaletteList><CommandPaletteItem ref="item" :item="itemValue">Open settings</CommandPaletteItem></CommandPaletteList></CommandPaletteCombobox></CommandPalettePanel></CommandPalette>',
  });

  render(Harness);

  const dialog = screen.getByRole('dialog', { name: 'Command palette' });
  expect(dialog).toHaveAccessibleDescription('Select a command to continue.');
  expect(screen.getByRole('combobox', { name: 'Search commands' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Open settings' })).toBeInTheDocument();
  expect('Root' in CommandPalette).toBe(false);
  expect(refs.root.value?.$el).not.toBeInstanceOf(HTMLElement);
  expect(refs.panel.value?.$el).toHaveAttribute('data-slot', 'command-palette-content');
  expect(refs.search.value?.$el).toHaveAttribute('data-slot', 'command-palette-input');
  expect(refs.item.value?.$el).toHaveAttribute('data-slot', 'command-palette-item');
  expect(dialog).toHaveClass(styles.content);
});

test('composes the shared Kbd anatomy and command-palette styles', () => {
  render(
    defineComponent({
      components: commandPaletteComponents,
      template: '<CommandPaletteKbd data-testid="kbd">Enter</CommandPaletteKbd>',
    }),
  );

  const kbd = screen.getByTestId('kbd');
  expect(kbd.tagName).toBe('KBD');
  expect(kbd).toHaveAttribute('data-scope', 'kbd');
  expect(kbd).toHaveAttribute('data-part', 'root');
  expect(kbd).toHaveAttribute('data-slot', 'kbd-root');
  expect(kbd).toHaveClass(styles.kbd);
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

test.skip('forwards selection details, respects closeOnSelect, and clears without losing focus', async () => {
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
  const search = await screen.findByRole('combobox', { name: 'Search commands' });
  await fireEvent.update(search, 'open');
  const clear = await screen.findByRole('button', { name: 'Clear search' });
  search.focus();
  await fireEvent.pointerDown(clear, { button: 0 });
  await fireEvent.click(clear);
  await waitFor(() => expect(search).toHaveValue(''));
  expect(search).toHaveFocus();

  await fireEvent.click(screen.getByRole('option', { name: 'Open settings' }));
  await waitFor(() =>
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ itemValue: 'settings', value: ['settings'] }),
    ),
  );
  expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeVisible();
});

test('supports controlled open state and RootProvider state', async () => {
  const details: Array<{ open: boolean }> = [];
  const Controlled = defineComponent({
    components: commandPaletteComponents,
    setup() {
      const open = ref(false);
      return {
        collection: commands,
        itemValue: commands.items[0],
        open,
        onOpenChange: (detail: { open: boolean }) => details.push(detail),
      };
    },
    template:
      '<CommandPalette v-model:open="open" aria-label="Controlled palette" :portalled="false" @open-change="onOpenChange"><CommandPaletteTrigger>Open palette</CommandPaletteTrigger><CommandPalettePanel><CommandPaletteCombobox :collection="collection"><CommandPaletteSearch /><CommandPaletteList><CommandPaletteItem :item="itemValue">Open settings</CommandPaletteItem></CommandPaletteList></CommandPaletteCombobox></CommandPalettePanel></CommandPalette>',
  });

  render(Controlled);
  await fireEvent.click(screen.getByRole('button', { name: 'Open palette' }));
  await screen.findByRole('dialog', { name: 'Controlled palette' });
  await fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => expect(details).toEqual([{ open: true }, { open: false }]));

  const RootProviderHarness = defineComponent({
    components: commandPaletteComponents,
    setup() {
      return { dialog: useDialog() };
    },
    template:
      '<div><button type="button" @click="dialog.setOpen(true)">Open through provider</button><CommandPaletteRootProvider :value="dialog" :portalled="false"><CommandPalettePanel><CommandPaletteTitle>Provider palette</CommandPaletteTitle></CommandPalettePanel></CommandPaletteRootProvider></div>',
  });

  render(RootProviderHarness);
  await fireEvent.click(screen.getByRole('button', { name: 'Open through provider' }));
  expect(await screen.findByRole('dialog', { name: 'Provider palette' })).toBeInTheDocument();
});

test('renders and hydrates the public anatomy through Vue SSR', async () => {
  const App = defineComponent({
    components: commandPaletteComponents,
    setup() {
      return { collection: commands, itemValue: commands.items[0] };
    },
    template:
      '<CommandPalette default-open aria-label="Server palette" :portalled="false"><CommandPalettePanel><CommandPaletteTitle>Server palette</CommandPaletteTitle><CommandPaletteCombobox :collection="collection"><CommandPaletteSearch /><CommandPaletteList><CommandPaletteItem :item="itemValue">Open settings</CommandPaletteItem></CommandPaletteList></CommandPaletteCombobox></CommandPalettePanel></CommandPalette>',
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="command-palette-backdrop"');
  expect(html).toContain('data-slot="command-palette-content"');
  expect(html).toContain('data-slot="command-palette-input"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);
  expect(host.querySelectorAll('[data-slot="command-palette-content"]')).toHaveLength(1);
  expect(host.querySelector('[role="combobox"]')).toBeInTheDocument();
  expect(host.querySelector('[role="option"]')).toHaveTextContent('Open settings');
  app.unmount();
  host.remove();
});