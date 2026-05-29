import {
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  createDrawerHandle,
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerContentInner,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
  ScrollArea,
} from 'moduix';
import { useMemo, useState } from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './drawer.module.css';

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
  ['--drawer-control-border-width', 'var(--border-width-sm)', 'Control border width.'],
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
  ['--drawer-focus-ring-width', 'var(--drawer-control-border-width)', 'Focus ring width.'],
  ['--drawer-footer-gap', 'var(--spacing-2)', 'Spacing between footer actions.'],
  ['--drawer-footer-margin-top', 'var(--spacing-6)', 'Spacing above footer.'],
  [
    '--drawer-frontmost-height',
    'auto (runtime)',
    'Current height of the frontmost drawer in a stack.',
  ],
  ['--drawer-handle-bg', 'var(--color-muted-foreground)', 'Handle color.'],
  ['--drawer-handle-height', '0.25rem', 'Handle height.'],
  ['--drawer-handle-offset', 'var(--spacing-3)', 'Handle offset from edge.'],
  ['--drawer-handle-opacity', '0.45', 'Handle opacity.'],
  ['--drawer-handle-radius', 'var(--radius-full)', 'Handle border radius.'],
  ['--drawer-handle-width', '3rem', 'Handle width.'],
  ['--drawer-height', 'auto (runtime)', 'Current popup height measured by Base UI.'],
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
  ['--drawer-snap-point-offset', 'auto (runtime)', 'Current snap-point offset applied by Base UI.'],
  ['--drawer-swipe-area-size', 'var(--spacing-10)', 'Edge swipe area size.'],
  ['--drawer-swipe-movement-x', 'auto (runtime)', 'Current horizontal swipe offset.'],
  ['--drawer-swipe-movement-y', 'auto (runtime)', 'Current vertical swipe offset.'],
  ['--drawer-swipe-progress', 'auto (runtime)', 'Current swipe progress from 0 to 1.'],
  ['--drawer-swipe-strength', 'auto (runtime)', 'Current swipe velocity multiplier.'],
  ['--drawer-title-color', 'var(--drawer-color)', 'Title text color.'],
  ['--drawer-title-font-size', 'var(--text-lg)', 'Title font size.'],
  ['--drawer-title-font-weight', 'var(--weight-semibold)', 'Title font weight.'],
  ['--drawer-title-line-height', 'var(--line-height-text-lg)', 'Title line height.'],
  ['--drawer-transition', '450ms cubic-bezier(0.32, 0.72, 0, 1)', 'Popup transition.'],
  ['--drawer-viewport-bottom', '0', 'Viewport bottom inset.'],
  ['--drawer-viewport-left', '0', 'Viewport left inset.'],
  ['--drawer-viewport-padding', '0px', 'Viewport padding.'],
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
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

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
            Use side drawers for filters, navigation, or contextual panels.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>Set side width through CSS variables on DrawerContent.</DrawerBody>
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
        <DrawerBody>Use the same API as bottom drawers and adjust width with CSS.</DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function IslandDrawerExample() {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button />}>Open island drawer</DrawerTrigger>
      <DrawerContent variant="island" className={styles.sideContent}>
        <DrawerHeader>
          <DrawerTitle>Island variant</DrawerTitle>
          <DrawerDescription>
            variant="island" removes the off-screen bleed tail from the popup.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function SnapPointsDrawerExample() {
  const snapPoints = [0.35, 0.65, 1];
  const [snapPoint, setSnapPoint] = useState<number | string | null>(snapPoints[1]);

  return (
    <Drawer snapPoints={snapPoints} snapPoint={snapPoint} onSnapPointChange={setSnapPoint}>
      <DrawerTrigger render={<Button />}>Open drawer with snap points</DrawerTrigger>
      <DrawerContent snapLayout>
        <DrawerHeader>
          <DrawerTitle>Snap points</DrawerTitle>
          <DrawerDescription>Current snap point: {String(snapPoint)}</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <ScrollArea className={styles.scrollArea}>
            <div className={styles.scrollContent}>
              {insideScrollSections.map((item) => (
                <section key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </section>
              ))}
            </div>
          </ScrollArea>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function NonModalDrawerExample() {
  return (
    <Drawer modal={false}>
      <DrawerTrigger render={<Button />}>Open non-modal drawer</DrawerTrigger>
      <DrawerContent className={styles.compactContent}>
        <DrawerHeader>
          <DrawerTitle>Non-modal drawer</DrawerTitle>
          <DrawerDescription>Outside pointer interaction stays enabled.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>The default content wrapper skips the backdrop when modal is false.</DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function DrawerHandleExample() {
  const drawerHandle = useMemo(() => createDrawerHandle(), []);

  return (
    <>
      <DrawerTrigger handle={drawerHandle} render={<Button variant="outline" />}>
        Open from detached trigger
      </DrawerTrigger>
      <Button type="button" onClick={() => drawerHandle.open(null)}>
        Open programmatically
      </Button>

      <Drawer handle={drawerHandle}>
        <DrawerContent className={styles.compactContent}>
          <DrawerHeader>
            <DrawerTitle>Detached trigger</DrawerTitle>
            <DrawerDescription>createDrawerHandle is preserved from Base UI.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function NestedDrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>Open drawer stack</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Account</DrawerTitle>
          <DrawerDescription>Main drawer with nested flow.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>Open a nested drawer to see stack behavior.</DrawerBody>
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

export function SwipeAreaDrawerExample() {
  return (
    <Drawer swipeDirection="right" modal={false}>
      <DrawerSwipeArea className={styles.swipeArea} />
      <DrawerTrigger render={<Button />}>Open with trigger</DrawerTrigger>
      <DrawerContent className={styles.sideContent}>
        <DrawerHeader>
          <DrawerTitle>Swipe area</DrawerTitle>
          <DrawerDescription>Swipe from the left edge or use the trigger.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>The swipe area part is still available for edge-open gestures.</DrawerBody>
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
                  Provider, indent, and background parts follow Base UI composition.
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

export function ControlledPersistentDrawerExample() {
  const snapPoints = [0.35, 0.85] as const;
  const [open, setOpen] = useState(false);
  const [snapPoint, setSnapPoint] = useState<number | string | null>(snapPoints[0]);
  const expanded = snapPoint === snapPoints[1];

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Open persistent drawer
      </Button>
      <Drawer
        open={open}
        onOpenChange={(nextOpen) => {
          if (nextOpen) {
            setOpen(true);
          }
        }}
        modal={false}
        disablePointerDismissal
        snapPoints={[...snapPoints]}
        snapPoint={snapPoint}
        onSnapPointChange={(nextSnapPoint) => {
          if (nextSnapPoint !== null) {
            setSnapPoint(nextSnapPoint);
          }
        }}
      >
        <DrawerContent snapLayout>
          <DrawerHeader className={styles.headerWithAction}>
            <div>
              <DrawerTitle>Controlled persistent drawer</DrawerTitle>
              <DrawerDescription>
                Persistence is controlled from application state; the icon button toggles between
                collapsed and expanded snap points.
              </DrawerDescription>
            </div>
            <button
              type="button"
              className={styles.snapToggle}
              onClick={() => setSnapPoint(expanded ? snapPoints[0] : snapPoints[1])}
              aria-label={expanded ? 'Collapse drawer' : 'Expand drawer'}
            >
              {expanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </button>
          </DrawerHeader>
          <DrawerBody>
            <ScrollArea className={styles.scrollArea}>
              <div className={styles.scrollContent}>
                {insideScrollSections.map((item) => (
                  <section key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </section>
                ))}
              </div>
            </ScrollArea>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function CustomCompositionDrawerExample() {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button />}>Open custom drawer</DrawerTrigger>
      <DrawerPortal keepMounted>
        <DrawerBackdrop className={styles.customBackdrop} forceRender />
        <DrawerViewport className={styles.customViewport}>
          <DrawerPopup className={styles.customPopup}>
            <DrawerHandle className={styles.customHandle} />
            <DrawerContentInner>
              <DrawerHeader>
                <DrawerTitle>Custom composition</DrawerTitle>
                <DrawerDescription>
                  Manual composition replaces the removed wrapper props and style maps.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                Use the exported structural parts when you need different layout.
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
              </DrawerFooter>
            </DrawerContentInner>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}