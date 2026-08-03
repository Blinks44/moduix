import { createListCollection } from '@ark-ui/react/collection';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CommandPalette } from '../src';

const commands = createListCollection({
  items: [{ label: 'Open settings', value: 'settings' }],
});

test('opens and closes from the shortcut while ignoring editable and repeated events', async () => {
  render(
    <>
      <input aria-label="Editable target" />
      <CommandPalette aria-label="Command palette" portalled={false} shortcut="alt+k">
        <CommandPalette.Panel>
          <CommandPalette.Combobox collection={commands}>
            <CommandPalette.Search />
            <CommandPalette.List>
              <CommandPalette.Item item={commands.items[0]}>Open settings</CommandPalette.Item>
            </CommandPalette.List>
          </CommandPalette.Combobox>
        </CommandPalette.Panel>
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
      <CommandPalette.Panel>
        <CommandPalette.Combobox closeOnSelect={false} collection={commands} onSelect={onSelect}>
          <CommandPalette.Search />
          <CommandPalette.List>
            <CommandPalette.Item item={commands.items[0]}>Open settings</CommandPalette.Item>
          </CommandPalette.List>
        </CommandPalette.Combobox>
      </CommandPalette.Panel>
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

test('provides an accessible search control that clears without losing focus', async () => {
  render(
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalette.Panel>
        <CommandPalette.Combobox collection={commands}>
          <CommandPalette.Search />
          <CommandPalette.List>
            <CommandPalette.Item item={commands.items[0]}>Open settings</CommandPalette.Item>
          </CommandPalette.List>
        </CommandPalette.Combobox>
      </CommandPalette.Panel>
    </CommandPalette>,
  );

  const search = await screen.findByRole('combobox', { name: 'Search commands' });
  fireEvent.change(search, { target: { value: 'open' } });

  const clear = await screen.findByRole('button', { name: 'Clear search' });
  search.focus();
  fireEvent.pointerDown(clear, { button: 0 });
  fireEvent.click(clear);

  await waitFor(() => expect(search).toHaveValue(''));
  expect(search).toHaveFocus();
});