import type { JSX } from 'solid-js';
import { createSignal, Show } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Alert } from '@/components/alert/Alert';
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
    </Show>
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
      <Alert.Title asChild={(props) => <h2 {...props()}>Billing issue</h2>} />
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
    <div class={styles.stack}>
      {statuses.map((status) => (
        <Alert status={status}>
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