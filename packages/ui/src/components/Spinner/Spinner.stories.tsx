import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';
import styles from './Spinner.stories.module.css';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
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
  render: () => {
    return (
      <div className={styles.inline}>
        <Spinner decorative size="sm" />
        <span className={styles.muted}>Saving changes</span>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </div>
    );
  },
};

export const CustomIndicator: Story = {
  render: () => {
    return (
      <Spinner size="lg" aria-label="Syncing">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3v4M12 17v4M3 12h4M17 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M18.36 5.64l-2.83 2.83M8.47 15.53l-2.83 2.83"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </Spinner>
    );
  },
};

export const Styling: Story = {
  render: () => {
    return (
      <div className={styles.accent}>
        <Spinner size="lg" />
      </div>
    );
  },
};