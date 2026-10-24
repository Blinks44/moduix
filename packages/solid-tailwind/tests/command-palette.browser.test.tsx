import { createListCollection } from '@ark-ui/solid/collection';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  CommandPalette,
  CommandPaletteClearTrigger,
  CommandPaletteCombobox,
  CommandPaletteControl,
  CommandPaletteDescription,
  CommandPaletteFooter,
  CommandPaletteInput,
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

test.each([false, true])('supports bound clear handlers (prevented=%s)', async (prevented) => {
  const payload = { action: 'clear' };
  const calls: unknown[] = [];
  render(() => (
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalettePanel>
        <CommandPaletteCombobox collection={commands}>
          <CommandPaletteControl>
            <CommandPaletteInput aria-label="Search commands" />
            <CommandPaletteClearTrigger
              data-testid="bound-clear"
              onPointerDown={[(data, event) => calls.push(data, event.currentTarget), payload]}
              onClick={[
                (data, event) => {
                  calls.push(data, event.currentTarget);
                  if (prevented) event.preventDefault();
                },
                payload,
              ]}
            />
          </CommandPaletteControl>
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>
  ));

  await page.getByRole('combobox', { name: 'Search commands', exact: true }).fill('open');
  const clear = screen.getByTestId('bound-clear');
  await expect.element(page.getByTestId('bound-clear')).not.toHaveAttribute('hidden');
  await page.getByTestId('bound-clear').click();
  expect(calls).toEqual([payload, clear, payload, clear]);
  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toHaveValue(prevented ? 'open' : '');
  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toBeFocused();
  // Separately check the programmatic cancellation guard, not a trusted pointer gesture.
  const pointerdown = new PointerEvent('pointerdown', {
    bubbles: true,
    cancelable: true,
    button: 0,
  });
  expect(clear.dispatchEvent(pointerdown)).toBe(false);
  expect(pointerdown.defaultPrevented).toBe(true);
  expect(calls).toEqual([payload, clear, payload, clear, payload, clear]);
});

test('rebinds an optional shortcut and removes it on cleanup', async () => {
  const [shortcut, setShortcut] = createSignal<string | false>('alt+k');
  const changes: boolean[] = [];
  render(() => <button type="button">Shortcut target</button>);
  const { unmount } = render(() => (
    <CommandPalette
      open={false}
      shortcut={shortcut()}
      onOpenChange={(details) => changes.push(details.open)}
    />
  ));
  await page.getByRole('button', { name: 'Shortcut target', exact: true }).press('Alt+k');
  await expect.poll(() => changes).toEqual([true]);
  setShortcut('alt+p');
  await page.getByRole('button', { name: 'Shortcut target', exact: true }).press('Alt+k');
  expect(changes).toHaveLength(1);
  await page.getByRole('button', { name: 'Shortcut target', exact: true }).press('Alt+p');
  await expect.poll(() => changes).toEqual([true, true]);
  setShortcut(false);
  await page.getByRole('button', { name: 'Shortcut target', exact: true }).press('Alt+p');
  expect(changes).toHaveLength(2);
  setShortcut('alt+k');
  unmount();
  await page.getByRole('button', { name: 'Shortcut target', exact: true }).press('Alt+k');
  expect(changes).toHaveLength(2);
});

test('opens and closes from the Ark shortcut while suppressing repeated events', async () => {
  render(() => (
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
    </>
  ));

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

  render(() => (
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalettePanel>
        <CommandPaletteCombobox closeOnSelect={false} collection={commands} onSelect={onSelect}>
          <CommandPaletteSearch />
          <CommandPaletteList>
            <CommandPaletteItem item={commands.items[0]}>Open settings</CommandPaletteItem>
          </CommandPaletteList>
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>
  ));

  await page.getByRole('option', { name: 'Open settings', exact: true }).click();

  await expect
    .poll(() => onSelect)
    .toHaveBeenCalledWith(expect.objectContaining({ itemValue: 'settings', value: ['settings'] }));
  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toBeVisible();
});

test('uses dialog title and description semantics and closes after selection by default', async () => {
  render(() => (
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
    </CommandPalette>
  ));

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
  render(() => (
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalettePanel>
        <CommandPaletteCombobox collection={commands}>
          <CommandPaletteSearch />
          <CommandPaletteList>
            <CommandPaletteItem item={commands.items[0]}>Open settings</CommandPaletteItem>
          </CommandPaletteList>
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>
  ));

  await page.getByRole('combobox', { name: 'Search commands', exact: true }).fill('open');

  await page.getByRole('button', { name: 'Clear search', exact: true }).click();

  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toHaveValue('');
  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toBeFocused();
});

test('keeps the search value when clearing is cancelled', async () => {
  render(() => (
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalettePanel>
        <CommandPaletteCombobox collection={commands}>
          <CommandPaletteControl>
            <CommandPaletteInput aria-label="Search commands" />
            <CommandPaletteClearTrigger onClick={(event) => event.preventDefault()} />
          </CommandPaletteControl>
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>
  ));

  await page.getByRole('combobox', { name: 'Search commands', exact: true }).fill('open');
  await page.locator('[data-slot="command-palette-clear-trigger"]').click();

  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toHaveValue('open');
});

test('lets consumer utilities replace conflicting defaults and keeps visual parts styled', async () => {
  const { container } = render(() => (
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalettePanel class="max-h-96">
        <CommandPaletteCombobox collection={commands}>
          <CommandPaletteSearch />
          <CommandPaletteList class="p-0">
            <CommandPaletteItem item={commands.items[0]} class="rounded-none px-0">
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
    </CommandPalette>
  ));

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

test('keeps item meta at the row end without overlapping a long label when there is no icon', async () => {
  render(() => (
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
    </CommandPalette>
  ));

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

  render(() => (
    <>
      <button type="button">Shortcut target</button>
      <ProviderPalette />
    </>
  ));

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
  render(() => (
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalettePanel>
        <CommandPaletteCombobox collection={commands}>
          <CommandPaletteSearch />
        </CommandPaletteCombobox>
      </CommandPalettePanel>
    </CommandPalette>
  ));

  const icon = document.querySelector('[data-slot="command-palette-search-icon"]');
  expect(icon?.getAttribute('aria-hidden')).toBe('true');
  expect(icon?.nextElementSibling?.getAttribute('data-slot')).toBe('command-palette-input');
});