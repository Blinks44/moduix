import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogViewport,
  Button,
  ScrollArea,
  createAlertDialogHandle,
} from 'moduix';
import { useMemo, useState } from 'react';
import { insideScrollSections } from '@/data/insideScrollSections';
import type { CSSPropertiesEditorContext, CssProperty } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './alert-dialog.module.css';

export const alertDialogOverrideCssProperties: CssProperty[] = [
  {
    name: '--alert-dialog-action-bg',
    defaultValue: 'var(--color-primary)',
    description: 'Controls action button background.',
  },
  {
    name: '--alert-dialog-action-bg-hover',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls action button hover background.',
  },
  {
    name: '--alert-dialog-action-border-color',
    defaultValue: 'var(--color-primary)',
    description: 'Controls action button border color.',
  },
  {
    name: '--alert-dialog-action-color',
    defaultValue: 'var(--color-primary-foreground)',
    description: 'Controls action button text color.',
  },
  {
    name: '--alert-dialog-backdrop-bg',
    defaultValue: 'var(--backdrop-bg, var(--color-overlay))',
    description: 'Controls backdrop background.',
  },
  {
    name: '--alert-dialog-backdrop-blur',
    defaultValue: '4px',
    description: 'Controls backdrop blur.',
  },
  {
    name: '--alert-dialog-backdrop-transition',
    defaultValue: 'var(--transition-default)',
    description: 'Controls backdrop transition timing.',
  },
  {
    name: '--alert-dialog-bg',
    defaultValue: 'var(--color-popover)',
    description: 'Controls popup background color.',
  },
  {
    name: '--alert-dialog-border-color',
    defaultValue: 'var(--color-border)',
    description: 'Controls popup border color.',
  },
  {
    name: '--alert-dialog-border-width',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls popup border width.',
  },
  {
    name: '--alert-dialog-cancel-bg',
    defaultValue: 'var(--alert-dialog-control-bg, var(--color-background))',
    description: 'Controls cancel button background.',
  },
  {
    name: '--alert-dialog-cancel-bg-hover',
    defaultValue: 'var(--alert-dialog-control-bg-hover, var(--color-accent))',
    description: 'Controls cancel button hover background.',
  },
  {
    name: '--alert-dialog-cancel-border-color',
    defaultValue: 'var(--color-border)',
    description: 'Controls cancel button border color.',
  },
  {
    name: '--alert-dialog-cancel-color',
    defaultValue: 'var(--alert-dialog-control-color, var(--color-foreground))',
    description: 'Controls cancel button text color.',
  },
  {
    name: '--alert-dialog-color',
    defaultValue: 'var(--color-popover-foreground)',
    description: 'Controls popup text color.',
  },
  {
    name: '--alert-dialog-control-bg',
    defaultValue: 'var(--color-background)',
    description: 'Controls control background.',
  },
  {
    name: '--alert-dialog-control-bg-hover',
    defaultValue: 'var(--color-accent)',
    description: 'Controls control hover background.',
  },
  {
    name: '--alert-dialog-control-border-color',
    defaultValue: 'var(--color-border)',
    description: 'Controls control border color.',
  },
  {
    name: '--alert-dialog-control-border-width',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls control border width.',
  },
  {
    name: '--alert-dialog-control-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls control text color.',
  },
  {
    name: '--alert-dialog-control-font-size',
    defaultValue: 'var(--text-md)',
    description: 'Controls control font size.',
  },
  {
    name: '--alert-dialog-control-height',
    defaultValue: 'var(--size-lg)',
    description: 'Controls control minimum height.',
  },
  {
    name: '--alert-dialog-control-line-height',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls control line height.',
  },
  {
    name: '--alert-dialog-control-padding-x',
    defaultValue: '0.875rem',
    description: 'Controls control horizontal padding.',
  },
  {
    name: '--alert-dialog-control-padding-y',
    defaultValue: '0.5rem',
    description: 'Controls control vertical padding.',
  },
  {
    name: '--alert-dialog-control-radius',
    defaultValue: 'var(--radius-md)',
    description: 'Controls control border radius.',
  },
  {
    name: '--alert-dialog-description-color',
    defaultValue: 'var(--alert-dialog-muted-color, var(--color-muted-foreground))',
    description: 'Controls description and body text color.',
  },
  {
    name: '--alert-dialog-description-font-size',
    defaultValue: 'var(--text-md)',
    description: 'Controls description and body font size.',
  },
  {
    name: '--alert-dialog-description-line-height',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls description and body line height.',
  },
  {
    name: '--alert-dialog-focus-ring-color',
    defaultValue: 'var(--color-ring)',
    description: 'Controls focus ring color.',
  },
  {
    name: '--alert-dialog-focus-ring-width',
    defaultValue: 'var(--alert-dialog-control-border-width, var(--border-width-sm))',
    description: 'Controls focus ring width.',
  },
  {
    name: '--alert-dialog-footer-gap',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls footer actions gap.',
  },
  {
    name: '--alert-dialog-header-gap',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls header gap.',
  },
  {
    name: '--alert-dialog-max-width',
    defaultValue: 'calc(100vw - var(--spacing-8, 2rem))',
    description: 'Controls popup max width.',
  },
  {
    name: '--alert-dialog-muted-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls muted text color.',
  },
  {
    name: '--alert-dialog-padding',
    defaultValue: 'var(--spacing-6)',
    description: 'Controls popup padding.',
  },
  {
    name: '--alert-dialog-radius',
    defaultValue: 'var(--radius-lg)',
    description: 'Controls popup border radius.',
  },
  {
    name: '--alert-dialog-shadow',
    defaultValue: 'var(--shadow-lg)',
    description: 'Controls popup shadow.',
  },
  {
    name: '--alert-dialog-title-color',
    defaultValue: 'var(--alert-dialog-color, var(--color-popover-foreground))',
    description: 'Controls title text color.',
  },
  {
    name: '--alert-dialog-title-font-size',
    defaultValue: 'var(--text-lg)',
    description: 'Controls title font size.',
  },
  {
    name: '--alert-dialog-title-font-weight',
    defaultValue: 'var(--weight-semibold)',
    description: 'Controls title font weight.',
  },
  {
    name: '--alert-dialog-title-line-height',
    defaultValue: 'var(--line-height-text-lg)',
    description: 'Controls title line height.',
  },
  {
    name: '--alert-dialog-transition',
    defaultValue: 'var(--transition-default)',
    description: 'Controls popup transition timing.',
  },
  {
    name: '--alert-dialog-trigger-color',
    defaultValue: 'var(--color-destructive)',
    description: 'Controls trigger text color.',
  },
  {
    name: '--alert-dialog-viewport-padding',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls viewport padding.',
  },
  { name: '--alert-dialog-width', defaultValue: '24rem', description: 'Controls popup width.' },
];

export const alertDialogPlaygroundCssProperties: CssProperty[] = [
  {
    name: '--alert-dialog-backdrop-bg',
    defaultValue: 'var(--backdrop-bg, var(--color-overlay))',
    description: 'Controls backdrop.',
  },
  {
    name: '--alert-dialog-backdrop-blur',
    defaultValue: '4px',
    description: 'Controls backdrop blur.',
  },
  {
    name: '--alert-dialog-bg',
    defaultValue: 'var(--color-popover)',
    description: 'Controls the popup background color.',
  },
  {
    name: '--alert-dialog-border-color',
    defaultValue: 'var(--color-border)',
    description: 'Controls popup border color.',
  },
  {
    name: '--alert-dialog-color',
    defaultValue: 'var(--color-popover-foreground)',
    description: 'Controls popup text color.',
  },
  {
    name: '--alert-dialog-description-color',
    defaultValue: 'var(--alert-dialog-muted-color, var(--color-muted-foreground))',
    description: 'Controls description and body text color.',
  },
  {
    name: '--alert-dialog-radius',
    defaultValue: 'var(--radius-lg)',
    description: 'Controls the popup border radius.',
  },
  {
    name: '--alert-dialog-shadow',
    defaultValue: 'var(--shadow-lg)',
    description: 'Controls popup shadow.',
  },
  {
    name: '--alert-dialog-title-color',
    defaultValue: 'var(--alert-dialog-color, var(--color-popover-foreground))',
    description: 'Controls title text color.',
  },
];

export function AlertDialogCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={alertDialogOverrideCssProperties} />;
}

export function AlertDialogCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={alertDialogPlaygroundCssProperties}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
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
    <>
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
    </>
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
    <>
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
    </>
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
      <AlertDialogPortal>
        <AlertDialogBackdrop className={styles.customBackdrop} />
        <AlertDialogViewport>
          <AlertDialogPopup className={styles.customPopup}>
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
          </AlertDialogPopup>
        </AlertDialogViewport>
      </AlertDialogPortal>
    </AlertDialog>
  );
}