import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/button';
import { FloatingPanel } from '@/components/floating-panel/FloatingPanel';

const DEFAULT_SIZE = { width: 360, height: 260 };
const DEFAULT_POSITION = { x: 160, y: 140 };
const stackClassName = 'flex flex-col items-center gap-3';
const triggerGroupClassName = 'flex flex-wrap items-center justify-center gap-2';
const titleTextClassName = 'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap';
const bodyStackClassName = 'grid gap-3';
const statusClassName = 'text-sm leading-5 text-muted-foreground';
const metricGridClassName = 'grid grid-cols-2 gap-2';
const metricClassName = 'grid gap-1 rounded-md border border-border bg-background p-3';

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
  const custom = className != null;

  return (
    <FloatingPanel.Positioner>
      <FloatingPanel.Content autoFocus={autoFocus} className={className}>
        <FloatingPanel.DragTrigger>
          <FloatingPanel.Header
            className={custom ? 'border-b-primary/80 bg-primary/90' : undefined}
          >
            <FloatingPanel.Title className={custom ? 'text-primary-foreground' : undefined}>
              <FloatingPanel.DragIndicator
                className={custom ? 'text-primary-foreground' : undefined}
              />
              <span className={titleTextClassName}>{title}</span>
            </FloatingPanel.Title>
            <FloatingPanel.Control>
              <FloatingPanel.StageTrigger
                className={
                  custom ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined
                }
                stage="minimized"
              />
              <FloatingPanel.StageTrigger
                className={
                  custom ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined
                }
                stage="maximized"
              />
              <FloatingPanel.StageTrigger
                className={
                  custom ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined
                }
                stage="default"
              />
              <FloatingPanel.CloseIcon
                className={
                  custom ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined
                }
              />
            </FloatingPanel.Control>
          </FloatingPanel.Header>
        </FloatingPanel.DragTrigger>
        <FloatingPanel.Body>{children}</FloatingPanel.Body>
        {footer ? (
          <FloatingPanel.Footer
            className={custom ? 'border-t-primary/80 text-primary-foreground' : undefined}
          >
            {footer}
          </FloatingPanel.Footer>
        ) : null}
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
        footer={<span className={statusClassName}>Last synced just now</span>}
      >
        <div className={bodyStackClassName}>
          <p>Drag the header to move this panel and resize it from any edge.</p>
          <div className={metricGridClassName}>
            <div className={metricClassName}>
              <span className="text-xs text-muted-foreground">Width</span>
              <strong className="text-lg">360</strong>
            </div>
            <div className={metricClassName}>
              <span className="text-xs text-muted-foreground">Height</span>
              <strong className="text-lg">260</strong>
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
      <div className={stackClassName}>
        <span className={statusClassName}>Panel is {open ? 'open' : 'closed'}</span>
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
      <div className={stackClassName}>
        <span className={statusClassName}>
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
      <div className={stackClassName}>
        <span className={statusClassName}>
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
      <div className={stackClassName}>
        <FloatingPanel.Trigger asChild>
          <Button>Open context panel</Button>
        </FloatingPanel.Trigger>
        <FloatingPanel.Context>
          {(panel) => (
            <span className={statusClassName}>
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
      <div className={stackClassName}>
        <div className={triggerGroupClassName}>
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
      <div className={stackClassName}>
        <span className={statusClassName}>Exit completions: {exits}</span>
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
      <FloatingPanelSurface
        title="Custom styling"
        className="border-primary/80 bg-primary text-primary-foreground shadow-lg"
      >
        <p>Tailwind utilities change the visual treatment without changing Ark composition.</p>
      </FloatingPanelSurface>
    </FloatingPanel>
  ),
};