import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Button, Dialog } from '../src';

test('keeps page interaction available for a non-modal dialog', () => {
  render(
    <Dialog defaultOpen modal={false} portalled={false}>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Preferences</Dialog.Title>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>,
  );

  expect(screen.getByRole('dialog')).toHaveStyle({ pointerEvents: 'auto' });
  expect(screen.getByRole('dialog').parentElement).toHaveStyle({ pointerEvents: 'none' });
});

test('preserves Ark open-change detail objects', async () => {
  const details: Array<{ open: boolean }> = [];

  render(
    <Dialog onOpenChange={(detail) => details.push(detail)}>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Preferences</Dialog.Title>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));

  await waitFor(() => expect(details).toEqual([{ open: true }]));
});

test('renders overlays inline when portalled is false', () => {
  render(
    <div data-testid="dialog-host">
      <Dialog defaultOpen portalled={false}>
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Preferences</Dialog.Title>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog>
    </div>,
  );

  expect(within(screen.getByTestId('dialog-host')).getByRole('dialog')).toBeInTheDocument();
});

test('exposes the current state through Dialog.Context', () => {
  render(
    <Dialog defaultOpen portalled={false}>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Preferences</Dialog.Title>
          <Dialog.Context>
            {(dialog) => <output>Open: {String(dialog.open)}</output>}
          </Dialog.Context>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>,
  );

  expect(screen.getByText('Open: true')).toBeInTheDocument();
});

test('closes with the close icon and restores focus to the trigger', async () => {
  render(
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Preferences</Dialog.Title>
          <Dialog.CloseIcon />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>,
  );

  const trigger = screen.getByRole('button', { name: 'Open dialog' });
  fireEvent.click(trigger);
  fireEvent.click(await screen.findByRole('button', { name: 'Close dialog' }));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});