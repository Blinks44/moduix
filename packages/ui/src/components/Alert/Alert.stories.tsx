import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { InfoIcon } from '@/icons/demo';
import { CheckIcon } from '@/icons/ui';
import { Button } from '../Button';
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from './Alert';
import styles from './Alert.stories.module.css';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = ['default', 'info', 'success', 'warning', 'destructive'] as const;

function DismissibleCustomAlert() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert variant="warning" className={styles.customAlert}>
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Storage is almost full</AlertTitle>
        <AlertDescription>
          You are using 92% of the available storage. Archive old uploads or upgrade the plan.
        </AlertDescription>
        <div className={styles.actions}>
          <Button size="sm">Review uploads</Button>
          <Button size="sm" variant="outline" onClick={() => setVisible(false)}>
            Dismiss
          </Button>
        </div>
      </AlertContent>
    </Alert>
  );
}

export const Basic: Story = {
  render: () => (
    <Alert>
      <AlertContent>
        <AlertTitle>Update available</AlertTitle>
        <AlertDescription>
          Install the latest version when your workflow allows it.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Alert variant="info">
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Workspace sync is active</AlertTitle>
        <AlertDescription>Changes are being synced across all connected devices.</AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className={styles.stack}>
      {variants.map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertIcon>{variant === 'success' ? <CheckIcon /> : <InfoIcon />}</AlertIcon>
          <AlertContent>
            <AlertTitle>{variant}</AlertTitle>
            <AlertDescription>Use this alert for {variant} feedback.</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
    </div>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>
          Your payment could not be processed. Check the payment method and try again.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const CustomComposition: Story = {
  render: () => <DismissibleCustomAlert />,
};