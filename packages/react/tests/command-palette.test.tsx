import { createListCollection } from '@ark-ui/react/collection';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  CommandPalette,
  CommandPaletteCombobox,
  CommandPaletteDescription,
  CommandPaletteItem,
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

  fireEvent.keyDown(screen.getByRole('textbox', { name: 'Editable target' }), {
    altKey: true,
    code: 'KeyK',
    key: 'k',
  });
  expect(screen.queryByRole('dialog', { name: 'Command palette' })).not.toBeInTheDocument();

  fireEvent.keyDown(document, { altKey: true, code: 'KeyK', key: 'k' });

  await waitFor(() =>
    expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeVisible(),
  );

  fireEvent.keyDown(document, { altKey: true, code: 'KeyK', key: 'k', repeat: true });

  expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeVisible();

  fireEvent.keyDown(document, { altKey: true, code: 'KeyK', key: 'k' });

  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: 'Command palette' })).not.toBeInTheDocument(),
  );
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

  fireEvent.click(await screen.findByRole('option', { name: 'Open settings' }));

  await waitFor(() =>
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ itemValue: 'settings', value: ['settings'] }),
    ),
  );
  expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeVisible();
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
    await screen.findByRole('dialog', { name: 'Command palette' }),
  ).toHaveAccessibleDescription('Select a command to continue.');

  fireEvent.click(screen.getByRole('option', { name: 'Open settings' }));

  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: 'Command palette' })).not.toBeInTheDocument(),
  );
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

  const search = await screen.findByRole('combobox', { name: 'Search commands' });
  fireEvent.change(search, { target: { value: 'open' } });

  const clear = await screen.findByRole('button', { name: 'Clear search' });
  search.focus();
  fireEvent.pointerDown(clear, { button: 0 });
  fireEvent.click(clear);

  const clearedSearch = await screen.findByRole('combobox', { name: 'Search commands' });
  await waitFor(() => expect(clearedSearch).toHaveValue(''));
  expect(clearedSearch).toHaveFocus();
});