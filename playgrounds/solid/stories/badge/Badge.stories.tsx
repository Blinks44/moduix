import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Badge } from '@/components/badge/Badge';
import { ChevronRightIcon } from '@/internal/icons/ui/Icons';
import styles from './Badge.stories.module.css';

const meta = {
  title: 'Components/Badge',
  component: Badge.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const;

export const Basic: Story = {
  args: {
    children: 'New',
  },
};

export const Variants: Story = {
  render: () => (
    <div class={styles.row}>
      {variants.map((variant) => (
        <Badge.Root variant={variant}>{variant}</Badge.Root>
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div class={styles.row}>
      <Badge.Root variant="default">
        <Badge.Dot />
        <Badge.Label>Online</Badge.Label>
      </Badge.Root>
      <Badge.Root variant="secondary">
        <Badge.Dot />
        <Badge.Label>Draft</Badge.Label>
      </Badge.Root>
      <Badge.Root variant="destructive">
        <Badge.Dot />
        <Badge.Label>Failed</Badge.Label>
      </Badge.Root>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div class={styles.row}>
      <Badge.Root variant="default">
        <Badge.Label>Release</Badge.Label>
        <ChevronRightIcon />
      </Badge.Root>
      <Badge.Root variant="secondary">
        <Badge.Label>Details</Badge.Label>
        <ChevronRightIcon />
      </Badge.Root>
      <Badge.Root variant="outline">
        <Badge.Label>Read more</Badge.Label>
        <ChevronRightIcon />
      </Badge.Root>
      <Badge.Root
        variant="link"
        asChild={(props) => (
          <a {...props()} href="#badge-link-story">
            <Badge.Label>Styling guide</Badge.Label>
            <ChevronRightIcon />
          </a>
        )}
      />
    </div>
  ),
};

export const Link: Story = {
  render: () => (
    <Badge.Root
      variant="link"
      asChild={(props) => (
        <a {...props()} href="#badge-link-story">
          Open badge composition guidance
        </a>
      )}
    />
  ),
};

export const DisabledButton: Story = {
  render: () => (
    <Badge.Root
      variant="secondary"
      asChild={(props) => (
        <button {...props()} disabled>
          Archived
        </button>
      )}
    />
  ),
};

export const TruncatedLabel: Story = {
  render: () => (
    <Badge.Root
      class={styles.constrained}
      title="Ready for stakeholder review after legal approval"
    >
      <Badge.Label>Ready for stakeholder review after legal approval</Badge.Label>
    </Badge.Root>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div class={styles.row}>
      <Badge.Root class={styles.small}>Small</Badge.Root>
      <Badge.Root>Default</Badge.Root>
      <Badge.Root class={styles.large}>Large</Badge.Root>
      <Badge.Root class={styles.customBadge}>
        <Badge.Dot />
        <Badge.Label>Priority</Badge.Label>
      </Badge.Root>
    </div>
  ),
};