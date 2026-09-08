import { createListCollection } from '@ark-ui/solid/collection';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { CommandPalette } from '../src';

const commands = createListCollection({
  items: [{ label: 'Open settings', value: 'settings' }],
});

test('opens and closes from the Ark shortcut while suppressing repeated events', async () => {
  render(() => (
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
    </>
  ));

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

  render(() => (
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalette.Panel>
        <CommandPalette.Combobox closeOnSelect={false} collection={commands} onSelect={onSelect}>
          <CommandPalette.Search />
          <CommandPalette.List>
            <CommandPalette.Item item={commands.items[0]}>Open settings</CommandPalette.Item>
          </CommandPalette.List>
        </CommandPalette.Combobox>
      </CommandPalette.Panel>
    </CommandPalette>
  ));

  fireEvent.click(await screen.findByRole('option', { name: 'Open settings' }));

  await waitFor(() =>
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ itemValue: 'settings', value: ['settings'] }),
    ),
  );
  expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeVisible();
});

test('uses dialog title and description semantics and closes after selection by default', async () => {
  render(() => (
    <CommandPalette defaultOpen portalled={false}>
      <CommandPalette.Panel>
        <CommandPalette.Title>Command palette</CommandPalette.Title>
        <CommandPalette.Description>Select a command to continue.</CommandPalette.Description>
        <CommandPalette.Combobox collection={commands}>
          <CommandPalette.Search />
          <CommandPalette.List>
            <CommandPalette.Item item={commands.items[0]}>Open settings</CommandPalette.Item>
          </CommandPalette.List>
        </CommandPalette.Combobox>
      </CommandPalette.Panel>
    </CommandPalette>
  ));

  expect(
    await screen.findByRole('dialog', { name: 'Command palette' }),
  ).toHaveAccessibleDescription('Select a command to continue.');

  fireEvent.click(screen.getByRole('option', { name: 'Open settings' }));

  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: 'Command palette' })).not.toBeInTheDocument(),
  );
});

test('provides an accessible search control that clears without losing focus', async () => {
  render(() => (
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalette.Panel>
        <CommandPalette.Combobox collection={commands}>
          <CommandPalette.Search />
          <CommandPalette.List>
            <CommandPalette.Item item={commands.items[0]}>Open settings</CommandPalette.Item>
          </CommandPalette.List>
        </CommandPalette.Combobox>
      </CommandPalette.Panel>
    </CommandPalette>
  ));

  const search = await screen.findByRole('combobox', { name: 'Search commands' });
  fireEvent.input(search, { target: { value: 'open' } });

  const clear = await screen.findByRole('button', { name: 'Clear search' });
  search.focus();
  fireEvent.pointerDown(clear, { button: 0 });
  fireEvent.click(clear);

  const clearedSearch = await screen.findByRole('combobox', { name: 'Search commands' });
  await waitFor(() => expect(clearedSearch).toHaveValue(''));
  expect(clearedSearch).toHaveFocus();
});

test('lets consumer utilities replace conflicting defaults and keeps visual parts styled', () => {
  const { container } = render(() => (
    <CommandPalette defaultOpen aria-label="Command palette" portalled={false}>
      <CommandPalette.Panel class="max-h-96">
        <CommandPalette.Combobox collection={commands}>
          <CommandPalette.Search />
          <CommandPalette.List class="p-0">
            <CommandPalette.Item item={commands.items[0]} class="rounded-none px-0">
              <CommandPalette.ItemIcon />
              <CommandPalette.ItemText>
                <CommandPalette.ItemLabel>Open settings</CommandPalette.ItemLabel>
                <CommandPalette.ItemDescription>Open app settings</CommandPalette.ItemDescription>
              </CommandPalette.ItemText>
              <CommandPalette.ItemMeta>⌘K</CommandPalette.ItemMeta>
            </CommandPalette.Item>
          </CommandPalette.List>
          <CommandPalette.Footer>
            <CommandPalette.Kbd>Enter</CommandPalette.Kbd>
          </CommandPalette.Footer>
        </CommandPalette.Combobox>
      </CommandPalette.Panel>
    </CommandPalette>
  ));

  const content = container.querySelector('[data-slot="command-palette-content"]')!;
  const list = container.querySelector('[data-slot="command-palette-list"]')!;
  const item = container.querySelector('[data-slot="command-palette-item"]')!;
  const icon = container.querySelector('[data-slot="command-palette-item-icon"]')!;
  const footer = container.querySelector('[data-slot="command-palette-footer"]')!;

  expect(content).toHaveClass('max-h-96');
  expect(content).not.toHaveClass('max-h-[min(34rem,calc(100dvh-5rem))]');
  expect(list).toHaveClass('p-0');
  expect(item).toHaveClass('rounded-none', 'px-0');
  expect(item).not.toHaveClass('rounded-md', 'px-3');
  expect(icon).toHaveClass('size-8', 'border-border', 'bg-muted');
  expect(footer).toHaveClass('border-t', 'px-4', 'py-2');
});