import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
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

  await page.getByRole('button', { name: 'Minimize window', exact: true }).click();

  await expect.element(page.getByTestId('footer')).toHaveAttribute('data-minimized');
});

test('keeps Ark translations for default stage controls', async () => {
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

  await expect
    .element(page.getByRole('button', { name: 'Minimieren', exact: true }))
    .toBeAttached();
  await expect
    .element(page.getByRole('button', { name: 'Maximieren', exact: true }))
    .toBeAttached();
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

  await expect.element(page.getByRole('dialog')).toHaveCount(0);

  await page.getByRole('button', { name: 'Open inspector', exact: true }).click();

  await expect
    .element(page.getByRole('dialog'))
    .toHaveAttribute('data-slot', 'floating-panel-content');

  await page.getByRole('dialog').press('Escape');

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect
    .element(page.getByRole('button', { name: 'Open inspector', exact: true }))
    .toBeFocused();
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

  await page.getByRole('button', { name: 'Open controlled inspector', exact: true }).click();

  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(page.locator('[data-slot="floating-panel-close-trigger"]')).toBeAttached();
  await page.locator('[data-slot="floating-panel-close-trigger"]').click();

  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);
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

  await page.getByRole('button', { name: 'Open via API', exact: true }).click();

  await expect.element(page.getByRole('dialog')).toBeAttached();
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

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(
    <FloatingPanel defaultOpen defaultSize={{ width: 360, height: 260 }} portalled={false}>
      <FloatingPanelPositioner>
        <FloatingPanelContent className="min-h-0 min-w-0" />
      </FloatingPanelPositioner>
    </FloatingPanel>,
  );

  const content = screen.getByRole('dialog');
  expect([...content!.classList]).toEqual(expect.arrayContaining(['min-h-0', 'min-w-0']));
  expect(['min-h-40', 'min-w-64'].some((name) => content!.classList.contains(name))).toBe(false);

  await expect
    .element(page.locator('[data-slot="floating-panel-content"]'))
    .toHaveCSS('min-height', '0px');
  await expect
    .element(page.locator('[data-slot="floating-panel-content"]'))
    .toHaveCSS('min-width', '0px');
});

test('keeps visual utilities on empty owned parts', async () => {
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

  expect([...screen.getByRole('dialog').classList]).toEqual(
    expect.arrayContaining(['min-h-40', 'min-w-64', 'bg-popover', 'shadow-lg']),
  );
  expect([...screen.getByTestId('header').classList]).toEqual(
    expect.arrayContaining(['min-h-control-xl', 'bg-muted', 'border-b']),
  );
  expect([...screen.getByTestId('control').classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'gap-1']),
  );
  expect([...screen.getByRole('button', { name: 'Minimize window' }).classList]).toEqual(
    expect.arrayContaining(['size-control-sm', 'border']),
  );
  expect([...screen.getByTestId('drag-indicator').classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'flex-none']),
  );
  expect([...screen.getByTestId('body').classList]).toEqual(
    expect.arrayContaining(['p-4', 'text-sm']),
  );
  expect([...screen.getByTestId('footer').classList]).toEqual(
    expect.arrayContaining(['border-t', 'px-3', 'py-1', 'text-xs']),
  );
});