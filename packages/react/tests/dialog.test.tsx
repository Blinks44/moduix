import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContext,
  DialogContent,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  DialogTrigger,
  useDialog,
} from '../src';

test('keeps page interaction available for a non-modal dialog', () => {
  render(
    <Dialog defaultOpen modal={false} portalled={false}>
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Preferences</DialogTitle>
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  expect(screen.getByRole('dialog')).toHaveStyle({ pointerEvents: 'auto' });
  expect(screen.getByRole('dialog').parentElement).toHaveStyle({ pointerEvents: 'none' });
});

test('preserves Ark open-change detail objects', async () => {
  const details: Array<{ open: boolean }> = [];

  render(
    <Dialog onOpenChange={(detail) => details.push(detail)}>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Preferences</DialogTitle>
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));

  await waitFor(() => expect(details).toEqual([{ open: true }]));
});

test('closes on Escape and restores focus to its trigger', async () => {
  render(
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Preferences</DialogTitle>
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  const trigger = screen.getByRole('button', { name: 'Open dialog' });
  fireEvent.click(trigger);
  fireEvent.keyDown(await screen.findByRole('dialog'), { key: 'Escape' });

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
});

test('supports controlled open state', async () => {
  const details: Array<{ open: boolean }> = [];

  function ControlledDialog() {
    const [open, setOpen] = useState(false);

    return (
      <Dialog
        open={open}
        onOpenChange={(detail) => {
          details.push(detail);
          setOpen(detail.open);
        }}
      >
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Preferences</DialogTitle>
            <DialogCloseTrigger>Close dialog</DialogCloseTrigger>
          </DialogContent>
        </DialogPositioner>
      </Dialog>
    );
  }

  render(<ControlledDialog />);

  fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
  await screen.findByRole('dialog');
  fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));

  await waitFor(() => expect(details).toEqual([{ open: true }, { open: false }]));
});

test('renders overlays inline when portalled is false', () => {
  render(
    <div data-testid="dialog-host">
      <Dialog defaultOpen portalled={false}>
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Preferences</DialogTitle>
          </DialogContent>
        </DialogPositioner>
      </Dialog>
    </div>,
  );

  expect(within(screen.getByTestId('dialog-host')).getByRole('dialog')).toBeInTheDocument();
});

test('portals overlays outside the root tree by default', () => {
  const { container } = render(
    <Dialog defaultOpen>
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Preferences</DialogTitle>
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  expect(within(container).queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('portals overlays into portalRef when provided', () => {
  function DialogWithCustomPortal() {
    const portalRef = useRef<HTMLDivElement>(null);

    return (
      <>
        <div ref={portalRef} data-testid="dialog-portal" />
        <Dialog defaultOpen portalRef={portalRef}>
          <DialogPositioner>
            <DialogContent>
              <DialogTitle>Preferences</DialogTitle>
            </DialogContent>
          </DialogPositioner>
        </Dialog>
      </>
    );
  }

  render(<DialogWithCustomPortal />);

  expect(within(screen.getByTestId('dialog-portal')).getByRole('dialog')).toBeInTheDocument();
});

test('exposes the current state through DialogContext', () => {
  render(
    <Dialog defaultOpen portalled={false}>
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Preferences</DialogTitle>
          <DialogContext>{(dialog) => <output>Open: {String(dialog.open)}</output>}</DialogContext>
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  expect(screen.getByText('Open: true')).toBeInTheDocument();
});

test('opens a RootProvider dialog from external state', async () => {
  function RootProviderDialog() {
    const dialog = useDialog();

    return (
      <>
        <Button onClick={() => dialog.setOpen(true)}>Open via API</Button>
        <DialogRootProvider value={dialog}>
          <DialogPositioner>
            <DialogContent>
              <DialogTitle>Preferences</DialogTitle>
            </DialogContent>
          </DialogPositioner>
        </DialogRootProvider>
      </>
    );
  }

  render(<RootProviderDialog />);
  fireEvent.click(screen.getByRole('button', { name: 'Open via API' }));

  expect(await screen.findByRole('dialog')).toBeInTheDocument();
});

test('closes with the close icon and restores focus to the trigger', async () => {
  render(
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Preferences</DialogTitle>
          <DialogCloseIcon />
        </DialogContent>
      </DialogPositioner>
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

test('forwards a ref through native asChild composition', () => {
  let contentRef: HTMLElement | null = null;

  render(
    <Dialog defaultOpen portalled={false}>
      <DialogPositioner>
        <DialogContent
          ref={(element) => {
            contentRef = element;
          }}
          asChild
        >
          <section>
            <DialogTitle>Preferences</DialogTitle>
          </section>
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  expect(contentRef).toBe(screen.getByRole('dialog'));
  expect(contentRef).toHaveProperty('tagName', 'SECTION');
});