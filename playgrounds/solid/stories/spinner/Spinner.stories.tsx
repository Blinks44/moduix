import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Spinner } from '@/components/spinner/Spinner';
import styles from './Spinner.stories.module.css';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithVisibleText: Story = {
  render: () => (
    <div class={styles.inline}>
      <Spinner decorative size="inherit" />
      <span class={styles.muted}>Saving changes</span>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={styles.row}>
      <Spinner decorative size="xs" />
      <Spinner decorative size="sm" />
      <Spinner decorative size="md" />
      <Spinner decorative size="lg" />
      <Spinner decorative size="xl" />
    </div>
  ),
};

export const InheritedSize: Story = {
  render: () => (
    <span style={{ 'font-size': 'var(--moduix-text-xl)' }}>
      <Spinner decorative size="inherit" /> Loading report
    </span>
  ),
};

export const CustomIndicator: Story = {
  render: () => (
    <Spinner size="lg" aria-label="Syncing">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3v4M12 17v4M3 12h4M17 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M18.36 5.64l-2.83 2.83M8.47 15.53l-2.83 2.83"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </Spinner>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Spinner
      size="lg"
      aria-label="Loading report"
      asChild={(props) => (
        <span {...props()} class={styles.brandSpinner}>
          <span data-scope="spinner" data-part="indicator" data-slot="spinner-indicator">
            <span data-scope="spinner" data-part="ring" data-slot="spinner-ring" />
          </span>
        </span>
      )}
    />
  ),
};

export const Styling: Story = {
  render: () => <Spinner decorative size="lg" class={styles.brandSpinner} />,
};