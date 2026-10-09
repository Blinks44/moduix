import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef, type ReactNode, useState } from 'react';
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

function DrawerParts({ children }: { children?: ReactNode }) {
  return (
    <DrawerPositioner>
      <DrawerContent>
        <DrawerTitle>Preferences</DrawerTitle>
        {children}
      </DrawerContent>
    </DrawerPositioner>
  );
}

function DrawerStateReadout() {
  const drawer = useDrawerContext();

  return (
    <output data-testid="drawer-state">
      {`${drawer.swipeDirection}:${drawer.snapPoints.join(',')}:${String(drawer.snapPoint)}`}
    </output>
  );
}

test('keeps page interaction available for a non-modal drawer', async () => {
  render(
    <Drawer defaultOpen modal={false} portalled={false}>
      <DrawerParts />
    </Drawer>,
  );

  await expect.element(page.getByRole('dialog')).toHaveCSS('pointer-events', 'auto');
  await expect
    .element(page.locator('[data-slot="drawer-positioner"]'))
    .toHaveCSS('pointer-events', 'none');
});

test('lazily mounts, preserves open-change details, and restores focus after Escape', async () => {
  const details: Array<{ open: boolean }> = [];
  render(
    <Drawer onOpenChange={(detail) => details.push(detail)}>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerParts />
    </Drawer>,
  );
  const trigger = page.getByRole('button', { name: 'Open drawer' });
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await trigger.click();
  await expect.element(page.getByRole('dialog')).toBeFocused();
  expect(details).toEqual([{ open: true }]);
  await page.getByRole('dialog').press('Escape');
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
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
        <DrawerParts>
          <DrawerCloseTrigger>Close drawer</DrawerCloseTrigger>
        </DrawerParts>
      </Drawer>
    );
  }

  render(<ControlledDrawer />);

  await page.getByRole('button', { name: 'Open drawer' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close drawer' }).click();

  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
});

test.each(['touch', 'mouse'])(
  'drags content outside the grabber and dismisses it (%s)',
  async (pointerType) => {
    const details: Array<{ open: boolean }> = [];
    render(
      <Drawer defaultOpen onOpenChange={(detail) => details.push(detail)}>
        <DrawerParts>
          <div data-testid="drawer-body">Body</div>
        </DrawerParts>
      </Drawer>,
    );
    await expect.element(page.getByRole('dialog')).toBeFocused();
    const content = document.querySelector('[role="dialog"]')!;
    const body = document.querySelector('[data-testid="drawer-body"]')!;
    const { left, top, width } = body.getBoundingClientRect();
    const y = top + 2;
    const height = content.getBoundingClientRect().height;
    expect(height).toBeGreaterThan(0);
    // Rstest locators do not expose a pointer sequence with an explicit pointerType.
    const pointer = {
      bubbles: true,
      cancelable: true,
      button: 0,
      buttons: 1,
      pointerId: 1,
      pointerType,
      clientX: left + width / 2,
    };
    body.dispatchEvent(new PointerEvent('pointerdown', { ...pointer, clientY: y }));
    body.dispatchEvent(new PointerEvent('pointermove', { ...pointer, clientY: y + 60 }));
    await expect.element(page.getByRole('dialog')).toHaveAttribute('data-dragging', '');
    body.dispatchEvent(new PointerEvent('pointermove', { ...pointer, clientY: y + height }));
    body.dispatchEvent(
      new PointerEvent('pointerup', { ...pointer, buttons: 0, clientY: y + height }),
    );
    await expect.poll(() => details).toEqual([{ open: false }]);
    await expect.element(page.getByRole('dialog')).toHaveCount(0);
  },
);

test('forwards a ref through native asChild composition', () => {
  const contentRef = createRef<HTMLElement>();

  render(
    <Drawer defaultOpen portalled={false}>
      <DrawerPositioner>
        <DrawerContent
          ref={(element) => {
            contentRef.current = element;
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

  expect(contentRef.current).toBe(document.querySelector('[role="dialog"]'));
  expect(contentRef.current?.tagName).toBe('SECTION');
});

test('opens a RootProvider drawer from external state', async () => {
  function RootProviderDrawer() {
    const drawer = useDrawer();

    return (
      <>
        <Button onClick={() => drawer.setOpen(true)}>Open via API</Button>
        <DrawerRootProvider value={drawer}>
          <DrawerParts />
        </DrawerRootProvider>
      </>
    );
  }

  render(<RootProviderDrawer />);
  await page.getByRole('button', { name: 'Open via API' }).click();

  await expect.element(page.getByRole('dialog')).toBeVisible();
});

test('marks an island drawer and closes it through its accessible close icon', async () => {
  render(
    <Drawer variant="island">
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerParts>
        <DrawerStateReadout />
        <DrawerCloseIcon />
      </DrawerParts>
    </Drawer>,
  );

  const trigger = page.getByRole('button', { name: 'Open drawer' });
  await trigger.click();

  await expect.element(page.getByRole('dialog')).toHaveAttribute('data-variant', 'island');
  await expect.element(page.getByTestId('drawer-state')).toHaveText('down:1:1');
  await expect
    .element(page.locator('[data-slot="drawer-positioner"]'))
    .toHaveAttribute('data-swipe-direction', 'down');
  await page.getByRole('button', { name: 'Close drawer' }).click();

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
});