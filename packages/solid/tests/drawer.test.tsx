import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Button,
  Drawer,
  DrawerCloseIcon,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerPositioner,
  DrawerRootProvider,
  DrawerTitle,
  DrawerTrigger,
  useDrawer,
  useDrawerContext,
} from '../src';

function DrawerStateReadout() {
  const drawer = useDrawerContext();

  return (
    <output data-testid="drawer-state">
      {`${drawer().swipeDirection}:${drawer().snapPoints.join(',')}:${String(drawer().snapPoint)}`}
    </output>
  );
}

test('keeps page interaction available for a non-modal drawer', () => {
  render(() => (
    <Drawer defaultOpen modal={false} portalled={false}>
      <DrawerPositioner>
        <DrawerContent>
          <DrawerTitle>Preferences</DrawerTitle>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  ));

  expect(screen.getByRole('dialog')).toHaveStyle({ pointerEvents: 'auto' });
  expect(screen.getByRole('dialog').parentElement).toHaveStyle({ pointerEvents: 'none' });
});

test('preserves Ark open-change detail objects', async () => {
  const details: Array<{ open: boolean }> = [];

  render(() => (
    <Drawer onOpenChange={(detail) => details.push(detail)}>
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
      <DrawerPositioner>
        <DrawerContent>
          <DrawerTitle>Preferences</DrawerTitle>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  ));

  fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));

  await waitFor(() => expect(details).toEqual([{ open: true }]));
});

test('starts content dragging outside the grabber by default', async () => {
  render(() => (
    <Drawer defaultOpen>
      <DrawerPositioner>
        <DrawerContent>
          <DrawerTitle>Preferences</DrawerTitle>
          <div data-testid="drawer-body">Body</div>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  ));

  const content = await screen.findByRole('dialog');
  const body = screen.getByTestId('drawer-body');

  fireEvent.pointerDown(body, {
    button: 0,
    clientX: 100,
    clientY: 100,
    pointerId: 1,
    pointerType: 'touch',
  });
  fireEvent.pointerMove(body, {
    clientX: 100,
    clientY: 160,
    pointerId: 1,
    pointerType: 'touch',
  });

  await waitFor(() => expect(content).toHaveAttribute('data-dragging'));
});

test('lazily mounts, then closes on Escape and restores focus to its trigger', async () => {
  render(() => (
    <Drawer>
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerPositioner>
        <DrawerContent>
          <DrawerTitle>Preferences</DrawerTitle>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  ));

  const trigger = screen.getByRole('button', { name: 'Open drawer' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  trigger.focus();
  fireEvent.click(trigger);
  const dialog = await screen.findByRole('dialog');
  dialog.focus();
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  fireEvent.keyDown(document, { key: 'Escape' });

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  await waitFor(() => expect(trigger).toHaveFocus());
});

test('supports controlled open state', async () => {
  const details: Array<{ open: boolean }> = [];

  function ControlledDrawer() {
    const [open, setOpen] = createSignal(false);

    return (
      <Drawer
        open={open()}
        onOpenChange={(detail) => {
          details.push(detail);
          setOpen(detail.open);
        }}
      >
        <DrawerTrigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerTitle>Preferences</DrawerTitle>
            <DrawerCloseTrigger>Close drawer</DrawerCloseTrigger>
          </DrawerContent>
        </DrawerPositioner>
      </Drawer>
    );
  }

  render(() => <ControlledDrawer />);

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
        <Button onClick={() => drawer().setOpen(true)}>Open via API</Button>
        <DrawerRootProvider value={drawer}>
          <DrawerPositioner>
            <DrawerContent>
              <DrawerTitle>Preferences</DrawerTitle>
            </DrawerContent>
          </DrawerPositioner>
        </DrawerRootProvider>
      </>
    );
  }

  render(() => <RootProviderDrawer />);
  fireEvent.click(screen.getByRole('button', { name: 'Open via API' }));

  expect(await screen.findByRole('dialog')).toBeInTheDocument();
});

test('marks an island drawer and closes it through its accessible close icon', async () => {
  render(() => (
    <Drawer variant="island">
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerPositioner>
        <DrawerContent>
          <DrawerTitle>Preferences</DrawerTitle>
          <DrawerCloseIcon />
        </DrawerContent>
      </DrawerPositioner>
      <DrawerStateReadout />
    </Drawer>
  ));

  const trigger = screen.getByRole('button', { name: 'Open drawer' });
  trigger.focus();
  fireEvent.click(trigger);

  expect(await screen.findByRole('dialog')).toHaveAttribute('data-variant', 'island');
  expect(screen.getByTestId('drawer-state')).toHaveTextContent('down:1:1');
  expect(screen.getByRole('dialog').parentElement).toHaveAttribute('data-swipe-direction', 'down');
  fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
});

test('forwards refs through ordinary parts and keeps asChild composition native', () => {
  let triggerRef!: HTMLButtonElement;
  let contentRef!: HTMLDivElement;

  render(() => (
    <Drawer defaultOpen portalled={false}>
      <DrawerTrigger ref={(element) => (triggerRef = element)}>Open drawer</DrawerTrigger>
      <DrawerPositioner>
        <DrawerContent
          ref={(element) => (contentRef = element)}
          asChild={(props) => <section {...props()} />}
        >
          <DrawerTitle>Preferences</DrawerTitle>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  ));

  expect(triggerRef).toBe(screen.getByRole('button', { name: 'Open drawer' }));
  expect(contentRef).toBeUndefined();
  expect(screen.getByRole('dialog')).toHaveProperty('tagName', 'SECTION');
});