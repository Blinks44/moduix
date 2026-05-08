import type { ToastPlacement, ToastStackBehavior } from 'moduix';
import {
  Button,
  CloseLineIcon,
  InfoIcon,
  ToastAnchoredRegion,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastProvider,
  ToastRegion,
  ToastRoot,
  ToastTitle,
  createToastManager,
  useAnchoredToastManager,
  useToastManager,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './toast.module.css';

const globalToastManager = createToastManager();
const placements: ToastPlacement[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

export const toastCssProperties: CssPropertyInput[] = [
  ['--toast-viewport-width', '20rem', 'Controls the fixed toast viewport width.'],
  ['--toast-viewport-inset', '1rem', 'Controls viewport distance from the window edge.'],
  ['--toast-z-index', 'var(--z-toast)', 'Controls toast portal and stack z-index.'],
  ['--toast-bg', 'var(--color-popover)', 'Controls toast background color.'],
  ['--toast-color', 'var(--color-popover-foreground)', 'Controls toast text color.'],
  ['--toast-border-color', 'var(--color-border)', 'Controls toast border color.'],
  ['--toast-radius', 'var(--radius-lg)', 'Controls toast border radius.'],
  ['--toast-shadow', 'var(--shadow-lg)', 'Controls toast shadow.'],
  ['--toast-padding', '1rem', 'Controls root toast padding.'],
  ['--toast-stack-gap', '0.75rem', 'Controls expanded stack spacing.'],
  ['--toast-stack-peek', '0.75rem', 'Controls collapsed stack offset.'],
  [
    '--toast-transition',
    '0.5s cubic-bezier(0.22, 1, 0.36, 1)',
    'Controls toast movement transition.',
  ],
  ['--toast-content-gap', '0.25rem', 'Controls spacing inside toast content.'],
  ['--toast-title-font-size', 'var(--text-sm)', 'Controls title font size.'],
  ['--toast-description-color', 'var(--color-muted-foreground)', 'Controls description color.'],
  ['--toast-action-bg', 'var(--color-background)', 'Controls action button background.'],
  ['--toast-action-bg-hover', 'var(--color-accent)', 'Controls action hover background.'],
  ['--toast-action-border-color', 'var(--color-border)', 'Controls action border color.'],
  ['--toast-action-color', 'var(--color-foreground)', 'Controls action text color.'],
  ['--toast-action-font-size', 'var(--text-xs)', 'Controls action font size.'],
  ['--toast-action-font-weight', 'var(--weight-medium)', 'Controls action font weight.'],
  ['--toast-action-radius', 'var(--radius-sm)', 'Controls action button border radius.'],
  ['--toast-action-padding-x', '0.5rem', 'Controls action horizontal padding.'],
  ['--toast-action-padding-y', '0.25rem', 'Controls action vertical padding.'],
  ['--toast-close-size', '1.25rem', 'Controls close button size.'],
  ['--toast-close-icon-size', '1rem', 'Controls default close icon size.'],
  ['--toast-close-color', 'var(--color-muted-foreground)', 'Controls close button color.'],
  ['--toast-close-bg-hover', 'var(--color-accent)', 'Controls close hover background.'],
  ['--toast-focus-ring-color', 'var(--color-ring)', 'Controls action and close focus rings.'],
  ['--toast-anchored-padding-x', '0.5rem', 'Controls anchored toast horizontal padding.'],
  ['--toast-anchored-padding-y', '0.25rem', 'Controls anchored toast vertical padding.'],
  ['--toast-anchored-font-size', 'var(--text-sm)', 'Controls anchored toast font size.'],
];

export function ToastExample() {
  return (
    <ToastProvider>
      <CreateToastButton />
      <ToastRegion />
    </ToastProvider>
  );
}

export function ActionToastExample() {
  return (
    <ToastProvider>
      <ActionToastButton />
      <ToastRegion />
    </ToastProvider>
  );
}

export function PlacementToastExample() {
  const [placement, setPlacement] = React.useState<ToastPlacement>('bottom-right');

  return (
    <ToastProvider>
      <div className={styles.stack}>
        <div className={styles.segmented}>
          {placements.map((item) => (
            <button
              key={item}
              type="button"
              className={styles.segment}
              data-active={item === placement || undefined}
              onClick={() => setPlacement(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <PlacementToastButton placement={placement} />
      </div>
      <ToastRegion placement={placement} />
    </ToastProvider>
  );
}

export function ExpandedToastExample() {
  return (
    <ToastProvider>
      <StackedToastButton stackBehavior="expanded" />
      <ToastRegion placement="bottom-right" stackBehavior="expanded" />
    </ToastProvider>
  );
}

export function GlobalManagerToastExample() {
  return (
    <ToastProvider toastManager={globalToastManager}>
      <Button
        onClick={() =>
          globalToastManager.add({
            title: 'Global toast',
            description: 'Created with createToastManager().',
          })
        }
      >
        Create global toast
      </Button>
      <ToastRegion />
    </ToastProvider>
  );
}

export function CustomToastExample() {
  const toastManager = React.useMemo(() => createToastManager(), []);

  return (
    <ToastProvider toastManager={toastManager}>
      <Button
        onClick={() =>
          toastManager.add({
            title: 'Custom composition',
            description: 'Every important part accepts className and custom children.',
          })
        }
      >
        Create custom toast
      </Button>
      <ToastRegion
        renderToast={(toast) => (
          <ToastRoot key={toast.id} toast={toast} className={styles.customToast}>
            <ToastContent className={styles.customContent}>
              <InfoIcon className={styles.customIcon} />
              <ToastTitle />
              <ToastDescription />
              <ToastClose aria-label="Close toast">
                <CloseLineIcon className={styles.closeIcon} />
              </ToastClose>
            </ToastContent>
          </ToastRoot>
        )}
      />
    </ToastProvider>
  );
}

export function AnchoredToastExample() {
  return (
    <ToastProvider>
      <AnchoredToastActions />
      <ToastAnchoredRegion />
    </ToastProvider>
  );
}

export function ToastAndAnchoredToastExample() {
  return (
    <ToastProvider>
      <div className={styles.stack}>
        <CreateToastButton />
        <AnchoredToastActions />
      </div>
      <ToastRegion />
      <ToastAnchoredRegion />
    </ToastProvider>
  );
}

function AnchoredToastActions() {
  const copyRef = React.useRef<HTMLButtonElement | null>(null);
  const saveRef = React.useRef<HTMLButtonElement | null>(null);
  const anchoredToast = useAnchoredToastManager();

  function showAnchored(anchor: HTMLButtonElement | null, description: string) {
    if (!anchor) {
      return;
    }

    anchoredToast.show({
      anchor,
      description,
      timeout: 1800,
    });
  }

  return (
    <div className={styles.anchoredActions}>
      <Button ref={copyRef} onClick={() => showAnchored(copyRef.current, 'Copied')}>
        Copy
      </Button>
      <Button
        ref={saveRef}
        variant="outline"
        onClick={() => showAnchored(saveRef.current, 'Saved')}
      >
        Save
      </Button>
    </div>
  );
}

function CreateToastButton() {
  const toastManager = useToastManager();
  const [count, setCount] = React.useState(0);

  function createToast() {
    const next = count + 1;
    setCount(next);
    toastManager.add({
      title: `Toast ${next}`,
      description: 'This notification is rendered in the shared toast region.',
    });
  }

  return <Button onClick={createToast}>Create toast</Button>;
}

function ActionToastButton() {
  const toastManager = useToastManager();

  return (
    <Button
      onClick={() =>
        toastManager.add({
          title: 'File uploaded',
          description: 'The file is ready to share.',
          actionProps: {
            children: 'Undo',
            onClick: () => toastManager.add({ description: 'Upload reverted.' }),
          },
        })
      }
    >
      Create action toast
    </Button>
  );
}

function PlacementToastButton({ placement }: { placement: ToastPlacement }) {
  const toastManager = useToastManager();

  return (
    <Button
      onClick={() =>
        toastManager.add({
          title: 'Placement',
          description: `Current placement: ${placement}`,
        })
      }
    >
      Show {placement}
    </Button>
  );
}

function StackedToastButton({ stackBehavior }: { stackBehavior: ToastStackBehavior }) {
  const toastManager = useToastManager();
  const [count, setCount] = React.useState(0);

  function createToast() {
    const next = count + 1;
    setCount(next);
    toastManager.add({
      title: `Stacked toast ${next}`,
      description: 'Create several notifications to compare the expanded stack behavior.',
    });
  }

  return <Button onClick={createToast}>Create {stackBehavior} toast</Button>;
}