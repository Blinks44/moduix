import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/button';
import {
  FloatingPanel,
  FloatingPanelContext,
  FloatingPanelRootProvider,
  FloatingPanelTrigger,
  FloatingPanelPositioner,
  FloatingPanelContent,
  FloatingPanelDragTrigger,
  FloatingPanelHeader,
  FloatingPanelTitle,
  FloatingPanelControl,
  FloatingPanelStageTrigger,
  FloatingPanelCloseIcon,
  FloatingPanelBody,
  FloatingPanelFooter,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelDragIndicator,
  useFloatingPanel,
} from '@/components/floating-panel/FloatingPanel';

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
    <FloatingPanelPositioner>
      <FloatingPanelContent autoFocus={autoFocus} className={className}>
        <FloatingPanelDragTrigger>
          <FloatingPanelHeader className={custom ? 'border-b-primary/80 bg-primary/90' : undefined}>
            <FloatingPanelTitle className={custom ? 'text-primary-foreground' : undefined}>
              <FloatingPanelDragIndicator
                className={custom ? 'text-primary-foreground' : undefined}
              />
              <span className={titleTextClassName}>{title}</span>
            </FloatingPanelTitle>
            <FloatingPanelControl>
              <FloatingPanelStageTrigger
                className={
                  custom ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined
                }
                stage="minimized"
              />
              <FloatingPanelStageTrigger
                className={
                  custom ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined
                }
                stage="maximized"
              />
              <FloatingPanelStageTrigger
                className={
                  custom ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined
                }
                stage="default"
              />
              <FloatingPanelCloseIcon
                className={
                  custom ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined
                }
              />
            </FloatingPanelControl>
          </FloatingPanelHeader>
        </FloatingPanelDragTrigger>
        <FloatingPanelBody>{children}</FloatingPanelBody>
        {footer ? (
          <FloatingPanelFooter
            className={custom ? 'border-t-primary/80 text-primary-foreground' : undefined}
          >
            {footer}
          </FloatingPanelFooter>
        ) : null}
        <FloatingPanelResizeTriggerGroup />
      </FloatingPanelContent>
    </FloatingPanelPositioner>
  );
}

export const Basic: Story = {
  render: () => (
    <FloatingPanel defaultSize={DEFAULT_SIZE}>
      <FloatingPanelTrigger asChild>
        <Button>Open panel</Button>
      </FloatingPanelTrigger>
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
          <FloatingPanelTrigger asChild>
            <Button>{open ? 'Focus panel' : 'Open controlled panel'}</Button>
          </FloatingPanelTrigger>
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
          <FloatingPanelTrigger asChild>
            <Button>Open positioned panel</Button>
          </FloatingPanelTrigger>
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
          <FloatingPanelTrigger asChild>
            <Button>Open resizable panel</Button>
          </FloatingPanelTrigger>
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
      <FloatingPanelTrigger asChild>
        <Button>Open panel</Button>
      </FloatingPanelTrigger>
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
      <FloatingPanelTrigger asChild>
        <Button>Open from trigger</Button>
      </FloatingPanelTrigger>
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
        <FloatingPanelTrigger asChild>
          <Button>Open context panel</Button>
        </FloatingPanelTrigger>
        <FloatingPanelContext>
          {(panel) => (
            <span className={statusClassName}>
              open: {String(panel.open)}, dragging: {String(panel.dragging)}
            </span>
          )}
        </FloatingPanelContext>
      </div>
      <FloatingPanelSurface title="Context state">
        <p>FloatingPanelContext exposes the panel API to descendants.</p>
      </FloatingPanelSurface>
    </FloatingPanel>
  ),
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: () => {
    const panel = useFloatingPanel({ defaultSize: DEFAULT_SIZE, persistRect: true });

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
        <FloatingPanelRootProvider value={panel}>
          <FloatingPanelSurface title="Root provider">
            <p>useFloatingPanel owns state outside the rendered panel tree.</p>
          </FloatingPanelSurface>
        </FloatingPanelRootProvider>
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
          <FloatingPanelTrigger asChild>
            <Button>Open lazy panel</Button>
          </FloatingPanelTrigger>
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
      <FloatingPanelTrigger asChild>
        <Button>Open styled panel</Button>
      </FloatingPanelTrigger>
      <FloatingPanelSurface
        title="Custom styling"
        className="border-primary/80 bg-primary text-primary-foreground shadow-lg"
      >
        <p>Tailwind utilities change the visual treatment without changing Ark composition.</p>
      </FloatingPanelSurface>
    </FloatingPanel>
  ),
};