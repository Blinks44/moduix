import type { JSX } from 'solid-js';
import { createSignal, Show } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@/components/alert/Alert';
import { Button } from '@/components/button/Button';
import styles from './Alert.stories.module.css';

function CheckIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...accessibilityProps}
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function InfoIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

  return (
    <svg viewBox="0 0 24 24" fill="none" {...accessibilityProps} {...props}>
      <path
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
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
  const [visible, setVisible] = createSignal(true);

  return (
    <Show when={visible()}>
      <Alert status="warning" class={styles.customAlert}>
        <AlertIndicator>
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
    </Show>
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
        <AlertTitle asChild={(props) => <h2 {...props()}>Billing issue</h2>} />
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
    <div class={styles.stack}>
      {statuses.map((status) => (
        <Alert status={status}>
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