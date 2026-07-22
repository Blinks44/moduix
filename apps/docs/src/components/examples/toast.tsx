import type { ToastPlacement } from '@ark-ui/react/toast';
import { Button, Toaster, createToaster } from '@moduix/react';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';
import styles from './toast.module.css';
type ToastToaster = ReturnType<typeof createToaster>;
const maxToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16, max: 3 });
const placements = ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'] as const;
const placementToasters: Record<ToastPlacement, ToastToaster> = {
  'top-start': createToaster({ placement: 'top-start', overlap: true, gap: 16 }),
  top: createToaster({ placement: 'top', overlap: true, gap: 16 }),
  'top-end': createToaster({ placement: 'top-end', overlap: true, gap: 16 }),
  'bottom-start': createToaster({ placement: 'bottom-start', overlap: true, gap: 16 }),
  bottom: createToaster({ placement: 'bottom', overlap: true, gap: 16 }),
  'bottom-end': createToaster({ placement: 'bottom-end', overlap: true, gap: 16 }),
};

const toastOverrideCssProperties: CssPropertyInput[] = [
  ['--toast-action-bg', 'transparent', 'Controls action button background.'],
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
  ['--toast-action-gap', 'var(--spacing-2)', 'Controls spacing inside action buttons.'],
  ['--toast-action-line-height', 'var(--line-height-text-xs)', 'Controls action line height.'],
  [
    '--toast-action-margin-top',
    'var(--spacing-2)',
    'Controls action spacing from the description.',
  ],
  ['--toast-action-min-height', 'var(--size-xs)', 'Controls action button minimum height.'],
  ['--toast-action-padding-x', 'var(--spacing-2)', 'Controls action horizontal padding.'],
  ['--toast-action-padding-y', 'var(--spacing-1)', 'Controls action vertical padding.'],
  ['--toast-action-radius', 'var(--radius-sm)', 'Controls action button border radius.'],
  ['--toast-bg', 'var(--color-popover)', 'Controls toast background color.'],
  ['--toast-border-color', 'var(--color-border)', 'Controls toast border color.'],
  ['--toast-border-width', 'var(--border-width-sm)', 'Controls toast border width.'],
  ['--toast-close-bg', 'transparent', 'Controls close button background.'],
  ['--toast-close-bg-hover', 'var(--color-muted)', 'Controls close hover background.'],
  ['--toast-close-color', 'var(--color-muted-foreground)', 'Controls close button color.'],
  ['--toast-close-color-hover', 'var(--color-foreground)', 'Controls close hover color.'],
  [
    '--toast-close-focus-ring-offset',
    'var(--focus-ring-offset)',
    'Controls close button focus ring offset.',
  ],
  [
    '--toast-close-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls close button focus ring width.',
  ],
  ['--toast-close-icon-size', 'var(--spacing-3)', 'Controls default close icon size.'],
  ['--toast-close-offset-right', 'var(--spacing-2)', 'Controls close button right offset.'],
  ['--toast-close-offset-top', 'var(--spacing-2)', 'Controls close button top offset.'],
  ['--toast-close-radius', 'var(--radius-sm)', 'Controls close button border radius.'],
  ['--toast-close-size', 'var(--spacing-7)', 'Controls close button size.'],
  [
    '--toast-close-transition',
    'var(--transition-default)',
    'Controls close button transition timing.',
  ],
  ['--toast-color', 'var(--color-popover-foreground)', 'Controls toast text color.'],
  [
    '--toast-content-gap',
    'var(--spacing-1)',
    'Controls spacing between title, description, and action.',
  ],
  ['--toast-description-color', 'var(--color-muted-foreground)', 'Controls description color.'],
  ['--toast-description-font-size', 'var(--text-sm)', 'Controls description font size.'],
  [
    '--toast-description-line-height',
    'var(--line-height-text-sm)',
    'Controls description line height.',
  ],
  ['--toast-focus-ring-color', 'var(--color-ring)', 'Controls action and close focus rings.'],
  ['--toast-focus-ring-offset', '0', 'Controls action focus ring offset.'],
  [
    '--toast-focus-ring-width',
    'var(--toast-action-border-width, var(--focus-ring-inset-width, var(--border-width-sm)))',
    'Controls action and close focus ring width.',
  ],
  ['--toast-min-height', '0', 'Controls root toast minimum height.'],
  ['--toast-padding', 'var(--spacing-4)', 'Controls root toast padding.'],
  ['--toast-radius', 'var(--radius-lg)', 'Controls toast border radius.'],
  ['--toast-shadow', 'var(--shadow-lg)', 'Controls toast shadow.'],
  ['--toast-title-font-size', 'var(--text-sm)', 'Controls title font size.'],
  ['--toast-title-gap', 'var(--spacing-2)', 'Controls spacing inside title content.'],
  ['--toast-title-font-weight', 'var(--weight-semibold)', 'Controls title font weight.'],
  ['--toast-title-line-height', 'var(--line-height-text-sm)', 'Controls title line height.'],
  ['--toast-transition', '400ms', 'Controls toast movement transition.'],
  ['--toast-transition-out', '400ms', 'Controls exit movement transition.'],
  ['--toast-opacity-transition-out', '200ms', 'Controls exit opacity transition.'],
  [
    '--toast-viewport-inset',
    'var(--spacing-4)',
    'Controls toast max-width distance from the window edge.',
  ],
  ['--toast-width', '20rem', 'Controls toast width.'],
  ['--toast-z-index', 'var(--z-toast)', 'Controls toast stack z-index.'],
];

export const toastExampleCss = `
.toast-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.toast-custom {
  --toast-bg: var(--color-primary);
  --toast-color: var(--color-primary-foreground);
  --toast-border-color: var(--color-primary);
  --toast-description-color: color-mix(in srgb, var(--color-primary-foreground) 72%, transparent);
  --toast-close-color: var(--color-primary-foreground);
  --toast-close-color-hover: var(--color-primary-foreground);
  --toast-close-bg-hover: color-mix(in srgb, var(--color-primary-foreground) 14%, transparent);
}
`;

export function ToastCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={toastOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function MaxToastsToastExample() {
  return (
    <>
      <div className={styles.typedActions}>
        <Button
          onClick={() =>
            maxToaster.info({
              title: 'New notification',
              description: 'You have a new message in your inbox.',
            })
          }
        >
          Add notification
        </Button>
        <Button
          onClick={() => {
            [
              'John liked your post',
              'Sarah commented on your photo',
              'New follower: @designpro',
              'Your post was shared 10 times',
              'Meeting reminder in 15 minutes',
            ].forEach((description) => {
              maxToaster.info({ title: 'Notification', description });
            });
          }}
        >
          Add 5 notifications
        </Button>
      </div>
      <ToastRenderer toaster={maxToaster} />
    </>
  );
}

export function PlacementToastExample() {
  const [placement, setPlacement] = useState<ToastPlacement>('bottom-end');
  const toaster = placementToasters[placement];

  return (
    <>
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
        <Button
          onClick={() =>
            toaster.info({
              title: 'Notification',
              description: `This toast appears at ${placement}.`,
            })
          }
        >
          Show {placement}
        </Button>
      </div>
      {placements.map((item) => (
        <ToastRenderer key={item} toaster={placementToasters[item]} />
      ))}
    </>
  );
}

function ToastRenderer({ toaster }: { toaster: ToastToaster }) {
  return <Toaster toaster={toaster} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}