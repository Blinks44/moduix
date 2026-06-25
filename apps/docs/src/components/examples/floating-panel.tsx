import {
  Button,
  FloatingPanel,
  Portal,
  type FloatingPanelPoint,
  type FloatingPanelSize,
  useFloatingPanel,
} from '@moduix/react';
import { useState, type ReactNode } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './floating-panel.module.css';

const DEFAULT_SIZE = { width: 360, height: 260 };
const DEFAULT_POSITION = { x: 160, y: 140 };

export const floatingPanelOverrideCssProperties: CssPropertyInput[] = [
  ['--floating-panel-behind-opacity', '0.55', 'Opacity when another panel is topmost.'],
  ['--floating-panel-bg', 'var(--color-popover)', 'Panel surface background.'],
  ['--floating-panel-body-color', 'var(--floating-panel-color)', 'Body text color.'],
  ['--floating-panel-body-font-size', 'var(--text-sm)', 'Body text size.'],
  ['--floating-panel-body-line-height', 'var(--line-height-text-sm)', 'Body line height.'],
  ['--floating-panel-body-padding', 'var(--spacing-4)', 'Body padding.'],
  ['--floating-panel-border-color', 'var(--color-border)', 'Panel border color.'],
  ['--floating-panel-border-width', 'var(--border-width-sm)', 'Panel border width.'],
  ['--floating-panel-color', 'var(--color-popover-foreground)', 'Panel text color.'],
  ['--floating-panel-control-bg', 'var(--color-background)', 'Control button background.'],
  ['--floating-panel-control-bg-hover', 'var(--color-accent)', 'Control hover background.'],
  ['--floating-panel-control-border-color', 'var(--color-border)', 'Control border color.'],
  ['--floating-panel-control-border-width', 'var(--border-width-sm)', 'Control border width.'],
  ['--floating-panel-control-color', 'var(--color-foreground)', 'Control text and icon color.'],
  ['--floating-panel-control-gap', 'var(--spacing-1)', 'Spacing between control buttons.'],
  ['--floating-panel-control-icon-size', '1rem', 'Default control icon size.'],
  ['--floating-panel-control-radius', 'var(--radius-sm)', 'Control button radius.'],
  ['--floating-panel-control-size', 'var(--size-sm)', 'Control button square size.'],
  ['--floating-panel-disabled-opacity', 'var(--opacity-disabled)', 'Disabled part opacity.'],
  ['--floating-panel-drag-indicator-color', 'var(--color-muted-foreground)', 'Grip icon color.'],
  ['--floating-panel-drag-indicator-size', '1rem', 'Grip icon size.'],
  ['--floating-panel-ending-opacity', '0', 'Exit animation opacity.'],
  ['--floating-panel-ending-scale', 'var(--scale-popup)', 'Exit animation scale.'],
  ['--floating-panel-ending-translate-x', '0', 'Exit horizontal offset.'],
  ['--floating-panel-ending-translate-y', '0', 'Exit vertical offset.'],
  ['--floating-panel-focus-ring-color', 'var(--color-ring)', 'Focus ring color.'],
  ['--floating-panel-focus-ring-width', 'var(--border-width-sm)', 'Focus ring width.'],
  ['--floating-panel-header-bg', 'var(--color-muted)', 'Header background.'],
  [
    '--floating-panel-header-border-color',
    'var(--floating-panel-border-color)',
    'Header border color.',
  ],
  ['--floating-panel-header-border-width', 'var(--border-width-sm)', 'Header border width.'],
  ['--floating-panel-header-gap', 'var(--spacing-3)', 'Header content gap.'],
  ['--floating-panel-header-height', 'var(--size-xl)', 'Header minimum height.'],
  ['--floating-panel-header-padding-x', 'var(--spacing-3)', 'Header horizontal padding.'],
  ['--floating-panel-header-padding-y', 'var(--spacing-2)', 'Header vertical padding.'],
  ['--floating-panel-height', '100%', 'Content height inside Ark positioner.'],
  ['--floating-panel-min-height', '10rem', 'Minimum content height.'],
  ['--floating-panel-min-width', '16rem', 'Minimum content width.'],
  ['--floating-panel-radius', 'var(--radius-md)', 'Panel radius.'],
  ['--floating-panel-resize-corner-size', '0.75rem', 'Corner resize handle size.'],
  ['--floating-panel-resize-edge-inset', '0.75rem', 'Edge resize handle inset.'],
  ['--floating-panel-resize-edge-size', '0.5rem', 'Edge resize handle thickness.'],
  ['--floating-panel-shadow', 'var(--shadow-lg)', 'Panel shadow.'],
  ['--floating-panel-starting-opacity', '0', 'Enter animation opacity.'],
  ['--floating-panel-starting-scale', 'var(--scale-popup)', 'Enter animation scale.'],
  ['--floating-panel-starting-translate-x', '0', 'Enter horizontal offset.'],
  ['--floating-panel-starting-translate-y', '0', 'Enter vertical offset.'],
  ['--floating-panel-title-color', 'var(--floating-panel-color)', 'Title color.'],
  ['--floating-panel-title-font-size', 'var(--text-sm)', 'Title text size.'],
  ['--floating-panel-title-font-weight', 'var(--weight-semibold)', 'Title weight.'],
  ['--floating-panel-title-gap', 'var(--spacing-2)', 'Title inline gap.'],
  ['--floating-panel-title-line-height', 'var(--line-height-text-sm)', 'Title line height.'],
  ['--floating-panel-transition', 'var(--transition-default)', 'Shared transition timing.'],
  ['--floating-panel-trigger-bg', 'var(--color-background)', 'Default trigger background.'],
  [
    '--floating-panel-trigger-bg-active',
    'var(--floating-panel-trigger-bg-hover)',
    'Open trigger background.',
  ],
  ['--floating-panel-trigger-bg-hover', 'var(--color-accent)', 'Default trigger hover background.'],
  ['--floating-panel-trigger-border-color', 'var(--color-border)', 'Default trigger border color.'],
  [
    '--floating-panel-trigger-border-width',
    'var(--border-width-sm)',
    'Default trigger border width.',
  ],
  ['--floating-panel-trigger-color', 'var(--color-foreground)', 'Default trigger text color.'],
  ['--floating-panel-trigger-font-size', 'var(--text-md)', 'Default trigger text size.'],
  ['--floating-panel-trigger-height', 'var(--size-lg)', 'Default trigger minimum height.'],
  [
    '--floating-panel-trigger-line-height',
    'var(--line-height-text-md)',
    'Default trigger line height.',
  ],
  ['--floating-panel-trigger-padding-x', 'var(--spacing-3)', 'Default trigger horizontal padding.'],
  ['--floating-panel-trigger-padding-y', '0.5rem', 'Default trigger vertical padding.'],
  ['--floating-panel-trigger-radius', 'var(--radius-md)', 'Default trigger radius.'],
  ['--floating-panel-width', '100%', 'Content width inside Ark positioner.'],
  ['--floating-panel-z-index', 'var(--z-popup)', 'Fallback panel z-index.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function FloatingPanelCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={floatingPanelOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function FloatingPanelSurface({
  title,
  children,
  className,
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Portal>
      <FloatingPanel.Positioner>
        <FloatingPanel.Content className={className}>
          <FloatingPanel.DragTrigger>
            <FloatingPanel.Header>
              <FloatingPanel.Title>
                <FloatingPanel.DragIndicator />
                <span className={styles.titleText}>{title}</span>
              </FloatingPanel.Title>
              <FloatingPanel.Control>
                <FloatingPanel.StageTrigger stage="minimized" />
                <FloatingPanel.StageTrigger stage="maximized" />
                <FloatingPanel.CloseIcon />
              </FloatingPanel.Control>
            </FloatingPanel.Header>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.Body>{children}</FloatingPanel.Body>
          <FloatingPanel.ResizeTriggerGroup />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </Portal>
  );
}

export function FloatingPanelExample() {
  return (
    <FloatingPanel defaultSize={DEFAULT_SIZE}>
      <FloatingPanel.Trigger asChild>
        <Button>Open panel</Button>
      </FloatingPanel.Trigger>
      <FloatingPanelSurface title="Inspector">
        <div className={styles.bodyStack}>
          <p>Drag the header to move this panel and resize it from any edge.</p>
          <div className={styles.metricGrid}>
            <div className={styles.metric}>
              <span>Width</span>
              <strong>360</strong>
            </div>
            <div className={styles.metric}>
              <span>Height</span>
              <strong>260</strong>
            </div>
          </div>
        </div>
      </FloatingPanelSurface>
    </FloatingPanel>
  );
}

export function ControlledFloatingPanelExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.stack}>
      <span className={styles.status}>Panel is {open ? 'open' : 'closed'}</span>
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
}

export function ControlledPositionFloatingPanelExample() {
  const [position, setPosition] = useState<FloatingPanelPoint>(DEFAULT_POSITION);

  return (
    <div className={styles.stack}>
      <span className={styles.status}>
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
}

export function ControlledSizeFloatingPanelExample() {
  const [size, setSize] = useState<FloatingPanelSize>(DEFAULT_SIZE);

  return (
    <div className={styles.stack}>
      <span className={styles.status}>
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
}

export function AnchorPositionFloatingPanelExample() {
  return (
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
  );
}

export function ContextFloatingPanelExample() {
  return (
    <FloatingPanel defaultSize={DEFAULT_SIZE}>
      <div className={styles.stack}>
        <FloatingPanel.Trigger asChild>
          <Button>Open context panel</Button>
        </FloatingPanel.Trigger>
        <FloatingPanel.Context>
          {(panel) => (
            <span className={styles.status}>
              open: {String(panel.open)}, dragging: {String(panel.dragging)}
            </span>
          )}
        </FloatingPanel.Context>
      </div>
      <FloatingPanelSurface title="Context state">
        <p>FloatingPanel.Context exposes the Ark panel API to descendants.</p>
      </FloatingPanelSurface>
    </FloatingPanel>
  );
}

export function RootProviderFloatingPanelExample() {
  const panel = useFloatingPanel({ defaultSize: DEFAULT_SIZE });

  return (
    <div className={styles.stack}>
      <div className={styles.triggerRow}>
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
          <p>useFloatingPanel owns the panel state outside the rendered part tree.</p>
        </FloatingPanelSurface>
      </FloatingPanel.RootProvider>
    </div>
  );
}

export function LazyMountFloatingPanelExample() {
  const [exits, setExits] = useState(0);

  return (
    <div className={styles.stack}>
      <span className={styles.status}>Exit completions: {exits}</span>
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
}

export function CustomFloatingPanelExample() {
  return (
    <FloatingPanel defaultSize={{ width: 380, height: 240 }}>
      <FloatingPanel.Trigger asChild>
        <Button>Open styled panel</Button>
      </FloatingPanel.Trigger>
      <FloatingPanelSurface title="Custom styling" className={styles.customPanel}>
        <p>Theme variables change the visual treatment without changing Ark composition.</p>
      </FloatingPanelSurface>
    </FloatingPanel>
  );
}