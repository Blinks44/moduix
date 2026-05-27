import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { InfoIcon } from '@/icons/demo';
import { CloseIcon } from '@/icons/ui';
import { Button } from '../Button';
import {
  ToastAnchoredRegion,
  ToastArrow,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastPositioner,
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
type ToastPlacement = NonNullable<React.ComponentProps<typeof ToastRegion>['placement']>;
type ToastStackBehavior = NonNullable<React.ComponentProps<typeof ToastRegion>['stackBehavior']>;

const globalToastManager = createToastManager();

function PlacementDemo({
  placement,
  buttonText,
  stackBehavior = 'stacked',
}: {
  placement: ToastPlacement;
  buttonText: string;
  stackBehavior?: ToastStackBehavior;
}) {
  const toastManager = useToastManager();
  const [count, setCount] = React.useState(0);

  const handleAddToast = () => {
    const next = count + 1;
    setCount(next);
    toastManager.add({
      title: `Toast ${next}`,
      description: `Placement: ${placement}`,
    });
  };

  return (
    <>
      <Button onClick={handleAddToast}>{buttonText}</Button>
      <ToastRegion placement={placement} stackBehavior={stackBehavior} />
    </>
  );
}

export const TopLeft: Story = {
  render: () => (
    <ToastProvider>
      <PlacementDemo placement="top-left" buttonText="Top Left Toast" />
    </ToastProvider>
  ),
};

export const TopCenter: Story = {
  render: () => (
    <ToastProvider>
      <PlacementDemo placement="top-center" buttonText="Top Center Toast" />
    </ToastProvider>
  ),
};

export const TopRight: Story = {
  render: () => (
    <ToastProvider>
      <PlacementDemo placement="top-right" buttonText="Top Right Toast" />
    </ToastProvider>
  ),
};

export const BottomLeft: Story = {
  render: () => (
    <ToastProvider>
      <PlacementDemo placement="bottom-left" buttonText="Bottom Left Toast" />
    </ToastProvider>
  ),
};

export const BottomCenter: Story = {
  render: () => (
    <ToastProvider>
      <PlacementDemo placement="bottom-center" buttonText="Bottom Center Toast" />
    </ToastProvider>
  ),
};

export const BottomRight: Story = {
  render: () => (
    <ToastProvider>
      <PlacementDemo placement="bottom-right" buttonText="Bottom Right Toast" />
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
        Create Global Toast
      </Button>
      <ToastRegion placement="bottom-right" />
    </ToastProvider>
  ),
};

export const AlwaysExpanded: Story = {
  name: 'Always Expanded',
  render: () => (
    <ToastProvider>
      <PlacementDemo
        placement="bottom-right"
        buttonText="Create Expanded Toast"
        stackBehavior="expanded"
      />
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

export const ManualAnchoredComposition: Story = {
  name: 'Manual Anchored Composition',
  render: () => (
    <ToastProvider>
      <AnchoredToastButtons />
      <ManualAnchoredRegion />
    </ToastProvider>
  ),
};

export const ToastAndAnchoredToast: Story = {
  name: 'Toast and Anchored Toast',
  render: () => (
    <ToastProvider>
      <PlacementDemo placement="bottom-right" buttonText="Create Toast" />
      <AnchoredToastButtons />
      <ToastAnchoredRegion />
    </ToastProvider>
  ),
};

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
      Create Custom Toast
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
      Create Manual Toast
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
  const copyRef = React.useRef<HTMLButtonElement | null>(null);
  const saveRef = React.useRef<HTMLButtonElement | null>(null);
  const anchoredToast = useAnchoredToastManager();
  const [copyCount, setCopyCount] = React.useState(0);
  const [saveCount, setSaveCount] = React.useState(0);

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

function ManualAnchoredRegion() {
  const anchoredToast = useAnchoredToastManager();

  return (
    <ToastProvider toastManager={anchoredToast.manager}>
      <ManualAnchoredRegionContent />
    </ToastProvider>
  );
}

function ManualAnchoredRegionContent() {
  const { toasts } = useToastManager();

  return (
    <ToastPortal>
      <ToastViewport className={styles.manualAnchoredViewport}>
        {toasts.map((toast) => (
          <ToastPositioner key={toast.id} toast={toast}>
            <ToastRoot toast={toast}>
              <ToastArrow />
              <ToastContent>
                <ToastDescription />
              </ToastContent>
            </ToastRoot>
          </ToastPositioner>
        ))}
      </ToastViewport>
    </ToastPortal>
  );
}