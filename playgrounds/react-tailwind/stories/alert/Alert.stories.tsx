import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@/components/alert/Alert';
import { Button } from '../../../../packages/react-tailwind/src/components/button';
import { CheckIcon } from '../../../../packages/react-tailwind/src/internal/icons/ui';

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
const stackClassName = 'grid w-[min(38rem,calc(100vw-2rem))] gap-3';
const customAlertClassName =
  'max-w-lg rounded-md border-primary/38 bg-[color-mix(in_oklab,var(--color-primary)_12%,var(--color-background))] shadow-sm';
const customIndicatorClassName = 'group-data-[status=warning]/alert:text-primary';

function DismissibleCustomAlert() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert status="warning" className={customAlertClassName}>
      <AlertIndicator className={customIndicatorClassName}>
        <InfoIcon />
      </AlertIndicator>
      <AlertContent>
        <AlertTitle>Storage is almost full</AlertTitle>
        <AlertDescription>
          You are using 92% of the available storage. Archive old uploads or upgrade the plan.
        </AlertDescription>
        <AlertActions>
          <Button size="sm">Review uploads</Button>
          <Button size="sm" variant="outline" onClick={() => setVisible(false)}>
            Dismiss
          </Button>
        </AlertActions>
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

export const CustomHeading: Story = {
  render: () => (
    <Alert status="info">
      <AlertContent>
        <AlertTitle asChild>
          <h2>Billing issue</h2>
        </AlertTitle>
        <AlertDescription>
          Use asChild when the surrounding page needs a different heading level.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const Error: Story = {
  render: () => (
    <Alert status="error">
      <AlertIndicator>
        <InfoIcon />
      </AlertIndicator>
      <AlertContent>
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>
          Your payment could not be processed. Check the payment method and try again.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const Statuses: Story = {
  render: () => (
    <div className={stackClassName}>
      {statuses.map((status) => (
        <Alert key={status} status={status}>
          <AlertIndicator>{status === 'success' ? <CheckIcon /> : <InfoIcon />}</AlertIndicator>
          <AlertContent>
            <AlertTitle>{status}</AlertTitle>
            <AlertDescription>Use this alert for {status} feedback.</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Alert status="info">
      <AlertIndicator>
        <InfoIcon />
      </AlertIndicator>
      <AlertContent>
        <AlertTitle>Workspace sync is active</AlertTitle>
        <AlertDescription>Changes are being synced across all connected devices.</AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const AdvancedCustomization: Story = {
  render: () => <DismissibleCustomAlert />,
};