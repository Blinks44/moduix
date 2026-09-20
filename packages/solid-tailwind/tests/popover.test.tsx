import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Popover, usePopover, usePopoverContext } from '../src';

function PopoverSurface() {
  return (
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Title>Preferences</Popover.Title>
      </Popover.Content>
    </Popover.Positioner>
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
        <Popover.Trigger>Open preferences</Popover.Trigger>
        <PopoverSurface />
      </Popover>
    );
  }

  render(() => <ControlledPopover />);

  const trigger = screen.getByRole('button', { name: 'Open preferences' });
  fireEvent.click(trigger);

  const content = await screen.findByRole('dialog', { name: 'Preferences' });
  expect(details).toEqual([{ open: true }]);

  content.focus();
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  fireEvent.keyDown(content, { key: 'Escape' });

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
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
        <Popover.RootProvider value={popover}>
          <Popover.Trigger>Open preferences</Popover.Trigger>
          <PopoverSurface />
          <ContextValue />
        </Popover.RootProvider>
      </div>
    );
  }

  render(() => <ProviderPopover />);

  fireEvent.click(screen.getByRole('button', { name: 'Open preferences' }));

  await waitFor(() => expect(screen.getByText('Open: true. Portalled: false')).toBeVisible());
  await waitFor(() =>
    expect(within(screen.getByTestId('popover-host')).getByRole('dialog')).toBeInTheDocument(),
  );
});

test('preserves semantic hosts with asChild', () => {
  render(() => (
    <Popover defaultOpen portalled={false}>
      <Popover.Trigger asChild={(props) => <a {...props()} href="#preferences" />}>
        Open preferences
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content asChild={(props) => <section {...props()} />}>
          <Popover.Title>Preferences</Popover.Title>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  ));

  expect(screen.getByRole('link', { name: 'Open preferences' })).toHaveAttribute(
    'href',
    '#preferences',
  );
  expect(screen.getByRole('dialog', { name: 'Preferences' })).toHaveProperty('tagName', 'SECTION');
});

test('marks only the current trigger when a popover has multiple triggers', async () => {
  render(() => (
    <Popover portalled={false}>
      <Popover.Trigger value="share">Share</Popover.Trigger>
      <Popover.Trigger value="export">Export</Popover.Trigger>
      <Popover.Trigger value="archive">Archive</Popover.Trigger>
      <PopoverSurface />
    </Popover>
  ));

  const share = screen.getByRole('button', { name: 'Share' });
  const exportTrigger = screen.getByRole('button', { name: 'Export' });
  const archive = screen.getByRole('button', { name: 'Archive' });

  fireEvent.click(share);

  await screen.findByRole('dialog', { name: 'Preferences' });

  expect(share).toHaveAttribute('data-current');
  expect(exportTrigger).not.toHaveAttribute('data-current');
  expect(archive).not.toHaveAttribute('data-current');
});

test('renders inline only when portalled is false', () => {
  render(() => (
    <div data-testid="popover-host">
      <Popover defaultOpen portalled={false}>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Preferences</Popover.Title>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    </div>
  ));

  expect(within(screen.getByTestId('popover-host')).getByRole('dialog')).toBeInTheDocument();
});

test('portals content outside the root tree by default', () => {
  const { container } = render(() => (
    <Popover defaultOpen>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Preferences</Popover.Title>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  ));

  expect(within(container).queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('portals content into portalRef when provided', () => {
  function PopoverWithCustomPortal() {
    let portalRef!: HTMLDivElement;

    return (
      <>
        <div ref={(element) => (portalRef = element)} data-testid="popover-portal" />
        <Popover defaultOpen portalRef={() => portalRef}>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Title>Preferences</Popover.Title>
            </Popover.Content>
          </Popover.Positioner>
        </Popover>
      </>
    );
  }

  render(() => <PopoverWithCustomPortal />);

  expect(within(screen.getByTestId('popover-portal')).getByRole('dialog')).toBeInTheDocument();
});

test('keeps modal popovers portalled when portalled is false', () => {
  const { container } = render(() => (
    <Popover defaultOpen modal portalled={false}>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Preferences</Popover.Title>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  ));

  const content = screen.getByRole('dialog');

  expect(within(container).queryByRole('dialog')).not.toBeInTheDocument();
  expect(content).toHaveAttribute('aria-modal', 'true');
});

test('closes with CloseIcon and restores focus to its trigger', async () => {
  render(() => (
    <Popover portalled={false}>
      <Popover.Trigger>Open preferences</Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Preferences</Popover.Title>
          <Popover.CloseIcon />
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  ));

  const trigger = screen.getByRole('button', { name: 'Open preferences' });
  fireEvent.click(trigger);
  fireEvent.click(await screen.findByRole('button', { name: 'Close popover' }));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
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
      <Popover.Anchor ref={(element) => (anchorRef = element)} />
      <Popover.Trigger ref={(element) => (triggerRef = element)}>
        Open popover
        <Popover.Indicator ref={(element) => (indicatorRef = element)} />
      </Popover.Trigger>
      <Popover.Trigger
        ref={(element) => (composedTriggerRef = element)}
        asChild={(props) => <button {...props()}>Composed trigger</button>}
      />
      <Popover.Positioner ref={(element) => (positionerRef = element)}>
        <Popover.Content ref={(element) => (contentRef = element)}>
          <Popover.Arrow ref={(element) => (arrowRef = element)}>
            <Popover.ArrowTip ref={(element) => (arrowTipRef = element)} />
          </Popover.Arrow>
          <Popover.Title ref={(element) => (titleRef = element)}>Preferences</Popover.Title>
          <Popover.Description ref={(element) => (descriptionRef = element)}>
            Description
          </Popover.Description>
          <Popover.CloseTrigger ref={(element) => (closeTriggerRef = element)}>
            Close
          </Popover.CloseTrigger>
          <Popover.CloseIcon ref={(element) => (closeIconRef = element)} />
          <Popover.Header ref={(element) => (headerRef = element)} />
          <Popover.Body ref={(element) => (bodyRef = element)} />
          <Popover.Footer ref={(element) => (footerRef = element)} />
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  ));

  expect(anchorRef).toHaveAttribute('data-slot', 'popover-anchor');
  expect(triggerRef).toHaveAttribute('data-slot', 'popover-trigger');
  expect(indicatorRef).toHaveAttribute('data-slot', 'popover-indicator');
  expect(positionerRef).toHaveAttribute('data-slot', 'popover-positioner');
  expect(contentRef).toHaveAttribute('data-slot', 'popover-content');
  expect(arrowRef).toHaveAttribute('data-slot', 'popover-arrow');
  expect(arrowTipRef).toHaveAttribute('data-slot', 'popover-arrow-tip');
  expect(titleRef).toHaveAttribute('data-slot', 'popover-title');
  expect(descriptionRef).toHaveAttribute('data-slot', 'popover-description');
  expect(closeTriggerRef).toHaveAttribute('data-slot', 'popover-close-trigger');
  expect(headerRef).toHaveAttribute('data-slot', 'popover-header');
  expect(bodyRef).toHaveAttribute('data-slot', 'popover-body');
  expect(footerRef).toHaveAttribute('data-slot', 'popover-footer');
  expect(composedTriggerRef).toBeUndefined();
  expect(closeIconRef).toBeUndefined();
});

test('exposes the current state through Popover.Context', () => {
  render(() => (
    <Popover defaultOpen portalled={false}>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Preferences</Popover.Title>
          <Popover.Context>
            {(popover) => <output>Open: {String(popover().open)}</output>}
          </Popover.Context>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  ));

  expect(screen.getByText('Open: true')).toBeInTheDocument();
});

test('applies Tailwind defaults to visual parts and lets consumer utilities override them', () => {
  render(() => (
    <Popover defaultOpen portalled={false}>
      <Popover.Trigger class="px-2 text-primary">Open preferences</Popover.Trigger>
      <Popover.Positioner class="max-w-none">
        <Popover.Content data-testid="content" class="bg-card p-6">
          <Popover.CloseIcon class="top-2" />
          <Popover.Header>
            <Popover.Title class="text-lg">Preferences</Popover.Title>
            <Popover.Description>Description</Popover.Description>
          </Popover.Header>
          <Popover.Body class="overflow-hidden">Body</Popover.Body>
          <Popover.Footer class="justify-start">
            <Popover.CloseTrigger class="px-2">Close</Popover.CloseTrigger>
          </Popover.Footer>
          <Popover.Arrow>
            <Popover.ArrowTip class="border-primary" />
          </Popover.Arrow>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  ));

  const trigger = screen.getByRole('button', { name: 'Open preferences' });
  const content = screen.getByTestId('content');
  const positioner = document.querySelector('[data-slot="popover-positioner"]');
  const title = document.querySelector('[data-slot="popover-title"]');
  const body = document.querySelector('[data-slot="popover-body"]');
  const footer = document.querySelector('[data-slot="popover-footer"]');
  const closeTrigger = screen.getByRole('button', { name: 'close' });
  const arrow = document.querySelector('[data-slot="popover-arrow"]');
  const arrowTip = document.querySelector('[data-slot="popover-arrow-tip"]');

  expect(trigger).toHaveClass('px-2', 'text-primary');
  expect(trigger).not.toHaveClass('px-3.5', 'text-foreground');
  expect(positioner).toHaveClass('max-w-none');
  expect(content).toHaveClass('bg-card', 'p-6');
  expect(content).not.toHaveClass('bg-popover', 'p-4');
  expect(title).toHaveClass('text-lg');
  expect(title).not.toHaveClass('text-md');
  expect(body).toHaveClass('min-h-0', 'overflow-hidden');
  expect(footer).toHaveClass('justify-start');
  expect(footer).not.toHaveClass('justify-end');
  expect(closeTrigger).toHaveClass('px-2');
  expect(closeTrigger).not.toHaveClass('px-3.5');
  expect(arrow).toHaveClass('[--arrow-size:var(--spacing-2-5)]');
  expect(arrowTip).toHaveClass('border-primary');
});