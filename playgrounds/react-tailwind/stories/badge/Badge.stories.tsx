import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { Badge, BadgeDot, BadgeLabel } from '@/components/badge/Badge';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

const rowClass = 'flex flex-wrap items-center gap-2';
const constrainedClass = 'max-w-56';
const customBadgeClass =
  'min-h-6 rounded-sm border-primary/35 bg-[color-mix(in_oklab,var(--color-primary)_20%,var(--color-background))] px-3 text-primary';
const smallBadgeClass = 'min-h-4 px-2';
const largeBadgeClass = 'min-h-8 px-4 text-sm [&>svg]:size-4';

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
  render: () => (
    <div className={rowClass}>
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className={rowClass}>
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
    <div className={rowClass}>
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
      <Badge asChild variant="link">
        <a href="#badge-link-story">
          <BadgeLabel>Styling guide</BadgeLabel>
          <ChevronRightIcon />
        </a>
      </Badge>
    </div>
  ),
};

export const Link: Story = {
  render: () => (
    <Badge asChild variant="link">
      <a href="#badge-link-story">Open badge composition guidance</a>
    </Badge>
  ),
};

export const DisabledButton: Story = {
  render: () => (
    <Badge asChild variant="secondary">
      <button className="cursor-not-allowed opacity-50" disabled>
        Archived
      </button>
    </Badge>
  ),
};

export const TruncatedLabel: Story = {
  render: () => (
    <Badge className={constrainedClass} title="Ready for stakeholder review after legal approval">
      <BadgeLabel>Ready for stakeholder review after legal approval</BadgeLabel>
    </Badge>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className={rowClass}>
      <Badge className={smallBadgeClass}>Small</Badge>
      <Badge>Default</Badge>
      <Badge className={largeBadgeClass}>Large</Badge>
      <Badge className={customBadgeClass}>
        <BadgeDot className="size-2" />
        <BadgeLabel>Priority</BadgeLabel>
      </Badge>
    </div>
  ),
};