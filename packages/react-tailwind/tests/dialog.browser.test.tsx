import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { type ReactNode, useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
  const content = document.querySelector('[role="dialog"]')!;
  expect([...content.classList]).toEqual(
    expect.arrayContaining([
      'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))]',
      "after:content-['']",
    ]),
  );
  expect(getComputedStyle(content, '::after').content).toBe('""');
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

test('forwards refs through native parts and keeps asChild composition native', () => {
  let triggerRef!: HTMLButtonElement;
  let backdropRef!: HTMLDivElement;
  let positionerRef!: HTMLDivElement;
  let contentRef!: HTMLElement;
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
          asChild
          ref={(element) => {
            contentRef = element!;
          }}
        >
          <section>
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
          </section>
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  expect(triggerRef?.getAttribute('data-slot')).toBe('dialog-trigger');
  expect(backdropRef?.getAttribute('data-slot')).toBe('dialog-backdrop');
  expect(positionerRef?.getAttribute('data-slot')).toBe('dialog-positioner');
  expect(contentRef?.getAttribute('data-slot')).toBe('dialog-content');
  expect(titleRef?.getAttribute('data-slot')).toBe('dialog-title');
  expect(descriptionRef?.getAttribute('data-slot')).toBe('dialog-description');
  expect(closeTriggerRef?.getAttribute('data-slot')).toBe('dialog-close-trigger');
  expect(composedTriggerRef?.getAttribute('data-slot')).toBe('dialog-trigger');
  expect(closeIconRef?.getAttribute('data-slot')).toBe('dialog-close-icon');
  expect(contentRef).toBe(document.querySelector('[role="dialog"]'));
  expect(contentRef.tagName).toBe('SECTION');
});

test('applies Tailwind defaults and lets consumer utilities win', async () => {
  const { container } = render(
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

  const trigger = container.querySelector('[data-slot="dialog-trigger"]')!;
  const content = document.querySelector('[role="dialog"]')!;
  const closeIcon = document.querySelector('[data-slot="dialog-close-icon"]')!;

  expect([...trigger.classList]).toEqual(expect.arrayContaining(['bg-primary', 'px-2']));
  expect([...trigger.classList]).not.toContain('bg-background');
  expect([...trigger.classList]).not.toContain('px-3.5');
  expect([...document.querySelector('[data-slot="dialog-backdrop"]')!.classList]).toEqual(
    expect.arrayContaining(['fixed', 'inset-0', 'bg-overlay']),
  );
  expect([...document.querySelector('[data-slot="dialog-positioner"]')!.classList]).toEqual(
    expect.arrayContaining(['grid', 'p-4']),
  );
  expect([...content.classList]).toEqual(expect.arrayContaining(['w-96', 'bg-card', 'p-4']));
  expect([...content.classList]).not.toContain('bg-popover');
  expect([...content.classList]).not.toContain('p-6');
  expect([...document.querySelector('[data-slot="dialog-title"]')!.classList]).toEqual(
    expect.arrayContaining(['text-lg', 'font-semibold']),
  );
  expect([...document.querySelector('[data-slot="dialog-description"]')!.classList]).toEqual(
    expect.arrayContaining(['text-md', 'text-muted-foreground']),
  );
  expect([...document.querySelector('[data-slot="dialog-body"]')!.classList]).toEqual(
    expect.arrayContaining(['mt-4', 'text-md']),
  );
  expect([...document.querySelector('[data-slot="dialog-footer"]')!.classList]).toEqual(
    expect.arrayContaining(['mt-6', 'gap-2']),
  );
  expect([...closeIcon.classList]).toEqual(
    expect.arrayContaining(['size-8', 'rounded-full', 'bg-primary']),
  );
  expect([...closeIcon.classList]).not.toContain('rounded-md');
  expect([...closeIcon.classList]).not.toContain('bg-transparent');
  await expect.element(page.getByRole('dialog')).toHaveCSS('width', '384px');
  await expect.element(page.getByRole('dialog')).toHaveCSS('padding', '16px');
  await expect
    .element(page.getByRole('button', { name: 'Close dialog' }))
    .toHaveCSS('width', '32px');
});