import {
  Button,
  Drawer,
  ScrollArea,
  type DrawerTriggerValueChangeDetails,
  useDrawer,
} from 'moduix';
import { useState, type ReactNode } from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './drawer.module.css';

const DEFAULT_DEMO_SNAP_POINT = 0.3;
const DEFAULT_DEMO_SNAP_POINTS = [DEFAULT_DEMO_SNAP_POINT, 1];

export const drawerOverrideCssProperties: CssPropertyInput[] = [
  ['--drawer-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Backdrop background.'],
  ['--drawer-backdrop-blur', '4px', 'Backdrop blur amount.'],
  ['--drawer-backdrop-transition', 'var(--transition-spring)', 'Backdrop enter and exit motion.'],
  ['--drawer-bg', 'var(--color-popover)', 'Content background.'],
  ['--drawer-bleed-size', '3rem', 'Overdrag background extension.'],
  ['--drawer-border-color', 'var(--color-border)', 'Content border color.'],
  ['--drawer-border-width', 'var(--border-width-sm)', 'Content border width.'],
  ['--drawer-color', 'var(--color-popover-foreground)', 'Content text color.'],
  ['--drawer-control-bg', 'var(--color-background)', 'Default trigger background.'],
  ['--drawer-control-bg-hover', 'var(--color-accent)', 'Default trigger hover background.'],
  ['--drawer-control-border-color', 'var(--color-border)', 'Default trigger border color.'],
  ['--drawer-control-border-width', 'var(--border-width-sm)', 'Default trigger border width.'],
  ['--drawer-control-color', 'var(--color-foreground)', 'Default trigger text color.'],
  ['--drawer-control-font-size', 'var(--text-md)', 'Default trigger font size.'],
  ['--drawer-control-height', 'var(--size-lg)', 'Default trigger minimum height.'],
  ['--drawer-control-line-height', 'var(--line-height-text-md)', 'Default trigger line height.'],
  ['--drawer-control-padding-x', '0.875rem', 'Default trigger horizontal padding.'],
  ['--drawer-control-padding-y', '0.5rem', 'Default trigger vertical padding.'],
  ['--drawer-control-radius', 'var(--radius-md)', 'Default trigger radius.'],
  ['--drawer-description-color', 'var(--color-muted-foreground)', 'Secondary text color.'],
  ['--drawer-description-font-size', 'var(--text-md)', 'Secondary text size.'],
  ['--drawer-description-line-height', 'var(--line-height-text-md)', 'Secondary line height.'],
  ['--drawer-focus-ring-color', 'var(--color-ring)', 'Interactive focus ring color.'],
  ['--drawer-focus-ring-width', 'var(--drawer-control-border-width)', 'Focus ring width.'],
  ['--drawer-footer-gap', 'var(--spacing-2)', 'Footer action gap.'],
  ['--drawer-footer-margin-top', 'var(--spacing-6)', 'Space above the footer.'],
  ['--drawer-grabber-indicator-bg', 'var(--color-muted-foreground)', 'Grabber indicator color.'],
  ['--drawer-grabber-indicator-height', '0.25rem', 'Grabber indicator height.'],
  ['--drawer-grabber-indicator-opacity', '0.45', 'Grabber indicator opacity.'],
  ['--drawer-grabber-indicator-opacity-hover', '0.7', 'Grabber indicator hover opacity.'],
  ['--drawer-grabber-indicator-radius', 'var(--radius-full)', 'Grabber indicator radius.'],
  ['--drawer-grabber-indicator-width', '3rem', 'Grabber indicator width.'],
  ['--drawer-grabber-padding', 'var(--spacing-3)', 'Grabber vertical padding.'],
  ['--drawer-header-gap', 'var(--spacing-1)', 'Header gap.'],
  ['--drawer-indent-background-bg', 'var(--color-foreground)', 'Indent background color.'],
  ['--drawer-indent-background-opacity', '0', 'Idle indent background opacity.'],
  ['--drawer-indent-background-opacity-active', '1', 'Active indent background opacity.'],
  ['--drawer-indent-radius-active', 'var(--radius-lg)', 'Active indent radius.'],
  ['--drawer-indent-scale-active', '0.97', 'Active indent scale.'],
  ['--drawer-indent-transition', 'var(--transition-spring)', 'Indent motion.'],
  ['--drawer-indent-translate-y-active', 'var(--spacing-2)', 'Active indent translation.'],
  ['--drawer-max-height', '80dvh', 'Maximum vertical drawer height.'],
  ['--drawer-nested-scale-step', '0.05', 'Scale step for nested drawers.'],
  ['--drawer-padding-x', 'var(--spacing-6)', 'Content horizontal padding.'],
  ['--drawer-padding-y', 'var(--spacing-4)', 'Content vertical padding.'],
  ['--drawer-positioner-padding', '0', 'Positioner inset padding.'],
  ['--drawer-radius', 'var(--radius-xl)', 'Content radius.'],
  ['--drawer-shadow', 'var(--shadow-lg)', 'Content shadow.'],
  ['--drawer-side-height', '100%', 'Height of start/end drawers.'],
  ['--drawer-side-width', '22rem', 'Width of start/end drawers.'],
  ['--drawer-size', '100%', 'Base content size used by Ark drag and snap-point measurement.'],
  ['--drawer-swipe-area-size', 'var(--spacing-10)', 'Edge-open gesture area size.'],
  ['--drawer-title-color', 'var(--drawer-color)', 'Title color.'],
  ['--drawer-title-font-size', 'var(--text-lg)', 'Title size.'],
  ['--drawer-title-font-weight', 'var(--weight-semibold)', 'Title weight.'],
  ['--drawer-title-line-height', 'var(--line-height-text-lg)', 'Title line height.'],
  ['--drawer-transition', 'var(--transition-spring)', 'Content enter, snap-back, and exit motion.'],
  ['--drawer-width', '100%', 'Width of up/down drawers.'],
];

export function DrawerCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={drawerOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function DrawerSurface({
  title,
  description,
  children,
  draggable,
  backdrop = true,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  draggable?: boolean;
  backdrop?: boolean;
}) {
  return (
    <>
      {backdrop ? <Drawer.Backdrop /> : null}
      <Drawer.Positioner>
        <Drawer.Content draggable={draggable}>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>{title}</Drawer.Title>
            <Drawer.CloseIcon />
            {description ? <Drawer.Description>{description}</Drawer.Description> : null}
          </Drawer.Header>
          {children}
        </Drawer.Content>
      </Drawer.Positioner>
    </>
  );
}

export function DrawerExample() {
  return (
    <Drawer.Root defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <Drawer.Trigger asChild>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <DrawerSurface title="Notifications" description="You are all caught up. Good job!">
        <Drawer.Body>Bottom drawers are draggable by default.</Drawer.Body>
        <Drawer.Footer>
          <Drawer.CloseTrigger asChild>
            <Button variant="outline">Close</Button>
          </Drawer.CloseTrigger>
        </Drawer.Footer>
      </DrawerSurface>
    </Drawer.Root>
  );
}

export function SwipeDirectionDrawerExample() {
  return (
    <Drawer.Root swipeDirection="end">
      <Drawer.Trigger asChild>
        <Button>Open right drawer</Button>
      </Drawer.Trigger>
      <DrawerSurface title="Details" description="Logical end resolves to the right in LTR." />
    </Drawer.Root>
  );
}

export function SnapPointsDrawerExample() {
  return (
    <Drawer.Root snapPoints={[0.25, 0.5, 1]} defaultSnapPoint={0.5}>
      <Drawer.Trigger asChild>
        <Button>Open with snap points</Button>
      </Drawer.Trigger>
      <DrawerSurface
        title="Snap points"
        description="Drag between 25%, 50%, and 100% of the viewport."
      />
    </Drawer.Root>
  );
}

export function NonModalDrawerExample() {
  return (
    <Drawer.Root
      defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
      modal={false}
      snapPoints={DEFAULT_DEMO_SNAP_POINTS}
    >
      <Drawer.Trigger asChild>
        <Button>Open non-modal drawer</Button>
      </Drawer.Trigger>
      <DrawerSurface
        title="Non-modal drawer"
        description="The page remains interactive while this drawer is open."
        backdrop={false}
      />
    </Drawer.Root>
  );
}

export function ControlledDrawerExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen((value) => !value)}>
        {open ? 'Close' : 'Open'} drawer
      </Button>
      <Drawer.Root
        defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
        open={open}
        snapPoints={DEFAULT_DEMO_SNAP_POINTS}
        onOpenChange={(details) => setOpen(details.open)}
      >
        <DrawerSurface title="Controlled drawer" description={`Open: ${String(open)}`} />
      </Drawer.Root>
    </>
  );
}

export function ScrollableDrawerExample() {
  return (
    <Drawer.Root defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <Drawer.Trigger asChild>
        <Button>Open scrollable drawer</Button>
      </Drawer.Trigger>
      <DrawerSurface title="Scrollable drawer">
        <Drawer.Body className={styles.scrollRegion}>
          <ScrollArea className={styles.scrollArea}>
            <ScrollArea.Viewport className={styles.scrollViewport}>
              <ScrollArea.Content className={styles.scrollBody}>
                {insideScrollSections.map((item) => (
                  <section key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </section>
                ))}
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea>
        </Drawer.Body>
      </DrawerSurface>
    </Drawer.Root>
  );
}

export function DragControlsDrawerExample() {
  return (
    <Drawer.Root defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT} snapPoints={DEFAULT_DEMO_SNAP_POINTS}>
      <Drawer.Trigger asChild>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <DrawerSurface
        title="Drag controls"
        description="Content dragging is disabled; the grabber remains draggable."
        draggable={false}
      >
        <Drawer.Body>
          <div data-no-drag className={styles.noDragArea}>
            `data-no-drag` prevents drag gestures from starting in a specific subtree.
          </div>
        </Drawer.Body>
      </DrawerSurface>
    </Drawer.Root>
  );
}

export const drawerUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
];

export function MultipleTriggersDrawerExample() {
  const [activeUser, setActiveUser] = useState<(typeof drawerUsers)[number] | null>(null);
  const handleTriggerValueChange = (details: DrawerTriggerValueChangeDetails) => {
    setActiveUser(drawerUsers.find((user) => user.id === details.value) ?? null);
  };

  return (
    <Drawer.Root swipeDirection="end" onTriggerValueChange={handleTriggerValueChange}>
      <div className={styles.triggerGroup}>
        {drawerUsers.map((user) => (
          <Drawer.Trigger key={user.id} value={user.id} asChild>
            <Button variant="outline">Edit {user.name}</Button>
          </Drawer.Trigger>
        ))}
      </div>
      <DrawerSurface title="Edit user" description={activeUser?.email}>
        {activeUser ? <Drawer.Body>Selected: {activeUser.name}</Drawer.Body> : null}
      </DrawerSurface>
    </Drawer.Root>
  );
}

export function RootProviderDrawerExample() {
  const drawer = useDrawer({
    defaultSnapPoint: 0.5,
    snapPoints: [0.25, 0.5, 1],
  });

  return (
    <div className={styles.providerDemo}>
      <div className={styles.triggerGroup}>
        <Button onClick={() => drawer.setOpen(true)}>Open via API</Button>
        <Button variant="outline" onClick={() => drawer.setSnapPoint(0.25)}>
          Set 25%
        </Button>
        <Button variant="outline" onClick={() => drawer.setSnapPoint(1)}>
          Set 100%
        </Button>
      </div>
      <Drawer.RootProvider value={drawer}>
        <DrawerSurface
          title="Root provider"
          description={`Active snap point: ${String(drawer.snapPoint)}`}
        />
      </Drawer.RootProvider>
    </div>
  );
}

export function IndentDrawerExample() {
  return (
    <Drawer.Stack>
      <div className={styles.indentStage}>
        <Drawer.IndentBackground />
        <Drawer.Root
          defaultSnapPoint={DEFAULT_DEMO_SNAP_POINT}
          modal={false}
          snapPoints={DEFAULT_DEMO_SNAP_POINTS}
        >
          <Drawer.Indent className={styles.indentSurface}>
            <Drawer.Trigger asChild>
              <Button>Open indented drawer</Button>
            </Drawer.Trigger>
          </Drawer.Indent>
          <DrawerSurface
            title="Indent effect"
            description="Drawer.Stack coordinates the background and page surface."
          />
        </Drawer.Root>
      </div>
    </Drawer.Stack>
  );
}