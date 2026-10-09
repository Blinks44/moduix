import { createListCollection } from '@ark-ui/vue/collection';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
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
import SsrCommandPalette from './fixtures/SsrCommandPalette.vue';

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

test('keeps the flat API, dialog semantics, anatomy, and refs', async () => {
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
  expect('Root' in CommandPalette).toBe(false);
  expect(refs.root.value?.$el).not.toBeInstanceOf(HTMLElement);
  expect(refs.panel.value!.$el.getAttribute('data-slot')).toBe('command-palette-content');
  expect(refs.search.value!.$el.getAttribute('data-slot')).toBe('command-palette-input');
  expect(refs.item.value!.$el.getAttribute('data-slot')).toBe('command-palette-item');
  expect([...dialog!.classList]).toEqual(expect.arrayContaining([styles.content]));
});

test('composes the shared Kbd anatomy and command-palette styles', async () => {
  render(
    defineComponent({
      components: commandPaletteComponents,
      template: '<CommandPaletteKbd data-testid="kbd">Enter</CommandPaletteKbd>',
    }),
  );

  const kbd = screen.getByTestId('kbd');
  expect(kbd.tagName).toBe('KBD');
  await expect.element(page.getByTestId('kbd')).toHaveAttribute('data-scope', 'kbd');
  await expect.element(page.getByTestId('kbd')).toHaveAttribute('data-part', 'root');
  await expect.element(page.getByTestId('kbd')).toHaveAttribute('data-slot', 'kbd-root');
  expect([...kbd!.classList]).toEqual(expect.arrayContaining([styles.kbd]));
});

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

test('clears the search without losing focus', async () => {
  const Harness = defineComponent({
    components: commandPaletteComponents,
    setup() {
      return { collection: commands, itemValue: commands.items[0] };
    },
    template:
      '<CommandPalette default-open aria-label="Command palette" :portalled="false"><CommandPalettePanel><CommandPaletteCombobox :collection="collection"><CommandPaletteSearch /><CommandPaletteList><CommandPaletteItem :item="itemValue">Open settings</CommandPaletteItem></CommandPaletteList></CommandPaletteCombobox></CommandPalettePanel></CommandPalette>',
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
});

test('forwards selection details and respects closeOnSelect', async () => {
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
  await page.getByRole('button', { name: 'Open palette', exact: true }).click();
  await screen.findByRole('dialog', { name: 'Controlled palette' });
  await page.getByRole('dialog').press('Escape');
  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);

  const RootProviderHarness = defineComponent({
    components: commandPaletteComponents,
    setup() {
      return { dialog: useDialog() };
    },
    template:
      '<div><button type="button" @click="dialog.setOpen(true)">Open through provider</button><CommandPaletteRootProvider :value="dialog" :portalled="false"><CommandPalettePanel><CommandPaletteTitle>Provider palette</CommandPaletteTitle></CommandPalettePanel></CommandPaletteRootProvider></div>',
  });

  render(RootProviderHarness);
  await page.getByRole('button', { name: 'Open through provider', exact: true }).click();
  await expect
    .element(page.getByRole('dialog', { name: 'Provider palette', exact: true }))
    .toBeAttached();
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

  await page.getByRole('button', { name: 'Close provider', exact: true }).click();
  await expect.poll(() => exitComplete).toHaveBeenCalledTimes(1);
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
});

test('handles native selection once and reacts to closeOnSelect changes', async () => {
  const closeOnSelect = ref(false);
  const onSelect = rs.fn();
  const collection = createListCollection({
    items: [...commands.items, { label: 'Open files', value: 'files' }],
  });
  render(
    defineComponent({
      components: commandPaletteComponents,
      setup: () => ({ collection, closeOnSelect, onSelect }),
      template: `
        <CommandPalette default-open :portalled="false" aria-label="Selection events">
          <CommandPalettePanel>
            <CommandPaletteCombobox :collection="collection" :close-on-select="closeOnSelect" @select="onSelect">
              <CommandPaletteSearch />
              <CommandPaletteList>
                <CommandPaletteItem v-for="item in collection.items" :key="item.value" :item="item">{{ item.label }}</CommandPaletteItem>
              </CommandPaletteList>
            </CommandPaletteCombobox>
          </CommandPalettePanel>
        </CommandPalette>
      `,
    }),
  );

  await page.getByRole('option', { name: 'Open settings', exact: true }).click();
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onSelect).toHaveBeenLastCalledWith(
    expect.objectContaining({ itemValue: 'settings', value: ['settings'] }),
  );
  await expect.element(page.getByRole('dialog')).toBeVisible();

  closeOnSelect.value = true;
  await nextTick();
  await page.getByRole('option', { name: 'Open files', exact: true }).click();
  expect(onSelect).toHaveBeenCalledTimes(2);
  expect(onSelect).toHaveBeenLastCalledWith(
    expect.objectContaining({ itemValue: 'files', value: ['files'] }),
  );
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
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

  expect(host.tagName).toBe('SECTION');
  expect([...host!.classList]).toEqual(expect.arrayContaining(['consumer-combobox']));
  expect(comboboxRef.value?.$el).toBe(host);
  await expect.element(page.getByRole('combobox')).not.toBeDisabled();
  await page.getByRole('combobox').fill('settings');
  await expect.poll(() => inputValue.value).toBe('settings');
  expect(inputValueChange).toHaveBeenCalledTimes(1);
  expect(inputValueChange).toHaveBeenCalledWith({ inputValue: 'settings', reason: 'input-change' });

  inputValue.value = 'external';
  disabled.value = true;
  await expect.element(page.getByRole('combobox')).toHaveValue('external');
  await expect.element(page.getByRole('combobox')).toBeDisabled();
  expect(comboboxRef.value?.$el).toBe(host);
});

test('renders and hydrates command-palette without replacing server hosts or IDs', async () => {
  const html = await renderToString(createSSRApp(SsrCommandPalette));
  expect(html).toContain('data-slot="command-palette-backdrop"');
  expect(html).toContain('data-slot="command-palette-content"');
  expect(html).toContain('data-slot="command-palette-input"');
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverParts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(serverIds.length).toBeGreaterThan(0);
  expect(serverIds.every(Boolean)).toBe(true);
  const app = createSSRApp(SsrCommandPalette);
  try {
    app.mount(host);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    const hydratedParts = [...host.querySelectorAll('[data-slot]')];
    expect(hydratedParts).toHaveLength(serverParts.length);
    hydratedParts.forEach((part, index) => expect(part).toBe(serverParts[index]));
    expect(host.querySelectorAll('[data-slot="command-palette-content"]')).toHaveLength(1);
    await expect
      .element(page.getByRole('option', { name: 'Open settings', exact: true }))
      .toContainText('Open settings');
    const search = page.getByRole('combobox', { name: 'Search commands', exact: true });
    await search.fill('settings');
    await expect.element(search).toHaveValue('settings');
  } finally {
    app.unmount();
    host.remove();
  }
});