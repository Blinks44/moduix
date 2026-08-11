import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { useRef, useState } from 'react';
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
        <Popover.Trigger>Open preferences</Popover.Trigger>
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

test('keeps RootProvider state available through the moduix context hook', async () => {
  function ContextValue() {
    const popover = usePopoverContext();
    return <output>Open: {String(popover.open)}</output>;
  }

  function ProviderPopover() {
    const popover = usePopover();

    return (
      <Popover.RootProvider value={popover} portalled={false}>
        <Popover.Trigger>Open preferences</Popover.Trigger>
        <PopoverSurface />
        <ContextValue />
      </Popover.RootProvider>
    );
  }

  render(<ProviderPopover />);

  fireEvent.click(screen.getByRole('button', { name: 'Open preferences' }));

  await waitFor(() => expect(screen.getByText('Open: true')).toBeVisible());
});

test('preserves semantic hosts with asChild', () => {
  render(
    <Popover defaultOpen portalled={false}>
      <Popover.Trigger asChild>
        <a href="#preferences">Open preferences</a>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content asChild>
          <section>
            <Popover.Title>Preferences</Popover.Title>
          </section>
        </Popover.Content>
      </Popover.Positioner>
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
      <Popover.Trigger value="share">Share</Popover.Trigger>
      <Popover.Trigger value="export">Export</Popover.Trigger>
      <Popover.Trigger value="archive">Archive</Popover.Trigger>
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
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Preferences</Popover.Title>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    </div>,
  );

  expect(within(screen.getByTestId('popover-host')).getByRole('dialog')).toBeInTheDocument();
});

test('portals content outside the root tree by default', () => {
  const { container } = render(
    <Popover defaultOpen>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Preferences</Popover.Title>
        </Popover.Content>
      </Popover.Positioner>
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
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Title>Preferences</Popover.Title>
            </Popover.Content>
          </Popover.Positioner>
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
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Preferences</Popover.Title>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>,
  );

  const content = screen.getByRole('dialog');

  expect(within(container).queryByRole('dialog')).not.toBeInTheDocument();
  expect(content).toHaveAttribute('aria-modal', 'true');
});

test('closes with CloseIcon and restores focus to its trigger', async () => {
  render(
    <Popover portalled={false}>
      <Popover.Trigger>Open preferences</Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Preferences</Popover.Title>
          <Popover.CloseIcon />
        </Popover.Content>
      </Popover.Positioner>
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