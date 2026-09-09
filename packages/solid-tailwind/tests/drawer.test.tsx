import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Button, Drawer, useDrawer } from '../src';

test('keeps page interaction available for a non-modal drawer', () => {
  render(() => (
    <Drawer defaultOpen modal={false} portalled={false}>
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Title>Preferences</Drawer.Title>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  ));

  expect(screen.getByRole('dialog')).toHaveStyle({ pointerEvents: 'auto' });
  expect(screen.getByRole('dialog').parentElement).toHaveStyle({ pointerEvents: 'none' });
});

test('preserves Ark open-change detail objects', async () => {
  const details: Array<{ open: boolean }> = [];

  render(() => (
    <Drawer onOpenChange={(detail) => details.push(detail)}>
      <Drawer.Trigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Title>Preferences</Drawer.Title>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  ));

  fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));

  await waitFor(() => expect(details).toEqual([{ open: true }]));
});

test('starts content dragging outside the grabber by default', async () => {
  render(() => (
    <Drawer defaultOpen>
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Title>Preferences</Drawer.Title>
          <div data-testid="drawer-body">Body</div>
        </Drawer.Content>
      </Drawer.Positioner>
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
      <Drawer.Trigger>Open drawer</Drawer.Trigger>
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Title>Preferences</Drawer.Title>
        </Drawer.Content>
      </Drawer.Positioner>
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
        <Drawer.Trigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Title>Preferences</Drawer.Title>
            <Drawer.CloseTrigger>Close drawer</Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
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

  render(() => <RootProviderDrawer />);
  fireEvent.click(screen.getByRole('button', { name: 'Open via API' }));

  expect(await screen.findByRole('dialog')).toBeInTheDocument();
});

test('marks an island drawer and closes it through its accessible close icon', async () => {
  render(() => (
    <Drawer>
      <Drawer.Trigger>Open drawer</Drawer.Trigger>
      <Drawer.Positioner>
        <Drawer.Content variant="island">
          <Drawer.Title>Preferences</Drawer.Title>
          <Drawer.CloseIcon />
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  ));

  const trigger = screen.getByRole('button', { name: 'Open drawer' });
  trigger.focus();
  fireEvent.click(trigger);

  expect(await screen.findByRole('dialog')).toHaveAttribute('data-variant', 'island');
  fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
});

test('forwards refs through ordinary parts and keeps asChild composition native', () => {
  let triggerRef!: HTMLButtonElement;
  let contentRef!: HTMLDivElement;

  render(() => (
    <Drawer defaultOpen portalled={false}>
      <Drawer.Trigger ref={(element) => (triggerRef = element)}>Open drawer</Drawer.Trigger>
      <Drawer.Positioner>
        <Drawer.Content
          ref={(element) => (contentRef = element)}
          asChild={(props) => <section {...props()} />}
        >
          <Drawer.Title>Preferences</Drawer.Title>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  ));

  expect(triggerRef).toBe(screen.getByRole('button', { name: 'Open drawer' }));
  expect(contentRef).toBeUndefined();
  expect(screen.getByRole('dialog')).toHaveProperty('tagName', 'SECTION');
});

test('applies Tailwind defaults and lets consumer utilities win', () => {
  render(() => (
    <Drawer defaultOpen portalled={false}>
      <Drawer.Trigger class="bg-primary px-2">Open drawer</Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content class="w-96 bg-card p-4">
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>Preferences</Drawer.Title>
            <Drawer.CloseIcon class="size-8 rounded-full bg-primary" />
            <Drawer.Description>Description</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>Body</Drawer.Body>
          <Drawer.Footer>Footer</Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  ));

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