import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { type ReactNode, useRef, useState } from 'react';
import {
  Button,
  Dialog,
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
test('mounts the content lazily and unmounts it after closing by default', async () => {
  render(
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogParts />
    </Dialog>,
  );

  const content = page.locator('[data-slot="dialog-content"]');
  await expect.element(content).toHaveCount(0);
  await page.getByRole('button', { name: 'Open dialog' }).click();
  await expect.element(content).toHaveCount(1);
  // An Escape pressed before Ark moves focus into the dialog is lost.
  await expect.element(page.getByRole('dialog')).toBeFocused();
  await page.getByRole('dialog').press('Escape');
  await expect.element(content).toHaveCount(0);
});

test('keeps tall content inside the dialog surface and scrolls the positioner', async () => {
  render(
    <Dialog defaultOpen portalled={false}>
      <DialogParts>
        <div style={{ height: '200vh' }}>Tall content</div>
        <p data-testid="last-line">Last line</p>
      </DialogParts>
    </Dialog>,
  );

  await expect.element(page.getByRole('dialog')).toBeVisible();
  const positioner = document.querySelector<HTMLElement>('[data-slot="dialog-positioner"]')!;
  const content = document.querySelector('[role="dialog"]')!.getBoundingClientRect();
  const lastLine = document.querySelector('[data-testid="last-line"]')!.getBoundingClientRect();

  expect(content.top).toBeGreaterThanOrEqual(0);
  expect(lastLine.bottom).toBeLessThanOrEqual(content.bottom + 1);
  expect(positioner.scrollHeight).toBeGreaterThan(positioner.clientHeight);
});

test('keeps a long title clear of the close icon', async () => {
  render(
    <Dialog defaultOpen portalled={false}>
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{'A very long dialog title that wraps '.repeat(4)}</DialogTitle>
            <DialogCloseIcon />
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  await expect.element(page.getByRole('dialog')).toBeVisible();
  const title = document.querySelector<HTMLElement>('[data-slot="dialog-title"]')!;
  const icon = document.querySelector('[data-slot="dialog-close-icon"]')!.getBoundingClientRect();
  const titleTextEnd =
    title.getBoundingClientRect().right - parseFloat(getComputedStyle(title).paddingInlineEnd);

  expect(titleTextEnd).toBeLessThanOrEqual(icon.left + 1);
});

test('wraps footer actions that do not fit on one line', async () => {
  render(
    <Dialog defaultOpen portalled={false}>
      <DialogPositioner>
        <DialogContent style={{ width: '18rem' }}>
          <DialogTitle>Unsaved changes</DialogTitle>
          <DialogFooter>
            <Button>Discard changes</Button>
            <Button>Keep editing</Button>
            <Button>Save and close</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  await expect.element(page.getByRole('dialog')).toBeVisible();
  const footer = document.querySelector('[data-slot="dialog-footer"]')!.getBoundingClientRect();

  for (const button of document.querySelectorAll('[data-slot="dialog-footer"] > *')) {
    const rect = button.getBoundingClientRect();
    expect(rect.left).toBeGreaterThanOrEqual(footer.left - 1);
    expect(rect.right).toBeLessThanOrEqual(footer.right + 1);
  }
});

test('keeps the body in the content color and mutes only the description', async () => {
  render(
    <Dialog defaultOpen portalled={false}>
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preferences</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <DialogBody>Body</DialogBody>
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  await expect.element(page.getByRole('dialog')).toBeVisible();
  const content = document.querySelector<HTMLElement>('[data-slot="dialog-content"]')!;
  const body = document.querySelector<HTMLElement>('[data-slot="dialog-body"]')!;
  const description = document.querySelector<HTMLElement>('[data-slot="dialog-description"]')!;

  expect(content.dataset.size).toBe('md');
  expect(content.dataset.placement).toBe('center');
  expect(content.dataset.scrollBehavior).toBe('outside');
  expect(getComputedStyle(body).color).toBe(getComputedStyle(content).color);
  expect(getComputedStyle(description).color).not.toBe(getComputedStyle(content).color);
});

test('applies width presets from the size prop', async () => {
  render(
    <>
      <Dialog defaultOpen portalled={false}>
        <DialogPositioner>
          <DialogContent size="sm" data-testid="sm">
            <DialogTitle>Small</DialogTitle>
          </DialogContent>
        </DialogPositioner>
      </Dialog>
      <Dialog defaultOpen portalled={false}>
        <DialogPositioner data-testid="full-positioner">
          <DialogContent size="full" data-testid="full">
            <DialogTitle>Full</DialogTitle>
          </DialogContent>
        </DialogPositioner>
      </Dialog>
    </>,
  );

  await expect.element(page.getByTestId('sm')).toBeVisible();
  // offsetWidth ignores the scale Ark applies to a dialog that has a nested dialog open.
  const small = document.querySelector<HTMLElement>('[data-testid="sm"]')!;
  const full = document.querySelector<HTMLElement>('[data-testid="full"]')!;
  const fullPositioner = document.querySelector<HTMLElement>('[data-testid="full-positioner"]')!;

  expect(Math.abs(small.offsetWidth - Math.min(384, window.innerWidth - 32))).toBeLessThanOrEqual(
    1,
  );
  expect(Math.abs(full.offsetWidth - fullPositioner.clientWidth)).toBeLessThanOrEqual(1);
  expect(full.offsetHeight).toBeGreaterThanOrEqual(fullPositioner.clientHeight - 1);
});

test('places the content at the top and scrolls the body inside', async () => {
  render(
    <Dialog defaultOpen portalled={false}>
      <DialogPositioner>
        <DialogContent placement="top" scrollBehavior="inside">
          <DialogTitle>Terms</DialogTitle>
          <DialogBody>
            <div style={{ height: '200vh' }}>Tall content</div>
          </DialogBody>
          <DialogFooter>
            <Button>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  await expect.element(page.getByRole('dialog')).toBeVisible();
  const positioner = document.querySelector<HTMLElement>('[data-slot="dialog-positioner"]')!;
  const body = document.querySelector<HTMLElement>('[data-slot="dialog-body"]')!;
  const content = document.querySelector('[role="dialog"]')!.getBoundingClientRect();
  const footer = document.querySelector('[data-slot="dialog-footer"]')!.getBoundingClientRect();

  expect(
    Math.abs(content.top - parseFloat(getComputedStyle(positioner).paddingTop)),
  ).toBeLessThanOrEqual(1);
  expect(content.bottom).toBeLessThanOrEqual(window.innerHeight + 1);
  expect(footer.bottom).toBeLessThanOrEqual(content.bottom + 1);
  expect(body.scrollHeight).toBeGreaterThan(body.clientHeight);
  expect(positioner.scrollHeight).toBeLessThanOrEqual(positioner.clientHeight + 1);
});

test('leaves a native trigger unstyled', async () => {
  render(
    <Dialog portalled={false}>
      <DialogTrigger>Open dialog</DialogTrigger>
    </Dialog>,
  );

  await expect.element(page.getByRole('button', { name: 'Open dialog' })).toBeVisible();
  expect(document.querySelector('[data-slot="dialog-trigger"]')!.className).toBe('');
});