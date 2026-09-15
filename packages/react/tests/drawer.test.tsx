import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { Button, Drawer, useDrawer, useDrawerContext } from '../src';

function DrawerStateReadout() {
  const drawer = useDrawerContext();

  return (
    <output data-testid="drawer-state">
      {`${drawer.swipeDirection}:${drawer.snapPoints.join(',')}:${String(drawer.snapPoint)}`}
    </output>
  );
}

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

test('lazily mounts, then closes on Escape and restores focus to its trigger', async () => {
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
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

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

test('starts content dragging outside the grabber by default', async () => {
  render(
    <Drawer defaultOpen>
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Title>Preferences</Drawer.Title>
          <div data-testid="drawer-body">Body</div>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>,
  );

  const content = await screen.findByRole('dialog');
  const body = screen.getByTestId('drawer-body');

  fireEvent.pointerDown(body, {
    button: 0,
    clientX: 100,
    clientY: 100,
    pointerId: 1,
    pointerType: 'touch',
  });
  fireEvent.pointerMove(body, { clientX: 100, clientY: 160, pointerId: 1, pointerType: 'touch' });

  await waitFor(() => expect(content).toHaveAttribute('data-dragging'));
});

test('forwards a ref through native asChild composition', () => {
  let contentRef: HTMLElement | null = null;

  render(
    <Drawer defaultOpen portalled={false}>
      <Drawer.Positioner>
        <Drawer.Content
          ref={(element) => {
            contentRef = element;
          }}
          asChild
        >
          <section>
            <Drawer.Title>Preferences</Drawer.Title>
          </section>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>,
  );

  expect(contentRef).toBe(screen.getByRole('dialog'));
  expect(contentRef).toHaveProperty('tagName', 'SECTION');
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

test('marks an island drawer and closes it through its accessible close icon', async () => {
  render(
    <Drawer variant="island">
      <Drawer.Trigger asChild>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Title>Preferences</Drawer.Title>
          <Drawer.CloseIcon />
        </Drawer.Content>
      </Drawer.Positioner>
      <DrawerStateReadout />
    </Drawer>,
  );

  const trigger = screen.getByRole('button', { name: 'Open drawer' });
  fireEvent.click(trigger);

  expect(await screen.findByRole('dialog')).toHaveAttribute('data-variant', 'island');
  expect(screen.getByTestId('drawer-state')).toHaveTextContent('down:1:1');
  expect(screen.getByRole('dialog').parentElement).toHaveAttribute('data-swipe-direction', 'down');
  fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
});