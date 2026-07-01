import {
  Button,
  CloseIcon,
  InfoIcon,
  Toast,
  Toaster,
  createToaster,
  type ToastOptions,
  type ToastPlacement,
} from '@moduix/react';
import { useRef, useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './toast.module.css';

type ToastType = Extract<ToastOptions['type'], 'success' | 'error' | 'warning' | 'info'>;
type ToastToaster = ReturnType<typeof createToaster>;

const basicToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
const actionToaster = createToaster({ placement: 'bottom-end', gap: 24 });
const durationToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
const expandedToaster = createToaster({
  placement: 'bottom-end',
  overlap: false,
  gap: 16,
});
const maxToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16, max: 3 });
const promiseToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
const typeToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
const updateToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
const customToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
const placements = ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'] as const;
const placementToasters: Record<ToastPlacement, ToastToaster> = {
  'top-start': createToaster({ placement: 'top-start', overlap: true, gap: 16 }),
  top: createToaster({ placement: 'top', overlap: true, gap: 16 }),
  'top-end': createToaster({ placement: 'top-end', overlap: true, gap: 16 }),
  'bottom-start': createToaster({ placement: 'bottom-start', overlap: true, gap: 16 }),
  bottom: createToaster({ placement: 'bottom', overlap: true, gap: 16 }),
  'bottom-end': createToaster({ placement: 'bottom-end', overlap: true, gap: 16 }),
};

export const toastOverrideCssProperties: CssPropertyInput[] = [
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
  ['--toast-action-margin-top', '0.5rem', 'Controls action spacing from the description.'],
  ['--toast-action-min-height', 'var(--size-xs)', 'Controls action button minimum height.'],
  ['--toast-action-padding-x', '0.5rem', 'Controls action horizontal padding.'],
  ['--toast-action-padding-y', '0.25rem', 'Controls action vertical padding.'],
  ['--toast-action-radius', 'var(--radius-sm)', 'Controls action button border radius.'],
  ['--toast-bg', 'var(--color-popover)', 'Controls toast background color.'],
  ['--toast-border-color', 'var(--color-border)', 'Controls toast border color.'],
  ['--toast-border-width', 'var(--border-width-sm)', 'Controls toast border width.'],
  ['--toast-close-bg', 'transparent', 'Controls close button background.'],
  ['--toast-close-bg-hover', 'var(--color-muted)', 'Controls close hover background.'],
  ['--toast-close-color', 'var(--color-muted-foreground)', 'Controls close button color.'],
  ['--toast-close-color-hover', 'var(--color-foreground)', 'Controls close hover color.'],
  ['--toast-close-focus-ring-offset', '2px', 'Controls close button focus ring offset.'],
  [
    '--toast-close-focus-ring-width',
    'var(--border-width-md)',
    'Controls close button focus ring width.',
  ],
  ['--toast-close-icon-size', '12px', 'Controls default close icon size.'],
  ['--toast-close-offset-right', '0.5rem', 'Controls close button right offset.'],
  ['--toast-close-offset-top', '0.5rem', 'Controls close button top offset.'],
  ['--toast-close-radius', 'var(--radius-sm)', 'Controls close button border radius.'],
  ['--toast-close-size', '28px', 'Controls close button size.'],
  [
    '--toast-close-transition',
    'var(--transition-default)',
    'Controls close button transition timing.',
  ],
  ['--toast-color', 'var(--color-popover-foreground)', 'Controls toast text color.'],
  ['--toast-content-gap', '0.25rem', 'Controls spacing between title, description, and action.'],
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
    'var(--border-width-sm)',
    'Controls action and close focus ring width.',
  ],
  ['--toast-min-height', '0', 'Controls root toast minimum height.'],
  ['--toast-padding', '1rem', 'Controls root toast padding.'],
  ['--toast-radius', 'var(--radius-lg)', 'Controls toast border radius.'],
  ['--toast-shadow', 'var(--shadow-lg)', 'Controls toast shadow.'],
  ['--toast-title-font-size', 'var(--text-sm)', 'Controls title font size.'],
  ['--toast-title-gap', '0.5rem', 'Controls spacing inside title content.'],
  ['--toast-title-font-weight', 'var(--weight-semibold)', 'Controls title font weight.'],
  ['--toast-title-line-height', 'var(--line-height-text-sm)', 'Controls title line height.'],
  ['--toast-transition', '400ms', 'Controls toast movement transition.'],
  ['--toast-transition-out', '400ms', 'Controls exit movement transition.'],
  ['--toast-opacity-transition-out', '200ms', 'Controls exit opacity transition.'],
  ['--toast-viewport-inset', '1rem', 'Controls toast max-width distance from the window edge.'],
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

export const toastBasicData = `
const toaster = createToaster({
  placement: "bottom-end",
  overlap: true,
  gap: 24,
});
`;

export const toastPlacementData = `
const placements = ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"];
`;

export const toastDurationData = `
const durations = [
  { label: "1s", value: 1000 },
  { label: "3s", value: 3000 },
  { label: "5s", value: 5000 },
  { label: "Permanent", value: Infinity },
];
`;

export const toastMaxData = `
const toaster = createToaster({
  max: 3,
  overlap: true,
  placement: "bottom-end",
  gap: 16,
});
`;

export const toastExpandedData = `
const toaster = createToaster({
  placement: "bottom-end",
  overlap: false,
  gap: 16,
});
`;

export const toastPromiseData = `
const uploadFile = () =>
  new Promise<void>((resolve, reject) => {
    window.setTimeout(() => {
      Math.random() > 0.5 ? resolve() : reject(new Error("Upload failed"));
    }, 2000);
  });
`;

export const toastTypesData = `
const types = ["success", "error", "warning", "info"];
`;

export function ToastCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={toastOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function ToastExample() {
  return (
    <>
      <Button
        onClick={() =>
          basicToaster.create({
            title: 'Scheduled for tomorrow',
            description: 'Your meeting has been scheduled for tomorrow at 10am.',
            type: 'info',
          })
        }
      >
        Schedule meeting
      </Button>
      <ToastRenderer toaster={basicToaster} />
    </>
  );
}

export function ActionToastExample() {
  return (
    <>
      <Button
        onClick={() =>
          actionToaster.create({
            title: 'Event has been created',
            description: 'We have sent you an email with the event details.',
            type: 'info',
            action: {
              label: 'Undo',
              onClick: () => actionToaster.info({ description: 'Event restored to draft.' }),
            },
          })
        }
      >
        Create event
      </Button>
      <ToastRenderer toaster={actionToaster} />
    </>
  );
}

export function DurationToastExample() {
  return (
    <>
      <div className={styles.typedActions}>
        {[
          { label: '1s', value: 1000 },
          { label: '3s', value: 3000 },
          { label: '5s', value: 5000 },
          { label: 'Permanent', value: Infinity },
        ].map((duration) => (
          <Button
            key={duration.label}
            onClick={() =>
              durationToaster.info({
                title: 'Reminder set',
                description:
                  duration.value === Infinity
                    ? 'This notification will stay until dismissed.'
                    : `This notification will disappear in ${duration.label}.`,
                duration: duration.value,
              })
            }
          >
            {duration.label}
          </Button>
        ))}
      </div>
      <ToastRenderer toaster={durationToaster} />
    </>
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

export function ExpandedToastExample() {
  return (
    <>
      <Button
        onClick={() =>
          expandedToaster.info({
            title: 'Expanded toast',
            description: 'Each notification remains fully visible in the stack.',
          })
        }
      >
        Create expanded toast
      </Button>
      <ToastRenderer toaster={expandedToaster} />
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

export function PromiseToastExample() {
  const handleUpload = () => {
    promiseToaster.promise(uploadFile, {
      loading: {
        title: 'Uploading file...',
        description: 'Please wait while we upload your document.',
      },
      success: {
        title: 'Upload complete',
        description: 'Your file has been uploaded successfully.',
      },
      error: {
        title: 'Upload failed',
        description: 'Could not upload the file. Please try again.',
      },
    });
  };

  return (
    <>
      <Button onClick={handleUpload}>Upload file</Button>
      <ToastRenderer toaster={promiseToaster} />
    </>
  );
}

export function ToastTypesExample() {
  return (
    <>
      <div className={styles.typedActions}>
        {(['success', 'error', 'warning', 'info'] as ToastType[]).map((type) => (
          <Button
            key={type}
            onClick={() =>
              typeToaster[type]({
                title: type === 'info' ? 'Update available' : `${type} toast`,
                description: `This notification uses the ${type} status style.`,
              })
            }
          >
            {type}
          </Button>
        ))}
      </div>
      <ToastRenderer toaster={typeToaster} />
    </>
  );
}

export function UpdateToastExample() {
  const idRef = useRef<string | undefined>(undefined);

  return (
    <>
      <div className={styles.typedActions}>
        <Button
          onClick={() => {
            idRef.current = updateToaster.create({
              title: 'Sending message...',
              description: 'Please wait while we deliver your message.',
              type: 'loading',
            });
          }}
        >
          Send message
        </Button>
        <Button
          onClick={() => {
            if (!idRef.current) {
              return;
            }

            updateToaster.update(idRef.current, {
              title: 'Message sent',
              description: 'Your message has been delivered successfully.',
              type: 'success',
            });
          }}
        >
          Mark as sent
        </Button>
      </div>
      <ToastRenderer toaster={updateToaster} />
    </>
  );
}

export function CustomToastExample() {
  return (
    <>
      <Button
        onClick={() =>
          customToaster.success({
            title: 'Workspace synced',
            description: 'Map edits are available to everyone.',
          })
        }
      >
        Create custom toast
      </Button>
      <Toaster toaster={customToaster}>
        {(toast) => (
          <Toast.Root key={toast.id} className={styles.customToast}>
            <div className={styles.customContent}>
              <InfoIcon className={styles.customIcon} />
              <Toast.Title />
              <Toast.Description />
            </div>
            <Toast.CloseTrigger>
              <CloseIcon className={styles.closeIcon} />
            </Toast.CloseTrigger>
          </Toast.Root>
        )}
      </Toaster>
    </>
  );
}

function ToastRenderer({ toaster }: { toaster: ToastToaster }) {
  return (
    <Toaster toaster={toaster}>
      {(toast) => (
        <Toast.Root key={toast.id}>
          <Toast.Title />
          <Toast.Description />
          {toast.action ? <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger> : null}
          {toast.closable !== false ? <Toast.CloseTrigger /> : null}
        </Toast.Root>
      )}
    </Toaster>
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

const uploadFile = () =>
  new Promise<void>((resolve, reject) => {
    window.setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject(new Error('Upload failed'));
      }
    }, 2000);
  });