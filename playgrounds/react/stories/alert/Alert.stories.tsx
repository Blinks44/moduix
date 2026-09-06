import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Alert } from '@/components/alert/Alert';
import { Button } from '@/components/button';
import { CheckIcon } from '@/lib/moduix/icons/ui';
import styles from './Alert.stories.module.css';

function InfoIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

const statuses = ['info', 'success', 'warning', 'error'] as const;

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
      <Alert.Content>
        <Alert.Title>Update available</Alert.Title>
        <Alert.Description>
          Install the latest version when your workflow allows it.
        </Alert.Description>
      </Alert.Content>
    </Alert>
  ),
};

export const CustomHeading: Story = {
  render: () => (
    <Alert status="info">
      <Alert.Content>
        <Alert.Title asChild>
          <h2>Billing issue</h2>
        </Alert.Title>
        <Alert.Description>
          Use asChild when the surrounding page needs a different heading level.
        </Alert.Description>
      </Alert.Content>
    </Alert>
  ),
};

export const Error: Story = {
  render: () => (
    <Alert status="error">
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title>Payment failed</Alert.Title>
        <Alert.Description>
          Your payment could not be processed. Check the payment method and try again.
        </Alert.Description>
      </Alert.Content>
    </Alert>
  ),
};

export const Statuses: Story = {
  render: () => (
    <div className={styles.stack}>
      {statuses.map((status) => (
        <Alert key={status} status={status}>
          <Alert.Indicator>{status === 'success' ? <CheckIcon /> : <InfoIcon />}</Alert.Indicator>
          <Alert.Content>
            <Alert.Title>{status}</Alert.Title>
            <Alert.Description>Use this alert for {status} feedback.</Alert.Description>
          </Alert.Content>
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
      <Alert.Content>
        <Alert.Title>Workspace sync is active</Alert.Title>
        <Alert.Description>
          Changes are being synced across all connected devices.
        </Alert.Description>
      </Alert.Content>
    </Alert>
  ),
};

export const AdvancedCustomization: Story = {
  render: () => <DismissibleCustomAlert />,
};