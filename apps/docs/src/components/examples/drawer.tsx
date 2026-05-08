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
import { insideScrollSections } from '@/data/insideScrollSections';
import type { CssPropertyInput } from '../preview';
import styles from './drawer.module.css';

export const drawerCssProperties: CssPropertyInput[] = [
  ['--drawer-width', '100%', 'Controls the width of top and bottom drawers.'],
  ['--drawer-side-width', '22rem', 'Controls the width of left and right drawers.'],
  ['--drawer-side-height', '100%', 'Controls the height of left and right drawers.'],
  ['--drawer-side-max-height', '100%', 'Controls the maximum height of left and right drawers.'],
  ['--drawer-max-height', '80vh', 'Controls the maximum height of top and bottom drawers.'],
  ['--drawer-padding-x', 'var(--spacing-6)', 'Controls popup horizontal padding.'],
  ['--drawer-padding-y', 'var(--spacing-4)', 'Controls popup vertical padding.'],
  ['--drawer-radius', 'var(--radius-xl)', 'Controls popup border radius.'],
  ['--drawer-bg', 'var(--color-popover)', 'Controls popup background color.'],
  ['--drawer-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--drawer-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--drawer-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  [
    '--drawer-backdrop-bg',
    'var(--backdrop-bg, var(--color-overlay))',
    'Controls backdrop background.',
  ],
  ['--drawer-bleed-size', '3rem', 'Controls the off-screen bleed used for edge drawers.'],
  ['--drawer-island-inset', 'var(--spacing-2)', 'Controls inset for island drawers.'],
  [
    '--drawer-viewport-padding',
    'initial',
    'Controls viewport padding. Leave initial to use the default island inset.',
  ],
  ['--drawer-handle-width', '3rem', 'Controls handle width.'],
  ['--drawer-handle-height', '0.25rem', 'Controls handle height.'],
  ['--drawer-handle-offset', 'var(--spacing-3)', 'Controls handle offset from the edge.'],
  ['--drawer-handle-bg', 'var(--color-muted-foreground)', 'Controls handle color.'],
  ['--drawer-handle-opacity', '0.45', 'Controls handle opacity.'],
  ['--drawer-handle-radius', 'var(--radius-full)', 'Controls handle border radius.'],
  ['--drawer-title-font-size', 'var(--text-lg)', 'Controls title font size.'],
  [
    '--drawer-description-color',
    'var(--color-muted-foreground)',
    'Controls description text color.',
  ],
  ['--drawer-body-margin-top', 'var(--spacing-4)', 'Controls spacing above body content.'],
  ['--drawer-footer-gap', 'var(--spacing-2)', 'Controls spacing between footer actions.'],
  ['--drawer-footer-margin-top', 'var(--spacing-6)', 'Controls spacing above footer.'],
  ['--drawer-swipe-area-size', 'var(--spacing-10)', 'Controls edge swipe area size.'],
  ['--drawer-snap-toggle-size', '1.75rem', 'Controls snap toggle button size.'],
  ['--drawer-snap-toggle-icon-size', '1rem', 'Controls snap toggle icon size.'],
  ['--drawer-transition', '450ms cubic-bezier(0.32, 0.72, 0, 1)', 'Controls popup motion.'],
];

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
            {insideScrollSections.map((item) => (
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
              {insideScrollSections.map((item) => (
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

export function CustomHandleAndIconDrawerExample() {
  const snapPoints = [0.35, 0.75] as const;
  const [snapPoint, setSnapPoint] = React.useState<number | string | null>(snapPoints[0]);
  const expanded = snapPoint === snapPoints[1];

  return (
    <Drawer snapPoints={[...snapPoints]} snapPoint={snapPoint} onSnapPointChange={setSnapPoint}>
      <DrawerTrigger render={<Button />}>Open customized drawer</DrawerTrigger>
      <DrawerContent snapLayout classNames={{ handle: styles.customHandle }}>
        <DrawerHeader>
          <DrawerTitle>Custom handle and icon</DrawerTitle>
          <DrawerSnapToggle
            expanded={expanded}
            onClick={() => setSnapPoint(expanded ? snapPoints[0] : snapPoints[1])}
          >
            {expanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
          </DrawerSnapToggle>
          <DrawerDescription>
            The handle slot accepts className, and the snap toggle accepts custom icon children.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}