import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
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
      {`${drawer.swipeDirection}:${drawer.snapPoints.join(',')}:${String(drawer.snapPoint)}`}
    </output>
  );
}

test('keeps page interaction available for a non-modal drawer', () => {
  render(
    <Drawer defaultOpen modal={false} portalled={false}>
      <DrawerPositioner>
        <DrawerContent>
          <DrawerTitle>Preferences</DrawerTitle>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>,
  );

  expect(screen.getByRole('dialog')).toHaveStyle({ pointerEvents: 'auto' });
  expect(screen.getByRole('dialog').parentElement).toHaveStyle({ pointerEvents: 'none' });
});

test('preserves Ark open-change detail objects', async () => {
  const details: Array<{ open: boolean }> = [];

  render(
    <Drawer onOpenChange={(detail) => details.push(detail)}>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerPositioner>
        <DrawerContent>
          <DrawerTitle>Preferences</DrawerTitle>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));

  await waitFor(() => expect(details).toEqual([{ open: true }]));
});

test('lazily mounts, then closes on Escape and restores focus to its trigger', async () => {
  render(
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerPositioner>
        <DrawerContent>
          <DrawerTitle>Preferences</DrawerTitle>
        </DrawerContent>
      </DrawerPositioner>
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
        <DrawerTrigger asChild>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerPositioner>
          <DrawerContent>
            <DrawerTitle>Preferences</DrawerTitle>
            <DrawerCloseTrigger>Close drawer</DrawerCloseTrigger>
          </DrawerContent>
        </DrawerPositioner>
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
      <DrawerPositioner>
        <DrawerContent>
          <DrawerTitle>Preferences</DrawerTitle>
          <div data-testid="drawer-body">Body</div>
        </DrawerContent>
      </DrawerPositioner>
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
      <DrawerPositioner>
        <DrawerContent
          ref={(element) => {
            contentRef = element;
          }}
          asChild
        >
          <section>
            <DrawerTitle>Preferences</DrawerTitle>
          </section>
        </DrawerContent>
      </DrawerPositioner>
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

  render(<RootProviderDrawer />);
  fireEvent.click(screen.getByRole('button', { name: 'Open via API' }));

  expect(await screen.findByRole('dialog')).toBeInTheDocument();
});

test('marks an island drawer and closes it through its accessible close icon', async () => {
  render(
    <Drawer variant="island">
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerPositioner>
        <DrawerContent>
          <DrawerTitle>Preferences</DrawerTitle>
          <DrawerCloseIcon />
        </DrawerContent>
      </DrawerPositioner>
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

test('applies Tailwind defaults and lets consumer utilities win', () => {
  render(
    <Drawer defaultOpen portalled={false}>
      <DrawerTrigger className="bg-primary px-2">Open drawer</DrawerTrigger>
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent className="w-96 bg-card p-4">
          <DrawerGrabber>
            <DrawerGrabberIndicator />
          </DrawerGrabber>
          <DrawerHeader>
            <DrawerTitle>Preferences</DrawerTitle>
            <DrawerCloseIcon className="size-8 rounded-full bg-primary" />
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>Body</DrawerBody>
          <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>,
  );

  const trigger = screen.getByRole('button', { name: 'Open drawer' });
  const content = screen.getByRole('dialog');
  const closeIcon = screen.getByRole('button', { name: 'Close drawer' });

  expect(trigger).toHaveClass('bg-primary', 'px-2');
  expect(trigger).not.toHaveClass('bg-background', 'px-3.5');
  expect(document.querySelector('[data-slot="drawer-backdrop"]')).toHaveClass(
    'fixed',
    'inset-0',
    'bg-overlay',
  );
  expect(document.querySelector('[data-slot="drawer-positioner"]')).toHaveClass(
    'flex',
    'items-end',
  );
  expect(content).toHaveClass('w-96', 'bg-card', 'p-4');
  expect(content).not.toHaveClass('bg-popover', 'px-6', 'pt-3');
  expect(content).toHaveClass(
    'data-[swipe-direction=left]:after:inset-y-0',
    'data-[swipe-direction=right]:after:inset-y-0',
    '[transition:transform_calc(var(--drawer-swipe-strength,1)*450ms)_cubic-bezier(0,0,0.2,1),scale_450ms_cubic-bezier(0.32,0.72,0,1),translate_450ms_cubic-bezier(0.32,0.72,0,1)]',
  );
  expect(document.querySelector('[data-slot="drawer-grabber-indicator"]')).toHaveClass(
    'h-1',
    'w-12',
    'rounded-full',
  );
  expect(screen.getByRole('heading', { name: 'Preferences' })).toHaveClass(
    'text-lg',
    'font-semibold',
  );
  expect(screen.getByText('Description')).toHaveClass('text-md', 'text-muted-foreground');
  expect(screen.getByText('Body')).toHaveClass('mt-4', 'text-md');
  expect(screen.getByText('Footer')).toHaveClass('mt-6', 'gap-2');
  expect(closeIcon).toHaveClass('size-8', 'rounded-full', 'bg-primary');
  expect(closeIcon).not.toHaveClass('rounded-md', 'bg-transparent');
});