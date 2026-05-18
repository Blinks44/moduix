import {
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerProvider,
  DrawerSnapToggle,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  ScrollArea,
} from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './drawer.module.css';

const releaseSections = [
  {
    title: 'Migration',
    body: 'Verify migration scripts, rollback steps, and staging smoke tests.',
  },
  {
    title: 'Monitoring',
    body: 'Check dashboards, alerts, and post-release health checks.',
  },
  {
    title: 'Rollout',
    body: 'Confirm feature flags, analytics events, and support notes.',
  },
];

export const drawerOverrideCssProperties: CssPropertyInput[] = [
  ['--drawer-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Backdrop background.'],
  ['--drawer-backdrop-pointer-events', 'auto', 'Backdrop pointer-events behavior.'],
  ['--drawer-backdrop-transition', '450ms cubic-bezier(0.32, 0.72, 0, 1)', 'Backdrop transition.'],
  ['--drawer-bg', 'var(--color-popover)', 'Popup background color.'],
  ['--drawer-body-font-size', 'var(--text-md)', 'Body font size.'],
  ['--drawer-body-line-height', 'var(--line-height-text-md)', 'Body line height.'],
  ['--drawer-body-margin-top', 'var(--spacing-4)', 'Spacing above body content.'],
  ['--drawer-bleed-size', '3rem', 'Off-screen bleed size for edge drawers.'],
  ['--drawer-border-color', 'var(--color-border)', 'Popup border color.'],
  ['--drawer-color', 'var(--color-popover-foreground)', 'Popup text color.'],
  ['--drawer-control-bg', 'var(--color-background)', 'Control background color.'],
  ['--drawer-control-bg-hover', 'var(--color-accent)', 'Control hover background color.'],
  ['--drawer-control-border-color', 'var(--color-border)', 'Control border color.'],
  ['--drawer-control-color', 'var(--color-foreground)', 'Control text color.'],
  ['--drawer-control-font-size', 'var(--text-md)', 'Control font size.'],
  ['--drawer-control-height', 'var(--size-lg)', 'Control minimum height.'],
  ['--drawer-control-line-height', 'var(--line-height-text-md)', 'Control line height.'],
  ['--drawer-control-padding-x', '0.875rem', 'Control horizontal padding.'],
  ['--drawer-control-padding-y', '0.5rem', 'Control vertical padding.'],
  ['--drawer-control-radius', 'var(--radius-md)', 'Control border radius.'],
  ['--drawer-description-color', 'var(--color-muted-foreground)', 'Description text color.'],
  ['--drawer-description-font-size', 'var(--text-md)', 'Description font size.'],
  ['--drawer-description-line-height', 'var(--line-height-text-md)', 'Description line height.'],
  ['--drawer-focus-ring-color', 'var(--color-ring)', 'Focus ring color for interactive controls.'],
  ['--drawer-footer-gap', 'var(--spacing-2)', 'Spacing between footer actions.'],
  ['--drawer-footer-margin-top', 'var(--spacing-6)', 'Spacing above footer.'],
  ['--drawer-handle-bg', 'var(--color-muted-foreground)', 'Handle color.'],
  ['--drawer-handle-height', '0.25rem', 'Handle height.'],
  ['--drawer-handle-offset', 'var(--spacing-3)', 'Handle offset from edge.'],
  ['--drawer-handle-opacity', '0.45', 'Handle opacity.'],
  ['--drawer-handle-radius', 'var(--radius-full)', 'Handle border radius.'],
  ['--drawer-handle-width', '3rem', 'Handle width.'],
  ['--drawer-header-gap', 'var(--spacing-1)', 'Gap between header elements.'],
  ['--drawer-indent-background-bg', 'var(--color-foreground)', 'Indent background color.'],
  ['--drawer-indent-background-opacity', '0', 'Indent background opacity in idle state.'],
  ['--drawer-indent-background-opacity-active', '1', 'Indent background opacity in active state.'],
  ['--drawer-indent-radius-active', 'var(--radius-lg)', 'Active indent radius.'],
  [
    '--drawer-indent-radius-transition',
    '250ms cubic-bezier(0.32, 0.72, 0, 1)',
    'Indent radius transition.',
  ],
  ['--drawer-indent-scale-active', '0.98', 'Active indent scale.'],
  ['--drawer-indent-transition', '400ms cubic-bezier(0.32, 0.72, 0, 1)', 'Indent transition.'],
  ['--drawer-indent-translate-y-active', 'var(--spacing-2)', 'Active indent Y translation.'],
  ['--drawer-island-inset', 'var(--spacing-2)', 'Inset for island variant.'],
  ['--drawer-max-height', '80vh', 'Maximum height for top and bottom drawers.'],
  ['--drawer-nested-peek', '2.75rem', 'Visible peek of nested drawers.'],
  ['--drawer-nested-scale-step', '0.06', 'Scale step for nested drawers.'],
  ['--drawer-padding-x', 'var(--spacing-6)', 'Popup horizontal padding.'],
  ['--drawer-padding-y', 'var(--spacing-4)', 'Popup vertical padding.'],
  ['--drawer-popup-pointer-events', 'auto', 'Popup pointer-events behavior.'],
  ['--drawer-radius', 'var(--radius-xl)', 'Popup border radius.'],
  ['--drawer-shadow', 'var(--shadow-lg)', 'Popup shadow.'],
  ['--drawer-side-height', '100%', 'Height of left and right drawers.'],
  ['--drawer-side-max-height', '100%', 'Maximum height of left and right drawers.'],
  ['--drawer-side-width', '22rem', 'Width of left and right drawers.'],
  ['--drawer-snap-toggle-bg', 'transparent', 'Snap toggle background color.'],
  ['--drawer-snap-toggle-bg-hover', 'var(--color-accent)', 'Snap toggle hover background color.'],
  [
    '--drawer-snap-toggle-color',
    'var(--drawer-description-color, var(--color-muted-foreground))',
    'Snap toggle icon color.',
  ],
  ['--drawer-snap-toggle-icon-size', '1rem', 'Snap toggle icon size.'],
  ['--drawer-snap-toggle-radius', 'var(--radius-md)', 'Snap toggle border radius.'],
  ['--drawer-snap-toggle-size', '1.75rem', 'Snap toggle button size.'],
  ['--drawer-swipe-area-size', 'var(--spacing-10)', 'Edge swipe area size.'],
  ['--drawer-title-color', 'var(--drawer-color)', 'Title text color.'],
  ['--drawer-title-font-size', 'var(--text-lg)', 'Title font size.'],
  ['--drawer-title-font-weight', 'var(--weight-semibold)', 'Title font weight.'],
  ['--drawer-title-line-height', 'var(--line-height-text-lg)', 'Title line height.'],
  ['--drawer-transition', '450ms cubic-bezier(0.32, 0.72, 0, 1)', 'Popup transition.'],
  ['--drawer-viewport-bottom', '0', 'Viewport bottom inset.'],
  ['--drawer-viewport-left', '0', 'Viewport left inset.'],
  [
    '--drawer-viewport-padding',
    '0px',
    'Viewport padding (island variant defaults to var(--drawer-island-inset)).',
  ],
  ['--drawer-viewport-pointer-events', 'auto', 'Viewport pointer-events behavior.'],
  ['--drawer-viewport-right', '0', 'Viewport right inset.'],
  ['--drawer-viewport-top', '0', 'Viewport top inset.'],
  ['--drawer-width', '100%', 'Width of top and bottom drawers.'],
];
export const drawerPlaygroundCssProperties: CssPropertyInput[] = [
  ['--drawer-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Controls backdrop.'],
  ['--drawer-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--drawer-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--drawer-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--drawer-handle-bg', 'var(--color-muted-foreground)', 'Controls handle color.'],
  ['--drawer-max-height', '80vh', 'Controls popup max height.'],
  ['--drawer-padding-x', 'var(--spacing-6)', 'Controls popup horizontal padding.'],
  ['--drawer-padding-y', 'var(--spacing-4)', 'Controls popup vertical padding.'],
  ['--drawer-radius', 'var(--radius-xl)', 'Controls popup border radius.'],
  ['--drawer-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--drawer-side-width', '22rem', 'Controls side drawer width.'],
  ['--drawer-width', '100%', 'Controls top and bottom drawer width.'],
];

export function DrawerCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={drawerOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function DrawerCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={drawerPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function DrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>Open bottom drawer</DrawerTrigger>
      <DrawerContent className={styles.compactContent}>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>You are all caught up. Good job!</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          Bottom drawers are the default. They support drag-to-dismiss gestures.
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function TopDrawerExample() {
  return (
    <Drawer swipeDirection="up">
      <DrawerTrigger render={<Button />}>Open top drawer</DrawerTrigger>
      <DrawerContent className={styles.compactContent}>
        <DrawerHeader>
          <DrawerTitle>Top panel</DrawerTitle>
          <DrawerDescription>
            Set swipeDirection to up for a drawer attached to the top.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function LeftDrawerExample() {
  return (
    <Drawer swipeDirection="left">
      <DrawerTrigger render={<Button />}>Open left drawer</DrawerTrigger>
      <DrawerContent className={styles.sideContent}>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>
            Side drawers use the same composition and slot classes.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>Use side drawers for filters, navigation, or contextual panels.</DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function RightDrawerExample() {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button />}>Open right drawer</DrawerTrigger>
      <DrawerContent className={styles.sideContent}>
        <DrawerHeader>
          <DrawerTitle>Details</DrawerTitle>
          <DrawerDescription>
            Right drawers are useful for entity details and inspectors.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>Set width through CSS variables or a className on DrawerContent.</DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function SnapPointsDrawerExample() {
  const snapPoints = [0.35, 0.65, 1];
  const [snapPoint, setSnapPoint] = React.useState<number | string | null>(snapPoints[1]);

  return (
    <Drawer snapPoints={snapPoints} snapPoint={snapPoint} onSnapPointChange={setSnapPoint}>
      <DrawerTrigger render={<Button />}>Open snap drawer</DrawerTrigger>
      <DrawerContent snapLayout>
        <DrawerHeader>
          <DrawerTitle>Release checklist</DrawerTitle>
          <DrawerDescription>Current snap point: {String(snapPoint)}</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <ScrollArea className={styles.scrollArea} classNames={{ content: styles.scrollContent }}>
            {releaseSections.map((item) => (
              <section key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </section>
            ))}
          </ScrollArea>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function WithoutBackdropDrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>Open without backdrop</DrawerTrigger>
      <DrawerContent withBackdrop={false} className={styles.compactContent}>
        <DrawerHeader>
          <DrawerTitle>No backdrop</DrawerTitle>
          <DrawerDescription>
            Use this when the page should stay visually available.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>The drawer still keeps the same popup and content slots.</DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function NestedDrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>Open drawer stack</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Account</DrawerTitle>
          <DrawerDescription>
            Nested drawers visually recede while the child is active.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>Open a nested drawer to continue the flow without leaving context.</DrawerBody>
        <DrawerFooter>
          <div className={styles.nestedActionsStart}>
            <Drawer>
              <DrawerTrigger render={<Button />}>Open nested</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Nested drawer</DrawerTitle>
                  <DrawerDescription>Second layer in the stack.</DrawerDescription>
                </DrawerHeader>
                <DrawerBody>Nested content.</DrawerBody>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="outline" />}>Close nested</DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <DrawerClose render={<Button variant="outline" />}>Close root</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function BottomIslandDrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>Open bottom island</DrawerTrigger>
      <DrawerContent variant="island" className={styles.islandContent}>
        <DrawerHeader>
          <DrawerTitle>Bottom island</DrawerTitle>
          <DrawerDescription>
            Island drawers remove the bleed tail and add viewport inset.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function TopIslandDrawerExample() {
  return (
    <Drawer swipeDirection="up">
      <DrawerTrigger render={<Button />}>Open top island</DrawerTrigger>
      <DrawerContent variant="island" className={styles.islandContent}>
        <DrawerHeader>
          <DrawerTitle>Top island</DrawerTitle>
          <DrawerDescription>The same variant works from the top edge.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function LeftIslandDrawerExample() {
  return (
    <Drawer swipeDirection="left">
      <DrawerTrigger render={<Button />}>Open left island</DrawerTrigger>
      <DrawerContent variant="island" className={styles.islandContent}>
        <DrawerHeader>
          <DrawerTitle>Left island</DrawerTitle>
          <DrawerDescription>
            Side island drawers keep an inset around the viewport.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function RightIslandDrawerExample() {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button />}>Open right island</DrawerTrigger>
      <DrawerContent variant="island" className={styles.islandContent}>
        <DrawerHeader>
          <DrawerTitle>Right island</DrawerTitle>
          <DrawerDescription>
            Use className to tune important slots for your layout.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function PersistentSnapDrawerExample() {
  const snapPoints = [0.35, 0.85] as const;
  const [open, setOpen] = React.useState(false);
  const [snapPoint, setSnapPoint] = React.useState<number | string | null>(snapPoints[0]);
  const expanded = snapPoint === snapPoints[1];

  return (
    <React.Fragment>
      <Button type="button" onClick={() => setOpen(true)}>
        Open persistent drawer
      </Button>
      {open ? (
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Close persistent drawer
        </Button>
      ) : null}
      <Drawer
        open={open}
        persistent
        modal={false}
        disablePointerDismissal
        snapPoints={[...snapPoints]}
        defaultSnapPoint={snapPoints[0]}
        snapPoint={snapPoint}
        onSnapPointChange={setSnapPoint}
      >
        <DrawerContent snapLayout withBackdrop={false} disableInitialAnimation>
          <DrawerHeader>
            <DrawerTitle>Persistent drawer</DrawerTitle>
            <DrawerSnapToggle
              expanded={expanded}
              onClick={() => setSnapPoint(expanded ? snapPoints[0] : snapPoints[1])}
            />
            <DrawerDescription>
              Switch between compact and expanded snap points without closing the panel.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <ScrollArea
              className={styles.scrollArea}
              classNames={{ content: styles.scrollContent }}
            >
              {releaseSections.map((item) => (
                <section key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </section>
              ))}
            </ScrollArea>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}

export function SwipeAreaDrawerExample() {
  return (
    <Drawer swipeDirection="right" modal={false}>
      <DrawerSwipeArea className={styles.swipeArea} />
      <DrawerTrigger render={<Button />}>Open with trigger</DrawerTrigger>
      <DrawerContent withBackdrop={false} className={styles.sideContent}>
        <DrawerHeader>
          <DrawerTitle>Swipe area</DrawerTitle>
          <DrawerDescription>Swipe from the left edge or use the trigger.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          The swipe area part enables edge-open gestures for non-modal drawers.
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function IndentEffectDrawerExample() {
  return (
    <DrawerProvider>
      <div className={styles.indentStage}>
        <DrawerIndentBackground />
        <DrawerIndent className={styles.indentSurface}>
          <Drawer modal={false}>
            <DrawerTrigger render={<Button />}>Open indented drawer</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Indent effect</DrawerTitle>
                <DrawerDescription>
                  Provider, indent, and background parts react to open drawers.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </DrawerIndent>
      </div>
    </DrawerProvider>
  );
}

export function CustomStylesDrawerExample() {
  const snapPoints = [0.35, 0.75] as const;
  const [snapPoint, setSnapPoint] = React.useState<number | string | null>(snapPoints[0]);
  const expanded = snapPoint === snapPoints[1];

  return (
    <Drawer snapPoints={[...snapPoints]} snapPoint={snapPoint} onSnapPointChange={setSnapPoint}>
      <DrawerTrigger render={<Button />}>Open custom drawer</DrawerTrigger>
      <DrawerContent
        snapLayout
        className={styles.customPopup}
        classNames={{
          backdrop: styles.customBackdrop,
          viewport: styles.customViewport,
          handle: styles.customHandle,
          content: styles.customContent,
        }}
      >
        <DrawerHeader>
          <DrawerTitle>Custom styles</DrawerTitle>
          <DrawerSnapToggle
            expanded={expanded}
            onClick={() => setSnapPoint(expanded ? snapPoints[0] : snapPoints[1])}
          >
            {expanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
          </DrawerSnapToggle>
          <DrawerDescription>
            Popup styles use className. Internal slots use classNames.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}