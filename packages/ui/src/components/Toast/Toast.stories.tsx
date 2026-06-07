import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { InfoIcon } from '@/icons/demo';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import {
  type ToastPlacement,
  type ToastStackBehavior,
  ToastAnchoredRegion,
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
} from './Toast';
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

const globalToastManager = createToastManager();

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <CreateToastButton />
      <ToastRegion />
    </ToastProvider>
  ),
};

export const Action: Story = {
  render: () => (
    <ToastProvider>
      <ActionToastButton />
      <ToastRegion />
    </ToastProvider>
  ),
};

export const Placement: Story = {
  render: () => (
    <ToastProvider>
      <PlacementDemo />
    </ToastProvider>
  ),
};

export const AlwaysExpanded: Story = {
  name: 'Always Expanded',
  render: () => (
    <ToastProvider>
      <StackedToastButton stackBehavior="expanded" />
      <ToastRegion placement="bottom-right" stackBehavior="expanded" />
    </ToastProvider>
  ),
};

export const GlobalManager: Story = {
  name: 'Global Manager',
  render: () => (
    <ToastProvider toastManager={globalToastManager}>
      <Button
        onClick={() =>
          globalToastManager.add({
            title: 'Global toast',
            description: 'Created via createToastManager()',
          })
        }
      >
        Create global toast
      </Button>
      <ToastRegion />
    </ToastProvider>
  ),
};

export const CustomComposition: Story = {
  name: 'Custom Composition',
  render: () => (
    <ToastProvider>
      <CustomToastTrigger />
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
    </ToastProvider>
  ),
};

export const ManualViewportComposition: Story = {
  name: 'Manual Viewport Composition',
  render: () => (
    <ToastProvider>
      <ManualToastTrigger />
      <ManualToastRegion />
    </ToastProvider>
  ),
};

export const AnchoredToast: Story = {
  name: 'Anchored Toast',
  render: () => (
    <ToastProvider>
      <AnchoredToastButtons />
      <ToastAnchoredRegion />
    </ToastProvider>
  ),
};

export const ToastAndAnchoredToast: Story = {
  name: 'Toast and Anchored Toast',
  render: () => (
    <ToastProvider>
      <div className={styles.stack}>
        <CreateToastButton />
        <AnchoredToastButtons />
      </div>
      <ToastRegion />
      <ToastAnchoredRegion />
    </ToastProvider>
  ),
};

function PlacementDemo() {
  const [placement, setPlacement] = useState<ToastPlacement>('bottom-right');

  return (
    <>
      <div className={styles.stack}>
        <div className={styles.segmented}>
          {[
            'top-left',
            'top-center',
            'top-right',
            'bottom-left',
            'bottom-center',
            'bottom-right',
          ].map((item) => (
            <button
              key={item}
              type="button"
              className={styles.segment}
              data-active={item === placement || undefined}
              onClick={() => setPlacement(item as ToastPlacement)}
            >
              {item}
            </button>
          ))}
        </div>
        <PlacementToastButton placement={placement} />
      </div>
      <ToastRegion placement={placement} />
    </>
  );
}

function CreateToastButton() {
  const toastManager = useToastManager();
  const [count, setCount] = useState(0);

  const handleCreateToast = () => {
    const next = count + 1;
    setCount(next);
    toastManager.add({
      title: `Toast ${next}`,
      description: 'This notification is rendered in the shared toast region.',
    });
  };

  return <Button onClick={handleCreateToast}>Create toast</Button>;
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

  const handleCreateToast = () => {
    const next = count + 1;
    setCount(next);
    toastManager.add({
      title: `Stacked toast ${next}`,
      description: 'Create several notifications to compare the expanded stack behavior.',
    });
  };

  return <Button onClick={handleCreateToast}>Create {stackBehavior} toast</Button>;
}

function CustomToastTrigger() {
  const toastManager = useToastManager();

  return (
    <Button
      onClick={() =>
        toastManager.add({
          title: 'Custom composition',
          description: 'ToastRoot and friends are enough when the default layout is not enough.',
        })
      }
    >
      Create custom toast
    </Button>
  );
}

function ManualToastTrigger() {
  const toastManager = useToastManager();

  return (
    <Button
      onClick={() =>
        toastManager.add({
          title: 'Manual viewport',
          description: 'This stack is rendered from ToastPortal and ToastViewport directly.',
        })
      }
    >
      Create manual toast
    </Button>
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

function AnchoredToastButtons() {
  const copyRef = useRef<HTMLButtonElement | null>(null);
  const saveRef = useRef<HTMLButtonElement | null>(null);
  const anchoredToast = useAnchoredToastManager();
  const [copyCount, setCopyCount] = useState(0);
  const [saveCount, setSaveCount] = useState(0);

  const showAnchored = (anchor: HTMLButtonElement | null, label: string, count: number) => {
    if (!anchor) {
      return;
    }

    anchoredToast.show({
      anchor,
      description: `${label}: ${count}`,
      timeout: 1800,
    });
  };

  return (
    <div className={styles.anchoredActions}>
      <Button
        ref={copyRef}
        onClick={() => {
          const next = copyCount + 1;
          setCopyCount(next);
          showAnchored(copyRef.current, 'Copied', next);
        }}
      >
        Copy
      </Button>
      <Button
        ref={saveRef}
        variant="outline"
        onClick={() => {
          const next = saveCount + 1;
          setSaveCount(next);
          showAnchored(saveRef.current, 'Saved', next);
        }}
      >
        Save
      </Button>
    </div>
  );
}