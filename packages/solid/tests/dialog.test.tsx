import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Button, Dialog, useDialog } from '../src';

test('keeps page interaction available for a non-modal dialog', () => {
  render(() => (
    <Dialog defaultOpen modal={false} portalled={false}>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Preferences</Dialog.Title>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  ));

  expect(screen.getByRole('dialog')).toHaveStyle({ pointerEvents: 'auto' });
  expect(screen.getByRole('dialog').parentElement).toHaveStyle({ pointerEvents: 'none' });
});

test('preserves Ark open-change detail objects', async () => {
  const details: Array<{ open: boolean }> = [];

  render(() => (
    <Dialog onOpenChange={(detail) => details.push(detail)}>
      <Dialog.Trigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open dialog</Button>}
      />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Preferences</Dialog.Title>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  ));

  fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));

  await waitFor(() => expect(details).toEqual([{ open: true }]));
});

test('closes on Escape and restores focus to its trigger', async () => {
  render(() => (
    <Dialog>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Preferences</Dialog.Title>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  ));

  const trigger = screen.getByRole('button', { name: 'Open dialog' });
  trigger.focus();
  fireEvent.click(trigger);
  const dialog = await screen.findByRole('dialog');
  dialog.focus();
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  fireEvent.keyDown(dialog, { key: 'Escape' });

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

test('supports controlled open state', async () => {
  const details: Array<{ open: boolean }> = [];

  function ControlledDialog() {
    const [open, setOpen] = createSignal(false);

    return (
      <Dialog
        open={open()}
        onOpenChange={(detail) => {
          details.push(detail);
          setOpen(detail.open);
        }}
      >
        <Dialog.Trigger
          asChild={(triggerProps) => <Button {...triggerProps()}>Open dialog</Button>}
        />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Preferences</Dialog.Title>
            <Dialog.CloseTrigger>Close dialog</Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog>
    );
  }

  render(() => <ControlledDialog />);

  fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
  await screen.findByRole('dialog');
  fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));

  await waitFor(() => expect(details).toEqual([{ open: true }, { open: false }]));
});

test('renders overlays inline when portalled is false', () => {
  render(() => (
    <div data-testid="dialog-host">
      <Dialog defaultOpen portalled={false}>
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Preferences</Dialog.Title>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog>
    </div>
  ));

  expect(within(screen.getByTestId('dialog-host')).getByRole('dialog')).toBeInTheDocument();
});

test('portals overlays outside the root tree by default', () => {
  const { container } = render(() => (
    <Dialog defaultOpen>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Preferences</Dialog.Title>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  ));

  expect(within(container).queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('portals overlays into portalRef when provided', () => {
  function DialogWithCustomPortal() {
    let portalRef!: HTMLDivElement;

    return (
      <>
        <div ref={(element) => (portalRef = element)} data-testid="dialog-portal" />
        <Dialog defaultOpen portalRef={() => portalRef}>
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Preferences</Dialog.Title>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog>
      </>
    );
  }

  render(() => <DialogWithCustomPortal />);

  expect(within(screen.getByTestId('dialog-portal')).getByRole('dialog')).toBeInTheDocument();
});

test('exposes the current state through Dialog.Context', () => {
  render(() => (
    <Dialog defaultOpen portalled={false}>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Preferences</Dialog.Title>
          <Dialog.Context>
            {(dialog) => <output>Open: {String(dialog().open)}</output>}
          </Dialog.Context>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  ));

  expect(screen.getByText('Open: true')).toBeInTheDocument();
});

test('opens a RootProvider dialog from external state', async () => {
  function RootProviderDialog() {
    const dialog = useDialog();

    return (
      <>
        <Button onClick={() => dialog().setOpen(true)}>Open via API</Button>
        <Dialog.RootProvider value={dialog}>
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Preferences</Dialog.Title>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.RootProvider>
      </>
    );
  }

  render(() => <RootProviderDialog />);
  fireEvent.click(screen.getByRole('button', { name: 'Open via API' }));

  expect(await screen.findByRole('dialog')).toBeInTheDocument();
});

test('closes with the close icon and restores focus to the trigger', async () => {
  render(() => (
    <Dialog>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Preferences</Dialog.Title>
          <Dialog.CloseIcon />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  ));

  const trigger = screen.getByRole('button', { name: 'Open dialog' });
  trigger.focus();
  fireEvent.click(trigger);
  fireEvent.click(await screen.findByRole('button', { name: 'Close dialog' }));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

test('forwards refs through native parts and keeps asChild composition native', () => {
  let triggerRef!: HTMLButtonElement;
  let backdropRef!: HTMLDivElement;
  let positionerRef!: HTMLDivElement;
  let contentRef!: HTMLDivElement;
  let titleRef!: HTMLHeadingElement;
  let descriptionRef!: HTMLDivElement;
  let closeTriggerRef!: HTMLButtonElement;
  let composedTriggerRef: HTMLButtonElement | undefined;
  let closeIconRef: HTMLButtonElement | undefined;

  render(() => (
    <Dialog defaultOpen portalled={false}>
      <Dialog.Trigger ref={(element) => (triggerRef = element)}>Open dialog</Dialog.Trigger>
      <Dialog.Trigger
        ref={(element) => (composedTriggerRef = element)}
        asChild={(triggerProps) => <button {...triggerProps()}>Composed trigger</button>}
      />
      <Dialog.Backdrop ref={(element) => (backdropRef = element)} />
      <Dialog.Positioner ref={(element) => (positionerRef = element)}>
        <Dialog.Content ref={(element) => (contentRef = element)}>
          <Dialog.Title ref={(element) => (titleRef = element)}>Preferences</Dialog.Title>
          <Dialog.Description ref={(element) => (descriptionRef = element)}>
            Description
          </Dialog.Description>
          <Dialog.CloseTrigger ref={(element) => (closeTriggerRef = element)}>
            Close
          </Dialog.CloseTrigger>
          <Dialog.CloseIcon ref={(element) => (closeIconRef = element)} />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  ));

  expect(triggerRef).toHaveAttribute('data-slot', 'dialog-trigger');
  expect(backdropRef).toHaveAttribute('data-slot', 'dialog-backdrop');
  expect(positionerRef).toHaveAttribute('data-slot', 'dialog-positioner');
  expect(contentRef).toHaveAttribute('data-slot', 'dialog-content');
  expect(titleRef).toHaveAttribute('data-slot', 'dialog-title');
  expect(descriptionRef).toHaveAttribute('data-slot', 'dialog-description');
  expect(closeTriggerRef).toHaveAttribute('data-slot', 'dialog-close-trigger');
  expect(composedTriggerRef).toBeUndefined();
  expect(closeIconRef).toBeUndefined();
});