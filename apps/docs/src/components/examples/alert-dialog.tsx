import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogCloseIcon,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  CloseLineIcon,
  ScrollArea,
} from 'moduix';
import * as React from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import type { CssPropertyInput } from '../preview';
import styles from './alert-dialog.module.css';

export const alertDialogCssProperties: CssPropertyInput[] = [
  ['--alert-dialog-width', '24rem', 'Controls the popup width.'],
  ['--alert-dialog-max-width', 'calc(100vw - var(--spacing-8))', 'Controls the popup max width.'],
  ['--alert-dialog-padding', 'var(--spacing-6)', 'Controls the popup padding.'],
  ['--alert-dialog-radius', 'var(--radius-lg)', 'Controls the popup border radius.'],
  ['--alert-dialog-bg', 'var(--color-popover)', 'Controls the popup background color.'],
  ['--alert-dialog-color', 'var(--color-popover-foreground)', 'Controls the popup text color.'],
  ['--alert-dialog-border-color', 'var(--color-border)', 'Controls the popup border color.'],
  ['--alert-dialog-shadow', 'var(--shadow-lg)', 'Controls the popup shadow.'],
  [
    '--alert-dialog-backdrop-bg',
    'var(--backdrop-bg, var(--color-overlay))',
    'Controls the backdrop background.',
  ],
  [
    '--alert-dialog-control-bg',
    'var(--color-background)',
    'Controls trigger and close button backgrounds.',
  ],
  [
    '--alert-dialog-control-bg-hover',
    'var(--color-accent)',
    'Controls trigger and close button hover backgrounds.',
  ],
  [
    '--alert-dialog-control-border-color',
    'var(--color-border)',
    'Controls trigger and close button border color.',
  ],
  [
    '--alert-dialog-control-radius',
    'var(--radius-md)',
    'Controls trigger and close button border radius.',
  ],
  ['--alert-dialog-trigger-color', 'var(--color-destructive)', 'Controls trigger text color.'],
  ['--alert-dialog-action-bg', 'var(--color-primary)', 'Controls the default action background.'],
  [
    '--alert-dialog-action-bg-hover',
    'var(--color-foreground)',
    'Controls the default action hover background.',
  ],
  [
    '--alert-dialog-action-color',
    'var(--color-primary-foreground)',
    'Controls the default action text color.',
  ],
  [
    '--alert-dialog-action-border-color',
    'var(--color-primary)',
    'Controls the default action border color.',
  ],
  [
    '--alert-dialog-cancel-bg',
    'var(--alert-dialog-control-bg, var(--color-background))',
    'Controls the outline cancel button background.',
  ],
  [
    '--alert-dialog-cancel-bg-hover',
    'var(--alert-dialog-control-bg-hover)',
    'Controls the outline cancel button hover background.',
  ],
  [
    '--alert-dialog-cancel-color',
    'var(--alert-dialog-control-color, var(--color-foreground))',
    'Controls the outline cancel button text color.',
  ],
  [
    '--alert-dialog-cancel-border-color',
    'var(--color-border)',
    'Controls the outline cancel button border color.',
  ],
  ['--alert-dialog-title-color', 'var(--alert-dialog-color)', 'Controls title text color.'],
  [
    '--alert-dialog-description-color',
    'var(--alert-dialog-muted-color)',
    'Controls description and body text color.',
  ],
  ['--alert-dialog-footer-gap', 'var(--spacing-2)', 'Controls spacing between footer actions.'],
  ['--alert-dialog-viewport-padding', 'var(--spacing-4)', 'Controls viewport padding.'],
  ['--alert-dialog-close-icon-size', '1.75rem', 'Controls close icon button size.'],
  [
    '--alert-dialog-close-icon-color',
    'var(--alert-dialog-muted-color)',
    'Controls the close icon color.',
  ],
  [
    '--alert-dialog-close-icon-glyph-size',
    '0.75rem',
    'Controls the default close icon glyph size.',
  ],
];

export function AlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button />}>Discard draft</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard draft?</AlertDialogTitle>
          <AlertDialogCloseIcon />
          <AlertDialogDescription>You cannot undo this action.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
          <AlertDialogAction render={<Button />}>Discard</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ControlledAlertDialogExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button />}>Open controlled dialog</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish changes?</AlertDialogTitle>
          <AlertDialogDescription>
            This will make the latest version visible to all users.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel render={<Button variant="outline" />}>
            Back to editing
          </AlertDialogCancel>
          <AlertDialogAction render={<Button />}>Publish</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ScrollableAlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button />}>Delete project</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogCloseIcon />
          <AlertDialogDescription>
            This removes all deployment environments and API keys.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogBody className={styles.scrollBody}>
          <ScrollArea className={styles.scrollArea} classNames={{ content: styles.scrollContent }}>
            {insideScrollSections.map((item) => (
              <section key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </section>
            ))}
          </ScrollArea>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
          <AlertDialogAction render={<Button />}>Delete permanently</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function CustomCloseIconAlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button />}>Archive workspace</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive workspace?</AlertDialogTitle>
          <AlertDialogCloseIcon
            aria-label="Close archive dialog"
            className={styles.customCloseIcon}
          >
            <CloseLineIcon />
          </AlertDialogCloseIcon>
          <AlertDialogDescription>
            Team members will lose access until the workspace is restored.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
          <AlertDialogAction render={<Button />}>Archive</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function CustomInternalSlotsAlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button />}>Reset environment</AlertDialogTrigger>
      <AlertDialogContent
        className={styles.customPopup}
        classNames={{
          backdrop: styles.customBackdrop,
          viewport: styles.customViewport,
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Reset environment?</AlertDialogTitle>
          <AlertDialogDescription>
            All runtime variables will return to their default values.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
          <AlertDialogAction render={<Button />}>Reset</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}