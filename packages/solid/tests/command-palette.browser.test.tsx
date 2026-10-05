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
  CommandPaletteItem,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPalettePanel,
  CommandPaletteSearch,
  CommandPaletteTitle,
} from '../src';

const commands = createListCollection({
  items: [{ label: 'Open settings', value: 'settings' }],
});

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