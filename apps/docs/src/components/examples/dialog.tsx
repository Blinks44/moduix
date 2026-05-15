import {
  Button,
  CloseLineIcon,
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
  createDialogHandle,
} from 'moduix';
import * as React from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './dialog.module.css';

export const dialogOverrideCssProperties: CssPropertyInput[] = [
  ['--dialog-width', '28rem', 'Controls the popup width.'],
  ['--dialog-max-width', 'calc(100vw - var(--spacing-8))', 'Controls the popup max width.'],
  ['--dialog-padding', 'var(--spacing-6)', 'Controls the popup padding.'],
  ['--dialog-radius', 'var(--radius-lg)', 'Controls the popup border radius.'],
  ['--dialog-bg', 'var(--color-popover)', 'Controls the popup background color.'],
  ['--dialog-color', 'var(--color-popover-foreground)', 'Controls the popup text color.'],
  ['--dialog-border-color', 'var(--color-border)', 'Controls the popup border color.'],
  ['--dialog-shadow', 'var(--shadow-lg)', 'Controls the popup shadow.'],
  [
    '--dialog-backdrop-bg',
    'var(--backdrop-bg, var(--color-overlay))',
    'Controls the backdrop background.',
  ],
  [
    '--dialog-control-bg',
    'var(--color-background)',
    'Controls trigger and close button backgrounds.',
  ],
  [
    '--dialog-control-bg-hover',
    'var(--color-accent)',
    'Controls trigger and close button hover backgrounds.',
  ],
  [
    '--dialog-control-border-color',
    'var(--color-border)',
    'Controls trigger and close button border color.',
  ],
  [
    '--dialog-control-radius',
    'var(--radius-md)',
    'Controls trigger and close button border radius.',
  ],
  ['--dialog-title-font-size', 'var(--text-lg)', 'Controls title font size.'],
  [
    '--dialog-description-color',
    'var(--dialog-muted-color)',
    'Controls description and body text color.',
  ],
  ['--dialog-footer-gap', 'var(--spacing-2)', 'Controls spacing between footer actions.'],
  ['--dialog-viewport-padding', 'var(--spacing-4)', 'Controls viewport padding.'],
  ['--dialog-close-icon-size', '1.75rem', 'Controls close icon button size.'],
  ['--dialog-close-icon-glyph-size', '0.75rem', 'Controls the default close icon glyph size.'],
];
export const dialogPlaygroundCssProperties: CssPropertyInput[] = [
  ['--dialog-radius', 'var(--radius-lg)', 'Controls the popup border radius.'],
  ['--dialog-bg', 'var(--color-popover)', 'Controls popup background color.'],
  ['--dialog-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--dialog-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--dialog-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--dialog-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Controls backdrop.'],
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
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export function DialogHandleExample() {
  const dialogHandle = React.useMemo(() => createDialogHandle(), []);

  return (
    <React.Fragment>
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
    </React.Fragment>
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
          <ScrollArea className={styles.scrollArea} classNames={{ content: styles.scrollContent }}>
            {insideScrollSections.map((item) => (
              <section key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </section>
            ))}
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
      <DialogContent withBackdrop={false}>
        <DialogHeader>
          <DialogTitle>Non-modal dialog</DialogTitle>
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

export function CustomStylesDialogExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Open outside close icon</DialogTrigger>
      <DialogContent
        className={styles.customPopup}
        classNames={{
          portal: styles.customPortal,
          backdrop: styles.customBackdrop,
          viewport: styles.customViewport,
        }}
        slotProps={{
          portal: { keepMounted: true },
          backdrop: { forceRender: true },
        }}
      >
        <DialogCloseIcon aria-label="Close profile dialog" className={styles.customCloseIcon}>
          <CloseLineIcon />
        </DialogCloseIcon>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            This popup, backdrop, viewport, and close icon are styled with className and classNames.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p>Update the public profile fields and save changes.</p>
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button />}>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}