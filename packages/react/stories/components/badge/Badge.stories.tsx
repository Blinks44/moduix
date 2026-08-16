import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Badge } from '@/components/badge/Badge';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
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

const variants = [
  'default',
  'secondary',
  'destructive',
  'outline',
  'ghost',
  'link',
] satisfies NonNullable<ComponentProps<typeof Badge>['variant']>[];

export const Basic: Story = {
  args: {
    children: 'New',
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        {variants.map((variant) => (
          <Badge.Root key={variant} variant={variant}>
            {variant}
          </Badge.Root>
        ))}
      </div>
    );
  },
};

export const WithDot: Story = {
  render: () => {
    return (
      <div className={styles.row}>
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
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    return (
      <div className={styles.row}>
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
        <Badge.Root asChild variant="link">
          <a href="#badge-link-story">
            <Badge.Label>Styling guide</Badge.Label>
            <ChevronRightIcon />
          </a>
        </Badge.Root>
      </div>
    );
  },
};

export const Link: Story = {
  render: () => {
    return (
      <Badge.Root asChild variant="link">
        <a href="#badge-link-story">Open badge composition guidance</a>
      </Badge.Root>
    );
  },
};

export const DisabledButton: Story = {
  render: () => {
    return (
      <Badge.Root asChild variant="secondary">
        <button disabled>Archived</button>
      </Badge.Root>
    );
  },
};

export const TruncatedLabel: Story = {
  render: () => {
    return (
      <Badge.Root
        className={styles.constrained}
        title="Ready for stakeholder review after legal approval"
      >
        <Badge.Label>Ready for stakeholder review after legal approval</Badge.Label>
      </Badge.Root>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Badge.Root className={styles.small}>Small</Badge.Root>
        <Badge.Root>Default</Badge.Root>
        <Badge.Root className={styles.large}>Large</Badge.Root>
        <Badge.Root className={styles.customBadge}>
          <Badge.Dot />
          <Badge.Label>Priority</Badge.Label>
        </Badge.Root>
      </div>
    );
  },
};