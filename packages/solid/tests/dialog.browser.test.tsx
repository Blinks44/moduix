import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import { createSignal, type JSX } from 'solid-js';
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContext,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  DialogTrigger,
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
  useDialog,
} from '../src';

function DialogParts(props: { children?: JSX.Element }) {
  return (
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Preferences</DialogTitle>
        {props.children}
      </DialogContent>
    </DialogPositioner>
  );
}

// Ark Solid 5.39.3 also leaves the nested Portal host aria-hidden; re-enable after the upstream fix.
test.skip('keeps nested dialogs accessible and restores parent focus after Escape', async () => {
  render(() => (
    <Popover portalled>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <Dialog>
            <DialogTrigger>Open parent</DialogTrigger>
            <DialogPositioner>
              <DialogContent>
                <DialogTitle>Parent dialog</DialogTitle>
                <Dialog>
                  <DialogTrigger>Open nested</DialogTrigger>
                  <DialogPositioner>
                    <DialogContent>
                      <DialogTitle>Nested dialog</DialogTitle>
                    </DialogContent>
                  </DialogPositioner>
                </Dialog>
              </DialogContent>
            </DialogPositioner>
          </Dialog>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  ));

  await page.getByRole('button', { name: 'Open popover' }).click();
  await page.getByRole('button', { name: 'Open parent' }).click();
  await expect.element(page.getByRole('dialog', { name: 'Parent dialog' })).toBeVisible();
  const nestedTrigger = page.getByRole('button', { name: 'Open nested' });
  await nestedTrigger.click();
  const nested = page.getByRole('dialog', { name: 'Nested dialog' });
  await expect.element(nested).toBeFocused();
  await nested.press('Escape');
  await expect.element(nested).toHaveCount(0);
  await expect.element(nestedTrigger).toBeFocused();
  await expect.element(page.getByRole('dialog', { name: 'Parent dialog' })).toBeVisible();
  await nestedTrigger.press('Escape');
  await expect.element(page.getByRole('dialog', { name: 'Parent dialog' })).toHaveCount(0);
  await expect.element(page.getByRole('button', { name: 'Open parent' })).toBeFocused();
});

test('passes dynamic children through CloseIcon and keeps the default icon and close action', async () => {
  const [custom, setCustom] = createSignal(false);
  render(() => (
    <Dialog defaultOpen portalled={false}>
      <DialogParts>
        <DialogCloseIcon>
          {custom() ? [[<span data-testid="custom-close">Dismiss</span>]] : false}
        </DialogCloseIcon>
      </DialogParts>
    </Dialog>
  ));

  const button = document.querySelector<HTMLButtonElement>('[data-slot="dialog-close-icon"]')!;
  expect(button.querySelector('svg')).not.toBeNull();
  setCustom(true);
  await expect.element(page.getByTestId('custom-close')).toHaveText('Dismiss');
  expect(button.querySelector('svg')).toBeNull();
  expect(document.querySelector('[data-slot="dialog-close-icon"]')).toBe(button);
  setCustom(false);
  await expect.element(page.getByTestId('custom-close')).toHaveCount(0);
  expect(button.querySelector('svg')).not.toBeNull();
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
});

test('keeps page interaction available for a non-modal dialog', async () => {
  render(() => (
    <Dialog defaultOpen modal={false} portalled={false}>
      <DialogParts>
        <DialogContext>{(dialog) => <output>Open: {String(dialog().open)}</output>}</DialogContext>
      </DialogParts>
    </Dialog>
  ));

  await expect.element(page.getByRole('dialog')).toHaveCSS('pointer-events', 'auto');
  await expect
    .element(page.locator('[data-slot="dialog-positioner"]'))
    .toHaveCSS('pointer-events', 'none');
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

test('closes on Escape, preserves open-change details, and restores focus to its trigger', async () => {
  const details: Array<{ open: boolean }> = [];
  render(() => (
    <Dialog onOpenChange={(detail) => details.push(detail)}>
      <DialogTrigger asChild={(props) => <Button {...props()}>Open dialog</Button>} />
      <DialogParts />
    </Dialog>
  ));

  const trigger = page.getByRole('button', { name: 'Open dialog' });
  await trigger.click();
  await expect.poll(() => details).toEqual([{ open: true }]);
  await expect.element(page.getByRole('dialog')).toBeFocused();
  await page.getByRole('dialog').press('Escape');

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(details).toEqual([{ open: true }, { open: false }]);
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
        <DialogTrigger
          asChild={(triggerProps) => <Button {...triggerProps()}>Open dialog</Button>}
        />
        <DialogParts>
          <DialogCloseTrigger>Close dialog</DialogCloseTrigger>
        </DialogParts>
      </Dialog>
    );
  }

  render(() => <ControlledDialog />);

  await page.getByRole('button', { name: 'Open dialog' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close dialog' }).click();

  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);
});

test('renders overlays inline when portalled is false', async () => {
  render(() => (
    <div data-testid="dialog-host">
      <Dialog defaultOpen portalled={false}>
        <DialogParts />
      </Dialog>
    </div>
  ));

  await expect.element(page.getByTestId('dialog-host').getByRole('dialog')).toBeAttached();
});

test('portals overlays outside the root tree by default', async () => {
  const { container } = render(() => (
    <Dialog defaultOpen>
      <DialogParts />
    </Dialog>
  ));

  expect(container.querySelector('[role="dialog"]')).toBeNull();
  await expect.element(page.getByRole('dialog')).toBeAttached();
});

test('portals overlays into portalRef when provided', async () => {
  function DialogWithCustomPortal() {
    let portalRef!: HTMLDivElement;

    return (
      <>
        <div ref={(element) => (portalRef = element)} data-testid="dialog-portal" />
        <Dialog defaultOpen portalRef={() => portalRef}>
          <DialogParts />
        </Dialog>
      </>
    );
  }

  render(() => <DialogWithCustomPortal />);

  await expect.element(page.getByTestId('dialog-portal').getByRole('dialog')).toBeAttached();
});

test('opens a RootProvider dialog from external state and updates context', async () => {
  function RootProviderDialog() {
    const dialog = useDialog();

    return (
      <>
        <Button onClick={() => dialog().setOpen(true)}>Open via API</Button>
        <DialogRootProvider value={dialog}>
          <DialogContext>
            {(context) => <output>Open: {String(context().open)}</output>}
          </DialogContext>
          <DialogParts />
        </DialogRootProvider>
      </>
    );
  }

  render(() => <RootProviderDialog />);
  await expect.element(page.getByText('Open: false')).toBeAttached();
  await page.getByRole('button', { name: 'Open via API' }).click();

  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

test('closes with the close icon and restores focus to the trigger', async () => {
  render(() => (
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogParts>
        <DialogCloseIcon />
      </DialogParts>
    </Dialog>
  ));

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
  let contentRef!: HTMLDivElement;
  let titleRef!: HTMLHeadingElement;
  let descriptionRef!: HTMLDivElement;
  let closeTriggerRef!: HTMLButtonElement;
  let composedTriggerRef: HTMLButtonElement | undefined;
  let closeIconRef: HTMLButtonElement | undefined;

  render(() => (
    <Dialog defaultOpen portalled={false}>
      <DialogTrigger ref={(element) => (triggerRef = element)}>Open dialog</DialogTrigger>
      <DialogTrigger
        ref={(element) => (composedTriggerRef = element)}
        asChild={(triggerProps) => <button {...triggerProps()}>Composed trigger</button>}
      />
      <DialogBackdrop ref={(element) => (backdropRef = element)} />
      <DialogPositioner ref={(element) => (positionerRef = element)}>
        <DialogContent ref={(element) => (contentRef = element)}>
          <DialogTitle ref={(element) => (titleRef = element)}>Preferences</DialogTitle>
          <DialogDescription ref={(element) => (descriptionRef = element)}>
            Description
          </DialogDescription>
          <DialogCloseTrigger ref={(element) => (closeTriggerRef = element)}>
            Close
          </DialogCloseTrigger>
          <DialogCloseIcon ref={(element) => (closeIconRef = element)} />
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  ));

  expect(triggerRef.getAttribute('data-slot')).toBe('dialog-trigger');
  expect(backdropRef.getAttribute('data-slot')).toBe('dialog-backdrop');
  expect(positionerRef.getAttribute('data-slot')).toBe('dialog-positioner');
  expect(contentRef.getAttribute('data-slot')).toBe('dialog-content');
  expect(titleRef.getAttribute('data-slot')).toBe('dialog-title');
  expect(descriptionRef.getAttribute('data-slot')).toBe('dialog-description');
  expect(closeTriggerRef.getAttribute('data-slot')).toBe('dialog-close-trigger');
  expect(composedTriggerRef).toBeUndefined();
  expect(closeIconRef).toBeUndefined();
});