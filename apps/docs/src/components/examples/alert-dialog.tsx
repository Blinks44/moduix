import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  ScrollArea,
  createAlertDialogHandle,
} from 'moduix';
import { Fragment, useMemo, useState } from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './alert-dialog.module.css';

export const alertDialogOverrideCssProperties: CssPropertyInput[] = [
  ['--alert-dialog-action-bg', 'var(--color-primary)', 'Controls action button background.'],
  [
    '--alert-dialog-action-bg-hover',
    'var(--color-foreground)',
    'Controls action button hover background.',
  ],
  [
    '--alert-dialog-action-border-color',
    'var(--color-primary)',
    'Controls action button border color.',
  ],
  [
    '--alert-dialog-action-color',
    'var(--color-primary-foreground)',
    'Controls action button text color.',
  ],
  [
    '--alert-dialog-backdrop-bg',
    'var(--backdrop-bg, var(--color-overlay))',
    'Controls backdrop background.',
  ],
  ['--alert-dialog-backdrop-blur', '4px', 'Controls backdrop blur.'],
  [
    '--alert-dialog-backdrop-transition',
    'var(--transition-default)',
    'Controls backdrop transition timing.',
  ],
  ['--alert-dialog-bg', 'var(--color-popover)', 'Controls popup background color.'],
  ['--alert-dialog-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--alert-dialog-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  [
    '--alert-dialog-cancel-bg',
    'var(--alert-dialog-control-bg, var(--color-background))',
    'Controls cancel button background.',
  ],
  [
    '--alert-dialog-cancel-bg-hover',
    'var(--alert-dialog-control-bg-hover, var(--color-accent))',
    'Controls cancel button hover background.',
  ],
  [
    '--alert-dialog-cancel-border-color',
    'var(--color-border)',
    'Controls cancel button border color.',
  ],
  [
    '--alert-dialog-cancel-color',
    'var(--alert-dialog-control-color, var(--color-foreground))',
    'Controls cancel button text color.',
  ],
  ['--alert-dialog-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--alert-dialog-control-bg', 'var(--color-background)', 'Controls control background.'],
  ['--alert-dialog-control-bg-hover', 'var(--color-accent)', 'Controls control hover background.'],
  ['--alert-dialog-control-border-color', 'var(--color-border)', 'Controls control border color.'],
  [
    '--alert-dialog-control-border-width',
    'var(--border-width-sm)',
    'Controls control border width.',
  ],
  ['--alert-dialog-control-color', 'var(--color-foreground)', 'Controls control text color.'],
  ['--alert-dialog-control-font-size', 'var(--text-md)', 'Controls control font size.'],
  ['--alert-dialog-control-height', 'var(--size-lg)', 'Controls control minimum height.'],
  [
    '--alert-dialog-control-line-height',
    'var(--line-height-text-md)',
    'Controls control line height.',
  ],
  ['--alert-dialog-control-padding-x', '0.875rem', 'Controls control horizontal padding.'],
  ['--alert-dialog-control-padding-y', '0.5rem', 'Controls control vertical padding.'],
  ['--alert-dialog-control-radius', 'var(--radius-md)', 'Controls control border radius.'],
  [
    '--alert-dialog-description-color',
    'var(--alert-dialog-muted-color, var(--color-muted-foreground))',
    'Controls description and body text color.',
  ],
  [
    '--alert-dialog-description-font-size',
    'var(--text-md)',
    'Controls description and body font size.',
  ],
  [
    '--alert-dialog-description-line-height',
    'var(--line-height-text-md)',
    'Controls description and body line height.',
  ],
  ['--alert-dialog-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--alert-dialog-focus-ring-width',
    'var(--alert-dialog-control-border-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--alert-dialog-footer-gap', 'var(--spacing-2)', 'Controls footer actions gap.'],
  ['--alert-dialog-header-gap', 'var(--spacing-1)', 'Controls header gap.'],
  ['--alert-dialog-max-width', 'calc(100vw - var(--spacing-8, 2rem))', 'Controls popup max width.'],
  ['--alert-dialog-muted-color', 'var(--color-muted-foreground)', 'Controls muted text color.'],
  ['--alert-dialog-padding', 'var(--spacing-6)', 'Controls popup padding.'],
  ['--alert-dialog-radius', 'var(--radius-lg)', 'Controls popup border radius.'],
  ['--alert-dialog-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  [
    '--alert-dialog-title-color',
    'var(--alert-dialog-color, var(--color-popover-foreground))',
    'Controls title text color.',
  ],
  ['--alert-dialog-title-font-size', 'var(--text-lg)', 'Controls title font size.'],
  ['--alert-dialog-title-font-weight', 'var(--weight-semibold)', 'Controls title font weight.'],
  ['--alert-dialog-title-line-height', 'var(--line-height-text-lg)', 'Controls title line height.'],
  ['--alert-dialog-transition', 'var(--transition-default)', 'Controls popup transition timing.'],
  ['--alert-dialog-trigger-color', 'var(--color-destructive)', 'Controls trigger text color.'],
  ['--alert-dialog-viewport-padding', 'var(--spacing-4)', 'Controls viewport padding.'],
  ['--alert-dialog-width', '24rem', 'Controls popup width.'],
];

export const alertDialogPlaygroundCssProperties: CssPropertyInput[] = [
  ['--alert-dialog-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Controls backdrop.'],
  ['--alert-dialog-backdrop-blur', '4px', 'Controls backdrop blur.'],
  ['--alert-dialog-bg', 'var(--color-popover)', 'Controls the popup background color.'],
  ['--alert-dialog-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--alert-dialog-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  [
    '--alert-dialog-description-color',
    'var(--alert-dialog-muted-color, var(--color-muted-foreground))',
    'Controls description and body text color.',
  ],
  ['--alert-dialog-radius', 'var(--radius-lg)', 'Controls the popup border radius.'],
  ['--alert-dialog-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  [
    '--alert-dialog-title-color',
    'var(--alert-dialog-color, var(--color-popover-foreground))',
    'Controls title text color.',
  ],
];

export function AlertDialogCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesReferenceTable
        properties={alertDialogOverrideCssProperties.map(normalizeCssProperty)}
      />
    </div>
  );
}

export function AlertDialogCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesEditor
        properties={alertDialogPlaygroundCssProperties.map(normalizeCssProperty)}
        values={values}
        onChange={onChange}
        onReset={onReset}
      />
    </div>
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function AlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Discard draft</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard draft?</AlertDialogTitle>
          <AlertDialogDescription>You cannot undo this action.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Discard</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ControlledAlertDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button type="button" onClick={() => setOpen(true)}>
        Open controlled dialog
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publish changes?</AlertDialogTitle>
            <AlertDialogDescription>
              This will make the latest version visible to all users.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Back to editing</AlertDialogCancel>
            <AlertDialogAction>Publish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}

export function AsyncAlertDialogExample() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const handleArchive = async () => {
    setPending(true);
    setError('');

    try {
      await new Promise((resolve, reject) => {
        window.setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve(null);
            return;
          }

          reject(new Error('Archive failed'));
        }, 900);
      });

      setOpen(false);
    } catch {
      setError('Workspace could not be archived. Review the warning and try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>Archive workspace</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive workspace?</AlertDialogTitle>
          <AlertDialogDescription>
            Keep the dialog open while the request is pending, then close it only after success.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error ? (
          <AlertDialogBody>
            <p>{error}</p>
          </AlertDialogBody>
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <Button type="button" disabled={pending} onClick={handleArchive}>
            {pending ? 'Archiving...' : 'Archive'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function AlertDialogHandleExample() {
  const alertDialogHandle = useMemo(() => createAlertDialogHandle(), []);

  return (
    <Fragment>
      <AlertDialogTrigger handle={alertDialogHandle}>Open from detached trigger</AlertDialogTrigger>
      <Button type="button" onClick={() => alertDialogHandle.open(null)}>
        Open programmatically
      </Button>

      <AlertDialog handle={alertDialogHandle}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
            <AlertDialogDescription>
              This alert dialog is connected via createAlertDialogHandle().
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}

export function ScrollableAlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete project</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes all deployment environments and API keys.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogBody className={styles.scrollBody}>
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
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete permanently</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function CustomCompositionAlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Reset environment</AlertDialogTrigger>
      <AlertDialogContent className={styles.customPopup}>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset environment?</AlertDialogTitle>
          <AlertDialogDescription>
            All runtime variables will return to their default values.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Reset</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}