import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Badge, BadgeDot, BadgeLabel } from '@/components/badge/Badge';
import { ChevronRightIcon } from '@/internal/icons/ui/Icons';
import styles from './Badge.stories.module.css';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

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
        <Badge variant={variant}>{variant}</Badge>
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div class={styles.row}>
      <Badge variant="default">
        <BadgeDot />
        <BadgeLabel>Online</BadgeLabel>
      </Badge>
      <Badge variant="secondary">
        <BadgeDot />
        <BadgeLabel>Draft</BadgeLabel>
      </Badge>
      <Badge variant="destructive">
        <BadgeDot />
        <BadgeLabel>Failed</BadgeLabel>
      </Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div class={styles.row}>
      <Badge variant="default">
        <BadgeLabel>Release</BadgeLabel>
        <ChevronRightIcon />
      </Badge>
      <Badge variant="secondary">
        <BadgeLabel>Details</BadgeLabel>
        <ChevronRightIcon />
      </Badge>
      <Badge variant="outline">
        <BadgeLabel>Read more</BadgeLabel>
        <ChevronRightIcon />
      </Badge>
      <Badge
        variant="link"
        asChild={(props) => (
          <a {...props()} href="#badge-link-story">
            <BadgeLabel>Styling guide</BadgeLabel>
            <ChevronRightIcon />
          </a>
        )}
      />
    </div>
  ),
};

export const Link: Story = {
  render: () => (
    <Badge
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
    <Badge
      variant="secondary"
      asChild={(props) => (
        <button {...props({ class: styles.disabledButton })} disabled>
          Archived
        </button>
      )}
    />
  ),
};

export const TruncatedLabel: Story = {
  render: () => (
    <Badge class={styles.constrained} title="Ready for stakeholder review after legal approval">
      <BadgeLabel>Ready for stakeholder review after legal approval</BadgeLabel>
    </Badge>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div class={styles.row}>
      <Badge class={styles.small}>Small</Badge>
      <Badge>Default</Badge>
      <Badge class={styles.large}>Large</Badge>
      <Badge class={styles.customBadge}>
        <BadgeDot />
        <BadgeLabel>Priority</BadgeLabel>
      </Badge>
    </div>
  ),
};