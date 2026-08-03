import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { Button, Drawer, useDrawer } from '../src';

test('keeps page interaction available for a non-modal drawer', () => {
  render(
    <Drawer defaultOpen modal={false} portalled={false}>
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Title>Preferences</Drawer.Title>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>,
  );

  expect(screen.getByRole('dialog')).toHaveStyle({ pointerEvents: 'auto' });
  expect(screen.getByRole('dialog').parentElement).toHaveStyle({ pointerEvents: 'none' });
});

test('preserves Ark open-change detail objects', async () => {
  const details: Array<{ open: boolean }> = [];

  render(
    <Drawer onOpenChange={(detail) => details.push(detail)}>
      <Drawer.Trigger asChild>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Title>Preferences</Drawer.Title>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));

  await waitFor(() => expect(details).toEqual([{ open: true }]));
});

test('closes on Escape and restores focus to its trigger', async () => {
  render(
    <Drawer>
      <Drawer.Trigger asChild>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Title>Preferences</Drawer.Title>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>,
  );

  const trigger = screen.getByRole('button', { name: 'Open drawer' });
  fireEvent.click(trigger);
  fireEvent.keyDown(await screen.findByRole('dialog'), { key: 'Escape' });

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
});

test('supports controlled open state', async () => {
  const details: Array<{ open: boolean }> = [];

  function ControlledDrawer() {
    const [open, setOpen] = useState(false);

    return (
      <Drawer
        open={open}
        onOpenChange={(detail) => {
          details.push(detail);
          setOpen(detail.open);
        }}
      >
        <Drawer.Trigger asChild>
          <Button>Open drawer</Button>
        </Drawer.Trigger>
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Title>Preferences</Drawer.Title>
            <Drawer.CloseTrigger>Close drawer</Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer>
    );
  }

  render(<ControlledDrawer />);

  fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
  await screen.findByRole('dialog');
  fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));

  await waitFor(() => expect(details).toEqual([{ open: true }, { open: false }]));
});

test('opens a RootProvider drawer from external state', async () => {
  function RootProviderDrawer() {
    const drawer = useDrawer();

    return (
      <>
        <Button onClick={() => drawer.setOpen(true)}>Open via API</Button>
        <Drawer.RootProvider value={drawer}>
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Title>Preferences</Drawer.Title>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.RootProvider>
      </>
    );
  }

  render(<RootProviderDrawer />);
  fireEvent.click(screen.getByRole('button', { name: 'Open via API' }));

  expect(await screen.findByRole('dialog')).toBeInTheDocument();
});