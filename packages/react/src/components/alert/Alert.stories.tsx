import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { InfoIcon } from '@/icons/demo';
import { CheckIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { Alert } from './Alert';
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

const statuses = ['neutral', 'info', 'success', 'warning', 'error'] as const;

function DismissibleCustomAlert() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert status="warning" className={styles.customAlert}>
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title>Storage is almost full</Alert.Title>
        <Alert.Description>
          You are using 92% of the available storage. Archive old uploads or upgrade the plan.
        </Alert.Description>
        <Alert.Actions>
          <Button size="sm">Review uploads</Button>
          <Button size="sm" variant="outline" onClick={() => setVisible(false)}>
            Dismiss
          </Button>
        </Alert.Actions>
      </Alert.Content>
    </Alert>
  );
}

export const Basic: Story = {
  render: () => (
    <Alert>
      <Alert.Title>Update available</Alert.Title>
      <Alert.Description>
        Install the latest version when your workflow allows it.
      </Alert.Description>
    </Alert>
  ),
};

export const CustomHeading: Story = {
  render: () => (
    <Alert status="info">
      <Alert.Title asChild>
        <h2>Billing issue</h2>
      </Alert.Title>
      <Alert.Description>
        Use asChild when the surrounding page needs a different heading level.
      </Alert.Description>
    </Alert>
  ),
};

export const Error: Story = {
  render: () => (
    <Alert status="error">
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Title>Payment failed</Alert.Title>
      <Alert.Description>
        Your payment could not be processed. Check the payment method and try again.
      </Alert.Description>
    </Alert>
  ),
};

export const Statuses: Story = {
  render: () => (
    <div className={styles.stack}>
      {statuses.map((status) => (
        <Alert key={status} status={status}>
          <Alert.Indicator>{status === 'success' ? <CheckIcon /> : <InfoIcon />}</Alert.Indicator>
          <Alert.Title>{status}</Alert.Title>
          <Alert.Description>Use this alert for {status} feedback.</Alert.Description>
        </Alert>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Alert status="info">
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Title>Workspace sync is active</Alert.Title>
      <Alert.Description>Changes are being synced across all connected devices.</Alert.Description>
    </Alert>
  ),
};

export const AdvancedCustomization: Story = {
  render: () => <DismissibleCustomAlert />,
};