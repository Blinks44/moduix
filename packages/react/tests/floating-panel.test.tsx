import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
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