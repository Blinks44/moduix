import { createSignal } from 'solid-js';
import type { JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { FloatingPanel } from '@/components/floating-panel/FloatingPanel';

const DEFAULT_SIZE = { width: 360, height: 260 };
const DEFAULT_POSITION = { x: 160, y: 140 };
const stackClass = 'flex flex-col items-center gap-3';
const triggerGroupClass = 'flex flex-wrap items-center justify-center gap-2';
const titleTextClass = 'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap';
const bodyStackClass = 'grid gap-3';
const statusClass = 'text-sm leading-5 text-muted-foreground';
const metricGridClass = 'grid grid-cols-2 gap-2';
const metricClass = 'grid gap-1 rounded-md border border-border bg-background p-3';

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

function FloatingPanelSurface(props: {
  autofocus?: boolean;
  footer?: JSX.Element;
  title: string;
  children?: JSX.Element;
  class?: string;
}) {
  const custom = props.class != null;

  return (
    <FloatingPanel.Positioner>
      <FloatingPanel.Content autofocus={props.autofocus} class={props.class}>
        <FloatingPanel.DragTrigger>
          <FloatingPanel.Header class={custom ? 'border-b-primary/80 bg-primary/90' : undefined}>
            <FloatingPanel.Title class={custom ? 'text-primary-foreground' : undefined}>
              <FloatingPanel.DragIndicator class={custom ? 'text-primary-foreground' : undefined} />
              <span class={titleTextClass}>{props.title}</span>
            </FloatingPanel.Title>
            <FloatingPanel.Control>
              <FloatingPanel.StageTrigger
                class={
                  custom ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined
                }
                stage="minimized"
              />
              <FloatingPanel.StageTrigger
                class={
                  custom ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined
                }
                stage="maximized"
              />
              <FloatingPanel.StageTrigger
                class={
                  custom ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined
                }
                stage="default"
              />
              <FloatingPanel.CloseIcon
                class={
                  custom ? 'border-primary/70 bg-primary/80 text-primary-foreground' : undefined
                }
              />
            </FloatingPanel.Control>
          </FloatingPanel.Header>
        </FloatingPanel.DragTrigger>
        <FloatingPanel.Body>{props.children}</FloatingPanel.Body>
        {props.footer ? (
          <FloatingPanel.Footer
            class={custom ? 'border-t-primary/80 text-primary-foreground' : undefined}
          >
            {props.footer}
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
      <FloatingPanel.Trigger asChild={(props) => <Button {...props()}>Open panel</Button>} />
      <FloatingPanelSurface
        title="Inspector"
        footer={<span class={statusClass}>Last synced just now</span>}
      >
        <div class={bodyStackClass}>
          <p>Drag the header to move this panel and resize it from any edge.</p>
          <div class={metricGridClass}>
            <div class={metricClass}>
              <span class="text-xs text-muted-foreground">Width</span>
              <strong class="text-lg">360</strong>
            </div>
            <div class={metricClass}>
              <span class="text-xs text-muted-foreground">Height</span>
              <strong class="text-lg">260</strong>
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
    const [open, setOpen] = createSignal(false);

    return (
      <div class={stackClass}>
        <span class={statusClass}>Panel is {open() ? 'open' : 'closed'}</span>
        <FloatingPanel
          open={open()}
          defaultSize={DEFAULT_SIZE}
          onOpenChange={(details) => setOpen(details.open)}
        >
          <FloatingPanel.Trigger
            asChild={(props) => (
              <Button {...props()}>{open() ? 'Focus panel' : 'Open controlled panel'}</Button>
            )}
          />
          <FloatingPanelSurface title="Controlled open">
            <p>Open state is synchronized with Solid state.</p>
          </FloatingPanelSurface>
        </FloatingPanel>
      </div>
    );
  },
};

export const ControlledPosition: Story = {
  name: 'Controlled Position',
  render: () => {
    const [position, setPosition] = createSignal(DEFAULT_POSITION);

    return (
      <div class={stackClass}>
        <span class={statusClass}>
          x: {Math.round(position().x)}, y: {Math.round(position().y)}
        </span>
        <FloatingPanel
          defaultSize={DEFAULT_SIZE}
          position={position()}
          onPositionChange={(details) => setPosition(details.position)}
        >
          <FloatingPanel.Trigger
            asChild={(props) => <Button {...props()}>Open positioned panel</Button>}
          />
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
    const [size, setSize] = createSignal(DEFAULT_SIZE);

    return (
      <div class={stackClass}>
        <span class={statusClass}>
          {Math.round(size().width)} x {Math.round(size().height)}
        </span>
        <FloatingPanel size={size()} onSizeChange={(details) => setSize(details.size)}>
          <FloatingPanel.Trigger
            asChild={(props) => <Button {...props()}>Open resizable panel</Button>}
          />
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
      <FloatingPanel.Trigger asChild={(props) => <Button {...props()}>Open panel</Button>} />
      <FloatingPanelSurface
        autofocus
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
      <FloatingPanel.Trigger asChild={(props) => <Button {...props()}>Open from trigger</Button>} />
      <FloatingPanelSurface title="Anchored start">
        <p>The initial panel position is derived from the trigger rect.</p>
      </FloatingPanelSurface>
    </FloatingPanel>
  ),
};

export const Context: Story = {
  render: () => (
    <FloatingPanel defaultSize={DEFAULT_SIZE}>
      <div class={stackClass}>
        <FloatingPanel.Trigger
          asChild={(props) => <Button {...props()}>Open context panel</Button>}
        />
        <FloatingPanel.Context>
          {(panel) => (
            <span class={statusClass}>
              open: {String(panel().open)}, dragging: {String(panel().dragging)}
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
      <div class={stackClass}>
        <div class={triggerGroupClass}>
          <Button onClick={() => panel().setOpen(true)}>Open via API</Button>
          <Button variant="outline" onClick={() => panel().maximize()}>
            Maximize
          </Button>
          <Button variant="outline" onClick={() => panel().minimize()}>
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
    const [exits, setExits] = createSignal(0);

    return (
      <div class={stackClass}>
        <span class={statusClass}>Exit completions: {exits()}</span>
        <FloatingPanel
          lazyMount
          unmountOnExit
          defaultSize={DEFAULT_SIZE}
          onExitComplete={() => setExits((count) => count + 1)}
        >
          <FloatingPanel.Trigger
            asChild={(props) => <Button {...props()}>Open lazy panel</Button>}
          />
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
      <FloatingPanel.Trigger asChild={(props) => <Button {...props()}>Open styled panel</Button>} />
      <FloatingPanelSurface
        title="Custom styling"
        class="border-primary/80 bg-primary text-primary-foreground shadow-lg"
      >
        <p>Tailwind utilities change the visual treatment without changing Ark composition.</p>
      </FloatingPanelSurface>
    </FloatingPanel>
  ),
};