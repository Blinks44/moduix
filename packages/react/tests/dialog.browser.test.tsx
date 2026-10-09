import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { type ReactNode, useRef, useState } from 'react';
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

function DialogParts({ children }: { children?: ReactNode }) {
  return (
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Preferences</DialogTitle>
        {children}
      </DialogContent>
    </DialogPositioner>
  );
}

test('keeps page interaction available for a non-modal dialog', async () => {
  render(
    <Dialog defaultOpen modal={false} portalled={false}>
      <DialogParts>
        <DialogContext>{(dialog) => <output>Open: {String(dialog.open)}</output>}</DialogContext>
      </DialogParts>
    </Dialog>,
  );

  await expect.element(page.getByRole('dialog')).toHaveCSS('pointer-events', 'auto');
  await expect
    .element(page.locator('[data-slot="dialog-positioner"]'))
    .toHaveCSS('pointer-events', 'none');
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

test('closes on Escape, preserves open-change details, and restores focus to its trigger', async () => {
  const details: Array<{ open: boolean }> = [];
  render(
    <Dialog onOpenChange={(detail) => details.push(detail)}>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogParts />
    </Dialog>,
  );

  const trigger = page.getByRole('button', { name: 'Open dialog' });
  await trigger.click();
  await expect.element(page.getByRole('dialog')).toBeFocused();
  await page.getByRole('dialog').press('Escape');

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(details).toEqual([{ open: true }, { open: false }]);
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
        <DialogParts>
          <DialogCloseTrigger>Close dialog</DialogCloseTrigger>
        </DialogParts>
      </Dialog>
    );
  }

  render(<ControlledDialog />);

  await page.getByRole('button', { name: 'Open dialog' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close dialog' }).click();

  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
});

test('renders overlays inline when portalled is false', async () => {
  render(
    <div data-testid="dialog-host">
      <Dialog defaultOpen portalled={false}>
        <DialogParts />
      </Dialog>
    </div>,
  );

  await expect.element(page.getByTestId('dialog-host').getByRole('dialog')).toBeAttached();
});

test('portals overlays outside the root tree by default', async () => {
  const { container } = render(
    <Dialog defaultOpen>
      <DialogParts />
    </Dialog>,
  );

  expect(container.querySelector('[role="dialog"]')).toBeNull();
  await expect.element(page.getByRole('dialog')).toBeAttached();
});

test('portals overlays into portalRef when provided', async () => {
  function DialogWithCustomPortal() {
    const portalRef = useRef<HTMLDivElement>(null);

    return (
      <>
        <div ref={portalRef} data-testid="dialog-portal" />
        <Dialog defaultOpen portalRef={portalRef}>
          <DialogParts />
        </Dialog>
      </>
    );
  }

  render(<DialogWithCustomPortal />);

  await expect.element(page.getByTestId('dialog-portal').getByRole('dialog')).toBeAttached();
});

test('opens a RootProvider dialog from external state and updates DialogContext', async () => {
  function RootProviderDialog() {
    const dialog = useDialog();

    return (
      <>
        <Button onClick={() => dialog.setOpen(true)}>Open via API</Button>
        <DialogRootProvider value={dialog}>
          <DialogContext>{(dialog) => <output>Open: {String(dialog.open)}</output>}</DialogContext>
          <DialogParts />
        </DialogRootProvider>
      </>
    );
  }

  render(<RootProviderDialog />);
  await expect.element(page.getByText('Open: false')).toBeAttached();
  await page.getByRole('button', { name: 'Open via API' }).click();

  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

test('closes with the close icon and restores focus to the trigger', async () => {
  render(
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogParts>
        <DialogCloseIcon />
      </DialogParts>
    </Dialog>,
  );

  const trigger = page.getByRole('button', { name: 'Open dialog' });
  await trigger.click();
  await page.getByRole('button', { name: 'Close dialog' }).click();

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
});

test('forwards a ref through native asChild composition', async () => {
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

  expect(contentRef).toBe(document.querySelector('[role="dialog"]'));
  expect(contentRef).toHaveProperty('tagName', 'SECTION');
});