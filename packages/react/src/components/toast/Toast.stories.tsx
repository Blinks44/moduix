import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { InfoIcon } from '@/icons/demo';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { Toast, Toaster, createToaster, type ToastOptions, type ToastPlacement } from './Toast';
import styles from './Toast.stories.module.css';

const meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;
type ToastToaster = ReturnType<typeof createToaster>;
type ToastType = Extract<ToastOptions['type'], 'success' | 'error' | 'warning' | 'info'>;

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
const varyingHeightToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
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

export const Basic: Story = {
  render: () => (
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
  ),
};

export const Action: Story = {
  render: () => (
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
  ),
};

export const Duration: Story = {
  render: () => (
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
              durationToaster.create({
                title: 'Reminder set',
                description:
                  duration.value === Infinity
                    ? 'This notification will stay until dismissed.'
                    : `This notification will disappear in ${duration.label}.`,
                type: 'info',
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
  ),
};

export const AlwaysExpanded: Story = {
  name: 'Always Expanded',
  render: () => (
    <>
      <Button
        onClick={() =>
          expandedToaster.info({
            title: 'Expanded toast',
            description: 'Create several notifications to compare the always-expanded stack.',
          })
        }
      >
        Create expanded toast
      </Button>
      <ToastRenderer toaster={expandedToaster} />
    </>
  ),
};

export const MaxToasts: Story = {
  name: 'Max Toasts',
  render: () => (
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
  ),
};

export const Placement: Story = {
  render: () => <PlacementStory />,
};

export const PromiseToast: Story = {
  name: 'Promise Toast',
  render: () => <PromiseToastStory />,
};

export const Types: Story = {
  render: () => (
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
  ),
};

export const Update: Story = {
  render: () => <UpdateStory />,
};

export const VaryingHeight: Story = {
  name: 'Varying Height',
  render: () => <VaryingHeightStory />,
};

export const CustomComposition: Story = {
  name: 'Custom Composition',
  render: () => (
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
  ),
};

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

function PlacementStory() {
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

function PromiseToastStory() {
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

function UpdateStory() {
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

function VaryingHeightStory() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button
        onClick={() => {
          const next = count + 1;
          const description = descriptions[Math.floor(Math.random() * descriptions.length)];
          setCount(next);
          varyingHeightToaster.info({
            title: `Notification ${next}`,
            description,
          });
        }}
      >
        Create toast
      </Button>
      <ToastRenderer toaster={varyingHeightToaster} />
    </>
  );
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

const descriptions = [
  'Your changes have been saved.',
  'File uploaded successfully. You can view it in your documents folder.',
  'Your meeting has been scheduled for tomorrow at 10:00 AM. We have sent a calendar invite to all participants.',
  'We noticed unusual activity on your account. Please verify your identity using the link sent to your email address.',
];