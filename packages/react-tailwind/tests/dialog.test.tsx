import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContext,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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

  render(
    <Dialog defaultOpen portalled={false}>
      <DialogTrigger
        ref={(element) => {
          triggerRef = element!;
        }}
      >
        Open dialog
      </DialogTrigger>
      <DialogTrigger
        ref={(element) => {
          composedTriggerRef = element ?? undefined;
        }}
        asChild
      >
        <button>Composed trigger</button>
      </DialogTrigger>
      <DialogBackdrop
        ref={(element) => {
          backdropRef = element!;
        }}
      />
      <DialogPositioner
        ref={(element) => {
          positionerRef = element!;
        }}
      >
        <DialogContent
          ref={(element) => {
            contentRef = element!;
          }}
        >
          <DialogTitle
            ref={(element) => {
              titleRef = element!;
            }}
          >
            Preferences
          </DialogTitle>
          <DialogDescription
            ref={(element) => {
              descriptionRef = element!;
            }}
          >
            Description
          </DialogDescription>
          <DialogCloseTrigger
            ref={(element) => {
              closeTriggerRef = element!;
            }}
          >
            Close
          </DialogCloseTrigger>
          <DialogCloseIcon
            ref={(element) => {
              closeIconRef = element ?? undefined;
            }}
          />
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  expect(triggerRef).toHaveAttribute('data-slot', 'dialog-trigger');
  expect(backdropRef).toHaveAttribute('data-slot', 'dialog-backdrop');
  expect(positionerRef).toHaveAttribute('data-slot', 'dialog-positioner');
  expect(contentRef).toHaveAttribute('data-slot', 'dialog-content');
  expect(titleRef).toHaveAttribute('data-slot', 'dialog-title');
  expect(descriptionRef).toHaveAttribute('data-slot', 'dialog-description');
  expect(closeTriggerRef).toHaveAttribute('data-slot', 'dialog-close-trigger');
  expect(composedTriggerRef).toHaveAttribute('data-slot', 'dialog-trigger');
  expect(closeIconRef).toHaveAttribute('data-slot', 'dialog-close-icon');
});

test('applies Tailwind defaults and lets consumer utilities win', () => {
  render(
    <Dialog defaultOpen portalled={false}>
      <DialogTrigger className="bg-primary px-2">Open dialog</DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className="w-96 bg-card p-4">
          <DialogHeader>
            <DialogTitle>Preferences</DialogTitle>
            <DialogCloseIcon className="size-8 rounded-full bg-primary" />
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <DialogBody>Body</DialogBody>
          <DialogFooter>Footer</DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  const trigger = screen.getByRole('button', { name: 'Open dialog' });
  const content = screen.getByRole('dialog');
  const closeIcon = screen.getByRole('button', { name: 'Close dialog' });

  expect(trigger).toHaveClass('bg-primary', 'px-2');
  expect(trigger).not.toHaveClass('bg-background', 'px-3.5');
  expect(document.querySelector('[data-slot="dialog-backdrop"]')).toHaveClass(
    'fixed',
    'inset-0',
    'bg-overlay',
  );
  expect(document.querySelector('[data-slot="dialog-positioner"]')).toHaveClass('grid', 'p-4');
  expect(content).toHaveClass('w-96', 'bg-card', 'p-4');
  expect(content).not.toHaveClass('bg-popover', 'p-6');
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