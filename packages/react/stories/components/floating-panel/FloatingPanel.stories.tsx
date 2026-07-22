import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ReactNode } from 'react';
import { Button } from '../../../src/components/button';
import { FloatingPanel } from '../../../src/components/floating-panel/FloatingPanel';
import storyStyles from './FloatingPanel.stories.module.css';

const DEFAULT_SIZE = { width: 360, height: 260 };
const DEFAULT_POSITION = { x: 160, y: 140 };

const meta = {
  title: 'Components/FloatingPanel',
  component: FloatingPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FloatingPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

function FloatingPanelSurface({
  autoFocus,
  footer,
  title,
  children,
  className,
}: {
  autoFocus?: boolean;
  footer?: ReactNode;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <FloatingPanel.Positioner>
      <FloatingPanel.Content autoFocus={autoFocus} className={className}>
        <FloatingPanel.DragTrigger>
          <FloatingPanel.Header>
            <FloatingPanel.Title>
              <FloatingPanel.DragIndicator />
              <span className={storyStyles.titleText}>{title}</span>
            </FloatingPanel.Title>
            <FloatingPanel.Control>
              <FloatingPanel.StageTrigger stage="minimized" />
              <FloatingPanel.StageTrigger stage="maximized" />
              <FloatingPanel.StageTrigger stage="default" />
              <FloatingPanel.CloseIcon />
            </FloatingPanel.Control>
          </FloatingPanel.Header>
        </FloatingPanel.DragTrigger>
        <FloatingPanel.Body>{children}</FloatingPanel.Body>
        {footer ? <FloatingPanel.Footer>{footer}</FloatingPanel.Footer> : null}
        <FloatingPanel.ResizeTriggerGroup />
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  );
}

export const Basic: Story = {
  render: () => (
    <FloatingPanel defaultSize={DEFAULT_SIZE}>
      <FloatingPanel.Trigger asChild>
        <Button>Open panel</Button>
      </FloatingPanel.Trigger>
      <FloatingPanelSurface
        title="Inspector"
        footer={<span className={storyStyles.status}>Last synced just now</span>}
      >
        <div className={storyStyles.bodyStack}>
          <p>Drag the header to move this panel and resize it from any edge.</p>
          <div className={storyStyles.metricGrid}>
            <div className={storyStyles.metric}>
              <span>Width</span>
              <strong>360</strong>
            </div>
            <div className={storyStyles.metric}>
              <span>Height</span>
              <strong>260</strong>
            </div>
          </div>
        </div>
      </FloatingPanelSurface>
    </FloatingPanel>
  ),
};

export const ControlledOpen: Story = {
  name: 'Controlled Open',
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className={storyStyles.stack}>
        <span className={storyStyles.status}>Panel is {open ? 'open' : 'closed'}</span>
        <FloatingPanel
          open={open}
          defaultSize={DEFAULT_SIZE}
          onOpenChange={(details) => setOpen(details.open)}
        >
          <FloatingPanel.Trigger asChild>
            <Button>{open ? 'Focus panel' : 'Open controlled panel'}</Button>
          </FloatingPanel.Trigger>
          <FloatingPanelSurface title="Controlled open">
            <p>Open state is synchronized with React state.</p>
          </FloatingPanelSurface>
        </FloatingPanel>
      </div>
    );
  },
};

export const ControlledPosition: Story = {
  name: 'Controlled Position',
  render: () => {
    const [position, setPosition] = useState(DEFAULT_POSITION);

    return (
      <div className={storyStyles.stack}>
        <span className={storyStyles.status}>
          x: {Math.round(position.x)}, y: {Math.round(position.y)}
        </span>
        <FloatingPanel
          defaultSize={DEFAULT_SIZE}
          position={position}
          onPositionChange={(details) => setPosition(details.position)}
        >
          <FloatingPanel.Trigger asChild>
            <Button>Open positioned panel</Button>
          </FloatingPanel.Trigger>
          <FloatingPanelSurface title="Controlled position">
            <p>Dragging updates the controlled position object.</p>
          </FloatingPanelSurface>
        </FloatingPanel>
      </div>
    );
  },
};

export const ControlledSize: Story = {
  name: 'Controlled Size',
  render: () => {
    const [size, setSize] = useState(DEFAULT_SIZE);

    return (
      <div className={storyStyles.stack}>
        <span className={storyStyles.status}>
          {Math.round(size.width)} x {Math.round(size.height)}
        </span>
        <FloatingPanel size={size} onSizeChange={(details) => setSize(details.size)}>
          <FloatingPanel.Trigger asChild>
            <Button>Open resizable panel</Button>
          </FloatingPanel.Trigger>
          <FloatingPanelSurface title="Controlled size">
            <p>Resize handles update controlled width and height.</p>
          </FloatingPanelSurface>
        </FloatingPanel>
      </div>
    );
  },
};

export const EscapeDismiss: Story = {
  name: 'Escape Dismiss',
  render: () => (
    <FloatingPanel defaultSize={DEFAULT_SIZE}>
      <FloatingPanel.Trigger asChild>
        <Button>Open panel</Button>
      </FloatingPanel.Trigger>
      <FloatingPanelSurface
        autoFocus
        title="Escape dismiss"
        footer="Esc closes the focused topmost panel."
      >
        <p>The content receives focus on open so Escape dismisses the panel immediately.</p>
      </FloatingPanelSurface>
    </FloatingPanel>
  ),
};

export const AnchorPosition: Story = {
  name: 'Anchor Position',
  render: () => (
    <FloatingPanel
      defaultSize={DEFAULT_SIZE}
      getAnchorPosition={({ triggerRect }) => {
        if (!triggerRect) return { x: 0, y: 0 };
        return {
          x: triggerRect.x + triggerRect.width / 2,
          y: triggerRect.y + triggerRect.height + 12,
        };
      }}
    >
      <FloatingPanel.Trigger asChild>
        <Button>Open from trigger</Button>
      </FloatingPanel.Trigger>
      <FloatingPanelSurface title="Anchored start">
        <p>The initial panel position is derived from the trigger rect.</p>
      </FloatingPanelSurface>
    </FloatingPanel>
  ),
};

export const Context: Story = {
  render: () => (
    <FloatingPanel defaultSize={DEFAULT_SIZE}>
      <div className={storyStyles.stack}>
        <FloatingPanel.Trigger asChild>
          <Button>Open context panel</Button>
        </FloatingPanel.Trigger>
        <FloatingPanel.Context>
          {(panel) => (
            <span className={storyStyles.status}>
              open: {String(panel.open)}, dragging: {String(panel.dragging)}
            </span>
          )}
        </FloatingPanel.Context>
      </div>
      <FloatingPanelSurface title="Context state">
        <p>FloatingPanel.Context exposes the panel API to descendants.</p>
      </FloatingPanelSurface>
    </FloatingPanel>
  ),
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: () => {
    const panel = FloatingPanel.useFloatingPanel({ defaultSize: DEFAULT_SIZE, persistRect: true });

    return (
      <div className={storyStyles.stack}>
        <div className={storyStyles.triggerGroup}>
          <Button onClick={() => panel.setOpen(true)}>Open via API</Button>
          <Button variant="outline" onClick={() => panel.maximize()}>
            Maximize
          </Button>
          <Button variant="outline" onClick={() => panel.minimize()}>
            Minimize
          </Button>
        </div>
        <FloatingPanel.RootProvider value={panel}>
          <FloatingPanelSurface title="Root provider">
            <p>FloatingPanel.useFloatingPanel owns state outside the rendered panel tree.</p>
          </FloatingPanelSurface>
        </FloatingPanel.RootProvider>
      </div>
    );
  },
};

export const LazyMount: Story = {
  name: 'Lazy Mount',
  render: () => {
    const [exits, setExits] = useState(0);

    return (
      <div className={storyStyles.stack}>
        <span className={storyStyles.status}>Exit completions: {exits}</span>
        <FloatingPanel
          lazyMount
          unmountOnExit
          defaultSize={DEFAULT_SIZE}
          onExitComplete={() => setExits((count) => count + 1)}
        >
          <FloatingPanel.Trigger asChild>
            <Button>Open lazy panel</Button>
          </FloatingPanel.Trigger>
          <FloatingPanelSurface title="Lazy mounted">
            <p>The panel content mounts on first open and unmounts after exit.</p>
          </FloatingPanelSurface>
        </FloatingPanel>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  name: 'Custom Styling',
  render: () => (
    <FloatingPanel defaultSize={{ width: 380, height: 240 }}>
      <FloatingPanel.Trigger asChild>
        <Button>Open styled panel</Button>
      </FloatingPanel.Trigger>
      <FloatingPanelSurface title="Custom styling" className={storyStyles.customPanel}>
        <p>Theme variables change the visual treatment without changing Ark composition.</p>
      </FloatingPanelSurface>
    </FloatingPanel>
  ),
};