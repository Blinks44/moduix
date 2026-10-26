import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowTip,
  PopoverBody,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverContext,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverIndicator,
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
    const [open, setOpen] = createSignal(false);

    return (
      <Popover
        open={open()}
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

  render(() => <ControlledPopover />);

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
        Open: {String(popover().open)}. Portalled: {String(popover().portalled)}
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
          <PopoverContext>
            {(context) => <output>Slot: {String(context().open)}</output>}
          </PopoverContext>
        </PopoverRootProvider>
      </div>
    );
  }

  render(() => <ProviderPopover />);

  await page.getByRole('button', { name: 'Open preferences' }).click();
  await expect.element(page.getByText('Open: true. Portalled: false')).toBeVisible();
  await expect.element(page.getByTestId('popover-host').getByRole('dialog')).toBeAttached();
  await expect.element(page.getByText('Slot: true')).toBeAttached();
});

test('preserves semantic hosts with asChild', async () => {
  render(() => (
    <Popover defaultOpen portalled={false}>
      <PopoverTrigger asChild={(props) => <a {...props()} href="#preferences" />}>
        Open preferences
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent asChild={(props) => <section {...props()} />}>
          <PopoverTitle>Preferences</PopoverTitle>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  ));

  await expect
    .element(page.getByRole('link', { name: 'Open preferences' }))
    .toHaveAttribute('href', '#preferences');
  await expect
    .element(page.getByRole('dialog', { name: 'Preferences' }))
    .toHaveJSProperty('tagName', 'SECTION');
});

test('marks only the current trigger when a popover has multiple triggers', async () => {
  render(() => (
    <Popover portalled={false}>
      <PopoverTrigger value="share">Share</PopoverTrigger>
      <PopoverTrigger value="export">Export</PopoverTrigger>
      <PopoverTrigger value="archive">Archive</PopoverTrigger>
      <PopoverSurface />
    </Popover>
  ));

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
  const { container } = render(() => (
    <Popover defaultOpen>
      <PopoverSurface />
    </Popover>
  ));

  expect(container.querySelector('[role="dialog"]')).toBeNull();
  await expect.element(page.getByRole('dialog')).toBeAttached();
});

test('portals content into portalRef when provided', async () => {
  function PopoverWithCustomPortal() {
    let portalRef!: HTMLDivElement;

    return (
      <>
        <div ref={(element) => (portalRef = element)} data-testid="popover-portal" />
        <Popover defaultOpen portalRef={() => portalRef}>
          <PopoverSurface />
        </Popover>
      </>
    );
  }

  render(() => <PopoverWithCustomPortal />);

  await expect.element(page.getByTestId('popover-portal').getByRole('dialog')).toBeAttached();
});

test('keeps modal popovers portalled when portalled is false', async () => {
  const { container } = render(() => (
    <Popover defaultOpen modal portalled={false}>
      <PopoverSurface />
    </Popover>
  ));

  const content = page.getByRole('dialog');

  expect(container.querySelector('[role="dialog"]')).toBeNull();
  await expect.element(content).toHaveAttribute('aria-modal', 'true');
});

test('closes with CloseIcon and restores focus to its trigger', async () => {
  render(() => (
    <Popover portalled={false}>
      <PopoverTrigger>Open preferences</PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverTitle>Preferences</PopoverTitle>
          <PopoverCloseIcon />
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  ));

  const trigger = page.getByRole('button', { name: 'Open preferences' });
  await trigger.click();
  await page.getByRole('button', { name: 'Close popover' }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
});

test('forwards refs through native parts and keeps asChild composition native', () => {
  let anchorRef!: HTMLDivElement;
  let triggerRef!: HTMLButtonElement;
  let indicatorRef!: HTMLDivElement;
  let positionerRef!: HTMLDivElement;
  let contentRef!: HTMLDivElement;
  let arrowRef!: HTMLDivElement;
  let arrowTipRef!: HTMLDivElement;
  let titleRef!: HTMLDivElement;
  let descriptionRef!: HTMLDivElement;
  let closeTriggerRef!: HTMLButtonElement;
  let headerRef!: HTMLDivElement;
  let bodyRef!: HTMLDivElement;
  let footerRef!: HTMLDivElement;
  let composedTriggerRef: HTMLButtonElement | undefined;
  let closeIconRef: HTMLButtonElement | undefined;

  render(() => (
    <Popover defaultOpen portalled={false}>
      <PopoverAnchor ref={(element) => (anchorRef = element)} />
      <PopoverTrigger ref={(element) => (triggerRef = element)}>
        Open popover
        <PopoverIndicator ref={(element) => (indicatorRef = element)} />
      </PopoverTrigger>
      <PopoverTrigger
        ref={(element) => (composedTriggerRef = element)}
        asChild={(props) => <button {...props()}>Composed trigger</button>}
      />
      <PopoverPositioner ref={(element) => (positionerRef = element)}>
        <PopoverContent ref={(element) => (contentRef = element)}>
          <PopoverArrow ref={(element) => (arrowRef = element)}>
            <PopoverArrowTip ref={(element) => (arrowTipRef = element)} />
          </PopoverArrow>
          <PopoverTitle ref={(element) => (titleRef = element)}>Preferences</PopoverTitle>
          <PopoverDescription ref={(element) => (descriptionRef = element)}>
            Description
          </PopoverDescription>
          <PopoverCloseTrigger ref={(element) => (closeTriggerRef = element)}>
            Close
          </PopoverCloseTrigger>
          <PopoverCloseIcon ref={(element) => (closeIconRef = element)} />
          <PopoverHeader ref={(element) => (headerRef = element)} />
          <PopoverBody ref={(element) => (bodyRef = element)} />
          <PopoverFooter ref={(element) => (footerRef = element)} />
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  ));

  expect(anchorRef?.getAttribute('data-slot')).toBe('popover-anchor');
  expect(triggerRef?.getAttribute('data-slot')).toBe('popover-trigger');
  expect(indicatorRef?.getAttribute('data-slot')).toBe('popover-indicator');
  expect(positionerRef?.getAttribute('data-slot')).toBe('popover-positioner');
  expect(contentRef?.getAttribute('data-slot')).toBe('popover-content');
  expect(arrowRef?.getAttribute('data-slot')).toBe('popover-arrow');
  expect(arrowTipRef?.getAttribute('data-slot')).toBe('popover-arrow-tip');
  expect(titleRef?.getAttribute('data-slot')).toBe('popover-title');
  expect(descriptionRef?.getAttribute('data-slot')).toBe('popover-description');
  expect(closeTriggerRef?.getAttribute('data-slot')).toBe('popover-close-trigger');
  expect(headerRef?.getAttribute('data-slot')).toBe('popover-header');
  expect(bodyRef?.getAttribute('data-slot')).toBe('popover-body');
  expect(footerRef?.getAttribute('data-slot')).toBe('popover-footer');
  expect(composedTriggerRef).toBeUndefined();
  expect(closeIconRef).toBeUndefined();
});

// Zag 1.43.3 checks the title before lazy content mounts; enable after the upstream fix.
test.skip('labels lazily mounted content with its title', async () => {
  render(() => (
    <Popover portalled={false}>
      <PopoverTrigger>Open preferences</PopoverTrigger>
      <PopoverSurface />
    </Popover>
  ));
  await page.getByRole('button', { name: 'Open preferences' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(page.getByRole('dialog', { name: 'Preferences' })).toBeVisible();
});