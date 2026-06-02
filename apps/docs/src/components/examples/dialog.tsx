import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
  ScrollArea,
  createDialogHandle,
} from 'moduix';
import { Fragment, useMemo, useState } from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './dialog.module.css';

export const dialogOverrideCssProperties: CssPropertyInput[] = [
  ['--dialog-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Controls backdrop color.'],
  ['--dialog-backdrop-blur', '4px', 'Controls backdrop blur.'],
  ['--dialog-backdrop-transition', 'var(--transition-default)', 'Controls backdrop transition.'],
  ['--dialog-bg', 'var(--color-popover)', 'Controls popup background color.'],
  ['--dialog-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--dialog-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--dialog-close-icon-bg', 'transparent', 'Controls icon close button background.'],
  ['--dialog-close-icon-bg-hover', 'var(--color-accent)', 'Controls icon close hover background.'],
  ['--dialog-close-icon-color', 'var(--dialog-muted-color)', 'Controls icon close color.'],
  [
    '--dialog-close-icon-color-hover',
    'var(--dialog-close-icon-color, var(--dialog-color))',
    'Controls icon close hover color.',
  ],
  [
    '--dialog-close-icon-focus-ring-color',
    'var(--dialog-focus-ring-color)',
    'Controls icon close focus ring color.',
  ],
  ['--dialog-close-icon-glyph-size', '0.75rem', 'Controls icon close glyph size.'],
  ['--dialog-close-icon-radius', 'var(--radius-md)', 'Controls icon close border radius.'],
  ['--dialog-close-icon-size', '1.75rem', 'Controls icon close button size.'],
  ['--dialog-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--dialog-content-margin', 'var(--spacing-4) 0 0', 'Controls `DialogBody` margin.'],
  ['--dialog-control-bg', 'var(--color-background)', 'Controls trigger and close background.'],
  [
    '--dialog-control-bg-hover',
    'var(--color-accent)',
    'Controls trigger and close hover background.',
  ],
  [
    '--dialog-control-border-color',
    'var(--color-border)',
    'Controls trigger and close border color.',
  ],
  [
    '--dialog-control-border-width',
    'var(--border-width-sm)',
    'Controls trigger and close border width.',
  ],
  ['--dialog-control-color', 'var(--color-foreground)', 'Controls trigger and close text color.'],
  ['--dialog-control-font-size', 'var(--text-md)', 'Controls trigger and close font size.'],
  ['--dialog-control-height', 'var(--size-lg)', 'Controls trigger and close min height.'],
  [
    '--dialog-control-line-height',
    'var(--line-height-text-md)',
    'Controls trigger and close line height.',
  ],
  ['--dialog-control-padding-x', '0.875rem', 'Controls trigger and close horizontal padding.'],
  ['--dialog-control-padding-y', '0.5rem', 'Controls trigger and close vertical padding.'],
  ['--dialog-control-radius', 'var(--radius-md)', 'Controls trigger and close border radius.'],
  [
    '--dialog-description-color',
    'var(--dialog-muted-color)',
    'Controls description/body text color.',
  ],
  ['--dialog-description-font-size', 'var(--text-md)', 'Controls description/body font size.'],
  [
    '--dialog-description-line-height',
    'var(--line-height-text-md)',
    'Controls description/body line height.',
  ],
  ['--dialog-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--dialog-focus-ring-width', 'var(--dialog-control-border-width)', 'Controls focus ring width.'],
  ['--dialog-footer-gap', 'var(--spacing-2)', 'Controls footer actions gap.'],
  ['--dialog-footer-margin-top', 'var(--spacing-6)', 'Controls footer top margin.'],
  ['--dialog-header-gap', 'var(--spacing-1)', 'Controls header row and column gap.'],
  ['--dialog-max-width', 'calc(100vw - var(--spacing-8))', 'Controls popup max width.'],
  ['--dialog-muted-color', 'var(--color-muted-foreground)', 'Controls muted text fallback color.'],
  ['--dialog-nested-offset-y', '1.25rem', 'Controls vertical offset for nested dialogs.'],
  ['--dialog-nested-overlay-bg', 'rgb(0 0 0 / 0.05)', 'Controls nested parent overlay color.'],
  ['--dialog-nested-scale-step', '0.1', 'Controls scale step for nested dialogs.'],
  ['--dialog-padding', 'var(--spacing-6)', 'Controls popup padding.'],
  ['--dialog-radius', 'var(--radius-lg)', 'Controls popup border radius.'],
  ['--dialog-scale', 'var(--scale-popup)', 'Controls enter/exit popup scale.'],
  ['--dialog-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--dialog-title-color', 'var(--dialog-color)', 'Controls title color.'],
  ['--dialog-title-font-size', 'var(--text-lg)', 'Controls title font size.'],
  ['--dialog-title-font-weight', 'var(--weight-semibold)', 'Controls title font weight.'],
  ['--dialog-title-line-height', 'var(--line-height-text-lg)', 'Controls title line height.'],
  ['--dialog-transition', 'var(--transition-default)', 'Controls popup transition.'],
  ['--dialog-viewport-padding', 'var(--spacing-4)', 'Controls viewport padding.'],
  ['--dialog-width', '28rem', 'Controls popup width.'],
];
export const dialogPlaygroundCssProperties: CssPropertyInput[] = [
  ['--dialog-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Controls backdrop.'],
  ['--dialog-backdrop-blur', '4px', 'Controls backdrop blur.'],
  ['--dialog-bg', 'var(--color-popover)', 'Controls popup background color.'],
  ['--dialog-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--dialog-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--dialog-radius', 'var(--radius-lg)', 'Controls the popup border radius.'],
  ['--dialog-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
];

export function DialogCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={dialogOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function DialogCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={dialogPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>View notifications</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>You are all caught up. Good job!</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ControlledDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button type="button" onClick={() => setOpen(true)}>
        Open controlled dialog
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish changes?</DialogTitle>
            <DialogDescription>
              This will make the latest version visible to all users.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Back to editing</DialogClose>
            <DialogClose render={<Button />}>Publish</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export function DialogHandleExample() {
  const dialogHandle = useMemo(() => createDialogHandle(), []);

  return (
    <Fragment>
      <DialogTrigger handle={dialogHandle} render={<Button variant="outline" />}>
        Open from detached trigger
      </DialogTrigger>
      <Button type="button" onClick={() => dialogHandle.open(null)}>
        Open programmatically
      </Button>

      <Dialog handle={dialogHandle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detached trigger</DialogTitle>
            <DialogDescription>
              This dialog is connected via createDialogHandle().
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export function ScrollableDialogExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Open long content</DialogTrigger>
      <DialogContent className={styles.scrollPopup}>
        <DialogHeader>
          <DialogTitle>Release checklist</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>Review all items before publishing to production.</DialogDescription>
        </DialogHeader>
        <DialogBody className={styles.scrollBody}>
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
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function NestedDialogExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>View notifications</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>You are all caught up. Good job!</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>Customize</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Customize notifications</DialogTitle>
                <DialogDescription>Review your settings here.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function NonModalDialogExample() {
  return (
    <Dialog modal={false}>
      <DialogTrigger render={<Button />}>Open non-modal dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Non-modal dialog</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>
            The page remains interactive because modal behavior and backdrop are disabled.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function TrapFocusDialogExample() {
  return (
    <Dialog modal="trap-focus">
      <DialogTrigger render={<Button />}>Open focus-trapped dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Focus stays inside the dialog</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>
            Outside content remains clickable, but keyboard focus stays trapped until the dialog
            closes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function CustomCompositionDialogExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Open custom composition</DialogTrigger>
      <DialogPortal keepMounted>
        <DialogBackdrop className={styles.customBackdrop} forceRender />
        <DialogViewport className={styles.customViewport}>
          <DialogPopup className={styles.customPopup}>
            <DialogCloseIcon aria-label="Close profile dialog" className={styles.customCloseIcon} />
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Portal, backdrop, viewport, popup, and close icon are composed explicitly.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p>Update the public profile fields and save changes.</p>
            </DialogBody>
            <DialogFooter>
              <DialogClose render={<Button />}>Save</DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  );
}