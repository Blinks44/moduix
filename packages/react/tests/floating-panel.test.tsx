import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { FloatingPanel } from '../src';

function PanelContent({ footer }: { footer?: ReactNode }) {
  return (
    <FloatingPanel.Positioner>
      <FloatingPanel.Content>
        <FloatingPanel.DragTrigger>
          <FloatingPanel.Header>
            <FloatingPanel.Title>Inspector</FloatingPanel.Title>
            <FloatingPanel.Control>
              <FloatingPanel.StageTrigger stage="minimized" />
            </FloatingPanel.Control>
          </FloatingPanel.Header>
        </FloatingPanel.DragTrigger>
        <FloatingPanel.Body>Panel content</FloatingPanel.Body>
        {footer}
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  );
}

test('marks the footer as minimized with the panel', async () => {
  render(
    <FloatingPanel defaultOpen defaultSize={{ width: 360, height: 260 }} portalled={false}>
      <PanelContent
        footer={<FloatingPanel.Footer data-testid="footer">Status</FloatingPanel.Footer>}
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
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.Control>
            <FloatingPanel.StageTrigger stage="minimized" />
            <FloatingPanel.StageTrigger stage="maximized" />
          </FloatingPanel.Control>
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel>,
  );

  expect(screen.getByRole('button', { name: 'Minimieren' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Maximieren' })).toBeInTheDocument();
});

test('lazily mounts, closes on Escape, and restores focus to its trigger', async () => {
  render(
    <FloatingPanel portalled={false}>
      <FloatingPanel.Trigger asChild>
        <button type="button">Open inspector</button>
      </FloatingPanel.Trigger>
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
        <FloatingPanel.Trigger asChild>
          <button type="button">Open controlled inspector</button>
        </FloatingPanel.Trigger>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header>
                <FloatingPanel.Title>Controlled inspector</FloatingPanel.Title>
                <FloatingPanel.Control>
                  <FloatingPanel.CloseTrigger>Close inspector</FloatingPanel.CloseTrigger>
                </FloatingPanel.Control>
              </FloatingPanel.Header>
            </FloatingPanel.DragTrigger>
            <FloatingPanel.Body>Panel content</FloatingPanel.Body>
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
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
    const panel = FloatingPanel.useFloatingPanel({
      defaultSize: { width: 360, height: 260 },
      persistRect: true,
    });

    return (
      <>
        <button type="button" onClick={() => panel.setOpen(true)}>
          Open via API
        </button>
        <FloatingPanel.RootProvider value={panel} portalled={false}>
          <PanelContent />
        </FloatingPanel.RootProvider>
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
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.ResizeTriggerGroup axes={['e', 's', 'se']} />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel>,
  );

  expect(
    Array.from(document.querySelectorAll('[data-slot="floating-panel-resize-trigger"]')).map(
      (handle) => handle.getAttribute('data-axis'),
    ),
  ).toEqual(['e', 's', 'se']);
});