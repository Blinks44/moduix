import { createListCollection } from '@ark-ui/react/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CommandPalette } from '../src';

const commands = createListCollection({
  items: [{ label: 'Open settings', value: 'settings' }],
});

test('ignores repeated global shortcut keydown events', async () => {
  render(
    <CommandPalette aria-label="Command palette" portalled={false} shortcut="alt+k">
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

  fireEvent.keyDown(document, { altKey: true, code: 'KeyK', key: 'k' });

  await waitFor(() =>
    expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeVisible(),
  );

  fireEvent.keyDown(document, { altKey: true, code: 'KeyK', key: 'k', repeat: true });

  expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeVisible();
});