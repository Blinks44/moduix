import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import type { ToastPlacement, ToastStackBehavior } from './Toast';
import { Button } from '../Button';
import {
  ToastProvider,
  ToastRegion,
  ToastAnchoredRegion,
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

  function handleAddToast() {
    setCount((prev) => prev + 1);
    toastManager.add({
      title: `Toast ${count + 1}`,
      description: `Placement: ${placement}`,
    });
  }

  return (
    <React.Fragment>
      <Button onClick={handleAddToast}>{buttonText}</Button>
      <ToastRegion placement={placement} stackBehavior={stackBehavior} />
    </React.Fragment>
  );
}

export const TopLeft: Story = {
  render: () => {
    return (
      <ToastProvider>
        <PlacementDemo placement="top-left" buttonText="Top Left Toast" />
      </ToastProvider>
    );
  },
};

export const TopCenter: Story = {
  render: () => {
    return (
      <ToastProvider>
        <PlacementDemo placement="top-center" buttonText="Top Center Toast" />
      </ToastProvider>
    );
  },
};

export const TopRight: Story = {
  render: () => {
    return (
      <ToastProvider>
        <PlacementDemo placement="top-right" buttonText="Top Right Toast" />
      </ToastProvider>
    );
  },
};

export const BottomLeft: Story = {
  render: () => {
    return (
      <ToastProvider>
        <PlacementDemo placement="bottom-left" buttonText="Bottom Left Toast" />
      </ToastProvider>
    );
  },
};

export const BottomCenter: Story = {
  render: () => {
    return (
      <ToastProvider>
        <PlacementDemo placement="bottom-center" buttonText="Bottom Center Toast" />
      </ToastProvider>
    );
  },
};

export const BottomRight: Story = {
  render: () => {
    return (
      <ToastProvider>
        <PlacementDemo placement="bottom-right" buttonText="Bottom Right Toast" />
      </ToastProvider>
    );
  },
};

export const GlobalManager: Story = {
  name: 'Global Manager',
  render: () => {
    return (
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
    );
  },
};

export const AlwaysExpanded: Story = {
  name: 'Always Expanded',
  render: () => {
    return (
      <ToastProvider>
        <PlacementDemo
          placement="bottom-right"
          buttonText="Create Expanded Toast"
          stackBehavior="expanded"
        />
      </ToastProvider>
    );
  },
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

function AnchoredToastButtons() {
  const copyRef = React.useRef<HTMLButtonElement | null>(null);
  const saveRef = React.useRef<HTMLButtonElement | null>(null);
  const anchoredToast = useAnchoredToastManager();
  const [copyCount, setCopyCount] = React.useState(0);
  const [saveCount, setSaveCount] = React.useState(0);

  function showAnchored(anchor: HTMLButtonElement | null, label: string, count: number) {
    if (!anchor) {
      return;
    }

    anchoredToast.show({
      anchor,
      description: `${label}: ${count}`,
      timeout: 1800,
    });
  }

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