import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { useRef, useState } from 'react';
import {
  Popover,
  PopoverCloseIcon,
  PopoverContent,
  PopoverPositioner,
  PopoverRootProvider,
  PopoverTitle,
  PopoverTrigger,
  usePopover,
  usePopoverContext,
} from '../src';

function PopoverSurface() {
  return (
    <PopoverPositioner>
      <PopoverContent>
        <PopoverTitle>Preferences</PopoverTitle>
      </PopoverContent>
    </PopoverPositioner>
  );
}

test('preserves open-change details and returns focus after Escape', async () => {
  const details: Array<{ open: boolean }> = [];

  function ControlledPopover() {
    const [open, setOpen] = useState(false);

    return (
      <Popover
        open={open}
        portalled={false}
        onOpenChange={(detail) => {
          details.push(detail);
          setOpen(detail.open);
        }}
      >
        <PopoverTrigger>Open preferences</PopoverTrigger>
        <PopoverSurface />
      </Popover>
    );
  }

  render(<ControlledPopover />);

  const trigger = page.getByRole('button', { name: 'Open preferences' });
  await trigger.click();
  const content = page.getByRole('dialog');
  await expect.element(content).toBeFocused();
  expect(details).toEqual([{ open: true }]);
  await content.press('Escape');
  await expect.element(content).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(details).toEqual([{ open: true }, { open: false }]);
});

test('keeps RootProvider state and portalling configuration available through the moduix context hook', async () => {
  function ContextValue() {
    const popover = usePopoverContext();
    return (
      <output>
        Open: {String(popover.open)}. Portalled: {String(popover.portalled)}
      </output>
    );
  }

  function ProviderPopover() {
    const popover = usePopover({ portalled: false });

    return (
      <div data-testid="popover-host">
        <PopoverRootProvider value={popover}>
          <PopoverTrigger>Open preferences</PopoverTrigger>
          <PopoverSurface />
          <ContextValue />
        </PopoverRootProvider>
      </div>
    );
  }

  render(<ProviderPopover />);

  await page.getByRole('button', { name: 'Open preferences' }).click();
  await expect.element(page.getByText('Open: true. Portalled: false')).toBeVisible();
  await expect.element(page.getByTestId('popover-host').getByRole('dialog')).toBeAttached();
});

test('preserves semantic hosts with asChild', async () => {
  render(
    <Popover defaultOpen portalled={false}>
      <PopoverTrigger asChild>
        <a href="#preferences">Open preferences</a>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent asChild>
          <section>
            <PopoverTitle>Preferences</PopoverTitle>
          </section>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>,
  );

  await expect
    .element(page.getByRole('link', { name: 'Open preferences' }))
    .toHaveAttribute('href', '#preferences');
  await expect
    .element(page.getByRole('dialog', { name: 'Preferences' }))
    .toHaveJSProperty('tagName', 'SECTION');
});

test('marks only the current trigger when a popover has multiple triggers', async () => {
  render(
    <Popover portalled={false}>
      <PopoverTrigger value="share">Share</PopoverTrigger>
      <PopoverTrigger value="export">Export</PopoverTrigger>
      <PopoverTrigger value="archive">Archive</PopoverTrigger>
      <PopoverSurface />
    </Popover>,
  );

  const share = page.getByRole('button', { name: 'Share' });
  const exportTrigger = page.getByRole('button', { name: 'Export' });
  const archive = page.getByRole('button', { name: 'Archive' });
  await share.click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(share).toHaveAttribute('data-current');
  await expect.element(exportTrigger).not.toHaveAttribute('data-current');
  await expect.element(archive).not.toHaveAttribute('data-current');
  await exportTrigger.click();
  await expect.element(exportTrigger).toHaveAttribute('data-current');
  await expect.element(share).not.toHaveAttribute('data-current');
  await expect.element(archive).not.toHaveAttribute('data-current');
  await expect.element(page.getByRole('dialog')).toBeVisible();
});

test('portals content outside the root tree by default', async () => {
  const { container } = render(
    <Popover defaultOpen>
      <PopoverSurface />
    </Popover>,
  );

  expect(container.querySelector('[role="dialog"]')).toBeNull();
  await expect.element(page.getByRole('dialog')).toBeAttached();
});

test('portals content into portalRef when provided', async () => {
  function PopoverWithCustomPortal() {
    const portalRef = useRef<HTMLDivElement>(null);

    return (
      <>
        <div ref={portalRef} data-testid="popover-portal" />
        <Popover defaultOpen portalRef={portalRef}>
          <PopoverSurface />
        </Popover>
      </>
    );
  }

  render(<PopoverWithCustomPortal />);

  await expect.element(page.getByTestId('popover-portal').getByRole('dialog')).toBeAttached();
});

test('keeps modal popovers portalled when portalled is false', async () => {
  const { container } = render(
    <Popover defaultOpen modal portalled={false}>
      <PopoverSurface />
    </Popover>,
  );

  const content = page.getByRole('dialog');

  expect(container.querySelector('[role="dialog"]')).toBeNull();
  await expect.element(content).toHaveAttribute('aria-modal', 'true');
});

test('closes with CloseIcon and restores focus to its trigger', async () => {
  render(
    <Popover portalled={false}>
      <PopoverTrigger>Open preferences</PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverTitle>Preferences</PopoverTitle>
          <PopoverCloseIcon />
        </PopoverContent>
      </PopoverPositioner>
    </Popover>,
  );

  const trigger = page.getByRole('button', { name: 'Open preferences' });
  await trigger.click();
  await page.getByRole('button', { name: 'Close popover' }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
});
// Zag 1.43.3 checks the title before lazy content mounts; enable after the upstream fix.
test.skip('labels lazily mounted content with its title', async () => {
  render(
    <Popover portalled={false}>
      <PopoverTrigger>Open preferences</PopoverTrigger>
      <PopoverSurface />
    </Popover>,
  );
  await page.getByRole('button', { name: 'Open preferences' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(page.getByRole('dialog', { name: 'Preferences' })).toBeVisible();
});