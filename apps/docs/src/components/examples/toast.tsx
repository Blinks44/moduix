import {
  type AnchoredToastOptions,
  Button,
  CloseIcon,
  InfoIcon,
  type ToastPlacement,
  type ToastStackBehavior,
  ToastAnchoredRegion,
  ToastArrow,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastRegion,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  createToastManager,
  useAnchoredToastManager,
  useToastManager,
} from 'moduix';
import { useRef, useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
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

export const toastOverrideCssProperties: CssPropertyInput[] = [
  ['--toast-action-bg', 'var(--color-background)', 'Controls action button background.'],
  ['--toast-action-bg-hover', 'var(--color-accent)', 'Controls action hover background.'],
  ['--toast-action-border-color', 'var(--color-border)', 'Controls action border color.'],
  [
    '--toast-action-border-width',
    'var(--toast-border-width, var(--border-width-sm))',
    'Controls action button border width.',
  ],
  ['--toast-action-color', 'var(--color-foreground)', 'Controls action text color.'],
  ['--toast-action-font-size', 'var(--text-xs)', 'Controls action font size.'],
  ['--toast-action-font-weight', 'var(--weight-medium)', 'Controls action font weight.'],
  ['--toast-action-line-height', 'var(--line-height-text-xs)', 'Controls action line height.'],
  ['--toast-action-margin-top', '0.5rem', 'Controls action spacing from the description.'],
  ['--toast-action-padding-x', '0.5rem', 'Controls action horizontal padding.'],
  ['--toast-action-padding-y', '0.25rem', 'Controls action vertical padding.'],
  ['--toast-action-radius', 'var(--radius-sm)', 'Controls action button border radius.'],
  ['--toast-anchored-arrow-height', '0.625rem', 'Controls anchored toast arrow height.'],
  ['--toast-anchored-arrow-offset-x', '-13px', 'Controls horizontal anchored arrow offset.'],
  ['--toast-anchored-arrow-offset-y', '-8px', 'Controls vertical anchored arrow offset.'],
  ['--toast-anchored-arrow-width', '1.25rem', 'Controls anchored toast arrow width.'],
  ['--toast-anchored-font-size', 'var(--text-sm)', 'Controls anchored toast font size.'],
  [
    '--toast-anchored-line-height',
    'var(--line-height-text-sm)',
    'Controls anchored toast line height.',
  ],
  ['--toast-anchored-max-width', '20rem', 'Controls anchored toast max width.'],
  ['--toast-anchored-padding-x', '0.5rem', 'Controls anchored toast horizontal padding.'],
  ['--toast-anchored-padding-y', '0.25rem', 'Controls anchored toast vertical padding.'],
  ['--toast-anchored-scale', '0.9', 'Controls anchored toast entering/leaving scale.'],
  [
    '--toast-anchored-transition',
    'transform 150ms, opacity 150ms',
    'Controls anchored toast transition.',
  ],
  ['--toast-bg', 'var(--color-popover)', 'Controls toast background color.'],
  ['--toast-border-color', 'var(--color-border)', 'Controls toast border color.'],
  ['--toast-border-width', 'var(--border-width-sm)', 'Controls toast border width.'],
  ['--toast-close-bg', 'transparent', 'Controls close button background.'],
  ['--toast-close-bg-hover', 'var(--color-accent)', 'Controls close hover background.'],
  ['--toast-close-color', 'var(--color-muted-foreground)', 'Controls close button color.'],
  ['--toast-close-color-hover', 'var(--color-foreground)', 'Controls close hover color.'],
  ['--toast-close-focus-ring-offset', '0', 'Controls close button focus ring offset.'],
  ['--toast-close-icon-size', '1rem', 'Controls default close icon size.'],
  ['--toast-close-offset-right', '0.5rem', 'Controls close button right offset.'],
  ['--toast-close-offset-top', '0.5rem', 'Controls close button top offset.'],
  ['--toast-close-padding', '0', 'Controls close button inner padding.'],
  ['--toast-close-radius', 'var(--radius-sm)', 'Controls close button border radius.'],
  ['--toast-close-size', '1.25rem', 'Controls close button size.'],
  ['--toast-color', 'var(--color-popover-foreground)', 'Controls toast text color.'],
  ['--toast-content-gap', '0.25rem', 'Controls spacing inside toast content.'],
  ['--toast-description-color', 'var(--color-muted-foreground)', 'Controls description color.'],
  ['--toast-description-font-size', 'var(--text-sm)', 'Controls description font size.'],
  [
    '--toast-description-line-height',
    'var(--line-height-text-sm)',
    'Controls description line height.',
  ],
  ['--toast-focus-ring-color', 'var(--color-ring)', 'Controls action and close focus rings.'],
  ['--toast-focus-ring-offset', '0', 'Controls anchored toast focus ring offset.'],
  [
    '--toast-focus-ring-width',
    'var(--toast-border-width, var(--border-width-sm))',
    'Controls action and close focus ring width.',
  ],
  ['--toast-padding', '1rem', 'Controls root toast padding.'],
  ['--toast-radius', 'var(--radius-lg)', 'Controls toast border radius.'],
  ['--toast-shadow', 'var(--shadow-lg)', 'Controls toast shadow.'],
  ['--toast-stack-gap', '0.75rem', 'Controls expanded stack spacing.'],
  ['--toast-stack-peek', '0.75rem', 'Controls collapsed stack offset.'],
  ['--toast-title-font-size', 'var(--text-sm)', 'Controls title font size.'],
  ['--toast-title-font-weight', 'var(--weight-semibold)', 'Controls title font weight.'],
  ['--toast-title-line-height', 'var(--line-height-text-sm)', 'Controls title line height.'],
  [
    '--toast-transition',
    '0.5s cubic-bezier(0.22, 1, 0.36, 1)',
    'Controls toast movement transition.',
  ],
  ['--toast-viewport-inset', '1rem', 'Controls viewport distance from the window edge.'],
  ['--toast-viewport-width', '20rem', 'Controls the fixed toast viewport width.'],
  ['--toast-z-index', 'var(--z-toast)', 'Controls toast portal and stack z-index.'],
];

export const toastPlaygroundCssProperties: CssPropertyInput[] = [
  ['--toast-action-bg', 'var(--color-background)', 'Controls action button background.'],
  ['--toast-action-border-color', 'var(--color-border)', 'Controls action border color.'],
  ['--toast-bg', 'var(--color-popover)', 'Controls toast background color.'],
  ['--toast-border-color', 'var(--color-border)', 'Controls toast border color.'],
  ['--toast-color', 'var(--color-popover-foreground)', 'Controls toast text color.'],
  ['--toast-description-color', 'var(--color-muted-foreground)', 'Controls description color.'],
  ['--toast-focus-ring-color', 'var(--color-ring)', 'Controls action and close focus rings.'],
  ['--toast-radius', 'var(--radius-lg)', 'Controls toast border radius.'],
  ['--toast-shadow', 'var(--shadow-lg)', 'Controls toast shadow.'],
  ['--toast-title-font-size', 'var(--text-sm)', 'Controls title font size.'],
];

export function ToastCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={toastOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function ToastCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={toastPlaygroundCssProperties.map(normalizeCssProperty)}
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
  const [placement, setPlacement] = useState<ToastPlacement>('bottom-right');

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
  return (
    <ToastProvider>
      <CustomToastExampleContent />
    </ToastProvider>
  );
}

export function ManualToastCompositionExample() {
  return (
    <ToastProvider>
      <ManualToastButton />
      <ManualToastRegion />
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

export function CustomAnchoredToastExample() {
  return (
    <ToastProvider>
      <AnchoredToastActions />
      <ToastAnchoredRegion
        renderToast={(toast) => (
          <ToastRoot key={toast.id} toast={toast} className={styles.customToast}>
            <ToastArrow />
            <ToastContent className={styles.customAnchoredContent}>
              <InfoIcon className={styles.customAnchoredIcon} />
              <ToastDescription />
            </ToastContent>
          </ToastRoot>
        )}
      />
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

function CustomToastExampleContent() {
  const toastManager = useToastManager();

  return (
    <>
      <Button
        onClick={() =>
          toastManager.add({
            title: 'Custom composition',
            description: 'Every important part stays composable without slot prop APIs.',
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
                <CloseIcon className={styles.closeIcon} />
              </ToastClose>
            </ToastContent>
          </ToastRoot>
        )}
      />
    </>
  );
}

function ManualToastRegion() {
  const { toasts } = useToastManager();

  return (
    <ToastPortal>
      <ToastViewport placement="bottom-left">
        {toasts.map((toast) => (
          <ToastRoot key={toast.id} toast={toast} className={styles.customToast}>
            <ToastContent className={styles.customContent}>
              <InfoIcon className={styles.customIcon} />
              <ToastTitle />
              <ToastDescription />
              <ToastClose aria-label="Close toast">
                <CloseIcon className={styles.closeIcon} />
              </ToastClose>
            </ToastContent>
          </ToastRoot>
        ))}
      </ToastViewport>
    </ToastPortal>
  );
}

function AnchoredToastActions() {
  const copyRef = useRef<HTMLButtonElement | null>(null);
  const saveRef = useRef<HTMLButtonElement | null>(null);
  const shareRef = useRef<HTMLButtonElement | null>(null);
  const anchoredToast = useAnchoredToastManager();

  const showAnchored = (
    anchor: HTMLButtonElement | null,
    description: string,
    positionerProps?: AnchoredToastOptions['positionerProps'],
  ) => {
    if (!anchor) {
      return;
    }

    anchoredToast.show({
      anchor,
      description,
      timeout: 1800,
      positionerProps,
    });
  };

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
      <Button
        ref={shareRef}
        variant="secondary"
        onClick={() =>
          showAnchored(shareRef.current, 'Shared', {
            side: 'bottom',
          })
        }
      >
        Share (bottom)
      </Button>
    </div>
  );
}

function CreateToastButton() {
  const toastManager = useToastManager();
  const [count, setCount] = useState(0);

  const createToast = () => {
    const next = count + 1;
    setCount(next);
    toastManager.add({
      title: `Toast ${next}`,
      description: 'This notification is rendered in the shared toast region.',
    });
  };

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
  const [count, setCount] = useState(0);

  const createToast = () => {
    const next = count + 1;
    setCount(next);
    toastManager.add({
      title: `Stacked toast ${next}`,
      description: 'Create several notifications to compare the expanded stack behavior.',
    });
  };

  return <Button onClick={createToast}>Create {stackBehavior} toast</Button>;
}

function ManualToastButton() {
  const toastManager = useToastManager();

  return (
    <Button
      onClick={() =>
        toastManager.add({
          title: 'Manual viewport',
          description: 'This stack is assembled from ToastPortal and ToastViewport.',
        })
      }
    >
      Create manual toast
    </Button>
  );
}