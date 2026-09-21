import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  FloatingPanel,
  FloatingPanelRootProvider,
  FloatingPanelTrigger,
  FloatingPanelPositioner,
  FloatingPanelContent,
  FloatingPanelDragTrigger,
  FloatingPanelHeader,
  FloatingPanelTitle,
  FloatingPanelControl,
  FloatingPanelStageTrigger,
  FloatingPanelCloseTrigger,
  FloatingPanelBody,
  FloatingPanelFooter,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelDragIndicator,
  useFloatingPanel,
} from '../src';

function PanelContent({ footer }: { footer?: ReactNode }) {
  return (
    <FloatingPanelPositioner>
      <FloatingPanelContent>
        <FloatingPanelDragTrigger>
          <FloatingPanelHeader>
            <FloatingPanelTitle>Inspector</FloatingPanelTitle>
            <FloatingPanelControl>
              <FloatingPanelStageTrigger stage="minimized" />
            </FloatingPanelControl>
          </FloatingPanelHeader>
        </FloatingPanelDragTrigger>
        <FloatingPanelBody>Panel content</FloatingPanelBody>
        {footer}
      </FloatingPanelContent>
    </FloatingPanelPositioner>
  );
}

test('marks the footer as minimized with the panel', async () => {
  render(
    <FloatingPanel defaultOpen defaultSize={{ width: 360, height: 260 }} portalled={false}>
      <PanelContent
        footer={<FloatingPanelFooter data-testid="footer">Status</FloatingPanelFooter>}
      />
    </FloatingPanel>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Minimize window' }));

  await waitFor(() => expect(screen.getByTestId('footer')).toHaveAttribute('data-minimized'));
});

test('keeps Ark translations for default stage controls', () => {
  render(
    <FloatingPanel
      defaultOpen
      defaultSize={{ width: 360, height: 260 }}
      portalled={false}
      translations={{
        minimize: 'Minimieren',
        maximize: 'Maximieren',
        restore: 'Wiederherstellen',
      }}
    >
      <FloatingPanelPositioner>
        <FloatingPanelContent>
          <FloatingPanelControl>
            <FloatingPanelStageTrigger stage="minimized" />
            <FloatingPanelStageTrigger stage="maximized" />
          </FloatingPanelControl>
        </FloatingPanelContent>
      </FloatingPanelPositioner>
    </FloatingPanel>,
  );

  expect(screen.getByRole('button', { name: 'Minimieren' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Maximieren' })).toBeInTheDocument();
});

test('lazily mounts, closes on Escape, and restores focus to its trigger', async () => {
  render(
    <FloatingPanel portalled={false}>
      <FloatingPanelTrigger asChild>
        <button type="button">Open inspector</button>
      </FloatingPanelTrigger>
      <PanelContent />
    </FloatingPanel>,
  );

  const trigger = screen.getByRole('button', { name: 'Open inspector' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  fireEvent.click(trigger);
  const dialog = await screen.findByRole('dialog');
  expect(dialog).toHaveAttribute('data-slot', 'floating-panel-content');

  fireEvent.keyDown(dialog, { key: 'Escape' });

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
});

test('preserves Ark open-change detail objects in controlled mode', async () => {
  const details: Array<{ open: boolean }> = [];

  function ControlledFloatingPanel() {
    const [open, setOpen] = useState(false);

    return (
      <FloatingPanel
        open={open}
        portalled={false}
        onOpenChange={(detail) => {
          details.push(detail);
          setOpen(detail.open);
        }}
      >
        <FloatingPanelTrigger asChild>
          <button type="button">Open controlled inspector</button>
        </FloatingPanelTrigger>
        <FloatingPanelPositioner>
          <FloatingPanelContent>
            <FloatingPanelDragTrigger>
              <FloatingPanelHeader>
                <FloatingPanelTitle>Controlled inspector</FloatingPanelTitle>
                <FloatingPanelControl>
                  <FloatingPanelCloseTrigger>Close inspector</FloatingPanelCloseTrigger>
                </FloatingPanelControl>
              </FloatingPanelHeader>
            </FloatingPanelDragTrigger>
            <FloatingPanelBody>Panel content</FloatingPanelBody>
          </FloatingPanelContent>
        </FloatingPanelPositioner>
      </FloatingPanel>
    );
  }

  render(<ControlledFloatingPanel />);

  fireEvent.click(screen.getByRole('button', { name: 'Open controlled inspector' }));
  await screen.findByRole('dialog');
  const closeTrigger = document.querySelector('[data-slot="floating-panel-close-trigger"]');
  expect(closeTrigger).toBeInTheDocument();
  fireEvent.click(closeTrigger!);

  await waitFor(() => expect(details).toEqual([{ open: true }, { open: false }]));
});

test('opens a RootProvider panel through the public state hook', async () => {
  function RootProviderFloatingPanel() {
    const panel = useFloatingPanel({
      defaultSize: { width: 360, height: 260 },
      persistRect: true,
    });

    return (
      <>
        <button type="button" onClick={() => panel.setOpen(true)}>
          Open via API
        </button>
        <FloatingPanelRootProvider value={panel} portalled={false}>
          <PanelContent />
        </FloatingPanelRootProvider>
      </>
    );
  }

  render(<RootProviderFloatingPanel />);

  fireEvent.click(screen.getByRole('button', { name: 'Open via API' }));

  expect(await screen.findByRole('dialog')).toBeInTheDocument();
});

test('renders only the requested resize handles through ResizeTriggerGroup', () => {
  render(
    <FloatingPanel defaultOpen defaultSize={{ width: 360, height: 260 }} portalled={false}>
      <FloatingPanelPositioner>
        <FloatingPanelContent>
          <FloatingPanelResizeTriggerGroup axes={['e', 's', 'se']} />
        </FloatingPanelContent>
      </FloatingPanelPositioner>
    </FloatingPanel>,
  );

  expect(
    Array.from(document.querySelectorAll('[data-slot="floating-panel-resize-trigger"]')).map(
      (handle) => handle.getAttribute('data-axis'),
    ),
  ).toEqual(['e', 's', 'se']);
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <FloatingPanel defaultOpen defaultSize={{ width: 360, height: 260 }} portalled={false}>
      <FloatingPanelPositioner>
        <FloatingPanelContent className="min-h-0 min-w-0" />
      </FloatingPanelPositioner>
    </FloatingPanel>,
  );

  const content = screen.getByRole('dialog');
  expect(content).toHaveClass('min-h-0', 'min-w-0');
  expect(content).not.toHaveClass('min-h-40', 'min-w-64');
});

test('keeps visual utilities on empty owned parts', () => {
  render(
    <FloatingPanel defaultOpen defaultSize={{ width: 360, height: 260 }} portalled={false}>
      <FloatingPanelPositioner>
        <FloatingPanelContent>
          <FloatingPanelHeader data-testid="header">
            <FloatingPanelTitle>
              <FloatingPanelDragIndicator data-testid="drag-indicator" />
            </FloatingPanelTitle>
            <FloatingPanelControl data-testid="control">
              <FloatingPanelStageTrigger stage="minimized" />
            </FloatingPanelControl>
          </FloatingPanelHeader>
          <FloatingPanelBody data-testid="body" />
          <FloatingPanelFooter data-testid="footer" />
        </FloatingPanelContent>
      </FloatingPanelPositioner>
    </FloatingPanel>,
  );

  expect(screen.getByRole('dialog')).toHaveClass('min-h-40', 'min-w-64', 'bg-popover', 'shadow-lg');
  expect(screen.getByTestId('header')).toHaveClass('min-h-control-xl', 'bg-muted', 'border-b');
  expect(screen.getByTestId('control')).toHaveClass('inline-flex', 'gap-1');
  expect(screen.getByRole('button', { name: 'Minimize window' })).toHaveClass(
    'size-control-sm',
    'border',
  );
  expect(screen.getByTestId('drag-indicator')).toHaveClass('inline-flex', 'flex-none');
  expect(screen.getByTestId('body')).toHaveClass('p-4', 'text-sm');
  expect(screen.getByTestId('footer')).toHaveClass('border-t', 'px-3', 'py-2', 'text-xs');
});
