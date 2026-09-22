import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { useRef, useState } from 'react';
import {
  Popover,
  PopoverArrow,
  PopoverArrowTip,
  PopoverBody,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
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

  const trigger = screen.getByRole('button', { name: 'Open preferences' });
  fireEvent.click(trigger);

  const content = await screen.findByRole('dialog', { name: 'Preferences' });
  expect(details).toEqual([{ open: true }]);

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

  fireEvent.click(screen.getByRole('button', { name: 'Open preferences' }));

  await waitFor(() => expect(screen.getByText('Open: true. Portalled: false')).toBeVisible());
  expect(within(screen.getByTestId('popover-host')).getByRole('dialog')).toBeInTheDocument();
});

test('preserves semantic hosts with asChild', () => {
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

  expect(screen.getByRole('link', { name: 'Open preferences' })).toHaveAttribute(
    'href',
    '#preferences',
  );
  expect(screen.getByRole('dialog', { name: 'Preferences' })).toHaveProperty('tagName', 'SECTION');
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
  render(
    <div data-testid="popover-host">
      <Popover defaultOpen portalled={false}>
        <PopoverPositioner>
          <PopoverContent>
            <PopoverTitle>Preferences</PopoverTitle>
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    </div>,
  );

  expect(within(screen.getByTestId('popover-host')).getByRole('dialog')).toBeInTheDocument();
});

test('portals content outside the root tree by default', () => {
  const { container } = render(
    <Popover defaultOpen>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverTitle>Preferences</PopoverTitle>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>,
  );

  expect(within(container).queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('portals content into portalRef when provided', () => {
  function PopoverWithCustomPortal() {
    const portalRef = useRef<HTMLDivElement>(null);

    return (
      <>
        <div ref={portalRef} data-testid="popover-portal" />
        <Popover defaultOpen portalRef={portalRef}>
          <PopoverPositioner>
            <PopoverContent>
              <PopoverTitle>Preferences</PopoverTitle>
            </PopoverContent>
          </PopoverPositioner>
        </Popover>
      </>
    );
  }

  render(<PopoverWithCustomPortal />);

  expect(within(screen.getByTestId('popover-portal')).getByRole('dialog')).toBeInTheDocument();
});

test('keeps modal popovers portalled when portalled is false', () => {
  const { container } = render(
    <Popover defaultOpen modal portalled={false}>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverTitle>Preferences</PopoverTitle>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>,
  );

  const content = screen.getByRole('dialog');

  expect(within(container).queryByRole('dialog')).not.toBeInTheDocument();
  expect(content).toHaveAttribute('aria-modal', 'true');
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

  const trigger = screen.getByRole('button', { name: 'Open preferences' });
  fireEvent.click(trigger);
  fireEvent.click(await screen.findByRole('button', { name: 'Close popover' }));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

test('applies Tailwind defaults to visual parts and lets consumer utilities override them', () => {
  render(
    <Popover defaultOpen portalled={false}>
      <PopoverTrigger className="px-2 text-primary">Open preferences</PopoverTrigger>
      <PopoverPositioner className="max-w-none">
        <PopoverContent data-testid="content" className="bg-card p-6">
          <PopoverCloseIcon className="top-2" />
          <PopoverHeader>
            <PopoverTitle className="text-lg">Preferences</PopoverTitle>
            <PopoverDescription>Description</PopoverDescription>
          </PopoverHeader>
          <PopoverBody className="overflow-hidden">Body</PopoverBody>
          <PopoverFooter className="justify-start">
            <PopoverCloseTrigger className="px-2">Close</PopoverCloseTrigger>
          </PopoverFooter>
          <PopoverArrow>
            <PopoverArrowTip className="border-primary" />
          </PopoverArrow>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>,
  );

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
  expect(arrow).toHaveClass('[--arrow-size:var(--spacing-2_5)]');
  expect(arrowTip).toHaveClass('border-primary');
});